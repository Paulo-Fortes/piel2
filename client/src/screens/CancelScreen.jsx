import { Center, Text, Box, Button } from '@chakra-ui/react';
import { BsBoxSeamFill } from 'react-icons/bs';
import { Link as ReactLink } from 'react-router-dom';

const CancelScreen = () => {
	return (
		<Center height='100vh' flexDirection='column'>
			<Text fontSize={{ base: 'md', md: 'xl', lg: '4xl' }}>Usted ha cancelado el proceso de pago.</Text>
			<Box m='2'>
				<BsBoxSeamFill size='50px' mt='2' />
			</Box>

			<Text>Pero por las dudas guardamos tu carrito.</Text>
			<Button as={ReactLink} to='/cart' mt='2'>
				Ir al carrito.
			</Button>
		</Center>
	);
};

export default CancelScreen;