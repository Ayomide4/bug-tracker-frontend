import DropdownMenu from "./DropdownMenu";
import { useEffect, useState } from "react";

export default function Form(props: any) {
  const [dropdownValue, setDropdownValue] = useState({
    prio: "",
    status: "New",
  });
  const prioList: string[] = ["Low", "Medium", "High"];
  const newData: any = { ...props.formData };

  //TODO : ADD PROJECT INPUT BAR IN TICKET FORM

  const handleChange = (e: any) => {
    newData[e.target.id] = e.target.value; //looks for id that matches new data and saves the value at the id
    if (props.itemType === "project") {
      props.setFormData((newData["status"] = "Active")); //default for project statsu
    }
    props.setFormData(newData); //sets formdata to new data from form
    // console.log(newData);
  };

  useEffect(() => {
    newData["prio"] = dropdownValue["prio"];
    newData["status"] = dropdownValue["status"];
    props.setFormData(newData);
  }, [dropdownValue]);

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-20">
      <div className="relative h-3/4 md:h-3/4 w-4/5 md:w-3/5 bg-white md:p-20 pb-20 opacity-100">
        <button
          onClick={props.closeModal}
          className="absolute right-5 top-5 md:right-8 md:top-8 h-10 w-20 bg-[#1D3557] text-lg text-white"
        >
          Close
        </button>
        {props.itemType === "project" ? (
          // PROJECT FORM
          <form
            onSubmit={props.handleSubmit}
            className="h-full w-full bg-white"
            autoComplete="off"
          >
            <div className="md:ml-4 pt-16 md:pt-0 w-full">
              <div className="md:mb-6 mb-4 flex mx-4 md:mx-0 flex-col">
                <label className="mb-1 text-lg ">Title</label>
                <input
                  id="title"
                  onChange={(e) => handleChange(e)}
                  value={props.formData.title}
                  maxLength={30}
                  className="md:w-2/3 w-full rounded-md border border-gray-500 p-2"
                  type="text"
                  placeholder="Enter a title"
                />
              </div>
              <div className="mb-4 mx-4 md:mx-0 md:mb-6 flex flex-col ">
                <label className="mb-1 text-lg">Description</label>
                <textarea
                  id="desc"
                  onChange={(e) => handleChange(e)}
                  value={props.formData.desc}
                  maxLength={150}
                  className="h-24 w-full md:w-2/3 resize-none border border-gray-500 pl-2 pt-2"
                  placeholder="Enter a description"
                />
              </div>
              <div className="mb-8 md:mb-8  mx-4 md:mx-0 flex flex-col">
                <label className="mb-1 text-lg">Team</label>
                <input
                  id="team"
                  onChange={(e) => handleChange(e)}
                  value={props.formData.team}
                  maxLength={30}
                  className="w-full md:w-2/3 rounded-md border border-gray-500 p-2"
                  type="text"
                  placeholder="Enter your team's name"
                />
              </div>
              <button className="h-12 w-36 ml-4 md:ml-0 bg-[#1D3557] text-lg text-white">
                Create Project
              </button>
            </div>
          </form>
        ) : (
          // TICKET FORM
          <form
            onSubmit={props.handleSubmit}
            className="h-full w-full bg-white"
            autoComplete="off"
          >
            <div className="ml-4">
              <div className="mb-6">
                <div className="w-96 mt-16 md:mt-0">
                  <div className="z-10 mt-1 flex flex-col">
                    <label className="mb-1 text-lg">Title</label>
                    <input
                      id="title"
                      onChange={(e) => handleChange(e)}
                      value={props.formData.title || ""}
                      maxLength={20}
                      className="md:w-72 w-64 rounded-md border border-gray-500 p-2"
                      type="text"
                      placeholder="Enter a title"
                    />
                  </div>
                  <div className="top-44 z-0 mt-6 flex flex-col">
                    <label className="mb-1 text-lg">Description</label>
                    <textarea
                      id="desc"
                      onChange={(e) => handleChange(e)}
                      value={props.formData.desc || ""}
                      maxLength={140}
                      className="md:h-32 w-64 h-20 md:w-72 resize-none border border-gray-500 pl-2 pt-2 "
                      placeholder="Enter a description"
                    />
                  </div>
                  <div className="top-96 mt-6 flex flex-col ">
                    <label className="mb-1 text-lg">Project</label>
                    <input
                      id="project"
                      onChange={(e) => handleChange(e)}
                      value={props.formData.project || ""}
                      maxLength={30}
                      className=" w-64 md:w-72 rounded-md border border-gray-500 p-2"
                      placeholder="Enter team name"
                    />
                  </div>
                </div>
                <div>
                  <div className=" absolute bottom-40 md:-right-14 md:top-20 z-20 md:mr-32 md:mb-20 h-12">
                    <DropdownMenu
                      listType="prio"
                      dropdownValue={dropdownValue}
                      setDropdownValue={setDropdownValue}
                      list={prioList}
                      title={"Priority"}
                    />
                  </div>
                </div>
              </div>
              <button className="absolute bottom-14 h-12 w-36 bg-[#1D3557] text-lg text-white">
                Create Ticket
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
