import { useEffect } from 'react';
import { useParams, Link as ReactLink } from 'react-router-dom';
import { verifyEmail } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import {
	AbsoluteCenter,
	Box,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Text,
	Spinner,
	Button,
	Alert,
} from '@chakra-ui/react';

const EmailVerificationScreen = () => {
	const { token } = useParams();
	const dispatch = useDispatch();
	const { error, loading } = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(verifyEmail(token));
	}, [token, dispatch]);

	return (
		<Box position='relative' minH='3xl'>
			<AbsoluteCenter axis='both'>
				{loading ? (
					<Box textAlign='center'>
						<Text fontSize='3xl'>Estamos trabajando para verificar tu e-mail.</Text>
						<Spinner size='xl' />
					</Box>
				) : error === null ? (
					<Alert
						bg='parent'
						status='success'
						flexDirection='column'
						alignItems='center'
						justifyContent='center'
						textAlign='center'>
						<AlertIcon boxSize='16' size='xl' />
						<AlertTitle>Gracias por verificar tu e-mail!</AlertTitle>
						<AlertDescription fontSize='xl'>Ya podés cerrar esta ventana.</AlertDescription>
					</Alert>
				) : (
					<Alert
						bg='parent'
						status='error'
						flexDirection='column'
						alignItems='center'
						justifyContent='center'
						textAlign='center'>
						<AlertIcon boxSize='16' size='xl' />
						<AlertTitle>Perdonános!</AlertTitle>
						<AlertDescription fontSize='xl'>{error}</AlertDescription>
					</Alert>
				)}
			</AbsoluteCenter>
		</Box>
	);
};

export default EmailVerificationScreen;