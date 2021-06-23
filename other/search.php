<?php

function search($searched, &$data, $keys) {

  function strip($s){
    return strtolower(str_replace(
      explode(' ', preg_replace('/ +/', ' ', 'č ć ž š đ  Č Ć Ž Š Đ  à á â ã ä ç è é ê ë ì í î ï ñ ò ó ô õ ö ù ú û ü ý ÿ À Á Â Ã Ä Ç È É Ê Ë Ì Í Î Ï Ñ Ò Ó Ô Õ Ö Ù Ú Û Ü Ý')),
      explode(' ', preg_replace('/ +/', ' ', 'c c z s dj C C Z S DJ a a a a a c e e e e i i i i n o o o o o u u u u y y A A A A A C E E E E I I I I N O O O O O U U U U Y')),
      $s));
  }

  $searchedArr = explode(" ", strip($searched));

  foreach ($data as &$d) {
    $d["score"] = 0;
    foreach ($keys as $k) {
      foreach ($searchedArr as $s) {
        if (strpos($d[$k["name"]], $s) !== false) {
          $d["score"] = $d["score"] + $k["weight"];
        }
      }
    }
  }

  usort($data, function ($a, $b) { return ($a["score"] > $b["score"] ? -1:1); });
  $data = array_filter($data, function($d) { return $d["score"] > 0; });

  return $data;
}

// ------------- MAIN

$data = json_decode(file_get_contents('./searchExample.json'), true);

$keys = [
  [ "name" => "title", "weight" => 2 ],
  [ "name" => "body",  "weight" => 1 ]
];

// $searched = "río vErde";
$searched = $_GET['search'];

$res = search($searched, $data, $keys);
$res = array_slice($data, 0, 10);
foreach ($res as &$r) {
  unset($r["body"]);
}

//var_dump($res);
echo json_encode($res, JSON_UNESCAPED_UNICODE);
?>