import { FaShieldAlt, FaPalette, FaFeather } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';

const benefits = [
    {
        icon: <FaShieldAlt className="text-white text-3xl" />,
        title: 'Maximaler Schutz',
        description: 'Kein Stress mehr mit Kratzern, Stürzen oder Staub! Unsere Cases sorgen für eine längere Lebensdauer deiner AirPods.',
        bgColor: 'bg-blue-500',
    },
    {
        icon: <FaPalette className="text-white text-3xl" />,
        title: 'Stylisches Design',
        description: 'Wähle aus vielen Farben und Mustern, um dein Case einzigartig zu machen.',
        bgColor: 'bg-pink-500',
    },
    {
        icon: <FaFeather className="text-white text-3xl" />,
        title: 'Ultraleicht & Passgenau',
        description: 'Superleichtes Material, das perfekt sitzt, ohne das Laden zu beeinträchtigen.',
        bgColor: 'bg-green-500',
    },
    {
        icon: <MdLocalShipping className="text-white text-3xl" />,
        title: 'Schneller Versand',
        description: 'Wir liefern schnell & zuverlässig, dein neues Case ist blitzschnell bei dir!',
        bgColor: 'bg-yellow-500',
    },
];

export {benefits}