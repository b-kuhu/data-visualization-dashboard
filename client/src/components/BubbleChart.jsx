import {Chart as ChartJS,LinearScale, PointElement,Tooltip,Legend} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bubble } from 'react-chartjs-2';
ChartJS.register(LinearScale, PointElement, Tooltip, Legend);
const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive:true,
      plugins:{
         legend:{
            postion:'top',
         },
         title: {
            display: true,
            text: 'Likelihood vs relevance'
          }
      }
  };


const BubbleChart = () => {
    const [data,setData] = useState({
        datasets : [
            {
                label: 'likelihood',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            },
            {
                label: 'relevance',
                data:[],
                backgroundColor: 'rgba(53, 162, 235, 0.5)'
            }



        ]
    })

    useEffect( () =>{
        const fetchData = async () => {
            const res = await fetch('../../data.json');
            const resJson = await res.json();

            const likelihoodData = resJson.map(item => item.likelihood)
            likelihoodData.splice(30,likelihoodData.length)
            const relevanceData = resJson.map(item => item.relevance)
            relevanceData.splice(30,relevanceData.length)
            console.log(relevanceData);

            setData({
                datasets: [
                    {
                        label:'likelihood',
                        data: likelihoodData.map((likelihood) => ({
                            x: likelihood,
                            y: Math.random()*20+ 1,
                            r: Math.random()*20 + 1
                        })),
                        backgroundColor: 'rgba(255, 99, 132, 0.5)'
                    },
                    {
                        label:'relevance',
                        data: relevanceData.map((relevance) => ({
                            x: relevance,
                            y: Math.random()*20 + 1,
                            r: Math.random()*20 + 1
                        })),
                        backgroundColor: 'rgba(53, 162, 235, 0.5)'
                    }
                ]
            })
        }
        fetchData()
    },[])
    return <div style={{width:'500px',height:'500px'}}>
        <Bubble options={options} data={data} />
    </div>
}

export default BubbleChart;