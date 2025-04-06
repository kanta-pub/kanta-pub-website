import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();


export const ourFileRouter={
    bookImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(() => {}),
    productImage:f({ image: { maxFileSize: "16MB", maxFileCount: 1 } })
    .onUploadComplete(() => {}),
    userImage:f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(() => {}),
    customerImage:f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(() => {}),
    bookPDF:f(["pdf"])
    .onUploadComplete(() => {}),
    eventsPdf:f(["pdf"])
    .onUploadComplete(() => {})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter