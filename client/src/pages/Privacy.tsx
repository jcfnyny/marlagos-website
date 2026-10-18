import LegalPage from "@/components/LegalPage";

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="18 October 2026"
      intro={
        <p>
          This policy explains what personal data Marlagos collects through this website, why we
          collect it and the rights you have over it under the EU General Data Protection
          Regulation (GDPR).
        </p>
      }
      sections={[
        {
          heading: "Who we are",
          body: (
            <p>
              Marlagos, Lagos, Algarve, Portugal 8600-315. For any privacy question or request,
              email <a href="mailto:hello@marlagos.com">hello@marlagos.com</a>.
            </p>
          ),
        },
        {
          heading: "What we collect",
          body: (
            <>
              <p>We only collect what you give us through the forms on this site:</p>
              <ul>
                <li><strong>Activity booking requests:</strong> your name, email, phone number (optional), chosen date, number of participants and any special requests.</li>
                <li><strong>Contact form:</strong> your name, email, phone number (optional), subject and message.</li>
                <li><strong>Newsletter:</strong> your email address.</li>
              </ul>
              <p>
                We do not take payments on this website, and we do not use analytics or
                advertising cookies.
              </p>
            </>
          ),
        },
        {
          heading: "Why we use it",
          body: (
            <ul>
              <li>To respond to your enquiry and to arrange and confirm the bookings you request (taking steps at your request before entering a contract).</li>
              <li>To send our newsletter, only if you subscribed (your consent). You can unsubscribe at any time.</li>
            </ul>
          ),
        },
        {
          heading: "Who we share it with",
          body: (
            <>
              <p>We do not sell your data. It is processed by the service providers that run this website:</p>
              <ul>
                <li><strong>Vercel</strong>, which hosts the website.</li>
                <li><strong>Neon</strong>, which hosts the database where form submissions are stored.</li>
              </ul>
              <p>
                Some pages load content directly from third parties, which receive your IP address
                when they do: Google Fonts (typefaces), OpenStreetMap and cdnjs (maps), and Airbnb
                (property photos and availability). Property bookings are completed on Airbnb under
                Airbnb's own privacy policy, and guest check-in links open CheckinScan. Links to
                Google Maps and Google Search open those services in a new tab.
              </p>
            </>
          ),
        },
        {
          heading: "How long we keep it",
          body: (
            <p>
              Enquiries and booking requests are kept for as long as needed to handle them and meet
              our legal and accounting obligations. Newsletter addresses are kept until you
              unsubscribe.
            </p>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <>
              <p>
                You can ask to access, correct or delete your data, to restrict or object to its use,
                to receive a copy of it, or to withdraw your consent at any time. Email{" "}
                <a href="mailto:hello@marlagos.com">hello@marlagos.com</a> and we will reply within
                one month.
              </p>
              <p>
                You can also complain to the Portuguese data protection authority, the Comissão
                Nacional de Proteção de Dados (<a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer">cnpd.pt</a>).
              </p>
            </>
          ),
        },
        {
          heading: "Changes to this policy",
          body: <p>If we change this policy we will update the date at the top of this page.</p>,
        },
      ]}
    />
  );
}
