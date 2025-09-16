import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'basic',
    title: 'Pipes Básicos',
    loadComponent: () => import('./pages/basic-page/basic-page.component')
  },

  {
    path: 'numbers',
    title: 'Numbers pipes',
    loadComponent: () => import('./pages/number-page/number-page.component')
  },

  {
    path: 'uncommon',
    title: 'Pipes no tan comunes',
    loadComponent: () => import('./pages/uncommon-page/uncommon-page.component')
  },

  {
    path: 'custom',
    title: 'Pipes personalizados',
    loadComponent: () => import('./pages/custom-page/custom-page.component')
  },
  {
    path: '**',
    redirectTo: 'basic',
  },

];
