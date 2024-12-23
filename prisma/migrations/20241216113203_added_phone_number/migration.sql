/*
  Warnings:

  - You are about to drop the column `phonenumber` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username,phone_number]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_username_phonenumber_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "phonenumber",
ADD COLUMN     "phone_number" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_username_phone_number_key" ON "user"("username", "phone_number");
