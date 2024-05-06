import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://utfs.io/f/5e655dae-fe6f-4d91-a5e5-373d10f7bcd1-odztoi.jpg",
  "https://utfs.io/f/5e655dae-fe6f-4d91-a5e5-373d10f7bcd1-odztoi.jpg",
  "https://utfs.io/f/5e655dae-fe6f-4d91-a5e5-373d10f7bcd1-odztoi.jpg",
  "https://utfs.io/f/5e655dae-fe6f-4d91-a5e5-373d10f7bcd1-odztoi.jpg",
];

const mockImgs = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[
          ...mockImgs,
          ...mockImgs,
          ...mockImgs,
          ...mockImgs,
          ...mockImgs,
          ...mockImgs,
        ].map((img, index) => (
          <div key={img.id + "-" + index} className="w-48">
            <img src={img.url} alt="image" />
          </div>
        ))}
      </div>
    </main>
  );
}
