import React from 'react'
import { Box,useMediaQuery  } from "@chakra-ui/react"
import { Bar    } from 'react-chartjs-2';
const StoreStats = ({data}) => {
  const [isSmallerThan100] = useMediaQuery("(max-width: 1000px)")
    const stats = {
        labels: data?.stores.map(i=>i.storeName),
        datasets: [
          {
            label: 'followers count',
            data: data?.stores.map(i=>i.followers.length),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
            
          },
        ],
      };
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales:{
          x:{
            ticks:{
              callback:function(value){
                if(isSmallerThan100) {
                  return this.getLabelForValue(value).substr(0,7)
                }else{
                  return this.getLabelForValue(value).substr(0,20)
                } 
                 
              }
            }
          },
          y:{
            beginAtZero:true
          }
        }
        
      };
    return (
        <Box width={["100%","100%","100%","70%"]}  bg="white" height="300px" borderRadius={5} boxShadow="md" mt={[2,2,2,0]} >
         <Box width={["95%","95%","95%","90%"]} height={["100%","100%","100%","95%"]} ml="auto" mr="auto" color="black">
              <Bar  data={stats} 
              options={options}
              />
            </Box>
        </Box>
    )
}

export default StoreStats
