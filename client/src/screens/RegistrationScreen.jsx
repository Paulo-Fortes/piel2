import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Container,
	FormControl,
	Heading,
	HStack,
	Stack,
	Text,	
	useBreakpointValue,
	useToast,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import PasswordField from '../components/PasswordField';
import TextField from '../components/TextField';
import { googleLogin, register } from '../redux/actions/userActions';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

const RegistrationScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading, error, userInfo } = useSelector((state) => state.user);
	const redirect = '/products';
	const toast = useToast();
	const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' });
	const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
			toast({
				description: userInfo.firstLogin ? 'Cuenta creada, bienvenidx' : `Bienvenidx de vuelta ${userInfo.name}`,
				status: 'success',
				isClosable: true,
			});
		}
	}, [userInfo, redirect, error, navigate, toast]);

	const handleGoogleLogin = useGoogleLogin({
		onSuccess: async (response) => {
			const userInfo = await axios
				.get('https://www.googleapis.com/oauth2/v3/userinfo', {
					headers: { Authorization: `Bearer ${response.access_token}` },
				})
				.then((res) => res.data);
			const { sub, email, name, picture } = userInfo;
			dispatch(googleLogin(sub, email, name, picture));
		},
	});

	return (
		<Formik
			initialValues={{ email: '', password: '', name: '' }}
			validationSchema={Yup.object({
				name: Yup.string().required('Campo nombre es obligatorio.'),
				email: Yup.string().email('E-mail inválido.').required('Campo e-mail es obligatorio.'),
				password: Yup.string()
					.min(1, 'Contraseña muy corta, debe tener al menos 1 caractere.')
					.required('Campo contraseña es obligatorio.'),
				confirmPassword: Yup.string()
					.min(1, 'Contraseña muy corta, debe tener al menos 1 caractere.')
					.required('Campo contraseña es obligatorio.')
					.oneOf([Yup.ref('password'), null], 'Contraseñas deben coincidir.'),
			})}
			onSubmit={(values) => {
				dispatch(register(values.name, values.email, values.password));
			}}>
			{(formik) => (
				<Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
					<Stack spacing='8'>
						<Stack spacing='6'>
							<Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
								<Heading size={headingBR}>Crear una cuenta.</Heading>
								<HStack spacing='1' justify='center'>
									<Text color='muted'>Ya sos un usuario registrado?</Text>
									<Button as={ReactLink} to='/login' variant='link' colorScheme='yellow'>
										Ingresar
									</Button>
								</HStack>
							</Stack>
						</Stack>
						<Box
							py={{ base: '0', md: '8' }}
							px={{ base: '4', md: '10' }}
							bg={{ boxBR }}
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
										<TextField type='text' name='name' placeholder='nombre y apellido' label='Nombre Completo:'/>
										<TextField type='text' name='email' placeholder='vos@ejemplo.com' label='E-mail:' />
										<PasswordField type='password' name='password' placeholder='escribir contraseña' label='Contraseña:' />
										<PasswordField
											type='password'
											name='confirmPassword'
											placeholder='repetir contraseña'
											label='Repetir contraseña:'
										/>
									</FormControl>
								</Stack>
								<Stack spacing='6'>
									<Button colorScheme='yellow' size='lg' fontSize='md' isLoading={loading} type='submit'>
										Ingresar
									</Button>
									<Button colorScheme='yellow' size='lg' fontSize='md' onClick={() => handleGoogleLogin()}>
										<FcGoogle size={30} px />
										<Text px='2'>Ingresar con Google</Text>
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

export default RegistrationScreen;