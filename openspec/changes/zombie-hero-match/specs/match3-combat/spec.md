# Spec: match3-combat

## Requirements

### R1: Swap validation
The game SHALL allow swapping only orthogonally adjacent tiles and SHALL revert
any swap that produces no match.
#### Scenario: invalid swap
Given two adjacent tiles whose swap makes no 3-in-line, when the player swaps
them, then the tiles animate and return to their original positions.

### R2: Match resolution
Matches of 3+ same-color tiles (horizontal or vertical) SHALL clear, award one
attack per group, and cascade with a +50% damage multiplier per chain depth.
Match-4 SHALL pay 1.5x, match-5+ SHALL pay 2x.

### R3: Color effects
Each color SHALL apply its effect on every match: fire bonus damage, ice lane
slow, nature barricade heal, bolt chain damage to 2 additional zombies, arcane
armor-piercing (+50% vs brute).

### R4: Class modifiers
Soldier SHALL apply +30% damage and 2.2x fire; Mage SHALL splash 60% of match
damage to all zombies in the target's lane. Class perks SHALL scale via the
perk upgrade track.

### R5: No-move recovery
When no legal swap exists after resolution, the grid SHALL shuffle until at
least one legal swap exists and no immediate matches remain.
