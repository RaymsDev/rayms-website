// scenario.component.ts
// Displays the full one-shot scenario with interactive boss HP tracker.

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CampaignService, Scenario, Character } from '../../services/campaign.service';

@Component({
  selector: 'lib-scenario',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss'],
})
export class ScenarioComponent implements OnInit {

  private campaignService = inject(CampaignService);

  scenario?: Scenario;
  characters: Character[] = [];

  // Boss HP tracking
  bossMaxHp = 27;
  bossCurrentHp = 27;
  bossHpBubbles: number[] = Array(27).fill(0);

  ngOnInit(): void {
    this.scenario = this.campaignService.getScenario();
    this.characters = this.campaignService.getCharacters();
    this.bossMaxHp = this.scenario.boss.hitPoints;
    this.bossCurrentHp = this.bossMaxHp;
    this.bossHpBubbles = Array(this.bossMaxHp).fill(0);
  }

  toggleBossHp(index: number): void {
    this.bossCurrentHp = index < this.bossCurrentHp ? index : index + 1;
  }

  isBossBubbleFilled(index: number): boolean {
    return index < this.bossCurrentHp;
  }
}
