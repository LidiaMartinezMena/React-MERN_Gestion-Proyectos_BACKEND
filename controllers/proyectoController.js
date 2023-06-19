import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tarea.js";
import Usuario from "../models/Usuario.js";

const obtenerProyectos = async (req, res) => {

    const proyectos = await Proyecto.find().where('creador').equals(req.usuario);
    res.json(proyectos);

};

const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body);
    proyecto.creador = req.usuario._id;
  
    try {
      const proyectoAlmacenado = await proyecto.save();
      res.json(proyectoAlmacenado);
    } catch (error) {
      console.log(error);
    }
  };

const obtenerProyecto = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const proyecto = await Proyecto.findById(id);
    console.log(proyecto);
    
    if (!proyecto) {
        const error = new Error("No Encontrado");
        return res.status(404).json({ msg: error.message });
    };

      //Comprobar que el que intenta acceder al proyecto es el que lo creó
    if (proyecto.creador.toString() !== req.usuario.id.toString()){
        const error = new Error("Acción no válida");
        return res.status(401).json({ msg: error.message });
    };

    //Obtener las tareas del proyecto:
    const tareas = await Tarea.find().where('proyecto').equals(proyecto._id);

    res.json({
      proyecto
      
    });

};

const editarProyecto = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const proyecto = await Proyecto.findById(id);
    console.log(proyecto);
  
  if (!proyecto) {
      const error = new Error("No Encontrado");
      return res.status(404).json({ msg: error.message });
  };

    //Comprobar que el que intenta acceder al proyecto es el que lo creó
  if (proyecto.creador.toString() !== req.usuario.id.toString()){
      const error = new Error("Acción no válida");
      return res.status(401).json({ msg: error.message });
  };

//Si el usuario manda un nombre nuevo, se asigna, sino utilia lo que ya tiene en la DB
  proyecto.nombre = req.body.nombre ?? proyecto.nombre;
  proyecto.descripcion = req.body.descripcion ?? proyecto.descripcion;
  proyecto.fechaEntrega = req.body.fechaEntrega ?? proyecto.fechaEntrega;
  proyecto.cliente = req.body.cliente ?? proyecto.cliente;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
    
  } catch (error) {
    console.log(error);
  };
};

const eliminarProyecto = async (req, res) => {

  const { id } = req.params;
    console.log(id);
    const proyecto = await Proyecto.findById(id);
    console.log(proyecto);
  
  if (!proyecto) {
      const error = new Error("No Encontrado");
      return res.status(404).json({ msg: error.message });
  };

    //Comprobar que el que intenta acceder al proyecto es el que lo creó
  if (proyecto.creador.toString() !== req.usuario.id.toString()){
      const error = new Error("Acción no válida");
      return res.status(401).json({ msg: error.message });
  };

  try {
    await proyecto.deleteOne();
    res.json({msg: "Proyecto eliminado"});
  } catch (error) {
    console.log(error);
  };

};

const agregarColaborador = async (req, res) => {

};

const eliminarColaborador = async (req, res) => {

};



export {
    obtenerProyectos, nuevoProyecto, obtenerProyecto, editarProyecto, eliminarProyecto, agregarColaborador, eliminarColaborador,  
};
