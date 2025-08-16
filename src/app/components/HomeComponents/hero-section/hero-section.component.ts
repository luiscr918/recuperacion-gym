import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent {
  scrollY = 0;
  isVisible = false;
  currentTextIndex = 0;
  typewriterText = '';
  isTyping = false;

  heroTexts = [
    'PONTE EN FORMA HOY',
    'TRANSFORMA TU VIDA',
    'SUPERA TUS LÍMITES',
    'ALCANZA TUS METAS',
  ];

  stats = [
    { number: 500, label: 'Miembros Activos', suffix: '+', current: 0 },
    { number: 3, label: 'Años de Experiencia', suffix: '+', current: 0 },
    {
      number: 2,
      label: 'Horas Disponibles',
      suffix: 'horarios flexibles',
      current: 0,
    },
    { number: 95, label: 'Satisfacción', suffix: '%', current: 0 },
  ];

  private typewriterInterval: any;
  private statsInterval: any;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.scrollY = window.pageYOffset;
  }

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = true;
    }, 300);
    this.startTypewriter();
    this.animateStats();
  }

  ngOnDestroy() {
    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
    }
    if (this.statsInterval) {
      clearInterval(this.statsInterval);
    }
  }

  startTypewriter() {
    this.isTyping = true;
    const currentText = this.heroTexts[this.currentTextIndex];
    let charIndex = 0;

    this.typewriterInterval = setInterval(() => {
      if (charIndex < currentText.length) {
        this.typewriterText += currentText[charIndex];
        charIndex++;
      } else {
        setTimeout(() => {
          this.clearAndNext();
        }, 2000);
        clearInterval(this.typewriterInterval);
      }
    }, 100);
  }

  clearAndNext() {
    let currentLength = this.typewriterText.length;
    const clearTimerInterval = setInterval(() => {
      if (currentLength > 0) {
        this.typewriterText = this.typewriterText.slice(0, -1);
        currentLength--;
      } else {
        clearInterval(clearTimerInterval);
        this.currentTextIndex =
          (this.currentTextIndex + 1) % this.heroTexts.length;
        setTimeout(() => {
          this.startTypewriter();
        }, 500);
      }
    }, 50);
  }

  animateStats() {
    this.stats.forEach((stat, index) => {
      setTimeout(() => {
        const duration = 2000;
        const steps = 60;
        const increment = stat.number / steps;
        let current = 0;

        const counter = setInterval(() => {
          current += increment;
          if (current >= stat.number) {
            stat.current = stat.number;
            clearInterval(counter);
          } else {
            stat.current = Math.floor(current);
          }
        }, duration / steps);
      }, index * 200);
    });
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
