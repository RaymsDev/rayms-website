import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <div class="hero">
        <h1>🧪 Welcome to Rayms Lab</h1>
        <p class="tagline">Interactive Adventures & Expeditions</p>
        <p class="description">
          Discover unique digital experiences and explore new worlds through our
          interactive adventures.
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .home-container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        text-align: center;
      }

      .hero {
        max-width: 600px;
      }

      h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
        background: linear-gradient(
          45deg,
          var(--accent),
          var(--secondary),
          var(--primary)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .tagline {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        opacity: 0.9;
      }

      .description {
        font-size: 1.1rem;
        margin-bottom: 2rem;
        opacity: 0.8;
        line-height: 1.6;
      }

      .cta-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }

      .cta-button {
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        display: inline-block;
      }

      .cta-button.primary {
        background: linear-gradient(45deg, var(--accent), var(--primary));
        color: white;
      }

      .cta-button.secondary {
        background: rgba(255, 255, 255, 0.1);
        color: var(--text);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }

      @media (max-width: 768px) {
        h1 {
          font-size: 2rem;
        }

        .cta-buttons {
          flex-direction: column;
          align-items: center;
        }

        .cta-button {
          width: 200px;
        }
      }
    `,
  ],
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- pre-existing component kept on its original (pre-Angular-22 default) change detection strategy by the Angular 22 migration; not switching to OnPush here to avoid a behavioral change to rendering (out of scope for this dependency migration)
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterModule],
})
export class HomeComponent {}
