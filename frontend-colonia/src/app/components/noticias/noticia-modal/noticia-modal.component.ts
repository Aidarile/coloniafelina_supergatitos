import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-noticia-modal',
  imports: [DatePipe, NgbModalModule],
  templateUrl: './noticia-modal.component.html',
})
export class NoticiaModalComponent {
  @Input() noticia: any;

  constructor(public activeModal: NgbActiveModal) {}
}
