
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MetaService } from './services/meta.service';
import { StructuredDataService } from './services/structured-data.service';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'rayms-website';
  protected showRouteNavigator = false;
  protected availableRoutes: string[] = [];
  private router = inject(Router);
  private metaService = inject(MetaService);
  private structuredDataService = inject(StructuredDataService);

  private readonly hiddenRoutes = ['bibou-birthday'];

  // Mobile secret access properties
  private tapCount = 0;
  private tapTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly REQUIRED_TAPS = 5;
  private readonly TAP_TIMEOUT = 2000; // 2 seconds

  constructor() {
    this.loadAvailableRoutes();
  }

  ngOnInit() {
    // Set default meta tags for home page
    this.metaService.setHomeMeta();

    // Listen to route changes to update meta tags
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateMetaForRoute(event.url);
      });
  }

  private updateMetaForRoute(url: string) {
    if (url.includes('expedition-33')) {
      this.metaService.setExpedition33Meta();
      this.structuredDataService.addEventStructuredData();
    } else if (url.includes('bibou-birthday')) {
      this.metaService.setBibouBirthdayMeta();
    } else {
      this.metaService.setHomeMeta();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Ctrl + Shift + R to open the route navigator
    if (
      event.ctrlKey &&
      event.shiftKey &&
      (event.key === 'R' || event.key === 'r' || event.code === 'KeyR')
    ) {
      event.preventDefault();
      event.stopPropagation();
      this.toggleRouteNavigator();
    }
    // ESC to close
    if (event.key === 'Escape') {
      this.showRouteNavigator = false;
    }
  }

  private loadAvailableRoutes() {
    // Get all configured routes
    const routes = this.router.config;
    this.availableRoutes = routes
      .filter((route) => route.path && route.path !== '**' && !this.hiddenRoutes.includes(route.path)) // Exclude wildcard and hidden routes
      .map((route) => route.path as string)
      .filter((path) => path.trim() !== ''); // Exclude empty paths

    // Add root route if not present
    if (!this.availableRoutes.includes('')) {
      this.availableRoutes.unshift('/ (home)');
    }
  }

  public toggleRouteNavigator() {
    this.showRouteNavigator = !this.showRouteNavigator;
  }

  protected navigateToRoute(route: string) {
    const path = route === '/ (home)' ? '/' : `/${route}`;
    this.router.navigate([path]);
    this.showRouteNavigator = false;
  }

  // Mobile secret access: 5 quick taps on the top-left corner
  protected onSecretAreaTap(event: Event) {
    event.preventDefault();
    this.tapCount++;

    // Clear existing timer
    if (this.tapTimer) {
      clearTimeout(this.tapTimer);
    }

    // If we reached the required number of taps, show the navigator
    if (this.tapCount >= this.REQUIRED_TAPS) {
      this.tapCount = 0;
      this.toggleRouteNavigator();
      return;
    }

    // Reset tap count after timeout
    this.tapTimer = setTimeout(() => {
      this.tapCount = 0;
    }, this.TAP_TIMEOUT);
  }
}
