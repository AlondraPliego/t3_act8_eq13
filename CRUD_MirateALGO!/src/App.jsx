import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import MainContent from "./components/MainContent/MainContent";
import "./App.css";

function App() {

  const [seccion, setSeccion] = useState("inicio");
  const [abierto, setAbierto] = useState(true);

  return (
    <div className="app">

      <Sidebar
        seccion={seccion}
        setSeccion={setSeccion}
        abierto={abierto}
        setAbierto={setAbierto}
      />

      <div className="contenido">

        <Navbar />

        <MainContent seccion={seccion} />

      </div>

    </div>
  );
}

export default App;