import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';

import type { Clase } from '../../modelos/clase';
import { API_URL } from '../../config';

@Component({
  selector: 'app-tarjeta-clase',
  imports: [],
  templateUrl: './tarjeta-clase.html',
  styleUrl: './tarjeta-clase.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class TarjetaClase {
  clase = input.required<Clase>();

  apiUrl = API_URL;

  activa = input(false);

  seleccionar = output<Clase>();

  avisarSeleccion() {
    this.seleccionar.emit(
      this.clase()
    );
  }
}