import {chromium} from '@playwright/test';
import {readFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
const axe=await readFile('node_modules/axe-core/axe.min.js','utf8');
const errors=[];
await mkdir('test-results',{recursive:true});
try{
 for(const width of [360,390,768,1440]){
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
  const page=await context.newPage();page.on('pageerror',err=>errors.push(String(err)));
  for(const path of ['index.html','about.html','projects.html','mission.html','team.html','meetings.html']){
   await page.goto(`http://127.0.0.1:4173/${path}`);await page.evaluate(()=>document.fonts.ready);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${path} overflows at ${width}`);
   assert.equal(await page.locator('h1').count(),1);
   await page.addScriptTag({content:axe});
   const results=await page.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','best-practice']}}));
   assert.deepEqual(results.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],`${path} accessibility at ${width}`);
   for(const img of await page.locator('img').all()){await img.scrollIntoViewIfNeeded();assert.ok(await img.evaluate(el=>el.complete&&el.naturalWidth>0),'image loads');}
   if(width===390||width===1440){await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`test-results/${path.replace('.html','')}-${width}.png`,fullPage:true});}
  }
  if(width<760){await page.goto('http://127.0.0.1:4173/');const menu=page.getByRole('button',{name:'Menu'});await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false');assert.ok(await menu.evaluate(el=>el===document.activeElement));await menu.click();await page.locator('#main-nav').getByRole('link',{name:'About us'}).click();assert.ok(page.url().endsWith('about.html'));}
  await context.close();console.log(`Passed ${width}px: 6 pages, overflow, images, axe AA${width<760?', mobile menu':''}`);
 }
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const page=await context.newPage();await page.goto('http://127.0.0.1:4173/');assert.ok(await page.getByRole('heading',{level:1}).isVisible());assert.ok(await page.locator('#main-nav').getByRole('link',{name:'About us'}).isVisible());await page.locator('#main-nav').getByRole('link',{name:'About us'}).click();assert.ok(page.url().endsWith('about.html'));await context.close();
 assert.deepEqual(errors,[]);console.log('Passed JavaScript-disabled navigation and zero browser errors.');
}finally{await browser.close();}
