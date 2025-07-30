import { Text, Stack, Box, Button, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendResetEmail } from '../redux/actions/userActions';

const PasswordForgottenForm = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const handleChange = (event) => {
		setEmail(event.target.value);
	};

	return (
		<>
			<Box my='4'>
				<Text as='b'>Ingrese tu dirección de e-mail en el campo abajo.</Text>
				<Text>Enviaremos un link para resetear la contraseña.</Text>
			</Box>
			<Stack>
				<Input
					mb='4'
					type='text'
					name='email'
					placeholder='Tu dirección de mail'
					label='Email'
					value={email}
					onChange={(e) => handleChange(e)}
				/>
				<Button colorScheme='yellow' size='lg' fontSize='md' onClick={() => dispatch(sendResetEmail(email))}>
					Enviar e-mail
				</Button>
			</Stack>
		</>
	);
};

export default PasswordForgottenForm;