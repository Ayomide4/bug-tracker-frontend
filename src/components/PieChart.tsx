import { PureComponent } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';



export function PieChartComp(props:any) {
  const demoUrl = 'https://codesandbox.io/s/two-simple-pie-chart-otx9h';
  const colors: string[] = ['#E63946', '#FFC211', '#457B9D']

  

    return (
      <ResponsiveContainer width="100%" height="70%">
        <PieChart width={400} height={400}>
          <Pie
            data={props.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={true}
          >
            {props.data.map((entry:any, index:number) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip/>
        </PieChart>
      </ResponsiveContainer>
      );
    }
    
    //   <ResponsiveContainer width="100%" height="70%">
    //     <PieChart width={400} height={400} > 
    //       <Pie
    //         dataKey="value"
    //         isAnimationActive={true}
    //         data={props.data}
    //         cx="50%"
    //         cy="50%"
    //         outerRadius={80}
            
    //       />
            
    //       <Tooltip />
    //     </PieChart>
    //   </ResponsiveContainer>