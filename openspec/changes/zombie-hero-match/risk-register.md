# Risk register: zombie-hero-match

| Risk | Sev | Mitigation | Status |
|---|---|---|---|
| External asset/fonts break offline play | High | Emoji + inline CSS/JS only; gate test asserts no external refs | Closed |
| Touch misfires (scroll/zoom) | High | touch-action:none, pointer events, 53px tiles | Closed |
| Zombies stack in one lane (found in playtest) | High | Per-lane translateY in renderer; verified by screenshot | Closed |
| rAF throttling when tab backgrounded | Low | Movement/spawn are dt-based; resumes cleanly | Accepted |
| Deep-wave balance untested by hand | Med | Formula-tuned scaling; documented as open question | Open |
| localStorage unavailable (private mode) | Low | All saves wrapped in try/catch; game still runs | Closed |
| Save corruption | Low | JSON parse guarded; falls back to new game | Closed |
| File-size soft gate (451 lines inline JS) | Low | Single-file constraint is the requirement; warning documented | Accepted |
