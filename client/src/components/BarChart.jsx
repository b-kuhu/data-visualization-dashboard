import { useEffect, useState } from "react";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
 } from 'chart.js';

import { Bar } from 'react-chartjs-2';
ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
 );

const options ={
      indexAxis: 'y',
      elements: {
         bar:{
            borderWidth: 2,
         }
      },
      responsive:true,
      plugins:{
         legend:{
            postion:'right'
         },
         title: {
            display: true,
            text: 'Top Countries'
          }
      }
   }

const BarChart = () => {
  const [data,setData] = useState({
   labels:[],
   datasets: [
     {
       label: 'Percentages',
       data:[],
       borderColor: 'rgb(255, 99, 132)',
       backgroundColor: '#ADD8E6',
       borderRadius: 5,
     }]
  })
  useEffect(() => {
   const fetchData = async () => {
      const output = await fetch("../../data.json");
      const res = await output.json();
      const arr = res.map((item) => item.country);
  
     // calculate frequencies
      const getCountryFrequencies = (countries) => {
        const countryFreq = {};
    
        // Iterate over the array of countries
        countries.forEach(country => {
            // If the country already exists in the countryFreq object, increment its count
            if (countryFreq[country]) {
                countryFreq[country]++;
            } else {
                // Otherwise, initialize its count to 1
                countryFreq[country] = 1;
            }
        });
    
        // Convert the countryFreq object into an array of objects
        const result = Object.keys(countryFreq).map(country => {
            return { name: country,frequency:countryFreq[country] };
        });
    
        return result;
    }  
    // store the result into an array
    let topCountries = getCountryFrequencies(arr);
    topCountries = topCountries.filter(item => item.frequency > 15 && item.name != '').sort((a, b) => b.frequency - a.frequency)

    const names = topCountries.map(country => country.name );
    const frequencies = topCountries.map(country => (country.frequency/res.length)*100 )
    
    setData({
      labels : names,
      datasets:[
         {
            label: 'Percentages',
            data : frequencies,
            borderColor: '#03254c',
            backgroundColor: '#187bcd',
            borderRadius: 15
         }
      ]
    })
   };
    fetchData();
  }, []);
  


  return (
   <div style={{backgroundColor:'lightblue'}}>
      <Bar data ={data} options = {options} />
   </div>
  );
};

export default BarChart;
