import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'lib-bibou-birthday',
  imports: [],
  templateUrl: './bibou-birthday.html',
  styleUrl: './bibou-birthday.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BibouBirthday implements OnInit {
  private meta = inject(Meta);
  private title = inject(Title);

  ngOnInit() {
    this.title.setTitle('Anniversaire Surprise de Laura 🎂 - Rayms Lab');
    this.meta.updateTag({
      property: 'og:image',
      content: 'https://remy.laffuge.fr/invitations/bibou-birthday-portrait.webp',
    });
    this.meta.updateTag({
      property: 'twitter:image',
      content: 'https://remy.laffuge.fr/invitations/bibou-birthday-portrait.webp',
    });
  }
  partyDate = '3 mai 2026';
  partyTime = '12h00';
  address = `3 chemin d'En Fournes, 81470 Cambon-lès-Lavaur`;
  private readonly emailAddress = atob('cmVteS5sYWZmdWdlQGdtYWlsLmNvbQ==');

  googleMapsLink =
    'https://maps.google.com/maps?q=3+chemin+d%27En+Fournes,+81470+Cambon-lès-Lavaur';

  onRsvp(response: 'oui' | 'non' | 'peut-etre') {
    const subject = encodeURIComponent(
      `Réponse Invitation - Anniversaire Surprise de Laura 🎂`
    );
    const body = encodeURIComponent(`Bonjour,

Je réponds à ton invitation pour la fête d'anniversaire surprise de Laura du ${this.partyDate}.

Ma réponse : ${response.toUpperCase()}

${response === 'oui' ? "On sera là pour faire la fête ! 🎉" : ''}

Nom : [Votre nom]
Nombre de personnes : [Précisez si vous venez accompagné(e)]
${response === 'oui' ? '\nBoissons apportées : [Précisez si vous apportez quelque chose]' : ''}

À bientôt !`);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(this.emailAddress)}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  }

  sendSms() {
    alert(
      "🚫 Mon numéro sur un site public ?! Certainement pas !\n\nLes vrais copains ont déjà mon numéro 😄"
    );
  }

  openGoogleMaps() {
    window.open(this.googleMapsLink, '_blank');
  }

  addToCalendar() {
    const startDate = new Date('2026-05-03T12:00:00');
    const endDate = new Date('2026-05-03T20:00:00');

    const eventDetails = {
      title: 'Anniversaire Surprise de Laura 🎂',
      description: `Fête d'anniversaire surprise pour Laura ! Venez avec vos boissons préférées 🍻🍷\n\nAdresse: ${this.address}\n\nContact: ${this.emailAddress}`,
      location: this.address,
      start: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventDetails.title
    )}&dates=${eventDetails.start}/${eventDetails.end}&details=${encodeURIComponent(
      eventDetails.description
    )}&location=${encodeURIComponent(eventDetails.location)}`;

    window.open(googleCalendarUrl, '_blank');
  }
}
