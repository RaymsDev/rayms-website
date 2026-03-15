// campaign.service.ts
// Provides all campaign data: characters and scenario.
// Code and identifiers are in English; display strings are in French.

import { Injectable } from '@angular/core';

// ─────────────────────────────────────────────
// INTERFACES
// ─────────────────────────────────────────────

export interface AbilityScore {
  /** Internal key, e.g. 'strength' */
  key: string;
  /** French display label shown to the user */
  label: string;
  value: number;
  modifier: string;
  isPrimary?: boolean;
}

export interface Spell {
  name: string;
  emoji: string;
  badge: string;
  badgeStyle?: 'default' | 'gold' | 'red' | 'green';
  range?: string;
  damage?: string;
  effect?: string;
  duration?: string;
  description: string;
}

export interface SpellSection {
  /** Display title in French */
  title: string;
  slots?: number;
  slotColor?: string;
  spells: Spell[];
}

export interface CharacterTrait {
  emoji: string;
  name: string;
  description: string;
}

export interface EquipmentItem {
  emoji: string;
  name: string;
  detail?: string;
  isMagical?: boolean;
}

export interface Skill {
  name: string;
  bonus: string;
  isProficient: boolean;
}

export interface SavingThrow {
  label: string;
  value: string;
  isProficient: boolean;
}

export interface RoleplayProfile {
  personality: string;
  ideal: string;
  bond: string;
  flaw: string;
}

export interface PlayerTip {
  emoji: string;
  text: string;
}

export interface CharacterTag {
  label: string;
  style?: 'default' | 'gold' | 'divine' | 'green';
}

export interface Character {
  /** URL-safe identifier, e.g. 'zippi' */
  id: string;
  name: string;
  epithet: string;
  tags: CharacterTag[];
  portrait: string;
  portraitCaption: string;
  race: string;
  characterClass: string;
  alignment: string;
  background: string;
  lore: string;
  abilityScores: AbilityScore[];
  hitPoints: number;
  armorClass: number;
  initiative: string;
  proficiencyBonus: string;
  spellSaveDC?: number;
  spellAttackBonus?: string;
  savingThrows?: SavingThrow[];
  specialTraits?: string[];
  spellSections?: SpellSection[];
  traits: CharacterTrait[];
  equipment: EquipmentItem[];
  skills: Skill[];
  roleplay: RoleplayProfile;
  tips: PlayerTip[];
  /** Controls the visual theme of the character sheet */
  theme: 'parchment' | 'rose' | 'dark';
}

// ─────────────────────────────────────────────

export interface ScenarioZone {
  number: number;
  name: string;
  emoji: string;
  description: string;
  trap?: string;
  combat?: string;
}

export interface BeerEffect {
  title: string;
  description: string;
  effects: string[];
}

export interface BossStats {
  name: string;
  armorClass: number;
  hitPoints: number;
  attackBonus: string;
  damage: string;
  challengeRating: string;
  description: string;
}

export interface ScenarioEnding {
  title: string;
  reward: string;
  description: string;
}

export interface Scenario {
  title: string;
  subtitle: string;
  hook: string;
  zones: ScenarioZone[];
  beerEffect: BeerEffect;
  boss: BossStats;
  endings: ScenarioEnding[];
}

// ─────────────────────────────────────────────
// SERVICE
// ─────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class CampaignService {

  /** Returns the full list of player characters */
  getCharacters(): Character[] {
    return CHARACTERS;
  }

  /** Returns a single character by id, or undefined if not found */
  getCharacter(id: string): Character | undefined {
    return CHARACTERS.find(c => c.id === id);
  }

  /** Returns the one-shot scenario data */
  getScenario(): Scenario {
    return SCENARIO;
  }
}

// ─────────────────────────────────────────────
// CHARACTER DATA
// ─────────────────────────────────────────────

const CHARACTERS: Character[] = [

  // ── ZIPPI CROCHETON ──────────────────────────
  {
    id: 'zippi',
    name: 'Zippi Crocheton',
    epithet: '"La Petite Flamme de la Ruelle des Soupirs"',
    tags: [
      { label: 'Gnome des forêts' },
      { label: 'Magicienne · Niv. 3' },
      { label: "École d'Illusion", style: 'divine' },
      { label: 'Gang de rue', style: 'gold' },
    ],
    portrait: '🧙‍♀️',
    portraitCaption: 'Gnome · 91 cm\nCheveux verts électriques\nYeux : bleu arctique',
    race: 'Gnome des forêts',
    characterClass: 'Magicienne (Illusion)',
    alignment: 'Chaotique Bon',
    background: 'Voyou de rue',
    lore: "Née dans les ruelles de Biereval, Zippi a grandi entourée de pickpockets et de marchands louches. Elle a découvert sa magie en essayant de faire croire à un garde que son portefeuille n'existait pas. Ça a marché. Les dents en bois, c'est une autre histoire — impliquant une masse, un apprenti maladroit, et beaucoup de sang.",
    abilityScores: [
      { key: 'strength',     label: 'Force',        value: 6,  modifier: '−2' },
      { key: 'dexterity',    label: 'Dextérité',    value: 14, modifier: '+2' },
      { key: 'constitution', label: 'Constitution', value: 12, modifier: '+1' },
      { key: 'intelligence', label: 'Intelligence', value: 17, modifier: '+3', isPrimary: true },
      { key: 'wisdom',       label: 'Sagesse',      value: 10, modifier: '+0' },
      { key: 'charisma',     label: 'Charisme',     value: 13, modifier: '+1' },
    ],
    hitPoints: 16,
    armorClass: 12,
    initiative: '+2',
    proficiencyBonus: '+2',
    spellSaveDC: 13,
    spellAttackBonus: '+5',
    spellSections: [
      {
        title: 'Cantrips — Gratuits & illimités',
        spells: [
          {
            name: 'Illusion mineure ×2',
            emoji: '🪄',
            badge: 'GRATUIT',
            range: '9 m',
            duration: '1 min',
            description: "Version gnome + version améliorée. Crée sons ET images simultanément ! Distraction, fausse porte, bruit de garde…",
          },
          {
            name: 'Shocking Grasp',
            emoji: '⚡',
            badge: 'GRATUIT · +5',
            range: 'Contact',
            damage: '1d8 ⚡',
            description: "Choc électrique au contact. Avantage contre les armures métalliques. La cible ne peut pas utiliser de réaction.",
          },
        ],
      },
      {
        title: 'Niveau 1 — 4 emplacements',
        slots: 4,
        slotColor: '#1a3a6b',
        spells: [
          {
            name: 'Mains brûlantes',
            emoji: '🔥',
            badge: '1 SLOT · DEX 13',
            range: 'Cône 4,5 m',
            damage: '3d6 🔥',
            description: "Cône de flammes — touche TOUS les ennemis. DEX 13 pour demi-dégâts. Tes alliés sont protégés (Sculpture d'illusion) !",
          },
          {
            name: 'Bouclier magique',
            emoji: '🛡️',
            badge: 'RÉACTION · 1 SLOT',
            effect: '+5 CA',
            description: "Quand un ennemi te touche, réagis AVANT les dégâts. +5 CA, souvent transforme un coup en raté.",
          },
          {
            name: 'Sommeil',
            emoji: '💤',
            badge: '1 SLOT · SAG 13',
            range: '18 m',
            effect: '5d8 PV endormis',
            description: "Endort les ennemis les plus faibles en premier. Pas de sauvegarde ! Parfait en début de combat.",
          },
          {
            name: 'Parler aux animaux',
            emoji: '🐾',
            badge: 'GNOME · 2/repos',
            range: 'Soi-même',
            duration: '10 min',
            description: "2 utilisations par repos long sans slot. Les rats de la brasserie ont peut-être tout vu…",
          },
        ],
      },
      {
        title: 'Niveau 2 — 2 emplacements',
        slots: 2,
        slotColor: '#1a3a6b',
        spells: [
          {
            name: 'Invisibilité',
            emoji: '👁️',
            badge: 'SAVANT · 1 SLOT',
            badgeStyle: 'gold',
            range: 'Contact',
            duration: '1h (concentr.)',
            description: "Toi ou un allié devient invisible ! Avantage à toutes les attaques. Brise si tu attaques ou lances un sort.",
          },
          {
            name: 'Image miroir',
            emoji: '🪞',
            badge: 'SAVANT · 1 SLOT',
            badgeStyle: 'gold',
            range: 'Soi-même',
            effect: '3 doubles illusoires',
            description: "Crée 3 copies de toi ! Les ennemis ratent leurs attaques sur un tirage au sort. Excellente défense passive.",
          },
          {
            name: 'Couronne de folie',
            emoji: '👑',
            badge: '1 SLOT · SAG 13',
            range: '36 m',
            duration: 'Concentr.',
            description: "Prend le contrôle d'un ennemi charmé — il attaque ses propres alliés !",
          },
          {
            name: 'Mains brûlantes (amélioré)',
            emoji: '🔥',
            badge: '2 SLOTS · DEX 13',
            range: 'Cône 4,5 m',
            damage: '4d6 🔥',
            description: "Version boostée avec slot niveau 2. Pour les situations où tu as besoin de gros dégâts de zone !",
          },
        ],
      },
    ],
    traits: [
      { emoji: '🧠', name: 'Ruse gnome',          description: "Avantage sur les jets de sauvegarde d'INT, SAG et CHA contre la magie." },
      { emoji: '🎭', name: "Sculpture d'illusion", description: "Tes alliés ne sont jamais blessés par tes propres sorts. Tes amis sont en sécurité !" },
      { emoji: '🦷', name: 'Dents en bois',        description: "Résultat de \"l'incident avec la masse\". Claquent fort quand elle a peur." },
    ],
    equipment: [
      { emoji: '📖', name: 'Grimoire',              detail: 'couverture rafistolée avec du fil de cuivre' },
      { emoji: '🪄', name: 'Baguette magique',      detail: "branche d'aulne sculptée" },
      { emoji: '🔮', name: 'Composantes de sort',   detail: 'pochette en cuir usé' },
      { emoji: '🗡️', name: 'Dague',                 detail: 'souvenirs du gang' },
      { emoji: '🎒', name: "Sac d'aventurier",      detail: '+ 15 po' },
      { emoji: '🦷', name: 'Dents de rechange',     detail: '×2, précaution' },
    ],
    skills: [
      { name: 'Arcanes',      bonus: '+5', isProficient: true },
      { name: 'Investigation', bonus: '+5', isProficient: true },
      { name: 'Escamotage',   bonus: '+4', isProficient: true },
      { name: 'Discrétion',   bonus: '+4', isProficient: true },
      { name: 'Tromperie',    bonus: '+1', isProficient: false },
      { name: 'Perception',   bonus: '+0', isProficient: false },
    ],
    roleplay: {
      personality: "\"J'ai une solution pour TOUT. Elle n'est pas toujours légale. Ni sensée. Mais ça marche.\"",
      ideal:       "La connaissance appartient à ceux qui savent l'utiliser. Et moi, je sais.",
      bond:        "Mon gang m'a tout appris. Je ne les laisserai jamais tomber.",
      flaw:        "Je suis CERTAINE que mon plan est le meilleur. Même quand il explose.",
    },
    tips: [
      { emoji: '🪄', text: '<strong>Illusion mineure ×2</strong> — son ET image simultanément ! Distraction ultime avant toute embuscade.' },
      { emoji: '💤', text: '<strong>Sommeil</strong> dès le début — pas de sauvegarde, neutralise un groupe instantanément.' },
      { emoji: '🪞', text: '<strong>Image miroir</strong> avant les gros combats ! 3 copies rendent chaque attaque incertaine.' },
      { emoji: '🛡️', text: '<strong>Bouclier magique en réaction !</strong> Quand le MJ dit "il te touche", crie-le AVANT les dégâts.' },
      { emoji: '⚠️', text: 'Reste <strong>loin de la mêlée</strong> ! 16 PV et CA 12 — tu tombes vite.' },
    ],
    theme: 'parchment',
  },

  // ── MERLIN L'ENIVREUR ────────────────────────
  {
    id: 'merlin',
    name: "Merlin L'Enivreur",
    epithet: '"Le Nain qui n\'a jamais renversé une pinte... intentionnellement"',
    tags: [
      { label: 'Nain des collines' },
      { label: 'Roublard · Niv. 3' },
      { label: 'Assassin', style: 'divine' },
      { label: 'Charlatan', style: 'gold' },
    ],
    portrait: '🍺',
    portraitCaption: 'Nain · barbe tressée\nCicatrice sourcil gauche\nToujours une chope à la main',
    race: 'Nain des collines',
    characterClass: 'Roublard (Assassin)',
    alignment: 'Neutre',
    background: 'Charlatan',
    lore: "Merlin n'est pas son vrai nom. Personne ne sait son vrai nom, peut-être même pas lui. Il voyage de taverne en taverne sous de multiples identités, escroquant les riches et buvant tout ce qu'il gagne. Sa passion pour la bière est la seule chose authentique chez lui.",
    abilityScores: [
      { key: 'strength',     label: 'Force',        value: 13, modifier: '+1' },
      { key: 'dexterity',    label: 'Dextérité',    value: 15, modifier: '+2', isPrimary: true },
      { key: 'constitution', label: 'Constitution', value: 14, modifier: '+2' },
      { key: 'intelligence', label: 'Intelligence', value: 8,  modifier: '−1' },
      { key: 'wisdom',       label: 'Sagesse',      value: 15, modifier: '+2' },
      { key: 'charisma',     label: 'Charisme',     value: 10, modifier: '+0' },
    ],
    hitPoints: 27,
    armorClass: 13,
    initiative: '+2',
    proficiencyBonus: '+2',
    traits: [
      { emoji: '🗡️', name: 'Attaque sournoise',  description: '2d6 dégâts supplémentaires si avantage ou allié adjacent à la cible.' },
      { emoji: '🏃', name: 'Action astucieuse',  description: 'Bonus : Foncer, Désengager ou Se cacher. Chaque tour, sans action principale.' },
      { emoji: '🎭', name: 'Assassiner',          description: 'Avantage si tu attaques en premier. Critique automatique sur une cible surprise !' },
      { emoji: '🍺', name: 'Résilience naine',   description: 'Avantage contre le poison, résistance aux dégâts de poison.' },
    ],
    equipment: [
      { emoji: '🗡️', name: 'Dague +1 (magique)',  detail: 'Attaque +5 · 1d4+3',              isMagical: true },
      { emoji: '🎯', name: 'Dard +1 (magique)',   detail: 'Attaque +5 · 1d4+3 · portée 20/60m', isMagical: true },
      { emoji: '🏹', name: 'Arc court',           detail: 'Attaque +4 · 1d6+2 · portée 80/320m' },
      { emoji: '⚔️', name: 'Épée courte',         detail: 'Attaque +4 · 1d6+2' },
      { emoji: '🎩', name: 'Kit de déguisement' },
      { emoji: '🔓', name: 'Outils de voleur' },
    ],
    skills: [
      { name: 'Discrétion ★',  bonus: '+6', isProficient: true },
      { name: 'Escamotage ★',  bonus: '+6', isProficient: true },
      { name: 'Athlétisme',    bonus: '+3', isProficient: true },
      { name: 'Acrobaties',    bonus: '+4', isProficient: true },
      { name: 'Tromperie',     bonus: '+2', isProficient: true },
      { name: 'Investigation', bonus: '+1', isProficient: true },
    ],
    roleplay: {
      personality: '"Je mens tellement que j\'ai oublié la vérité. Mais la bière, elle, ne ment jamais."',
      ideal:       'La liberté avant tout. Personne ne me dit quoi faire — sauf si je suis payé.',
      bond:        'Il y a une dette que je dois rembourser. Je préfère ne pas en parler.',
      flaw:        'Si quelque chose a de la valeur, mes doigts le savent avant moi.',
    },
    tips: [
      { emoji: '🗡️', text: '<strong>Attaque sournoise</strong> à chaque tour ! Positionne-toi toujours près d\'un allié adjacent à ta cible.' },
      { emoji: '🏃', text: '<strong>Action astucieuse → Se cacher</strong> après une attaque. Tu disparais, ils te cherchent, tu frappes encore.' },
      { emoji: '🎭', text: '<strong>Assassiner</strong> : critique automatique sur une cible surprise !' },
      { emoji: '⚠️', text: 'Tu n\'es pas un tank ! 27 PV mais CA 13 — évite les échanges prolongés en mêlée.' },
    ],
    theme: 'dark',
  },

  // ── LA SŒUR MOY ──────────────────────────────
  {
    id: 'soeur-moy',
    name: 'La Sœur Moy',
    epithet: '"La grâce divine coule dans mes veines infernales — et dans chaque plat que je refuse."',
    tags: [
      { label: 'Tiefeline Variante' },
      { label: 'Ensorceleure · Niv. 3' },
      { label: '✨ Âme Divine', style: 'divine' },
      { label: '🌹 Acolyte',   style: 'gold' },
    ],
    portrait: '🌸',
    portraitCaption: 'Tiefeline\nCornes nacrées · Queue fine\nYeux violets',
    race: 'Tiefeline Variante',
    characterClass: 'Ensorceleure (Âme Divine)',
    alignment: 'Loyal Bon',
    background: "Acolyte — Baldur's Gate",
    lore: "Née Tiefeline dans une cité pieuse, Moy a grandi avec les cornes et la honte de sa lignée infernale. Mais Sylvara, déesse de la beauté et de la grâce, lui a offert sa bénédiction. Elle croit que le corps est un temple divin — végétarienne stricte, experte en herboristerie sacrée.",
    abilityScores: [
      { key: 'strength',     label: 'Force',        value: 8,  modifier: '−1' },
      { key: 'dexterity',    label: 'Dextérité',    value: 12, modifier: '+1' },
      { key: 'constitution', label: 'Constitution', value: 14, modifier: '+2' },
      { key: 'intelligence', label: 'Intelligence', value: 14, modifier: '+2' },
      { key: 'wisdom',       label: 'Sagesse',      value: 12, modifier: '+1' },
      { key: 'charisma',     label: 'Charisme',     value: 18, modifier: '+4', isPrimary: true },
    ],
    hitPoints: 18,
    armorClass: 11,
    initiative: '+1',
    proficiencyBonus: '+2',
    spellSaveDC: 13,
    spellAttackBonus: '+5',
    savingThrows: [
      { label: 'CON', value: '+4', isProficient: true },
      { label: 'CHA', value: '+6', isProficient: true },
      { label: 'FOR', value: '−1', isProficient: false },
      { label: 'DEX', value: '+1', isProficient: false },
      { label: 'INT', value: '+2', isProficient: false },
      { label: 'SAG', value: '+1', isProficient: false },
    ],
    specialTraits: ['🔥 Résistance Feu', '👁 Vision nuit 18 m', '🌿 Herboristerie de Sylvara'],
    spellSections: [
      {
        title: 'Cantrips — Gratuits & illimités',
        spells: [
          { name: 'Trait de Feu',       emoji: '🔥', badge: 'GRATUIT · +5',      range: '36 m',    damage: '1d10 🔥',        description: "Ton attaque principale — pas de slot, toujours disponible." },
          { name: 'Raillerie Vicieuse', emoji: '😤', badge: 'GRATUIT · SAG 13',  range: '18 m',    damage: '1d4 psy + désav.', description: "Dégâts psy + désavantage sur la prochaine attaque ennemie si SAG raté." },
          { name: 'Lame de Protection', emoji: '🛡️', badge: 'GRATUIT',           range: 'Soi-même', duration: '1 round',      description: "Résistance aux dégâts physiques pour 1 tour. Si tu es en danger !" },
          { name: 'Amis',               emoji: '💫', badge: 'GRATUIT · ROLEPLAY', range: 'Soi-même', duration: '1 min',        description: "Avantage Persuasion contre une cible. Attention : elle peut devenir hostile !" },
        ],
      },
      {
        title: 'Niveau 1 — 4 emplacements',
        slots: 4,
        slotColor: '#7a4870',
        spells: [
          { name: 'Bénédiction',         emoji: '✨', badge: 'DIVIN · CONCENTR.', badgeStyle: 'gold', range: '9 m',    duration: '1 min', description: "3 alliés ajoutent 1d4 à toutes leurs attaques et sauvegardes. Meilleur buff du jeu !" },
          { name: 'Fléau',               emoji: '😞', badge: '1 SLOT · CONCENTR.', range: '9 m',     description: "3 ennemis enlèvent 1d4 à leurs attaques et sauvegardes." },
          { name: 'Commandement',        emoji: '🗣️', badge: '1 SLOT',             range: '18 m · SAG 13', effect: 'À terre', description: '"Tombe !" — avantage contre elle au tour suivant.' },
          { name: 'Détection de Magie', emoji: '🔍', badge: '1 SLOT · RITUEL',    range: '9 m',     duration: '10 min', description: "Perçois toute magie dans un rayon de 9 m. Parfait pour enquêter dans la brasserie !" },
        ],
      },
      {
        title: 'Niveau 2 — 2 emplacements',
        slots: 2,
        slotColor: '#1a5548',
        spells: [
          { name: 'Fascination', emoji: '😵', badge: '2 SLOTS · CONCENTR.', range: '36 m · SAG 13', description: "Fascine jusqu'à 10 créatures — immobiles, sans action. Réservé aux situations critiques !" },
        ],
      },
      {
        title: 'Sorts Tiefeline — 1/Repos Long',
        spells: [
          { name: 'Charme-Personne', emoji: '💕', badge: '1/REPOS LONG', badgeStyle: 'red', range: '9 m · SAG 13', duration: '1h', description: "Charme un humanoïde — il te voit comme une amie. Parfait pour l'infiltration et le roleplay." },
        ],
      },
    ],
    traits: [
      { emoji: '⭐', name: 'Favorisée des Dieux', description: "Si tu rates un jet, lance 2d4 et ajoute le total. Peut transformer un échec en succès ! (1/repos court)" },
      { emoji: '🌟', name: 'Magie Empuissannée',  description: "Dépense 1 point de sorcellerie pour relancer jusqu'à 3 dés de dégâts." },
      { emoji: '🔥', name: 'Résistance Infernale', description: "Résistance aux dégâts de Feu. Commode dans une brasserie avec des alambics…" },
      { emoji: '🌿', name: 'Grâce de Sylvara',     description: "Maîtrise de l'herboristerie et des plantes sacrées. Elle reconnaîtra les ingrédients suspects dans la bière !" },
    ],
    equipment: [
      { emoji: '✨', name: 'Cape du Charlatan',     detail: 'objet merveilleux', isMagical: true },
      { emoji: '🗡️', name: 'Dague',                detail: 'Attaque +3 · 1d4+1 · portée 20/60m' },
      { emoji: '🏹', name: 'Arbalète légère',       detail: 'Attaque +3 · 1d8+1 · 20 carreaux' },
      { emoji: '⛪', name: 'Symbole sacré',         detail: 'statuette de Sylvara' },
      { emoji: '🌿', name: "Sacoche d'herboriste", detail: 'plantes sacrées de Sylvara' },
    ],
    skills: [
      { name: 'Arcanes',      bonus: '+4', isProficient: true },
      { name: 'Persuasion',   bonus: '+5', isProficient: true },
      { name: 'Perspicacité', bonus: '+3', isProficient: true },
      { name: 'Religion',     bonus: '+4', isProficient: true },
      { name: 'Tromperie',    bonus: '+3', isProficient: false },
      { name: 'Perception',   bonus: '+0', isProficient: false },
    ],
    roleplay: {
      personality: '"J\'ai vécu dans l\'élite du temple. La nourriture grasse me révulse. La bière est une insulte à Sylvara."',
      ideal:       'Aider ceux dans le besoin — et si possible, les aider à manger plus sainement.',
      bond:        'La beauté divine est en chaque créature. Même les nains qui boivent de la bière.',
      flaw:        "Elle ne peut pas s'empêcher de commenter ce que mangent les autres. C'est un service.",
    },
    tips: [
      { emoji: '✨', text: '<strong>Bénédiction</strong> dès le début sur les 3 meilleurs attaquants. Le +1d4 change tout !' },
      { emoji: '🔥', text: '<strong>Trait de Feu</strong> est gratuit — 1d10, 36m de portée, toujours disponible.' },
      { emoji: '⭐', text: "Si tu rates quelque chose d'important, <strong>Favorisée des Dieux</strong> immédiatement !" },
      { emoji: '🌿', text: 'Dans la brasserie : tu peux <strong>identifier les ingrédients suspects</strong> — tu seras la première à comprendre !' },
      { emoji: '⚠️', text: '<strong>11 de CA et 18 PV</strong> — reste loin de la mêlée. Ta puissance vient du contrôle à distance.' },
    ],
    theme: 'rose',
  },
];

// ─────────────────────────────────────────────
// SCENARIO DATA
// ─────────────────────────────────────────────

const SCENARIO: Scenario = {
  title: 'La Brasserie des Ventres Plats',
  subtitle: 'Scénario One-Shot D&D 5e — Niveau 3',
  hook: "Une ancienne brasserie naine abandonnée cache un secret : la recette légendaire de la Slimgold Ale, une bière diététique magique. Mais quelqu'un a envoyé des sbires la voler — et la bière a déjà commencé à faire ses effets sur tout le monde à l'intérieur.",
  zones: [
    {
      number: 1,
      name: 'Entrée murée',
      emoji: '🚪',
      description: "Fresques publicitaires naines vantant la Slimgold Ale. Une dalle piège dissimulée attend les imprudents.",
      trap: 'Dalle piège : DEX DD 13 ou chute dans une fosse (1d6 dégâts).',
    },
    {
      number: 2,
      name: 'Salle de réception',
      emoji: '🛋️',
      description: "2 sbires inconscients qui dansent en dormant. Un baril de bière ouvert exhale une vapeur dorée suspecte.",
    },
    {
      number: 3,
      name: 'Salle de fermentation',
      emoji: '🍺',
      description: "3 sbires sous effet de la bière combattent en dansant involontairement.",
      combat: '3 sbires (CA 11, PV 11) — résolution par combat OU défi de danse DD 12 !',
    },
    {
      number: 4,
      name: 'Alchimerie',
      emoji: '⚗️',
      description: "Journal de Gulda Fermentine révélant la vérité sur la bière. La recette est cachée derrière le portrait de Grand-Père Gurdun.",
      trap: 'Portrait piégé : PER DD 14 pour repérer le mécanisme.',
    },
    {
      number: 5,
      name: 'Grande Cuve — Boss',
      emoji: '⚔️',
      description: "Osbert Crassepot et ses 2 gardes. Crassepot a bu la bière par accident et danse involontairement en donnant ses ordres.",
      combat: 'Crassepot : CA 13, PV 27, +5 (1d4+3+2d6). Gardes : CA 14, PV 22, +4 (1d8+2).',
    },
  ],
  beerEffect: {
    title: 'Effet de la Slimgold Ale',
    description: "Toute créature qui boit ou inhale les vapeurs doit réussir une sauvegarde de Constitution DD 14.",
    effects: [
      '🕺 Danse obligatoire à chaque round (action bonus perdue)',
      '😍 Avantage aux jets de Charisme',
      '🤫 Désavantage aux jets de Discrétion',
      '🪞 Illusion de maigrissement (cosmétique)',
    ],
  },
  boss: {
    name: 'Osbert Crassepot',
    armorClass: 13,
    hitPoints: 27,
    attackBonus: '+5',
    damage: '1d4+3 + 2d6 (sournois)',
    challengeRating: '1',
    description: "Commerçant cupide qui a envoyé ses hommes voler la recette. Il a bu la bière par mégarde et danse sans pouvoir s'arrêter — ce qui le rend furieux et légèrement ridicule.",
  },
  endings: [
    { title: 'Recette retrouvée',   reward: '300 po',                  description: "La recette est remise au commanditaire ou conservée par le groupe." },
    { title: 'Crassepot arrêté',    reward: '+100 po',                 description: "Bonus si Crassepot est livré aux autorités." },
    { title: 'Brasserie relancée',  reward: '10% des bénéfices',       description: "Le groupe décide de relancer la brasserie avec la recette." },
    { title: 'Fin secrète',         reward: 'Point de départ campagne', description: "Un joueur vole la recette pour lui-même — début d'une nouvelle intrigue…" },
  ],
};
