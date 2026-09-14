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
- 5 playable classes (Soldier: focused fire/crits; Mage: lane splash/lane slows;
  Ranger: fast hits/volleys; Cleric: healing/smite; Necromancer: soul-fueled bursts).
- A hero character standing left of the field who delivers every match attack with
  class-flavored projectile visuals (soldier tracer, mage orb, chain-nova arc).
- Hero XP from kills and wave clears; level-ups unlock abilities (Lv2 passive,
  Lv4 active with an on-field cooldown button).
- 100+ wave campaign (unbounded counter): every 10th wave is a boss wave with a
  visibly distinct, heavily scaled boss zombie.
- Wave loop with between-wave upgrade shop (damage, wall, gold, class perk).
- HP/damage economy, game over + restart with meta-progression kept.
- localStorage save (class, wave, gold, score, kills, upgrades, HP, hero level/XP)
  with Continue on reload.
- Local leaderboard in localStorage (pattern ported from zombietoss systems/leaderboard.js,
  offline-only): score by kills + wave bonuses, top-50 persisted, top-10 shown.
- Combo system (v5): 4-in-a-row and 5+-in-a-row matches are detected, announced with a
  center-field banner + combo jingle, and pay score bonuses (+250/+500). Simultaneous
  multi-line matches (2+ groups resolving in one swap or cascade) are announced
  (DOUBLE/TRIPLE/QUAD MATCH) and multiply that step's damage by +50% per extra line.
- Achievement system (v5, zombietoss pattern): 20 achievements {id,name,desc,icon,rarity,cond}
  polled after game events, unlocked state + lifetime stats persisted in localStorage
  (zms_meta, survives new runs), trophy toast on unlock, and a viewable list screen with
  locked/unlocked states on the title and game-over screens.
- Weather system (v5, zombietoss-inspired, CSS-only): each wave rolls clear/rain/snow/fog/
  storm. Ambient visuals over the battlefield (animated rain streaks, drifting snow,
  parallax fog bands, storm lightning flashes with delayed thunder) plus light gameplay
  flavor: rain heals +50% on nature matches, snow extends ice slows +50%, fog slows the
  horde's march 10%, storm boosts bolt matches +50%. Weather persists in the save.

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
Committed gate: node --test tests/game.test.js (12/12) - runnable from a fresh clone
via npm test. Live mobile playtest in the cloud browser (390x844 iPhone viewport):
real tap simulation on class select, shop, and ability buttons; valid swap sticks;
invalid swap snaps back; match triggers hero attack animation + projectile; level-up
unlocks abilities; reload restores save incl. hero/score; service-worker update flow
(cache-name bump + auto-reload on controllerchange) moves v1 users to the new build.
v5 adds: forced 4-in-a-row and multi-line swaps show banners + score bonuses, an
achievement unlocks live and persists across reload, weather rolls are visible and
each condition renders; gates extended to 12 tests covering v5 systems presence,
achievement-def integrity, and weather/gameplay coupling.
