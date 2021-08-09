import React from 'react'
import { Box } from "@chakra-ui/react"
import { Bar    } from 'react-chartjs-2';

const ProductStats = ({data}) => {
    const stats = {
        labels: data?.products.map(i=>i.productName),
        datasets: [
          {
            label: 'sold count',
            data: data?.products.map(i=>i.sold),
            backgroundColor: " rgb(254,189,105)",
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
            <Box width="90%" height="95%"  ml="auto" mr="auto" color="black">
              <Bar  data={stats} 
              options={options}
              />
            </Box>
        </Box>
    )
}

export default ProductStats
