'use client';

import { useState } from 'react';
import type { Flight } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { getFlightTravelAdvisory, type FlightTravelAdvisoryOutput } from '@/ai/flows/flight-assistant-flow';
import { Bot, Zap, Loader2, AlertTriangle, CloudSun } from 'lucide-react';
import { Separator } from './ui/separator';

interface FlightAssistantProps {
  flight: Flight;
}

export function FlightAssistant({ flight }: FlightAssistantProps) {
  const [advisory, setAdvisory] = useState<FlightTravelAdvisoryOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetAdvisory = async () => {
    setIsLoading(true);
    setError(null);
    setAdvisory(null);
    try {
      const result = await getFlightTravelAdvisory({
        flightNumber: flight.flightNumber,
        originCity: flight.origin.city,
        destinationCity: flight.destination.city,
      });
      setAdvisory(result);
    } catch (e) {
      console.error(e);
      setError('Sorry, the AI assistant is currently unavailable. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Bot className="mr-2" />
          Ask AI Assistant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center gap-2">
            <Bot /> AI Travel Advisory
          </DialogTitle>
          <DialogDescription>
            Real-time information for flight {flight.flightNumber}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
            {!advisory && !isLoading && !error && (
                 <div className="text-center p-4">
                    <p className="text-muted-foreground">Click the button below to get the latest travel advisory for your trip.</p>
                </div>
            )}
            {isLoading && (
                <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                </div>
            )}
            {error && (
                 <div className="text-center p-4 bg-destructive/10 rounded-lg">
                    <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2" />
                    <p className="text-destructive font-semibold">An Error Occurred</p>
                    <p className="text-destructive/80 text-sm">{error}</p>
                </div>
            )}
            {advisory && (
                <div className="space-y-4 text-sm">
                    <div className='p-4 rounded-lg bg-secondary/50'>
                        <h3 className="font-semibold font-headline flex items-center gap-2 mb-2"><CloudSun /> Destination Weather</h3>
                        <p className="text-foreground">{advisory.weatherReport}</p>
                    </div>
                     <div className='p-4 rounded-lg bg-secondary/50'>
                        <h3 className="font-semibold font-headline flex items-center gap-2 mb-2"><AlertTriangle /> Airport Status</h3>
                        <p className="text-foreground">{advisory.airportStatus}</p>
                    </div>
                </div>
            )}
        </div>
        <DialogFooter className='sm:justify-between gap-2'>
           <DialogClose asChild>
                <Button type="button" variant="secondary">
                    Close
                </Button>
            </DialogClose>
            <Button onClick={handleGetAdvisory} disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                    </>
                ) : (
                    <>
                        <Zap className="mr-2" />
                        {advisory ? 'Regenerate' : 'Get Advisory'}
                    </>
                )}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
