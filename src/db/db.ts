import { PrismaClient as PrismaClientType } from ".prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClientType();
};

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClientType | undefined;
}

const db = globalThis.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export default db;

// import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };

// declare global {
//   var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
// }

// const db = globalThis.prisma ?? prismaClientSingleton();

// export default db;

// if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };

// declare global {
//   var db: undefined | ReturnType<typeof prismaClientSingleton>;
// }

// const db = globalThis.db ?? prismaClientSingleton();

// export default db;

// if (process.env.NODE_ENV !== "production") globalThis.db = db;

// import "dotenv/config";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   try {
//     await prisma.$connect();
//     console.log("Database connected successfully");

//     // Fetch and print all users to verify the connection
//     const users = await prisma.user.findMany();
//     console.log(users);
//   } catch (error) {
//     console.error("Database connection error:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main();

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   // Check if connection works
//   const users = await prisma.user.findMany();
//   console.log(users);
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// async function main() {
//   try {
//     await prisma.$connect();
//     console.log("Database connected successfully");
//   } catch (e) {
//     console.error("Database connection error:", e);
//   } finally {
//     await prisma.$disconnect();
//   }
// }
// main();

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// async function main() {
//   try {
//     await prisma.$connect();
//     console.log("Database connected successfully");
//   } catch (e) {
//     console.error("Database connection error:", e);
//   } finally {
//     await prisma.$disconnect();
//   }
// }
// main();

// import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };

// declare global {
//   var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
// }

// const db = globalThis.prisma ?? prismaClientSingleton();

// export default db;

// if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };

// declare global {
//   var db: undefined | ReturnType<typeof prismaClientSingleton>;
// }

// const db = globalThis.db ?? prismaClientSingleton();

// export default db;

// if (process.env.NODE_ENV !== "production") globalThis.db = db;
