import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lib-poymoys-and-dragons',
  imports: [],
  templateUrl: './poymoys-and-dragons.html',
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- pre-existing component kept on its original (pre-Angular-22 default) change detection strategy by the Angular 22 migration; not switching to OnPush here to avoid a behavioral change to rendering (out of scope for this dependency migration)
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './poymoys-and-dragons.scss',
})
export class PoymoysAndDragons {}
