import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import { JsonPipe } from '@angular/common';

function duracionEnBloquesDeCinco(
  control: AbstractControl
): ValidationErrors | null {
  const valor = Number(control.value);

  if (!valor) {
    return null;
  }

  return valor % 5 === 0
    ? null
    : { bloqueCinco: true };
}

@Component({
  selector: 'app-formulario-clase',
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './formulario-clase.html',
  styleUrl: './formulario-clase.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class FormularioClase {
  private fb = inject(FormBuilder);

  objetoListo: unknown = null;

  formulario = this.fb.nonNullable.group({
    nombre: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],

    categoria: [
      '',
      Validators.required
    ],

    descripcion: [
      '',
      [
        Validators.required,
        Validators.minLength(10)
      ]
    ],

    duracionMin: [
      0,
      [
        Validators.required,
        Validators.min(5),
        duracionEnBloquesDeCinco
      ]
    ],

    imagen: [
      '',
      Validators.required
    ]
  });

  guardar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.objetoListo = this.formulario.getRawValue();
  }
}