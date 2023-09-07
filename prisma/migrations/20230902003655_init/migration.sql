/*
  Warnings:

  - The `privilege` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'USER', 'GUEST');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "privilege",
ADD COLUMN     "privilege" "Role" NOT NULL DEFAULT 'USER';
