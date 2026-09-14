# Risk register: zombie-hero-match

| Risk | Sev | Mitigation | Status |
|---|---|---|---|
| External asset/fonts break offline play | High | Emoji + inline CSS/JS only; gate test asserts no external refs | Closed |
| Touch misfires on real iOS (v1 shipped this: buttons dead, swaps resolved to stale coordinates) | High | bindTap touchend+click dedup, grid touch handlers with preventDefault, dataset re-sync every render; verified with real tap simulation on mobile viewport | Closed |
| Stale service-worker cache serves old build forever (cache-first SW) | High | Cache-name bump every release, activate deletes older caches, controllerchange auto-reload; verified by planting a zhm-v1 cache | Closed |
| Gates shipped red / handoff goes stale (happened at 1ad89db) | High | npm test is self-contained and runs from a fresh clone; gate runs on the exact tree before every push; handoff updated per release | Closed |
| Zombies stack in one lane (found in playtest) | High | Per-lane translateY in renderer; verified by screenshot | Closed |
| rAF throttling when tab backgrounded | Low | Movement/spawn are dt-based; resumes cleanly | Accepted |
| Deep-wave balance untested by hand | Med | Formula-tuned scaling; documented as open question | Open |
| localStorage unavailable (private mode) | Low | All saves wrapped in try/catch; game still runs | Closed |
| Save corruption | Low | JSON parse guarded; falls back to new game | Closed |
| File-size soft gate (inline JS) | Low | Single-file constraint is the requirement | Accepted |

| Weather animation burns phone battery/CPU | Med | CSS-only keyframe layers (no per-frame JS), single interval for storm flash, animations only mounted for non-clear weather | Closed |
| Achievement conditions fire from stale state | Low | conditions are pure predicates re-polled after every game event; unlocks persist immediately | Closed |
