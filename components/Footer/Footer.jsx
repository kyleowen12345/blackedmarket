import React from 'react'
import { Box,Text, Stack, StackDivider } from '@chakra-ui/react'
import { Copyright } from './Copyright'
import { LinkGrid } from './LinkGrid'
import { SocialMediaLinks } from './SocialMediaLinks'
import { SubscribeForm } from './SubscribeForm'
const Footer = () => {
    return (
        <Box as="footer" w="100%" borderTop="5px solid #FC8E00"  bg="#FBFBFB" bottom={0} height={["100%","100%","700px","500px"]} mt={20} px={5}>
            <Box w="100%"  >
               <Box width={["100%","100%","100%","100%","100%",1200]}   height={["0px","0px","60px"]} borderBottom="1px solid #EAEDED" mx="auto"></Box>
            </Box> 
            <Box width={["100%","100%","100%","100%","100%",1200]} mx="auto" mt={10} display="flex" justifyContent="space-between" >
            <Stack spacing="10" divider={<StackDivider />} >
      <Stack
        direction={{
          base: 'column',
          lg: 'row',
        }}
        spacing={{
          base: '10',
          lg: '28',
        }}
      >
        <Box flex="1" >
         <Text fontWeight="bold" fontSize="20px">BlackedMarket</Text>
        </Box>
        <Stack
          direction={{
            base: 'column',
            md: 'row',
          }}
          spacing={{
            base: '10',
            md: '20',
          }}
        >
          <LinkGrid
            spacing={{
              base: '10',
              md: '20',
              lg: '28',
            }}
            flex="1"
          />
          <SubscribeForm
            width={{
              base: 'full',
              md: 'sm',
            }}
          />
        </Stack>
      </Stack>
      <Stack
        direction={{
          base: 'column-reverse',
          md: 'row',
        }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Copyright />
        <SocialMediaLinks />
      </Stack>
    </Stack>

            </Box> 
        </Box>
    )
}

export default Footer
