import {
	Box,
	Button,
	Flex,
	FormControl,
	Heading,
	Radio,
	RadioGroup,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { setShipping } from '../redux/actions/cartActions';
import { setAddress, setPayment } from '../redux/actions/orderActions';
import TextField from './TextField';
import { Link as ReactLink } from 'react-router-dom';

const ShippingInformation = () => {
	const { shipping } = useSelector((state) => state.cart);
	const { shippingAddress } = useSelector((state) => state.order);

	const dispatch = useDispatch();

	const onSubmit = async (values) => {
		dispatch(setAddress(values));
		dispatch(setPayment());
	};

	return (
		<Formik
			initialValues={{
				address: shippingAddress ? shippingAddress.address : '',
				postalCode: shippingAddress ? shippingAddress.postalCode : '',
				city: shippingAddress ? shippingAddress.city : '',
				country: shippingAddress ? shippingAddress.country : '',
			}}
			validationSchema={Yup.object({
				address: Yup.string().required('Campo dirección obligatorio.').min(2, 'La dirección fornecida es muy corta.'),
				postalCode: Yup.string().required('Campo código postal obligatorio.').min(2, 'El código posta fornecido es muy corto.'),
				city: Yup.string().required('Campo ciudad obligatorio.').min(2, 'La ciudad fornecida es muy corta.'),
				country: Yup.string().required('Campo pais obligatorio.').min(2, 'El pais fornecido es muy corto.'),
			})}
			onSubmit={onSubmit}>
			{(formik) => (
				<>
					<VStack as='form'>
						<FormControl>
							<TextField name='address' placeholder='Dirección.' label='Dirección:' />
							<Flex>
								<Box flex='1' mr='10'>
									<TextField name='postalCode' placeholder='Código Postal.' label='Código Postal:' type='number' />
								</Box>
								<Box flex='2'>
									<TextField name='city' placeholder='Ciudad.' label='Ciudad:' />
								</Box>
							</Flex>
							<TextField name='country' placeholder='Pais.' label='Pais:' />
						</FormControl>
						<Box w='100%' pr='5'>
							<Heading fontSize='2xl' fontWeight='extrabold' mb='10'>
								Método de envío
							</Heading>
							<RadioGroup
								onChange={(e) => {
									dispatch(setShipping(e === 'express' ? Number(5000).toFixed(2) : Number(2000).toFixed(2)));
								}}
								defaultValue={shipping === 2000 ? 'withoutExpress' : 'express'}>
								<Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
									<Stack pr='10' spacing={{ base: '8', md: '10' }} flex='1.5'>
										<Box>
											<Radio value='express'>
												<Text fontWeight='bold'>Expresso AR$ 5.000,00</Text>
												<Text>Despachado en el mismo día.</Text>
											</Radio>
										</Box>
										<Stack spacing='6'>Express</Stack>
									</Stack>
									<Radio value='withoutExpress'>
										<Box>
											<Text fontWeight='bold'>Envío standard AR$ 2.000,00</Text>
											<Text>Despachado en 2 - 3 días hábiles</Text>
										</Box>
									</Radio>
								</Stack>
							</RadioGroup>
						</Box>
					</VStack>
					<Flex alignItems='center' gap='2' direction={{ base: 'column', lg: 'row' }}>
						<Button variant='outline' colorScheme='yellow' w='100%' as={ReactLink} to='/cart'>
							Regresar al carrito
						</Button>
						<Button
							variant='outline'
							colorScheme='yellow'
							w='100%'
							as={ReactLink}
							to='/payment'
							onClick={formik.handleSubmit}>
							Seguir con el pago
						</Button>
					</Flex>
				</>
			)}
		</Formik>
	);
};

export default ShippingInformation;