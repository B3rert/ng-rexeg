import { Component } from '@angular/core';
import { RegexInterface } from './interfaces/regex.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  nameFileEntrada?:string;
  nameFileExpresiones?:string;

  cadenas :string[] =[];
  expresiones : RegexInterface[] = [];

  
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
  

  validateStr()
  {
    
  }
  
}
