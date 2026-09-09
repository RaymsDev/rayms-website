import { TestBed } from '@angular/core/testing';
import { BibouBirthday } from './bibou-birthday';

describe('BibouBirthday', () => {
  let windowOpenSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
  });

  afterEach(() => {
    windowOpenSpy.mockRestore();
  });

  it('onRsvp("oui") opens a Gmail web-compose URL containing the contact email', () => {
    const fixture = TestBed.createComponent(BibouBirthday);
    const component = fixture.componentInstance;

    component.onRsvp('oui');

    expect(windowOpenSpy).toHaveBeenCalledTimes(1);
    const [url] = windowOpenSpy.mock.calls[0] as [string];
    expect(url).toContain('https://mail.google.com/mail/?view=cm&fs=1&to=');
    expect(url).toContain('remy.laffuge%40gmail.com');
  });

  it('addToCalendar() includes the contact email in the event description', () => {
    const fixture = TestBed.createComponent(BibouBirthday);
    const component = fixture.componentInstance;

    component.addToCalendar();

    expect(windowOpenSpy).toHaveBeenCalledTimes(1);
    const [url] = windowOpenSpy.mock.calls[0] as [string];
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain('remy.laffuge@gmail.com');
  });

  it('sendSms() still shows the unchanged placeholder alert, not wired to ContactService.getPhone()', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => undefined);
    const fixture = TestBed.createComponent(BibouBirthday);
    const component = fixture.componentInstance;

    component.sendSms();

    expect(alertSpy).toHaveBeenCalledWith(
      '🚫 Mon numéro sur un site public ?! Certainement pas !\n\nLes vrais copains ont déjà mon numéro 😄'
    );
    alertSpy.mockRestore();
  });
});
