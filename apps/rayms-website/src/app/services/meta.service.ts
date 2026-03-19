import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { siteConfig } from '../config/site.config';

export interface PageMeta {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private meta = inject(Meta);
  private title = inject(Title);

  updatePageMeta(pageMeta: PageMeta) {
    // Update title
    this.title.setTitle(pageMeta.title);

    // Update basic meta tags
    this.meta.updateTag({ name: 'description', content: pageMeta.description });

    // Update Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: pageMeta.title });
    this.meta.updateTag({
      property: 'og:description',
      content: pageMeta.description,
    });
    this.meta.updateTag({
      property: 'og:type',
      content: pageMeta.type || 'website',
    });

    if (pageMeta.url) {
      this.meta.updateTag({ property: 'og:url', content: pageMeta.url });
      this.meta.updateTag({ property: 'twitter:url', content: pageMeta.url });
      this.meta.updateTag({ rel: 'canonical', href: pageMeta.url });
    }

    if (pageMeta.image) {
      this.meta.updateTag({ property: 'og:image', content: pageMeta.image });
      this.meta.updateTag({
        property: 'twitter:image',
        content: pageMeta.image,
      });
    }

    // Update Twitter tags
    this.meta.updateTag({ property: 'twitter:title', content: pageMeta.title });
    this.meta.updateTag({
      property: 'twitter:description',
      content: pageMeta.description,
    });
  }

  // Predefined meta for different pages
  setHomeMeta() {
    this.updatePageMeta({
      title: `${siteConfig.name} - Interactive Adventures & Expeditions`,
      description: siteConfig.description,
      image: siteConfig.ogImage,
      url: siteConfig.url,
      type: 'website',
    });
  }

  setBibouBirthdayMeta() {
    this.updatePageMeta({
      title: `Anniversaire Surprise de Laura 🎂 - ${siteConfig.name}`,
      description: `Tu es invité(e) à la fête d'anniversaire surprise de Laura ! Le 3 mai à midi. RSVP vite !`,
      url: `${siteConfig.url}/bibou-birthday`,
      type: 'website',
    });
  }

  setExpedition33Meta() {
    this.updatePageMeta({
      title: `Expedition 33 - ${siteConfig.name}`,
      description: `À l'heure où j'écris ces lignes, je n'ai encore que 32 ans... Rejoignez avec moi l'expedition 33 pour une aventure interactive exclusive pleine de mystères et de souvenirs inoubliables.`,
      image: siteConfig.ogImage,
      url: `${siteConfig.url}/expedition-33`,
      type: 'website',
    });
  }
}
