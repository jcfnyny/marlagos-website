import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Users, Clock, MapPin } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const bookingSchema = z.object({
  guestName: z.string().min(2, "Name must be at least 2 characters"),
  guestEmail: z.string().email("Please enter a valid email address"),
  guestPhone: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  activityDate: z.string().optional(),
  participants: z.number().min(1, "At least 1 participant required").default(1),
  specialRequests: z.string().optional()
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "property" | "activity";
  item: {
    id: string | number;
    title: string;
    price: string;
    location: string;
    guests?: number;
    maxParticipants?: number;
    image?: string;
    images?: string[];
  } | null;
}

export default function BookingModal({ isOpen, onClose, type, item }: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      checkIn: "",
      checkOut: "",
      activityDate: "",
      participants: 1,
      specialRequests: ""
    }
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      if (!item) {
        throw new Error("No item selected for booking");
      }
      
      const bookingData = {
        type,
        [`${type}Id`]: item.id,
        ...data,
        totalAmount: (parseFloat(item.price) * data.participants).toString(),
        currency: "€"
      };
      
      return apiRequest("POST", "/api/bookings", bookingData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Booking Request Submitted!",
        description: "We'll contact you shortly to confirm your booking details."
      });
      onClose();
      form.reset();
    },
    onError: (error) => {
      console.error("Booking error:", error);
      toast({
        title: "Booking Failed",
        description: "There was an error submitting your booking. Please try again.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      await bookingMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const maxParticipants = type === "property" ? item?.guests : item?.maxParticipants;
  const totalPrice = item ? parseFloat(item.price) * (form.watch("participants") || 1) : 0;

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Handle loading state if item is null
  if (!item) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Loading...</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">Please wait while we load the booking details...</p>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Book {type === "property" ? "Stay" : "Activity"}
          </DialogTitle>
        </DialogHeader>

        {/* Item Details */}
        {item && (
          <div className="bg-muted/30 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2" data-testid={`text-booking-title`}>
              {item.title}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm space-x-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{item.location}</span>
              </div>
              {maxParticipants && (
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>Max {maxParticipants}</span>
                </div>
              )}
            </div>
            <div className="mt-2 text-lg font-semibold text-primary">
              €{item.price} / {type === "property" ? "night" : "person"}
            </div>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Guest Information */}
            <div className="space-y-4">
              <h4 className="font-medium">Guest Information</h4>
              
              <FormField
                control={form.control}
                name="guestName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input {...field} data-testid="input-guest-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="guestEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} data-testid="input-guest-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="guestPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} data-testid="input-guest-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Booking Details */}
            <div className="space-y-4">
              <h4 className="font-medium">
                {type === "property" ? "Stay Details" : "Activity Details"}
              </h4>

              {type === "property" ? (
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="checkIn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Check-in Date *</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            min={getTodayDate()}
                            {...field} 
                            data-testid="input-checkin" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="checkOut"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Check-out Date *</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            min={getTomorrowDate()}
                            {...field} 
                            data-testid="input-checkout" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="activityDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Date *</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          min={getTodayDate()}
                          {...field} 
                          data-testid="input-activity-date" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="participants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {type === "property" ? "Guests" : "Participants"} *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={1}
                        max={maxParticipants}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        data-testid="input-participants" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Special Requests */}
            <FormField
              control={form.control}
              name="specialRequests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requests (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Any special requirements or requests..."
                      data-testid="textarea-special-requests" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Total Price */}
            {item && (
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Price:</span>
                  <span className="text-xl font-bold text-primary" data-testid="text-total-price">
                    €{totalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {form.watch("participants")} {type === "property" ? "guests" : "participants"} × €{item.price}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="flex-1"
                data-testid="button-cancel-booking"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1"
                data-testid="button-submit-booking"
              >
                {isSubmitting ? "Booking..." : "Book Now"}
              </Button>
            </div>
          </form>
        </Form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          By submitting this booking, you agree to our terms and conditions. 
          We'll contact you to confirm availability and payment details.
        </p>
      </DialogContent>
    </Dialog>
  );
}