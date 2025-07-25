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
		useDisclosure 
	} from '@chakra-ui/react';
import { useEffect } from 'react';
import { AiOutlineExperiment } from 'react-icons/ai';
import {Link as ReactLink} from 'react-router-dom';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorites } from '../redux/actions/productActions';
import NavLink from './NavLink';
import ColorModeToggle from './ColorModeToggle';
import { BiUserCheck } from 'react-icons/bi';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { TbShoppingCart } from 'react-icons/tb';

const Links = [
	{name: 'Productos', route:'/products'},
	{name: 'Promociones', route:'/hot-deals'},
	{name: 'Contacto', route:'/contact'},
	{name: 'Servicios', route:'/services'},
];

const Header = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const dispatch = useDispatch();
	const { favoritesToggled } = useSelector((state) => state.product);
	const {cartItems} = useSelector((state) => state.cart);

	useEffect(() => {}, [favoritesToggled, dispatch]);

	return (
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
	);
};

export default Header;