import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Articulo } from '../../common/interfacearticulos';
import { ArticulosService } from '../../services/articulos.service';

declare var bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-articulos',
  imports: [CommonModule, FormsModule],
  templateUrl: './articulos-admin.component.html',
  styleUrl: './articulos-admin.component.css'
})
export class ArticulosAdminComponent implements OnInit{
  articulos: Articulo[] = [];

  modoEdicion = false;
  articuloEditando: Articulo | null = null;

  mensajeToast = '';

  nuevoArticulo: Articulo = {
    nombre: '',
    descripcion: '',
    imagen: '',
    precio: '',
    referencia: ''
  };

  constructor(private articulosService: ArticulosService) {}

  ngOnInit(): void {
    this.cargarArticulos();
  }

  cargarArticulos(): void {
    this.articulosService.getArticulos().subscribe(data => {
      this.articulos = data;
    });
  }

  guardarArticulo(form: NgForm): void {
    if (this.modoEdicion && this.articuloEditando?._id) {
      this.articulosService.actualizarArticulo(this.articuloEditando._id, this.nuevoArticulo).subscribe(() => {
        this.cargarArticulos();
        this.cancelarEdicion(form);
        this.mostrarToast('Artículo modificado correctamente');
      });
    } else {
      this.articulosService.crearArticulo(this.nuevoArticulo).subscribe(() => {
        this.cargarArticulos();
        this.resetFormulario(form);
        this.mostrarToast('Artículo guardado correctamente');
        this.scrollToBottom();
      });
    }
  }
  
  eliminarArticulo(id: string | undefined): void {
    if (!id) return;
    if (confirm('¿Estás seguro de eliminar este artículo?')) {
      this.articulosService.eliminarArticulo(id).subscribe(() => {
        this.cargarArticulos();
        this.mostrarToast('Artículo eliminado correctamente');
      });
    }
  }

  editarArticulo(articulo: Articulo): void {
    this.modoEdicion = true;
    this.articuloEditando = articulo;
    this.nuevoArticulo = { ...articulo };
    this.scrollToTop();
  }

  cancelarEdicion(form: NgForm): void {
    this.modoEdicion = false;
    this.articuloEditando = null;
    this.resetFormulario(form);
  }

  resetFormulario(form: NgForm): void {
    form.resetForm();
    this.nuevoArticulo = {
      nombre: '',
      descripcion: '',
      imagen: '',
      precio: '',
      referencia: ''
    };
  }

  mostrarToast(mensaje: string = 'Artículo guardado correctamente') {
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