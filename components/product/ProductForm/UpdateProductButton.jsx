import React from 'react'
import { Box,Button  } from "@chakra-ui/react"
import { useRouter } from 'next/router'
const UpdateProductButton = () => {
    const router = useRouter()
    const {id}= router.query
    return (
        <Box display="flex" alignItems="center">
          <Button
          onClick={()=>router.push(`/stores/info/${id}`)}
          width="100%"
          ml={2}
          disabled={loading }
          >
           Back
        </Button>   
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

export default UpdateProductButton
