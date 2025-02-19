const kategorieOptionen = [
    { value: "Elektronik", label: "Elektronik" },
    { value: "Kleidung", label: "Kleidung" },
    { value: "Haushalt", label: "Haushalt" },
    { value: "Bücher", label: "Bücher" },
    { value: "Produktxy", label: "Produktxy" },
    { value: "Teste", label: "Teste" },
];

const kategorieOptionenArray = []
kategorieOptionen.forEach((element) => kategorieOptionenArray.push(element.value))

export {kategorieOptionen, kategorieOptionenArray}