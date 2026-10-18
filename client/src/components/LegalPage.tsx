import { useEffect } from "react";

export interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  intro: React.ReactNode;
  sections: LegalSection[];
}

export default function LegalPage({ title, lastUpdated, intro, sections }: LegalPageProps) {
  useEffect(() => {
    // Other pages don't set a title, so restore the site title when leaving
    const previousTitle = document.title;
    document.title = `${title} | Marlagos`;
    window.scrollTo(0, 0);
    return () => { document.title = previousTitle; };
  }, [title]);

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-2" data-testid="text-legal-title">{title}</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: {lastUpdated}</p>
        <div className="text-muted-foreground font-body mb-10 space-y-4">{intro}</div>

        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-semibold mb-3">{section.heading}</h2>
              <div className="text-muted-foreground font-body space-y-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_a]:text-primary [&_a]:underline">
                {section.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
