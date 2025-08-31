/*
  Warnings:

  - You are about to drop the `Replies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Replies" DROP CONSTRAINT "Replies_cid_fkey";

-- DropForeignKey
ALTER TABLE "public"."Replies" DROP CONSTRAINT "Replies_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Comments" ADD COLUMN     "parentCid" INTEGER;

-- DropTable
DROP TABLE "public"."Replies";

-- AddForeignKey
ALTER TABLE "public"."Comments" ADD CONSTRAINT "Comments_parentCid_fkey" FOREIGN KEY ("parentCid") REFERENCES "public"."Comments"("cid") ON DELETE CASCADE ON UPDATE CASCADE;
