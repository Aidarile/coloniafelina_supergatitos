import { CommonModule } from '@angular/common';
import { NoticiasService } from '../../services/noticias.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoticiaModalComponent } from './noticia-modal/noticia-modal.component';

@Component({
  selector: 'app-noticias',
  imports: [CommonModule],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})

export class NoticiasComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;
  noticias: any[] = [];

  noticiasPaginadas: any[] = [];
  paginaActual: number = 1;
  noticiasPorPagina: number = 4;
  totalPaginas: number = 1;

  constructor(
    private noticiasService: NoticiasService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.noticiasService.obtenerTodas().subscribe({
      next: (data) => {
        this.noticias = data;
        this.actualizarPaginacion();
      },
      error: (err) => console.error('Error al cargar las noticias', err)
    });
  }

  abrirModal(noticia: any): void {
    const modalRef = this.modalService.open(NoticiaModalComponent, {
      windowClass: 'modal-noticia-ajustada'  // 🔥 Clase que limita el ancho del modal
    });
    modalRef.componentInstance.noticia = noticia;
  }

  actualizarPaginacion(): void {
    const inicio = (this.paginaActual - 1) * this.noticiasPorPagina;
    const fin = inicio + this.noticiasPorPagina;
    this.noticiasPaginadas = this.noticias.slice(inicio, fin);
    this.totalPaginas = Math.ceil(this.noticias.length / this.noticiasPorPagina);
  }

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPaginacion();
    }
  }

  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarPaginacion();
    }
  }
}