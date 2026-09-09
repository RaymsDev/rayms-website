---
date: 2026-09-09
topic: halloween-lunch-invitation
---

# Invitation Halloween — déjeuner déguisé horreur-comique

## Summary

Une nouvelle invitation Angular (dans `libs/invitations`, sur le modèle de `libs/invitations/src/lib/expedition-33`) pour un déjeuner d'anniversaire déguisé le samedi 31 octobre 2026 à midi, sur un ton humoristique-horrifique assumant le décalage entre thème d'horreur et horaire de midi (justifié par la présence d'enfants). En parallèle, le mécanisme d'offuscation des coordonnées de contact (email, et désormais téléphone) est extrait dans un service partagé et réutilisé par les trois invitations existantes (`expedition-33`, `bibou-birthday`, et la nouvelle).

## Problem Frame

Les deux invitations existantes (`expedition-33`, `bibou-birthday`) dupliquent chacune leur propre encodage base64 de l'email de contact directement dans le composant. Ajouter une troisième invitation avec, en plus, un numéro de téléphone à protéger contre le spam, en dupliquant à nouveau la logique d'offuscation ferait diverger un mécanisme qui devrait rester unique et cohérent entre toutes les invitations du site.

Par ailleurs, la réponse par email ne s'ouvre pas de façon fiable sur tous les téléphones (notamment iPhone sans client mail configuré par défaut), d'où le besoin d'une alternative de contact par SMS pour cette nouvelle invitation.

## Key Decisions

- **Thème horreur générique, pas de franchise pop-culture précise.** Contrairement à `expedition-33` qui suit une franchise de jeu vidéo précise, cette invitation utilise une esthétique horreur libre (maison hantée, ambiance gothique/mystique), laissant le déguisement ouvert plutôt que calé sur un univers particulier.
- **Image de fond fournie : `libs/invitations/src/img/haunted_house.jpg`.** Même approche visuelle qu'`expedition-33.scss` (image de fond + overlay en dégradé), avec cette image comme asset.
- **RSVP par mail ET par SMS, pairés par réponse.** Les 3 réponses (oui / non / peut-être) sont chacune disponibles via un bouton mail et un bouton SMS, présentés en ligne compacte par réponse plutôt qu'en deux blocs de boutons séparés — pour rester lisible sur iPhone malgré le doublement du nombre de boutons.
- **Numéro de téléphone reconstruit en JS, pas en base64.** Contrairement à l'email (actuellement en base64 dans le pattern existant), le numéro est assemblé à partir de plusieurs fragments de chaîne en TypeScript, une protection légèrement plus robuste contre le scraping automatisé de numéros en clair.
- **Pas de détection d'échec du mailto.** Les boutons mail et SMS sont simplement tous les deux visibles en permanence ; il n'y a pas de logique qui détecte que le mail ne s'est pas ouvert avant de proposer le SMS.
- **Extraction en service partagé, réutilisé sans changement de comportement visible.** Un service central dans `libs/invitations` expose l'email et le téléphone offusqués. `expedition-33` et `bibou-birthday` migrent uniquement leur email vers ce service — leur comportement affiché à l'utilisateur ne change pas. `bibou-birthday` ne reçoit pas de nouveau bouton SMS (elle n'a pas de numéro de téléphone associé).
- **Calendrier : réutilisation du lien Google Calendar existant.** Le mécanisme actuel (`calendar.google.com/calendar/render?action=TEMPLATE&...` ouvert dans un nouvel onglet) fonctionne déjà nativement sur iPhone et Android sans fichier `.ics` — aucune évolution technique nécessaire sur ce point pour la nouvelle invitation.
- **Adresse identique à `expedition-33`.** Même adresse (`3 chemin d'En Fournes, 81470 Cambon-lès-Lavaur`) et même lien Google Maps.
- **Âge : blague sur les 35 ans**, dans l'esprit du "je n'ai encore que 32 ans" d'`expedition-33`, adaptée au ton horreur-comique.

## Requirements

**Invitation Halloween**

- R1. La page présente un déjeuner déguisé le samedi 31 octobre 2026 à midi, à l'adresse `3 chemin d'En Fournes, 81470 Cambon-lès-Lavaur`.
- R2. Le ton du texte est humoristique-horrifique (esthétique horreur assumée avec autodérision), et adresse explicitement, sur le ton de l'humour, le décalage entre thème d'horreur et horaire de midi en raison de la présence d'enfants.
- R3. Le texte inclut une blague sur l'âge (35 ans) dans l'esprit de la formulation utilisée dans `expedition-33`.
- R4. Le déguisement est un thème horreur générique (pas de franchise précise) ; le texte invite à se déguiser sur ce thème.
- R5. La page utilise `libs/invitations/src/img/haunted_house.jpg` comme image de fond principale.
- R6. Un bouton ouvre l'adresse dans Google Maps.
- R7. Un bouton ajoute l'événement à l'agenda via un lien Google Calendar (même mécanisme que `expedition-33` : `calendar.google.com/calendar/render?action=TEMPLATE`), fonctionnel sur iPhone et Android.
- R8. Des boutons proposent des idées de déguisement horreur (Pinterest et Instagram), sur le modèle des boutons cosplay d'`expedition-33`, avec des recherches adaptées au thème horreur générique (plutôt qu'à une franchise précise).
- R9. Pour chacune des trois réponses possibles (oui / non / peut-être), la page propose deux façons d'y répondre : par mail (pré-rempli, comme le mécanisme existant) et par SMS (pré-rempli), présentées groupées par réponse plutôt qu'en deux blocs séparés.
- R10. Le numéro de téléphone utilisé pour les liens SMS n'apparaît jamais en clair dans le code source ou le HTML rendu ; il est reconstruit en JavaScript à partir de fragments.
- R11. La page est pleinement utilisable sur iPhone (mise en page, taille des boutons, lisibilité) sans nécessiter de zoom ou de défilement horizontal.

**Service partagé de contact**

- R12. Un service partagé, situé dans `libs/invitations`, expose l'email de contact et le numéro de téléphone sous forme offusquée (l'email reste encodé en base64 comme aujourd'hui ; le téléphone est reconstruit en fragments comme défini en R10).
- R13. `expedition-33` et `bibou-birthday` consomment ce service pour leur email de contact, en remplacement de leur encodage base64 local ; leur comportement visible pour l'utilisateur ne change pas.
- R14. La nouvelle invitation Halloween consomme ce même service pour son email et son numéro de téléphone.
- R15. `bibou-birthday` ne reçoit pas de nouveau bouton SMS — seul son mécanisme d'email est migré vers le service partagé.

## Scope Boundaries

- Pas de franchise pop-culture précise pour le thème de déguisement (contrairement à `expedition-33`).
- Pas de détection automatique de l'échec d'ouverture du mailto — les boutons mail et SMS restent simplement tous deux visibles en permanence, sans logique de fallback conditionnel.
- Pas d'ajout de bouton SMS sur `bibou-birthday` (qui n'a pas de numéro de téléphone associé aujourd'hui).
- Pas de génération de fichier `.ics` téléchargeable — le lien Google Calendar existant couvre déjà iPhone et Android.

## Dependencies / Assumptions

- L'image `libs/invitations/src/img/haunted_house.jpg` existe déjà dans le dépôt et est utilisable telle quelle comme fond.
- Le wiring applicatif (route dans `apps/rayms-website/src/app/app.routes.ts`, méta-données dans `meta.service.ts` et `structured-data.service.ts`, export dans `libs/invitations/src/index.ts`) suit le même schéma que celui déjà en place pour `expedition-33`.
