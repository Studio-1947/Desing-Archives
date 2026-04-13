import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";

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
    path.join(process.cwd(), "src/routes/*.ts"),
    path.join(process.cwd(), "src/routes/*.js"),
    path.join(process.cwd(), "dist/routes/*.js"),
    path.join(process.cwd(), "src/app.ts"),
    path.join(process.cwd(), "dist/app.js"),
    path.join(process.cwd(), "app.js"),
    path.join(process.cwd(), "index.js"),
  ],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  // Use CDN for Swagger UI assets to work reliably on Vercel
  const SWAGGER_UI_VERSION = "5.11.0";
  const CSS_URL = `https://cdn.jsdelivr.net/npm/swagger-ui-dist@${SWAGGER_UI_VERSION}/swagger-ui.css`;
  const JS_URLS = [
    `https://cdn.jsdelivr.net/npm/swagger-ui-dist@${SWAGGER_UI_VERSION}/swagger-ui-bundle.js`,
    `https://cdn.jsdelivr.net/npm/swagger-ui-dist@${SWAGGER_UI_VERSION}/swagger-ui-standalone-preset.js`
  ];

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Design Archives API Docs",
    customCssUrl: CSS_URL,
    customJs: JS_URLS,
    swaggerOptions: {
      persistAuthorization: true,
    }
  }));
  
  // Also provide the swagger JSON
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });

  console.log("Swagger docs setup complete");
};
