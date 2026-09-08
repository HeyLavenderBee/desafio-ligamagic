<?php
include("connection.php");

//permite outras portas acessarem (CORS), e define outras configurações
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

$method = $_SERVER['REQUEST_METHOD'] ?? "GET";

if($method == "GET"){
    $sql = "SELECT * FROM cards";
    $sql_result = mysqli_query($conn, $sql);

    if($sql_result){
        $i = 0;
        while($row = mysqli_fetch_assoc($sql_result)){
            $result[$i]['id'] = $row['id'];
            $result[$i]['en_name'] = $row['en_name'];
            $result[$i]['pt_name'] = $row['pt_name'];
            $i++;
        }
        $response = ["status" => "success", "message" => $result];
    }

    // $response = ["status" => "success", "message" => "Não há nenhum dado, ou não foi possível conectar ao banco de dados."];
} else if ($method == "POST"){
    $response = ["status" => "success", "message" => "esse é um POST"];
} else {
    http_response_code(404);
    $response = ["status" => "error", "message" => "not found"];
}

// é o que manda a resposta para o frontend
echo json_encode($response, JSON_PRETTY_PRINT);

?>
