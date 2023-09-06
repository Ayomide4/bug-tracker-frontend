import Form from "./Form.js";
import axios from "axios";
import { notify } from "./ProjectComponents/Project.js";

export default function CreateItem(props: any) {
  const formData = {
    ...props.formData,
    date: new Date().toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }),
  };

  const handleSubmit = (e: React.FormEvent) => {
    //sends project info to database
    e.preventDefault();

    //reset form elements
    const blankData = {
      ...formData,
      title: "",
      desc: "",
      team: "",
      project: "",
    };

    //form validation
    if (props.itemType === "project") {
      if (
        formData.title === "" ||
        formData.desc === "" ||
        formData.team === ""
      ) {
        notify(false);
        return false;
      } else {
        axios
          .post(
            "https://bug-tracker-f329.onrender.com/project/create",
            formData
          )
          .then(function (response) {
            props.setListLength((prev: number) => prev + 1); //
            notify(true);
            props.closeModal();
          })
          .catch(function (error) {
            if (error) {
              notify("projectErr");
              props.setFormData(blankData);
            }
          });
      }
    } else if (props.itemType === "ticket") {
      if (
        formData.title === "" ||
        formData.desc === "" ||
        formData.project === "" ||
        formData.prio === "- Select -" ||
        formData.prio === ""
      ) {
        notify(false);
        return false;
      } else {
        axios
          .post("https://bug-tracker-f329.onrender.com/ticket/create", formData)
          .then(function (response) {
            if (response.status === 200) {
              props.setListLength((prev: number) => prev + 1);
              notify(true);
              props.closeModal();
            }
          })
          .catch(function (error) {
            if (error.response) {
              console.log("PROJECT DONT EXIST");
              notify("ticketError");
              console.log(error.response.status);
              props.setFormData(blankData);
            }
          });
      }
    }
  };

  return (
    props.trigger && (
      <Form
        list={props.list}
        itemType={props.itemType}
        closeModal={props.closeModal}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={props.setFormData}
      />
    )
  );
}
