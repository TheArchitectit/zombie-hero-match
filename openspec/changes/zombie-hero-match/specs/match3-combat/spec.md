# Spec: match3-combat

## Requirements

### R1: Swap validation
The game SHALL allow swapping only orthogonally adjacent tiles and SHALL revert
any swap that produces no match, with a visible snap-back (return animation plus
a brief flash and error blip).
#### Scenario: invalid swap
Given two adjacent tiles whose swap makes no 3-in-line, when the player swaps
them, then the tiles animate across and return to their original positions.

### R2: Match resolution
Matches of 3+ same-color tiles (horizontal or vertical) SHALL clear, award one
attack per group, and cascade with a +50% damage multiplier per chain depth.
Match-4 SHALL pay 1.5x, match-5+ SHALL pay 2x.

### R3: Color effects
Each color SHALL apply its effect on every match: fire bonus damage, ice slow
applied ONLY to zombies in the target's lane, nature barricade heal, bolt chain
damage to 2 additional zombies, arcane armor-piercing (+50% vs brute).

### R4: Class modifiers
The game SHALL offer 5 classes. Soldier: +30% damage, 2.2x fire. Mage: 60% of
match damage splashes to all zombies in the target's lane. Ranger: +15%
damage. Cleric: +10% damage, nature matches heal double. Necromancer: +20%
damage, 1.3x arcane. Class perks SHALL scale via the perk upgrade track.

### R5: No-move recovery
When no legal swap exists after resolution, the grid SHALL shuffle until at
least one legal swap exists and no immediate matches remain.

### R6: Touch input (real iOS)
All buttons SHALL respond to real device taps via a touchend handler plus a
click fallback, deduplicated so a single tap never fires twice. Tile input
SHALL support tap-select-then-tap-adjacent and swipe via touch events with
default prevented, with pointer events retained for mouse/stylus and suppressed
after touch. Tile DOM nodes SHALL carry their current grid coordinates at all
times (re-synced on every render), so taps always resolve to the tile shown
under the finger.

### R7: Hero-delivered attacks
Every match attack SHALL be delivered by the hero character standing left of
the field: the hero plays a swing/lunge animation and fires a class-flavored
projectile (Soldier: fast tracer; Mage: glowing orb; Ranger: arrow; Cleric: sparkle;
Necromancer: skull) that impacts the target with a flash. Chain Nova SHALL
show a lightning arc from the first target to the second; Volley SHALL fire
a second arrow at a random zombie.

### R8: Combos
The game SHALL detect and celebrate two combo shapes on every resolve step:
(a) any single match of 4 or more tiles, and (b) two or more match groups
resolving simultaneously (from one swap or a cascade). A 4-match pays +250
score, a 5+-match +500, and each simultaneous group beyond the first adds
+50% damage to every attack that step (DOUBLE x1.5, TRIPLE x2, QUAD x2.5)
plus +200 score per group. Each combo SHALL show a center-field banner
(e.g. '4-IN-A-ROW!', 'DOUBLE MATCH! x1.5', or both combined) with a combo
jingle, and SHALL feed the lifetime stats behind combo achievements.
#### Scenario: multi-line swap
Given a swap that completes a horizontal and a vertical match at once, when
the board resolves, then a 'DOUBLE MATCH! x1.5' banner appears, both groups'
attacks are multiplied by 1.5, and +400 score is awarded.
