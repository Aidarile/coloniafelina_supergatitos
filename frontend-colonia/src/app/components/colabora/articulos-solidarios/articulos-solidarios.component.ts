import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../../common/interfacearticulos';
import { ArticulosService } from '../../../services/articulos.service';
import { CommonModule } from '@angular/common';
import { ImageUrlPipe } from '../../../pipes/image-url.pipe';

@Component({
  selector: 'app-articulos-solidarios',
  imports: [CommonModule, ImageUrlPipe],
  templateUrl: './articulos-solidarios.component.html',
  styleUrl: './articulos-solidarios.component.css'
})
export class ArticulosSolidariosComponent implements OnInit {
  articulos: Articulo[] = [];

  constructor(private articulosService: ArticulosService) {}

  ngOnInit(): void {
    this.articulosService.getArticulos().subscribe(data => {
      this.articulos = data;
    });
  }

}
