import {
	Button,
	ButtonGroup,
	Container,
	Divider,
	IconButton,
	Input,
	Stack,
	Text,
	useColorModeValue as mode,
	Box,
	Flex,
	Icon,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { AiOutlineExperiment } from 'react-icons/ai';

const Footer = () => (
	<Box w='100%' bg={mode('#FFF4E5', 'gray.600')} mt= '5%'>
		<Container as='footer' maxW='7xl'>
			<Stack
				spacing='8'
				direction={{ base: 'column', md: 'row' }}
				justify='space-between'
				py={{ base: '12', md: '16' }}>
				<Stack spacing={{ base: '6', md: '8' }} align='start'>
					<Flex alignItems='center'>
						<Icon as={AiOutlineExperiment} h='10' w='10' color='#c68642' />
						<Text fontSize='2xl' fontWeight='extrabold' color='#c68642'>
							Piel
						</Text>
					</Flex>
					<Text color={mode('#96634E', '#FFF4E5')}>Somos expertos en cuidado de piel</Text>
				</Stack>
				<Stack direction={{ base: 'column-reverse', md: 'column', lg: 'row' }} spacing={{ base: '12', md: '8' }}>
					<Stack direction='row' spacing='8'>
						<Stack spacing='4' minW='36' flex='1'>
							<Text fontSize='md' fontWeight='semibold' color={mode('#96634E', '#FFF4E5')}>
								Productos
							</Text>
							<Stack spacing='3' shouldWrapChildren >
								<Button variant='link' fontSize='sm'>Principios Activos</Button>
								<Button variant='link' fontSize='sm'>Precificación</Button>
							</Stack>
						</Stack>
						<Stack spacing='5' minW='36' flex='1'>
							<Text fontSize='md' fontWeight='semibold' color={mode('#96634E', '#FFF4E5')}>
								Legal
							</Text>
							<Stack spacing='3' shouldWrapChildren>
								<Button variant='link' fontSize='sm'>Privacidad</Button>
								<Button variant='link' fontSize='sm'>Términos</Button>
								<Button variant='link' fontSize='sm'>Licencia</Button>
							</Stack>
						</Stack>
					</Stack>
					<Stack spacing='4'>
						<Text fontSize='md' fontWeight='semibold' color={mode('#96634E', '#FFF4E5')}>
							Newsletter
						</Text>
						<Stack spacing='5' direction={{ base: 'column', sm: 'row' }} maxW={{ lg: '360px' }}>
							<Input bgColor={mode('#ffffffff', '#656565ff')} border='1px' borderColor={mode('#96634E', '#FFF4E5')} placeholder='Ingrese tu e-mail' fontSize='sm' type='email' required />
							<Button variant='primary' type='submit' flexShrink={-1} color={mode('#96634E', '#FFF4E5')} border='1px' borderColor={mode('#96634E', '#FFF4E5')}>
								Suscribir
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
			<Divider />
			<Stack pt='8' pb='12' justify='space-between' direction={{ base: 'column-reverse', md: 'row' }} align='center'>
				<Text fontSize='sm' color={mode('#96634E', '#FFF4E5')}>
					&copy; {new Date().getFullYear()} Piel, Inc. Todos los derechos reservados.
				</Text>
				<ButtonGroup variant='ghost' >
					<IconButton as='a' href='https://www.linkedin.com/in/paulorobertoroco/' icon={<FaLinkedin fontSize='1.25rem' />} color={mode('#96634E', '#FFF4E5')} />
					<IconButton as='a' href='https://github.com/Paulo-Fortes/piel2' icon={<FaGithub fontSize='1.25rem' />} color={mode('#96634E', '#FFF4E5')} />
					<IconButton as='a' href='https://www.facebook.com/paulorobertoroco?locale=es_LA' icon={<FaFacebook fontSize='1.25rem' />} color={mode('#96634E', '#FFF4E5')} />
				</ButtonGroup>
			</Stack>
		</Container>
	</Box>
);

export default Footer;