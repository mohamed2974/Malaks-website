const categories = {
    kategorie: [
        {
            name: 'gaming', 
            value: "Gaming", 
            label: "Gaming",
            image: '/img/kategorien/gaming.jpg',
            beschreibung: 'Perfekt für Gamer – inspiriert von ikonischen Spielen und Pixel-Art.'
        },
        {
            name: 'snack', 
            value: "Snack", 
            label: "Snack",
            image: '/img/kategorien/snack.jpg',
            beschreibung: 'Leckere Motive, die dein Case zum Hingucker machen.'
        },
        {
            name: 'animation', 
            value: "Animation", 
            label: "Animation",
            image: '/img/kategorien/animation.jpg',
            beschreibung: 'Inspiriert von deinen Lieblingscharakteren und animierten Welten.'
        },
        {
            name: 'drip', 
            value: "Drip", 
            label: "Drip",
            image: '/img/kategorien/drip.jpg',
            beschreibung: 'Stylische Designs für einen einzigartigen und trendigen Look.'
        }
    ],
    modell: [
        { 
            name: 'pro', 
            value: "Airpods Pro", 
            label: "Airpods Pro"
        },
        { 
            name: '2gen', 
            value: "Airpods (2. Gen)", 
            label: "Airpods (2. Gen)"
        },
        { 
            name: '3gen', 
            value: "Airpods (3. Gen)", 
            label: "Airpods (3. Gen)"
        },
    ]
};

// **Alle Kategorien und Modelle in ein einziges Array umwandeln**
const categoriesArray = Object.values(categories).flat();

// **Dropdown-Optionen für ein Select-Feld**
const kategorieOptionen = categoriesArray.map((element) => ({
    value: element.value,
    label: element.label
}));

// **Array mit allen Values**
const kategorieOptionenArray = categoriesArray.map((element) => element.value);

// **Array mit allen Namen**
const kategorieFilterArray = categoriesArray.map((element) => element.name);

export { kategorieOptionen, kategorieOptionenArray, kategorieFilterArray, categories };