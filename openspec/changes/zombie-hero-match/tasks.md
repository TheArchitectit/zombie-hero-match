# Tasks: zombie-hero-match

1. [x] Mine TheArchitectit/zombietoss for mechanics (zombie types, spawn weights, SFX, mobile shell)
2. [x] Core shell: single-file HTML, viewport lock, HUD, layout (field/grid split)
3. [x] Match-3 engine: 7x7 grid, swap validation, match detect, cascades, refill, no-move shuffle
4. [x] Touch input: swipe + tap-tap, pointer events
5. [x] Zombie system: 4 types, lanes, march, barricade attacks, HP bars, slow/armor
6. [x] Combat binding: matches -> color effects -> damage, kill rewards, floating feedback
7. [x] Classes: Soldier + Mage with passives and perks
8. [x] Wave loop: spawn schedule, wave clear, upgrade shop, next wave
9. [x] Meta: upgrades, gold economy, game over/restart with carry-over
10. [x] Persistence: localStorage save + Continue on boot, autosave
11. [x] Leaderboard: local scores (zhm_scores), score = kill points + wave bonuses, rank on game over, top-5 on title
12. [x] Repo: public zombie-hero-match, README main, feature branch with openspec + game
13. [x] v2 touch fix: bindTap buttons (touchend+click, dedup), grid touch handlers, tile dataset re-sync
14. [x] v2 swap validity: invalid swaps visibly snap back (flash + bad sfx); verified live
15. [x] v2 hero: left-side sprite, attack swing + class-flavored projectiles on every match
16. [x] v2 hero progression: XP/levels, Lv2 passive + Lv4 active abilities, HUD level/XP bar, cooldown button
17. [x] v2 persistence: hero level/XP + score/kills in zms_save; Continue restores all
18. [x] v2 offline update flow: sw cache zhm-v2/v3 bumps, old-cache cleanup, controllerchange auto-reload
19. [x] v2 audit remediation: ice lane-slow code fix, score/kills persistence, reproducible gate (npm test from fresh clone), package.json name
20. [x] Gates green at pushed head: node --test tests/game.test.js 8/8
