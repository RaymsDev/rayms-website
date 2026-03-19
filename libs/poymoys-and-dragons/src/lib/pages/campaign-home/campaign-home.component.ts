// campaign-home.component.ts
// Landing page of the D&D campaign module.
// Displays the guild introduction and links to character sheets and scenario.

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CampaignService, Character } from '../../services/campaign.service';

@Component({
  selector: 'lib-campaign-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './campaign-home.component.html',
  styleUrls: ['./campaign-home.component.scss'],
})
export class CampaignHomeComponent implements OnInit {

  private campaignService = inject(CampaignService);

  characters: Character[] = [];

  ngOnInit(): void {
    this.characters = this.campaignService.getCharacters();
  }
}
