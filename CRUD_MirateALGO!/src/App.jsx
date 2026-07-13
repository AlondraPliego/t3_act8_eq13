import { useState } from 'react';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent'; // <-- 1. Importamos la zona central
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      {!isAuthenticated ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        /* Contenedor general de la aplicación una vez logueado */
        <div className="app-layout">
          <Navbar />
          
          {/* Contenedor inferior que divide la pantalla horizontalmente */}
          <div className="main-wrapper">
            <Sidebar />
            
            {/* 2. Reemplazamos el texto plano por el componente de la tabla */}
            <main className="content-area">
              <MainContent />
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default App;