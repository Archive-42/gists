  
# -- EDITAR AQUI

$nuevasEntradas = @( 
   @{ desc="usuario"; path="[c:]\vhd\am.vhd" } 
  # ,@{ desc="PM"; path="[d:]\vhd\pm.vhd" } 
)

$entradaPorDefecto = 0
$entradaMenuWindowsBase = " "


## -- FUNCIONES AUXILIARES

# -- borra entradas extra de bcdedit
function borra-entradas-extra {
    $bcdOut = (bcdedit)
    foreach ($linea in $bcdOut) {
      if ($linea -match 'Identificador.*(?<id>\{.*\})') {
        $id = $Matches.id
        if ($id -ne "{bootmgr}" -And $id -ne "{current}") {
          write-host "borrando $id"
          cmd /c "bcdedit /delete $id"
        }
      }
    }
}

function crea-nuevas-entradas {

  foreach ($entrada in $nuevasEntradas) {
    $entradaDesc = $entrada.item('desc')
    $entradaPath = $entrada.item('path')
    $nuevaEntradaOut = (bcdedit /copy "{current}" /d "$entradaDesc")
    $nuevaEntradaOut -match '.*(?<id>\{.*\})'
    $nuevoId = $Matches.id

    write-host "creando entrada $nuevoId $entradaDesc $entradaPath"
    # $nuevosIds += '"$nuevoId"'
    $nuevosIds.Add($nuevoId) 

    bcdedit /set "$nuevoId" device "vhd=$entradaPath"
    bcdedit /set "$nuevoId" osdevice "vhd=$entradaPath"
    bcdedit /set "$nuevoId" detecthal on
    bcdedit /set "$nuevoId" bootmenupolicy legacy
  }
}


function ordena-menu-inicio {
    write-host "configurando menu"

    bcdedit /set "{current}" description "$entradaMenuWindowsBase"
    #$idPorDefecto = $nuevosIds[$entradaPorDefecto]
    $idPorDefecto = $($nuevosIds[$entradaPorDefecto])

    $nuevosIdsStr = $nuevosIds -join " "   
    #write-host "nuevosIdsStr: $nuevosIdsStr"
    # no hubo manera de hacer funcionar lo siguiente sin cmd /c...
    cmd /c "bcdedit /displayorder $nuevosIdsStr {current}"
    bcdedit /set "{current}" bootmenupolicy legacy
    bcdedit /timeout 9999
    bcdedit /default "$idPorDefecto"

}

function proba-proba {
    $arrlist = [System.Collections.ArrayList]@()
    $arrlist.Add("cero")
    $arrlist.Add("uno")
    $elX = 0
    write-host "El $elX = $($arrlist[$elX])"

}


## -- MAIN

#Set-PSDebug -Trace 1   # debug

$nuevosIds = [System.Collections.ArrayList]@()

write-host "v19"
#proba-proba
borra-entradas-extra
crea-nuevas-entradas
ordena-menu-inicio
Read-Host -Prompt "Press Enter to exit"

