import { Component } from '@angular/core';
import { RegexInterface } from './interfaces/regex.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  nameFileEntrada?: string;
  nameFileExpresiones?: string;

  cadenas: string[] = [];
  expresiones: RegexInterface[] = [];
  results: string[] = [];



  onFileSelectedExpresion(event: any) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    this.expresiones = [];


    if (file) {

      this.nameFileExpresiones = file.name;

      const reader = new FileReader();

      reader.onload = (e: any) => {
        try {

          const fileContent = e.target.result;

          // Divide el contenido del archivo en un arreglo por cada línea
          const lines = fileContent.split('\n');


          // Procesa cada línea del archivo
          lines.forEach((line: { split: (arg0: string) => { (): any; new(): any; map: { (arg0: (part: any) => any): [any, any]; new(): any; }; }; }) => {
            const [name, pattern] = line.split('=').map(part => part.trim());
            if (name && pattern) {
              // Elimina las comillas dobles del patrón si están presentes
              const cleanPattern = pattern.replace(/"/g, '').trim();

              // Agrega el objeto a la lista
              this.expresiones.push({ name, pattern: cleanPattern });
            }
          });


          console.log(this.expresiones);


          // Procesa el archivo aquí
        } catch (error) {
          console.error('Error al leer el archivo', error);
        }
      };
      reader.readAsText(file);
    }

    // Reinicia el input de archivo para permitir volver a seleccionar el mismo archivo
    fileInput.value = ''; // Esta línea es clave para resolver tu problema
  }


  onFileSelectedEntrada(event: any) {

    this.cadenas = [];
    const fileInput = event.target;
    const file = fileInput.files[0];
    if (file) {

      this.nameFileEntrada = file.name;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const fileContent = e.target.result;

          // Divide el contenido del archivo en un arreglo por cada línea
          this.cadenas = fileContent.split('\n');


          console.log(this.cadenas);

        } catch (error) {
          console.error('Error al leer el archivo', error);
        }
      };
      reader.readAsText(file);
    }

    // Reinicia el input de archivo para permitir volver a seleccionar el mismo archivo
    fileInput.value = ''; // Esta línea es clave para resolver tu problema
  }



  // Esta función evalúa cada string con las expresiones regulares y genera el archivo de salida
  validateStr() {

    this.cadenas.forEach(str => {
      let matched = false;
  
      for (const regex of this.expresiones) {
        // Validar la expresión regular antes de usarla
        if (this.isValidRegex(regex.pattern)) {
          const pattern = new RegExp(regex.pattern);
  
          // Si la expresión regular coincide con el string
          if (pattern.test(str)) {
            this.results.push(`${str} - ${regex.name}`);
            matched = true;
            break;  // Deja de comprobar con más expresiones si ya encontró una coincidencia
          }
        }
      }
  
      // Si ninguna expresión regular coincide o es válida, marcar como ERROR
      if (!matched) {
        this.results.push(`${str} - ERROR`);
      }
    });


    const blob = new Blob([this.results.join('\n')], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultados.txt';  // Nombre del archivo de salida
    a.click();
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
