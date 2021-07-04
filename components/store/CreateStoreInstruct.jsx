import React from 'react'
import { Box,Button,Text } from "@chakra-ui/react"
const CreateStoreInstruct = ({nextStep}) => {
    return (
        <Box p={5} px={20}>
            <Text>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam vitae laborum temporibus quibusdam doloribus cupiditate error laudantium numquam quasi sapiente consectetur voluptate, cum minus eveniet corrupti commodi assumenda libero harum?
            </Text>
            <Box display="flex" alignItems="center">
          <Button
            onClick={nextStep}
            width="10%"
            ml="auto"
            >
             Next
          </Button>
          </Box> 
        </Box>
    )
}

export default CreateStoreInstruct
