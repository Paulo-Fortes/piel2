import React from 'react';
import {
	IconButton,
	Box,
	Flex,
	HStack,
	Icon,
	Stack,
	Text,
	useColorModeValue as mode,
	useDisclosure,
	AlertDescription,
	Alert,
	AlertIcon,
	AlertTitle,
	Divider,
	Image,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Spacer,
	useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import NavLink from './NavLink';
import ColorModeToggle from './ColorModeToggle';
import { BiUserCheck, BiLogInCircle } from 'react-icons/bi';
import { toggleFavorites } from '../redux/actions/productActions';
import { TbShoppingCart } from 'react-icons/tb';
import { logout } from '../redux/actions/userActions';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { AiOutlineExperiment } from 'react-icons/ai';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose, IoChevronDown } from "react-icons/io5";
import { FcGoogle } from 'react-icons/fc';
import { googleLogout } from '@react-oauth/google';

const Links = [
	{ name: 'Productos', route: '/products' },
	{ name: 'Promociones', route: '/hot-deals' },
	{ name: 'Contacto', route: '/contact' },
	{ name: 'Servicios', route: '/services' },
];

const Header = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const dispatch = useDispatch();
	const toast = useToast();
	const { favoritesToggled } = useSelector((state) => state.product);
	const { cartItems } = useSelector((state) => state.cart);
	const { userInfo } = useSelector((state) => state.user);
	const [showBanner, setShowBanner] = useState(userInfo ? !userInfo.active : false);

	useEffect(() => {
		if (userInfo && !userInfo.active) {
			setShowBanner(true);
		}
	}, [favoritesToggled, dispatch, userInfo]);

	const logoutHandler = () => {
		googleLogout();
		dispatch(logout());
		toast({
			description: 'Encerraste la sesión.',
			status: 'success',
			isClosable: 'true',
		});
	};

	return (
		<>
			<Box bg={mode('#FFF4E5', 'gray.600')} px='4'>
				<Flex h='16' alignItems='center' justifyContent='space-between'>
					<Flex display={{ base: 'flex', md: 'none' }} alignItems='center'>
						<IconButton
							bg='parent'
							size='md'
							icon={isOpen ? <IoClose color='#c68642'/> : <RxHamburgerMenu color='#c68642'/>}
							onClick={isOpen ? onClose : onOpen}
						/>
						<IconButton
							ml='12'
							position='absolute'
							icon={<TbShoppingCart size='20px' color={mode('#96634E', '#FFF4E5')}/>}
							as={ReactLink}
							to='/cart'
							variant='ghost'
						/>
						{cartItems.length > 0 && (
							<Text fontWeight='bold' fontStyle='italic' position='absolute' ml='74px' mt='-6' fontSize='sm'>
								{cartItems.length}
							</Text>
						)}
					</Flex>
					<HStack spacing='8' alignItems='center'>
						<Box alignItems='center' display='flex' as={ReactLink} to='/'>
							<Icon as={AiOutlineExperiment} h='6' w='6' color='#c68642' />
							<Text as='b' color='#c68642'>Piel</Text>
						</Box>

						<HStack as='nav' spacing='4' display={{ base: 'none', md: 'flex' }}>
							{Links.map((link) => (
								<NavLink route={link.route} key={link.route}>
									<Text fontWeight='medium' color={mode('#96634E', '#FFF4E5')}>{link.name}</Text>
								</NavLink>
							))}
							<Box>
								<IconButton icon={<TbShoppingCart size='20px' color={mode('#96634E', '#FFF4E5')} />} as={ReactLink} to='/cart' variant='ghost' />
								{cartItems.length > 0 && (
									<Text fontWeight='bold' fontStyle='italic' position='absolute' ml='26px' mt='-6' fontSize='sm'>
										{cartItems.length}
									</Text>
								)}
							</Box>

							<ColorModeToggle />
							{favoritesToggled ? (
								<IconButton
									onClick={() => dispatch(toggleFavorites(false))}
									icon={<MdOutlineFavorite size='20px' color={mode('#96634E', '#FFF4E5')}/>}
									variant='ghost'
								/>
							) : (
								<IconButton
									onClick={() => dispatch(toggleFavorites(true))}
									icon={<MdOutlineFavoriteBorder size='20px' color={mode('#96634E', '#FFF4E5')}/>}
									variant='ghost'
								/>
							)}
						</HStack>
					</HStack>
					<Flex alignItems='center'>
						{userInfo ? (
							<Menu>
								<MenuButton rounded='full' variant='link' cursor='pointer' minW='0' >
									<HStack>
										{userInfo.googleImage ? (
											<Image
												borderRadius='full'
												boxSize='40px'
												src={userInfo.googleImage}
												referrerPolicy='no-referrer'
											/>
										) : (
											<BiUserCheck size='30' />
										)}
										<IoChevronDown color={mode('#96634E', '#FFF4E5')}/>
									</HStack>
								</MenuButton>
								<MenuList>
									<HStack>
										<Text pl='3' as='i' >
											{userInfo.email}
										</Text>
										{userInfo.googleId && <FcGoogle />}
									</HStack>
									<Divider py='1' />
									<MenuItem as={ReactLink} to='/order-history'>
										Historial de Compras
									</MenuItem>
									<MenuItem as={ReactLink} to='/profile'>
										Perfil
									</MenuItem>
									{userInfo.isAdmin && (
										<>
											<MenuDivider />
											<MenuItem as={ReactLink} to={'/admin-console'}>
												<MdOutlineAdminPanelSettings />
												<Text ml='2'>Consola Admin</Text>
											</MenuItem>
										</>
									)}
									<MenuDivider />
									<MenuItem onClick={logoutHandler}>Encerrar sesión</MenuItem>
								</MenuList>
							</Menu>
						) : (
							<Menu>
								<MenuButton as={IconButton} variant='ghost' cursor='pointer' icon={<BiLogInCircle size='25px' color={mode('#96634E', '#FFF4E5')}/>} />
								<MenuList>
									<MenuItem as={ReactLink} to='/login' p='2' fontWeight='400' variant='link'>
										Ingresar
									</MenuItem>
									<MenuDivider />
									<MenuItem as={ReactLink} to='/registration' p='2' fontWeight='400' variant='link'>
										Registrarse
									</MenuItem>
								</MenuList>
							</Menu>
						)}
					</Flex>
				</Flex>
				<Box display='flex'>
					{isOpen && (
						<Box pb='4' display={{ md: 'none' }}>
							<Stack as='nav' spacing='4'>
								{Links.map((link) => (
									<NavLink route={link.route} key={link.route}>
										<Text fontWeight='medium' color={mode('#96634E', '#FFF4E5')}>{link.name}</Text>
									</NavLink>
								))}
							</Stack>
							{favoritesToggled ? (
								<IconButton
									onClick={() => dispatch(toggleFavorites(false))}
									icon={<MdOutlineFavorite size='20px' color={mode('#96634E', '#FFF4E5')}/>}
									variant='ghost'
								/>
							) : (
								<IconButton
									onClick={() => dispatch(toggleFavorites(true))}
									icon={<MdOutlineFavoriteBorder size='20px' color={mode('#96634E', '#FFF4E5')}/>}
									variant='ghost'
								/>
							)}
							<ColorModeToggle />
						</Box>
					)}
				</Box>
			</Box>
			{userInfo && !userInfo.active && showBanner && (
				<Box>
					<Alert status='warning'>
						<AlertIcon />
						<AlertTitle>E-mail no validado!</AlertTitle>
						<AlertDescription>Por favor verifique tu caja de correo.</AlertDescription>
						<Spacer />
						<IoClose cursor={'pointer'} onClick={() => setShowBanner(false)} />
					</Alert>
				</Box>
			)}
		</>
	);
};

export default Header;



/* import React from 'react';
import { 
	IconButton, 
	Box, 
	Flex, 
	HStack, 
	Icon, 
	Stack, 
	Text, 
	useColorModeValue as mode, 
	useDisclosure, 
	AlertDescription,
	Alert,
	AlertIcon,
	AlertTitle,
	Divider,
	Image,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Spacer,
	useToast,
	} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineExperiment } from 'react-icons/ai';
import {Link as ReactLink} from 'react-router-dom';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorites } from '../redux/actions/productActions';
import NavLink from './NavLink';
import ColorModeToggle from './ColorModeToggle';
import { BiUserCheck, BiLogIn } from 'react-icons/bi';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose, IoChevronDown } from "react-icons/io5";
import { TbShoppingCart } from 'react-icons/tb';
import {logot} from '../redux/actions/userActions';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';

const Links = [
	{name: 'Productos', route:'/products'},
	{name: 'Promociones', route:'/hot-deals'},
	{name: 'Contacto', route:'/contact'},
	{name: 'Servicios', route:'/services'},
];

const Header = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const dispatch = useDispatch();
	const toast = useToast();
	const { favoritesToggled } = useSelector((state) => state.product);
	const {cartItems} = useSelector((state) => state.cart);
	const { userInfo } = useSelector((state) => state.user);
	const [showBanner, setShowBanner] = useState(userInfo ? !userInfo.active : false);

	useEffect(() => {
		if (userInfo && !userInfo.active) {
			setShowBanner(true);
		}
	}, [favoritesToggled, dispatch, userInfo]);

	const logoutHandler = () => {
		dispatch(logout());
		toast({
			description: 'Hiciste logout correctamente.',
			status: 'success',
			isClosable: 'true',
		});
	};

	return (
		<>
		<Box bg={mode('#FFF4E5', 'gray.600')} px='4'>

			<Flex h='16' alignItems='center' justifyContent='space-between'>
				<Flex display={{base: 'flex', md: 'none'}} alignItems='center'>
					<IconButton 
						bg='parent' 
						size='md' 
						icon={isOpen ? <IoClose/> : <RxHamburgerMenu/>}
						onClick={isOpen ? onClose : onOpen}
						/>
						<IconButton 
							ml='12' 
							position='absolute'							
							icon={<TbShoppingCart size='20px' />} 
							as={ReactLink} 
							to='/cart' 
							variant='ghost' 
						/>
						{cartItems.lenght > 0 && (
							<Text fontWeight='bold' fontStyle='italic' position='absolute' ml='74px' mt='-6' fontSize='sm'>
								{cartItems.lenght}
							</Text>
						)}
				</Flex>
				<HStack spacing='8' alignItems='center' >
					<Box alignItems='center' display='flex' as={ReactLink} to='/'>
						<Icon as={AiOutlineExperiment} h='6' w='6' mr='3' color='#c68642' />
						<Text as='b' color='#c68642'>Piel</Text>
					</Box>
					<HStack as='nav' spacing='4' display={{base: 'none', md:'flex'}}>
						{Links.map((link)=> (
							<NavLink route={link.route} key={link.route}>
								<Text fontWeight='medium' color={mode('#96634E', '#FFF4E5')}>
									{link.name}
								</Text>
							</NavLink>
						))}
						<Box>
							<IconButton 
							icon={<TbShoppingCart size='20px' />} 
							as={ReactLink} 
							to='/cart' 
							variant='ghost'
							color={mode('#96634E', '#FFF4E5')}
							/>
						{cartItems.lenght > 0 && (
							<Text 
								fontWeight='bold' 
								fontStyle='italic' 
								position='absolute' 
								ml='26px' 
								mt='-6' 
								fontSize='sm'>
									{cartItems.lenght}
							</Text>
						)}
						</Box>
						<ColorModeToggle  />
						{favoritesToggled ? (
							<IconButton
								onClick={() => dispatch(toggleFavorites(false))}
								icon={<MdOutlineFavorite size='20px' />}
								variant='ghost'
								color={mode('#96634E', '#FFF4E5')}
							/>
						) : (
							<IconButton
								onClick={() => dispatch(toggleFavorites(true))}
								icon={<MdOutlineFavoriteBorder size='20px' />}
								variant='ghost'
								color={mode('#96634E', '#FFF4E5')}
							/>
						)}						
					</HStack>
				</HStack>
				<Flex alignItems='center'> <BiUserCheck/> </Flex>
			</Flex>
			
			<Box display='flex'>
				{isOpen &&(
					<Box pb='4' display={{md:'none'}}>
						<Stack as='nav' spacing='4'>
							{Links.map((link) => (
							<NavLink route={link.route} key={link.route}>
								<Text fontWeight='medium'>
									{link.name}
								</Text>
							</NavLink>
							))}
						</Stack>
						{favoritesToggled ? (
							<IconButton
								onClick={() => dispatch(toggleFavorites(false))}
								icon={<MdOutlineFavorite size='20px' />}
								variant='ghost'
							/>
						) : (
							<IconButton
								onClick={() => dispatch(toggleFavorites(true))}
								icon={<MdOutlineFavoriteBorder size='20px' />}
								variant='ghost'
							/>
						)}
						<ColorModeToggle/>
					</Box>
				)}
			</Box>
		</Box>
	</>
	);
};

export default Header; */