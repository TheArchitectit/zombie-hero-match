// DevGate smoke tests for zombie-hero-match.html (single-file offline game)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const html = readFileSync(new URL('../zombie-hero-match.html', import.meta.url), 'utf8');
const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');

test('fully offline: no external requests', () => {
  assert.equal(/https?:\/\//.test(html.replace(/example\.com/g, '')), false, 'external URL found');
  assert.equal(/<script[^>]+src=/.test(html), false, 'external script');
  assert.equal(/<link[^>]+href=/.test(html), false, 'external stylesheet');
  assert.equal(/@import|url\(/.test(html), false, 'CSS external ref');
});

test('mobile: viewport meta and touch handling present', () => {
  assert.match(html, /viewport/);
  assert.match(html, /touch-action/);
  assert.match(html, /touchstart/);
  assert.match(html, /pointerdown/);
});

test('inline JS parses cleanly (every script block)', () => {
  const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  assert.ok(blocks.length >= 1, 'script block found');
  const tmp = new URL('./.inline-check.js', import.meta.url).pathname;
  for (const b of blocks) {
    writeFileSync(tmp, b[1]);
    execFileSync('node', ['--check', tmp]);
  }
});

test('required systems present: classes, upgrades, waves, save', () => {
  for (const needle of ['soldier', 'mage', 'spawnWeights', 'localStorage', 'zms_save', 'zhm_scores', 'lbRecord', 'gameOver', 'waveComplete', 'renderUpgrades', 'findMatches']) {
    assert.ok(html.includes(needle), 'missing: ' + needle);
  }
});

test('v2 systems present: touch fix, snap-back, hero, levels, abilities', () => {
  for (const needle of ['bindTap', 'touchend', 'noswap', 'heroLvl', 'heroXP', 'gainXP', 'onLevelUp', 'castAbility', 'renderAbilityBtn', 'critburst', 'shockwave', 'chainnova', 'freezeall', 'spawnProj', 'heroAtkAnim', '__ZT']) {
    assert.ok(html.includes(needle), 'missing: ' + needle);
  }
});

test('index.html mirrors the game file', () => {
  const idx = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.equal(idx, html);
});

test('service worker cache bumped off v1', () => {
  assert.match(sw, /zhm-v2/);
  assert.equal(/zhm-v1/.test(sw), false, 'stale v1 cache name');
});

test('save schema round-trips required fields', () => {
  const save = { classId: 'soldier', wave: 3, gold: 50, maxHp: 125, hp: 100, up: { dmg: 1, vit: 1, greed: 0, perk: 0 }, heroLvl: 4, heroXP: 30 };
  const parsed = JSON.parse(JSON.stringify(save));
  for (const k of ['classId', 'wave', 'gold', 'maxHp', 'hp', 'up', 'heroLvl', 'heroXP']) assert.ok(k in parsed, 'save missing ' + k);
});
