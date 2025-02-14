import Image from "next/image";
import finalpreis from "./functions/finalpreis";

export default function ProductCard({produkt}) {
    let { name, preis = 0, rabatt_prozent, status, bild_urls } = produkt 
    
    preis = parseFloat(preis)
    rabatt_prozent = parseFloat(rabatt_prozent || 0)
    
    const rabattiert = rabatt_prozent > 0;
    const neuerPreis = rabattiert ? finalpreis(produkt) : preis;

    let statusStyle
    switch (status) {
        case 'Nicht Verfügbar':
            statusStyle = 'bg-gray-100 text-gray-600 capitalize'
            break;
        case 'Neu':
            statusStyle = 'bg-green-100 text-FreshGreen uppercase'
            break;
        case 'Exklusiv':
            statusStyle = 'bg-yellow-100 text-NeonYellow uppercase'
            break;
        default:
            break;
    }

    return (
        <div className={`rounded-lg transition-all ease-in-out hover:shadow-2xl hover:shadow-black/20 dark:hover:shadow-white/20 will-change-transform overflow-hidden bg-BrandWhite shadow-md dark:shadow-white/15 h-[70vw] md:h-[42vw] lg:h-[31vw]`}>
            <div className="h-3/4 md:h-3/5 lg:h-2/3 overflow-hidden flex items-center">
                {/* Produktbild */}
                {bild_urls.length > 0 ? (
                    <Image
                    src={bild_urls[0]}
                    className="w-full h-full object-cover"
                    alt={name}
                    width={300}
                    height={200}
                    />
                ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-500">Kein Bild</span>
                </div>
                )}
            </div>

            {/* Produktinformationen */}
            <div className="h-1/4 md:h-2/5 lg:h-1/3 px-4 py-1.5 md:py-2 flex flex-col justify-between relative">
                <div>
                    <h3 className="text-AppleBlue text-sm md:text-lg font-semibold truncate md:whitespace-normal">
                        {name}
                    </h3>
                </div>

                {/* Preis & Rabatt */}
                {rabattiert ?
                <div className="space-x-1.5 md:space-x-2 truncate">
                    <span className="text-AppleRed font-bold text-[12px] md:text-lg">
                        {neuerPreis} €
                    </span>
                    <span className="text-gray-500 text-[12px] line-through">{preis.toFixed(2)} €</span>
                    <span className="hidden md:inline text-[12px] bg-red-100 text-AppleRed px-2 py-1 rounded">
                        -{rabatt_prozent.toFixed(0)}%
                    </span>
                </div> :
                // preis ohne rabatt
                <div>
                    {!rabattiert &&
                        <span className="text-black text-[12px]">{preis.toFixed(2)} €</span>
                    }
                </div>
                }


                {/* Status */}
                {status.toLowerCase() !== 'verfügbar'  &&
                    <div className="absolute ml-1 left-0 top-0 -translate-y-[110%] ">
                        <span
                            className={`px-1 md:px-2 py-0.5 md:py-1 rounded-full text-[11px] text-nowrap  ${statusStyle}`}>
                            {status}
                        </span>
                    </div>
                }
            </div>
        </div>
    );
}
