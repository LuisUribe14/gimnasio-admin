import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

import { CLASES_LOCALES } from './datos/clases-locales';
import { TarjetaClase } from './componentes/tarjeta-clase/tarjeta-clase';

@Component({
  selector: 'app-root',
  imports: [
    TarjetaClase
  ],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.css'
})
export class App {
  clases = CLASES_LOCALES;

  get totalClases() {
    return this.clases.length;
  }

  get minutosSemana() {
    return this.clases.reduce(
      (total, clase) => total + clase.duracionMin,
      0
    );
  }

  get clasesLargas() {
    return this.clases.filter(
      (clase) => clase.duracionMin >= 60
    ).length;
  }

  vaciarCatalogo() {
    this.clases = [];
  }

  restaurarCatalogo() {
    this.clases = CLASES_LOCALES;
  }
}