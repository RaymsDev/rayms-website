// campaign-home.component.ts
// Landing page of the D&D campaign module.
// Displays the guild introduction and links to character sheets and scenario.

import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CampaignService, Character } from '../../services/campaign.service';

@Component({
  selector: 'lib-campaign-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './campaign-home.component.html',
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- pre-existing component kept on its original (pre-Angular-22 default) change detection strategy by the Angular 22 migration; not switching to OnPush here to avoid a behavioral change to rendering (out of scope for this dependency migration)
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./campaign-home.component.scss'],
})
export class CampaignHomeComponent implements OnInit {

  private campaignService = inject(CampaignService);

  characters: Character[] = [];

  ngOnInit(): void {
    this.characters = this.campaignService.getCharacters();
  }
}
