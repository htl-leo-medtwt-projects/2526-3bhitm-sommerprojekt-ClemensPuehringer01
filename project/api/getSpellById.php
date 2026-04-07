<?php
require_once "db.php";

$id = $_GET['id'] ?? 0;

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
WHERE z.zauberId = ?
GROUP BY z.zauberId
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();

$result = $stmt->get_result();

header('Content-Type: application/json');
echo json_encode($result->fetch_assoc());
?>