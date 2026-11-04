import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CLASES_LOCALES } from './datos/clases-locales';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.css'
})
export class App {
  clases = CLASES_LOCALES;

  totalClases = this.clases.length;

  minutosSemana = this.clases.reduce(
    (total, clase) => total + clase.duracionMin,
    0
  );

  clasesLargas = this.clases.filter(
    (clase) => clase.duracionMin >= 60
  ).length;
}