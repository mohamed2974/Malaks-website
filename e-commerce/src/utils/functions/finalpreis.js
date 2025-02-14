export default function finalpreis(produkt) {
    let { preis = 0, rabatt_prozent = 0 } = produkt;  

    preis = parseFloat(preis)
    rabatt_prozent = parseFloat(rabatt_prozent || 0)

    const finalPrice = preis * (1 - rabatt_prozent / 100);

    return finalPrice.toFixed(2);
}
