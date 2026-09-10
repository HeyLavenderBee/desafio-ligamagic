var imageBase64 = "";

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
            Imagem: <img src='${message[info].img}' width="200"> <br>
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
  try {
    showLoading(true);
    let response = await fetch("http://localhost:9990/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        en_name: "Julia en",
        pt_name: "Julia pt-br",
        card_game: "pokemon",
        img: imageBase64,
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

// https://medium.com/@vijayda1404/mastering-image-conversion-to-binary-format-with-javascript-426e89922dcf
function imageToBinary(file){
  const reader = new FileReader();

    reader.onload = (e) => {
      imageBase64 = e.target.result; //base64 string
      
      document.getElementById('output').src = imageBase64;
      console.log("Base64 ready to send:", imageBase64.substring(0, 50) + "...");
    };

    reader.readAsDataURL(file);
}

document.getElementById('img-input').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    imageToBinary(file);
  }
});

// document.getElementById("backend-result").innerHTML = message[0].en_name;

getCards();
