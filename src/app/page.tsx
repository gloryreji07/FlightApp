import { getFlights } from '@/lib/api';
import FlightExplorer from '@/components/FlightExplorer';
import { Header } from '@/components/Header';
import Image from 'next/image';

export default async function Home() {
  const flights = await getFlights();

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
        <div className="fixed inset-0 bg-sky -z-10" />
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
            <FlightExplorer initialFlights={flights} />
        </main>
        <footer className="py-4 text-center text-sm text-white/80">
            <p>Built for the skies. © {new Date().getFullYear()} FlightTrackr.</p>
        </footer>
    </div>
  );
}
