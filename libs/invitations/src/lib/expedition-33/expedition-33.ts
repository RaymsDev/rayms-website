import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-expedition-33',
  imports: [],
  templateUrl: './expedition-33.html',
  styleUrl: './expedition-33.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Expedition33 {
  partyDate = '1 novembre 2025';
  partyTime = '12h00';
  address = `3 chemin d'En Fournes, 81470 Cambon-lès-Lavaur`;
  emailAddress = 'remy.laffuge@gmail.com';

  googleMapsLink =
    'https://maps.google.com/maps?q=3+chemin+d%27En+Fournes,+81470+Cambon-lès-Lavaur';

  pinterestCosplayLink =
    'https://pinterest.com/search/pins/?q=expedition%2033%20claire%20obscure%20cosplay';

  // Lien Instagram pour les idées cosplay
  instagramCosplayLink =
    'https://www.instagram.com/explore/tags/expedition33cosplay/';

  onRsvp(response: 'oui' | 'non' | 'peut-etre') {
    const subject = encodeURIComponent(
      `Réponse Invitation - Expédition 33 Birthday Party`
    );
    const body = encodeURIComponent(`
Bonjour,

Je réponds à ton invitation pour la soirée d'anniversaire sur le thème d'Expedition 33 Claire Obscure du ${
      this.partyDate
    }.

Ma réponse : ${response.toUpperCase()}

${
  response === 'oui'
    ? "J'ai hâte de célébrer avec toi dans l'univers mystérieux d'Expedition 33 !"
    : ''
}

Nom : [Votre nom]
Nombre de personnes : [Précisez si vous venez accompagné(e)]

Cordialement
    `);

    window.open(`mailto:${this.emailAddress}?subject=${subject}&body=${body}`);
  }

  openGoogleMaps() {
    window.open(this.googleMapsLink, '_blank');
  }

  openCosplayIdeas() {
    window.open(this.pinterestCosplayLink, '_blank');
  }

  openInstagramCosplay() {
    window.open(this.instagramCosplayLink, '_blank');
  }

  addToCalendar() {
    const startDate = new Date('2025-11-01T12:00:00');
    const endDate = new Date('2025-11-01T20:00:00');

    const eventDetails = {
      title: 'Anniversaire Expedition 33 - Claire Obscure',
      description: `Déjeuner d'anniversaire sur le thème d'Expedition 33 Claire Obscure. Venez déguisés ! 🎭🎂\n\nAdresse: ${this.address}\n\nContact: ${this.emailAddress}`,
      location: this.address,
      start: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
    };

    // Création du lien Google Calendar
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventDetails.title
    )}&dates=${eventDetails.start}/${
      eventDetails.end
    }&details=${encodeURIComponent(
      eventDetails.description
    )}&location=${encodeURIComponent(eventDetails.location)}`;

    window.open(googleCalendarUrl, '_blank');
  }
}
