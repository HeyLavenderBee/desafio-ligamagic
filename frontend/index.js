function showLoading(isLoading){
  if(isLoading){
    document.getElementById("loading-icon").innerHTML = "Carregando...";
  } else{
    document.getElementById("loading-icon").innerHTML = "";
  }
}

async function getCards() {
  try {
    showLoading(true);
    let response = await fetch("http://localhost:9990");
    const data = await response.json();
    const message = data.message;

    let cardsTotal = message.length;
    let resultHtml = ``;
    if (cardsTotal <= 0) {
      document.getElementById("total-cards").innerHTML =
        `Cartas existentes (${cardsTotal})`;
      document.getElementById("backend-result").innerHTML =
        "Não há cartas registradas ainda. Cadastre uma: <button>Criar carta</button>";
    } else {
      for (let info in message) {
        resultHtml += `
              <div class="card">
              Nome: ${message[info].en_name}<br>
              Nome pt-BR: ${message[info].pt_name}<br>
              Card Game: ${message[info].card_game || "tchau"}<br>
              Raridade: ${message[info].raridade || "tchau"}
              </div>
              <br>
          `;
      }
    }

    document.getElementById("total-cards").innerHTML =
      `Cartas existentes (${cardsTotal})`;
    document.getElementById("backend-result").innerHTML = resultHtml;
  } catch (e) {
    console.log("Não foi possível conectar ao backend.");
  } finally {
    showLoading(false);
  }
}

// document.getElementById("backend-result").innerHTML = message[0].en_name;

getCards();
