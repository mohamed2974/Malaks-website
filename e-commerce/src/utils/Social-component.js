import Link from "next/link";
import { FaSquareFacebook, FaYoutube, FaInstagram, FaSquareXTwitter, FaTiktok } from "react-icons/fa6";

export default function SocialMedia({ className }) {
    return (
        <ul className={className}>
            {/* <li className='mx-4 hover:scale-150 transition-all hover:text-red-500'><FaYoutube /></li> */}
            {/* <li className='mx-4 hover:scale-150 transition-all hover:text-blue-500'><FaSquareFacebook /></li> */}
            {/* <li className='mx-4 hover:scale-150 transition-all'><FaSquareXTwitter /></li> */}
            <Link href='https://www.instagram.com/casetoonshop/' target="_blank">
                <li className='mx-4 hover:scale-150 transition-all hover:text-pink-500'><FaInstagram /></li>
            </Link>
            <Link href='https://www.tiktok.com/@casetoonshop?_t=ZN-8uK5hsvTG2o&_r=1' target="_blank">
                <li className='mx-4 hover:scale-150 transition-all'><FaTiktok /></li>
            </Link>
        </ul>
    );
}
