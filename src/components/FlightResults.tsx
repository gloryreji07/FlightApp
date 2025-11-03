'use client';

import type { Flight } from '@/lib/types';
import { FlightCard } from '@/components/FlightCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Plane } from 'lucide-react';

interface FlightResultsProps {
  flights: Flight[];
  allFlights: Flight[];
  isLoading: boolean;
}

export function FlightResults({ flights, isLoading }: FlightResultsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-[220px] rounded-lg" />
        ))}
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-card rounded-lg border border-dashed">
        <Plane className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold font-headline text-foreground">No Flights Found</h3>
        <p className="text-muted-foreground mt-2">
          Your search did not match any flights. Please try different criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
}
