import React, { useState, useCallback, FormEvent } from "react";
import axios from "axios";

type teamType = {
  title: string;
  manager: any;
};

export default function CreateTeamModal(props: any) {
  const temp: any = localStorage.getItem("login state");
  const obj: any = JSON.parse(temp);
  const name = `${obj.firstName} ${obj.lastName}`;

  const [team, setTeam] = useState<teamType>({
    title: "",
    manager: name,
  });

  const handleChange = (e: any) => {
    setTeam({ ...team, title: e.target.value });
  };

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      //gets user obj
      axios
        .patch(`https://bug-tracker-f329.onrender.com/user/teams/${obj._id}`, {
          title: team.title,
        })
        .then((response) => {
          let obj = { ...response.data };
          localStorage.setItem("login state", JSON.stringify(obj));
          props.setTrigger((prev: boolean) => !prev);
        })
        .catch((error) => {
          console.log(error.data);
        });
    },
    [team]
  );

  return (
    <div className="absolute top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-20">
      <div className="relative h-60 w-3/5 bg-white pt-10 opacity-100 md:h-40 md:w-2/5 md:p-10">
        <button
          className="absolute top-4 left-6 h-6 w-20 bg-[#1D3557] text-white"
          onClick={() => props.setIsModalOpen(false)}
        >
          Cancel
        </button>
        <form onSubmit={(e) => handleSubmit(e)} className="">
          <div className="mt-6 items-center justify-between md:flex">
            <div className="flex flex-col items-center md:flex-row">
              <label className="mb-1 text-xl font-medium">Team Name</label>
              <input
                id="team"
                onChange={(e) => handleChange(e)}
                value={team.title}
                className="h-8 w-36 border border-black p-2 md:ml-4 md:w-52"
              />
            </div>
            <button className="ml-10 mt-5 h-12 w-36 bg-[#1D3557] text-lg text-white md:mt-0 md:ml-0 ">
              Create Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
