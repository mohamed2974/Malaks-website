import Image from "next/image"

export default function Card({titel = '', description = '', links = [{name: '', link:'', linkTarget: '_self'}], img, icon, className = '', }){
    return(
        <div className={`bg-white rounded-lg shadow-md overflow-hidden p-6 ${className}`}>
            {img ? <Image src={img} className="w-full h-48 object-cover" alt="image"/>: <div className="text-4xl mb-5">{icon}</div>}
            <div className="">
                <h3 className="text-xl font-semibold mb-5">{titel}</h3>
                <p className="text-gray-600 mb-5">{description}</p>
                <div className="flex justify-between items-center">
                    {links.length > 0 && links.map((item, index) => (
                        <a className="text-blue-500 hover:underline" key={index} target={item.linkTarget} href={item.link} rel="noopener noreferrer">
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}