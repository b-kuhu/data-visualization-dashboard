import { useEffect, useState } from "react";

import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea} from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarAreaChart = () =>{

    const [data,setData] = useState({
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange' ],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
            ],
            borderWidth: 1,
          },
        ],
    })
    useEffect(() =>{
        const fetchData = async() =>{
            const data = await fetch('../../data.json')
            const jsonData = await data.json();
            const sectorData = jsonData.map(item => item.sector);

            //get all the unique values from the data
            const getUniqueValues = (value,index,arr) =>{
                return arr.indexOf(value) === index && value!='';
            }
            var sectors = sectorData.filter(getUniqueValues);
            console.log(sectors);
        } 
        fetchData()
    },[])

    return <>
        <h2>PolarAreaChart</h2>
        <PolarArea data={data} />
    </>
}

export default PolarAreaChart;