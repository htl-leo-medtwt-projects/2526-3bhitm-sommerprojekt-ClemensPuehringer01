<?php
require_once "db.php";

$sql = "
SELECT 
    z.zauberId,
    z.zauberName,
    s.schulenName,
    GROUP_CONCAT(k.klassenName SEPARATOR ', ') AS klassen,
    z.stufe,
    z.beschreibung
FROM zauber z
JOIN schule s ON z.schulenId = s.schulenId
LEFT JOIN zauber_klasse zk ON z.zauberId = zk.zauberId
LEFT JOIN klasse k ON zk.klassenId = k.klassenId
GROUP BY z.zauberId
ORDER BY z.zauberName
";

$result = $conn->query($sql);

$spells = [];

while ($row = $result->fetch_assoc()) {
    $spells[] = $row;
}

header('Content-Type: application/json');
echo json_encode($spells);
?>