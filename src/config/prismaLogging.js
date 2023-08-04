import { createPrismaQueryEventHandler } from 'prisma-query-log';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: [{ level: 'query', emit: 'event' }] });
const log = createPrismaQueryEventHandler();

prisma.$on('query', log);

export default prisma;