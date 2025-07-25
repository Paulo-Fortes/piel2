import { RiAddFill } from "react-icons/ri";
import { AiOutlineMinus } from "react-icons/ai";
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Badge,
	Box,
	Button,
	Flex,
	HStack,
	Heading,
	Image,
	SimpleGrid,
	Spinner,
	Stack,
	useColorModeValue as mode,
	useToast,
	Text,
	Wrap,
} from '@chakra-ui/react';
import { BiCheckShield, BiPackage, BiSupport } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../redux/actions/productActions';
import { useEffect, useState } from 'react';
import Star from '../components/Star';
import "@fontsource/montserrat";
import { addCartItem } from "../redux/actions/cartActions";

const ProductScreen = () => {
	const [amount, setAmount] = useState(1);
	const { id } = useParams();
	const dispatch = useDispatch();
	const { loading, error, product } = useSelector((state) => state.product);
	const { cartItems } = useSelector((state) => state.cart);
	const toast = useToast();

	useEffect(() => {
		dispatch(getProduct(id));
	}, [dispatch, id]);

	const changeAmount = (input) => {
		if (input === 'plus') {
			setAmount(amount + 1);
		}
		if (input === 'minus') {
			setAmount(amount - 1);
		}
	};

const addItem = () => {
	if (cartItems.some((cartItem) => cartItem.id === id)) {
		cartItems.find((cartItem) => cartItem.id === id);
		dispatch(addCartItem(id,amount));		
	} else {
		dispatch(addCartItem(id,amount));
	}
	toast({
		description: 'El item fue agregado',
		status: 'sucess',
		isCloasable: true,
	});
};
	


	return (
		<Wrap spacing='30px' justify='center' minHeight='100vh'>
			{loading ? (
				<Stack direction='row' spacing='4'>
					<Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='cyan.500' size='xl' />
				</Stack>
			) : error ? (
				<Alert status='error'>
					<AlertIcon />
					<AlertTitle>Perdónanos!</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			) : (
				product && (
					<Box
						maxW={{ base: '3xl', lg: '5xl' }}
						mx='auto'
						px={{ base: '4', md: '8', lg: '12' }}
						py={{ base: '6', md: '8', lg: '12' }}>
						<Stack direction={{ base: 'column', lg: 'row' }} align='flex-start'backgroundColor={mode('#FFF4E5','gray.600')} p='10' rounded='3xl'>
							<Stack pr={{ base: '0', md: 'row' }} flex='1.5' mb={{ base: '12', md: 'none' }}>
								{product.productIsNew && (
									<Badge p='1' rounded='md' w='50px' fontSize='0.8em' colorScheme='green'>
										Nuevo
									</Badge>
								)}
								{product.stock === 0 && (
									<Badge rounded='full' w='70px' fontSize='0.8em' colorScheme='red'>
										Agotado
									</Badge>
								)}
								<Heading fontSize='2xl' fontWeight='extrabold' color={mode('#96634E','#FFF4E5')} fontFamily='' >
									{product.category} {product.name}
								</Heading>
								<Stack spacing='5'>
									<Box>
										<Text fontSize='3xl' color={mode('#6c3a24ff','#FFF4E5')} mt='4' mb='4' fontWeight='thin' fontFamily="Montserrat">${product.price}</Text>
										<Flex>
											<HStack spacing='2px' color={mode('#96634E','#FFF4E5')}>
												<Star color='yellow.500' />
												<Star rating={product.rating} star={2} />
												<Star rating={product.rating} star={3} />
												<Star rating={product.rating} star={4} />
												<Star rating={product.rating} star={5} />
											</HStack>
											<Text fontSize='md' fontWeight='bold' ml='4px' color={mode('#96634E','#FFF4E5')}>
												{product.numberOfReviews} Reviews
											</Text>
										</Flex>
									</Box>
									<Text color={mode('#96634E','#FFF4E5')} fontWeight='semibold'>{product.subtitle}</Text>
									<Text color={mode('#6c3a24ff','#FFF4E5')} fontWeight='normal'>{product.description}</Text>
									<Text fontWeight='bold' color={mode('#96634E','#FFF4E5')}>Cantidad</Text>
									<Flex w='170px' p='7px' border='1px' borderColor={mode('#6c3a24ff','#FFF4E5')} alignItems='center' rounded='lg'>
										<Button isDisabled={amount <= 1} onClick={() => changeAmount('minus')} color={mode('#6c3a24ff','#FFF4E5')}>
											<AiOutlineMinus />
										</Button>
										<Text mx='30px' color={mode('#6c3a24ff','#FFF4E5')} >{amount}</Text>
										<Button isDisabled={amount >= product.stock} onClick={() => changeAmount('plus')} color={mode('#6c3a24ff','#FFF4E5')} >
											<RiAddFill />
										</Button>
									</Flex>
									<Badge fontSize='lg' width='220px' textAlign='center' colorScheme='yellow' color={mode('#96634E','#FFF4E5')}>
										Cantidad en stock: {product.stock}
									</Badge>
									<Button variant='outline' isDisabled={product.stock === 0} colorScheme='yellow' onClick={() => addItem()}>
										Agregar al carrito
									</Button>
									<Stack width='270px'>
										<Flex alignItems='center'>
											<BiPackage size='20px' color={mode('#96634E','#FFF4E5')}/>
											<Text fontWeight='medium' fontSize='sm' ml='2'color={mode('#96634E','#FFF4E5')}>
												Envíos desde C.A.B.A. al mundo.
											</Text>
										</Flex>
										<Flex alignItems='center'>
											<BiCheckShield size='20px' color={mode('#96634E','#FFF4E5')}/>
											<Text fontWeight='medium' fontSize='sm' ml='2'color={mode('#96634E','#FFF4E5')}>
												Autorizado por la ANMAT Argentina
											</Text>
										</Flex>
										<Flex alignItems='center'>
											<BiSupport size='20px' color={mode('#96634E','#FFF4E5')}/>
											<Text fontWeight='medium' fontSize='sm' ml='2'color={mode('#96634E','#FFF4E5')}>
												Estamos acá para ayudarte !
											</Text>
										</Flex>
									</Stack>
								</Stack>
							</Stack>
							<Flex direction='column' align='center' flex='1' _dark={{ bg: 'gray.900' }}>
								<Image
									mb='30px'
									src={product.images[0]}
									alt={product.name}
									fallbackSrc='https://via.placeholder.com/250'
								/>
								<Image
									mb='30px'
									src={product.images[1]}
									alt={product.name}
									fallbackSrc='https://via.placeholder.com/250'
								/>
							</Flex>
						</Stack>
						<Stack backgroundColor={mode('#FFF4E5','gray.600')} p='10' rounded='3xl' mt='15px'>
							<Text fontSize='xl' fontWeight='bold' >
								Reviews
							</Text>
							<SimpleGrid minChildWidth='300px' spacingX='40px' spacingY='20px'>
								{product.reviews.map((review) => (
									<Box key={review._id}>
										<Flex spcaing='2px' alignItems='center'>
											<Star color='cyan.500' />
											<Star rating={product.rating} star={2} />
											<Star rating={product.rating} star={3} />
											<Star rating={product.rating} star={4} />
											<Star rating={product.rating} star={5} />
											<Text fontWeight='semibold' ml='4px'>
												{review.title && review.title}
											</Text>
										</Flex>
										<Box py='12px'>{review.comment}</Box>
										<Text fontSize='sm' color={mode('#96634E','#FFF4E5')}>
											by {review.name}, {new Date(review.createdAt).toDateString()}
										</Text>
									</Box>
								))}
							</SimpleGrid>
						</Stack>
					</Box>
				)
			)}
		</Wrap>
	);
};

export default ProductScreen;


/* import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Badge, Box, Button, Flex, HStack, Heading, Image, SimpleGrid, Spinner, Stack, Text, Wrap } from '@chakra-ui/react';
import {BiCheckShield, BiPackage, BiSupport} from 'react-icons/bi';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getProduct} from '../redux/actions/productActions';
import {useEffect, useState} from 'react';
import Star from '../components/Star';


const ProductScreen = () => {
  const [amount, setAmount] = useState(1);
  const {id} = useParams()
  const dispatch = useDispatch()
  const {loading, error, product} = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const changeAmount = (input) => {
    if (input === 'plus') {
      setAmount(amount + 1);
    }
    if (input === 'minus') {
      setAmount(amount - 1);
    };
  };
  return (
    <Wrap spacing='30px' justify='center' minHeight='100vh'>
      {loading ? (
        <Stack direction='row' spacing='4'>
          <Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='cyan.500' size='xl' />
        </Stack>
      ): error ? (
        <Alert status='error'>
          <AlertIcon/>
          <AlertTitle>Perdónanos!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ):(
        product && (
          <Box
            maxW={{base:'3xl', lg: '5xl'}}
            mx='auto'
            px={{base:'4', md:'8', lg:'12'}}
            py={{base:'4', md:'8', lg:'12'}}          
          >
            <Stack direction={{base: 'column', lg:'row'}} align='flex-start'>
              <Stack pr={{base: '0', md: 'row'}} flex= '1.5' mb={{base: '12', md: 'none'}}>
                {product.productIsNew && (
                  <Badge p='2' rounded='md' w='50px' fontSize='0.8em' colorScheme='green'>
                    Nuevo 
                  </Badge>                  
                )}
                {product.stock === 0 && (
                  <Badge rounded='full' w='70px' fontSize='0.8em' colorScheme='red'>
                    Agotado
                  </Badge>
                )}
                <Heading fontSize='2xl' fontWeight='extrabold'>
                  {product.name}
                </Heading>
                <Stack spacing='5'>
                  <Box>
                    <Text fontSize='xl'>
                      ${product.price}
                    </Text>
                    <Flex>
                      <HStack spacing='2px'>
                        <Star color='yellow.500'/>
                        <Star rating={product.rating} star={2}/>
                        <Star rating={product.rating} star={3}/>
                        <Star rating={product.rating} star={4}/>
                        <Star rating={product.rating} star={5}/>
                      </HStack>
                      <Text fontSize='md' fontWeight='bold' ml='4px'>
                        {product.numberOfReviews} Reviews
                      </Text>
                    </Flex>
                  </Box>
                  <Text>{product.subtitle}</Text>
                  <Text>{product.description}</Text>
                  <Text fontWeight='bold'>Quantity</Text>
                  <Flex w='170px' p='5px' border='1px' borderColor='gray.200' alignItems='center'>
                    <Button isDisabled={amount <= 1} onClick={() => changeAmount('minus')}>
                      <FiMinusCircle/>
                    </Button>
                    <Text mx='30px'>{amount}</Text>
                    <Button isDisabled={amount >= product.stock} onClick={()=> changeAmount('plus')}>
                      <FiPlusCircle/>
                    </Button>
                  </Flex>
                  <Badge fontSize='lg' width='170px' textAlign='center' colorScheme='gray'>
                    In Stock: {product.stock}
                  </Badge>
                  <Button variant='outline' isDisabled={product.stock === 0} colorScheme='cyan' onClick={() => {}}>
                    Add to cart
                  </Button>
                  <Stack width='270px'>
                    <Flex alignItems='center'>
                      <BiPackage size='20px'/>
                    </Flex>
                    <Flex alignItems='center'>
                      <BiCheckShield size='20px'/>
                      <Text fontWeight='medium' fontSize='sm' ml='2'>
                        Todos nuestro productos estan aprobados por ANMAT.
                      </Text>
                    </Flex>
                    <Flex alignItems='center'>
                      <BiSupport size='20px'/>
                      <Text fontWeight='medium' fontSize='sm' ml='2'>
                        Estamos con usted 24/7.
                      </Text>
                    </Flex>
                  </Stack>
                </Stack>                
              </Stack>
              <Flex direction='column' align='center' flex='1' _dark={{bg: 'gray.900'}}>
                <Image 
                  mb='30px' 
                  src={product.image[0]} 
                  alt={product.name} 
                  fallbackSrc='https://via.placeholder.com/250'
                />
              </Flex>
            </Stack>
            <Stack>
              <Text fontSize='xl' fontWeight='bold'>
                Reviews
              </Text>
              <SimpleGrid minChildWidth='300px' spacingX='40px' spacingY='20px'>
                {product.reviews.map((review) => (
                  <Box key={review._id}>
                    <Flex spacing='2px' alignItems='center'>
                      <Star color='yellow.500' />
                      <Star rating={product.rating} star={2}/>
                      <Star rating={product.rating} star={3}/>
                      <Star rating={product.rating} star={4}/>
                      <Star rating={product.rating} star={5}/>
                      <Text fontWeight='semibold' ml='4px'>
                        {review.title && review.title}
                      </Text>
                    </Flex>
                    <Box py='12px'>
                      {review.comment}
                    </Box>
                    <Text fontSize='sm' color='gray.400'>
                      por {review.name}, {new Date(review.createdAt).toDateString()}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>
        )
      )}    
  </Wrap>)
};

export default ProductScreen; */