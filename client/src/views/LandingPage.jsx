import React from 'react'
import { Box, Container , Text } from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import SignUp from '../components/Authentication/SignUp'
import LogIn from '../components/Authentication/LogIn'

export const LandingPage = () => {
  return (
    <Container maxW='xl' centerContent> 
    <Box
    d='flex'
    justifyContent="center" 
    textAlign="center"
    p={3}
    bg={"white"}
    w="100%"
    m="40px 0 15px 0"
    borderRadius="lg"
    borderWidth="1px"
    >
    <Text fontSize="4xl" fontFamily="Work sans" color="black">ChillChat</Text>
    </Box>
    <Box 
    bg="white"
    w="100%" 
    p={4} borderRadius="1g"
    color="black" 
    borderWidth="1px">
    <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList mb="1em">
    <Tab width="50%">Log In</Tab>
    <Tab width="50%">Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>  {<LogIn></LogIn>}  </TabPanel>
    <TabPanel>   {<SignUp></SignUp>} </TabPanel>
  </TabPanels>
</Tabs>
    </Box>
    </Container>
  )
}

