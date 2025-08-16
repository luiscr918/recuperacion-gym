import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ContactUsComponent } from "../../components/ContactanosComponents/contact-us/contact-us.component";

@Component({
  selector: 'app-contactanos-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ContactUsComponent],
  templateUrl: './contactanos-page.component.html',
  styleUrl: './contactanos-page.component.css'
})
export class ContactanosPageComponent {

}
