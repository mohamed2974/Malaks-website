import { LinearGradient } from 'react-text-gradients'
import Produktekarten from '../utils/Produktekarten';

export default function Produkte() {
    return (
        <section className="py-20">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold">
                    <LinearGradient gradient={["to right", "#374151,#c2410c ,#fb923c"]}>
                    Unsere Produkte
                    </LinearGradient>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Entdecke unsere neuesten Angebote</p>
            </div>
            <div>
                <Produktekarten sliceparam={[0,8]} behave='scrollbar' />
            </div>
        </section>
    );
}
