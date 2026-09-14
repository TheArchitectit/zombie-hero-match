# Handoff: zombie-hero-match

## Gate results (2026-09-14, v6 head)
- node --test tests/game.test.js: 16/16 pass (v5 suite plus: v6 systems presence,
  depth-layer structure - 3 rain + 3 snow layers across back/fore canvases, gore
  wiring + pool caps, functional rollWeather test: no repeats over 400 rolls, all
  five conditions covered, boss-wave storm rate > 22%). Fresh-clone npm test
  verified green on the exact pushed tree; a Node DOM-stub smoke harness ran
  newGame, all five weather engines, bolt firing, real-swap kills (blood/chunks/
  splats produced), and 200 clean rolls.

## Live playtest (v6, cloud Chrome, 390x844 iPhone viewport)
- Pages serves zhm-v6 (sw.js and the installed cache both confirmed zhm-v6).
- Rain: 3 depth layers visible (fine faint far drops, thick bright near streaks),
  splash rings along the ground, gust slant. Storm: heavy rain + jagged foreground
  lightning bolt captured live; First Blood achievement toast fired from a real kill.
- Gore: real kills produced blood=43/chunks=7/splats=2 in state; a boss-scale burst
  (40 droplets, 8 chunks, wide splat) screenshotted mid-field; splatter decals
  persist after the burst fades.
- Snow: layered flakes with depth; ground accumulation grows (slowly in headless
  Chrome - rAF throttled; full rate on a visible phone screen).
- Fog: 3 parallax banks + foreground drift band render; horde-march 10% slow is
  the v5 coupling, unchanged.
- Weather persists in zms_save; reload + Continue restored the fog wave and
  reseeded the engine.

## Not verified (v6)
- Real-device feel, audio, and frame rate on Roger's iPhone - synthetic viewport
  only. Headless Chrome throttles rAF when unfocused, so phone-rate weather
  density/accumulation is structural (capped arrays, batched strokes), not measured.
- Fog HUD glyph shows as a box in headless Chrome's font set; iOS has the glyph.

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
