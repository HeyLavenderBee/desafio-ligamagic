function showLoading(isLoading) {
  if (isLoading) {
    document.getElementById("loading-icon").innerHTML = "Carregando...";
  } else {
    document.getElementById("loading-icon").innerHTML = "";
  }
}

async function getCards() {
  try {
    showLoading(true);
    let response = await fetch("http://localhost:9990/cards");
    const data = await response.json();
    const message = data.message;

    if (data.status != "success") {
      console.log(message);
      return;
    }

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
            Edição: ${message[info].game_edition || "tchau"}<br>
            Imagem: ${message[info].img || "tchau"}<br>
            Raridade: ${message[info].rarity || "tchau"}
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

async function createCard() {
  console.log(new Blob(document.getElementById("img-input").value));
  try {
    showLoading(true);
    let response = await fetch("http://localhost:9990/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        en_name: "Julia en",
        pt_name: "Julia pt-br",
        card_game: "pokemon",
        img: "oieimgsdjfk",
      }),
    });
    const data = await response.json();
    console.log("resposta post: ", data);
  } catch (e) {
    console.log(e.message);
  } finally {
    showLoading(false);
  }
}

// document.getElementById("backend-result").innerHTML = message[0].en_name;

getCards();
