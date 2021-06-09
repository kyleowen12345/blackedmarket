import { extendTheme } from "@chakra-ui/react"
const theme = extendTheme({
  fonts: {
    heading: "Open Sans",
    body: "Raleway",
  },
  components: { 
    Link: { baseStyle: { _focus: { boxShadow: 'none' } } }, 
    Button: { baseStyle: { _focus: { boxShadow: 'none' } } }
  }
})
export default theme