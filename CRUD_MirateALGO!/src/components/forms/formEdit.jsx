import React, { useState, useEffect } from 'react'; // <-- Importamos useEffect
import Swal from 'sweetalert2'; 
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
    }
  }, [isOpen, elementoSeleccionado]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // SweetAlert2 corregido para edición
    Swal.fire({
      title: '¿Guardar cambios?',
      text: `Vas a actualizar los datos de "${formData.titulo}".`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#048BA8', 
      cancelButtonColor: '#4A4849',  
      confirmButtonText: 'Sí, guardar', // <-- Corregido
      cancelButtonText: 'Cancelar',
      background: '#2F2D2E',         
      color: '#FFFFFF'
    }).then((result) => {
      if (result.isConfirmed) {
        // Le pasamos los datos actualizados y el ID original para saber cuál editar
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

        <form onSubmit={handleSubmit} className={styles.formBody}>
          
          <div className={styles.formGroup}>
            <label>Titulo</label>
            <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Año</label>
            <input type="number" name="año" value={formData.año} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Calificación</label>
            <input type="number" step="0.1" name="calificacion" value={formData.calificacion} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Estado</label>
            <select name="estado" value={formData.estado} onChange={handleChange}>
              <option value="Emision">Emision</option>
              <option value="Finalizada">Finalizada</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Genero</label>
            <select name="genero" value={formData.genero} onChange={handleChange}>
              <option value="Comedia">Comedia</option>
              <option value="Terror">Terror</option>
              <option value="Drama">Drama</option>
              <option value="Ciencia-Ficción">Ciencia-Ficción</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Temporadas</label>
            <input type="number" name="temporadas" value={formData.temporadas} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Canal</label>
            <input type="text" name="canal" value={formData.canal} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Episodios</label>
            <input type="number" name="episodios" value={formData.episodios} onChange={handleChange} required />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.addBtn}>GUARDAR</button> {/* <-- Corregido */}
            <button type="button" className={styles.clearBtn} onClick={onClose}>CANCELAR</button>
          </div>

        </form>
      </div>
    </div>
  );
}