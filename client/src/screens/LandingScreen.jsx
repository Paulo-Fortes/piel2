import { 
    Box, 
    Flex, 
    Heading, 
    HStack, 
    Icon, 
    Image, 
    Link, 
    Skeleton, 
    Stack, 
    useColorModeValue as mode,
} from "@chakra-ui/react";
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import {Link as ReactLink} from 'react-router-dom';
import '@fontsource-variable/montserrat';


const LandingScreen = () => (
    <Box maxW='8x1' mx='auto' p={{base: '0', lg: '12'}} minH='6x1'>
        <Stack direction={{base: 'column-reverse', lg: 'row'}} spacing={{base: '0', lg: '20'}}>
            <Box
                width={{lg: 'sm'}}
                transform={{base: 'translateY(-50%)', lg:'none'}}
                bg={{base: mode('#ffecd4', 'gray.700'), lg: 'transparent' }}
                mx={{ base: '6', md:'8', lg: '0' }}
                px={{ base: '6', md:'8', lg: '0' }}
                py={{ base: '6', md:'8', lg: '12' }}
                rounded='3xl'
            >
                <Stack spacing={{base: '8', lg: '10'}} alignItems='center'>
                    <Stack spacing={{ base: '3', lg: '5'}} mt='40%'>  
                        <Heading size='lg' fontWeight='light' color={mode('#96634E', '#FFF4E5')}>
                            Tu piel saludable.
                        </Heading>
                    </Stack>
                    <HStack spacing='3'>
                        <Icon color={mode('#96634E', '#FFF4E5')} as={FaArrowRight}/>
                        <Link as={ReactLink} to='/products' color={mode('#96634E','#FFF4E5')} fontWeight='semi-bold' fontSize='xl'>
                            Click aquí y descubra como
                        </Link>
                        <Icon color={mode('#96634E', '#FFF4E5')} as={FaArrowLeft}/>
                    </HStack>
                </Stack>
            </Box>
            <Flex flex='1' overflow='hidden'>
                <Image 
                    src={mode('/images/logoPielDia.avif', '/images/logoPielNoche.avif')} 
                    fallback={<Skeleton/>}
                    rounded='3xl'
                    maxH='550px'
                    minH='300px'
                    objectFit='cover'
                    flex='1'
                    />
            </Flex>
        </Stack>
    </Box>
)

export default LandingScreen