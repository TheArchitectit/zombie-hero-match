# External QA Audit: zombie-hero-match (OpenSpec vs code + DevGate gates)

Auditor: Instinct (external, read-only). Date: 2026-09-13 ~21:10 CT.
Audited head: `a1dab6c97f5bbbee479b55ef12b23351f05af0fb` on `feature/rjls-zombie-hero-match`
("v2: real-iOS touch fix, invalid-swap snap-back, fighting hero with levels + abilities", committed 21:07 CT).
Head moved mid-audit: audit started at `1ad89db` (SW + index.html copy); the v2 commit landed 21:07 CT and
the audit was re-based onto it. Findings that name the older head say so explicitly.
Live site verified: https://thearchitectit.github.io/zombie-hero-match/ serves the audited head byte-identical
(last-modified 02:07:59 GMT) and was playtested live in a mobile viewport (see "Live verification").

## Verdict

The game at v2 works: live playtest confirmed match -> damage -> kill -> gold/XP, invalid-swap snap-back,
hero leveling with ability unlock + cooldown, save/Continue across reload, and an active service worker with
a populated offline cache. The OpenSpec package does not describe what is shipped: it is a v1 package and the
v2 hero/level/ability/touch work has no spec, no tasks, no traceability rows, and an unrevised handoff. The
DevGate story is mixed: run-tests is a real gate that demonstrably catches breakage (it was RED at the
previous head and nobody noticed before pushing), but the repo cannot reproduce its own gates (.devgate is
gitignored, no CI), and three of the other gates are vacuous or crash on this repo.

## Findings (ranked)

### F1 (High) - Gates were red at head `1ad89db`; the push shipped without re-running them
Commit `1ad89db` added a second `<script>` block (SW registration) to `zombie-hero-match.html`. The existing
test "inline JS parses cleanly" (`tests/game.test.js`, v1 line 22) used the greedy regex
`/<script>([\s\S]*)<\/script>/`, which then captured both script blocks plus the `</script><script>` tags
between them, and `node --check` failed: `SyntaxError: Unexpected token '<'`. Reproduced: 5/5 pass at
`9260f7b`, 4 pass / 1 fail at `1ad89db`. `openspec/changes/zombie-hero-match/handoff.md` still claims
"run-tests.mjs: 5/5 pass" - true only at `9260f7b` and stale the moment `1ad89db` landed. v2 (`a1dab6c`)
fixed the test (per-block `matchAll`) and it now passes 8/8. Takeaway: the gate worked; the process of
running it before push did not. There is no CI to catch this (see F4).

### F2 (High) - The OpenSpec package describes v1; the shipped v2 has no spec coverage
`openspec/changes/zombie-hero-match/` is unchanged since the v1 commit `9260f7b`. Nothing in the package
covers the v2 features now shipped in `zombie-hero-match.html` (764 lines):
- Hero character: `HEROES` defs, `heroLvl`/`heroXP`, `gainXP`, `onLevelUp`, `xpNeed`, HUD XP bar (lines ~160-230).
- 4 abilities: `critburst`, `shockwave`, `chainnova`, `freezeall` with cooldown system (`abCD`), ability button.
- Projectiles/impact visuals (`spawnProj`, `impact`, `shockwaveVisual`, `freezeVisual`), `frozenT` zombie state.
- New input pipeline: `bindTap` touchend+click suppression window, `gridPress`/`gridRelease`, `lastTouchEv`
  pointer/touch de-dup, `noswap` snap-back animation. This replaced the v1 pointer-only pipeline that the v1
  risk register marks "Touch misfires: Closed".
No proposal scope update, no design decisions, no spec requirements (there is no hero/ability spec at all),
no tasks (`tasks.md` has 14 v1 tasks, all `[x]`), no traceability rows, no risk entries, and `handoff.md`
still reports v1 gate results and a v1 playtest. Per the project's own spec-first workflow, the v2 change
should not have shipped on top of a v1-only package.

### F3 (Medium) - Spec/design say ice = "lane slow"; the code slows every zombie on the field
`specs/match3-combat/spec.md` R3 and `design.md` decision 4: "ice = lane slow". Both heads implement
`if(cn==='ice'){...;zs.forEach(z=>z.slowT=Math.max(z.slowT,dur))}` (`zombie-hero-match.html` attack(), ~line 489)
- `zs` is every alive zombie, all lanes. Either the code overshoots the spec (global slow is a big buff) or
the spec under-describes intended behavior. Pick one and make them agree.

### F4 (Medium) - The repo cannot reproduce its own gates; no CI exists
`package.json` test script is `node .devgate/scripts/run-tests.mjs`, but `.gitignore` excludes `.devgate/` and
no `.github/workflows/` exists. A fresh clone runs `npm test` against a missing path. Every green gate the
handoff cites ran only on the author's machine. This is also why F1 reached the remote undetected.

### F5 (Medium) - DevGate gate soundness on this repo (what "green" actually proved)
- `run-tests.mjs`: real. Per-file subprocess runner; 8/8 pass at `a1dab6c` (run by this audit). Of the 8
  tests: offline-refs, per-block JS parse, index.html mirror, and the v1-cache-bump check test real
  properties; three are presence/substring checks; "save schema round-trips required fields" is vacuous -
  it round-trips a JSON literal and never calls the game's `saveGame`/`loadSave`, so it would pass even if
  the game persisted nothing. No test exercises game logic (findMatches, damage math, spawn weights) despite
  `window.__ZT` hooks existing for exactly that.
- `regression_check.py --staged --pre-commit` (the handoff's cited mode): vacuous for a pushed branch - it
  scans only uncommitted changes, so on a clean checkout there is nothing to check. It can never audit the
  committed content that was actually shipped.
- `regression_check.py --all`: crashes on this repo - `RuntimeError: --all regression scan could not diff
  HEAD~20...HEAD` (repo has 3 commits, no tags). The documented drift-sweep mode does not run here.
- `spec_traceability.py`: reports "no specs found under openspec/specs/" and exits 2 - the repo keeps specs
  under `openspec/changes/<name>/specs/`, so this gate misfires on the standard OpenSpec change-package layout.
- `semantic-scan.mjs`: exits 1, "cannot load the typescript compiler API" - needs `npm i --no-save typescript`;
  unavailable in this repo as cloned.
- `guardrails-scan.mjs`: clean (pattern baseline over the repo). Plausibly real but shallow for a single-file
  HTML game.
- `silent-success-scan.sh`: OK (0 hits, allowlist baseline).
- The handoff's "1 SOFT warning (game.inline.js 451 > 300 lines)": `game.inline.js` is gitignored and absent
  from the repo; the warning is unreproducible as stated, and the file-size gate does not scan the actual
  shipped artifact (`.html` with ~600 lines of inline JS at v2).

### F6 (Low) - Score is not persisted; Continue silently forfeits it
`saveGame` persists {classId, wave, gold, maxHp, hp, up, heroLvl, heroXP} - not `score` or `kills`. Verified
live: score 100 before reload, 0 after Continue. `meta-progression` R2 says Continue "SHALL restore the full
saved state"; the saved-state field list in R1 omits score, so the code matches the letter of R1 while a
reload mid-run silently discards all earned points (leaderboard entries are written only at game over).
Either persist score or document the reset as intended.

### F7 (Low) - meta R5 "zero network requests" is an overclaim as worded
The page registers `sw.js` on load - a network fetch - and first load is inherently online (GitHub Pages).
The intent (zero external dependencies, fully playable offline after first load) is met and was verified
live: service worker active, cache `zhm-v2` populated with all 4 assets. Suggest rewording R5 to "zero
external origins / fully playable offline after first load". Actual airplane-mode play was not testable
from the audit environment.

### F8 (Low) - Naming drift: package.json
`package.json` name is `zombie-match-siege`; repo, game, and spec package are `zombie-hero-match`.

### F9 (Info) - Duplicated entry point
`index.html` is a byte-copy of `zombie-hero-match.html` (verified identical at `a1dab6c`). Drift risk is now
covered by v2's new "index.html mirrors the game file" test - good mitigation; a symlink or build step would
remove the class entirely.

### F10 (Info) - Ability cooldown carries across waves
`startWave` does not reset `abCD`; a cooldown started late in wave N bleeds into wave N+1. Undocumented;
probably intended generosity.

## Spec-vs-code conformance matrix (head `a1dab6c`)

| Spec req | Status | Evidence |
|---|---|---|
| match3 R1 swap validation + revert | PASS (live) | `doSwap` snap-back; live invalid swap reverted board, `busy` reset |
| match3 R2 resolution, +50%/chain, 4=1.5x, 5+=2x | PASS (code) | `resolveBoard`, `attack()`: `dmg=size*8*(1+0.2*up.dmg)*(1+0.5*(chain-1))`, `size===4*1.5`, `>=5*2` |
| match3 R3 color effects | PARTIAL | fire/bolt/nature/arcane as spec'd; ice is global slow, not lane slow (F3) |
| match3 R4 class modifiers | PASS (code) | Soldier 1.3x + 2.2x fire; Mage lane splash 0.6+0.1*perk; perks scale via track |
| match3 R5 no-move shuffle | PASS (code) | `shuffleGrid` loops until `hasMove()` and no immediate matches |
| waves R1 four types | PASS (code) | `ZTYPES` regular/runner/armored/brute; fidelity of the "ported from zombietoss" profile not independently verified (zombietoss not read) |
| waves R2 ~20-25s crossing at wave 1 | PASS (code math) | `z.x` 1.08->0.01 at `spd*0.045/s` = ~23.8s; live cadence not observable in throttled headless tab (see Live verification) |
| waves R3 barricade 1Hz DPS +10%/wave, HP0 ends run | PASS (code) | `attackT>=1`, `dps*(1+0.1*(w-1))`, `gameOver()` |
| waves R4 4+2n (+2 on /5), hp x(1+0.22(n-1)), brutes from w5 | PASS (code + live) | `startWave`, `spawnWeights`; live wave 1 spawned queue of 6 |
| waves R5 HP bar, kill sound, fade, gold float | PASS (code + live) | `updateZombieEl`, `killZombie`; gold float + kill observed live |
| meta R1 save fields + triggers | PASS w/ note | All listed fields + heroLvl/heroXP saved on start/clear/kill/buy/5s; spec field list now under-describes the v2 save (F2) |
| meta R2 Continue labeled + restores | PASS w/ note | Live: "CONTINUE - WAVE 1 (Soldier, Lv4)"; restores wave/gold/upgrades/hero; score forfeited (F6) |
| meta R3 shop, escalating costs, refusal, wall heal | PASS (code) | `UPS`, `renderUpgrades`, disabled+guard, `vit` heals to full |
| meta R4 restart keeps class/gold/upgrades at wave 1 | PASS (code) | `btnRestart` keep-object (v2 also keeps hero, unspecced) |
| meta R5 offline | PASS w/ wording note | SW active, `zhm-v2` cache holds all 4 assets (F7) |
| meta R6 leaderboard | PASS (code) | `lbRecord` on game over, top-50 persisted desc, top-5 title, top-10 + rank on game over |
| (unmapped) v2 hero/levels/abilities/touch | NO SPEC | F2 |

## DevGate gates run by this audit (head `a1dab6c`, DevGate main @ latest clone 2026-09-13)

| Gate | Result | What it actually proved |
|---|---|---|
| run-tests.mjs (npm test) | 8/8 pass | Parse, offline-refs, mirror, cache-bump are real; 3 presence checks; 1 vacuous JSON round-trip; zero gameplay logic covered |
| guardrails-scan.mjs | CLEAN | Pattern baseline over repo files |
| regression_check.py --staged --pre-commit | green, vacuous | Nothing staged; scans uncommitted changes only |
| regression_check.py --all | CRASH | HEAD~20 does not exist on a 3-commit repo |
| spec_traceability.py | exit 2 | Looks in openspec/specs/; this repo uses openspec/changes/<name>/specs/ |
| semantic-scan.mjs | exit 1 | typescript compiler API not installed in this repo |
| silent-success-scan.sh | OK | 0 hits against allowlist |

## Live verification (cloud Chrome, 390x844 iPhone viewport, https://thearchitectit.github.io/zombie-hero-match/)

Verified at head `a1dab6c` (Pages last-modified 02:07:59 GMT, byte-identical to branch `index.html`):
- Title + class select renders at 390x844; real tap on SOLDIER starts wave 1 (spawn queue 6 = 4+2*1).
- Real match via the game's own swap path: regular zombie (hp 30) killed, +5 gold, +100 score, +10 hero XP.
- Invalid swap: board reverted byte-identical, input lock released (snap-back works).
- Hero: 510 XP -> level 4, unlock toast fired, Shockwave button appeared, cast set cooldown to 18s.
- Reload: Continue button labeled "WAVE 1 (Soldier, Lv4)"; restore verified (wave/gold/upgrades/heroLvl/heroXP);
  score reset to 0 (F6).
- Service worker: active; cache `zhm-v2` contains `/`, `index.html`, `zombie-hero-match.html`, `sw.js`.
- Caveat: the headless tab is `visibilityState: hidden`, rAF ran ~5.5fps, so march/spawn cadence at full frame
  rate was not observable live (design.md already documents background throttling). Wave-1 crossing time is
  supported by code math (~23.8s), not by live observation. Real-device feel and iOS audio remain unverified
  (carried over from the v1 handoff's own "Not verified" list).

## What was NOT verified
- Fidelity of zombie stat profiles "ported from zombietoss" (zombietoss repo not read).
- Real-device touch feel, iOS WebAudio unlock, airplane-mode play, landscape/other viewports.
- Balance past early waves (v1 design's own open question, still open).

## Addendum (21:12 CT)

While this document was being committed, `18eac1b` ("v2.1: field hero sprite now switches to the class
emoji") landed - a 2-line change (hero emoji set from `heroDef().emoji` on game start/continue, mirrored to
index.html). Diff reviewed: it does not alter any finding above, and adds one more unspecced v2-era change
(reinforces F2). Branch head at commit time of this audit doc: `e5c37bd`.
