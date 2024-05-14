import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { image } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { analyticServerClient } from "./analytics";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) {
    throw new Error("Unauthorized");
  }

  const images = await db.query.image.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}

export async function getImage(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const img = await db.query.image.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!img) throw new Error("Image not found!");

  if (img.userId !== user.userId) throw new Error("Unauthorized");

  return img;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const img = await db.query.image.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!img) throw new Error("Image not found");

  if (img.userId !== user.userId) throw new Error("Unauthorized");

  await db
    .delete(image)
    .where(and(eq(image.id, id), eq(image.userId, user.userId)));

  analyticServerClient.capture({
    distinctId: user.userId,
    event: "delete image",
    properties: { imageId: id },
  });

  redirect("/");
}
