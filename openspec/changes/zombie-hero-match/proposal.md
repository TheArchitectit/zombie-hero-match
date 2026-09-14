# Proposal: zombie-hero-match

## Why
Roger wants an offline phone game for the 2026-09-14 charter flight (wheels up 7:00 AM CT):
"match color boxes and attack zombies that march along - zombie toss + RPG + puzzle",
with upgrades, classes, and localStorage save. No network in the air, so the deliverable
must be a single self-contained HTML file.

## What
A match-3 / lane-defense RPG hybrid in ONE offline HTML file (all JS/CSS inline, zero
external requests), built from mechanics mined from TheArchitectit/zombietoss:

- 7x7 touch-first match-3 grid (tap-tap or swipe), 5 tile colors with distinct effects.
- 5 lanes of zombies marching on the player's barricade; matches attack the horde.
- 2 playable classes (Soldier: focused fire/crits; Mage: lane splash/deep slows).
- Wave loop with between-wave upgrade shop (damage, wall, gold, class perk).
- HP/damage economy, game over + restart with meta-progression kept.
- localStorage save (class, wave, gold, upgrades, HP) with Continue on reload.
- Local leaderboard in localStorage (pattern ported from zombietoss systems/leaderboard.js,
  offline-only): score by kills + wave bonuses, top-50 persisted, top-10 shown.

## Reused from zombietoss (TheArchitectit/zombietoss)
- Zombie type system: regular / runner / armored / brute with hp, speed, armor,
  point multipliers, size modifiers (entities/zombietypes.js, mechanics ported).
- Difficulty-weighted spawn table by wave (getSpawnWeights curve).
- Local leaderboard pattern (zat_local_scores: push, sort desc, slice 50, rank) -
  Firebase sync stripped, localStorage-only for offline play.
- WebAudio oscillator/noise SFX approach (no audio assets, works offline).
- Mobile shell patterns: viewport lock, touch-action:none, localStorage persistence,
  DPR-aware rendering discipline.

## Scope
- IN: single-file game, offline, portrait phone play, save/resume, gates green.
- OUT: sound assets, multiplayer, accounts, PR/merge to main. itch.io packaging comes later (title is itch-bound).

## Verification
DevGate gates (guardrails-scan, run-tests, regression_check) plus headless mobile
browser playtest (390x844): title/class select, swap+match damage, kills+gold,
wave clear, upgrade purchase, wave 2 start, game over, restart, reload resume.
