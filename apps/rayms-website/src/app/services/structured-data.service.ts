import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { siteConfig } from '../config/site.config';

@Injectable({
  providedIn: 'root',
})
export class StructuredDataService {
  private document = inject(DOCUMENT);

  addStructuredData(data: Record<string, unknown>) {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  addEventStructuredData() {
    const eventData = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: 'Expedition 33',
      description:
        "À l'heure où j'écris ces lignes, je n'ai encore que 32 ans... Rejoignez avec moi l'expedition 33 pour une aventure interactive exclusive pleine de mystères et de souvenirs inoubliables.",
      url: `${siteConfig.url}/expedition-33`,
      image: siteConfig.ogImage,
      organizer: {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
      },
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    };

    this.addStructuredData(eventData);
  }

  addHalloweenLunchStructuredData() {
    const eventData = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: 'Déjeuner Déguisé Horreur',
      description:
        "Officiellement, je n'ai encore que 35 ans... Rejoignez-moi pour un déjeuner déguisé sur le thème de l'horreur, le 31 octobre 2026 à midi.",
      url: `${siteConfig.url}/halloween-lunch`,
      image: `${siteConfig.url}/invitations/haunted_house.jpg`,
      organizer: {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
      },
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      startDate: '2026-10-31T12:00:00+01:00',
    };

    this.addStructuredData(eventData);
  }
}
