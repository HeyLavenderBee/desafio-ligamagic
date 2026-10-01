<?php
include("connection.php");

//permite outras portas acessarem (CORS), e define outras configurações
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

$method = $_SERVER['REQUEST_METHOD'] ?? "GET";

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

//trata a requisição CORS do navegador
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

switch ($uri){
    case "/cards":
        if($method == "GET"){
            $stmt = $conn->query("SELECT * FROM cards");
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if($result){
                $response = ["status" => "success", "message" => $result];
            } else{
                $response = ["status" => "success", "message" => "Não há nenhum dado, ou não foi possível conectar ao banco de dados."];
            }
            
        }
        else if ($method == "POST"){
            $json_body = file_get_contents('php://input');
            $data = json_decode($json_body, true);
            if($data && isset($data['en_name'])){
                $en_name = $data['en_name'];
                $pt_name = $data['pt_name'];
                $card_game = $data['card_game'];
                $game_edition = $data['game_edition'];
                $rarity = $data['rarity'];
                $img = $data['img'];

                $sql = "INSERT INTO cards 
                    (en_name, pt_name, card_game, game_edition, rarity, img)
                    VALUES
                    (?, ?, ?, ?, ?, ?)
                ";

                $stmt = $conn->prepare($sql);

                if($stmt->execute([$en_name, $pt_name, $card_game, $game_edition, $rarity, $img])){
                    $response = ["status" => "success", "message" => "Carta criada com sucesso! Reinicie a página."];
                } else{
                    $response = ["status" => "error", "message" => "Não foi possível criar a carta. Tente novamente."];
                }
            }
        } else if ($method == "DELETE"){
            $json_body = file_get_contents('php://input');
            $data = json_decode($json_body, true);
            if($data && isset($data['id'])){
                $id = $data['id'];
                $stmt = $conn->prepare("DELETE FROM cards where id = ?");
                if($stmt->execute([$id])){
                    $response = ["status" => "success", "message" => "Carta deletada."];
                } else{
                    $response = ["status" => "error", "message" => "Não foi possível deletar a carta. Tente novamente."];
                }
            }
        } else {
            http_response_code(404);
            $response = ["status" => "error", "message" => "Ação não encontrada para cartas."];
        }
        break;
    case "/login":
        if($method == "GET"){
            $response = ["status" => "success", "message" => "Pegou usuário do banco."];
        }
        break;
    default:
        http_response_code(404);
        $response = ["status" => "error", "message" => "Rota não encontrada."];
        break;
}

// é o que manda a resposta para o frontend
echo json_encode($response, JSON_PRETTY_PRINT);

?>
