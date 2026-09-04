<?php
    $hostname = "localhost";
    $bd = "ligamagic_desafio";
    $user = "root";
    $password = "";

    $mysqli = new mysqli($hostname, $user, $password, $bd);
    if($mysqli -> connect_errno) {
        echo "Falha ao conectar.";
    } else {
        echo "Conectado ao Banco de Dados com sucesso!";
    }
?>