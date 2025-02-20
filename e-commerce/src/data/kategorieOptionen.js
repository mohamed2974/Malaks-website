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

const categories = [
    { name: 'Gaming', bgColor: 'bg-blue-500', image: '/path-to-gaming.jpg' },
    { name: 'Manga', bgColor: 'bg-orange-500', image: '/path-to-manga.jpg' },
    { name: 'Heros', bgColor: 'bg-red-500', image: '/path-to-heros.jpg' },
    { name: 'Obst/Gemüse', bgColor: 'bg-green-500', image: '/path-to-fruits.jpg' },
    { name: 'Snack', bgColor: 'bg-yellow-500', image: '/path-to-snack.jpg' },
    { name: 'Animation', bgColor: 'bg-pink-500', image: '/path-to-animation.jpg' },
];

export {kategorieOptionen, kategorieOptionenArray, categories}