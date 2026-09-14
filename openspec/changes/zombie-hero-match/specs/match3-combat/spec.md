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
Soldier SHALL apply +30% damage and 2.2x fire; Mage SHALL splash 60% of match
damage to all zombies in the target's lane. Class perks SHALL scale via the
perk upgrade track.

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
projectile (Soldier: fast tracer; Mage: slower glowing orb) that impacts the
target with a flash. Chain Nova SHALL show a lightning arc from the first
target to the second.
