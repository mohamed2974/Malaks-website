// ######################### ULS COMPONENT ######################### //

export default function Uls({array, row, style, listItemStyle}){
    if(row === true){
        array = array.slice().reverse()
        return(
            <ul className={`flex flex-row-reverse ${style}`}>
            {array.map((item, index) => (
                <li key={index} className={` ${listItemStyle}`}>{item}</li>
            ))}
            </ul>
        )
    }

    return(
        <div className={style}>
        {array.map((ul, ulindex) => (
            <ul key={ulindex}>
            {ul.map((item, index) =>(
                index === 0 ? (
                <h2 key={index} className="font-bold">{item}</h2>
                ) : (
                <li key={index} className={listItemStyle}>{item}</li>
                )
            ))}
            </ul>
        ))}
        </div>
    )
}
