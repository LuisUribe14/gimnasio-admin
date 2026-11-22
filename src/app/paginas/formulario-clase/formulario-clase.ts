import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  HttpErrorResponse
} from '@angular/common/http';

import {
  ClasesApi
} from '../../servicios/clases-api';

import {
  Catalogo
} from '../../servicios/catalogo';

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
    ReactiveFormsModule
  ],
  templateUrl: './formulario-clase.html',
  styleUrl: './formulario-clase.css',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class FormularioClase implements OnInit {
  private fb = inject(FormBuilder);
  private clasesApi = inject(ClasesApi);
  private catalogo = inject(Catalogo);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  guardando = false;
  cargando = false;
  guardado = false;

  errorServidor = '';

  idClase: number | null = null;

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

  ngOnInit() {
    const id =
      this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.idClase = Number(id);

    this.cargarClase();
  }

  cargarClase() {
    if (this.idClase === null) {
      return;
    }

    this.cargando = true;
    this.errorServidor = '';

    this.clasesApi
      .obtener(this.idClase)
      .subscribe({
        next: (respuesta) => {
          const clase = respuesta.data;

          this.formulario.patchValue({
            nombre: clase.nombre,
            categoria: clase.categoria,
            descripcion: clase.descripcion,
            duracionMin: clase.duracionMin,
            imagen: clase.imagen
          });

          this.cargando = false;

          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error(
            'Error al cargar clase:',
            error
          );

          this.cargando = false;

          this.errorServidor =
            'No se pudo cargar la clase.';

          this.cdr.detectChanges();
        }
      });
  }

  guardar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.guardando = true;
    this.errorServidor = '';

    const valor =
      this.formulario.getRawValue();

    const clase = {
      nombre: valor.nombre,

      categoria:
        valor.categoria as
          'fuerza' |
          'cardio' |
          'flexibilidad',

      descripcion:
        valor.descripcion,

      duracionMin:
        valor.duracionMin,

      imagen:
        valor.imagen
    };

    const peticion =
      this.idClase === null
        ? this.clasesApi.crear(clase)
        : this.clasesApi.actualizar(
            this.idClase,
            clase
          );

    peticion.subscribe({
      next: () => {
        this.guardado = true;

        this.catalogo.recargar();

        this.router.navigate([
          '/clases'
        ]);
      },

      error: (
        error: HttpErrorResponse
      ) => {
        this.guardando = false;

        const mensaje =
          error.error?.message;

        if (Array.isArray(mensaje)) {
          this.errorServidor =
            mensaje.join(', ');

        } else if (
          typeof mensaje === 'string'
        ) {
          this.errorServidor =
            mensaje;

        } else {
          this.errorServidor =
            'No se pudo guardar la clase.';
        }

        this.cdr.detectChanges();
      }
    });
  }

  puedeSalir(): boolean {
    if (this.guardado) {
      return true;
    }

    if (!this.formulario.dirty) {
      return true;
    }

    return confirm(
      'Tienes cambios sin guardar. ¿Seguro que quieres salir?'
    );
  }
}