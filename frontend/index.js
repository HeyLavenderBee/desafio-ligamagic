document.getElementById("error-message").style.setProperty("display", "none");
document.getElementById("loading-message").style.setProperty("display", "none");

async function checkUser() {
  try {
    showLoading(true);
    let response = await fetch("http://localhost:8080/login");
    const data = await response.json();

    if (data.status != "success") return;

    window.location.href = "dashboard.html";
  } catch (e) {
    document.getElementById("error-message").style.setProperty("display", "block");
    document.getElementById("error-message").innerHTML = `Ocorreu um erro: ${e.message}`;
  } finally{
    showLoading(false);
  }
}

function showLoading(visible){
  if (visible){
    document.getElementById("loading-message").style.setProperty("display", "block");
    document.getElementById("login-button").style.setProperty("disabled", true);
    document.getElementById("loading-message").innerHTML = `Carregando...`;
  } else{
    document.getElementById("loading-message").style.setProperty("display", "none");
    document.getElementById("loading-message").innerHTML = ``;
    document.getElementById("login-button").style.setProperty(false);
  }
}
