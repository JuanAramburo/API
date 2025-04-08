import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import brothersDB from "../modules/proyecto.js"; // Cambiado para usar proyecto.js
import { url } from "inspector";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

// Ruta para mostrar todas las pizzas
router.get("/", async (req, res) => {
    try {
        const pizzas = await brothersDB.mostrarPizzas();
        res.json(pizzas);
    } catch (error) {
        res.status(500).json({ error: "Error al mostrar las pizzas" });
    }
});

// Ruta para mostrar la página de administrador
router.get("/admin", async (req, res) => {
    try {
        // Obtén los datos necesarios desde la base de datos
        const pizzas = await brothersDB.mostrarPizzas();
        const especialidades = await brothersDB.mostrarEspecialidad(); // Aquí puedes agregar lógica para obtener especialidades
        const adicionales = await brothersDB.mostrarAdicional(); // Aquí puedes agregar lógica para obtener adicionales
        const bebidas = await brothersDB.mostrarBebida(); // Aquí puedes agregar lógica para obtener bebidas

        // Renderiza la vista administrador.ejs y pasa los datos
        res.render("administrador", { pizzas, especialidades, adicionales, bebidas });
    } catch (error) {
        console.error("Error al cargar la página de administrador:", error);
        res.status(500).send("Error al cargar la página de administrador");
    }
});

// Ruta para buscar una pizza por ID
router.get("/pizzas/:id", async (req, res) => {
    try {
        const pizza = await brothersDB.buscarPorIdPizzas(req.params.id);
        if (pizza.length > 0) {
            res.json(pizza[0]); // Devuelve solo el primer resultado
        } else {
            res.status(404).json({ error: "Pizza no encontrada" });
        }
    } catch (error) {
        console.error("Error al buscar la pizza por ID:", error);
        res.status(500).json({ error: "Error al buscar la pizza" });
    }
});

router.get("/especialidades/:id", async (req, res) => {
    try {
        const especialidad = await brothersDB.buscarPorIdEspecialidad(req.params.id);
        if (especialidad.length > 0) {
            res.json(especialidad[0]); // Devuelve solo el primer resultado
        } else {
            res.status(404).json({ error: "Especialidad no encontrada" });
        }
    } catch (error) {
        console.error("Error al buscar la especialidad por ID:", error);
        res.status(500).json({ error: "Error al buscar la especialidad" });
    }
});

router.get("/adicionales/:id", async (req, res) => {
    try {
        const adicional = await brothersDB.buscarPorIdAdicionales(req.params.id);
        if (adicional.length > 0) {
            res.json(adicional[0]); // Devuelve solo el primer resultado
        } else {
            res.status(404).json({ error: "Adicional no encontrado" });
        }
    } catch (error) {
        console.error("Error al buscar el adicional por ID:", error);
        res.status(500).json({ error: "Error al buscar el adicional" });
    }
});

router.get("/bebidas/:id", async (req, res) => {
    try {
        const bebida = await brothersDB.buscarPorIdBebidas(req.params.id);
        if (bebida.length > 0) {
            res.json(bebida[0]); // Devuelve solo el primer resultado
        } else {
            res.status(404).json({ error: "Bebida no encontrada" });
        }
    } catch (error) {
        console.error("Error al buscar la bebida por ID:", error);
        res.status(500).json({ error: "Error al buscar la bebida" });
    }
});

router.post("/pizzas", async (req, res) => {
    try {
        const nuevaPizza = req.body;

        // Validación adicional en el servidor
        if (!nuevaPizza.idPizzas || !nuevaPizza.tamaños || !nuevaPizza.uno || !nuevaPizza.dos || !nuevaPizza.cinco) {
            return res.status(400).json({ error: "Todos los campos son requeridos." });
        }

        console.log("Datos recibidos para insertar:", nuevaPizza);
        const id = await brothersDB.insertarPizza(nuevaPizza);
        res.status(201).json({ id, message: "Pizza agregada correctamente." });
    } catch (error) {
        console.error("Error al agregar la pizza:", error);
        res.status(500).json({ error: error.message || "Error al agregar la pizza." });
    }
});

router.post("/especialidades", async (req, res) => {
    try {
        const nuevaEspecialidad = req.body;

        console.log("Body recibido:", nuevaEspecialidad);

        // Validación adicional en el servidor
        if (!nuevaEspecialidad.idEspecialidad || !nuevaEspecialidad.especialidad || !nuevaEspecialidad.ingredientes || !nuevaEspecialidad.urlimg) {
            return res.status(400).json({ error: "Todos los campos son requeridos." });
        }

        console.log("Datos recibidos para insertar:", nuevaEspecialidad);
        const id = await brothersDB.insertarEspecialidad(nuevaEspecialidad);
        res.status(201).json({ id, message: "Especialidad agregada correctamente." });
    } catch (error) {
        console.error("Error al agregar la pizza:", error);
        res.status(500).json({ error: error.message || "Error al agregar la pizza." });
    }
});

router.post("/adicionales", async (req, res) => {
    try {
        const nuevaAdicional = req.body;

        // Validación adicional en el servidor
        if (!nuevaAdicional.idAdicional || !nuevaAdicional.adicional || !nuevaAdicional.precio || !nuevaAdicional.urlimag) {
            return res.status(400).json({ error: "Todos los campos son requeridos." });
        }

        console.log("Datos recibidos para insertar:", nuevaAdicional);
        const id = await brothersDB.insertarAdicional(nuevaAdicional);
        res.status(201).json({ id, message: "Adicional agregado correctamente." });
    } catch (error) {
        console.error("Error al agregar la pizza:", error);
        res.status(500).json({ error: error.message || "Error al agregar la pizza." });
    }
});

router.post("/bebidas", async (req, res) => {
    try {
        const nuevaBebida = req.body;

        // Validación adicional en el servidor
        if (!nuevaBebida.idBebida || !nuevaBebida.bebida || !nuevaBebida.precio) {
            return res.status(400).json({ error: "Todos los campos son requeridos." });
        }

        console.log("Datos recibidos para insertar:", nuevaBebida);
        const id = await brothersDB.insertarBebida(nuevaBebida);
        res.status(201).json({ id, message: "Bebida agregada correctamente." });
    } catch (error) {
        console.error("Error al agregar la bebida:", error);
        res.status(500).json({ error: error.message || "Error al agregar la bebida." });
    }
});

// Ruta para actualizar una pizza por ID
router.put("/pizzas/:id", async (req, res) => {
    try {
        const id = req.params.id; // ID de la pizza a actualizar
        const { tamaños, uno, dos, cinco } = req.body; // Datos a actualizar

        // Validar que todos los campos estén presentes
        if (!tamaños || !uno || !dos || !cinco) {
            return res.status(400).json({ error: "Todos los campos son requeridos para actualizar la pizza." });
        }

        const datosActualizados = { tamaños, uno, dos, cinco };
        console.log("Datos para actualizar:", datosActualizados); // Depuración

        // Llamar a la función de actualización en la base de datos
        const resultado = await brothersDB.actualizarPorIdPizza(id, datosActualizados);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Pizza no encontrada." });
        }

        res.json({ message: "Pizza actualizada correctamente." });
    } catch (error) {
        console.error("Error al actualizar la pizza:", error);
        res.status(500).json({ error: "Error al actualizar la pizza." });
    }
});

router.put("/especialidades/:id", async (req, res) => {
    try {
        const id = req.params.id; // ID de la pizza a actualizar
        const { especialidad, ingredientes, urlimg} = req.body; // Datos a actualizar

        // Validar que todos los campos estén presentes
        if (!especialidad || !ingredientes || !urlimg) {
            return res.status(400).json({ error: "Todos los campos son requeridos para actualizar la pizza." });
        }

        const datosActualizados = { especialidad, ingredientes, urlimg };
        console.log("Datos para actualizar:", datosActualizados); // Depuración

        // Llamar a la función de actualización en la base de datos
        const resultado = await brothersDB.actualizarPorIdEsp(id, datosActualizados);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Especialidad no encontrada." });
        }

        res.json({ message: "Especialidad actualizada correctamente." });
    } catch (error) {
        console.error("Error al actualizar la especialidad:", error);
        res.status(500).json({ error: "Error al actualizar la especialidad." });
    }
});

router.put("/adicionales/:id", async (req, res) => {
    try {
        const id = req.params.id; // ID de la pizza a actualizar
        const { adicional, precio, urlimag} = req.body; // Datos a actualizar

        // Validar que todos los campos estén presentes
        if (!adicional || !precio || !urlimag) {
            return res.status(400).json({ error: "Todos los campos son requeridos para actualizar la pizza." });
        }

        const datosActualizados = { adicional, precio, urlimag };
        console.log("Datos para actualizar:", datosActualizados); // Depuración

        // Llamar a la función de actualización en la base de datos
        const resultado = await brothersDB.actualizarPorIdAdi(id, datosActualizados);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Adicional no encontrado." });
        }

        res.json({ message: "Adicional actualizado correctamente." });
    } catch (error) {
        console.error("Error al actualizar el adicional:", error);
        res.status(500).json({ error: "Error al actualizar el adicional." });
    }
});

router.put("/bebidas/:id", async (req, res) => {
    try {
        const id = req.params.id; // ID de la pizza a actualizar
        const { bebida, precio} = req.body; // Datos a actualizar

        // Validar que todos los campos estén presentes
        if (!bebida || !precio) {
            return res.status(400).json({ error: "Todos los campos son requeridos para actualizar la pizza." });
        }

        const datosActualizados = { bebida, precio };
        console.log("Datos para actualizar:", datosActualizados); // Depuración

        // Llamar a la función de actualización en la base de datos
        const resultado = await brothersDB.actualizarPorIdBeb(id, datosActualizados);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Bebida no encontrada." });
        }

        res.json({ message: "Bebida actualizada correctamente." });
    } catch (error) {
        console.error("Error al actualizar la bebida:", error);
        res.status(500).json({ error: "Error al actualizar la bebida." });
    }
});

// Ruta para eliminar una pizza por ID
router.delete("/pizzas/:id", async (req, res) => {
    try {
        const id = req.params.id; // ID de la pizza a eliminar
        console.log("ID recibido para eliminar:", id); // Depuración

        // Llamar a la función de eliminación en la base de datos
        const resultado = await brothersDB.borrarPorIdPizzas(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Pizza no encontrada." });
        }

        res.json({ message: "Pizza eliminada correctamente." });
    } catch (error) {
        console.error("Error al eliminar la pizza:", error);
        res.status(500).json({ error: "Error al eliminar la pizza." });
    }
});

router.delete("/especialidades/:id", async (req, res) => {
    try {
        const id = req.params.id; // ID de la pizza a eliminar
        console.log("ID recibido para eliminar:", id); // Depuración

        // Llamar a la función de eliminación en la base de datos
        const resultado = await brothersDB.borrarPorIdEsp(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Especialidad no encontrada." });
        }

        res.json({ message: "Especialidad eliminada correctamente." });
    } catch (error) {
        console.error("Error al eliminar la especialidad:", error);
        res.status(500).json({ error: "Error al eliminar la especialidad." });
    }
});

router.delete("/adicionales/:id", async (req, res) => {
    try {
        const id = req.params.id; // ID de la pizza a eliminar
        console.log("ID recibido para eliminar:", id); // Depuración

        // Llamar a la función de eliminación en la base de datos
        const resultado = await brothersDB.borrarPorIdAdi(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Adicional no encontrado." });
        }

        res.json({ message: "Adicional eliminado correctamente." });
    } catch (error) {
        console.error("Error al eliminar el adicional:", error);
        res.status(500).json({ error: "Error al eliminar el adicional." });
    }
});

router.delete("/bebidas/:id", async (req, res) => {
    try {
        const id = req.params.id; // ID de la pizza a eliminar
        console.log("ID recibido para eliminar:", id); // Depuración

        // Llamar a la función de eliminación en la base de datos
        const resultado = await brothersDB.borrarPorIdBeb(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Bebida no encontrada." });
        }

        res.json({ message: "Bebida eliminada correctamente." });
    } catch (error) {
        console.error("Error al eliminar la bebida:", error);
        res.status(500).json({ error: "Error al eliminar la bebida." });
    }
});

export default router;
