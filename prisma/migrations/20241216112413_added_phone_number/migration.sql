/*
  Warnings:

  - A unique constraint covering the columns `[username,phonenumber]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "phonenumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_username_phonenumber_key" ON "user"("username", "phonenumber");
