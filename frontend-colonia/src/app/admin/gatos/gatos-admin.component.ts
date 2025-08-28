import { Component, OnInit } from '@angular/core';
import { Gato } from '../../common/interfacegatos';
import { GatosService } from '../../services/gatos.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageUrlPipe } from '../../pipes/image-url.pipe';

declare var bootstrap: any; 

@Component({
  standalone: true,
  selector: 'app-gatos',
  imports: [CommonModule, FormsModule, ImageUrlPipe],
  templateUrl: './gatos-admin.component.html',
  styleUrl: './gatos-admin.component.css'
})

export class GatosAdminComponent implements OnInit {
  gatos: Gato[] = [];

  modoEdicion = false;
  gatoEditando: Gato | null = null;

  nuevoGato: Gato = {
    nombre: '',
    apodo: '',
    descripcion: '',
    imagen: '',
    estado: '',
    sexo: '',
    motivo: ''
  };

  constructor(private gatosService: GatosService) {}

  ngOnInit() {
    this.cargarGatos();
  }

  cargarGatos() {
    this.gatosService.obtenerTodos().subscribe(data => {
      this.gatos = data;
    });
  }

  crearGato() {
    this.gatosService.crearGato(this.nuevoGato).subscribe(() => {
      this.cargarGatos(); // recarga la lista
      this.nuevoGato = {
        nombre: '',
        apodo: '',
        descripcion: '',
        imagen: '',
        estado: 'activo',
        sexo: '',
        motivo: ''
      };
    });
  }

  guardarGato(form: NgForm) {
    if (this.modoEdicion && this.gatoEditando?._id) {
      this.gatosService.actualizarGato(this.gatoEditando._id, this.nuevoGato).subscribe(() => {
        this.cargarGatos();
        this.cancelarEdicion(form);
        this.mostrarToast('Gato modificado correctamente');
      });
    } else {
      this.gatosService.crearGato(this.nuevoGato).subscribe(() => {
        this.cargarGatos();
        this.resetFormulario(form);
        this.mostrarToast('Gato guardado correctamente');
        this.scrollToBottom();
      });
    }
  }
  
  eliminarGato(id: string | undefined) {
    if (!id) return;
    if (confirm('¿Estás seguro de que deseas eliminar este gato?')) {
      this.gatosService.eliminarGato(id).subscribe(() => {
        this.cargarGatos();
        this.mostrarToast('Gato eliminado correctamente');
      });
    }
  }

  editarGato(gato: Gato) {
    this.modoEdicion = true;
    this.gatoEditando = gato;
    this.nuevoGato = { ...gato };
    this.scrollToTop();
  }

  resetFormulario(form: NgForm) {
    form.resetForm();
    this.nuevoGato = {
      nombre: '',
      apodo: '',
      descripcion: '',
      imagen: '',
      estado: '',
      sexo: '',
      motivo: ''
    };
  }
  
  cancelarEdicion(form: NgForm) {
    this.modoEdicion = false;
    this.gatoEditando = null;
    this.resetFormulario(form);
  }

  mostrarToast(mensaje: string = 'Gato guardado correctamente') {
    const toastEl = document.getElementById('successToast');
    if (toastEl) {
      const body = toastEl.querySelector('.toast-body');
      if (body) body.textContent = mensaje;
  
      const toast = new bootstrap.Toast(toastEl, {
        autohide: true,
        delay: 3000, // <-- 3 segundos de duración
      });
  
      toast.show();
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToBottom(): void {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
  
}