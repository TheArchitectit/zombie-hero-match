# Handoff: zombie-hero-match

## Gate results (2026-09-13, v5 head)
- node --test tests/game.test.js: 12/12 pass (offline self-containment, mobile
  shell, per-block JS parse, systems presence, v2 + v4 + v5 systems presence,
  achievement-def integrity, weather/gameplay coupling, index.html mirror,
  sw cache-name bump, save schema incl. weather) - self-contained, runs from a
  fresh clone via npm test; verified from a clean clone before push.
- Gate policy since the 1ad89db red-ship: the gate runs on the exact tree
  being pushed, before every push.

## Live playtest (cloud Chrome, 390x844 iPhone viewport, real tap simulation)
v2-v4 checks as before (title + class pick via touch; valid swap sticks; invalid
swap snaps back; hero attacks with class projectiles; level-ups unlock abilities;
shop deducts gold; reload -> Continue restores wave/gold/hero/score; SW update
flow self-reloads). v5 adds:
- Combos: a forced 4-in-a-row shows the '4-IN-A-ROW!' banner + jingle and pays
  +250; a forced multi-line swap shows 'DOUBLE MATCH! x1.5' (banner + score).
- Achievements: a live kill pops the trophy toast for First Blood, the unlock
  persists across reload (zms_meta), and the list screen shows locked/unlocked
  states with the count.
- Weather: wave rolls render the ambient layers (rain streaks, snow, fog bands,
  storm + lightning flash); HUD icon + wave-start toast name the effect; the
  condition persists in the save.

## Not verified
- Real-device feel and iOS audio (tested with synthetic touch in cloud Chrome,
  not on a physical phone; first real-device pass is Roger's).
- Airplane mode on hardware (offline self-containment is gate-tested, SW cache
  verified, but not flown yet).
- Balance beyond ~wave 8; long-run battery impact of weather layers on hardware.
