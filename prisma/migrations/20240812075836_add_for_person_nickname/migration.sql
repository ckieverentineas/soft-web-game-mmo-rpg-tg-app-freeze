/*
  Warnings:

  - Added the required column `nickname` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Person" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "health" REAL NOT NULL,
    "strength" REAL NOT NULL,
    "dexterity" REAL NOT NULL,
    "intelligence" REAL NOT NULL,
    "stars" INTEGER NOT NULL,
    "crdate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_account" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Person_id_account_fkey" FOREIGN KEY ("id_account") REFERENCES "Account" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Person" ("class", "crdate", "dexterity", "health", "id", "id_account", "intelligence", "name", "stars", "strength", "update") SELECT "class", "crdate", "dexterity", "health", "id", "id_account", "intelligence", "name", "stars", "strength", "update" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
