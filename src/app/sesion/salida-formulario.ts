import { CanDeactivateFn } from '@angular/router';

export interface ComponenteConCambios {
  puedeSalir: () => boolean;
}

export const confirmarSalida: CanDeactivateFn<ComponenteConCambios> = (
  componente
) => {
  return componente.puedeSalir();
};