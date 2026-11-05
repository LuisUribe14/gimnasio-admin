import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';

import type { Clase } from '../../modelos/clase';

@Component({
  selector: 'app-tarjeta-clase',
  imports: [],
  templateUrl: './tarjeta-clase.html',
  styleUrl: './tarjeta-clase.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class TarjetaClase {
  clase = input.required<Clase>();

  activa = input(false);

  seleccionar = output<Clase>();

  avisarSeleccion() {
    this.seleccionar.emit(
      this.clase()
    );
  }
}