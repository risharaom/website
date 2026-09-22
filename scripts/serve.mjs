import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.png':'image/png','.xml':'application/xml','.txt':'text/plain'};
const pages=new Set(['index.html','about.html','projects.html','mission.html','meetings.html','team.html','404.html','styles.css','script.js','sitemap.xml','robots.txt']);
createServer(async(req,res)=>{
 try{
  const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/website\//,'/').replace(/^\//,'') || 'index.html';
  if(!pages.has(path)&&!/^assets\/[a-z0-9-]+\.(webp|png)$/.test(path)){res.writeHead(404,{'Content-Type':types['.html']});return res.end(await readFile(new URL('404.html',root)));}
  const body=await readFile(new URL(path,root));
  res.writeHead(200,{'Content-Type':types[path.slice(path.lastIndexOf('.'))]||'application/octet-stream','Cache-Control':'no-cache'});res.end(body);
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:4173'));
