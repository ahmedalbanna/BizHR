'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Plus,
  Users,
  X,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, addMonths, subMonths } from 'date-fns';
import { calendarEvents } from '@/lib/data';
import { useRouter } from 'next/navigation';

type Event = (typeof calendarEvents)[0];

const eventTypes = {
  'Team Event': 'bg-green-500',
  'Performance Review': 'bg-red-500',
  Interview: 'bg-yellow-500',
  Holiday: 'bg-blue-500',
};

const EventDot = ({ type }: { type: Event['type'] }) => (
  <div
    className={cn(
      'absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full',
      eventTypes[type]
    )}
  />
);

export default function CalendarPage() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState('Month');

  const selectedDayEvents = calendarEvents.filter(
    (event) =>
      selectedDate &&
      format(new Date(event.date), 'yyyy-MM-dd') ===
        format(selectedDate, 'yyyy-MM-dd')
  );

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 flex items-center justify-between bg-primary p-4 text-primary-foreground">
        <h1 className="text-xl font-bold">HR Calendar</h1>
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <X />
        </Button>
      </header>

      <div className="flex-shrink-0 p-4 space-y-4 bg-primary/95 text-primary-foreground">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-10 bg-primary/50 border-0 placeholder:text-primary-foreground/60"
          />
        </div>
        <Button variant="outline" className="w-full bg-transparent text-primary-foreground border-primary-foreground/50">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filter
        </Button>
      </div>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          >
            <ChevronLeft />
          </Button>
          <h2 className="text-lg font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          >
            <ChevronRight />
          </Button>
        </div>

        <div className="flex justify-center gap-2 rounded-md bg-card p-1">
          {['Month', 'Week', 'Day'].map((v) => (
            <Button
              key={v}
              variant={view === v ? 'default' : 'ghost'}
              className={cn("flex-1", view === v && "bg-primary-foreground text-primary hover:bg-primary-foreground/90")}
              onClick={() => setView(v)}
            >
              {v}
            </Button>
          ))}
        </div>

        <CalendarComponent
          month={currentDate}
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="p-0"
          classNames={{
            day_selected:
              'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
            day: 'h-10 w-10 relative',
          }}
          components={{
            DayContent: ({ date }) => {
              const events = calendarEvents.filter(
                (event) =>
                  format(new Date(event.date), 'yyyy-MM-dd') ===
                  format(date, 'yyyy-MM-dd')
              );
              return (
                <>
                  <span>{date.getDate()}</span>
                  {events.length > 0 && <EventDot type={events[0].type} />}
                </>
              );
            },
          }}
        />

        <div className="space-y-2">
            <h3 className="text-lg font-semibold">Today's Events</h3>
            {selectedDayEvents.length > 0 ? (
                selectedDayEvents.map(event => (
                    <Card key={event.id}>
                        <CardContent className="p-3">
                            <div className="flex items-start gap-4">
                                <div className="flex-1 space-y-1">
                                    <p className="font-semibold">{event.title}</p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Users className="h-4 w-4" />
                                        <span>{event.attendees.join(', ')}</span>
                                    </div>
                                </div>
                                <div className={cn("h-3 w-3 rounded-full mt-1", eventTypes[event.type])} />
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <p className="text-muted-foreground text-sm">No events for this day.</p>
            )}
        </div>
      </main>

       <div className="fixed bottom-20 right-4">
        <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
          <Plus className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
}
