import { Center, Text, Box, Button } from '@chakra-ui/react';
import { BsBoxSeamFill } from 'react-icons/bs';
import { Link as ReactLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { resetCart } from '../redux/actions/cartActions';

const SuccessScreen = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(resetCart());
	}, [dispatch]);

	return (
		<Center height='100vh' flexDirection='column'>
			<Text fontSize={{ base: 'md', md: 'xl', lg: '4xl' }}>Gracias por comprar con nostros. ♡ </Text>
			<Box m='2'>
				<BsBoxSeamFill size='50px' mt='2' />
			</Box>
			<Text>Vos podés ver tu compra en el historial de compras.</Text>
			<Button as={ReactLink} to='/order-history' mt='2'>
				Ver historial de compras
			</Button>
		</Center>
	);
};

export default SuccessScreen;