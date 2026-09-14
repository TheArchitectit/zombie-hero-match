# Traceability: zombie-hero-match

| Spec req | Implementation | Verification |
|---|---|---|
| match3 R1 | doSwap snap-back + noswap flash | live: invalid tap-tap swap returned identical board |
| match3 R2 | resolveBoard cascades | live: valid swap -> match -> kill -> gold |
| match3 R3 | attack() color effects; ice lane-filtered | live + harness; lane slow verified by code + unit path |
| match3 R4 | classDmgMult, mage splash | live (soldier + mage runs) |
| match3 R5 | shuffleGrid | code + gate test |
| match3 R6 | bindTap, grid touch handlers, renderTile dataset sync | live: synthetic-touch taps on class/shop/ability buttons and tiles |
| match3 R7 | heroAtkAnim, spawnProj, impact | live: hero swing + projectiles observed after swaps |
| waves R1-R3 | ZTYPES, loop(), spawnWeights, frozenT | live: march, HP bars; frozen brutes held still 4s |
| meta R1/R2 | saveGame/loadSave/applySave, Continue | live: reload -> Continue restores wave/gold/heroLvl/heroXP/score |
| meta R3 | renderUpgrades | live: touch buy deducted gold, dmg level rose |
| meta R4 | gameOver/btnRestart | playtest: restart keeps progress at wave 1 |
| meta R5 | inline everything; sw cache bump + controllerchange reload | gate test: no external refs; live: planted zhm-v1 cache deleted on activate, v2 kept |
| meta R6 | lbRecord/lbTop/lbHtml, zhm_scores | playtest: game over -> rank + board survives reload |
| meta R7 | gainXP, xpNeed, onLevelUp, HUD xpbar | live: gainXP -> Lv5, HUD updated, toasts |
| meta R8 | heroUnlocked, activeAbility, castAbility, abBtn | live: Shockwave killed/pushed horde (18s cd); Deep Freeze froze brutes (22s cd) |
