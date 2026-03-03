/*
  Warnings:

  - You are about to drop the column `rating` on the `GameRating` table. All the data in the column will be lost.
  - Added the required column `gameplay` to the `GameRating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `story` to the `GameRating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub` to the `GameRating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `GameRating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tech` to the `GameRating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visual` to the `GameRating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameRating" DROP COLUMN "rating",
ADD COLUMN     "gameplay" INTEGER NOT NULL,
ADD COLUMN     "story" INTEGER NOT NULL,
ADD COLUMN     "sub" INTEGER NOT NULL,
ADD COLUMN     "summary" INTEGER NOT NULL,
ADD COLUMN     "tech" INTEGER NOT NULL,
ADD COLUMN     "visual" INTEGER NOT NULL;
