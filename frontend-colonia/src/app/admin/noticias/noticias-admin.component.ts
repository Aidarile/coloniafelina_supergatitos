import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NoticiasService } from '../../services/noticias.service';

declare var bootstrap: any; 

@Component({
  selector: 'app-noticias-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './noticias-admin.component.html',
  styleUrl: './noticias-admin.component.css'
})
export class NoticiasAdminComponent implements OnInit {
  noticias: any[] = [];

  modoEdicion = false;
  noticiaEditando: any | null = null;

  nuevaNoticia: any = {
    titulo: '',
    contenido: '',
    imagen: '',
    autor: '',
    tags: ''
  };

  // Paginación:
  paginaActual: number = 1;
  elementosPorPagina: number = 6;

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.cargarNoticias();
  }

  cargarNoticias() {
    this.noticiasService.obtenerTodas().subscribe(data => {
      this.noticias = data;
    });
  }

  guardarNoticia(form: NgForm) {
    if (this.modoEdicion && this.noticiaEditando?._id) {
      this.noticiasService.actualizarNoticia(this.noticiaEditando._id, this.nuevaNoticia).subscribe(() => {
        this.cargarNoticias();
        this.cancelarEdicion(form);
        this.mostrarToast('Noticia modificada correctamente');
      });
    } else {
      this.noticiasService.crearNoticia(this.nuevaNoticia).subscribe(() => {
        this.cargarNoticias();
        this.resetFormulario(form);
        this.mostrarToast('Noticia guardada correctamente');
        this.scrollToBottom();
      });
    }
  }

  eliminarNoticia(id: string | undefined) {
    if (!id) return;
    if (confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
      this.noticiasService.eliminarNoticia(id).subscribe(() => {
        this.cargarNoticias();
        this.mostrarToast('Noticia eliminada correctamente');
      });
    }
  }

  editarNoticia(noticia: any) {
    this.modoEdicion = true;
    this.noticiaEditando = noticia;
    this.nuevaNoticia = { ...noticia };
    this.scrollToTop();
  }

  resetFormulario(form: NgForm) {
    form.resetForm();
    this.nuevaNoticia = {
      titulo: '',
      contenido: '',
      imagen: '',
      autor: '',
      tags: ''
    };
  }

  cancelarEdicion(form: NgForm) {
    this.modoEdicion = false;
    this.noticiaEditando = null;
    this.resetFormulario(form);
  }

  mostrarToast(mensaje: string = 'Noticia guardada correctamente') {
    const toastEl = document.getElementById('successToast');
    if (toastEl) {
      const body = toastEl.querySelector('.toast-body');
      if (body) body.textContent = mensaje;

      const toast = new bootstrap.Toast(toastEl, {
        autohide: true,
        delay: 3000,
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
  

  // Paginación:

  noticiasPaginadas(): any[] {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    return this.noticias.slice(inicio, inicio + this.elementosPorPagina);
  }

  totalPaginas(): number[] {
    return Array.from(
      { length: Math.ceil(this.noticias.length / this.elementosPorPagina) },
      (_, i) => i + 1
    );
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas().length) {
      this.paginaActual = pagina;
      this.scrollToTop();
    }
  }
}
