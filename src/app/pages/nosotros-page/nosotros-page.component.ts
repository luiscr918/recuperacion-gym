import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { HeroNosotrosComponent } from "../../components/NosotrosComponents/hero-nosotros/hero-nosotros.component";
import { HistoriaComponent } from "../../components/NosotrosComponents/historia/historia.component";
import { ValoresComponent } from "../../components/NosotrosComponents/valores/valores.component";

@Component({
  selector: 'app-nosotros-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, HeroNosotrosComponent, HistoriaComponent, ValoresComponent],
  templateUrl: './nosotros-page.component.html',
  styleUrl: './nosotros-page.component.css'
})
export class NosotrosPageComponent {

}
