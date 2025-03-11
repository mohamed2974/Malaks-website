import Image from "next/image";
import finalpreis from "./functions/finalpreis";

export default function ProductCard({produkt}) {
    let { name, preis = 0, rabatt_prozent, status, bild_urls } = produkt 
    
    preis = parseFloat(preis)
    rabatt_prozent = parseFloat(rabatt_prozent || 0)
    
    const rabattiert = rabatt_prozent > 0;
    const neuerPreis = rabattiert ? finalpreis(produkt) : preis;

    if (parseFloat(produkt.menge) === 0){
        status = 'Nicht Verfügbar'
    }

    let statusStyle
    switch (status) {
        case 'Nicht Verfügbar':
            statusStyle = 'bg-gray-100 text-gray-600 capitalize'
            break;
        case 'Neu':
            statusStyle = 'bg-green-100 text-AccentGreen uppercase'
            break;
        case 'Exklusiv':
            statusStyle = 'bg-yellow-100 text-AccentYellow uppercase'
            break;
        default:
            break;
    }

    return (
        <div className={`rounded-lg grid grid-rows-3 transition-all ease-in-out hover:shadow-2xl hover:shadow-black/20 dark:hover:shadow-white/20 will-change-transform overflow-hidden bg-BrandWhite shadow-md dark:shadow-white/15`}>
            <div className="row-span-2 relative aspect-square overflow-hidden">
                {/* Produktbild */}
                {bild_urls.length > 0 ? (
                    <Image
                    src={bild_urls[0]}
                    className="object-cover"
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw" 
                    />
                ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-500">Kein Bild</span>
                </div>
                )}
            </div>

            {/* Produktinformationen */}
            <div className="px-4 py-1.5 md:py-2 flex flex-col justify-between relative bg-BrandWhite">
                <div>
                    <h3 className="text-BrandBlueLight text-sm md:text-lg font-semibold truncate md:whitespace-normal">
                        {name}
                    </h3>
                </div>

                {/* Preis & Rabatt */}
                {rabattiert ?
                <div className="space-x-1.5 md:space-x-2 truncate">
                    <span className="text-SaleRed font-bold text-[12px] md:text-lg">
                        {neuerPreis} €
                    </span>
                    <span className="text-BrandDark text-[12px] line-through">{preis.toFixed(2)} €</span>
                    <span className="hidden font-bold md:inline text-[12px] bg-red-100 text-SaleRed px-2 py-1 rounded">
                        - {rabatt_prozent.toFixed(0)}%
                    </span>
                </div> :
                // preis ohne rabatt
                <div>
                    {!rabattiert &&
                        <span className="text-BrandDark text-[12px]">{preis.toFixed(2)} €</span>
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
