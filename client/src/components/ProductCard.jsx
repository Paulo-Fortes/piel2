import {Box, Image, Text, Badge, Flex, IconButton, Skeleton /* , Icon */} from '@chakra-ui/react';
import {BiExpand} from 'react-icons/bi';
import React from 'react'
/* import { scale } from 'framer-motion'; */



const ProductCard = ({product, loading}) => {
    return <Skeleton isLoaded={!loading} _hover={{size: 1.5}}>
        <Box
        _hover={{transform: 'scale(1.1)', transitionDuration: '0.5s'}}
        borderWidth='0px'
        overflow='hidden'
        backgroundColor='orange.50'
        p='6'
        rounded='3xl'
        shadow='md'
        borderColor='gray.300'
        /* boxShadow='inner' */        
        >
            <Image src={product.images[0]} fallbackSrc='http:/via.placeholder.com/150' alt={product.name} height='200px' rounded='xl' shadow='md'/>
            <br></br>
                {product.stock === 0 ? (
                <Badge colorScheme='red'>Agotado</Badge>
            ) : product.stock < 5 ? (
                <Badge colorScheme='yellow'> En stock {product.stock} itens</Badge>
            ) : (
                <Badge colorScheme='green' >Hay stock</Badge>
                )}
                {product.productIsNew && (
                    <Badge ml='2' colorScheme='purple'>
                        Nuevo
                    </Badge>
                )}
                <Text noOfLines={1} fontSize='xl' fontWeight='semibold' mt='2'color='gray.600'>
                    {product.name}
                </Text>
                <Text noOfLines={1} fontSize='md' color='gray.500'>
                    {product.subtitle}
                </Text>
                <Flex justify='space-between' alignItems='center' mt='2'>
                    <Badge colorScheme='gray'>{product.category}</Badge>
                    <Text fontSize='xl' fontWeight='semibold' shadow='inner' rounded='xl' p='2' color='teal.400' borderColor='gray.200'>
                        AR${' '}{product.price}
                    </Text>
                </Flex>
                <IconButton icon={<BiExpand size='20'/>} colorScheme='yellow' size='sm' shadow='md' />
        </Box>
    </Skeleton>    
};

export default ProductCard;