import React, { useContext } from 'react'
import axios from '../api/axios'
import { useState } from 'react'
import RedEye from '../pages/RedEye'

import {
    Button, Card, CardHeader, CardBody, CardFooter, Heading, Stack, StackDivider, Box, Text,
} from '@chakra-ui/react'
import AuthenticationContext from '../context/AuthenticationContext'

//function redEyeCard() {

const RedEyeCard = ({ Email, Destination, BookingTime, existance }) => {
    //console.log("inside card.." + Email)
    const [exists, setExists] = useState(existance);
    const { setClosed } = useContext(AuthenticationContext);
    console.log("inside before deletetrip");
    console.log(exists);
    async function deleteTrip() {
        console.log("inside deletetrip");
        console.log(exists);
        axios.post("/RedEye/deleteTrip", JSON.stringify({
            email: Email,
        }),
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }).then(res => {
                console.log("after delete")
                console.log(res.status)
                if (res.status == 200) {
                    console.log("Trip deleted.")
                    setExists(false);
                    setClosed(false);
                }

            });


    }



    if (exists == false) { return; } else {
        return (

            <Card align={'self-end'} backgroundColor='gray.50'>
                <CardHeader>
                    <Heading size='md' >Booking Details</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Email id:
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {Email}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Destination:
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {Destination}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Time of Booking:
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {BookingTime}
                            </Text>
                        </Box>
                        <Button colorScheme='red' type='submit' onClick={deleteTrip}>
                            Cancel Ride
                        </Button>
                    </Stack>
                </CardBody>
            </Card>
        )
    }
}

export default RedEyeCard