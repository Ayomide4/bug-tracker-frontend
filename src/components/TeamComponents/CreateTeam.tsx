import React from "react";
import CreateTeamModal from "./CreateTeamModal";

interface Props {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateTeam({
  trigger,
  setTrigger,
  isModalOpen,
  setIsModalOpen,
}: Props) {
  const handleClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <>
        <h1 className="ml-6 mt-6 mb-8 text-2xl font-semibold text-[#1D3557]">
          Teams
        </h1>
        <h1 className="h-32 text-center text-xl">
          Create your team to see more!
        </h1>
        <button
          className="absolute top-5 right-5 h-12 w-36 rounded-lg bg-[#1D3557] text-white md:top-10 md:right-10 "
          onClick={handleClick}
        >
          Create Team
        </button>
      </>

      {isModalOpen && (
        <CreateTeamModal
          setTrigger={setTrigger}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}
