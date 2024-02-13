import { PrismaClient } from "@prisma/client"

const _globalThis = globalThis as unknown as {
  prisma?: PrismaClient
}

const _client = _globalThis.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  _globalThis.prisma = _client
}

/**
 * PrismaのORM
 */
export const database = _client

export type * from "@prisma/client"
