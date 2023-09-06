import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const notifyTeam = (payload: number) => {
  if (payload === 200) {
    toast.success("Member Added", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else if (payload === 409) {
    toast.error("User is already a part of your team!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else if (payload === 404) {
    toast.error("User does not exist!", {
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

interface memberType {
  memberArray: any[];
  memberArrayLength: number;
}

type Props = {
  manager: any;
  members: memberType;
  setMembers: React.Dispatch<React.SetStateAction<memberType>>;
  id: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  memberName: string;
  setMemberName: React.Dispatch<React.SetStateAction<string>>;
};

export default function AddMember({
  manager,
  members,
  setMembers,
  id,
  isModalOpen,
  setIsModalOpen,
  memberName,
  setMemberName,
}: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    let prevLength = members.memberArrayLength;
    e.preventDefault();
    setIsModalOpen((prev) => !prev);

    if (memberName === members.memberArray[0].fullName) {
      notifyTeam(409);
      return;
    }
    axios
      .patch(`https://bug-tracker-f329.onrender.com/team/members/${id}`, {
        memberName: memberName,
      })
      .then((response) => {
        notifyTeam(response.status);
        setMembers({ ...members, memberArrayLength: prevLength + 1 });
      })
      .catch((error) => {
        if (error.response.status === 409) {
          notifyTeam(error.response.status);
        } else if (error.response.status === 404) {
          notifyTeam(error.response.status);
        }
        console.log(`error ${error}`);
      });
  };

  const handleChange = (e: any) => {
    setMemberName(e.target.value);
  };

  return (
    <>
      {isModalOpen && (
        <div className="absolute top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-20">
          <div className="relative h-40 w-72 bg-white opacity-100 md:h-32 md:w-2/5 md:p-10">
            <button
              className="absolute top-4 left-6 h-7 w-20 bg-[#1D3557] text-white"
              onClick={() => setIsModalOpen((prev) => !prev)}
            >
              Cancel
            </button>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mt-12 flex flex-col items-center justify-start md:mt-4 md:flex-row">
                <h1 className="font-medium md:text-lg">Enter Full Name</h1>
                <input
                  className="border  border-black md:ml-8"
                  onChange={(e) => handleChange(e)}
                />
                <button className="mt-4 ml-4 h-8 w-20 bg-[#1D3557] text-lg text-white md:mt-0">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
