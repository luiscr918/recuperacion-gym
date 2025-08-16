import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NosotrosPageComponent } from './pages/nosotros-page/nosotros-page.component';
import { ContactanosPageComponent } from './pages/contactanos-page/contactanos-page.component';
import { ServiciosPageComponent } from './pages/servicios-page/servicios-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'nosotros', component: NosotrosPageComponent },
  { path: 'contactos', component: ContactanosPageComponent },
  { path: 'servicios', component: ServiciosPageComponent },
];
