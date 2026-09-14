# Design: zombie-hero-match

## Locked decisions
1. Single .html file, everything inline, no external requests of any kind.
   Emoji glyphs instead of image assets; WebAudio synth instead of audio files.
2. Portrait-first 390px-class phones. Top 34% battlefield (5 lanes) with the hero
   standing left by the barricade, bottom 52% match-3 grid, HUD bar on top.
   Tiles ~53px touch targets.
3. Input (v2 rewrite after real-iPhone playtest: v1 pointer-only handling missed
   real taps): buttons use bindTap = touchend (preventDefault kills the ghost
   click) + click fallback, deduplicated by a 500 ms window. The grid uses
   touchstart/touchend/touchcancel (passive:false, preventDefault) for tap-tap or
   swipe, with pointer events kept for mouse/stylus and suppressed for 700 ms
   after any touch. Tile DOM nodes re-sync dataset.r/c on EVERY renderTile -
   v1 set them only at element creation, so after any swap or collapse taps
   resolved to stale coordinates and "always swapped correct".
4. Combat model: each match damages the frontmost zombie (closest to barricade).
   Color effects: fire = 1.6x (2.2x Soldier), ice = LANE slow (only zombies in
   the target's lane; v1 slowed the whole field - fixed to match this spec),
   nature = wall heal, bolt = chains to 2 more, arcane = ignores armor (+50% vs brute).
   Every match attack is delivered BY the hero: swing animation plus a class-flavored
   projectile (soldier tracer, mage orb; Chain Nova adds an arc to a 2nd zombie).
5. Classes (5): Soldier +30% dmg, 2.2x fire, crits. Mage 60% lane splash,
   longer slows. Ranger +15% dmg, fastest projectile, volley passive. Cleric
   +10% dmg, nature heals 2x, blessing/smite sustain. Necromancer +20% dmg,
   1.3x arcane, soul harvest/death wave. Class chosen at run start from 5
   buttons (overlay scrolls on small screens), persisted in save; the hero
   sprite matches the class emoji.
6. Hero progression: XP per kill (type-based: 10/14/20/60) plus 25+15*wave per
   wave clear; xpNeed = 50+40*level. Level 2 unlocks a passive (Soldier: Crit
   Burst +15% crit @4x; Mage: Chain Nova 50% arc to a 2nd zombie), level 4 an
   active ability on a circular field button with cooldown (Soldier: Shockwave
   18s, damage+knockback to all; Mage: Deep Freeze 22s, 4s full stop to all).
   HUD shows hero level + XP bar; unlocks toast on level-up.
7. Waves: zombie count 4+2n (+2 on every 5th), hp x(1+0.22(n-1)), speed cap x1.6,
   spawn interval floor 0.7s. Spawn weights ported from zombietoss difficulty curve.
   The wave counter is unbounded - the campaign runs past 100. Every 10th wave
   (10, 20, ..., 100, ...) is a BOSS WAVE: half the normal spawns plus one boss
   (420 base hp before wave scaling, 0.15 armor, 74px, red glow, 150 gold,
   200 XP, 5000 pts) with a 'BOSS WAVE n!' toast. The boss marches first.
8. Meta: gold per kill (type-based, greed upgrade scales), wave-clear bonus,
   4 upgrade tracks with escalating costs. Game over keeps class/gold/score/kills/
   upgrades/hero level and resets to wave 1 (forgiving roguelite-lite).
9. Save: localStorage key zms_save {classId, wave, gold, score, kills, maxHp, hp,
   up, heroLvl, heroXP}; written on wave start/clear, kill, upgrade buy, ability
   cast, and every 5s. Continue button on title shows wave, class, and hero level.
10. Offline update flow: service worker cache name is bumped every release
    (zhm-v1 -> v2 -> v3); activate deletes older caches, and the page reloads
    itself once on controllerchange so existing users land on the fresh build.
11. Zombies traverse in ~20-25s (regular), attack the wall for type-based DPS.
12. Repo: TheArchitectit/zombie-hero-match (public). Since 2026-09-13 v4, work lands
    on main by fast-forward merge from a feature branch, no PR, on Roger's explicit
    per-release written approval ("No save it all to main" / "Proceed"); GitHub Pages
    serves from main / and the live URL is re-verified after every merge.
13. Gates must run green on the exact tree being pushed, before the push
    (v1 shipped with a red parse test; handoff went stale silently - not again).
14. Combos (v5): detection lives in the resolve step (comboReward), not the swap.
    4-in-a-row pays +250, 5+ pays +500; simultaneous multi-line groups (one swap or
    cascade) multiply that step's damage by 1+0.5*(groups-1) and pay +200 per group.
    Banner is a single #combo element re-triggered by class re-add; combo jingle is
    a 4-note rising arpeggio on the existing WebAudio synth.
15. Achievements (v5, zombietoss systems/achievements.js pattern): flat ACH def list
    {id,name,desc,icon,rarity,cond}; conditions are pure predicates over run state +
    lifetime stats, polled after kills, wave starts/clears, level-ups, combos, and
    purchases. Lifetime stats + unlock map persist in localStorage zms_meta,
    independent of zms_save so new runs never wipe achievements. zombietoss has no
    list screen; ZHM adds one (ovAch) reachable from title and game over.
16. Weather (v6 rebuild - Roger's v5 playtest: "Weather effects need more detail they
    look 2d. Game needs 2.5 d"): three stacked canvases in #field - wback (z-index 2,
    behind the horde) for far/mid layers and ground effects, gorecv (z-index 4, above
    zombies) for gore, wfore (z-index 8, in front of the hero) for near layers. Rain,
    snow, and fog each run 3 depth layers (small/slow/faint far, big/fast/bright near);
    rain draws one batched stroke per layer (the zombietoss perf trick), lands drops as
    expanding splash rings, and slants with a wind-gust state machine ported from
    zombietoss updateWind; snow sways and accumulates a ground band; fog ports the
    zombietoss parallax ellipse banks and adds a foreground drift band; storm layers a
    jagged foreground bolt (two-pass stroke: glow + core) over the sky flash with
    thunder delayed 200-800ms (zombietoss triggerLightning pattern). Clear skies still
    read depth via parallax cloud shadows and dust motes. The roll: zombietoss does NOT
    roll weather per level (game.js line 244 sets setRainIntensity(1) once at start;
    only debug keys 1-4 change it) - ZHM already rolled per wave, and v6 widens that
    gap: the previous condition is excluded from the table and boss waves court storms
    (30%). Gameplay couplings from v5 are unchanged. One weatherFrame(dt) per rAF tick,
    fixed-size particle arrays, no per-frame DOM writes - phone-safe.
17. Gore (v6, zombietoss port): kills call spawnBlood (hsl-red droplets, gravity, fast
    fade - direct port of spawnBlood) plus spawnGore (tumbling flesh/bone/eyeball/teeth
    chunks with gravity, one floor bounce, spin, fade - port of entities/gore.js
    updateGore physics, zombietoss's comedic chicken/pie types swapped for zombie-appropriate
    chunks) plus addSplat (a 3-ellipse decal under the kill that fades over ~8s).
    Scale: regular 18 blood/3 chunks, brute 26/5, boss 40/8 plus a red screen flash;
    crit kills x1.5; non-lethal crits puff 7 droplets. Caps: 150 blood, 40 chunks, 30
    splats (oldest dropped). All drawing on gorecv, cleared and redrawn per frame.

## Open questions
- Balance past wave ~8 is untested by hand (HP scaling vs upgrade curve) - tuned
  by formula, not playtested that deep.
- rAF throttling in background tabs slows spawns; irrelevant on an active phone
  screen but visible if the user backgrounds the tab mid-wave.
