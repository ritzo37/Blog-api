-- DropForeignKey
ALTER TABLE "public"."Downvotes" DROP CONSTRAINT "Downvotes_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Upvotes" DROP CONSTRAINT "Upvotes_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."Upvotes" ADD CONSTRAINT "Upvotes_cid_fkey" FOREIGN KEY ("cid") REFERENCES "public"."Comments"("cid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Downvotes" ADD CONSTRAINT "Downvotes_cid_fkey" FOREIGN KEY ("cid") REFERENCES "public"."Comments"("cid") ON DELETE CASCADE ON UPDATE CASCADE;
