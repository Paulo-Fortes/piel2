import {
	Tr,
	Td,
	Button,
	VStack,
	Textarea,
	Tooltip,
	Input,
	FormControl,
	Spacer,
	Switch,
	FormLabel,
	Text,
	Badge,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdDriveFolderUpload } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { uploadProduct } from '../redux/actions/adminActions';

const AddNewProduct = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [stock, setStock] = useState('');
	const [price, setPrice] = useState('');
	const [productIsNew, setProductIsNew] = useState(true);
	const [description, setDescription] = useState('');
	const [imageOne, setImageOne] = useState('');
	const [imageTwo, setImageTwo] = useState('');

	const createNewProduct = () => {
		dispatch(
			uploadProduct({
				name,
				category,
				stock,
				price,
				images: [`/images/${imageOne}`, `images/${imageTwo}`],
				productIsNew,
				description,
			})
		);
	};

	return (
		<Tr>
			<Td>
				<Text fontSize='sm'>Nombre de la imagen 1</Text>
				<Tooltip label={'Escribir la ruta de la imagen'} fontSize='sm'>
					<Input
						size='sm'
						value={imageOne}
						onChange={(e) => setImageOne(e.target.value)}
						placeholder='ej.: vitc1.jpg'
					/>
				</Tooltip>
				<Spacer />
				<Text fontSize='sm'>Nombre de la imagen 2</Text>
				<Tooltip label={'Escribir la ruta de la imagen'} fontSize='sm'>
					<Input
						size='sm'
						value={imageTwo}
						onChange={(e) => setImageTwo(e.target.value)}
						placeholder='ej.: vitc1.jpg'
					/>				
				</Tooltip>
			</Td>
			<Td>
				<Text fontSize='sm'>Descripcion</Text>
				<Textarea
					value={description}
					w='270px'
					h='120px'
					onChange={(e) => {
						setDescription(e.target.value);
					}}
					placeholder='Descripcion'
					size='sm'
				/>
			</Td>
			<Td>				
				<Text fontSize='sm'>Nombre del producto</Text>
				<Input size='sm' value={name} onChange={(e) => setName(e.target.value)} placeholder='Retinol, Ác. Glicólico...' />
			</Td>

			<Td>
				<Text fontSize='sm'>Categoria</Text>
				<Input size='sm' value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Serum, Gel, Crema...' />
				<Text fontSize='sm'>Price</Text>
				<Input size='sm' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='30000 (sin punto y coma)' />
			</Td>

			<Td>
				<Text fontSize='sm'>Stock</Text>
				<Input size='sm' value={stock} onChange={(e) => setStock(e.target.value)} />
				<Text fontSize='sm'>Marcar producto como nuevo?</Text>
				<FormControl display='flex' alignItems='center'>
					<FormLabel htmlFor='productIsNewFlag' mb='0' fontSize='sm'>
						
						<Badge rounded='full' px='1' mx='1' fontSize='0.8em' colorScheme='purple'>
							Nuevo
						</Badge>
						
					</FormLabel>
					<Switch id='productIsNewFlag' onChange={() => setProductIsNew(!productIsNew)} isChecked={productIsNew} />
				</FormControl>
			</Td>
			<Td>
				<VStack>
					<Button variant='outline' w='160px' colorScheme='green' onClick={createNewProduct}>
						<MdDriveFolderUpload />
						<Text ml='2'>Guardar producto</Text>
					</Button>
				</VStack>
			</Td>
		</Tr>
	);
};

export default AddNewProduct;