// character-sheet.component.ts
// Displays a single character's full sheet.
// Handles HP tracking and spell slot toggling via local component state.

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CampaignService, Character } from '../../services/campaign.service';

@Component({
  selector: 'lib-character-sheet',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss'],
})
export class CharacterSheetComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private campaignService = inject(CampaignService);

  character?: Character;

  // HP tracking — number of bubbles currently "filled"
  currentHp = 0;
  hpBubbles: number[] = [];

  // Spell slot tracking — key: section title, value: array of booleans (true = available)
  private slotAvailability: Record<string, boolean[]> = {};

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.character = this.campaignService.getCharacter(id);
        if (this.character) {
          this.initHpTracker();
          this.initSlotTracker();
        }
      }
    });
  }

  // ── HP helpers ────────────────────────────────────────────────

  private initHpTracker(): void {
    if (!this.character) return;
    this.currentHp = this.character.hitPoints;
    this.hpBubbles = Array(this.character.hitPoints).fill(0);
  }

  /**
   * Click on bubble at index:
   * - If filled → drain from that bubble onward
   * - If empty  → fill up to and including that bubble
   */
  toggleHp(index: number): void {
    this.currentHp = index < this.currentHp ? index : index + 1;
  }

  isBubbleFilled(index: number): boolean {
    return index < this.currentHp;
  }

  // ── Spell slot helpers ────────────────────────────────────────

  private initSlotTracker(): void {
    this.slotAvailability = {};
    this.character?.spellSections?.forEach(section => {
      if (section.slots) {
        // true = slot is available; false = slot has been used
        this.slotAvailability[section.title] = Array(section.slots).fill(true);
      }
    });
  }

  /** Returns an array of length `count` to drive *ngFor */
  getSlotRange(count: number): number[] {
    return Array(count).fill(0);
  }

  isSlotAvailable(sectionTitle: string, index: number): boolean {
    return this.slotAvailability[sectionTitle]?.[index] ?? true;
  }

  toggleSlot(sectionTitle: string, index: number): void {
    if (this.slotAvailability[sectionTitle]) {
      this.slotAvailability[sectionTitle][index] =
        !this.slotAvailability[sectionTitle][index];
    }
  }
}
