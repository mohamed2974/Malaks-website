const categories = [
    { 
        name: 'gaming', 
        value: "Gaming", 
        label: "Gaming",
        bgColor: 'bg-blue-500', 
        image: '/img/kategorien/gaming.PNG',
        beschreibung: 'Perfekt für Gamer – inspiriert von ikonischen Spielen und Pixel-Art.'
    },
    { 
        name: 'snack', 
        value: "Snack", 
        label: "Snack",
        bgColor: 'bg-yellow-500', 
        image: '/img/kategorien/snack.PNG',
        beschreibung: 'Leckere Motive, die dein Case zum Hingucker machen.'
    },
    { 
        name: 'animation', 
        value: "Animation", 
        label: "Animation",
        bgColor: 'bg-pink-500', 
        image: '/img/kategorien/animation.PNG',
        beschreibung: 'Inspiriert von deinen Lieblingscharakteren und animierten Welten.'
    },
    { 
        name: 'drip', 
        value: "Drip", 
        label: "Drip",
        bgColor: 'bg-pink-500', 
        image: '/img/kategorien/drip.PNG',
        beschreibung: 'Stylische Designs für einen einzigartigen und trendigen Look.'
    },
];

const kategorieOptionen = categories.map((element) => ({
    value: element.value,
    label: element.label
}))

const kategorieOptionenArray = []
categories.forEach((element) => kategorieOptionenArray.push(element.value))

const kategorieFilterArry = []
categories.forEach((element) => kategorieFilterArry.push(element.name))


export {kategorieOptionen, kategorieOptionenArray, kategorieFilterArry, categories}