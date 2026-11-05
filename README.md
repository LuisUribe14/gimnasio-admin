## Respuestas
### Practica 19

### ¿Qué archivo de Angular hace el papel de main.tsx, App.tsx y vite.config.ts?
main.ts cumple una función similar a main.tsx porque es el punto de entrada de la aplicacion. app.ts y app.html cumplen un papel parecido a App.tsx ya que contienen el componente principal y su interfaz

### ¿Por qué clase() lleva paréntesis?
Porque clase fue creada con input.required() que devuelve una señal de Angular entonces para obtener su valor se llama como una funcion por eso se escribe clase()

### ¿Para qué sirve track en @for?
track permite que Angular identifique cada elemento de la lista de manera unica y en este caso se utiliza clase.id lo que ayuda a Angular a actualizar solamente los elementos que cambiaron y evita volver a crear toda la lista innecesariamente
