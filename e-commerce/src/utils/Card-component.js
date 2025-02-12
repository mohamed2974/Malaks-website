import Image from "next/image";

export default function ProductCard({
    name = "",
    beschreibung = "",
    preis,
    rabatt_prozent = 0,
    bildUrls = [],
    menge,
    status = "",
    className = "",
    }) {
    preis = parseFloat(preis)
    rabatt_prozent = parseFloat(rabatt_prozent)

    const rabattiert = rabatt_prozent > 0;
    const neuerPreis = rabattiert ? preis * (1 - rabatt_prozent / 100) : preis;

    let statusStyle
    switch (status) {
        case 'Nicht Verfügbar':
            statusStyle = 'bg-gray-100 text-gray-600'
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
        <div className={`rounded-lg transition-all ease-in-out hover:shadow-2xl hover:shadow-black/20 dark:hover:shadow-white/20 will-change-transform overflow-hidden bg-BrandWhite ${className} h-fit md:h-[50vh] lg:h-[80vh] `}>
            <div className="h-2/3 overflow-hidden">
                {/* Produktbild */}
                {bildUrls.length > 0 ? (
                    <Image
                    src={bildUrls[0]}
                    className="w-full object-cover"
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
            <div className="px-4 py-3 flex flex-col justify-between h-1/3 relative">
                <div>
                    <h3 className="text-AppleBlue text-xl font-semibold mt-3">{name}</h3>
                    {rabatt_prozent === 0 && 
                    <p className="text-sm text-TextSec py-2">{beschreibung.substring(0, 60)}...</p>
                    }
                </div>
                {/* Preis & Rabatt */}
                    {rabattiert && 
                    <div className="my-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-AppleRed font-bold text-lg">
                                    {neuerPreis.toFixed(2)} €
                                </span>
                                <span className="text-gray-500 line-through">{preis.toFixed(2)} €</span>
                                <span className="text-sm bg-red-100 text-AppleRed px-2 py-1 rounded">
                                    -{rabatt_prozent.toFixed(0)}%
                                </span>
                            </div>

                    </div>
                    }

                {/* Menge */}
                <div className=" flex justify-between items-center text-sm">
                    {!rabattiert &&
                        <span className="text-black">{preis.toFixed(2)} €</span>
                    }
                    {menge !== undefined && (
                        <span className="text-gray-500">Menge: {menge}</span>
                    )}
                </div>

                {/* Status */}
                {status !== 'Verfügbar' &&
                    <div className="absolute ml-1 left-0 top-0 -translate-y-[110%] ">
                        <span
                            className={`px-2 py-1 rounded-full text-sm text-nowrap  ${statusStyle}`}>
                            {status}
                        </span>
                    </div>
                }
            </div>
        </div>
    );
}
