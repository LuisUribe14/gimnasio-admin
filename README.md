## Respuestas

### Practica 22

### 1. Si el formulario ya valida, ¿por qué también valida el servidor?
Pq las validaciones del frontend se pueden modificar o evitar y el servidor debe validar nuevamente los datos antes de guardarlos para proteger la informacion y evitar que lleguen datos invalidos a la base de datos

### 2. ¿Por qué usamos httpResource para leer y HttpClient para crear, editar y eliminar?
httpResource es util para consultar datos y mantenerlos de forma reactiv, por eso se utiliza para cargar el catalogo y el HttpClient se utiliza para operaciones como POST, PATCH y DELETE ya que son acciones que modifican datos y necesitamos controlar cuando se ejecutan y que hacer cuando terminan

### 3. ¿Qué pasa si se olvida el subscribe()?
La peticion de HttpClient no se ejecuta y los metodos como post(), patch() y delete() regresan un Observable y es necesario suscribirse para realizar la peticion

### 4. ¿A qué pieza de React corresponden las rutas hijas, el interceptor y el guardia?
Las rutas hijas de Angular son similares a las rutas anidadas de React Router. El interceptor se parece a una configuracion centralizada de las peticiones HTTP y el guardia se parece a una ruta protegida de React que verifica si el usuario tiene permiso antes de mostrar un componente

### 5. ¿Cuándo se ejecuta el guardia y por qué salir() tiene que navegar al login?
El guardia se ejecuta antes de permitir el acceso a una ruta protegida. En nuestro caso comprueba que exista una sesion valida y que el usuario sea administrador.
salir() tiene que navegar al login porque despues de cerrar la sesion el usuario ya no debe permanecer dentro de las rutas protegidas del panel

### 6. ¿Cómo decide un mismo formulario, con dos rutas, si manda POST o PATCH?
El formulario revisa si existe un id de clase en la URL y si no existe un id significa que se esta creando una nueva clase y se manda un POST entonces si existe un id significa que se esta editando una clase existente y se manda un PATCH

### 7. ¿Por qué el estado del formulario no se puede observar con un computed()?
Pq el estado de un formulario reactivo como dirty, touched o los valores de sus controles no es un Signal de Angular. computed() reacciona a Signals mientras que los formularios reactivos utilizan controles y Observables como valueChanges y statusChanges

### 8. ¿Qué diferencia hay entre canActivate y canDeactivate, y qué casos no cubre la guarda de salida?
canActivate se ejecuta antes de entrar a una ruta y decide si el usuario puede acceder y canDeactivate se ejecuta cuando el usuario intenta salir de una ruta y permite comprobar si existen cambios sin guardar. La guarda de salida protege la navegacion realizada dentro de Angular pero no garantiza evitar todos los casos externos como cerrar completamente el navegador o cerrar la pestaña o algunas recargas de la pagina
