import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarDays, Clock } from "lucide-react";

interface Availability {
  id: number;
  propertyId: number;
  startDate: string;
  endDate: string;
  status: string;
  source: string;
  summary: string;
}

interface PropertyCalendarProps {
  propertyId: number;
  title?: string;
  className?: string;
}

export default function PropertyCalendar({ propertyId, title, className = "" }: PropertyCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>();

  // Calculate date range for current month view (with some padding)
  const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
  const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2, 0);

  const { data: availability = [], isLoading } = useQuery<Availability[]>({
    queryKey: [`/api/properties/${propertyId}/availability`, startDate.toISOString(), endDate.toISOString()],
    queryFn: async () => {
      const params = new URLSearchParams({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      });
      const response = await fetch(`/api/properties/${propertyId}/availability?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch availability');
      }
      return response.json();
    }
  });

  // Create a set of blocked dates for quick lookup
  const blockedDates = new Set<string>();
  const bookedDates = new Set<string>();

  availability.forEach((avail) => {
    const start = new Date(avail.startDate);
    const end = new Date(avail.endDate);
    
    // Add all dates in the range
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const dateStr = date.toISOString().split('T')[0];
      if (avail.status === 'blocked') {
        blockedDates.add(dateStr);
      } else if (avail.status === 'booked') {
        bookedDates.add(dateStr);
      }
    }
  });

  // Custom day renderer to show availability status
  const isDayBlocked = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return blockedDates.has(dateStr);
  };

  const isDayBooked = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookedDates.has(dateStr);
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0); // Normalize to start of day
    
    return !isDayBlocked(date) && !isDayBooked(date) && checkDate >= today;
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const getSelectedDateInfo = () => {
    if (!selectedDate) return null;
    
    const dateStr = selectedDate.toISOString().split('T')[0];
    const availability = [];
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    const checkDate = new Date(selectedDate);
    checkDate.setHours(0, 0, 0, 0); // Normalize to start of day
    
    if (blockedDates.has(dateStr)) {
      availability.push({ status: 'blocked', label: 'Not Available' });
    } else if (bookedDates.has(dateStr)) {
      availability.push({ status: 'booked', label: 'Booked' });
    } else if (checkDate >= today) {
      availability.push({ status: 'available', label: 'Available' });
    } else {
      availability.push({ status: 'past', label: 'Past Date' });
    }
    
    return availability;
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            {title || "Availability Calendar"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className} data-testid={`calendar-property-${propertyId}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          {title || "Availability Calendar"}
        </CardTitle>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-400 rounded"></div>
            <span>Not Available</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousMonth}
            data-testid="button-prev-month"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <h3 className="font-medium">
            {currentMonth.toLocaleDateString('en-US', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextMonth}
            data-testid="button-next-month"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Calendar */}
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          className="rounded-md border"
          modifiers={{
            blocked: (date) => isDayBlocked(date),
            booked: (date) => isDayBooked(date),
            available: (date) => isDateAvailable(date),
          }}
          modifiersStyles={{
            blocked: { backgroundColor: '#ef4444', color: 'white' },
            booked: { backgroundColor: '#f59e0b', color: 'white' },
            available: { backgroundColor: '#10b981', color: 'white' },
          }}
          data-testid="calendar-grid"
        />

        {/* Selected Date Info */}
        {selectedDate && (
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4" />
              <span className="font-medium">
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {getSelectedDateInfo()?.map((info, index) => (
                <Badge
                  key={index}
                  variant={info.status === 'available' ? 'default' : 'secondary'}
                  data-testid={`badge-status-${info.status}`}
                >
                  {info.label}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Summary Stats */}
        <div className="text-sm text-muted-foreground text-center">
          Showing {availability.length} booking periods from Airbnb calendar
        </div>
      </CardContent>
    </Card>
  );
}