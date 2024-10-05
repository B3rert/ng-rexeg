# README

## Proyecto: Clasificador de Cadenas con Expresiones Regulares

### Descripción

Este proyecto es una aplicación web desarrollada en **Angular** que permite cargar un archivo de texto con cadenas y un archivo con expresiones regulares. La aplicación procesa las cadenas, las compara con las expresiones regulares y genera un archivo de salida con los resultados, indicando si las cadenas coinciden con alguna de las expresiones o si contienen errores.

### Características

- Carga de archivos de texto para procesar cadenas y expresiones regulares.
- Validación de las cadenas contra las expresiones regulares proporcionadas.
- Generación automática de un archivo de salida con los resultados.
- Interfaz de usuario amigable y notificaciones de éxito/error mediante **Angular Material**.

### Vista previa

![Vista previa](https://github.com/user-attachments/assets/988fb471-bc82-439d-be58-1f135636a867)


### Demo

Puedes ver una demostración en vivo de la aplicación a través del siguiente enlace:

[**Demo en vivo**](https://b3rert.github.io/ng-rexeg/)

En esta demo, puedes cargar archivos de entrada con cadenas y archivos de expresiones regulares, y ver el procesamiento de las cadenas en tiempo real, tal como lo harías en la aplicación completa.

### Requisitos

- **Node.js** (versión 12 o superior)
- **Angular CLI** (versión 12 o superior)

### Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/clasificador-cadenas.git
   ```

2. **Instalar las dependencias**:
   Desde la carpeta raíz del proyecto, ejecutar:
   ```bash
   npm install
   ```

### Ejecución del Proyecto

1. **Iniciar el servidor de desarrollo**:
   ```bash
   ng serve
   ```

2. **Abrir en el navegador**:
   Abrir la aplicación en el navegador accediendo a la URL:
   ```
   http://localhost:4200
   ```

### Uso

1. **Cargar archivo de cadenas**:
   - Hacer clic en el botón "Seleccionar archivo de cadenas" y cargar un archivo de texto donde cada línea es una cadena a evaluar.

2. **Cargar archivo de expresiones regulares**:
   - Hacer clic en el botón "Seleccionar archivo de expresiones" y cargar un archivo de texto que contenga expresiones regulares en el formato:
     ```
     nombreExpresión=expresión_regular
     ```

3. **Procesar cadenas**:
   - Hacer clic en el botón "Procesar" para validar las cadenas cargadas. El sistema generará un archivo de salida que contiene el resultado del análisis, indicando si una cadena coincide con alguna expresión regular o si contiene un error.

4. **Descargar archivo de salida**:
   - El archivo generado (`Salida.txt`) se descargará automáticamente una vez finalizado el procesamiento.

### Estructura del Proyecto

- **src/app/app.component.ts**: Componente principal donde se encuentra la lógica de la aplicación.
- **src/app/interfaces/regex.interface.ts**: Define la interfaz para las expresiones regulares.
- **src/assets**: Carpeta donde se pueden colocar archivos adicionales como ejemplos de entrada y expresiones.

### Dependencias Principales

- **Angular**: Framework principal de la aplicación.
- **Angular Material**: Usado para la interfaz y las notificaciones al usuario.
- **FileReader API**: Para la lectura de los archivos cargados por el usuario.
- **Blob API**: Para la generación y descarga del archivo de salida.

### Ejemplos de Archivos

**Entrada.txt**:
```
11/01/2017
9/09/2017
09/09/2017
Texto no válido
```

**Expresiones.txt**:
```
FECHA_CORTA_NUMEROS=\d{1,2}/\d{1,2}/\d{4}
CADENA_ALFABETICA=[A-Za-z]+
```

### Resultado esperado en el archivo de salida

**Salida.txt**:
```
11/01/2017 - FECHA_CORTA_NUMEROS
9/09/2017 - FECHA_CORTA_NUMEROS
09/09/2017 - FECHA_CORTA_NUMEROS
Texto no válido - ERROR
```

### Contribución

Si deseas contribuir a este proyecto, puedes hacer un *fork* del repositorio, realizar tus cambios y enviar un *pull request*.
