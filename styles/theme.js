import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

const breakpoints = createBreakpoints({
  xs:"0em",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
})
const theme = extendTheme({
  fonts: {
    heading: "Open Sans",
    body: "Poppins",
  },
  components: { 
    Link: { baseStyle: { _focus: { boxShadow: 'none' } } }, 
    Button: { baseStyle: { _focus: { boxShadow: 'none' } } }
  },
  breakpoints
  
})

export default theme