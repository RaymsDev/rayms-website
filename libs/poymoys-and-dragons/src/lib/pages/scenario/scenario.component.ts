// scenario.component.ts
// Displays the full one-shot scenario with interactive boss HP tracker.

import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CampaignService, Scenario, Character } from '../../services/campaign.service';

@Component({
  selector: 'lib-scenario',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './scenario.component.html',
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- pre-existing component kept on its original (pre-Angular-22 default) change detection strategy by the Angular 22 migration; not switching to OnPush here to avoid a behavioral change to rendering (out of scope for this dependency migration)
  changeDetection: ChangeDetectionStrategy.Eager,
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
