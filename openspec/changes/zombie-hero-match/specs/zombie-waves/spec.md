# Spec: zombie-waves

## Requirements

### R1: Types
The game SHALL provide regular, runner, armored, and brute zombies with the
hp/speed/armor/reward profile ported from zombietoss.

### R2: March
Zombies SHALL spawn at the right edge across 5 lanes and march left; a regular
zombie SHALL cross the field in roughly 20-25 seconds at wave 1. Slowed zombies
move at half speed; frozen zombies (Deep Freeze) do not move at all.

### R4: Boss waves
Every 10th wave (10, 20, ..., 100+) SHALL be a boss wave: one boss zombie
(visibly distinct - larger, red glow, 420 base hp, 0.15 armor, 25 dps,
150 gold / 200 XP / 5000 pts) spawns first, accompanied by half the normal
spawn count, and a 'BOSS WAVE n' toast SHALL announce it. The wave counter
SHALL be unbounded so the campaign runs past 100 levels.

### R3: Barricade
A zombie reaching the barricade SHALL attack it once per second for its type
DPS (scaled +10%/wave). Barricade HP reaching 0 SHALL end the run.

### R5: Weather
Every wave SHALL roll a weather condition - clear (45%), rain (15%), snow (15%),
fog (10%), storm (15%); boss waves (every 10th) SHALL instead roll clear 30% /
rain 15% / snow 15% / fog 10% / storm 30%. The previous wave's condition SHALL be
excluded from the roll so the weather always changes between waves. Conditions
SHALL render with 2.5D depth on two canvases sandwiching the horde (far/mid layers
behind, near layer in front): rain as 3 parallax batched-stroke drop layers with
wind-gust slant and ground splash rings; snow as 3 swaying flake layers with a
slowly accumulating ground band; fog as 3 parallax ground banks plus a foreground
drift band; storm as heavy rain plus a jagged foreground lightning bolt with sky
flash and thunder delayed 200-800ms; clear as parallax cloud shadows with dust
motes. Weather carries light gameplay flavor: rain boosts nature-match healing
+50%, snow extends ice slows +50%, fog slows the horde's march 10%, and storm
boosts bolt matches +50%. The current condition SHALL be announced at wave start,
shown in the HUD, and persisted in the save so Continue restores it.
#### Scenario: storm wave
Given a storm roll, when the wave starts, then rain and periodic lightning render,
the HUD shows the storm icon, and a bolt match deals 1.5x damage (and unlocks the
Stormcaller achievement the first time).

### R6: Gore
Every zombie kill SHALL produce visible gore on a dedicated canvas above the horde:
a burst of blood droplets (gravity, fast fade), 3 or more tumbling chunks (flesh,
bone, eyeball, teeth) with gravity, one floor bounce, spin, and fade, and a
splatter decal painted at the kill site that fades over roughly 8 seconds. Brute
and boss kills SHALL scale the burst up (boss: 40 droplets / 8 chunks plus a red
screen flash), and crit kills SHALL scale it by 1.5x; non-lethal crits SHALL puff
a small burst. Gore pools SHALL be capped (150 droplets, 40 chunks, 30 splats,
oldest dropped) so late-wave kills never degrade frame rate.
#### Scenario: boss kill gore
Given a boss zombie, when its hp reaches 0, then a large blood burst, ~8 tumbling
chunks, a wide splat, and a brief red flash render on the gore canvas, and the
splatter decal is still visible seconds later.
