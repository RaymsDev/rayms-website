import { Injectable } from '@angular/core';

/**
 * Provides the site owner's contact details in obfuscated form, to deter
 * automated scraping (spam email / spam calls) without changing what is
 * actually shown to a human visitor.
 *
 * Email is base64-encoded (existing pattern, migrated here from the
 * per-component duplication in expedition-33 and bibou-birthday).
 * Phone is reconstructed from string fragments rather than base64 — a
 * distinct-but-equivalent deterrence, not a stronger guarantee: both remain
 * reversible by a determined human reading the compiled bundle.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly emailFragment = 'cmVteS5sYWZmdWdlQGdtYWlsLmNvbQ==';

  private readonly phoneFragments = ['+33', '68', '24', '47', '643'];

  getEmail(): string {
    return atob(this.emailFragment);
  }

  getPhone(): string {
    return this.phoneFragments.join('');
  }
}
