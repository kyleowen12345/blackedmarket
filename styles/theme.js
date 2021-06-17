import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

const breakpoints = createBreakpoints({
  xs:"0em", //0px
  sm: "30em",//480px
  md: "48em",//768px
  lg: "62em",//992px
  xl: "80em",//1280px
  "2xl": "96em",//1536px
})
const theme = extendTheme({
  fonts: {
    heading: "Open Sans",
    body: "Poppins",
  },
  components: { 
    Link: { baseStyle: { _focus: { boxShadow: 'none' } } }, 
    Button: { baseStyle: { _focus: { boxShadow: 'none' } } },
    Select: { baseStyle: { _focus: { boxShadow: 'none' } } }
  },
  breakpoints
  
})

export default theme