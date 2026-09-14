# Traceability: zombie-hero-match

| Spec req | Implementation | Verification |
|---|---|---|
| match3 R1 | doSwap revert | playtest: invalid swap returns |
| match3 R2 | resolveBoard cascades | playtest: swap -> kills -> gold |
| match3 R3/R4 | attack() color/class effects | playtest (soldier + mage runs) |
| match3 R5 | shuffleGrid | code + gate test |
| waves R1-R5 | ZTYPES, loop(), spawnWeights | playtest: lanes, HP bars, march |
| meta R1/R2 | saveGame/loadSave, Continue | reload test: state restored |
| meta R3 | renderUpgrades | playtest: buy dmg+vit, costs deducted |
| meta R4 | gameOver/btnRestart | playtest: brute at wall -> restart keeps progress |
| meta R5 | inline everything | gate test: no external refs |
| meta R6 | lbRecord/lbTop/lbHtml, zhm_scores | playtest: game over -> rank + board survives reload |
