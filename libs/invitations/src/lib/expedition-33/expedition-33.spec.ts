import { TestBed } from '@angular/core/testing';
import { Expedition33 } from './expedition-33';

describe('Expedition33', () => {
  let windowOpenSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
  });

  afterEach(() => {
    windowOpenSpy.mockRestore();
  });

  it('onRsvp("oui") opens a mailto: URL containing the contact email', () => {
    const fixture = TestBed.createComponent(Expedition33);
    const component = fixture.componentInstance;

    component.onRsvp('oui');

    expect(windowOpenSpy).toHaveBeenCalledTimes(1);
    const [url] = windowOpenSpy.mock.calls[0];
    expect(url).toContain('mailto:remy.laffuge@gmail.com');
  });

  it('addToCalendar() includes the contact email in the event description', () => {
    const fixture = TestBed.createComponent(Expedition33);
    const component = fixture.componentInstance;

    component.addToCalendar();

    expect(windowOpenSpy).toHaveBeenCalledTimes(1);
    const [url] = windowOpenSpy.mock.calls[0] as [string];
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain('remy.laffuge@gmail.com');
  });
});
