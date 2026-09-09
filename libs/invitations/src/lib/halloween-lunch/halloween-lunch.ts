import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContactService } from '../services/contact.service';

type RsvpResponse = 'oui' | 'non' | 'peut-etre';

@Component({
  selector: 'lib-halloween-lunch',
  imports: [],
  templateUrl: './halloween-lunch.html',
  styleUrl: './halloween-lunch.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HalloweenLunch {
  private readonly contactService = inject(ContactService);

  readonly partyDate = 'samedi 31 octobre 2026';
  readonly partyTime = '12h00';
  readonly address = `3 chemin d'En Fournes, 81470 Cambon-lès-Lavaur`;

  private readonly email = this.contactService.getEmail();
  private readonly phone = this.contactService.getPhone();

  readonly googleMapsLink =
    'https://maps.google.com/maps?q=3+chemin+d%27En+Fournes,+81470+Cambon-lès-Lavaur';

  readonly pinterestCosplayLink =
    'https://pinterest.com/search/pins/?q=horror%20costume%20ideas';

  readonly instagramCosplayLink =
    'https://www.instagram.com/explore/tags/halloweencostume/';

  private isAndroid(): boolean {
    const ua =
      typeof navigator !== 'undefined' && navigator.userAgent
        ? navigator.userAgent
        : '';
    return /android/i.test(ua);
  }

  private rsvpMailBody(response: RsvpResponse): string {
    return `
Bonjour,

Je réponds à ton invitation pour le déjeuner déguisé horreur du ${this.partyDate} à ${this.partyTime}.

Ma réponse : ${response.toUpperCase()}

${
  response === 'oui'
    ? "J'ai hâte de venir déguisé(e) affronter les 35 ans qui te hantent désormais ! 🎃"
    : ''
}

Nom : [Votre nom]
Nombre de personnes : [Précisez si vous venez accompagné(e)]

Cordialement
    `;
  }

  private rsvpSmsBody(response: RsvpResponse): string {
    const short: Record<RsvpResponse, string> = {
      oui: `C'est ${response.toUpperCase()} pour le déjeuner déguisé du ${this.partyDate} ! On sera là 🎃`,
      non: `C'est ${response.toUpperCase()} pour le déjeuner déguisé du ${this.partyDate}, dommage !`,
      'peut-etre': `${response.toUpperCase()} pour le déjeuner déguisé du ${this.partyDate}, je confirme bientôt.`,
    };
    return short[response];
  }

  onRsvpMail(response: RsvpResponse) {
    const subject = encodeURIComponent(
      `Réponse Invitation - Déjeuner Halloween`
    );
    const body = encodeURIComponent(this.rsvpMailBody(response));

    window.open(`mailto:${this.email}?subject=${subject}&body=${body}`);
  }

  onRsvpSms(response: RsvpResponse) {
    const separator = this.isAndroid() ? '?' : '&';
    const body = encodeURIComponent(this.rsvpSmsBody(response));

    window.open(`sms:${this.phone}${separator}body=${body}`);
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
    const startDate = new Date('2026-10-31T12:00:00');
    const endDate = new Date('2026-10-31T18:00:00');

    const eventDetails = {
      title: 'Déjeuner déguisé Halloween - 35 ans hantés',
      description: `Déjeuner d'anniversaire déguisé sur le thème de l'horreur. Venez déguisés (les enfants aussi) ! 🎃💀\n\nAdresse: ${this.address}\n\nContact: ${this.email}`,
      location: this.address,
      start: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
    };

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
