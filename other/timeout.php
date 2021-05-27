<?php
require_once 'steam-condenser.php';

// Setting the timeout to 50ms (default is 1000ms / 1s)
SteamSocket::setTimeout(50);

// Query a local server which should respond quite fast
$server = new SourceServer(new InetAddress('192.168.0.5'));
$server->getRules();

// Setting the timeout to 2000ms
SteamSocket::setTimeout(2000);

// Query a server somewhere in the internet, it may be slow
$server = new SourceServer(new InetAddress('server.far.away'));
$server->getRules();
?>