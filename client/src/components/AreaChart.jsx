// visualizing start and end year

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
import { useEffect, useState } from 'react';
  import { Line } from 'react-chartjs-2';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };  
const AreaChart = () => {
    const [data,setData] = useState({
        label:[],
        datasets: [
          {
            fill: true,
            label: 'start-year',
            data: [],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            fill: true,
            label: 'end-year',
            data: [],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(153, 52, 235, 0.5)',
          }
        ],
    })

    useEffect( () =>{
        const fetchData = async () => {
            const res = await fetch('../../data.json');
            const resJson = await res.json();
            let start_year = resJson.map(item => item.start_year);
            let end_year = resJson.map(item => item.end_year);

            
            const getUniqueValues = (value,index,arr) => {
                return arr.indexOf(value) === index && value!='' && value<'2022'
                
            }
            start_year = start_year.filter(getUniqueValues);
            end_year = end_year.filter(getUniqueValues)

            console.log(end_year);
            setData({
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [
                    {
                        fill: true,
                        label: 'start-year',
                        data: start_year,
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(23, 62, 235, 0.5)',  
                    },
                    {
                        fill: true,
                        label: 'end-year',
                        data: end_year,
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(103, 152, 235, 0.5)',
                    }
                ]
            })
        }
        fetchData()
    },[])


    return <div>
       <Line options={options} data={data}/>
    </div>
}
export default AreaChart; 