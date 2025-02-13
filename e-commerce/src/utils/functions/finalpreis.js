export default function finalpreis(produkt) {
    let { preis = 0, rabatt = 0 } = produkt;  

    preis = parseFloat(preis)
    rabatt = parseFloat(rabatt || 0)

    const finalPrice = preis * (1 - rabatt / 100);

    return finalPrice;
}
