import { TestBed } from '@angular/core/testing';
import { HalloweenLunch } from './halloween-lunch';

describe('HalloweenLunch', () => {
  let windowOpenSpy: ReturnType<typeof vi.spyOn>;
  let userAgentSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    userAgentSpy = vi.spyOn(window.navigator, 'userAgent', 'get');
  });

  afterEach(() => {
    windowOpenSpy.mockRestore();
    userAgentSpy.mockRestore();
  });

  it('creates without error', () => {
    const fixture = TestBed.createComponent(HalloweenLunch);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders without console errors on a basic mount', () => {
    const errorSpy = vi.spyOn(console, 'error');
    const fixture = TestBed.createComponent(HalloweenLunch);
    fixture.detectChanges();
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('openGoogleMaps() opens the expected Maps URL for the address', () => {
    const fixture = TestBed.createComponent(HalloweenLunch);
    fixture.componentInstance.openGoogleMaps();

    expect(windowOpenSpy).toHaveBeenCalledWith(
      'https://maps.google.com/maps?q=3+chemin+d%27En+Fournes,+81470+Cambon-lès-Lavaur',
      '_blank'
    );
  });

  it('addToCalendar() generates a Google Calendar TEMPLATE URL containing the Oct 31 2026 date', () => {
    const fixture = TestBed.createComponent(HalloweenLunch);
    fixture.componentInstance.addToCalendar();

    expect(windowOpenSpy).toHaveBeenCalledTimes(1);
    const [url] = windowOpenSpy.mock.calls[0] as [string];
    expect(url).toContain('https://calendar.google.com/calendar/render?action=TEMPLATE');
    expect(url).toContain('20261031');
  });

  describe.each([['oui'], ['non'], ['peut-etre']] as const)(
    'RSVP response "%s"',
    (response) => {
      it('onRsvpMail() opens a mailto: URL with the response in uppercase', () => {
        const fixture = TestBed.createComponent(HalloweenLunch);
        fixture.componentInstance.onRsvpMail(response);

        expect(windowOpenSpy).toHaveBeenCalledTimes(1);
        const [url] = windowOpenSpy.mock.calls[0] as [string];
        expect(url).toContain('mailto:remy.laffuge@gmail.com');
        const decoded = decodeURIComponent(url);
        expect(decoded).toContain(response.toUpperCase());
      });

      it('onRsvpSms() opens an sms: URL with the reconstructed phone and a prefilled body', () => {
        userAgentSpy.mockReturnValue(
          'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)'
        );
        const fixture = TestBed.createComponent(HalloweenLunch);
        fixture.componentInstance.onRsvpSms(response);

        expect(windowOpenSpy).toHaveBeenCalledTimes(1);
        const [url] = windowOpenSpy.mock.calls[0] as [string];
        expect(url).toContain('sms:+33682447643');
        expect(url).toContain('body=');
      });
    }
  );

  it('uses the "&" separator for the SMS link when the platform is not detected as Android', () => {
    userAgentSpy.mockReturnValue(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)'
    );
    const fixture = TestBed.createComponent(HalloweenLunch);
    fixture.componentInstance.onRsvpSms('oui');

    const [url] = windowOpenSpy.mock.calls[0] as [string];
    expect(url).toContain('sms:+33682447643&body=');
  });

  it('uses the "?" separator for the SMS link when the platform is detected as Android', () => {
    userAgentSpy.mockReturnValue(
      'Mozilla/5.0 (Linux; Android 14; Pixel 8)'
    );
    const fixture = TestBed.createComponent(HalloweenLunch);
    fixture.componentInstance.onRsvpSms('oui');

    const [url] = windowOpenSpy.mock.calls[0] as [string];
    expect(url).toContain('sms:+33682447643?body=');
  });

  it('never renders the raw phone number literal in the rendered HTML template', () => {
    const fixture = TestBed.createComponent(HalloweenLunch);
    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML).not.toContain('+33682447643');
  });

  it('openCosplayIdeas() / openInstagramCosplay() open generic horror search URLs (no franchise name)', () => {
    const fixture = TestBed.createComponent(HalloweenLunch);

    fixture.componentInstance.openCosplayIdeas();
    fixture.componentInstance.openInstagramCosplay();

    expect(windowOpenSpy).toHaveBeenCalledTimes(2);
    const [pinterestUrl] = windowOpenSpy.mock.calls[0] as [string];
    const [instagramUrl] = windowOpenSpy.mock.calls[1] as [string];
    expect(pinterestUrl.toLowerCase()).not.toMatch(/expedition|claire.?obscure/);
    expect(instagramUrl.toLowerCase()).not.toMatch(/expedition|claire.?obscure/);
  });
});
