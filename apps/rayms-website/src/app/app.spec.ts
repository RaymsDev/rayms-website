import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { HomeComponent } from './components/home/home.component';
import { MetaService } from './services/meta.service';
import { StructuredDataService } from './services/structured-data.service';
import { appRoutes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, HomeComponent],
      providers: [provideRouter(appRoutes)],
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

  it('includes halloween-lunch in the available (visible) routes', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app['availableRoutes']).toContain('halloween-lunch');
  });

  it('calls setHalloweenLunchMeta and addHalloweenLunchStructuredData for the halloween-lunch route', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const metaService = TestBed.inject(MetaService);
    const structuredDataService = TestBed.inject(StructuredDataService);

    const setHalloweenLunchMetaSpy = vi.spyOn(metaService, 'setHalloweenLunchMeta');
    const addHalloweenLunchStructuredDataSpy = vi.spyOn(
      structuredDataService,
      'addHalloweenLunchStructuredData'
    );
    const addEventStructuredDataSpy = vi.spyOn(structuredDataService, 'addEventStructuredData');

    app['updateMetaForRoute']('/halloween-lunch');

    expect(setHalloweenLunchMetaSpy).toHaveBeenCalled();
    expect(addHalloweenLunchStructuredDataSpy).toHaveBeenCalled();
    expect(addEventStructuredDataSpy).not.toHaveBeenCalled();
  });

  it('still calls only the expedition-33 meta/structured-data for the expedition-33 route (non-regression)', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const metaService = TestBed.inject(MetaService);
    const structuredDataService = TestBed.inject(StructuredDataService);

    const setExpedition33MetaSpy = vi.spyOn(metaService, 'setExpedition33Meta');
    const addEventStructuredDataSpy = vi.spyOn(structuredDataService, 'addEventStructuredData');
    const addHalloweenLunchStructuredDataSpy = vi.spyOn(
      structuredDataService,
      'addHalloweenLunchStructuredData'
    );

    app['updateMetaForRoute']('/expedition-33');

    expect(setExpedition33MetaSpy).toHaveBeenCalled();
    expect(addEventStructuredDataSpy).toHaveBeenCalled();
    expect(addHalloweenLunchStructuredDataSpy).not.toHaveBeenCalled();
  });
});
