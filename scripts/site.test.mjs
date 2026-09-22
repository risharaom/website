import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
const files=['index.html','about.html','projects.html','mission.html','meetings.html','team.html','404.html'];
const content=JSON.parse(await readFile('content.json','utf8'));
for(const file of files) test(`${file}: rendered content, metadata, links and anchors`,async()=>{
 const html=await readFile(file,'utf8');
 assert.equal((html.match(/<h1>/g)||[]).length,1);
 assert.match(html,/<html lang="en">/);
 assert.match(html,/<meta name="description"/);
 assert.match(html,/<meta property="og:image"/);
 assert.match(html,/<link rel="canonical"/);
 assert.match(html,/<main id="main"/);
 assert.match(html,/aria-controls="main-nav"/);
 assert.ok(html.includes(content.site.email));
 assert.ok(html.includes(content.site.instagram.url));
 assert.doesNotMatch(html,/lorem ipsum|coming soon|TODO|in development|empowering the next generation/i);
 const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,'IDs must be unique');
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
   const href=match[1]; if(/^(https?:|mailto:)/.test(href))continue;
   const [path,hash]=href.split('#');
   if(path)await access(path);
   if(hash){const target=path?await readFile(path,'utf8'):html;assert.ok(target.includes(`id="${hash}"`),`missing ${href}`);}
 }
 JSON.parse(html.match(/application\/ld\+json">(.*?)<\/script>/s)[1]);
});
test('sitemap uses configured base and excludes duplicate legacy URLs',async()=>{
 const xml=await readFile('sitemap.xml','utf8');
 assert.equal((xml.match(/<loc>/g)||[]).length,4);assert.ok(xml.includes(content.site.url));assert.doesNotMatch(xml,/meetings|team\.html|404/);
});
test('About story preserves requested sequence and all founders',async()=>{
 const html=await readFile('about.html','utf8');let previous=-1;
 for(const chapter of content.about.chapters){const index=html.indexOf(chapter.title);assert.ok(index>previous);previous=index;}
 for(const f of content.about.founders)assert.ok(html.includes(f.name));
});
