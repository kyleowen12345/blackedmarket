import React from 'react'
import { Box } from "@chakra-ui/react"
import { Line    } from 'react-chartjs-2';
const StoreStats = ({data}) => {
    const stats = {
        labels: data?.stores.map(i=>i.storeName),
        datasets: [
          {
            label: 'follower count',
            data: data?.stores.map(i=>i.followers.length),
            backgroundColor: "rgb(252,142,0)",
            borderColor: 'rgb(252,142,0)',
            borderWidth: 2,
            
          },
        ],
      };
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
    return (
        <Box width={["100%","100%","100%","70%"]}  bg="white" height="300px" borderRadius={5} boxShadow="md" mt={[2,2,2,0]}>
         <Box width="90%" height="95%" ml="auto" mr="auto" color="black">
              <Line  data={stats} 
              options={options}
              />
            </Box>
        </Box>
    )
}

export default StoreStats
