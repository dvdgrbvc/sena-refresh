// Small dependency-free preview server. Production remains static hosting.
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = process.cwd();
const portIndex = process.argv.indexOf('--port');
const port = Number(portIndex >= 0 ? process.argv[portIndex + 1] : process.env.PORT || 3000);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.woff2':'font/woff2','.otf':'font/otf','.mp4':'video/mp4'};
createServer(async (request,response) => {
  try {
    const path = decodeURIComponent(new URL(request.url,'http://localhost').pathname);
    const file = resolve(root, '.' + (path === '/' ? '/index.html' : path));
    if (!file.startsWith(root + sep) || path.split('/').some((part) => part.startsWith('.')) || !types[extname(file)]) {response.writeHead(404).end();return;}
    const info = await stat(file);
    if (!info.isFile()) {response.writeHead(404).end();return;}
    let start=0,end=info.size-1,status=200;
    if (request.headers.range) {
      const match=/^bytes=(\d+)-(\d*)$/.exec(request.headers.range);
      if (!match) {response.writeHead(416,{'Content-Range':`bytes */${info.size}`}).end();return;}
      start=Number(match[1]);end=match[2] ? Math.min(Number(match[2]),end) : end;
      if(start>end || start>=info.size){response.writeHead(416,{'Content-Range':`bytes */${info.size}`}).end();return;}
      status=206;
    }
    response.writeHead(status,{'Content-Type':types[extname(file)],'Content-Length':end-start+1,'Accept-Ranges':'bytes','Cache-Control':'no-cache',...(status===206?{'Content-Range':`bytes ${start}-${end}/${info.size}`}:{})});
    if(request.method==='HEAD') response.end();else createReadStream(file,{start,end}).pipe(response);
  } catch {response.writeHead(404).end('Not found');}
}).listen(port,'0.0.0.0',()=>console.log(`Sena preview ready on port ${port}`));
