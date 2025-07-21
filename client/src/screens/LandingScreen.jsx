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
    Text, 
} from "@chakra-ui/react";
import {FaArrowRight} from 'react-icons/fa';
import {Link as ReactLink} from 'react-router-dom';
import { AiOutlineExperiment } from "react-icons/ai";

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
                <Stack spacing={{base: '8', lg: '10'}}>
                    <Stack spacing={{ base: '3', lg: '5'}}>
                        <Flex alignItems='center' mb='10px'>
                            <Icon as={AiOutlineExperiment} h={12} w={12} mr='4' color='#c68642' />                                                        
                            <Text fontSize='4xl' fontWeight='normal' color={'#c68642'}>
                                piel
                            </Text>
                        </Flex>
                        <Heading size='lg' fontWeight='light' color={mode('#96634E', '#FFF4E5')}>
                            La belleza de una piel sana.
                        </Heading>
                    </Stack>
                    <HStack spacing='3'>
                        <Link as={ReactLink} to='/products' color={mode('#96634E','#FFF4E5')} fontWeight='normal' fontSize='2xl'>
                            Click y descubra como
                        </Link>
                        <Icon color={mode('#96634E', '#FFF4E5')} as={FaArrowRight}/>
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