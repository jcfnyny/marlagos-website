import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import HeroSection from "@/components/HeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Calendar, Key, ExternalLink, CheckCircle, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import hero image
import guestsHeroImage from "@assets/generated_images/Lagos_historic_town_center_d4804067.png";

const checkInSchema = z.object({
  checkInDate: z.string().min(1, "Check-in date is required"),
  checkInCode: z.string()
    .min(6, "Check-in code must be at least 6 characters")
    .max(20, "Check-in code must be no more than 20 characters")
    .regex(/^[A-Za-z0-9]+$/, "Check-in code must contain only letters and numbers")
});

type CheckInFormData = z.infer<typeof checkInSchema>;

export default function Guests() {
  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [isLinkGenerated, setIsLinkGenerated] = useState(false);
  const { toast } = useToast();

  const form = useForm<CheckInFormData>({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      checkInDate: "",
      checkInCode: ""
    }
  });

  const onSubmit = (data: CheckInFormData) => {
    try {
      // Validate check-in date is not in the past (handle local timezone correctly)
      const [year, month, day] = data.checkInDate.split('-').map(Number);
      const selectedDate = new Date(year, month - 1, day); // Parse in local time
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        toast({
          title: "Invalid Date",
          description: "Check-in date cannot be in the past.",
          variant: "destructive"
        });
        return;
      }

      // Generate the checkinscan.com link
      const checkInLink = `https://app.checkinscan.com/booking/${data.checkInCode.toUpperCase()}/instructions`;
      setGeneratedLink(checkInLink);
      setIsLinkGenerated(true);

      toast({
        title: "Check-in Link Generated!",
        description: "Your automatic check-in link has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate check-in link. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleOpenCheckIn = () => {
    if (generatedLink) {
      window.open(generatedLink, '_blank');
    }
  };

  const handleReset = () => {
    form.reset();
    setGeneratedLink("");
    setIsLinkGenerated(false);
  };

  // Get today's date in YYYY-MM-DD format for the min attribute (local time)
  const today = (() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  })();

  return (
    <>
      <HeroSection
        title="Guest Check-In"
        subtitle="Easy automatic check-in for your Lagos accommodation"
        backgroundImage={guestsHeroImage}
        height="medium"
      />

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="text-checkin-title">
              Automatic Check-In Service
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-body" data-testid="text-checkin-description">
              Welcome to your Lagos accommodation! Use your Airbnb reservation details to generate 
              an automatic check-in link for a seamless arrival experience.
            </p>
          </div>

          {/* Check-in Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Card */}
            <Card className="hover-elevate transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  Check-In Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="checkInDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Check-in Date
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              min={today}
                              {...field}
                              data-testid="input-checkin-date"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="checkInCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Airbnb Check-in Code
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your 6-20 character code"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                              data-testid="input-checkin-code"
                            />
                          </FormControl>
                          <FormMessage />
                          <p className="text-sm text-muted-foreground">
                            This code is provided in your Airbnb reservation confirmation
                          </p>
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-4">
                      <Button 
                        type="submit" 
                        className="flex-1"
                        disabled={form.formState.isSubmitting}
                        data-testid="button-generate-link"
                      >
                        {form.formState.isSubmitting ? "Generating..." : "Generate Check-in Link"}
                      </Button>
                      {isLinkGenerated && (
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={handleReset}
                          data-testid="button-reset-form"
                        >
                          Reset
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Result Card */}
            <Card className={`transition-all duration-300 ${isLinkGenerated ? 'ring-2 ring-success/20 bg-success/5' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-primary" />
                  Check-in Link
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLinkGenerated ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-3 bg-success/10 rounded-md">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span className="text-sm font-medium text-success">
                        Check-in link generated successfully!
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Your Check-in Link:</Label>
                      <div className="p-3 bg-muted rounded-md break-all text-sm font-mono" data-testid="text-generated-link">
                        {generatedLink}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button 
                        onClick={handleOpenCheckIn}
                        className="w-full"
                        data-testid="button-open-checkin"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Check-in Instructions
                      </Button>
                      
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>• Click the button above to complete your check-in</p>
                        <p>• The link will open the secure check-in portal</p>
                        <p>• Follow the instructions provided by the portal</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 text-center py-8">
                    <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <Key className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-muted-foreground">No Link Generated</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Enter your check-in details to generate your automatic check-in link
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Information Section */}
          <div className="mt-16 bg-muted/30 rounded-lg p-8">
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4" data-testid="text-info-title">
                How Automatic Check-In Works
              </h3>
              <p className="text-muted-foreground mb-6 font-body" data-testid="text-info-description">
                Our automatic check-in service streamlines your arrival process, making it easy 
                to access your Lagos accommodation without the need for manual key collection.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <Calendar className="h-8 w-8 mx-auto text-primary" />
                  <h4 className="font-semibold">1. Enter Details</h4>
                  <p className="text-sm text-muted-foreground font-body">
                    Provide your check-in date and Airbnb reservation code
                  </p>
                </div>
                <div className="space-y-2">
                  <Shield className="h-8 w-8 mx-auto text-primary" />
                  <h4 className="font-semibold">2. Secure Link</h4>
                  <p className="text-sm text-muted-foreground font-body">
                    Generate a secure link to the check-in portal
                  </p>
                </div>
                <div className="space-y-2">
                  <ExternalLink className="h-8 w-8 mx-auto text-primary" />
                  <h4 className="font-semibold">3. Easy Access</h4>
                  <p className="text-sm text-muted-foreground font-body">
                    Follow the instructions for seamless property access
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Security & Privacy
                </h4>
                <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <p>• Your check-in code is only used to generate the secure portal link</p>
                  <p>• No personal information is stored on our servers</p>
                  <p>• The link directs you to the official check-in service provider</p>
                  <p>• Only use codes provided in your official Airbnb reservation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}