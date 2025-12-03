"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
try {
    var prisma = new client_1.PrismaClient();
    console.log('PrismaClient instantiated successfully');
}
catch (e) {
    console.error(e);
}
