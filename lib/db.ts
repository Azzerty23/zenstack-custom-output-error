import { PrismaPg } from "@prisma/adapter-pg";
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

const prisma = getDb({ connectionString: env.DIRECT_URL });
export default prisma;
