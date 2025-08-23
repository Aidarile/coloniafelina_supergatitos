import { Component, OnInit } from '@angular/core';
import { Gato } from '../../common/interfacegatos';
import { GatosService } from '../../services/gatos.service';
import { CommonModule } from '@angular/common';
import { ImageUrlPipe } from '../../pipes/image-url.pipe';

@Component({
  selector: 'app-finalesfelices',
  imports: [CommonModule, ImageUrlPipe],
  templateUrl: './finalesfelices.component.html',
  styleUrl: './finalesfelices.component.css'
})
export class FinalesfelicesComponent implements OnInit{

  gatosAdoptados: Gato[] = [];

  constructor(private gatosService: GatosService) {}

ngOnInit(): void {
  this.gatosService.obtenerTodos().subscribe((gatos: Gato[]) => {
    this.gatosAdoptados = gatos.filter(g => g.estado === 'adoptado');
  });
}
}