<?php
// Be sure that the path is correct
require_once "/path/to/steam-condenser/lib/steam-condenser.php";

// Add your server's IP address here ...
$ipAddress = new InetAddress("x.x.x.x");
// ... and port number here
$portNumber = yyyyy;
$server = new GoldSrcServer($ipAddress, $portNumber);

$players = $server->getPlayers("passw0rd"); // Player pings are only available if the RCON password is provided
echo "<table>";
echo "<tr><th>Name</th><th>Score</th><th>Ping</th></tr>";
foreach($players as $player) {
    echo "<tr>";
    echo "<td>{$player->getName()}</td>";
    echo "<td>{$player->getScore()}</td>";
    echo "<td>{$player->getPing()}</td>";
    echo "</tr>";
}
echo "</table>";
?>