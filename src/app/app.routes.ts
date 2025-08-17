import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NosotrosPageComponent } from './pages/nosotros-page/nosotros-page.component';
import { ContactanosPageComponent } from './pages/contactanos-page/contactanos-page.component';
import { ServiciosPageComponent } from './pages/servicios-page/servicios-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PanelClienteComponent } from './pages/panel-cliente/panel-cliente.component';
import { AdminPanelComponent } from './components/AdminComponents/admin-panel/admin-panel.component';
import { gurdianrutaGuard } from './guards/gurdianruta.guard';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'nosotros', component: NosotrosPageComponent },
  { path: 'contactos', component: ContactanosPageComponent },
  { path: 'servicios', component: ServiciosPageComponent },
  { path: 'registro', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'panel-cliente/:id',
    component: PanelClienteComponent,
    canActivate: [gurdianrutaGuard],
  },
  {
    path: 'panel-admin/:id',
    component: AdminPanelComponent,
    canActivate: [gurdianrutaGuard],
  },
];
