# Spec: zombie-waves

## Requirements

### R1: Types
The game SHALL provide regular, runner, armored, and brute zombies with the
hp/speed/armor/reward profile ported from zombietoss.

### R2: March
Zombies SHALL spawn at the right edge across 5 lanes and march left; a regular
zombie SHALL cross the field in roughly 20-25 seconds at wave 1.

### R3: Barricade
A zombie reaching the barricade SHALL attack it once per second for its type
DPS (scaled +10%/wave). Barricade HP reaching 0 SHALL end the run.

### R4: Wave scaling
Wave n SHALL spawn 4+2n zombies (+2 on waves divisible by 5), with hp x(1+0.22(n-1))
and a difficulty-weighted type table (brutes only from wave 5).

### R5: Feedback
Every zombie SHALL show an HP bar; kills SHALL play a sound, fade the body, and
float the gold reward.
