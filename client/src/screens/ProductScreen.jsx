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
	Textarea,
	Input,
	Tooltip,
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
import { createProductReview } from '../redux/actions/productActions';

const ProductScreen = () => {
	const [amount, setAmount] = useState(1);
	const { id } = useParams();
	const dispatch = useDispatch();
	const { loading, error, product, reviewed } = useSelector((state) => state.product);
	const { cartItems } = useSelector((state) => state.cart);
	const toast = useToast();
	const [comment, setComment] = useState('');
	const [rating, setRating] = useState(1);
	const [title, setTitle] = useState('');
	const [reviewBoxOpen, setReviewBoxOpen] = useState(false);
	const { userInfo } = useSelector((state) => state.user);
	const [buttonLoading, setButtonLoading] = useState(false);

	useEffect(() => {
		dispatch(getProduct(id));
	setReviewBoxOpen(false);

		if (reviewed) {
			toast({
				description: 'Reseña del producto guardada',
				status: 'success',
				isClosable: 'true',
			});
			setReviewBoxOpen(false);
		}
	}, [dispatch, id, toast, reviewed]);

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
		isClosable: true,				
	});
};

const hasUserReviewed = () => product.reviews.some((item) => item.user === userInfo._id);
	const onSubmit = () => {
		setButtonLoading(true);
		dispatch(createProductReview(product._id, userInfo._id, comment, rating, title));
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
												Cantidad de reseñas: {product.numberOfReviews} 
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

						{userInfo && (
							<>
								<Tooltip label={hasUserReviewed() && 'Vos ya hiciste una reseña de este producto'} fontSize='medium'>
									<Button
										isDisabled={hasUserReviewed()}
										my='20px'
										w='200px'
										colorScheme='yellow'
										onClick={() => setReviewBoxOpen(!reviewBoxOpen)}>
										Escribir una reseña.
									</Button>
								</Tooltip>
								{reviewBoxOpen && (
									<Stack mb='20px'>
										<Wrap>
											<HStack spacing='2px'>
												<Button variant='outline' onClick={() => setRating(1)}>
													<Star rating={rating} star={1} />
												</Button>
												<Button variant='outline' onClick={() => setRating(2)}>
													<Star rating={rating} star={2} />
												</Button>
												<Button variant='outline' onClick={() => setRating(3)}>
													<Star rating={rating} star={3} />
												</Button>
												<Button variant='outline' onClick={() => setRating(4)}>
													<Star rating={rating} star={4} />
												</Button>
												<Button variant='outline' onClick={() => setRating(5)}>
													<Star rating={rating} star={5} />
												</Button>
											</HStack>
										</Wrap>
										<Input
											onChange={(e) => {
												setTitle(e.target.value);
											}}
											placeholder='Título de la reseña (es opcional)'
										/>
										<Textarea
											onChange={(e) => {
												setComment(e.target.value);
											}}
											placeholder={`El producto ${product.name} es...`}
										/>
										<Button
											isLoading={buttonLoading}
											loadingText='Saving'
											w='140px'
											colorScheme='yellow'
											onClick={() => onSubmit()}>
											Publicar reseña
										</Button>
									</Stack>
								)}
							</>
						)}

						<Stack backgroundColor={mode('#FFF4E5','gray.600')} p='10' rounded='3xl' mt='15px'>
							<Text fontSize='xl' fontWeight='bold' >
								Reseñas
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


