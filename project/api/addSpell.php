<?php
require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$sql = "
INSERT INTO zauber (
    zauberName,
    schulenId,
    stufe,
    avgDmg,
    zeitaufwand,
    zeiteinheit,
    reichweite,
    verbalKomp,
    gestKomp,
    materKomp,
    materKompDet,
    wirkungsdauer,
    wirkungsdauerEinheit,
    beschreibung,
    userId
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "siiiisiiiisissi",
    $data['zauberName'],
    $data['schulenId'],
    $data['stufe'],
    $data['avgDmg'],
    $data['zeitaufwand'],
    $data['zeiteinheit'],
    $data['reichweite'],
    $data['verbalKomp'],
    $data['gestKomp'],
    $data['materKomp'],
    $data['materKompDet'],
    $data['wirkungsdauer'],
    $data['wirkungsdauerEinheit'],
    $data['beschreibung'],
    $data['userId']
);

$stmt->execute();

$zauberId = $conn->insert_id;

// Klassen
if (!empty($data['klassenIds'])) {
    $stmtClass = $conn->prepare(
        "INSERT INTO zauber_klasse (zauberId, klassenId) VALUES (?, ?)"
    );

    foreach ($data['klassenIds'] as $klasseId) {
        $stmtClass->bind_param("ii", $zauberId, $klasseId);
        $stmtClass->execute();
    }
}

echo json_encode([
    "success" => true,
    "zauberId" => $zauberId
]);
?>