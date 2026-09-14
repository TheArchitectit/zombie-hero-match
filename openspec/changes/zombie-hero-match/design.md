# Design: zombie-hero-match

## Locked decisions
1. Single .html file, everything inline, no external requests of any kind.
   Emoji glyphs instead of image assets; WebAudio synth instead of audio files.
2. Portrait-first 390px-class phones. Top 34% battlefield (5 lanes), bottom 52%
   match-3 grid, HUD bar on top. Tiles ~53px touch targets.
3. Input: pointer events; swipe OR tap-select-then-tap-adjacent. touch-action:none
   kills double-tap zoom and scroll interference.
4. Combat model: each match damages the frontmost zombie (closest to barricade).
   Color effects: fire = 1.6x (2.2x Soldier), ice = lane slow, nature = wall heal,
   bolt = chains to 2 more, arcane = ignores armor (+50% vs brute).
5. Classes: Soldier +30% damage, crit perk. Mage 60% lane splash, longer slows,
   splash perk. Class chosen at run start, persisted in save.
6. Waves: zombie count 4+2n (+2 on every 5th), hp x(1+0.22(n-1)), speed cap x1.6,
   spawn interval floor 0.7s. Spawn weights ported from zombietoss difficulty curve.
7. Meta: gold per kill (type-based, greed upgrade scales), wave-clear bonus,
   4 upgrade tracks with escalating costs. Game over keeps class/gold/upgrades,
   resets to wave 1 (forgiving roguelite-lite, right for a flight toy).
8. Save: localStorage key zms_save {classId, wave, gold, maxHp, hp, up}; written on
   wave start/clear, kill, upgrade buy, and every 5s. Continue button on title.
9. Zombies traverse in ~20-25s (regular), attack the wall for type-based DPS.
10. Repo: TheArchitectit/zombie-hero-match (public), README-only main, all work on
    feature branch, no PR, never main.

## Open questions
- Balance past wave ~8 is untested by hand (HP scaling vs upgrade curve) - tuned
  by formula, not playtested that deep.
- rAF throttling in background tabs slows spawns; irrelevant on an active phone
  screen but visible if the user backgrounds the tab mid-wave.
