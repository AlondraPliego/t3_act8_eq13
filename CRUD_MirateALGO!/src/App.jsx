import { useState, useEffect } from 'react';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import './App.css';

function App() {
  //busca una llave guardada en cualquiera de los dos guardados
  const tokenGuardado = localStorage.getItem('token') || sessionStorage.getItem('token');

  //El !! convierte el resultado en un booleano, true si hay token, false si está vacío
  const [isAuthenticated, setIsAuthenticated] = useState(!!tokenGuardado);

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
            <Sidebar />
            
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