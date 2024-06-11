import { PrismaClient } from "@prisma/client";

let prisma:PrismaClient;

prisma = new PrismaClient;

const globalFormPrisma = global as unknown as {
    prisma:PrismaClient | undefined;
}

if(!globalFormPrisma.prisma){
    globalFormPrisma.prisma = new PrismaClient();
}

prisma = globalFormPrisma.prisma;

export default prisma;