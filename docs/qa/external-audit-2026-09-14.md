# External QA audit - zombie-hero-match main @ 687418f4 (2026-09-14)

New repo (created 2026-09-14T01:13:34Z); first fleet-review pass. Window: all 13 commits (9260f7b50d seed .. 687418f4c8 v6 handoff), reviewed at HEAD 687418f4c8ee343fb6fd8e14277f1a740396a5d3. Audit-trail tally: 2 docs/qa/** commits on main (e5c37bd012, 5ed4370965 - identical message, one minute apart, both adding docs/qa/external-audit-2026-09-13.md).

VERDICT: A same-night build done right: offline single-file HTML5 match-3 zombie RPG with a real OpenSpec package, service worker for offline play, a JS test file, and six gameplay iterations (v1..v6) ending in a v6 handoff claiming gate 16/16 with live verification. Two smells: the game ships as two same-size HTML copies (index.html and zombie-hero-match.html, both 65534 bytes), and the Sep 13 external-audit doc was committed twice to main.

## ROUND TABLE
- Architecture: single-file game plus sw.js offline cache; OpenSpec change package carries design/proposal/tasks/risk-register/traceability and three specs (match3-combat, meta-progression, zombie-waves). Dual 65KB HTML entry points are a sync hazard, and with a service worker in play the canonical-file question decides what offline users actually get.
- Gameplay/product: iteration arc is visible and sensible - real-iOS touch fix + fighting hero classes (v2), audit remediation (v3: spec sync, ice lane-slow fix, score/kills persistence, reproducibility), boss waves every 10th + 100-wave campaign (v4), combos/achievements/weather (v5), 2.5D canvas weather + gore (v6). Auto-reload on SW controllerchange (v2.2) shows phone-first playtesting.
- Delivery/quality: tests/game.test.js (7.4KB) and the DevGate harness arrived in the first commit; v3 turned the Sep 13 external audit into fixes within hours - the review loop working as designed. The gate 16/16 claim is from the v6 commit message, not re-run here.
- Skeptic: the duplicate audit-commit pair and the duplicated HTML file both smell like scripted commits without dedupe. If index.html and zombie-hero-match.html ever diverge, the SW serves whichever it cached first and nobody will notice on wifi.

## FINDINGS
### MEDIUM
1. Dual HTML entry points at identical size (65534 bytes, not byte-compared here). If identical: pick one canonical file and drop the other. If not: the difference is undocumented and the SW cache makes it load-bearing.
### LOW
2. Duplicate audit-doc commits on main (e5c37bd012 and 5ed4370965, same message, 1 min apart) - trail noise; harmless but worth fixing in the committing script.
3. sw.js (1035 bytes) cache list not reviewed in this pass; if it hardcodes page names, a rename silently breaks offline play.

## VERIFIED CLEAN (at 687418f4)
Repo tree matches the commit narrative (OpenSpec package, tests, sw.js all present). All 13 cited commit hashes exist on main. docs/qa trail counted and excluded from activity per contract.

## NOT INDEPENDENTLY VERIFIED
Gate 16/16 claim and live-verification results (v6 commit message only). Gameplay correctness. Whether the two HTML files are byte-identical. SW cache contents. The Sep 13 audit doc's contents.

Source links:
- https://github.com/TheArchitectit/zombie-hero-match/blob/687418f4c8ee343fb6fd8e14277f1a740396a5d3/openspec/changes/zombie-hero-match/proposal.md
- https://github.com/TheArchitectit/zombie-hero-match/blob/687418f4c8ee343fb6fd8e14277f1a740396a5d3/docs/qa/external-audit-2026-09-13.md
