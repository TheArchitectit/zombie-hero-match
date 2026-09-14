# Spec: meta-progression

## Requirements

### R1: Save
The game SHALL persist {classId, wave, gold, maxHp, hp, upgrades} to localStorage
on wave start, wave clear, kill, upgrade purchase, and every 5 seconds.

### R2: Resume
On boot with an existing save, the title screen SHALL offer Continue labeled
with the saved wave and class, and Continue SHALL restore the full saved state.

### R3: Upgrades
The between-wave shop SHALL offer 4 tracks (damage, wall, gold, class perk) with
escalating costs, SHALL refuse unaffordable purchases, and buying Reinforce Wall
SHALL heal the barricade to full.

### R4: Game over
On defeat the game SHALL offer restart that keeps class, gold, and upgrades and
resumes at wave 1.

### R5: Offline
The file SHALL make zero network requests and SHALL be fully playable in
airplane mode.

### R6: Leaderboard
The game SHALL record a local leaderboard entry (name, score, wave, kills,
class, timestamp) on every game over, SHALL persist the top 50 entries sorted
by score descending in localStorage, and SHALL show the top 5 on the title
screen and top 10 with the player's rank on the game-over screen.
#### Scenario: new high score
Given a finished run, when the barricade falls, then the run's score appears
in the local board at its sorted rank after reload.
