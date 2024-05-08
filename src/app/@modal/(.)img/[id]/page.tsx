import { getImage } from "~/server/queries";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const image = await getImage(Number(photoId));

  return (
    <div>
      <img src={image.url} alt={image.name} className="w-96" />
    </div>
  );
}
