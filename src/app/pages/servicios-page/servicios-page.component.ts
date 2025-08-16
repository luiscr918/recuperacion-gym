import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ServiciosComponentComponent } from "../../components/ServiciosComponents/servicios-component/servicios-component.component";

@Component({
  selector: 'app-servicios-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ServiciosComponentComponent],
  templateUrl: './servicios-page.component.html',
  styleUrl: './servicios-page.component.css'
})
export class ServiciosPageComponent {

}
