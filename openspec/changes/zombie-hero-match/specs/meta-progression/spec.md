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
Level 2 SHALL unlock a class passive; level 4 SHALL unlock a class active on
a circular on-field button with a cooldown readout, shown only once unlocked
and only during play. Soldier: Crit Burst (+15% crit, 4x) / Shockwave (18s,
damage + knockback to all). Mage: Chain Nova (50% arc) / Deep Freeze (22s,
4s full stop). Ranger: Volley (40% to a random zombie) / Arrow Storm (20s,
5 heavy arrows at random zombies). Cleric: Blessing (matches heal the wall)
/ Smite (25s, front 3 hit hard + wall heal 15). Necromancer: Soul Harvest
(+50% XP from kills) / Death Wave (24s, damages all, scales with kill count).
