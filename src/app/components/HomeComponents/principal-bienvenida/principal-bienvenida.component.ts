import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
interface Stat {
  number: number;
  suffix: string;
  label: string;
  current: number;
  icon: string;
  color: string;
}

interface Feature {
  title: string;
  description: string;
  icon: string;
  isVisible: boolean;
}
@Component({
  selector: 'app-principal-bienvenida',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './principal-bienvenida.component.html',
  styleUrl: './principal-bienvenida.component.css'
})
export class PrincipalBienvenidaComponent implements OnInit, AfterViewInit  {
@ViewChild('sectionRef', { static: false }) sectionRef!: ElementRef;
  
  isVisible = false;
  titleVisible = false;
  contentVisible = false;
  statsVisible = false;
  featuresVisible = false;

  stats: Stat[] = [
    {
      number: 27,
      suffix: '',
      label: 'Máquinas de Cardio',
      current: 0,
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      color: 'from-orange-500 to-orange-600'
    },
    {
      number: 43,
      suffix: '',
      label: 'Estaciones de Peso Libre',
      current: 0,
      icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
      color: 'from-orange-600 to-orange-700'
    },
    {
      number: 7,
      suffix: '',
      label: 'Equipos Bio-Fuerza',
      current: 0,
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'from-orange-400 to-orange-600'
    },
    {
      number: 15,
      suffix: '+',
      label: 'Años de Experiencia',
      current: 0,
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'from-orange-500 to-orange-800'
    }
  ];

  features: Feature[] = [
    {
      title: 'Entrenamiento Personalizado',
      description: 'Rutinas diseñadas específicamente para tus objetivos',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      isVisible: false
    },
    {
      title: 'Ambiente Motivador',
      description: 'Un espacio donde te sentirás inspirado cada día',
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      isVisible: false
    },
    {
      title: 'Resultados Garantizados',
      description: 'Te acompañamos hasta alcanzar tus metas más ambiciosas',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      isVisible: false
    }
  ];

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = true;
      this.startAnimationSequence();
    }, 300);
  }

  ngAfterViewInit() {
    this.observeSection();
  }

  observeSection() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateStats();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (this.sectionRef) {
      observer.observe(this.sectionRef.nativeElement);
    }
  }

  startAnimationSequence() {
    setTimeout(() => this.titleVisible = true, 200);
    setTimeout(() => this.contentVisible = true, 600);
    setTimeout(() => this.statsVisible = true, 1000);
    setTimeout(() => this.animateFeatures(), 1400);
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

  animateFeatures() {
    this.featuresVisible = true;
    this.features.forEach((feature, index) => {
      setTimeout(() => {
        feature.isVisible = true;
      }, index * 300);
    });
  }
}
