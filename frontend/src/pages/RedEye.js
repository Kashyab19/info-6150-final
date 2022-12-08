import React, { useContext, useEffect } from 'react'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Circle,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'

import { useRef, useState } from 'react'

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Text, ChakraProvider, theme,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import RedEyeCard from '../components/RedEyeCard'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import AuthenticationContext from '../context/AuthenticationContext'
import axios from '../api/axios'
{/* <script src="https://maps.googleapis.com/maps/api/js?key=&callback=initMap" async defer></script>   */ }

const center = { lat: 42.338729, lng: -71.088404 }


function RedEye() {
  const [isOpen, setIsOpen] = React.useState('');
  const [destination, setDestination] = useState('');
  const [bookingTime, setTime] = useState('');
  const [email, setEmail] = useState('');
  const [existance, setExistance] = useState('');
  const onClose = () => {

    setIsOpen('');
    //window.location.reload(false);
    //setExistance(true);
}
  const google = window.google;

  //export default {destination,bookingTime,email};

  axios.post("/RedEye/getAllTrips", JSON.stringify({
    email: "ijk123@gmail.com",
  }),
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }).then(res => {
      if (res.data.data[0] != null) {
        //console.log(res.data.data[0].destination);
        const destination = res.data.data[0].destination;
        const bookingTime = res.data.data[0].bookingtime;
        const email = res.data.data[0].email;
        setDestination(destination);
        setTime(bookingTime)
        setEmail(email)
        console.log("destttt" + destination);
        console.log("Timeee" + bookingTime);
        setExistance(true);
        //console.log(res.data.data[0]);
      } else { setExistance(false) }
    });


  const { auth } = useContext(AuthenticationContext);
  const { isLoaded } = useJsApiLoader({
    //googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    googleMapsApiKey: 'AIzaSyDoKTybKvgp09eBiRCPBB7Ar5eFq22uGps',
    //googleMapsApiKey: 'AIzaSyDoKTybKvgp09eBiRCPBB7Ar5eFq22uGp',
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const { closed } = useContext(AuthenticationContext);
  useEffect(() => {
    // console.log( existance);
  })

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    //console.log("reached here....");
    return <div>Page is loading...</div>
    //return <SkeletonText/>
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    //originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  async function checkRange() {
    //console.log( destiantionRef.current.value)
    console.log("Date: " + ((new Date()).toLocaleDateString))

    if (distance == '') {
      return
    }
    //console.log("here..." + distance)
    var textToCheck = distance.replace(" mi", "")
    //console.log("test..." + textToCheck)
    if (parseFloat(textToCheck) > 2.5) {
      //console.log("yessss")
      setIsOpen(true);
    } else {
      setIsOpen(false);
      addTrip();
    }
  }


  async function addTrip() {
    console.log("About to add trip")
    axios.post("/RedEye/addTrip", JSON.stringify({
      email: "ijk123@gmail.com",
      destination: destiantionRef.current.value,
      bookingtime: new Date(),
      

    }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setExistance(true);
  }



  return (
    <ChakraProvider theme={theme}>
      <Flex
        position='relative'
        flexDirection='column'
        alignItems='center'
        h='100vh'
        w='100vw'
      >
        <Box position='absolute' left={0} top={0} h='100%' w='100%'>
          {/* Google Map Box */}
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: true,
              mapTypeControlOptions: {
                // style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_RIGHT,
              },
              fullscreenControl: false,
            }}
            onLoad={map => setMap(map)}
          >

            <>
              <Marker position={center} label="Snell Library (Pickup point)" />
              <Circle center={center} radius={3218.69} />
            </>

            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </Box>
        <Box
          p={4}
          borderRadius='lg'
          m={4}
          bgColor='white'
          shadow='base'
          minW='container.md'
          zIndex='1'
        >
          {/* {destination}, {bookingTime} */}
          <HStack spacing={2} justifyContent='space-between'>
            <Box flexGrow={1}>
              <Autocomplete>
                <Input type='text' placeholder='Origin' readOnly={true} value={"42.338722, -71.088417"} text="Snell" ref={originRef} />
              </Autocomplete>
            </Box>
            <Box flexGrow={1}>
              <Autocomplete>
                <Input
                  type='text'
                  placeholder='Destination'
                  ref={destiantionRef}

                />
              </Autocomplete>
            </Box>

            <ButtonGroup>
              <Button colorScheme='red' type='submit' onClick={calculateRoute}>
                Calculate Route
              </Button>
              <IconButton
                aria-label='center back'
                icon={<FaTimes />}
                onClick={clearRoute}
              />
            </ButtonGroup>
          </HStack>
          <HStack spacing={4} mt={4} justifyContent='space-between'>
            <Text>Distance: {distance} </Text>
            <Text>Duration: {duration} </Text>
            {/* <IconButton
              aria-label='center back'
              icon={<FaLocationArrow />}
              isRound
              onClick={() => {
                map.panTo(center)
                map.setZoom(15)
              }}
            /> */}
            <Button colorScheme='red' type='submit' justifyContent={center} onClick={checkRange} disabled={closed != false && existance!=false}>
              Book RedEye
            </Button>
          </HStack>
        </Box>


        <RedEyeCard
          existance={existance}
          Email={email}
          Destination={destination}
          BookingTime={bookingTime}
        />

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Destination not in range!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Please select destination within 2.5 miles radius (highlighted area).
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='red' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isOpen === false} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enjoy your ride!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              RedEye booked successfully, will be arriving soon.
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='red' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>


      </Flex>
    </ChakraProvider>
  )
}

export default RedEye

// function RedEye() {
//   return (
//     <div>RedEye</div>
//   )
// }

// export default RedEye