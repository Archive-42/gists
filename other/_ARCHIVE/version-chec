<?php
require_once 'steam-condenser.php';

$game = 'cstrike';
error_reporting(E_ERROR);

$master = new MasterServer(MasterServer::SOURCE_MASTER_SERVER);
$challenge = $master->getChallenge();
$servers = $master->getServers(MasterServer::REGION_EUROPE, "\\gamedir\\{$game}");

echo "Found " . sizeof($servers) . " servers for '$game'...\n";
foreach($servers as $server) {
    try {
        $server = new SourceServer(new InetAddress($server[0]), $server[1]);
        $serverInfo = $server->getServerInfo();
        $data = array(
            'challenge' => $challenge,
            'gamedir'   => $serverInfo['gameDir'],
            'product'   => $serverInfo['gameDir'],
            'version'   => $serverInfo['gameVersion']
        );
        $reply = $master->sendHeartBeat($data);
        if(empty($reply)) {
            echo "Current version for '$game' is: {$serverInfo['gameVersion']}\n";
            break;
        } elseif($reply[sizeof($reply) - 1] instanceof M2S_REQUESTRESTART_Packet) {
            echo "Found outdated version for '$game': {$serverInfo['gameVersion']}\n";
        }
    } catch(TimeoutException $e) {}
}
?>