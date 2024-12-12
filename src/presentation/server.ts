import express, { Router } from "express";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pensum Service",
      version: "1.0.0",
    },
  },
  apis: ["./src/presentation/**/*.ts"],
};

const swaggerSpecification = swaggerJSDoc(swaggerOptions);

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;
  private serverListener?: any;

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.get("/api-docs", swaggerUi.setup(swaggerSpecification));
    this.app.use("/api-docs", swaggerUi.serve);

    this.app.use(this.routes);

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
