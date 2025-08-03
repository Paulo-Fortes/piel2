import {
	Box,
	TableContainer,
	Th,
	Tr,
	Table,
	Td,
	Thead,
	Tbody,
	Button,
	useDisclosure,
	Alert,
	Stack,
	Spinner,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Wrap,
	useToast,
} from '@chakra-ui/react';
import { FaCheckCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, deleteUser, resetErrorAndRemoval } from '../redux/actions/adminActions';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';

const UsersTab = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();
	const [userToDelete, setUserToDelete] = useState('');
	const dispatch = useDispatch();
	const { error, loading, userRemoval, userList } = useSelector((state) => state.admin);
	const { userInfo } = useSelector((state) => state.user);
	const toast = useToast();

	useEffect(() => {
		dispatch(getAllUsers());
		dispatch(resetErrorAndRemoval());
		if (userRemoval) {
			toast({
				description: 'Usuario fue borrado.',
				status: 'success',
				isClosable: true,
			});
		}
	}, [userRemoval, dispatch, toast]);

	const openDeleteConfirmBox = (user) => {
		setUserToDelete(user);
		onOpen();
	};

	return (
		<Box>
			{error && (
				<Alert status='error'>
					<AlertIcon />
					<AlertTitle>Apaa!</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
			{loading ? (
				<Wrap justify='center'>
					<Stack direction='row' spacing='4'>
						<Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
					</Stack>
				</Wrap>
			) : (
				<Box>
					<TableContainer>
						<Table variant='simple'>
							<Thead>
								<Tr>
									<Th>Nombre</Th>
									<Th>E-mail</Th>
									<Th>Registrado</Th>
									<Th>Admin</Th>
									<Th>Acción</Th>
								</Tr>
							</Thead>
							<Tbody>
								{userList &&
									userList.map((user) => (
										<Tr key={user._id}>
											<Td>
												{user.name} {user._id === userInfo._id ? '(You)' : ''}
											</Td>
											<Td>{user.email}</Td>
											<Td>{new Date(user.createdAt).toDateString()}</Td>
											<Td>{user.isAdmin === 'true' ? <FaCheckCircle color='orange.500' /> : ''}</Td>
											<Td>
												<Button
													isDisabled={user._id === userInfo._id}
													variant='outline'
													onClick={() => openDeleteConfirmBox(user)}>
													<TiDelete mr='5px' />
													Borrar usuario
												</Button>
											</Td>
										</Tr>
									))}
							</Tbody>
						</Table>
					</TableContainer>
					<ConfirmRemovalAlert
						isOpen={isOpen}
						onOpen={onOpen}
						onClose={onClose}
						cancelRef={cancelRef}
						itemToDelete={userToDelete}
						deleteAction={deleteUser}
					/>
				</Box>
			)}
		</Box>
	);
};

export default UsersTab;