import CreateStore from '../../components/store/CreateStore'
import { Box,Text,Link,Button } from "@chakra-ui/react"
export default function createStore() {
   
    return (
        <Box  bg="white" width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"  p={[3,2,0]}   height="100vh">
       <CreateStore/>
      </Box>
    );
  }