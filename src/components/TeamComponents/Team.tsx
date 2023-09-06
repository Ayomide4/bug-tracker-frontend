import { useEffect, useState } from "react";
import { useLogin } from "../../LoginProvider";
import ClipLoader from "react-spinners/ClipLoader";
import SelectTeam from "./SelectTeam";
import axios from "axios";
import AddMember from "./AddMember";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

//TODO: ADD DEVELOPER FUNCTIONALITY

interface memberType {
  memberArray: any[];
  memberArrayLength: number;
}

export default function Team(props: any) {
  const [dropdownValue, setDropdownValue] = useState({
    prio: "",
    status: "new",
  });
  const [list, setList] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState<boolean>(false);
  const [memberName, setMemberName] = useState<string>("");
  const [members, setMembers] = useState<memberType>({
    memberArrayLength: 1,
    memberArray: [],
  });
  const [teams, setTeams] = useState([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [projects, setProjects] = useState<object[]>([]);
  const navigate = useNavigate();

  //info for selected Item

  const login = useLogin();
  let manager = {};
  let id = "";

  const handleClick = () => {
    props.setTrigger((prev: boolean) => !prev);
  };

  const handleClickProjects = () => {
    navigate("/projects");
  };

  const selectProject = () => {
    props.setIsSelected((prev: boolean) => !prev);
  };

  const setInfo = (e: any, entry: any) => {
    if (entry !== undefined || entry !== null) {
      props.setIsSelected((prev: boolean) => !prev);
      props.setSelectedInfo({
        ...props.selectedInfo,
        title: entry.projectId.title,
        desc: entry.projectId.desc,
        manager: entry.projectId.manager,
        team: entry.projectId.team,
        status: entry.projectId.status,
        date: entry.projectId.date,
        id: entry.projectId._id,
        deadline: entry.projectId.deadline,
        tickets: entry.projectId.tickets,
      });
    }
  };

  const renderMembers = members.memberArray.map((entry: any, index: number) => {
    return entry.fullName ? (
      <tr className="table-row cursor-pointer hover:bg-gray-200" key={index}>
        <td id="memberName" key={index} className="w-1/12 pl-2">
          {entry.fullName}
        </td>
      </tr>
    ) : (
      <tr className="table-row cursor-pointer hover:bg-gray-200" key={index}>
        <td id="memberName" key={index} className="w-1/12 pl-2">
          {entry.memberId.fullName}
        </td>
      </tr>
    );
  });

  const renderProjects = projects.map((entry: any, index: number) => {
    return (
      <tr
        className="table-row cursor-pointer hover:bg-gray-200"
        key={index}
        onClick={(e) => setInfo(e, entry)}
      >
        <td className="w-1/2 whitespace-nowrap pl-2">
          {entry.projectId.title}
        </td>
        <td className="w-1/2 whitespace-nowrap pl-2">
          {entry.projectId.status}
        </td>
      </tr>
    );
  });

  const fetchData = async (obj: any) => {
    //GET TEAM DATA
    await axios
      .get(`https://bug-tracker-f329.onrender.com/team/${obj._id}`)
      .then((response) => {
        const test = JSON.stringify(response.data);
        localStorage.setItem("team state", test);
        props.setMyTeamName(response.data.teamName);
        manager = response.data.manager;
        let tempData = [...response.data.members];
        setMembers({ ...members, memberArray: tempData.reverse() });
        setProjects([...response.data.projects]);
      });
  };

  const fetchUser = async (obj: any) => {
    axios
      .get(`https://bug-tracker-f329.onrender.com/user/${obj._id}`)
      .then((response) => {
        localStorage.setItem("login state", JSON.stringify(response.data));
        login?.setLoginInfo({ ...response.data });
      });
  };

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const temp: any = localStorage.getItem("login state");
      const obj: any = JSON.parse(temp);
      setIsAdmin(obj.isAdmin);

      if (!props.member) {
        fetchData(obj);
      }

      setLoading((prev) => !prev);
      props.setHasLoaded(true);
      setLoading(false);
      // renderMembers
      fetchUser(obj);
      setList(obj.teams);
      //time out was 450
    }, 100);
  }, [props.trigger, members.memberArrayLength, props.isModalOpen]);

  return (
    <div>
      {loading || !props.selected ? (
        <div className="flex h-screen w-full items-center justify-center ">
          <ClipLoader
            color={"#1D3557"}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <h1 className="ml-6 mt-6 mb-8 text-2xl font-semibold text-[#1D3557]">
            Teams
          </h1>
          <div className="absolute top-4 right-24 flex md:right-8">
            {!isAdmin && (
              <button
                onClick={handleClick}
                className="text-md mr-2 h-12 w-32 bg-[#1D3557] px-2 text-white"
              >
                Create Team
              </button>
            )}
            <SelectTeam
              list={list}
              setMyTeamName={props.setMyTeamName}
              setProjects={setProjects}
              members={members}
              setMembers={setMembers}
            />
          </div>
          <div className="z-0 mb-8 flex w-screen flex-col items-center md:w-full md:flex-row md:items-start md:justify-evenly">
            {/* TEAM LIST */}
            <div className="mb-4 h-80 w-11/12 rounded border border-[#1D3557] bg-white shadow-sm md:w-5/12">
              <div className="flex items-center justify-between py-2">
                <h2 className=" ml-2 text-xl font-semibold text-[#1D3557]">
                  {props.myTeamName}
                </h2>
                <button
                  className="text-md mr-2 h-8 w-32 bg-[#1D3557] px-2 text-white"
                  onClick={() => setIsMemberModalOpen((prev) => !prev)}
                >
                  Add Member
                </button>
              </div>
              <div className="w-full border border-x-0 border-b-0 border-black">
                <table className="h-full w-full table-fixed">
                  <thead className="bg-[#F3F4F6] text-left text-[#707785]">
                    <tr>
                      <th className="w-full pl-2">Members</th>
                    </tr>
                  </thead>
                  <tbody className="relative z-0 block max-h-60 w-full flex-none overflow-scroll text-left">
                    {renderMembers}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PROJECT LIST */}
            <div className="h-80 w-11/12 rounded border border-[#1D3557] bg-white shadow-sm md:w-6/12">
              <div className="flex w-full items-center justify-between pt-2">
                <h2 className="mb-2 px-2 text-xl font-semibold text-[#1D3557]">
                  Projects
                </h2>
                <div className="flex items-center pb-2">
                  <button
                    className="text-md mr-2 h-8 w-32 bg-[#1D3557] px-2 text-white"
                    onClick={handleClickProjects}
                  >
                    Create Project
                  </button>
                </div>
              </div>
              <div className="w-full border border-x-0 border-b-0 border-black">
                {/* PROJECT SCROLL */}
                <div className="max-h-66 w-full overflow-y-scroll">
                  <table className="w-full">
                    <thead className="sticky top-0 z-0 w-full bg-[#F3F4F6] text-left text-[#707785]">
                      <tr>
                        <th className="w-1/2 pl-2">Title</th>
                        <th className="w-1/2 pl-2 ">Status</th>
                      </tr>
                    </thead>
                    <tbody>{renderProjects}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <AddMember
            manager={(manager = {})}
            members={members}
            setMembers={setMembers}
            id={login?.loginInfo._id}
            isModalOpen={isMemberModalOpen}
            setIsModalOpen={setIsMemberModalOpen}
            memberName={memberName}
            setMemberName={setMemberName}
          />
        </>
      )}

      <ToastContainer />
    </div>
  );
}
