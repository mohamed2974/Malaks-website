import HeroSec from "@/components/home/Herosection";
import Produkte from "@/components/home/ProdukteVorschau";
import FAQ from "@/components/Fragen";
import Beforafterimg from "@/components/home/Beforafterimg";
import Vorteile from "@/components/Vorteile";
import Qualitaet from "@/components/home/Qualitaet";
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
