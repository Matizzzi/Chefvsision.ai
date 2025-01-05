import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular'; // Importa AlertController
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import 'bootstrap'; // Importa Bootstrap JS para usar los componentes de Bootstrap
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [IonicModule], // Importa IonicModule
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Permite componentes personalizados
})
export class PrincipalPage implements OnInit {
  
  constructor(private alertController: AlertController) {}

  ngOnInit() {
    // Aquí aseguramos que el carrusel funcione automáticamente al cargar la página
    const myCarousel = document.querySelector('#recipeCarousel') as any;
    new bootstrap.Carousel(myCarousel, {
      interval: 3000, // Intervalo de 3 segundos
      ride: 'carousel',
    });
  }

  /**
   * Toma una foto utilizando la cámara del dispositivo.
   */
  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      console.log('Photo taken:', image);
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  }

  /**
   * Muestra un modal de ayuda con información sobre las funciones clave de la app.
   */
  async showHelp() {
    const alert = await this.alertController.create({
      header: 'Funciones Clave',
      message: `
        <ul>
          <li><strong>Inicio:</strong> Explora recetas ya listas.</li>
          <li><strong>Escanear:</strong> Sube una foto para identificar ingredientes.</li>
          <li><strong>Configuración:</strong> Personaliza la app a tus preferencias.</li>
        </ul>
      `,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
