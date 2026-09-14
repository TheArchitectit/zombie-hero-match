# Handoff: zombie-hero-match

## Gate results (DevGate-Agentic-Framework, 2026-09-13)
- guardrails-scan.mjs: CLEAN (32-rule pattern baseline)
- run-tests.mjs: 5/5 pass (offline self-containment, mobile shell, JS parse,
  systems presence, save schema round-trip)
- regression_check.py --staged --pre-commit: 0 registry regressions, 0 hard
  file-size, 1 SOFT warning (game.inline.js 451 > 300 lines; inherent to the
  single-file requirement, accepted), 0 package vulnerabilities

## Playtest (headless Chrome, 390x844 iPhone viewport)
Verified: title + class pick; real swap -> match -> damage -> kill -> gold;
5-lane marching with HP bars; wave clear overlay; upgrade purchase (costs
deducted, wall heal); wave 2 start; game over via brute at barricade; restart
keeps class/gold/upgrades at wave 1; full page reload -> Continue restores
wave/gold/upgrades/class from localStorage.

## Not verified
- Real-device feel (tested headless, not on a physical phone).
- Balance beyond ~wave 8.
- Audio on iOS (WebAudio requires a user gesture; first tap unlocks it - handled
  in code, untested on real hardware).
