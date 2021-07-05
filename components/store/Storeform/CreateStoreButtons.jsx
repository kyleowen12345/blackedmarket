import React from 'react'
import { Box,Button  } from "@chakra-ui/react"

const CreateStoreButtons = ({prevStep,loading,nextStep,data}) => {
    return (
        <Box display="flex" alignItems="center">
        <Button
          onClick={prevStep}
          width="50%" 
          disabled={loading}
          >
           Back
        </Button> 
        <Button
          onClick={nextStep}
          width="50%"
          ml={2}
          disabled={loading || !data}
          >
           Next
        </Button>
        </Box> 
    )
}

export default CreateStoreButtons
