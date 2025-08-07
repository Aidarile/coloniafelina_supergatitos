import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

declare var bootstrap: any

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  cerrarNavbar(): void {
  const navbar = document.getElementById('navbarNav');
  const bsCollapse = bootstrap.Collapse.getInstance(navbar);
  if (bsCollapse) {
    bsCollapse.hide();
  }
}

}