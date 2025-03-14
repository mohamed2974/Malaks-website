import GradientTitel from "@/utils/GradientTitel";
import Produktekarten from '../../utils/Produktekarten';

export default function Produkte() {
    return (
        <section className="min-h-[80vh]">
            {/* Header */}
            <div className="text-center mb-10">
                <GradientTitel text="Unsere Produkte" />
                <p className="text-TextSec mt-2">Entdecke unsere neuesten Angebote</p>
            </div>
            <div>
                <Produktekarten sliceparam={[0,8]} behave='scrollbar' />
            </div>
        </section>
    );
}
