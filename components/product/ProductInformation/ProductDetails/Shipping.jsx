import React from 'react'
import { Box,Text,Icon,Select  } from "@chakra-ui/react"
import { FiTruck } from "react-icons/fi"

const country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
const Shipping = ({product}) => {
    return (
        <Box m={3} mt={5} display={"flex"} maxH="85px">
                <Box mr={[5,5,10,20]} width={"95px"} >
                        <Text color="#888888" fontSize={"15px"}>Shipping </Text>
                </Box>
                <Box>
                        <Box width={["100px","100px","100px","323px"]}>
                              <Icon as={FiTruck} color="#000000" />
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="space-between" width={["100px","100px","200px","300px"]} >
                                    <Text fontSize={["8px","11px","13px"]} width="100px">Shipping To</Text>
                               <Select ml={[5,5,10,20]}  variant="unstyled" placeholder="Unstyled" placeholder="USA"  fontSize={["8px","12px","13px"]} minW="100px" fontWeight="bold">
                                          {
                                              country_list.map(i=>(
                                              <Text fontSize={["8px","10px","13px"]}  as="option" key={i}>{i}</Text>
                                             ))
                                          }
                                </Select>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="space-between" width={["100px","100px","170px"]}>
                              <Text fontSize={["8px","11px","13px"]} >Shipping Fee</Text>
                              <Text fontSize={["8px","11px","13px"]} fontWeight="bold">$ {product.price * 0.25 }</Text>
                        </Box>
                </Box>
            </Box>
    )
}

export default Shipping
