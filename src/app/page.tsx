import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.image.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {[...images, ...images, ...images].map((img, index) => (
          <div key={img.id + "-" + index} className="flex w-48 flex-col">
            <img src={img.url} alt="image" />
            <div>{img.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
