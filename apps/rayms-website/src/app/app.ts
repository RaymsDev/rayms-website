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

  constructor() {
    this.loadAvailableRoutes();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Secret combination: Ctrl + Shift + R
    if (event.ctrlKey && event.shiftKey && event.key === 'R') {
      event.preventDefault();
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
}
