import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Container,
	FormControl,
	HStack,
	Heading,
	Stack,
	Text,
	useToast,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import PasswordField from '../components/PasswordField';
import PasswordForgottenForm from '../components/PasswordForgottenForm';
import TextField from '../components/TextField';
import { login } from '../redux/actions/userActions';

const LoginScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const redirect = '/products';
	const toast = useToast();

	const { loading, error, userInfo, serverMsg } = useSelector((state) => state.user);
	const [showPasswordReset, setShowPasswordReset] = useState(false);

	useEffect(() => {
		if (userInfo) {
			if (location.state?.from) {
				navigate(location.state.from);
			} else {
				navigate(redirect);
			}
			toast({
				description: 'Login exitoso.',
				status: 'success',
				isClosable: true,
			});
		}

		if (serverMsg) {
			toast({
				description: `${serverMsg}`,
				status: 'success',
				isClosable: true,
			});
		}
	}, [userInfo, redirect, error, navigate, location.state, toast, showPasswordReset, serverMsg]);

	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			validationSchema={Yup.object({
				email: Yup.string().email('Invalid email.').required('Campo e-mail obligatorio.'),
				password: Yup.string()
					.min(1, 'Contraseña muy corta. Por lo menos 1 caractere es necesario.')
					.required('Password is required.'),
			})}
			onSubmit={(values) => {
				dispatch(login(values.email, values.password));
			}}>
			{(formik) => (
				<Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
					<Stack spacing='8'>
						<Stack spacing='6'>
							<Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
								<Heading fontSize={{ base: 'md', lg: 'xl' }}>Realizar login en tu cuenta.</Heading>
								<HStack spacing='1' justify='center'>
									<Text>No tenés una cuenta?</Text>
									<Button as={ReactLink} to='/registration' variant='link' colorScheme='yellow'>
										Ingresar
									</Button>
								</HStack>
							</Stack>
						</Stack>
						<Box
							py={{ base: '0', md: '8' }}
							px={{ base: '4', md: '10' }}
							bg={{ base: 'transparent', md: 'bg-surface' }}
							boxShadow={{ base: 'none', md: 'xl' }}>
							<Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
								{error && (
									<Alert
										status='error'
										flexDirection='column'
										alignItems='center'
										justifyContent='center'
										textAlign='center'>
										<AlertIcon />
										<AlertTitle>Perdónanos!</AlertTitle>
										<AlertDescription>{error}</AlertDescription>
									</Alert>
								)}
								<Stack spacing='5'>
									<FormControl>
										<TextField type='text' name='email' placeholder='vos@ejemplo.com' label='Email' />
										<PasswordField type='password' name='password' placeholder='tu contraseña' label='Password' />

										<Button
											my='2'
											onClick={() => setShowPasswordReset(!showPasswordReset)}
											size='sm'
											colorScheme='yellow'
											variant='outline'>
											Olvidaste la contraseña?
										</Button>
										{showPasswordReset && <PasswordForgottenForm />}
									</FormControl>
								</Stack>
								<Stack spacing='6'>
									<Button colorScheme='yellow' size='lg' fontSize='md' isLoading={loading} type='submit'>
										Ingresar
									</Button>
								</Stack>
							</Stack>
						</Box>
					</Stack>
				</Container>
			)}
		</Formik>
	);
};

export default LoginScreen;