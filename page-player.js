
  var meuIframe = document.getElementById("meuIframe");

  meuIframe.addEventListener('load', function() {
    meuIframe.style.height = meuIframe.contentWindow.document.body.scrollHeight + 'px';
  });


     var titlepostElement = document.querySelector('.titlepostagem');
     var tititpmElement = document.getElementById('tititpm');
     if (titlepostElement && tititpmElement) { 
       tititpmElement.textContent = 
titlepostElement.textContent;}

  document.addEventListener("DOMContentLoaded",function(){var n=document.querySelectorAll("#downloadpp a.statusText");n.forEach(function(e){e.getAttribute("href")||e.classList.add("nolink"),e.addEventListener("click",function(){n.forEach(function(t){t.classList.remove("onlink"),t.style.setProperty("--before-display","none")}),e.classList.add("onlink");var t=e.textContent;e.textContent="Baixando...",setTimeout(function(){e.textContent=t},6e3),setTimeout(function(){e.style.setProperty("--before-display","flex")},5e3)})})});

// downloadpp
function toggledowbpp(t){t.classList.toggle("active");var e=document.getElementById("downloadpp");t.classList.contains("active")?e.style.display="flex":e.style.display="none"}



// Like e deslike 
document.addEventListener('DOMContentLoaded', function() {
  function toggleActive(button) {
    var buttons = button.parentNode.getElementsByTagName('button');

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('active');
    }

    button.classList.add('active');
    localStorage.setItem('activeButtonId', button.id);
  }
  var activeButtonId = localStorage.getItem('activeButtonId');
  var activeButton = document.getElementById(activeButtonId);
  if (activeButton) {
    activeButton.classList.add('active');
  }
  var likeButton = document.getElementById('likepp');
  var dislikeButton = document.getElementById('deslikepp');

  likeButton.addEventListener('click', function() {
    toggleActive(this);
  });

  dislikeButton.addEventListener('click', function() {
    toggleActive(this);
  });
  var listas = document.querySelectorAll("ul[data-id]");

  listas.forEach(function (lista) {
    var listaItems = lista.querySelectorAll("li");

    listaItems.forEach(function (item) {
      item.addEventListener("click", function () {
        this.classList.toggle("visto");
        saveVistoState(lista);
        updateVistosCount(lista);
      });

      restoreVistoState(lista, item);
    });

    updateVistosCount(lista);
  });

  function saveVistoState(lista) {
    var vistoArray = [];

    lista.querySelectorAll("li").forEach(function (item, index) {
      if (item.classList.contains("visto")) {
        vistoArray.push(index);
      }
    });

    localStorage.setItem("vistoArray_" + lista.dataset.id, JSON.stringify(vistoArray));
  }

  function restoreVistoState(lista, item) {
    var vistoArray = JSON.parse(localStorage.getItem("vistoArray_" + lista.dataset.id)) || [];

    vistoArray.forEach(function (index) {
      lista.querySelectorAll("li")[index].classList.add("visto");
    });
  }

  function updateVistosCount(lista) {
    var vistosCount = lista.querySelectorAll("li.visto").length;
    var spanVistos = document.getElementById("lidospm");
    
    if (spanVistos) {
      spanVistos.textContent = vistosCount;
    }
  }
});
