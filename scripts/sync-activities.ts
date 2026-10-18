// Syncs shared/activityCatalog.ts into the activities table.
// Runs during production builds on Vercel (see "vercel-build" in package.json).
// Rows are matched by title and updated in place, never deleted, because
// bookings reference activity ids.
import { eq } from "drizzle-orm";
import { pathToFileURL } from "node:url";
import { activityCatalog } from "../shared/activityCatalog.js";
import { activities } from "../shared/schema.js";

// Accepts any drizzle Postgres database so it can be tested without Neon
export async function syncActivities(db: any) {
  let updated = 0;
  let inserted = 0;
  for (const activity of activityCatalog) {
    const existing = await db.select({ id: activities.id }).from(activities)
      .where(eq(activities.title, activity.title));
    if (existing.length > 0) {
      await db.update(activities)
        .set({ ...activity, updatedAt: new Date() })
        .where(eq(activities.title, activity.title));
      updated++;
    } else {
      await db.insert(activities).values({ ...activity, rating: "0.0", reviewCount: 0 });
      inserted++;
    }
  }
  return { updated, inserted };
}

async function main() {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    console.log(`[sync-activities] Skipping: VERCEL_ENV is "${process.env.VERCEL_ENV}"`);
    return;
  }
  if (!process.env.DATABASE_URL) {
    console.warn("[sync-activities] WARNING: DATABASE_URL is not set at build time; activities were NOT synced.");
    return;
  }

  const { db, closeConnection } = await import("../lib/db.js");
  try {
    const { updated, inserted } = await syncActivities(db);
    console.log(`[sync-activities] Done: ${updated} updated, ${inserted} inserted.`);
  } finally {
    await closeConnection();
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error("[sync-activities] Failed:", error);
    process.exit(1);
  });
}
