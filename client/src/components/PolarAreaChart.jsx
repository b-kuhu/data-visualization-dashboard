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
        labels: [],
        datasets: [
          {
            label: 'Sectors',
            data: [] ,
            backgroundColor: [],
            borderWidth: 1,
          },
        ],
    })
    useEffect(() =>{
        const fetchData = async() =>{
            const data = await fetch('../../data.json')
            const jsonData = await data.json();
            const sectorData = jsonData.map(item => item.sector);

            const getSectorFrequencies = (sectors) => {
                const sectorFreq = {};
            
                // Iterate over the array of countries
                sectors.forEach(sector => {
                    // If the country already exists in the countryFreq object, increment its count
                    if (sectorFreq[sector]) {
                        sectorFreq[sector]++;
                    } else {
                        // Otherwise, initialize its count to 1
                        sectorFreq[sector] = 1;
                    }
                });
            
                // Convert the countryFreq object into an array of objects
                const result = Object.keys(sectorFreq).map(sector=> {
                    return { name: sector,frequency:sectorFreq[sector] };
                });
            
                return result;
            }  
            let topSectors = getSectorFrequencies(sectorData);
            topSectors = topSectors.filter(sector => sector.frequency >10 && sector.frequency<100 && sector.name!='').sort((a, b) => b.frequency - a.frequency);
            console.log(topSectors);

            const sectors = topSectors.map(sector => sector.name);
            const frequencies = topSectors.map(sector => sector.frequency)
            
            //get all the unique values from the data
            // const getUniqueValues = (value,index,arr) =>{
            //     return arr.indexOf(value) === index && value!='';
            // }
            // const sectors = sectorData.filter(getUniqueValues);
            console.log(frequencies);
            setData({
                labels: sectors,
                datasets: [
                    {
                        label: 'Sectors',
                        data: frequencies ,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(205, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)',
                            
                            'rgba(252, 92, 130, 0.5)',
                            'rgba(59, 132, 105, 0.5)',
                            'rgba(25, 6, 96, 0.5)',
                            // 'rgba(55, 198, 112, 0.5)',
                            // 'rgba(93, 202, 255, 0.5)',
                            // 'rgba(155, 159, 44, 0.5)',
                            
                            // 'rgba(145, 89, 132, 0.5)',
                            // 'rgba(54, 162, 235, 0.5)',
                            // 'rgba(195, 206, 46, 0.5)',
                            // 'rgba(135, 192, 192, 0.5)',
                            // 'rgba(73, 102, 255, 0.5)',
                            // 'rgba(185, 159, 64, 0.5)',
                            
                        ],
                        borderWidth: 1,
                    },
                ],
            })
        } 
        fetchData()
    },[])

    return <div style={{height:'500px',width:'800px'}}>
        <PolarArea data={data} />
    </div>
}

export default PolarAreaChart;