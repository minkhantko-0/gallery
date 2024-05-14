import { clerkClient } from "@clerk/nextjs/server";
import { deleteImage, getImage } from "~/server/queries";
import { Button } from "./ui/button";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex w-[75%] flex-shrink items-center justify-center">
        <img
          src={image.url}
          alt={image.name}
          className="max-h-[75%] w-[80%] flex-shrink object-contain"
        />
      </div>

      <div className="flex w-48 flex-shrink-0 flex-col border-l">
        <div className="p-2 text-xl font-bold">{image.name}</div>

        <div className="flex flex-col p-2">
          <span>Uploaded By:</span>
          <span>{uploaderInfo.fullName}</span>
        </div>

        <div className="flex flex-col p-2">
          <span>Created On:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="px-2 py-4">
          <form
            action={async () => {
              "use server";

              await deleteImage(props.id);
            }}
          >
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
