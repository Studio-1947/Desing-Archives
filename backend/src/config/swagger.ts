import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Design Archives API",
      version: "1.0.0",
      description: "API documentation for the Design Archives backend",
      contact: {
        name: "Developer",
        url: "https://github.com/soumi-codes/Desing-Archives",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
      {
        url: "https://desing-archives-iuwo.vercel.app",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./src/routes/*.ts", 
    "./src/routes/*.js", 
    "./dist/routes/*.js", 
    "./src/app.ts", 
    "./src/app.js",
    "./dist/app.js"
  ], // files containing annotations
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Design Archives API Docs"
  }));
  
  // Also provide the swagger JSON
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });

  console.log("Swagger docs available at http://localhost:5000/api-docs");
};
