import { Component } from '@angular/core';
import { RegexInterface } from './interfaces/regex.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  nameFileEntrada?: string; ///Nombre archvio de cadenas
  nameFileExpresiones?: string; //Nombre archivo de expresiones

  cadenas: string[] = []; //cadenas que se van a a anlizar (Archivo)
  expresiones: RegexInterface[] = []; //Expresiones que debn utilizarse (Archivo)
  results: string[] = []; //Cadenas procesadas (Archivo de salida)

  constructor(
    private _snackBar: MatSnackBar, //Snack module de Angular Material
  ) {
  }

  //Procesar archivo de expresiones regulares
  onFileSelectedExpresion(event: any) {
    //Archivo seleccionado (Evento)
    const fileInput = event.target;

    //Archivo seleccionado 
    const file = fileInput.files[0];

    //Limpiar lista de expresiones si tiene algo previo
    this.expresiones = [];

    //si se selecciono un archivo
    if (file) {
      //Obtner y asignar nombre del archivo
      this.nameFileExpresiones = file.name;

      //Leer archivo seleccionado
      const reader = new FileReader();

      //Lener contenido del archivo
      reader.onload = (e: any) => {
        try {
          //Contenido del archivo
          const fileContent = e.target.result;

          // Divide el contenido del archivo en un arreglo por cada línea
          const lines = fileContent.split('\n');

          // Procesa cada línea del archivo
          lines.forEach((line: { split: (arg0: string) => { (): any; new(): any; map: { (arg0: (part: any) => any): [any, any]; new(): any; }; }; }) => {
            //dividimos las cadenas a parti de "="
            const [name, pattern] = line.split('=').map(part => part.trim());

            //Si no tiene "=" no se procesa
            if (name && pattern) {
              // Elimina las comillas dobles del patrón si están presentes
              const cleanPattern = pattern.replace(/"/g, '').trim();

              // Agrega el objeto a la lista
              this.expresiones.push({ name, pattern: cleanPattern });
            }
          });

          //Mensaje
          this._snackBar.open("Expresiones cargadas correctamente");


        } catch (error) {
          //En caso de error mostar error
          this._snackBar.open('Error al cargar el archivo');
          console.error('Error al leer el archivo', error);
        }
      };
      reader.readAsText(file);
    }

    // Reinicia el input de archivo para permitir volver a seleccionar el mismo archivo
    fileInput.value = '';
  }

  //Procesar archivo de cadenas a evaluar
  onFileSelectedEntrada(event: any) {

    //limpiar cadenas si existe contenido previo
    this.cadenas = [];

    //Leer archivo (evenbto)
    const fileInput = event.target;
    //Leer archivo
    const file = fileInput.files[0];
    
    //si hay un archivo selecconado leerlo
    if (file) {
      //obtner y asignar nombre del archivo 
      this.nameFileEntrada = file.name;
      //Leer archivo
      const reader = new FileReader();
      
      //leer contenido del arhivo 
      reader.onload = (e: any) => {
        try {
          //obtener contenido del archivo
          const fileContent = e.target.result;

          // Divide el contenido del archivo en un arreglo por cada línea
          this.cadenas = fileContent.split('\n');

          this._snackBar.open("Cadenas cargadas correctamente");


        } catch (error) {
          //en caso de error mostrar mensaje
          this._snackBar.open('Error al cargar el archivo');
          console.error('Error al leer el archivo', error);
        }
      };
      reader.readAsText(file);
    }

    // Reinicia el input de archivo para permitir volver a seleccionar el mismo archivo
    fileInput.value = '';
  }



  // Esta función evalúa cada string con las expresiones regulares y genera el archivo de salida
  validateStr() {

    //recorremos cada cadena encontrada en el archivo "Entrada.txt"
    this.cadenas.forEach(str => {

      //varible para saber si es valuida para una expresion
      let matched = false;

      //recorremos cada expresion regular
      for (const regex of this.expresiones) {
        // Validar la expresión regular antes de usarla, si la sintaxis es correcta
        if (this.isValidRegex(regex.pattern)) {
          // Si la expresión regular es válida, aplicarla a la cadena
          const pattern = new RegExp(regex.pattern);

          // Si la expresión regular coincide con el string
          if (pattern.test(str)) {
            //si coincide, agregar a la lista de cadenas validadas
            this.results.push(`${str} - ${regex.name}`);
            
            //Marca como valida la iteracion
            matched = true;
            break;  // Deja de comprobar con más expresiones si ya encontró una coincidencia
          }
        }
      }

      // Si ninguna expresión regular coincide o es válida, marcar como ERROR
      if (!matched) {
        //Insertar error a la lista de saldia
        this.results.push(`${str} - ERROR`);
      }
    });

    //Crear BLob para el archivp de salida, crea el archivo y une el arreglo de resultados con un salto de linea
    const blob = new Blob([this.results.join('\n')], { type: 'text/plain' });
    //Crea url virtual para descargar el archivo 
    const url = window.URL.createObjectURL(blob);
    //Descargar el archivo
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultados.txt';  // Nombre del archivo de salida
    
    //simula click de descarga
    a.click();

    //Descarga el archivo de la url virtual
    window.URL.revokeObjectURL(url);

  }


  // Esta función valida si una expresión regular es válida
  isValidRegex(pattern: string): boolean {
    try {
      new RegExp(pattern); // Intenta construir la expresión regular
      return true; // Si no arroja error, es válida
    } catch (e) {
      console.error(`Expresión regular inválida: ${pattern}`, e);
      return false; // Si arroja error, no es válida
    }
  }

}
