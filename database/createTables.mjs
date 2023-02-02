import client from './client.mjs';
import dbConnect from './dbConnect.mjs';
dbConnect();
const table = `CREATE TABLE "Login"(
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "Login" ADD PRIMARY KEY("id");
CREATE TABLE "userTable"(
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "secondName" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "postCode" INTEGER NOT NULL,
    "phone" INTEGER NOT NULL,
    "chefTable_id" INTEGER NULL,
    "login_id" BIGINT NOT NULL,
    "userOrders_id" BIGINT NULL
);
ALTER TABLE
    "userTable" ADD PRIMARY KEY("id");
CREATE TABLE "chefTable"(
    "id" SERIAL NOT NULL,
    "aboutMe" VARCHAR(255) NOT NULL,
    "cuisineType" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NULL,
    "postCode" BIGINT NOT NULL,
    "chefPhoto" VARCHAR(255) NULL
);
ALTER TABLE
    "chefTable" ADD PRIMARY KEY("id");
COMMENT
ON COLUMN
    "chefTable"."postCode" IS 'post code that can be delivered or near by the chef for filter purpose';
CREATE TABLE "cuisineType"(
    "id" SERIAL NOT NULL,
    "cuisineType" VARCHAR(255) NOT NULL,
    "photo" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "cuisineType" ADD PRIMARY KEY("id");
CREATE TABLE "cuisineInter"(
    "id" SERIAL NOT NULL,
    "chefTable_id" BIGINT NOT NULL,
    "cuisineType_id" BIGINT NOT NULL
);
ALTER TABLE
    "cuisineInter" ADD PRIMARY KEY("id");
CREATE TABLE "menuDetails"(
    "id" SERIAL NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "menuName" VARCHAR(255) NOT NULL,
    "date" VARCHAR(255) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "userOrder_rating" DOUBLE PRECISION NULL,
    "chefTable_id" BIGINT NOT NULL,
    "photoUrl" VARCHAR(255) NULL
);
ALTER TABLE
    "menuDetails" ADD PRIMARY KEY("id");
CREATE TABLE "userOrders"(
    "id" SERIAL NOT NULL,
    "menuDetails_id" INTEGER NOT NULL,
    "date" DATE NULL,
    "rating" DOUBLE PRECISION  NULL,
    "totalPrice" BIGINT NOT NULL,
    "userTable_id" BIGINT NOT NULL
);
ALTER TABLE
    "userOrders" ADD PRIMARY KEY("id");
ALTER TABLE
    "userTable" ADD CONSTRAINT "usertable_login_id_foreign" FOREIGN KEY("login_id") REFERENCES "Login"("id");
ALTER TABLE
    "userOrders" ADD CONSTRAINT "userorders_usertable_id_foreign" FOREIGN KEY("userTable_id") REFERENCES "userTable"("id");
ALTER TABLE
    "userTable" ADD CONSTRAINT "usertable_cheftable_id_foreign" FOREIGN KEY("chefTable_id") REFERENCES "chefTable"("id");
ALTER TABLE
    "cuisineInter" ADD CONSTRAINT "cuisineinter_cheftable_id_foreign" FOREIGN KEY("chefTable_id") REFERENCES "chefTable"("id");
ALTER TABLE
    "menuDetails" ADD CONSTRAINT "menudetails_cheftable_id_foreign" FOREIGN KEY("chefTable_id") REFERENCES "chefTable"("id");
ALTER TABLE
    "cuisineInter" ADD CONSTRAINT "cuisineinter_cuisinetype_id_foreign" FOREIGN KEY("cuisineType_id") REFERENCES "cuisineType"("id");
ALTER TABLE
    "userOrders" ADD CONSTRAINT "userorders_menudetails_id_foreign" FOREIGN KEY("menuDetails_id") REFERENCES "menuDetails"("id");`
client.query(table, (err, results) => {
        if (err) {
            console.log("something went wrong" + err);
            return;
        }
        console.log("Table was created successfully");
        client.end();
    });