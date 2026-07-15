import { useState, useEffect } from 'react';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import Favoritos from './Pages/Favoritos';
import MiLista from './Pages/MiLista';
import Tendencias from './Pages/Tendencias';
import Configuracion from './Pages/Configuracion';
import './App.css';

function App() {
  //busca una llave guardada en cualquiera de los dos guardados
  const tokenGuardado = localStorage.getItem('token') || sessionStorage.getItem('token');

  //El !! convierte el resultado en un booleano, true si hay token, false si está vacío
  const [isAuthenticated, setIsAuthenticated] = useState(!!tokenGuardado);

  // Estado que controla qué página se muestra según el botón del Sidebar
  const [paginaActual, setPaginaActual] = useState('inicio');

  useEffect(() => {
    const manejarBotonAtras = () => {
      if (isAuthenticated) {
        setIsAuthenticated(false);
        
        // para que cierre sesión.
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
      }
    };

    window.addEventListener('popstate', manejarBotonAtras);
    
    return () => {
      window.removeEventListener('popstate', manejarBotonAtras);
    };
  }, [isAuthenticated]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    window.history.pushState(null, '', window.location.href);
  };

  return (
    <>
      {!isAuthenticated ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div className="app-layout">
          <Navbar />
          
          <div className="main-wrapper">
            <Sidebar paginaActual={paginaActual} setPaginaActual={setPaginaActual} />
            
            <main className="content-area">
              {paginaActual === 'inicio' && <MainContent />}
              {paginaActual === 'tendencias' && <Tendencias />}
              {paginaActual === 'favoritos' && <Favoritos />}
              {paginaActual === 'mi-lista' && <MiLista />}
              {paginaActual === 'configuracion' && <Configuracion />}
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default App;