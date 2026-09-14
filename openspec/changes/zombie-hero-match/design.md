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
5. Classes: Soldier +30% damage, crit perk. Mage 60% lane splash, longer slows,
   splash perk. Class chosen at run start, persisted in save; the hero sprite
   matches the class emoji.
6. Hero progression: XP per kill (type-based: 10/14/20/60) plus 25+15*wave per
   wave clear; xpNeed = 50+40*level. Level 2 unlocks a passive (Soldier: Crit
   Burst +15% crit @4x; Mage: Chain Nova 50% arc to a 2nd zombie), level 4 an
   active ability on a circular field button with cooldown (Soldier: Shockwave
   18s, damage+knockback to all; Mage: Deep Freeze 22s, 4s full stop to all).
   HUD shows hero level + XP bar; unlocks toast on level-up.
7. Waves: zombie count 4+2n (+2 on every 5th), hp x(1+0.22(n-1)), speed cap x1.6,
   spawn interval floor 0.7s. Spawn weights ported from zombietoss difficulty curve.
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
12. Repo: TheArchitectit/zombie-hero-match (public), README-only main, all work on
    feature branch, no PR, never main.
13. Gates must run green on the exact tree being pushed, before the push
    (v1 shipped with a red parse test; handoff went stale silently - not again).

## Open questions
- Balance past wave ~8 is untested by hand (HP scaling vs upgrade curve) - tuned
  by formula, not playtested that deep.
- rAF throttling in background tabs slows spawns; irrelevant on an active phone
  screen but visible if the user backgrounds the tab mid-wave.
