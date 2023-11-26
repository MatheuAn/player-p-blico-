var meuContainer = document.getElementById("meuContainer");

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    meuContainer.innerHTML = this.responseText;

    // Executa os scripts contidos no conteúdo carregado
    var scripts = meuContainer.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
      eval(scripts[i].innerText);
    }
  }
};
xhttp.open("GET", "index.html", true);
xhttp.send();
