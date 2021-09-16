import React, { useContext, useEffect, useState } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = (props) => {
  //Extraer si un proyecto esta activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  // Obtener la funcion del contexto de tarea
  const tareasContext = useContext(tareaContext);
  const {
    tareaseleccionada,
    errortarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea,
    tareasproyecto,
  } = tareasContext;

  // Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaseleccionada !== null) {
      setTarea(tareaseleccionada);
    } else {
      setTarea({
        nombre: "",
      });
    }
  }, [tareaseleccionada]);

  // State del formulario
  const [tarea, setTarea] = useState({
    nombre: "",
  });
  const { nombre } = tarea;
  // si no hay proyectos seleccionado , primera vez no hay nada .
  if (!proyecto) return null;

  // array destructuring para extraer el proyecto actual, recordar que es por posicion, no importa el nombre
  const [proyectoAcual] = proyecto;

  // Leer los valores del formulario
  const handleChange = (e) => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //validarFormulario
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    // revisar si es edicion o nueva tarea
    if (tareaseleccionada === null) {
      // tarea nueva
      // agregar la nueva tarea al state de tareas
      tarea.proyecto = proyectoAcual._id; // union entre tarea y proyecto (c.mio)
      agregarTarea(tarea);
    } else {
      // actualizar tarea existente
      actualizarTarea(tarea);
      //elimina tarea seleccionada del state
      limpiarTarea();
    }

    // Obtener y filtrar las tareas del proyecto acutal
    obtenerTareas(proyectoAcual.id);
    //reiniciar el form
    setTarea({
      nombre: "",
    });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="input-new-note"
          placeholder="Nombre de la Tarea"
          name="nombre"
          value={nombre}
          onChange={handleChange}
        />

        <input
          type="submit"
          className="submit-new-note"
          value={tareaseleccionada ? "Editar Tarea" : "Agreagar Tarea"}
        />
      </form>

      {errortarea ? (
        <p className="error-input-alone">
          El nombre de la tarea es obligatorio
        </p>
      ) : null}
    </>
  );
};

export default FormTarea;
