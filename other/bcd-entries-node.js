
// --------------- CONFIGURACION --------------

let entradaPorDefecto = 0;  // 0 primera

let nuevasEntradas = [
  {desc: "AM", path: "[C:]\\vhd\\am.vhd"},
  {desc: "PM", path: "[E:]\\vhd\\pm.vhd"},

]

// ------------ FIN CONFIGURACION ---------------


const util = require('util');
const exec = util.promisify(require('child_process').exec);

;(async ()=>{  
 
 // borra antiguas entradas de VHDs en bcdedit, deja solo windows base
  let res, lineas;  // {stderr, stdout}
  res = await exec('bcdedit');	
  lineas = res.stdout.split(`\r\n`);
  
  for (linea of lineas) {
    if (linea.startsWith('Identificador')) {
      
      let id = linea.match(/{.*}/)[0];
      if ( id !== "{bootmgr}" && id !== "{current}") {

        console.log("borrando", id)
        res = await exec(`bcdedit /delete ${id}`)
      }
    }
  }



  // crea nuevas entradas
  await exec(`attrib +h -s c:\\vhd`)
  await exec(`attrib +h -s e:\\vhd`)

  let nuevosIds = [];
  for (let entrada of nuevasEntradas) {
    res = await exec(`bcdedit /copy {current} /d "${entrada.desc}"`)
    let nuevoId = res.stdout.match(/{.*}/)[0]
    console.log(`creando entrada ${nuevoId} ${entrada.desc} ${entrada.path}`)
    nuevosIds.push(nuevoId);

    await exec(`bcdedit /set ${nuevoId} device vhd=${entrada.path}`);
    await exec(`bcdedit /set ${nuevoId} osdevice vhd=${entrada.path}`);
    await exec(`bcdedit /set ${nuevoId} detecthal on`);
    await exec(`bcdedit /set ${nuevoId} bootmenupolicy legacy`);

  }

  // reconfigura menu inicio
  // windows base con entrada en blanco y al final
  console.log(`configurando menu`)
  await exec(`bcdedit /set {current} description " "`);  
  await exec(`bcdedit /displayorder ${nuevosIds.join(" ")} {current}`);
  await exec(`bcdedit /set {current} bootmenupolicy legacy`);
  await exec(`bcdedit /timeout 9999`);

  await exec(`bcdedit /default ${nuevosIds[entradaPorDefecto]}`);  // entrada por defecto
  
})(); // async

