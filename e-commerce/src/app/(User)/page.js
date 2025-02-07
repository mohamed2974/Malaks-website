import CheckoutButton from "@/components/CheckoutButton";
import Cart from '@/components/Cart';
import productsCart from '@/data/cart.json'; // Falls du eine JSON-Datei nutzt

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <CheckoutButton cartItems={productsCart} />
      <Cart products={productsCart} /> */}
    </div>
  );
}
