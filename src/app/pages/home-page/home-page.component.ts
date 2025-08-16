import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { HeroSectionComponent } from "../../components/HomeComponents/hero-section/hero-section.component";
import { PrincipalBienvenidaComponent } from "../../components/HomeComponents/principal-bienvenida/principal-bienvenida.component";
import { BienvenidaComponent } from "../../components/HomeComponents/bienvenida/bienvenida.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, HeroSectionComponent, PrincipalBienvenidaComponent, BienvenidaComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
