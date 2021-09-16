import React from "react";
import ListadoProyectos from "../proyectos/ListadoProyectos";
import NuevoProyecto from "../proyectos/NuevoProyecto";

const SideBar = () => {
  return (
    <>
      <NuevoProyecto />

      <ListadoProyectos />
    </>
  );
};

export default SideBar;
