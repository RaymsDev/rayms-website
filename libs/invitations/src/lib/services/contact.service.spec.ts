import { TestBed } from '@angular/core/testing';
import { ContactService } from './contact.service';

describe('ContactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('getEmail() returns the exact contact email', () => {
    const service = TestBed.inject(ContactService);
    expect(service.getEmail()).toBe('remy.laffuge@gmail.com');
  });

  it('getPhone() returns a +33 number with 9 digits and no separators', () => {
    const service = TestBed.inject(ContactService);
    expect(service.getPhone()).toMatch(/^\+33\d{9}$/);
  });

  it('does not embed the raw phone number as a single literal in the compiled source', () => {
    // The reconstruction must depend on concatenating fragments rather than
    // one directly-readable constant equal to the final number.
    const fileContent = ContactService.toString();
    expect(fileContent).not.toContain('+33682447643');
  });

  it('resolves as a singleton', () => {
    const first = TestBed.inject(ContactService);
    const second = TestBed.inject(ContactService);
    expect(first).toBe(second);
  });
});
