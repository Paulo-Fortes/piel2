import { 
	Alert, 
	AlertDescription, 
	AlertIcon, 
	AlertTitle, 
	Box, 
	Button, 
	Center, 
	IconButton, 
	Wrap, 
	WrapItem,
	Text,
	Stack,
	Spinner,
	Icon,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../redux/actions/productActions';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineFavoriteBorder } from 'react-icons/md';

const ProductsScreen = () => {
	const dispatch = useDispatch();
	const { loading, error, products, pagination, favoritesToggled, favorites } = useSelector((state) => state.product);

	useEffect(() => {
		dispatch(getProducts(1));
	}, [dispatch]);

	const paginationButtonClick = (page) => {
		dispatch(getProducts(page));
	};

	return (
		<>
			{products.length >= 1 && (
				<Box>
					<Wrap spacing='30px' justify='center' minHeight='80vh' mx={{ base: '12', md: '20', lg: '32' }}>
						{error ? (
							<Alert status='error'>
								<AlertIcon />
								<AlertTitle>Perdónanos!</AlertTitle>
								<AlertDescription>{error}</AlertDescription>
							</Alert>
							) : loading ? (
							<Wrap direction='column' align='center' mt='20px' justify='center' minHeight='100vh'>
								<Stack direction='row' spacing='4'>
									<Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='yellow.500' size='xl' />
								</Stack>
							</Wrap>
							) : (
							products.map((product) => (
								<WrapItem key={product._id}>
									<Center w='250px' h='450px'>
										<ProductCard product={product} loading={loading} />
									</Center>
								</WrapItem>
							))
						)}
					</Wrap>
					{!favoritesToggled && (
						<Wrap spacing='10px' justify='center' p='5' mt='20' isRound={true}>
							<IconButton colorScheme='gray' isRound={true} onClick={() => paginationButtonClick(1)}>
								<MdKeyboardDoubleArrowLeft/>
							</IconButton>
							{Array.from(Array(pagination.totalPages), (e, i) => {
								return (
									<Button
										colorScheme={pagination.currentPage === i + 1 ? 'yellow' : 'gray'}
										key={i}
										onClick={() => paginationButtonClick(i + 1)}>
										{i + 1}
									</Button>
								);
							})}
							<IconButton colorScheme='gray' isRound={true} onClick={() => paginationButtonClick(pagination.totalPages)}>
								<MdKeyboardDoubleArrowRight/>
							</IconButton>
						</Wrap>
					)}
				</Box>
			)}
			{favoritesToggled && favorites.length === 0 && (
				<Center minH='80vh'>
					<Box display='flex' flexDirection='column' alignItems='center'>
						<Icon as={MdOutlineFavoriteBorder} boxSize='75' />
						<Text>No tenés a ningún favorito en tu listado.</Text>
					</Box>
				</Center>
			)}
		</>
	);
};

export default ProductsScreen;