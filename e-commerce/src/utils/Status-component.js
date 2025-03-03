export default function Status({ children, status, className }) {
    let bgColor
    let textStyle

    switch (status) {
        case 'new':
            bgColor = 'bg-AccentGreen'
            textStyle = 'capitalize'
            break;
        case 'beta':
            bgColor = 'bg-AccentYellow'
            textStyle = 'uppercase'
            break;
        default:
            status = 'bald'
            bgColor = ' bg-BrandRed '
            textStyle = 'capitalize'
    }

    return (
        <div className={`relative inline-block ${className}`}>
            {/* Container für den Inhalt */}
            <div className={`px-2 py-0.5 bg-gray-100 border border-gray-300 rounded-lg`}>
                <span className="text-gray-500 font-medium">{children}</span>
            </div>
            {/* Badge für "Bald verfügbar" */}
            <div className={`absolute -top-2 -right-4 px-2 py-0.5 text-xs font-bold text-white rounded-full shadow-md ${bgColor} ${textStyle}`}>
                {status}
            </div>
        </div>
    );
}
