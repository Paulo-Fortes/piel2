import { Box, Button, Center, IconButton, Wrap, WrapItem } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../redux/actions/productActions';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";



const ProductsScreen = () => {
	const dispatch = useDispatch();
	const { loading, /* error, */ products, pagination, favoritesToggled } = useSelector((state) => state.product);

	useEffect(() => {
		dispatch(getProducts(1));
	}, [dispatch]);

	const paginationButtonClick = (page) => {
		dispatch(getProducts(page));
	};

	return (
		<>
			{products.length >= 1 && (
				<Box mt='10'>
					<Wrap spacing='30px' justify='center' minHeight='80vh' mx={{ base: '12', md: '20', lg: '32' }}>
						{products.map((product) => (
							<WrapItem key={product._id}>
								<Center w='250px' h='450px'>
									<ProductCard product={product} loading={loading} />
								</Center>
							</WrapItem>
						))}
					</Wrap>
					{!favoritesToggled && (
						<Wrap spacing='10px' justify='center' p='5' mt='4' isRound={true}>
							<IconButton colorScheme='gray' isRound={true} onClick={() => paginationButtonClick(1)}>
								<MdKeyboardDoubleArrowLeft/>
							</IconButton>
							{Array.from(Array(pagination.totalPages), (e, i) => {
								return (
									<Button
										colorScheme={pagination.currentPage === i + 1 ? 'gray' : 'gray'}
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
		</>
	);
};

export default ProductsScreen;