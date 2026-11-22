## Respuestas

### Practica 23

### 1. ¿Qué diferencia hay entre un signal y un Observable?
Un signal guarda un valor reactivo que se puede leer directamente desde Angular y se actualiza cuando cambia y un observable representa una secuencia de valores que pueden llegar con el tiempo y se trabaja mediante operadores de RxJS y suscripciones. En esta practica usamos un Observable para manejar la busqueda y despues lo convertimos a signal con toSignal para seguir usando los datos facilmente desde los componentes

### 2. ¿Qué problema evita switchMap y qué pasaría con mergeMap?
switchMap cancela la peticion anterior cuando llega una nueva busqueda esto evita que una respuesta vieja llegue despues que una nueva y termine mostrando resultados que ya no corresponden al texto actual y con mergeMap todas las peticiones seguirian activas al mismo tiempo por lo que podrian responder en diferente orden y mostrar resultados incorrectos o desactualizados

### 3. ¿Qué pasa si se quita catchError y la API se apaga?
Si se quita catchError y la API falla el Observable termina con un error y despues de eso el flujo de busqueda deja de funcionar y ya no responderia a nuevas busquedas. Con catchError podemos controlar el error y devolver un estado valido y mantener funcionando el flujo
