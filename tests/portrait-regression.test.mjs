import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {renderCharacterSVG} from '../js/ui/avatarRenderer.js';
import {CHARACTER_PROMPTS} from '../js/data/characterPrompts.js';
import {CHARACTERS} from '../js/data/characters.js';
test('all twelve portrait variants are distinct and mapped to the intended emotions',()=>{
 for(const c of CHARACTERS){const data=CHARACTER_PROMPTS[c.id];const base=fs.readFileSync(new URL('../'+data.imagePath,import.meta.url));
 const alt=fs.readFileSync(new URL('../'+(data.emotionalImagePath||`assets/characters/${c.id}_emotional.png`),import.meta.url));
 assert.ok(!base.equals(alt),c.id);
 assert.match(renderCharacterSVG(c,'neutral'),/data-portrait-variant="base"/);
 assert.match(renderCharacterSVG(c,c.id==='han_xiao'?'playful':'vulnerable'),/data-portrait-variant="emotional"/);
 if(c.id==='han_xiao')assert.match(renderCharacterSVG(c,'anxious'),/data-portrait-variant="base"/);
 }
});
