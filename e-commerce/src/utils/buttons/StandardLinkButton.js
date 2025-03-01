import Link from "next/link";

export default function StandardLinkButton({link,text}){
    return (
        <Link className='inline-block mt-4 bg-BrandBlue hover:bg-BrandBlueLight text-BrandWhite px-6 py-2 rounded-md transition duration-200 shadow-md' href={link}>
            {text}
        </Link>
    )
}