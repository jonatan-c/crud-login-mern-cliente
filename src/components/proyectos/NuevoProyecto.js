import React, { useContext, useState } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
    errorformulario,
  } = proyectosContext;

  // mostrar el formulario
  const onClickFormulario = () => {
    mostrarFormulario();
  };

  // state para proyecto
  const [proyecto, setProyecto] = useState({
    nombre: "",
  });

  const { nombre } = proyecto;

  const onChangeProyecto = (e) => {
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitProyecto = (e) => {
    e.preventDefault();

    //validar el proyecto
    if (nombre === "") {
      mostrarError();
      return;
    }

    //agregar al state
    agregarProyecto(proyecto);
    //reiniciar el form
    setProyecto({
      nombre: "",
    });
  };

  return (
    <>
      {/* el form esta oculta,debo hacer click */}
      <button
        className="button-new-proyect"
        type="button"
        onClick={onClickFormulario}
      >
        Nuevo proyecto
      </button>

      {formulario ? (
        <form onSubmit={onSubmitProyecto}>
          <input
            className="input-new-proyect"
            type="text"
            placeholder="Nombre nuevo proyecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          />
          <input
            className="submit-new-proyect"
            type="submit"
            value="Agregar PRoyecto"
          />
        </form>
      ) : null}

      {errorformulario ? (
        <p className="error-input-alone">
          El nombre del Proyecto es obligatorio
        </p>
      ) : null}
    </>
  );
};

export default NuevoProyecto;
