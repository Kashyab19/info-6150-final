import React from 'react'

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

import { FaLocationArrow, FaTimes } from 'react-icons/fa'

{/* <script src="https://maps.googleapis.com/maps/api/js?key=&callback=initMap" async defer></script> */ }

const center = { lat: 42.338729, lng: -71.088404 }

function RedEye() {
  const [isOpen, setIsOpen] = React.useState('');
  const onClose = () => setIsOpen('');


  const { isLoaded } = useJsApiLoader({
    //googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    googleMapsApiKey: 'AIzaSyDoKTybKvgp09eBiRCPBB7Ar5eFq22uGps',
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

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
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  async function checkRange() {
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
    }
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
            <IconButton
              aria-label='center back'
              icon={<FaLocationArrow />}
              isRound
              onClick={() => {
                map.panTo(center)
                map.setZoom(15)
              }}
            />
          </HStack>
        </Box>
        <Button colorScheme='red' type='submit' justifyContent={center} onClick={checkRange}>
          Book RedEye
        </Button>

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