import LegalPage from "@/components/LegalPage";
import { Link } from "wouter";

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="18 October 2026"
      intro={
        <p>
          These terms apply to your use of the Marlagos website. By using the site or sending us a
          booking request, you agree to them.
        </p>
      }
      sections={[
        {
          heading: "Property bookings",
          body: (
            <p>
              Our properties are booked through Airbnb. When you book a stay, your reservation,
              payment and cancellation are governed by Airbnb's terms and the listing's house rules
              and cancellation policy shown on Airbnb.
            </p>
          ),
        },
        {
          heading: "Activity booking requests",
          body: (
            <>
              <p>
                Booking an activity on this site sends us a request; it is not a confirmed booking.
                We will contact you to confirm availability, the final price and payment details.
                Your booking is confirmed only once we confirm it to you in writing.
              </p>
              <p>
                Activities depend on weather and sea conditions and may be rescheduled or cancelled
                for safety. Cancellation terms for each activity will be given when we confirm your
                booking.
              </p>
            </>
          ),
        },
        {
          heading: "Prices and information",
          body: (
            <p>
              Prices, durations and other details on this site are a guide and may change. We work
              to keep information accurate and up to date, but the details we confirm to you in
              writing take precedence over what is shown on the site.
            </p>
          ),
        },
        {
          heading: "Your responsibilities",
          body: (
            <p>
              Please give accurate contact details when you send a request, and tell us about any
              health condition or limitation relevant to the activities you book. Follow your
              guide's safety instructions during activities.
            </p>
          ),
        },
        {
          heading: "Third-party websites",
          body: (
            <p>
              This site links to other services such as Airbnb, Google Maps and CheckinScan. We are
              not responsible for their content or practices, which are governed by their own terms.
            </p>
          ),
        },
        {
          heading: "Content",
          body: (
            <p>
              The text and images on this website belong to Marlagos or are used with permission.
              Please do not copy them for commercial use without asking us first.
            </p>
          ),
        },
        {
          heading: "Privacy",
          body: (
            <p>
              How we handle your personal data is explained in our{" "}
              <Link href="/privacy">Privacy Policy</Link>.
            </p>
          ),
        },
        {
          heading: "Governing law and contact",
          body: (
            <p>
              These terms are governed by Portuguese law, without affecting any mandatory rights you
              have as a consumer under the law of your country. Questions? Email{" "}
              <a href="mailto:hello@marlagos.com">hello@marlagos.com</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
