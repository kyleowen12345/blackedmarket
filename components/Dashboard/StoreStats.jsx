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
            backgroundColor: " rgb(254,189,105)",
            borderColor: 'rgb(252,142,0)',
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
