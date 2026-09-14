# Handoff: zombie-hero-match

## Gate results (2026-09-13, v3 head)
- node --test tests/game.test.js: 8/8 pass (offline self-containment, mobile
  shell, per-block JS parse, systems presence, v2 systems presence, index.html
  mirror, sw cache-name bump, save schema) - self-contained, runs from a fresh
  clone via npm test; verified from a clean clone before push.
- Gate policy since the 1ad89db red-ship: the gate runs on the exact tree
  being pushed, before every push.

## Live playtest (cloud Chrome, 390x844 iPhone viewport, real tap simulation)
Verified at v2 heads and re-run after remediation: title + class pick via touch
tap; valid swap sticks and kills; invalid swap snaps back with flash; hero
stands left, swings and fires class-flavored projectiles on matches (soldier
tracer, mage orb + chain-nova arc); gainXP drives level-ups with unlock toasts
(Lv2 passive, Lv4 active); Shockwave kills/knocks back the horde on an 18s
cooldown; Deep Freeze stops brutes for 4s on a 22s cooldown; shop purchase via
touch deducts gold; reload -> Continue restores wave/gold/hero level/XP/score;
planted zhm-v1 cache is deleted by the new SW on activate (v2 kept) and the
page self-reloads onto the new build.

## Not verified
- Real-device feel and iOS audio (tested with synthetic touch in cloud Chrome,
  not on a physical phone; first real-device pass is Roger's).
- Airplane mode on hardware (offline self-containment is gate-tested, SW cache
  verified, but not flown yet).
- Balance beyond ~wave 8.
