# Spec: meta-progression

## Requirements

### R1: Save
The game SHALL persist {classId, wave, gold, score, kills, maxHp, hp, upgrades,
heroLvl, heroXP} to localStorage on wave start, wave clear, kill, upgrade
purchase, ability cast, and every 5 seconds.

### R2: Resume
On boot with an existing save, the title screen SHALL offer Continue labeled
with the saved wave, class, and hero level, and Continue SHALL restore the full
saved state including score, kills, and hero progression.

### R3: Upgrades
The between-wave shop SHALL offer 4 tracks (damage, wall, gold, class perk) with
escalating costs, SHALL refuse unaffordable purchases, and buying Reinforce Wall
SHALL heal the barricade to full.

### R4: Game over
On defeat the game SHALL offer restart that keeps class, gold, score, kills,
upgrades, and hero level/XP, and resumes at wave 1.

### R5: Offline
The file SHALL make zero network requests and SHALL be fully playable in
airplane mode. The service worker SHALL bump its cache name every release,
SHALL delete older caches on activate, and the page SHALL reload itself once
when a new service worker takes control, so returning users always land on the
current build.

### R6: Leaderboard
The game SHALL record a local leaderboard entry (name, score, wave, kills,
class, timestamp) on every game over, SHALL persist the top 50 entries sorted
by score descending in localStorage, and SHALL show the top 5 on the title
screen and top 10 with the player's rank on the game-over screen.
#### Scenario: new high score
Given a finished run, when the barricade falls, then the run's score appears
in the local board at its sorted rank after reload.

### R7: Hero leveling
The hero SHALL gain XP from kills (type-based: 10 regular, 14 runner, 20
armored, 60 brute) and from wave clears (25 + 15 x wave), SHALL level up at
50 + 40 x level XP, and SHALL surface level and an XP progress bar in the HUD.
Level-ups SHALL announce themselves (glow + toast).

### R8: Ability unlocks
Level 2 SHALL unlock a class passive (Soldier: Crit Burst - +15% crit chance,
crits deal 4x; Mage: Chain Nova - matches arc 50% damage to a second zombie).
Level 4 SHALL unlock a class active on a circular on-field button with a
cooldown readout (Soldier: Shockwave, 18s - damage plus knockback to every
zombie; Mage: Deep Freeze, 22s - every zombie frozen still for 4s). The button
SHALL appear only once unlocked and only during play.
