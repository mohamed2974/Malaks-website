import HeroSec from "@/components/Herosection";
import Produkte from "@/components/ProdukteVorschau";
import CheckoutButton from "@/utils/CheckoutButton-component";
import cart from '@/data/cart.json'

export default function Home() {
  return (
    <>
      <HeroSec />
      <Produkte />
      <CheckoutButton cartItems={cart} />
    </>
  );
}
