// ######################### SOCIAL MEDIA LINKS ######################### //
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function SocialMedia({style}){
    return(
        <ul className={style}>
            <li className='mx-4 hover:scale-150 transition-all hover:text-red-500'><YouTubeIcon /></li>
            <li className='mx-4 hover:scale-150 transition-all hover:text-blue-500'><FacebookIcon /></li>
            <li className='mx-4 hover:scale-150 transition-all hover:text-sky-500'><TwitterIcon /></li>
            <li className='mx-4 hover:scale-150 transition-all hover:text-pink-500'><InstagramIcon /></li>
            <li className='mx-4 hover:scale-150 transition-all hover:text-cyan-500'><LinkedInIcon /></li>
        </ul>
    )
}
