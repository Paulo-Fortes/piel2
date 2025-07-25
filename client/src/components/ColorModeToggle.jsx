import {useColorMode, IconButton} from '@chakra-ui/react';
import {FaRegMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";


const ColorModeToggle = () => {
    const {colorMode, toggleColorMode} = useColorMode();

    return (
        <IconButton icon={colorMode === 'dark' ? <MdSunny color='#FFF4E5'/> : <FaRegMoon color='#96634E'/>} onClick={toggleColorMode} variant='ghost' />
    );
}

export default ColorModeToggle