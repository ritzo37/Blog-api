/*
  Warnings:

  - You are about to drop the column `downvotes` on the `Comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Comments" DROP COLUMN "downvotes";

-- CreateTable
CREATE TABLE "public"."Downvotes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "cid" INTEGER NOT NULL,

    CONSTRAINT "Downvotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Downvotes" ADD CONSTRAINT "Downvotes_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Comments"("cid") ON DELETE CASCADE ON UPDATE CASCADE;
