import { useState } from "react";
import ProjectItem from "./ProjectItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateItem from "../CreateItem";
export const notify = (response: any) => {
  if (response === true) {
    toast.success("Created new project 🚀", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else if (response === false) {
    toast.error("Inputs cannot be empty", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else if (response === "projectErr") {
    toast.error("Team does not exist", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else if (response === "ticketError") {
    toast.error("Project does not exist", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export default function Project(props: any) {
  const [trigger, setTrigger] = useState(false);
  const [listLength, setListLength] = useState<number>(0);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    manager: "Test Value",
    team: "",
    status: "",
  });

  const handleClick = () => {
    setTrigger((trigger) => !trigger);

    const blankData = {
      ...formData,
      title: "",
      desc: "",
      team: "",
    };
    setFormData(blankData);
  };


  return (
    <div className="shadow-outline relative md:mx-12 mb-20 mt-6 h-full w-11/12 rounded-lg border border-[#2A6470] bg-white">
      <CreateItem trigger={trigger}
        closeModal={handleClick}
        notify={notify}
        listLength={listLength}
        setListLength={setListLength}
        itemType={"project"}
        formData={formData}
        setFormData={setFormData}/>
      <div>
        <div className="flex p-2 justify-between md:p-4 ">
          <h2 className="text-xl text-[#1D3557]">Projects</h2>
          <button
            onClick={handleClick}
            className="rounded-md border bg-[#1D3557] p-2 text-base text-white"
          >
            New Project
          </button>
        </div>
        <ProjectItem
          projectDashboard={props.projectDashboard}
          setProjectDashboard={props.setProjectDashboard}
          listLength={listLength}
          setListLength={setListLength}
          setSelectedInfo={props.setSelectedInfo}
          selectedInfo={props.selectedInfo}
          selected={props.selected}
          setIsSelected={props.setIsSelected}
          trigger={trigger}
        />
      </div>
      <ToastContainer />
    </div>
  );
}
