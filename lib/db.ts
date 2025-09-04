import { PrismaPg } from "@prisma/adapter-pg";
import { enhance } from "@zenstackhq/runtime";
import { env } from "./env/server";
import { PrismaClient } from "./generated/prisma/client";

export type GetDbParams = {
	connectionString: string;
};

export function getDb({ connectionString }: GetDbParams) {
	const pool = new PrismaPg({ connectionString });
	const prisma = new PrismaClient({ adapter: pool });

	return prisma;
}

export const prisma = getDb({ connectionString: env.DIRECT_URL });
export const enhancedPrisma = enhance(prisma, { user: undefined });
