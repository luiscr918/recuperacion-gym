import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CompanyValue } from '../../../interfaces/nosotros';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-valores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './valores.component.html',
  styleUrl: './valores.component.css'
})
export class ValoresComponent implements OnInit, AfterViewInit {
@ViewChild('sectionRef', { static: false }) sectionRef!: ElementRef;

  isVisible = false;
  titleVisible = false;
  valuesVisible = false;

  values: CompanyValue[] = [
    {
      id: 1,
      title: 'Excelencia',
      description: 'Buscamos la perfección en cada entrenamiento, servicio y experiencia que ofrecemos a nuestros miembros.',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      id: 2,
      title: 'Comunidad',
      description: 'Creemos en el poder de entrenar juntos, apoyarnos mutuamente y celebrar cada logro como comunidad.',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
    },
    {
      id: 3,
      title: 'Innovación',
      description: 'Adoptamos las últimas tendencias y tecnologías fitness para mantenernos a la vanguardia del entrenamiento.',
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
    },
    {
      id: 4,
      title: 'Integridad',
      description: 'Actuamos con honestidad, transparencia y respeto en todas nuestras relaciones y servicios.',
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
    },
    {
      id: 5,
      title: 'Transformación',
      description: 'Nos comprometemos a ayudar a cada persona a alcanzar su mejor versión física y mental.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z'
    },
    {
      id: 6,
      title: 'Pasión',
      description: 'El fitness es nuestra pasión y esa energía se refleja en cada clase, consejo y motivación que brindamos.',
      icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z'
    }
  ];

  ngOnInit() {
    setTimeout(() => {
      this.startAnimations();
    }, 200);
  }

  ngAfterViewInit() {
    this.observeSection();
  }

  observeSection() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.startAnimations();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (this.sectionRef) {
      observer.observe(this.sectionRef.nativeElement);
    }
  }

  startAnimations() {
    this.isVisible = true;
    setTimeout(() => this.titleVisible = true, 300);
    setTimeout(() => this.valuesVisible = true, 600);
  }
}
