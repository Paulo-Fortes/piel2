import {
	Accordion,
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Spinner,
	Stack,
	Table,
	Tbody,
	Text,
	Th,
	Thead,
	Tr,
	Wrap,
	useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, resetProductError } from '../redux/actions/productActions';
import AddNewProduct from './AddNewProduct';
import ProductTableItem from './ProductTableItem';

const ProductsTab = () => {
	const dispatch = useDispatch();
	const { error, loading } = useSelector((state) => state.admin);
	const { products, productUpdate } = useSelector((state) => state.product);
	const toast = useToast();

	useEffect(() => {
		dispatch(getProducts());
		dispatch(resetProductError());
		if (productUpdate) {
			toast({
				description: 'El listado de productos fue actualizado.',
				status: 'success',
				isClosable: true,
			});
		}
	}, [dispatch, toast, productUpdate]);

	return (
		<Box>
			{error && (
				<Alert status='error'>
					<AlertIcon />
					<AlertTitle>Apaa!</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
			{loading ? (
				<Wrap justify='center'>
					<Stack direction='row' spacing='4'>
						<Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
					</Stack>
				</Wrap>
			) : (
				<Box>
					<Accordion allowToggle>
						<AccordionItem>
							<h2>
								<AccordionButton>
									<Box flex='1' textAlign='right'>
										<Box>
											<Text mr='8px' fontWeight='bold'>
												Agregar nuevo Producto
											</Text>
										</Box>
									</Box>
								</AccordionButton>
							</h2>
							<AccordionPanel pb='4'>
								<Table>
									<Tbody>
										<AddNewProduct />
									</Tbody>
								</Table>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
					<Table variant='simple' size='lg'>
						<Thead>
							<Tr>
								<Th>Descripcion</Th>
								<Th>Nombre</Th>
								<Th>Categoria y Precio</Th>
								<Th>Stock y Marcador</Th>
							</Tr>
						</Thead>
						<Tbody>
							{products.length > 0 &&
								products.map((product) => <ProductTableItem key={product._id} product={product} />)}
						</Tbody>
					</Table>
				</Box>
			)}
		</Box>
	);
};

export default ProductsTab;