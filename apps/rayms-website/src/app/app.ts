import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'rayms-website';
  protected showRouteNavigator = false;
  protected availableRoutes: string[] = [];
  private router = inject(Router);

  // Mobile secret access properties
  private tapCount = 0;
  private tapTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly REQUIRED_TAPS = 5;
  private readonly TAP_TIMEOUT = 2000; // 2 seconds

  constructor() {
    this.loadAvailableRoutes();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Debug: log all key combinations for troubleshooting
    if (event.ctrlKey || event.shiftKey) {
      console.log('Key combination detected:', {
        key: event.key,
        code: event.code,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey,
      });
    }

    // Secret combination: Ctrl + Shift + R or Ctrl + K (more robust check)
    if (
      event.ctrlKey &&
      event.shiftKey &&
      (event.key === 'R' || event.key === 'r' || event.code === 'KeyR')
    ) {
      event.preventDefault();
      event.stopPropagation();
      console.log('Route navigator shortcut triggered!');
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
      .filter((route) => route.path && route.path !== '**') // Exclude wildcard routes
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
