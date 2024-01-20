<?php

//  Restituisce le prime $limit entry in classifica.
function get_ranking($connection_string, $limit)
{
    $ret_val = false;
    $db = pg_connect($connection_string) or die('Impossibile connettersi al database!');
    //  La seguente query SQL fornisce le prime $limit entry della tabella
    //  contenente i punteggi massimi (hiscore) per ciascun utente (GROUP BY nickname).
    $sql = 'SELECT nickname, MAX(score) AS hiscore
            FROM (SELECT * FROM "game" INNER JOIN "user" ON "game".email = "user".email)
            GROUP BY nickname
            ORDER BY hiscore DESC
            LIMIT $1';
    $result = pg_prepare($db, "Get-Ranking", $sql);
    if ($result) {
        $result = pg_execute($db, "Get-Ranking", array($limit));
        if ($result) {
            $ret_val = array();
            while ($row = pg_fetch_assoc($result)) {
                array_push($ret_val, $row);
            }
        }
    }
    pg_close($db);
    return $ret_val;
}
