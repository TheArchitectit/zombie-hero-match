# Proposal: zombie-hero-match

## Why
Roger wants an offline phone game for the 2026-09-14 charter flight (wheels up 7:00 AM CT):
"match color boxes and attack zombies that march along - zombie toss + RPG + puzzle",
with upgrades, classes, and localStorage save. No network in the air, so the deliverable
must be a single self-contained HTML file. v2 (same day, post-playtest on his real
iPhone): fix real-device touch, enforce swap validity, and add the RPG layer he asked
for - a visible hero who fights, levels, and unlocks abilities.

## What
A match-3 / lane-defense RPG hybrid in ONE offline HTML file (all JS/CSS inline, zero
external requests), built from mechanics mined from TheArchitectit/zombietoss:

- 7x7 touch-first match-3 grid (tap-tap or swipe), 5 tile colors with distinct effects.
- 5 lanes of zombies marching on the player's barricade; matches attack the horde.
- 2 playable classes (Soldier: focused fire/crits; Mage: lane splash/lane slows).
- A hero character standing left of the field who delivers every match attack with
  class-flavored projectile visuals (soldier tracer, mage orb, chain-nova arc).
- Hero XP from kills and wave clears; level-ups unlock abilities (Lv2 passive,
  Lv4 active with an on-field cooldown button).
- Wave loop with between-wave upgrade shop (damage, wall, gold, class perk).
- HP/damage economy, game over + restart with meta-progression kept.
- localStorage save (class, wave, gold, score, kills, upgrades, HP, hero level/XP)
  with Continue on reload.
- Local leaderboard in localStorage (pattern ported from zombietoss systems/leaderboard.js,
  offline-only): score by kills + wave bonuses, top-50 persisted, top-10 shown.

## Reused from zombietoss (TheArchitectit/zombietoss)
- Zombie type system: regular / runner / armored / brute with hp, speed, armor,
  point multipliers, size modifiers (entities/zombietypes.js, mechanics ported).
- Difficulty-weighted spawn table by wave (getSpawnWeights curve).
- Local leaderboard pattern (zat_local_scores: push, sort desc, slice 50, rank) -
  Firebase sync stripped, localStorage-only for offline play.
- WebAudio oscillator/noise SFX approach (no audio assets, works offline).
- Mobile shell patterns: viewport lock, touch-action discipline, localStorage persistence.

## Scope
- IN: single-file game, offline, portrait phone play, save/resume, gates green.
- OUT: sound assets, multiplayer, accounts, PR/merge to main. itch.io packaging comes later (title is itch-bound).

## Verification
Committed gate: node --test tests/game.test.js (8/8) - runnable from a fresh clone
via npm test. Live mobile playtest in the cloud browser (390x844 iPhone viewport):
real tap simulation on class select, shop, and ability buttons; valid swap sticks;
invalid swap snaps back; match triggers hero attack animation + projectile; level-up
unlocks abilities; reload restores save incl. hero/score; service-worker update flow
(cache-name bump + auto-reload on controllerchange) moves v1 users to the new build.
