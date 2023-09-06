import React, {createContext, useContext, useState} from 'react'

export interface projectDashboardType {
  activeProjects: number;
  totalTickets: number;
  assignedTickets: number;
  unassignedTickets: number;
}

interface contextType {
  projectDashboard: projectDashboardType
  setProjectDashboard: React.Dispatch<React.SetStateAction<projectDashboardType>>
}

const DashboardContext = createContext<contextType | null>(null)

export function useDashboard() {
  return useContext(DashboardContext)
} 


export default function DashboardProvider({children}: any) {
  
  const [projectDashboard, setProjectDashboard] = useState<projectDashboardType>({
    activeProjects: 0,
    totalTickets: 0,
    assignedTickets: 10,
    unassignedTickets: 30, 
  })

  return (
    <DashboardContext.Provider value={{projectDashboard, setProjectDashboard}}>
      {children}
    </DashboardContext.Provider>
  )
}
