'use client';

import type { Flight } from '@/lib/types';
import { useState, useMemo } from 'react';
import { FlightSearch } from '@/components/FlightSearch';
import { FlightResults } from '@/components/FlightResults';
import { Watchlist } from '@/components/Watchlist';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, Star } from 'lucide-react';

type FlightExplorerProps = {
  initialFlights: Flight[];
};

export default function FlightExplorer({ initialFlights }: FlightExplorerProps) {
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>(initialFlights);

  const handleSearch = (searchTerm: string, searchType: 'flightNumber' | 'origin' | 'destination') => {
    if (!searchTerm) {
      setFilteredFlights(initialFlights);
      return;
    }

    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const results = initialFlights.filter((flight) => {
      if (searchType === 'flightNumber') {
        return flight.flightNumber.toLowerCase().includes(lowercasedSearchTerm);
      }
      if (searchType === 'origin') {
        return flight.origin.code.toLowerCase().includes(lowercasedSearchTerm) || flight.origin.city.toLowerCase().includes(lowercasedSearchTerm);
      }
      if (searchType === 'destination') {
        return flight.destination.code.toLowerCase().includes(lowercasedSearchTerm) || flight.destination.city.toLowerCase().includes(lowercasedSearchTerm);
      }
      return false;
    });

    setFilteredFlights(results);
  };
  
  return (
    <Tabs defaultValue="search" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
        <TabsTrigger value="search">
          <List className="mr-2 h-4 w-4" />
          Find Flights
        </TabsTrigger>
        <TabsTrigger value="watchlist">
          <Star className="mr-2 h-4 w-4" />
          My Watchlist
        </TabsTrigger>
      </TabsList>
      <TabsContent value="search" className="mt-6">
        <div className="space-y-6">
          <FlightSearch onSearch={handleSearch} />
          <FlightResults flights={filteredFlights} allFlights={initialFlights} isLoading={false} />
        </div>
      </TabsContent>
      <TabsContent value="watchlist" className="mt-6">
        <Watchlist allFlights={initialFlights} />
      </TabsContent>
    </Tabs>
  );
}
