import express from "express";

import usuarios_routes from "./routes/usuarios_routes.js";
import partidos_routes from "./routes/partidos_routes.js";
import equipos_routes from "./routes/equipos_routes.js";
import pronostico_routes from "./routes/pronostico_routes.js";
import cors from "cors"; // Importa CORS

const app = express();
app.use(cors({ origin: "http://localhost:8100" }));
app.use(express.json()); //interprete los objetos enviados como json

app.use("/api", usuarios_routes);
app.use("/api", partidos_routes);
app.use("/api", equipos_routes);
app.use("/api", pronostico_routes);

app.use((req, res, next) => {
  res.status(400).json({ message: "Pagina no encontrada" });
});

export default app;
