import {Button, Flex, Heading, Stack, Text, useColorModeValue as mode} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link as ReactLink} from 'react-router-dom';


const OrderSummary = () => {
  const {subtotal, shipping} = useSelector((state) => state.cart);

  return (
    <Stack
      minWidth='300px'
      spacing='1px'
      borderColor={mode('cyan.500', 'cyan.100')}
      rounded='lg'
      padding='8'
      w='full'
    >
    <Heading size='md' mb='10%' color={mode('#96634E', '#FFF4E5')}>Resumen de la Compra</Heading>
    <Stack spacing='6'>
      <Flex justify='space-between'>
        <Text fontWeight='medium' color={mode('#96634E', '#FFF4E5')}>
          Subtotal
        </Text>
        <Text fontWeight='medium' color={mode('#96634E', '#FFF4E5')}>${subtotal}</Text>
      </Flex>
      <Flex justify='space-between'>
        <Text fontWeight='medium' color={mode('#96634E', '#FFF4E5')}>
          Envío
        </Text>
        <Text fontWeight='medium' color={mode('#96634E', '#FFF4E5')}>${shipping}</Text>        
      </Flex>
      <Flex justify='space-between'>
        <Text fontSize='xl' fontWeight='extrabold' color={mode('#96634E', '#FFF4E5')}>
          Total
        </Text>
        <Text fontWeight='medium' color={mode('#96634E', '#FFF4E5')}>${Number(subtotal) + Number(shipping)}</Text>        
      </Flex>
    </Stack>
    <Button as={ReactLink} to='/checkout' mt='15%' colorScheme='yellow' size='lg' textColor={mode('#6a3f2cff', '#FFF4E5')} rightIcon={<FaArrowRight/>}>
      Comprar
    </Button>

    </Stack>
  )
}

export default OrderSummary