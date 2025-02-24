const categories = [
    { 
        name: 'Gaming', 
        value: "Gaming", 
        label: "Gaming",
        bgColor: 'bg-blue-500', 
        image: '/path-to-gaming.jpg',
    },
    { 
        name: 'Snack', 
        value: "Snack", 
        label: "Snack",
        bgColor: 'bg-yellow-500', 
        image: '/path-to-gaming.jpg',
    },
    { 
        name: 'Animation', 
        value: "Animation", 
        label: "Animation",
        bgColor: 'bg-pink-500', 
        image: '/path-to-gaming.jpg',
    },
    { 
        name: 'Drip', 
        value: "Drip", 
        label: "Drip",
        bgColor: 'bg-pink-500', 
        image: '/path-to-gaming.jpg',
    },
];

const kategorieOptionen = categories.map((element) => ({
    value: element.value,
    label: element.label
}))

const kategorieOptionenArray = []
categories.forEach((element) => kategorieOptionenArray.push(element.value))


export {kategorieOptionen, kategorieOptionenArray, categories}