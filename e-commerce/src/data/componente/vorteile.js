import { FaShieldAlt, FaPalette, FaFeather } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';

const benefits = [
    {
        icon: <FaShieldAlt className="text-white text-3xl" />,
        title: 'Maximaler Schutz',
        description: 'Unsere Cases schützen deine AirPods vor Kratzern, Stürzen und Staub – für eine längere Lebensdauer.',
        bgColor: 'bg-blue-500',
    },
    {
        icon: <FaPalette className="text-white text-3xl" />,
        title: 'Stylisches Design',
        description: 'Wähle aus vielen Farben und Mustern, um dein AirPods Case einzigartig zu machen.',
        bgColor: 'bg-pink-500',
    },
    {
        icon: <FaFeather className="text-white text-3xl" />,
        title: 'Ultraleicht & Passgenau',
        description: 'Unsere Cases sind extrem leicht und passen perfekt, ohne das Ladeerlebnis zu beeinträchtigen.',
        bgColor: 'bg-green-500',
    },
    {
        icon: <MdLocalShipping className="text-white text-3xl" />,
        title: 'Schneller Versand',
        description: 'Wir liefern schnell & zuverlässig, damit dein neues Case so schnell wie möglich bei dir ist.',
        bgColor: 'bg-yellow-500',
    },
];

export {benefits}