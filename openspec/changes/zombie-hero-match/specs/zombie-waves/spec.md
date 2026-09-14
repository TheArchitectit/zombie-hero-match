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
fog (10%), storm (15%) - rendered as CSS-only ambient layers over the battlefield
(animated rain streaks, drifting snowflakes, parallax fog bands, storm rain plus
periodic lightning flashes with delayed synthesized thunder). Weather carries
light gameplay flavor: rain boosts nature-match healing +50%, snow extends ice
slows +50%, fog slows the horde's march 10%, and storm boosts bolt matches +50%.
The current condition SHALL be announced at wave start, shown in the HUD, and
persisted in the save so Continue restores it.
#### Scenario: storm wave
Given a storm roll, when the wave starts, then rain and periodic lightning render,
the HUD shows the storm icon, and a bolt match deals 1.5x damage (and unlocks the
Stormcaller achievement the first time).
