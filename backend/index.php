<?php
include("connection.php");

//permite outras portas acessarem (CORS), e define outras configurações
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

$method = $_SERVER['REQUEST_METHOD'] ?? "GET";

if($method == "GET"){
    $response = ["status" => "success", "message" => "esse é um GET"];
} else if ($method == "POST"){
    $response = ["status" => "success", "message" => "esse é um POST"];
} else {
    http_response_code(404);
    $response = ["status" => "error", "message" => "not found"];
}

// é o que manda a resposta para o frontend
echo json_encode($response, JSON_PRETTY_PRINT);


// $sql = "SELECT * FROM cards";
// $result = mysqli_query($conn, $sql);
// if($result){
//     $i = 0;
//     while($row = mysqli_fetch_assoc($result)){
//         $response[$i]['id'] = $row['id'];
//         $response[$i]['en_name'] = $row['en_name'];
//         $response[$i]['pt_name'] = $row['pt_name'];
//         $i++;
//     }
//     echo json_encode($response, JSON_PRETTY_PRINT);
// }
?>
