import HeroSec from "@/components/Herosection";
import Produkte from "@/components/ProdukteVorschau";
import FAQ from "@/components/Fragen";
import Beforafterimg from "@/components/Beforafterimg";
import Vorteile from "@/components/Vorteile";
import Qualitaet from "@/components/Qualitaet";
import Kategorien from "@/components/Kategorien";

export default function Home() {
  return (
    <>
      <HeroSec />
      <Produkte />
      <Kategorien />
      <Beforafterimg />
      <Vorteile />
      <Qualitaet />
      <FAQ />
    </>
  );
}
