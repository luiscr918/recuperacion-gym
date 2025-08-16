import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
interface Feature {
  text: string;
  icon: string;
  isVisible: boolean;
}
@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent implements OnInit, AfterViewInit{
@ViewChild('sectionRef', { static: false }) sectionRef!: ElementRef;
  
  isVisible = false; 
  titleVisible = false; 
  subtitleVisible = false; 
  featuresVisible = false; 
  buttonVisible = false; 

  features: Feature[] = [
    {
      text: 'Entrenamientos diseñados para tus objetivos.',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      isVisible: false 
    },
    {
      text: 'Equipamiento de última generación.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      isVisible: false 
    },
    {
      text: 'Guía experta para alcanzar tus metas.',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      isVisible: false 
    },
    {
      text: 'Un espacio donde la motivación nunca falta.',
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      isVisible: false 
    }
  ];

  ngOnInit() {
    
    setTimeout(() => {
      this.startAnimationSequence();
    }, 100);
  }

  ngAfterViewInit() {
    this.observeSection();
  }

  observeSection() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.startAnimationSequence();
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
    
    this.titleVisible = false;
    this.subtitleVisible = false;
    this.featuresVisible = false;
    this.buttonVisible = false;
    this.features.forEach(f => f.isVisible = false);

    
    setTimeout(() => this.titleVisible = true, 100);
    setTimeout(() => this.subtitleVisible = true, 300);
    setTimeout(() => this.featuresVisible = true, 500);
    setTimeout(() => this.animateFeatures(), 700);
    setTimeout(() => this.buttonVisible = true, 1200);
  }

  animateFeatures() {
    this.features.forEach((feature, index) => {
      setTimeout(() => {
        feature.isVisible = true;
      }, index * 150);
    });
  }
}
