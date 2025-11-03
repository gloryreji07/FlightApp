'use client';

import type { Flight } from '@/lib/types';
import { useWatchlist } from '@/context/WatchlistContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { FlightDetailsModal } from '@/components/FlightDetailsModal';
import { FlightStatusBadge } from '@/components/FlightStatusBadge';
import { Star, Plane, ArrowRight, Clock } from 'lucide-react';
import { formatTime, cn } from '@/lib/utils';
import { useState } from 'react';

interface FlightCardProps {
  flight: Flight;
}

export function FlightCard({ flight }: FlightCardProps) {
  const { watchlistIds, addToWatchlist, removeFromWatchlist, isLoaded } = useWatchlist();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const isInWatchlist = watchlistIds.includes(flight.id);

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    if (isInWatchlist) {
      removeFromWatchlist(flight.id);
    } else {
      addToWatchlist(flight.id);
    }
  };

  return (
    <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
      <DialogTrigger asChild>
        <Card className="hover:shadow-xl hover:border-primary transition-all cursor-pointer h-full flex flex-col group">
          <CardHeader>
            <div className="flex justify-between items-start gap-2">
                <div>
                    <CardTitle className="font-headline text-lg group-hover:text-primary">{flight.airline}</CardTitle>
                    <p className="text-sm text-muted-foreground">{flight.flightNumber}</p>
                </div>
                <FlightStatusBadge status={flight.status} />
            </div>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <div className="flex items-center justify-between text-center">
              <div className="w-1/3">
                <p className="text-2xl font-bold font-headline">{flight.origin.code}</p>
                <p className="text-xs text-muted-foreground truncate">{flight.origin.city}</p>
              </div>
              <div className="w-1/3 text-muted-foreground flex flex-col items-center">
                 <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                 <div className="flex items-center gap-1 text-xs mt-1">
                    <Clock className="w-3 h-3"/>
                    <span>{flight.duration}</span>
                 </div>
              </div>
              <div className="w-1/3">
                <p className="text-2xl font-bold font-headline">{flight.destination.code}</p>
                <p className="text-xs text-muted-foreground truncate">{flight.destination.city}</p>
              </div>
            </div>
             <div className="flex justify-between items-center text-sm text-muted-foreground bg-secondary/70 p-2 rounded-md">
                <div>
                    <span className="font-semibold text-foreground">Departs:</span> {formatTime(flight.departure.scheduled)}
                </div>
                <div>
                    <span className="font-semibold text-foreground">Arrives:</span> {formatTime(flight.arrival.scheduled)}
                </div>
            </div>
          </CardContent>
          <CardFooter>
            {isLoaded && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWatchlistToggle}
                className="w-full text-muted-foreground hover:text-accent-foreground"
                aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
              >
                <Star className={cn('mr-2 h-4 w-4 transition-colors', isInWatchlist ? 'fill-accent text-accent' : 'text-muted-foreground group-hover:text-accent')} />
                {isInWatchlist ? 'On Watchlist' : 'Add to Watchlist'}
              </Button>
            )}
          </CardFooter>
        </Card>
      </DialogTrigger>
      <FlightDetailsModal flight={flight} />
    </Dialog>
  );
}
