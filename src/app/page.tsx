import Link from "next/link";

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

export default function HomePage() {
  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {[
          ...mockImgs,
          ...mockImgs,
          ...mockImgs,
          ...mockImgs,
          ...mockImgs,
          ...mockImgs,
        ].map((img) => (
          <div key={img.id} className="w-48">
            <img src={img.url} alt="image" />
          </div>
        ))}
      </div>
    </main>
  );
}
