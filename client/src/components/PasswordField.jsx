import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Field, useField} from 'formik';
import {useState} from 'react';
import { InputRightElement, Button, Input, InputGroup } from '@chakra-ui/react';
import { GrFormView, GrFormViewHide  } from "react-icons/gr";


const PasswordField = ({ label, type, name, placeholder }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [field, meta] = useField({ type, name, placeholder });
	return (
		<FormControl isInvalid={meta.error && meta.touched} mb='6'>
			<FormLabel noOfLines={1}>{label}</FormLabel>
			<InputGroup>
				<Field as={Input} {...field} type={showPassword ? 'text' : type} name={name} placeholder={placeholder} />
				<InputRightElement h='full'>
					<Button variant='ghost' onClick={() => setShowPassword((showPassword) => !showPassword)}>
						{showPassword ? <GrFormView /> : <GrFormViewHide />}
					</Button>
				</InputRightElement>
			</InputGroup>
			<FormErrorMessage>{meta.error}</FormErrorMessage>
		</FormControl>
	);
};

export default PasswordField;