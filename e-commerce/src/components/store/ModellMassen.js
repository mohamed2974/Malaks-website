import GradientTitel from "@/utils/GradientTitel";
import Image from "next/image";
import { modelle } from "@/data/componente/modelle";

export default function ModellMassen() {
    return (
        <section>
            <div className="text-center mb-10">
                <GradientTitel text='Finde dein AirPods-Modell' />
                <p className="text-TextSec mt-2">Vergleiche die verschiedenen AirPods-Modelle und finde die passende Hülle für dein Gerät.</p>
            </div>

            <div className="md:hidden">
                <div className="aspect-square relative shadow-lg rounded-lg overflow-hidden"> 
                    <Image src='/img/modelle/alle.webp' alt="AirPods Modelle" fill className="object-cover"/>
                </div>
            </div>
            <div className=" md:grid grid-cols-3 gap-6 hidden">
                {modelle.map((modell, index) => (
                    <div key={index} className="bg-BgSec shadow-md rounded-lg md:p-3 lg:p-6 text-center transition hover:-translate-y-2">
                        <div className="aspect-square relative rounded-md overflow-hidden"> 
                            <Image src={modell.img} alt="AirPods Modelle" fill className="object-cover"/>
                        </div>
                        <h3 className="lg:text-xl text-TextPrim font-semibold mt-4">{modell.name}</h3>
                        <p className="md:text-sm lg:text-lg text-AccentYellow bg-yellow-100 w-fit mx-auto px-2 rounded-md mt-2">{modell.erschienen}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

/**
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        {/* AirPods 2nd Gen 
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <img
            src="/airpods-2nd-gen.png"
            alt="AirPods 2nd Generation"
            className="w-32 mx-auto"
          />
          <h3 className="text-xl font-semibold mt-4">AirPods (2. Gen)</h3>
          <p className="text-gray-600">Erschienen 2016</p>
        </div>

        {/* AirPods 3rd Gen 
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <img
            src="/airpods-3rd-gen.png"
            alt="AirPods 3rd Generation"
            className="w-32 mx-auto"
          />
          <h3 className="text-xl font-semibold mt-4">AirPods (3. Gen)</h3>
          <p className="text-gray-600">Erschienen 2021</p>
        </div>

        {/* AirPods Pro 
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <img
            src="/airpods-pro.png"
            alt="AirPods Pro"
            className="w-32 mx-auto"
          />
          <h3 className="text-xl font-semibold mt-4">AirPods Pro</h3>
          <p className="text-gray-600">Erschienen 2019</p>
        </div>
      </div>
    </section>
  );
};

export default CompareAirPods;

 */