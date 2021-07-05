import React from 'react'
import { Box,Button  } from "@chakra-ui/react"

const UpdateStoreButtons = ({loading,nextStep}) => {
    return (
        <Box display="flex" alignItems="center">
        <Button
          onClick={nextStep}
          width="100%"
          ml={2}
          disabled={loading }
          >
           Next
        </Button>
        </Box> 
    )
}

export default UpdateStoreButtons
