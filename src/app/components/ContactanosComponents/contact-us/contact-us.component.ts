import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  // codigo para animacion de el titulo

  ngAfterViewInit(): void {
    // El código del script se coloca aquí dentro
    const words = [
      'Contactos',
      'Transforma tu cuerpo, supera tus límites',
      'Entrena con pasión, entrena con nosotros',
    ];
    let i = 0;
    let j = 0;
    let currentWord = '';
    let isDeleting = false;

    const type = () => {
      currentWord = words[i];
      if (isDeleting) {
        document.getElementById('typewriter')!.textContent =
          currentWord.substring(0, j - 1);
        j--;
        if (j === 0) {
          isDeleting = false;
          i++;
          if (i === words.length) {
            i = 0;
          }
        }
      } else {
        document.getElementById('typewriter')!.textContent =
          currentWord.substring(0, j + 1);
        j++;
        if (j === currentWord.length) {
          isDeleting = true;
        }
      }
      setTimeout(type, 100);
    };

    type();
  }
}
