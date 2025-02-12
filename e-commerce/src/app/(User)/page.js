// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/home'); // Leitet automatisch zu /home weiter
}
