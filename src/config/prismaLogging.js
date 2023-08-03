// prismaLogging.js
const { createPrismaQueryEventHandler } = require('prisma-query-log');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ log: [{ level: 'query', emit: 'event' }] });
const log = createPrismaQueryEventHandler();

prisma.$on('query', log);

module.exports = prisma;
