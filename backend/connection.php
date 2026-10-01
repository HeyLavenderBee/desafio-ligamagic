<?php
    $servername = "mysql";
    // $hostname = "localhost";
    $bd = "ligamagic_desafio";
    $user = "root";
    $password = getenv('DB_ROOT_PASSWORD') | "snoopyhoy";

    try{
        $conn = new PDO("mysql:host=$servername;dbname=$bd", $user, $password);
        
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // echo "Connected to MySQL successfully!";
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }

    // caso não for usar docker, descomente o conn de baixo e comente o das linhas 9 a 15:
    // $conn = mysqli_connect($hostname, $user, $password, $bd);
?>