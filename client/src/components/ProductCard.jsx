import {Box, Image, Text, Badge, Flex, IconButton, Skeleton, useToast, Tooltip } from '@chakra-ui/react';
import {BiExpand} from 'react-icons/bi';
import React, {useState } from 'react';
import {addToFavorites, removeFromFavorites} from '../redux/actions/productActions';
import {useSelector, useDispatch} from 'react-redux';
import {MdOutlineFavorite, MdOutlineFavoriteBorder} from 'react-icons/md';
import '@fontsource-variable/montserrat';
import { Link as ReactLink } from 'react-router-dom';
import {addCartItem} from '../redux/actions/cartActions';
import { useEffect } from 'react';
import {TbShoppingCartPlus} from 'react-icons/tb';


const ProductCard = ({product, loading}) => {
    const dispatch = useDispatch();
    const {favorites} = useSelector((state) => state.product);
    const [isShown, setIsShown] = useState(false);
    const { cartItems } = useSelector((state) => state.cart);
    const toast = useToast();
    const [cartPlusDisabled, setCartPlusDisabled] = useState(false);

useEffect(() => {
    const item = cartItems.find((cartItem) => cartItem.id === product._id);
    if(item && item.qty === product.stock){
        setCartPlusDisabled(true);
    }
}, [product, cartItems]);

const addItem = (id) => {
		if (cartItems.some((cartItem) => cartItem.id === id)) {
			const item = cartItems.find((cartItem) => cartItem.id === id);
			dispatch(addCartItem(id, item.qty + 1));
		} else {
			dispatch(addCartItem(id, 1));
		}
		toast({
			description: 'El producto fue agregado.',
			status: 'success',
			isClosable: true,
		});
	};

    return (
        <Skeleton isLoaded={!loading} mt='20'>
            <Box
                _hover={{transform: 'scale(1.1)', transitionDuration: '0.3s'}}
                borderWidth='1px'
                overflow='hidden'
                /* backgroundColor='orange.50' */
                backgroundColor='#FFF4E5'                
                p='6'
                rounded='3xl'
                shadow='md'
                borderColor='gray.300'>
                    <Image 
                        onMouseEnter={() => setIsShown(true)}
                        onMouseLeave={() => setIsShown(false)}
                        src={product.images[isShown && product.images.lenght === 2 ? 1 : 0]} 
                        fallbackSrc='https://via.placeholder.com/150' 
                        alt={product.name} 
                        height='200px' 
                        rounded='xl' 
                        shadow='md'
                    />
            <br></br>
                {product.stock === 0 ? (
                <Badge colorScheme='red'>Agotado</Badge>
                ) : product.stock < 5 ? (
                <Badge colorScheme='yellow'> En stock {product.stock} unid.</Badge>
                ) : (
                <Badge colorScheme='green'>Hay stock</Badge>
                )}
                {product.productIsNew && (
                    <Badge ml='2' colorScheme='purple'>
                        Nuevo
                    </Badge>
                )}
                <Text noOfLines={1} fontSize='xl' fontWeight='semibold' mt='2' color='#96634E'>
                    {product.name}
                </Text>
                <Text noOfLines={1} fontSize='md' color='#604113'>
                    {product.subtitle}
                </Text>
                <Flex justify='space-between' alignItems='center' mt='2'>
                    <Badge 
                        backgroundColor='#FFF4E5'
                        rounded='xl'
                        p='2'
                        fontWeight='normal'
                        fontSize='sm'
                        color='#96634E'
                        boxShadow='inner'>
                            {product.category}
                    </Badge>
                    <Badge 
                        backgroundColor='#FFF4E5'
                        rounded='xl' 
                        p='2'
                        boxShadow='sm'>
                            <Text 
                            fontSize='md'                        
                            fontWeight='bold'
                            color='#96634E'
                            >
                            AR${' '}{product.price}
                        </Text>
                    </Badge>                
                </Flex>
                <Flex justify='space-between' mt='2'>
                    
                    <IconButton 
                        icon={<BiExpand size='20'/>}                         
                        as={ReactLink} 
                        to={`/product/${product._id}`}
                        color='#886128'
                        backgroundColor='#FFF4E5' 
                        size='md' 
                        isRound={true} 
                        shadow='inner' 
                        />
                    
                    {favorites.includes(product._id) ? (
                    <IconButton
                        icon={<MdOutlineFavorite size='20px' />}
                        colorScheme='red'
                        boxShadow='inner'
                        size='md'
                        isRound={true}
                        onClick={() => dispatch(removeFromFavorites(product._id))}
                    />
                ):(
                    <IconButton
                        icon={<MdOutlineFavoriteBorder size='20px' />}
                        color='#886128'
                        backgroundColor='#FFF4E5'
                        size='md'
                        boxShadow='inner'
                        isRound={true}
                        onClick={() => dispatch(addToFavorites(product._id))}
                    />                       
                    )} 

                        <Tooltip 
                            isDisabled={!cartPlusDisabled} 
                            hasArrow 
                            label={
                                !cartPlusDisabled 
                                    ? 'Usted ha alcanzado la cantidad máxima del producto.' 
                                    : product.stock <= 0
                                    ? 'Se ha agotado'
                                    : ''
                                }>
                                <IconButton 
                                    isDisabled={product.stock <= 0 || cartPlusDisabled}
                                    onClick={() => addItem(product._id)}
                                    icon={<TbShoppingCartPlus size='20'/>}
                                    color='#886128'
                                    backgroundColor='#FFF4E5'
                                    size='md'
                                    boxShadow='md'
                                    isRound={true}
                                />
                            
                        </Tooltip>                    
                </Flex>                
            </Box>
        </Skeleton>
    );  
};

export default ProductCard;