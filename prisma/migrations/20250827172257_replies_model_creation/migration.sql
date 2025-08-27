-- CreateTable
CREATE TABLE "public"."Replies" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "cid" INTEGER NOT NULL,

    CONSTRAINT "Replies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Replies" ADD CONSTRAINT "Replies_cid_fkey" FOREIGN KEY ("cid") REFERENCES "public"."Comments"("cid") ON DELETE CASCADE ON UPDATE CASCADE;
