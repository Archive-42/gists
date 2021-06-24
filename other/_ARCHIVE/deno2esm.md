## The problem

Deno uses imports with `.ts` extension, for which tsc compiler complains. 

This is a "deno only" solution to convert Deno code to ESM usable by Node or browsers (given it doesn't use Deno specifica apis of course)

## A Deno only solution

```ts
// deno2esm.ts

import {walkSync, WalkEntry} from 'https://deno.land/std/fs/walk.ts';
import {ensureDirSync} from 'https://deno.land/std/fs/ensure_dir.ts';

function slashPath (s:string) : string {
  return s.replace(/[\/\\]+/g,'/')
}

export async function deno2esm (
  src: string, 
  dest: string, 
  filter?: (walkEntry:WalkEntry)=>boolean
  // options: CopyOptions = {},   // TODO use std/fs/copy.ts : copyFileSync instead of plain Deno.copyFileSync
): Promise<void>
{

  let slashSrc = slashPath(src);
  let slashDest = slashPath(dest);

  for (let walkEntry of walkSync(src)) {
    walkEntry.path = slashPath(walkEntry.path);

    if (filter && !filter(walkEntry)) { continue }

    let destPath = walkEntry.path.replace(src, dest).replace('.ts','.js');

    if (walkEntry.isDirectory) {
      ensureDirSync(destPath);
    }

    if (walkEntry.isFile) { 
      let sourceContent = Deno.readTextFileSync(walkEntry.path);
      
      let transpiled = await Deno.transpileOnly(
        {"_": sourceContent },
        {sourceMap:false}
      );
      let destContent = transpiled['_'].source.replace(/\.ts(["'])/g,'.js$1');

      Deno.writeTextFileSync(destPath, destContent);
    }
  }
}

// -- example
deno2esm('zz/src','zz/out');
```
