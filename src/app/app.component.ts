import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  
  onFileSelectedExpresion(event: any) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          console.log(e.target.result);
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

  
  onFileSelectedCarga(event: any) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          console.log(e.target.result);
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
  
  
}
