import { data01 } from "../../tempData";
import DashboardStatus from "./DashboardStatus";
import DashboardProjectsInfo from "./DashboardProjectsInfo";
import { useEffect, useState } from "react";
import { useLogin } from "../../LoginProvider";
import axios from "axios";
import { useDashboard } from "../../DashboardProvider";

interface PieObjectType {
  name: string;
  value: number;
}

export const Dashboard = () => {
  const dashStatus = useDashboard();
  const login = useLogin();
  const id = login?.loginInfo._id;
  let test: any = [];
  //fix: assigned tickets not updating when deleted

  //state for pie chart
  const [pieData, setPieData] = useState<PieObjectType[]>([
    { name: "High", value: 0 },
    { name: "Medium", value: 0 },
    { name: "Low", value: 0 },
  ]);

  //state for user tickets
  const [userTicketList, setUserTicketList] = useState([{}]);

  //state for user projects
  const [userProjectList, setUserProjectList] = useState([]);

  //sum of all pie chart values
  let sum: number = pieData.reduce((accumulator: number, object: any) => {
    return accumulator + object.value;
  }, 0);

  //fetches all data for dashboard
  const fetchDashInfo = async (id: any) => {
    // console.log("fetching dash info", id)
    axios
      .all([
        axios.get("https://bug-tracker-f329.onrender.com/ticket/list"),
        axios.get("https://bug-tracker-f329.onrender.com/project/list"),
        axios.get(`https://bug-tracker-f329.onrender.com/user/teams/${id}`),
      ])
      .then(
        axios.spread((data1, data2, data3) => {
          const ticketList = data1.data;
          test = data1.data;
          const projectList = data2.data;
          const totalTickets = ticketList.length;
          const userTeamsResponse = data3.data;

          //get user projects
          const userProjects = userTeamsResponse.flatMap(
            (team: any) => team.projects
          );
          const newProjectList = userProjects.map((entry: any) => {
            return entry.projectId.title;
          });

          localStorage.setItem("userProjects", JSON.stringify(newProjectList));
          setUserProjectList(newProjectList);

          //get high/med/low prio numbers from tickets list
          const highPrioTickets = ticketList.filter(
            (entry: any, index: number) => {
              return entry.prio === "High";
            }
          );
          const medPrioTickets = ticketList.filter(
            (entry: any, index: number) => {
              return entry.prio === "Medium";
            }
          );
          const lowPrioTickets = ticketList.filter(
            (entry: any, index: number) => {
              return entry.prio === "Low";
            }
          );

          //pie chart data updates every time dashboard is loaded
          setPieData([
            { name: "High", value: highPrioTickets.length },
            { name: "Med", value: medPrioTickets.length },
            { name: "Low", value: lowPrioTickets.length },
          ]);

          //Dashboard Stats
          const assignedTicketList = ticketList.filter(
            (entry: any, index: number) => {
              return entry.dev !== "none";
            }
          );

          const activeProjects = projectList.filter(
            (entry: any, index: number) => {
              return entry.status === "Active";
            }
          );

          //set dashboard stats
          dashStatus?.setProjectDashboard({
            ...dashStatus.projectDashboard,
            totalTickets: totalTickets,
            activeProjects: activeProjects.length,
            assignedTickets: assignedTicketList.length,
            unassignedTickets: totalTickets - assignedTicketList.length,
          });
        })
      );
  };

  const fetchUserTickets = (fullName: string) => {
    const ticketList = test;

    //list of tickets assigned to current user
    const userTickets = ticketList.filter((entry: any, index: number) => {
      return entry.dev === fullName;
    });
    setUserTicketList(userTickets);
    // console.log(userTickets)

    //save user tickets to local storage
    if (userTickets.length > 0) {
      localStorage.setItem("assignedTickets", JSON.stringify(userTickets));
    }
  };

  useEffect(() => {
    const tempTickets: any = localStorage.getItem("assignedTickets");
    const tempProjects: any = localStorage.getItem("userProjects");
    let newId = "";

    if (id) {
      fetchDashInfo(id);
    } else {
      const loginState: any = localStorage.getItem("login state");
      console.log("else");
      const obj = JSON.parse(loginState);
      newId = obj._id;
      fetchDashInfo(newId);
      fetchUserTickets(obj.fullName);
    }

    if (tempTickets !== null) {
      const newTickets = JSON.parse(tempTickets);
      setUserTicketList(newTickets);
    }

    if (tempProjects !== null) {
      const newProjects = JSON.parse(tempProjects);
      setUserProjectList(newProjects);
    }

    if (id) {
      //  saves login info to local storage
      axios
        .get(`https://bug-tracker-f329.onrender.com/user/${id}`)
        .then((response) => {
          localStorage.setItem("login state", JSON.stringify(response.data));
          login?.setLoginInfo({ ...response.data });
          fetchUserTickets(response.data.fullName);
        });
    }

    // axios
    //   .get(`http://localhost:3002/user/${id}`)
    //   .then((response) => {
    //     localStorage.setItem("login state", JSON.stringify(response.data));
    //     login?.setLoginInfo({ ...response.data });
    //     fetchUserTickets(response.data.fullName);

    // if (!id) {
    //   const temp: any = localStorage.getItem("login state");
    //   const obj = JSON.parse(temp);
    //   let newId:string = obj._id;

    // axios
    //   .get(`http://localhost:3002/user/${newId}`)
    //   .then((response) => {
    //     localStorage.setItem("login state", JSON.stringify(response.data));
    //     login?.setLoginInfo({ ...response.data });
    //     console.log(response.data)
    //   })
    //   .catch((error) => {
    //     console.log("error", error.message);
    //   });

    //   //FIX
    // axios.get(`http://localhost:3002/team/${newId}`).then((response) => {
    //   const test = JSON.stringify(response.data);
    //   console.log('team newid response' , response.data)
    //   localStorage.setItem("team state", test);
    //   // console.log(response.data)
    //   // setUserProjectList(response.data.projects);
    // });
    // }

    // if (id) {
    // fetchDashInfo();
    //   const tempUserProjects:any = localStorage.getItem("userProjects")
    //   const userProjectObj:any = JSON.parse(tempUserProjects)

    //   axios
    //     .get(`http://localhost:3002/user/${id}`)
    //     .then((response) => {
    //       localStorage.setItem("login state", JSON.stringify(response.data));
    //       login?.setLoginInfo({ ...response.data });
    //       fetchUserTickets(response.data.fullName);
    //     })
    //     .catch((error) => {
    //       console.log(error.data);
    //     });

    //   //get projects
    //   const temp: any = localStorage.getItem("team state");

    //   if (!temp) {
    //     axios.get(`http://localhost:3002/team/${id}`).then((response) => {
    //       const test = JSON.stringify(response.data);
    //       localStorage.setItem("team state", test);
    //       // setUserProjectList(response.data.projects);
    //     });
    //   } else {
    //     const obj = JSON.parse(temp);
    //     // setUserProjectList(obj.projects);
    //   }
    //
    // }
  }, []);

  return (
    <div className="flex h-full  w-full flex-col bg-[#F4F6F6] md:w-5/6">
      <DashboardStatus
        setPieData={setPieData}
        setUserTicketList={setUserTicketList}
      />
      <DashboardProjectsInfo
        pieData={pieData}
        sum={sum}
        ticketList={userTicketList}
        projectList={userProjectList}
      />
    </div>
  );
};
