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
11. [x] DevGate: guardrails-scan clean, run-tests 5/5, regression_check green (1 soft file-size warning documented)
12. [x] Headless mobile playtest at 390x844 (swap, kills, upgrades, game over, reload resume)
13. [x] Leaderboard: local scores (zhm_scores), score = kill points + wave bonuses, rank on game over, top-5 on title
14. [x] Repo: public zombie-hero-match, README main, feature branch with openspec + game
