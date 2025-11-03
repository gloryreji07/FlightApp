'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type SearchType = 'flightNumber' | 'origin' | 'destination';

interface FlightSearchProps {
  onSearch: (searchTerm: string, searchType: SearchType) => void;
}

export function FlightSearch({ onSearch }: FlightSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('flightNumber');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, searchType);
  };

  const getPlaceholder = () => {
    switch (searchType) {
      case 'flightNumber':
        return 'e.g., AA123';
      case 'origin':
        return 'e.g., JFK or New York';
      case 'destination':
        return 'e.g., LAX or Los Angeles';
      default:
        return 'Enter search term...';
    }
  }

  return (
    <Card className="glass-card overflow-hidden shadow-2xl">
        <CardHeader>
            <CardTitle className="font-headline text-xl md:text-2xl">Find Your Flight</CardTitle>
            <CardDescription>Search by flight number, origin, or destination.</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2">
                <Select value={searchType} onValueChange={(value: SearchType) => setSearchType(value)}>
                    <SelectTrigger className="w-full sm:w-[150px] shrink-0">
                        <SelectValue placeholder="Search by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="flightNumber">Flight No.</SelectItem>
                        <SelectItem value="origin">Origin</SelectItem>
                        <SelectItem value="destination">Destination</SelectItem>
                    </SelectContent>
                </Select>
                <Input
                    type="text"
                    placeholder={getPlaceholder()}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                />
                <Button type="submit" className="w-full sm:w-auto">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                </Button>
            </form>
        </CardContent>
    </Card>

  );
}
