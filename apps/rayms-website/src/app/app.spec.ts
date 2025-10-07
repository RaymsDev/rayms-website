import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { HomeComponent } from './components/home/home.component';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, HomeComponent],
    }).compileComponents();
  });

  it('should have correct title in meta tag', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const titleElement = document.querySelector('title');
    expect(titleElement?.textContent).toContain('Rayms Lab');
  });

  it('should create the app component', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have default title property', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app['title']).toBe('rayms-website');
  });

  it('should initialize with showRouteNavigator as false', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app['showRouteNavigator']).toBe(false);
  });

  it('should toggle route navigator visibility', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app['showRouteNavigator']).toBe(false);
    app.toggleRouteNavigator();
    expect(app['showRouteNavigator']).toBe(true);
    app.toggleRouteNavigator();
    expect(app['showRouteNavigator']).toBe(false);
  });
});
