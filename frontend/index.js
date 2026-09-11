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
            Raridade: ${message[info].rarity || "tchau"}<br>
            Imagem: <img src='${message[info].img}' width="200">
          </div>
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
    let enName = document.getElementById("input-en-name").value;
    let ptName = document.getElementById("input-pt-name").value;
    let cardGame = document.getElementById("card-game-select").value;
    let gameEdition = document.getElementById("game-edition-select").value;
    let rarity = document.getElementById("rarity-input").value;

    if(enName == "" || ptName == "" || cardGame == "select" || rarity == ""){
      document.getElementById("img-error-message").innerHTML = "erro";
      return;
    }

    let response = await fetch("http://localhost:9990/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        en_name: enName,
        pt_name: ptName,
        card_game: cardGame,
        game_edition: "Pokémon",
        rarity: rarity,
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

function showHelpInfo(buttonId) {
  if(document.getElementById(buttonId+"-card").className == "help-info"){
    document.getElementById(buttonId+"-card").className = "help-info card-show"
  } else{
    document.getElementById(buttonId+"-card").className = "help-info"
  }
}

getCards();

// https://medium.com/@vijayda1404/mastering-image-conversion-to-binary-format-with-javascript-426e89922dcf
function imageToBinary(file){
  const reader = new FileReader();

    reader.onload = (e) => {
      imageBase64 = e.target.result; //base64 string
      
      let imageSize = calculateImageSize(imageBase64);
      console.log(imageSize)
      // caso a imagem for maior que 4Mb (4096Kb -> limite do xampp/MySQL), enviar erro
      if (imageSize > 4096){
        document.getElementById("img-error-message").innerHTML = "A imagem precisa ter até 10Mb!";
        document.getElementById("img-error-message").className = "error-message";
        document.getElementById("img-input").value = "";
        return;
      }
      
      document.getElementById('output').innerHTML = `
        <img class="img-output" src='${imageBase64}'>
      `;
    };

    reader.readAsDataURL(file);
}

// função para evitar arquivos grandes demais no banco de dados (limite de 1024kb)
// https://stackoverflow.com/questions/73485602/calculate-the-size-of-a-base64-image-in-kb-mb
function calculateImageSize(base64){
  const baseString = base64.substring(base64.indexOf(',') + 1);
  const bits = baseString.length * 6;
  const bytes = bits/8;
  const kb = Math.ceil(bytes/1000);
  return kb;
}

document.getElementById('img-input').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    imageToBinary(file);
  }
});
