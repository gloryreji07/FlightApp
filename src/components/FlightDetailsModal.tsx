'use client';

import type { Flight } from '@/lib/types';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { FlightStatusBadge } from '@/components/FlightStatusBadge';
import { formatDateTime } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Plane, Calendar, Clock, Building2, PlaneTakeoff, PlaneLanding, DoorOpen } from 'lucide-react';

interface FlightDetailsModalProps {
  flight: Flight;
}

const DetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: React.ReactNode }) => (
    <div className="flex items-start gap-4">
        <Icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
        <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="font-semibold text-foreground">{value || 'N/A'}</span>
        </div>
    </div>
);

export function FlightDetailsModal({ flight }: FlightDetailsModalProps) {
  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <div className="flex justify-between items-start">
            <div>
                <DialogTitle className="font-headline text-2xl">{flight.airline} {flight.flightNumber}</DialogTitle>
                <DialogDescription>
                    {flight.origin.city} to {flight.destination.city}
                </DialogDescription>
            </div>
            <FlightStatusBadge status={flight.status} />
        </div>
      </DialogHeader>
      <div className="grid gap-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4 p-4 rounded-lg bg-secondary/50">
                <h3 className="font-headline text-lg flex items-center gap-2"><PlaneTakeoff /> Departure</h3>
                <DetailItem icon={Building2} label="Airport" value={`${flight.origin.name} (${flight.origin.code})`} />
                <DetailItem icon={Calendar} label="Scheduled" value={formatDateTime(flight.departure.scheduled)} />
                {flight.departure.actual && <DetailItem icon={Clock} label="Actual" value={formatDateTime(flight.departure.actual)} />}
                <div className="flex gap-4">
                    <DetailItem icon={Building2} label="Terminal" value={flight.departure.terminal} />
                    <DetailItem icon={DoorOpen} label="Gate" value={flight.departure.gate} />
                </div>
            </div>
            <div className="space-y-4 p-4 rounded-lg bg-secondary/50">
                <h3 className="font-headline text-lg flex items-center gap-2"><PlaneLanding /> Arrival</h3>
                <DetailItem icon={Building2} label="Airport" value={`${flight.destination.name} (${flight.destination.code})`} />
                <DetailItem icon={Calendar} label="Scheduled" value={formatDateTime(flight.arrival.scheduled)} />
                {flight.arrival.estimated && <DetailItem icon={Clock} label="Estimated" value={formatDateTime(flight.arrival.estimated)} />}
                 <div className="flex gap-4">
                    <DetailItem icon={Building2} label="Terminal" value={flight.arrival.terminal} />
                    <DetailItem icon={DoorOpen} label="Gate" value={flight.arrival.gate} />
                </div>
            </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
            <DetailItem icon={Plane} label="Aircraft" value={flight.aircraft} />
            <DetailItem icon={Clock} label="Duration" value={flight.duration} />
            {flight.delay > 0 && <DetailItem icon={Clock} label="Delay" value={`${flight.delay} minutes`} />}
        </div>
      </div>
    </DialogContent>
  );
}
