// import { PrismaClient as PrismaClientType } from ".prisma/client";

// const prismaClientSingleton = () => {
//   return new PrismaClientType();
// };

// declare global {
//   var prisma: PrismaClientType | undefined;
// }

// const db = globalThis.prisma || prismaClientSingleton();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// export default db;

// @note

import { PrismaClient } from ".prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = globalThis.prisma ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// @note

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

// @note

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

// @note

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
