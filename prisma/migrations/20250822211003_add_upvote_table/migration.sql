/*
  Warnings:

  - You are about to drop the column `upvotes` on the `Comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Comments" DROP COLUMN "upvotes";

-- CreateTable
CREATE TABLE "public"."Upvotes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "cid" INTEGER NOT NULL,

    CONSTRAINT "Upvotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Upvotes" ADD CONSTRAINT "Upvotes_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Comments"("cid") ON DELETE CASCADE ON UPDATE CASCADE;
