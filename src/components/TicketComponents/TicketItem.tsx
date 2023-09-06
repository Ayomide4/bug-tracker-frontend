import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { notify } from "../ProjectComponents/Project";
import { ToastContainer } from "react-toastify";
import CreateItem from "../CreateItem";

export default function TicketItem(props: any) {
  const [data, setData] = useState<{}[]>([{}]);
  const [trigger, setTrigger] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    status: "active",
    prio: "",
    dev: "none",
    project: "",
  });

  let openCount = 0;
  let devCount = 0;

  const fetchData = async () => {
    //FETCH DATA FROM TICKET DB
    axios
      .get("https://bug-tracker-f329.onrender.com/ticket/list")
      .then((res) => {
        const list: {}[] = res.data;
        setData(list.reverse());
        props.setListLength(res.data.length); //getting the length of the array of objects to render total items
        props.setTicketStatus({ development: devCount, open: openCount });
      })
      .catch((err) => console.log(err));
  };

  //const activeTickets = data.filter((entry:any) => entry.status === 'New')
  useEffect(() => {
    fetchData();
  }, [props.listLength]);

  const displayItems = data.map((entry: any, index: number) => {
    if (entry.status === "Open") {
      openCount = openCount + 1;
    }
    if (entry.status === "Development") {
      devCount = devCount + 1;
    }

    return (
      <tr className="cursor-pointer hover:bg-gray-200" key={index}>
        <td className="max-h-1 whitespace-nowrap pl-4 text-lg">
          {entry.title}
        </td>
        <td className="max-h-1 max-w-4xl whitespace-nowrap px-2 text-lg">
          {entry.desc !== undefined && entry.desc.length > 40
            ? `${entry.desc.substring(0, 40)}...`
            : entry.desc}
        </td>
        <td className="max-h-1 whitespace-nowrap text-lg">{entry.status}</td>
        <td className="max-h-1 whitespace-nowrap text-lg">{entry.prio}</td>
        <td className="max-h-1 whitespace-nowrap text-lg">{entry.dev}</td>
      </tr>
    );
  });

  const handleClick = () => {
    setTrigger((trigger) => !trigger);
    const blankData = {
      ...formData,
      title: "",
      desc: "",
      prio: "",
    };

    setFormData(blankData);
  };

  return (
    <div
      className={`shadow-outline relative h-itemContainer w-full rounded-lg border border-[#2A6470] bg-white md:h-auto md:max-h-screen`}
    >
      <CreateItem
        trigger={trigger}
        closeModal={handleClick}
        notify={notify}
        listLength={props.listLength}
        setListLength={props.setListLength}
        itemType={"ticket"}
        formData={formData}
        setFormData={setFormData}
      />
      <div className="flex justify-between p-4">
        <h2 className="text-xl text-[#1D3557]">Tickets</h2>
        <button
          onClick={handleClick}
          className="rounded-md border bg-[#1D3557] p-2 text-base text-white"
        >
          New Ticket
        </button>
      </div>
      <div className="h-96 max-h-96 overflow-y-scroll">
        <table className="w-full">
          <thead className="text-left text-[#707785]">
            <tr>
              <th className="sticky top-0 max-h-6 w-52 bg-[#F3F4F6] py-3 pl-4">
                Title
              </th>
              <th className="sticky top-0 max-h-6 bg-[#F3F4F6] py-3 px-2">
                Description
              </th>
              <th className="sticky top-0 max-h-6 w-32 bg-[#F3F4F6] py-3">
                Status
              </th>
              <th className="sticky top-0 max-h-6 w-32 bg-[#F3F4F6] py-3">
                Priority
              </th>
              <th className="sticky top-0 max-h-6 w-52 bg-[#F3F4F6] py-3">
                Ticket Author
              </th>
            </tr>
          </thead>
          <tbody className="text-left">
            {displayItems !== undefined ? displayItems : null}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}
