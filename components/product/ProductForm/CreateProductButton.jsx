import React from 'react'
import { Box,Button  } from "@chakra-ui/react"

const CreateProductButton = ({loading,nextStep,data}) => {
    return (
        <Box display="flex" alignItems="center">
        <Button
          onClick={nextStep}
          width="100%"
          ml={2}
          disabled={loading || !data}
          >
           Next
        </Button>
        </Box> 
    )
}

export default CreateProductButton
