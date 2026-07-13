import React, { useState } from 'react';
import styles from './Login.module.css';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError('Por favor, ingresa tu usuario y contraseña.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username, 
          password: password,
          expiresInMins: 30,
        })
      });

      const data = await response.json();

      // 2. Si la API devuelve error
      if (!response.ok) {
        throw new Error(data.message === 'Invalid credentials' ? 'Usuario o contraseña incorrectos.' : data.message);
      }

      console.log('Login exitoso:', data);
      
      if (rememberMe) {
        localStorage.setItem('token', data.token);
      } else {
        sessionStorage.setItem('token', data.token);
      }

      if (onLoginSuccess) {
        onLoginSuccess(data);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginCard}>
        
        <div className={styles.formSection}>
          <h1 className={styles.title}>Iniciar Sesión</h1>
          
          {}
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                id="username"
                placeholder="Nombre de usuario" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
                autoComplete="off"
              />
            </div>

            <div className={styles.inputGroup}>
              <input 
                type="password" 
                id="password"
                placeholder="Contraseña" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={styles.checkbox}
                />
                <span className={styles.customCheckbox}></span>
                Recordarme
              </label>
            </div>

            {}
            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className={styles.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando...' : 'Entrar'}
            </button>
          </form>

          <div className={styles.divider}>
            <span>O continuar con</span>
          </div>

          <div className={styles.socialGroup}>
            <button type="button" className={styles.socialBtn} aria-label="Iniciar sesión con Google">
              <img src="/icons/googlelogo.svg" alt="Google Icon" className={styles.socialIcon} />
            </button>
            <button type="button" className={styles.socialBtn} aria-label="Iniciar sesión con Facebook">
              <img src="/icons/facebooklogo.svg" alt="Facebook Icon" className={styles.socialIcon} />
            </button>
            <button type="button" className={styles.socialBtn} aria-label="Iniciar sesión con Apple">
              <img src="/icons/applelogo.svg" alt="Apple Icon" className={styles.socialIcon} />
            </button>
          </div>
        </div>

        <div className={styles.imageSection}>
          <img 
            src="/img/imagenlogin.jpg"
            alt="AMC Cinema Entrance Billboard" 
            className={styles.coverImage}
          />
        </div>

      </div>
    </div>
  );
}