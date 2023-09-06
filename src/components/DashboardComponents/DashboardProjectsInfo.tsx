import React from "react";
import { PieChartComp } from "../PieChart";

import { RxDoubleArrowRight } from "react-icons/rx";

interface Props {
  sum: number;
  pieData: any;
  ticketList: {}[];
  projectList: any;
}

export default function DashboardProjectsInfo({
  sum,
  pieData,
  ticketList,
  projectList,
}: Props) {


  return (
    <div className=" mx-4 mt-4 grid h-full grid-cols-1 grid-rows-2 gap-4 md:mt-10 md:h-72 md:grid-cols-3">
      {/* Project Prio Comp */}
      <div className=" row-span-full rounded-md bg-white p-4 shadow-md">
        <h2 className="text-center text-xl font-semibold">Tickets Priority</h2>
        <PieChartComp data={pieData} />
        <div className="flex w-full justify-evenly">
          {
            //Returns the high/med/low categories and percent of each category
            pieData.map((entry: any, index: number) => {
              return (
                <div
                  className="flex flex-col items-center justify-center"
                  key={index}
                >
                  <h2 className="font-semibold">{entry.name}</h2>
                  <h2>{`${((entry.value / sum) * 100).toFixed(2)}%`}</h2>
                </div>
              );
            })
          }
        </div>
      </div>

      {/* Your projects comp */}
      <div className=" relative row-span-2 rounded-md bg-white shadow-md">
        <h2 className="p-4 text-center text-xl font-semibold">Your Projects</h2>
        <div className="flex h-44 flex-col px-8">
          {/* {projectList.map((entry: any, index: number) => {
            if (index < 5) {
              return (
                <li key={index} className="mb-2 list-none">

                    {entry.projectId.title}

                </li>
              );
            }
          })} */
          
          projectList.map((entry: any, index: number) => {
            if (index < 5) {
              return (
                <li key={index} className="mb-2 list-none">
                    {entry}
                </li>
              );
            }
          })
          }
          <div className="">
            <a
              href="/projects"
              className="text-md absolute bottom-5 right-5 mt-6 flex items-center justify-end font-semibold text-blue-800"
            >
              <h2 className="mr-2">more projects</h2>
              <RxDoubleArrowRight size={20} color="#1F41AF" />
            </a>
          </div>
        </div>
      </div>

      {/* Assigned Tickets comp */}
      <div className="relative row-span-2 rounded-md bg-white shadow-md">
        <h2 className="p-4 text-center text-xl font-semibold">
          Assigned Tickets
        </h2>
        <div className="flex h-44 flex-col px-8">
          {ticketList.map((entry: any, index: number) => {
            if (index < 5) {
              return (
                <li key={index} className="mb-2 list-none">
                    {entry.title}
                </li>
              );
            }
          })}
          <div className="">
            <a
              href="/tickets"
              className="text-md absolute bottom-5 right-5 flex items-center justify-end font-semibold text-blue-800"
            >
              <h2 className="mr-2">more tickets</h2>
              <RxDoubleArrowRight size={20} color="#1F41AF" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
