import { Component, OnInit } from '@angular/core';
import { GatosService } from '../../services/gatos.service';
import { Gato } from '../../common/interfacegatos';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageUrlPipe } from '../../pipes/image-url.pipe';

@Component({
  selector: 'app-adoptaacoge',
  imports: [CommonModule, RouterLink, ImageUrlPipe],
  templateUrl: './adoptaacoge.component.html',
  styleUrl: './adoptaacoge.component.css'
})
export class AdoptaacogeComponent implements OnInit {
  gatosAdopcion: Gato[] = [];
  gatosAcogida: Gato[] = [];
  vistaActual: 'adopcion' | 'acogida' = 'adopcion';

  constructor(private gatosService: GatosService) {}

  ngOnInit(): void {
    this.gatosService.obtenerTodos().subscribe((gatos: Gato[]) => {
      this.gatosAdopcion = gatos.filter(g =>
        g.estado === 'en_adopcion' || g.estado === 'acogido'
      );

      this.gatosAcogida = gatos.filter(g =>
        g.estado === 'en_acogida'
      );
    });
  }
}