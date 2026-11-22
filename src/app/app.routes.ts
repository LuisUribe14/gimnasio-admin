import { Routes } from '@angular/router';
import { Login } from './paginas/login/login';
import { Panel } from './paginas/panel/panel';
import { ListaClases } from './paginas/lista-clases/lista-clases';
import { Horarios } from './paginas/horarios/horarios';
import { Miembros } from './paginas/miembros/miembros';
import { soloAdmin } from './sesion/solo-admin';
import { confirmarSalida } from './sesion/salida-formulario';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },

  {
    path: '',
    component: Panel,
    canActivate: [soloAdmin],
    children: [
      {
        path: '',
        redirectTo: 'clases',
        pathMatch: 'full'
      },

      {
        path: 'clases',
        component: ListaClases
      },

      {
        path: 'clases/nueva',

        loadComponent: () =>
          import(
            './paginas/formulario-clase/formulario-clase'
          ).then(
            m => m.FormularioClase
          ),

        canDeactivate: [
          confirmarSalida
        ]
      },

      {
        path: 'clases/:id/editar',

        loadComponent: () =>
          import(
            './paginas/formulario-clase/formulario-clase'
          ).then(
            m => m.FormularioClase
          ),

        canDeactivate: [
          confirmarSalida
        ]
      },

      {
        path: 'horarios',
        component: Horarios
      },

      {
        path: 'miembros',
        component: Miembros
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'clases'
  }
];