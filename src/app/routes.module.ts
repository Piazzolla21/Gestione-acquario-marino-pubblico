import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PoComponent } from './po/po.component';
import { VascaComponent } from './vasca/vasca.component';
import { SensoriComponent } from './sensori/sensori.component';

export const AppRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'Po', component:  PoComponent},
  { path: 'Vasca', component: VascaComponent},
  { path: 'Sensori', component: SensoriComponent}
];