import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouterDebugService {
  private router = inject(Router);

  constructor() {
    this.setupRouterLogging();
  }

  private setupRouterLogging() {
    // Log navigation start
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        console.log('🚀 Navigation Start:', event.url);
      });

    // Log navigation end
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        console.log('✅ Navigation End:', event.url);
        console.log('Current Route Config:', this.router.config);
      });
  }
}
