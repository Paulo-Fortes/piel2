import { TiStarOutline } from "react-icons/ti";

const Star = ({rating = 0, star = 0}) => (
    <TiStarOutline color={rating >= star || rating === 0 ? 'yellow.500' : 'gray.200'}/>
);


export default Star;