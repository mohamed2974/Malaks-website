import { FaSquareFacebook, FaYoutube, FaInstagram, FaSquareXTwitter } from "react-icons/fa6";

export default function SocialMedia({ className }) {
    return (
        <ul className={className}>
            <li className='mx-4 hover:scale-150 transition-all hover:text-red-500'><FaYoutube /></li>
            <li className='mx-4 hover:scale-150 transition-all hover:text-blue-500'><FaSquareFacebook /></li>
            <li className='mx-4 hover:scale-150 transition-all'><FaSquareXTwitter /></li>
            <li className='mx-4 hover:scale-150 transition-all hover:text-pink-500'><FaInstagram /></li>
        </ul>
    );
}
