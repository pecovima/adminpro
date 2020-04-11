import { RouterModule,Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AaccountSettingsComponent } from './aaccount-settings/aaccount-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginGardGuard } from '../services/service.index';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/service.index';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';



const pageRoutes:Routes=[
   // { 
/*     path: '', 
    component: PagesComponent,
    canActivate:[LoginGardGuard],
    children:[ */
        {
            path:'dashboard',
            component:DashboardComponent,
            canActivate:[VerificaTokenGuard],
             data: { titulo: 'Dashboard'}
        },
        { path: 'progress', component: ProgressComponent,data: { titulo: 'Progress'} },
        { path: 'graficas1', component: Graficas1Component,data: { titulo: 'Graficas'} },
        { path: 'promesas', component: PromesasComponent,data: { titulo: 'Promesas'} },
        { path: 'rxjs', component: RxjsComponent,data: { titulo: 'RxJs'} },
        { path: 'account-settings', component: AaccountSettingsComponent,data: { titulo: 'Ajustes de Tema'} },
        { path: 'perfil', component: ProfileComponent,data: { titulo: 'Perfil de usuario'} },
        { path: 'busqueda/:termino', component: BusquedaComponent,data: { titulo: 'Buscador'} },
        //Mantenimiento
        { 
            path: 'usuarios', 
            component: UsuariosComponent,
            canActivate:[AdminGuard],       
            data: { titulo: 'Mantenimiento de usuario'}
         },
        { path: 'hospitales', component: HospitalesComponent,data: { titulo: 'Mantenimiento de Hospitales'} },
        { path: 'medicos', component: MedicosComponent,data: { titulo: 'Mantenimiento de Medicos'} },
        { path: 'medico/:id', component: MedicoComponent,data: { titulo: 'Actualizar Medicos'} },
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

   /*  ]
    } */

];


export const PAGES_ROUTES=RouterModule.forChild(pageRoutes);