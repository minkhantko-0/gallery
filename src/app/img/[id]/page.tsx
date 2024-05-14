import FullPageImageView from "~/components/full-image-page";

export default async function PhotoPage({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid Image ID!");

  return (
    <div className="h-[100%] ">
      <FullPageImageView id={idAsNumber} />
    </div>
  );
}
