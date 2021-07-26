import { Button, chakra, Input, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'
import { FooterHeading } from './FooterHeading'

export const SubscribeForm = (props) => {
  return (
    <chakra.form {...props} onSubmit={(e) => e.preventDefault()}>
      <Stack spacing="4">
        <FooterHeading>Subscribe to BlackedMaket</FooterHeading>
        <Text>Get notified when we add new wu-tang quotes or we have exciting news for you.</Text>
        <Stack
          spacing="4"
          direction={{
            base: 'column',
            md: 'row',
          }}
        >
          <Input
            bg={useColorModeValue('white', 'inherit')}
            placeholder="This doesn't work"
            type="email"
            required
            focusBorderColor={useColorModeValue('blue.500', 'blue.300')}
            _placeholder={{
              opacity: 1,
              color: useColorModeValue('gray.500', 'whiteAlpha.700'),
            }}
          />
          <Button
            type="submit"
            bg="#FC8E00"
            color="white"
            flexShrink={0}
            width={{
              base: 'full',
              md: 'auto',
            }}
          >
            Subscribe
          </Button>
        </Stack>
      </Stack>
    </chakra.form>
  )
}
