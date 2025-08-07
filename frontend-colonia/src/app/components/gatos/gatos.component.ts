import { GatosService } from './../../services/gatos.service';
import { Component, OnInit } from '@angular/core';
import { Gato } from '../../common/interfacegatos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gatos',
  imports: [CommonModule, FormsModule],
  templateUrl: './gatos.component.html',
  styleUrl: './gatos.component.css'
})
export class GatosComponent implements OnInit{
  gatos: Gato[] = [];

  filtroSexo: string = '';
  filtroEstado: string = '';

  constructor(private gatosService: GatosService) {}

  ngOnInit(): void {
    this.gatosService.obtenerTodos().subscribe({
      next: (data) => this.gatos = data,
      error: (err) => console.error('Error al cargar los gatos', err)
    });
  }

  gatosFiltrados(): Gato[] {
    return this.gatos.filter(gato => {
      const coincideSexo = this.filtroSexo === '' || gato.sexo === this.filtroSexo;

      const coincideEstado =
        this.filtroEstado === '' ||
        (this.filtroEstado === 'buscando_adopcion' &&
          (gato.estado === 'en_adopcion' || gato.estado === 'acogido')) ||
        gato.estado === this.filtroEstado;

      return coincideSexo && coincideEstado;
    });
  }
}