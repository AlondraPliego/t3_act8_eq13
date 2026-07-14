import React, { useState, useEffect } from 'react';
import styles from './forms.module.css';

export default function FormEdit({ isOpen, onClose, elementoSeleccionado, onEditElement }) {
  const [formData, setFormData] = useState({
    titulo: '',
    año: '',
    calificacion: '',
    estado: 'Emision',
    genero: 'Comedia',
    temporadas: '',
    canal: '',
    episodios: ''
  });
  
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && elementoSeleccionado) {
      setFormData({
        titulo: elementoSeleccionado.titulo || '',
        año: elementoSeleccionado.año || '',
        calificacion: elementoSeleccionado.calificacion || '',
        estado: elementoSeleccionado.estado || 'Emision',
        genero: elementoSeleccionado.genero || 'Comedia',
        temporadas: elementoSeleccionado.temporadas || '',
        canal: elementoSeleccionado.canal || '',
        episodios: elementoSeleccionado.episodios || ''
      });
      setError(null);
    }
  }, [isOpen, elementoSeleccionado]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    // Se utiliza 'id' para mantener consistencia con FormAdd y evitar autocompletado
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Validacion de campos vacios
    const hasEmptyFields = Object.values(formData).some(val => String(val).trim() === '');
    
    if (hasEmptyFields) {
      setError('Es necesario rellenar todos los campos.');
      return;
    }

    Swal.fire({
      title: '¿Guardar cambios?',
      text: `Vas a actualizar los datos de "${formData.titulo}".`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#048BA8', 
      cancelButtonColor: '#4A4849',  
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
      background: '#2F2D2E',         
      color: '#FFFFFF'
    }).then((result) => {
      if (result.isConfirmed) {
        if (onEditElement) {
          onEditElement({ ...elementoSeleccionado, ...formData });
        }
        
        Swal.fire({
          title: '¡Actualizado!',
          text: 'El contenido se modificó correctamente.',
          icon: 'success',
          confirmButtonColor: '#048BA8',
          background: '#2F2D2E',
          color: '#FFFFFF'
        });
        
        onClose(); 
      }
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>EDITAR CONTENIDO</h2>
          <button className={styles.closeBtn} onClick={onClose}>X</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.formBody} noValidate autoComplete="off">
          
          <div className={styles.formGroup}>
            <label>Titulo</label>
            <input type="text" id="titulo" value={formData.titulo} onChange={handleChange} autoComplete="off" />
          </div>

          <div className={styles.formGroup}>
            <label>Año</label>
            <input type="number" id="año" value={formData.año} onChange={handleChange} autoComplete="off" />
          </div>

          <div className={styles.formGroup}>
            <label>Calificación</label>
            <input type="number" step="0.1" id="calificacion" value={formData.calificacion} onChange={handleChange} autoComplete="off" />
          </div>

          <div className={styles.formGroup}>
            <label>Estado</label>
            <select id="estado" value={formData.estado} onChange={handleChange}>
              <option value="Emision">Emision</option>
              <option value="Finalizada">Finalizada</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Genero</label>
            <select id="genero" value={formData.genero} onChange={handleChange}>
              <option value="Comedia">Comedia</option>
              <option value="Terror">Terror</option>
              <option value="Drama">Drama</option>
              <option value="Ciencia-Ficción">Ciencia-Ficción</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Temporadas</label>
            <input type="number" id="temporadas" value={formData.temporadas} onChange={handleChange} autoComplete="off" />
          </div>

          <div className={styles.formGroup}>
            <label>Canal</label>
            <input type="text" id="canal" value={formData.canal} onChange={handleChange} autoComplete="off" />
          </div>

          <div className={styles.formGroup}>
            <label>Episodios</label>
            <input type="number" id="episodios" value={formData.episodios} onChange={handleChange} autoComplete="off" />
          </div>

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <div className={styles.formActions}>
            <button type="submit" className={styles.addBtn}>GUARDAR</button>
            <button type="button" className={styles.clearBtn} onClick={onClose}>CANCELAR</button>
          </div>

        </form>
      </div>
    </div>
  );
}