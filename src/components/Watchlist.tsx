'use client';

import { useWatchlist } from '@/context/WatchlistContext';
import type { Flight } from '@/lib/types';
import { FlightCard } from '@/components/FlightCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Star } from 'lucide-react';

interface WatchlistProps {
  allFlights: Flight[];
}

export function Watchlist({ allFlights }: WatchlistProps) {
  const { watchlistIds, isLoaded } = useWatchlist();

  if (!isLoaded) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-[220px] rounded-lg" />
        ))}
      </div>
    );
  }

  const watchedFlights = allFlights.filter((flight) => watchlistIds.includes(flight.id));

  if (watchedFlights.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-card rounded-lg border border-dashed">
        <Star className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold font-headline text-foreground">Your Watchlist is Empty</h3>
        <p className="text-muted-foreground mt-2 max-w-md">
          Add flights to your watchlist to track them here. Click the star icon on any flight to get started.
        </p>
      </div>
    );
  }

  return (
    <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Your Tracked Flights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {watchedFlights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
        ))}
        </div>
    </div>
  );
}
