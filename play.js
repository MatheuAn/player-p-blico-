


const root = document.querySelector('#root');
const modelo = `
<section class="secvideo video-container custom-video-player">
      <video id="myVideo" poster="${dados.posterurl}">
          <source id="videoSource" src="" preload="auto">
      </video>
          <source id="videoSource" src="" preload="auto">
          </video>
          <div class="bannerads">
            <button id="closeButton" onclick="closeBanner()" disabled>
              <div id="countdownpp">5</div>
            </button>
            <div id="contbanner">${dados.adsbanner}</div>
          </div>
          <span class="poster">
            <img src="">
          </span>
          <div id="controlsplayer">
            <span class="superiorpart">
              <span>
                <img id="logo" src="${dados.logoSrc}">
              <h8 id="tituloEpi">${dados.tituloEpi}</h8>
              </span>
              <button class="buttonjmp" id="eplinkpro">Próx. Ep</button>
              <button class="buttonjmp" id="pularop">Pular 90s</button>
            </span>
            <span class="medialpart">
              <button id="minusseg"></button>
              <button id="customPlayPauseBtn"></button>
              <button id="moreseg"></button>
            </span>
            <span class="endpart">
              <div class="timeline">
                <input class="progressao" type="range" min="0" max="100" value="0" step="0.01">
              </div>
              <div class="morebtn">
                <button id="volumepp">
                  <input class="volu" type="range" min="0" max="100" value="100">
                </button>
                <button class="velocidade speed-btn">1x</button>
                <span class="current-time">00:00</span>
                <span class="total-time"></span>
                <button id="qualidade">
                  <h8 id="qAtual"></h8>
                </button>
                <h3 id="video480p" data-source="${dados.video480p}" onclick="changeSource(this)">460p</h3>
                <h3 id="videoPrincipal" class="hd" data-source="${dados.videoPrincipal}" onclick="changeSource(this)">720p</h3>
                <h3 id="video1080p" data-source="${dados.video1080p}" onclick="changeSource(this)">1080p</h3>
                <button id="fullcontrols" class="full-screen-btn"></button>
              </div>
            </span>
          </div>
          </section>
    `


root.insertAdjacentHTML('beforeend', modelo);

const video = document.querySelector("video");
const progressaoInput = document.querySelector(".progressao");
let isSeeking = false;

progressaoInput.addEventListener("input", function() {
  isSeeking = true; 
  const novoTempo = (video.duration / 100) * progressaoInput.value;
  video.currentTime = novoTempo;
});

video.addEventListener("timeupdate", function() {
  if (!isSeeking) {
    const porcentagemConcluida = (video.currentTime / video.duration) * 100;
    progressaoInput.value = porcentagemConcluida;
  }
});

progressaoInput.addEventListener("mouseup", function() {
  isSeeking = false;
});



//controlsplyer
document.addEventListener('DOMContentLoaded', function () {
  var controlsPlayer = document.getElementById('controlsplayer');

  controlsPlayer.addEventListener('click', function (event) {
    var clickedElement = event.target;

    if (!isClickableElement(clickedElement)) {
      controlsPlayer.classList.toggle('controloff');
    }
  });

  function isClickableElement(element) {
    return (
      element.tagName === 'BUTTON' ||
      element.tagName === 'IMG' ||
      element.tagName === 'A' ||
      element.tagName === 'INPUT' ||
      element.hasAttribute('onclick') ||
      element.hasAttribute('href') ||
      element.hasAttribute('type')
    );
  }
});



// volume
const volumeBtn = document.getElementById('volumepp');

volumeBtn.addEventListener('click', toggleMute);

function toggleMute() {
  if (volumeBtn.classList.contains('notvol')) {
    volumeBtn.classList.remove('notvol');
  } else {
    volumeBtn.classList.add('notvol');
  }
}


// volume altura 
document.addEventListener('DOMContentLoaded', function () {
  var voluSlider = document.querySelector('.volu');
 
  var volumepp = document.getElementById('volumepp'); 
  video.volume = 1;

  voluSlider.addEventListener('input', function () {
    updateAfterWidth(voluSlider);
    updateVideoVolume(voluSlider);
  });

  function updateAfterWidth(slider) {
    var thumbWidth = getComputedStyle(slider).getPropertyValue('--thumb-width');
    var thumbPercent = (slider.value - slider.min) / (slider.max - slider.min);
    var afterWidth = thumbPercent * 100;

    slider.style.setProperty('--thumb-width', thumbWidth);
    slider.style.setProperty('--after-width', afterWidth + '%');

    if (video.volume === 0) {
      volumepp.classList.add('duplonotvol');
    } else {
      volumepp.classList.remove('duplonotvol');
    }
  }

  function updateVideoVolume(slider) {
    var volume = slider.value / 100;
    video.volume = volume;

    if (volume === 0) {
      volumepp.classList.add('duplonotvol');
    } else {
      volumepp.classList.remove('duplonotvol');
    }
  }
});




// pular opening animes
document.addEventListener('DOMContentLoaded', function () {
  var video = document.getElementById('myVideo');
  var pular90sBtn = document.getElementById('pularop');

  pular90sBtn.addEventListener('click', function () {
    skip(85); 
  });

  function skip(duration) {
    video.currentTime += duration;
  }
});

// próximo eplink
document.addEventListener('DOMContentLoaded', function () {
  var eplinkproBtn = document.getElementById('eplinkpro');
  var proxeplinkElement = document.querySelector('.proxeplink');

  if (!proxeplinkElement || !proxeplinkElement.getAttribute('href')) {
    eplinkproBtn.classList.add('off');
  }

  eplinkproBtn.addEventListener('click', function (event) {
    event.preventDefault(); 
    if (proxeplinkElement) {
      var linkHref = proxeplinkElement.getAttribute('href');
      if (linkHref) {
        window.location.href = linkHref; 
      }
    }
  });
});




//avançar e voltar seg
document.addEventListener('DOMContentLoaded', function () {
  var video = document.getElementById('myVideo');
  var minussegBtn = document.getElementById('minusseg');
  var moresegBtn = document.getElementById('moreseg');
  var controlsPlayer = document.getElementById('controlsplayer');

  var isButton = function (element) {
    return element.tagName.toLowerCase() === 'button';
  };

  controlsPlayer.addEventListener('dblclick', function (event) {
    if (isButton(event.target)) {
      return;
    }

    var x = event.clientX;
    var middle = controlsPlayer.offsetWidth / 2;

    if (x > middle) {
      moresegBtn.click();
      moresegBtn.classList.add('active');
      minussegBtn.classList.remove('active');
      setTimeout(function () {
        moresegBtn.classList.remove('active');
      }, 100);
    } else {

      minussegBtn.click();
      minussegBtn.classList.add('active');
      moresegBtn.classList.remove('active');
      
      setTimeout(function () {
        minussegBtn.classList.remove('active');
      }, 100);
    }
  });

  minussegBtn.addEventListener('click', function () {
    skip(-10); 
  });

  moresegBtn.addEventListener('click', function () {
    skip(10); 
  });

  function skip(duration) {
    video.currentTime += duration;
  }
});




// qualidade
const endpartH3Elements = document.querySelectorAll('.endpart h3');

endpartH3Elements.forEach(h3 => {
  h3.addEventListener('click', function () {
    document.getElementById('customPlayPauseBtn').classList.add('play');

    document.getElementById('myVideo').play();
  });
});


document.addEventListener('DOMContentLoaded', function () {
    const hdElement = document.querySelector('.hd');
  if (hdElement) {
    changeSource(hdElement);
  }

  document.querySelectorAll('h3').forEach(h3 => {
    if (!h3.getAttribute('data-source')) {
      h3.classList.add('offline');
    }
  });
});

function changeSource(element) {
  const currentVideoTime = document.getElementById('myVideo').currentTime;

  document.querySelectorAll('h3').forEach(h3 => {
    h3.classList.remove('hd');
  });

  element.classList.add('hd');

  if (!element.getAttribute('data-source')) {
    element.classList.add('offline');
  }
  var videoSource = document.getElementById('videoSource');
  videoSource.src = element.getAttribute('data-source');

  console.log(`Link do data-source: ${element.getAttribute('data-source')}`);

  const qAtualElem = document.getElementById('qAtual');
  qAtualElem.textContent = element.textContent;

  const myVideo = document.getElementById('myVideo');
  myVideo.load();

  myVideo.addEventListener('loadeddata', function () {
  
    myVideo.currentTime = currentVideoTime;
  });
}




// qualidade button
const qualidadeBtn = document.getElementById('qualidade');

qualidadeBtn.addEventListener('click', toggleMoreqClass);

function toggleMoreqClass() {
  qualidadeBtn.classList.toggle('moreq');

  const h3Elements = document.querySelectorAll('#qualidade.moreq + h3');

  h3Elements.forEach(h3 => {
    h3.classList.toggle('display-flex', qualidadeBtn.classList.contains('moreq'));
  });
}





// timeline
const progressInput = document.querySelector('.progressao');
const currentTimeElem = document.querySelector(".current-time");
const totalTimeElem = document.querySelector(".total-time");

progressInput.addEventListener('input', function () {
  const progress = progressInput.value / 100;
  const newTime = progress * video.duration;
  video.currentTime = newTime;

  progressInput.style.background = `linear-gradient(to right, var(--destaquepp) ${progress * 100}%, #ddd ${progress * 100}%)`;

  currentTimeElem.textContent = formatarTempo(newTime);
});

video.addEventListener('timeupdate', function () {
  const progress = (video.currentTime / video.duration) * 100;
  progressInput.value = progress;

  progressInput.style.background = `linear-gradient(to right, var(--destaquepp) ${progress}%, #ddd ${progress}%)`;

  currentTimeElem.textContent = formatarTempo(video.currentTime);
 if (!isNaN(video.duration) && isFinite(video.duration) && video.duration > 0) {
    totalTimeElem.textContent = formatDuration(video.duration);
  }
});
video.addEventListener('loadeddata', function () {

  if (!isNaN(video.duration) && isFinite(video.duration) && video.duration > 0) {
    totalTimeElem.textContent = formatDuration(video.duration);
  }
});


function formatarTempo(tempo) {
  const minutos = Math.floor(tempo / 60);
  const segundos = Math.floor(tempo % 60);
  const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;
  const segundosFormatados = segundos < 10 ? `0${segundos}` : segundos;
  return `${minutosFormatados}:${segundosFormatados}`;
}

function formatDuration(time) {
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);
  if (hours === 0) {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  } else {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}






//play pause
    
document.addEventListener('DOMContentLoaded', function () {
  var video = document.getElementById('myVideo');
  var playPauseBtn = document.getElementById('customPlayPauseBtn');
  var posterElement = document.querySelector('.poster');
  var bannerElement = document.querySelector('.bannerads');
  var countdownElement = document.getElementById('countdownpp');
  var closeButton = document.getElementById('closeButton');
  var contBannerElement = document.getElementById('contbanner');
  var bannerVisible = false;

  posterElement.querySelector('img').src = video.poster;

  playPauseBtn.addEventListener('click', function () {
    posterElement.classList.add('off');

    if (contBannerElement.textContent.trim() !== '') {
      bannerElement.classList.add('on');

      video.pause();

      startCountdown();

      bannerVisible = true;
    } else {
      if (video.paused || video.ended) {
        video.play();
      } else {
        video.pause();
      }

      bannerVisible = false;
    }

    playPauseBtn.classList.toggle('play');
  });

  video.addEventListener('ended', function () {
    playPauseBtn.classList.remove('play');

    posterElement.classList.remove('off');

    bannerElement.classList.remove('on');
    bannerVisible = false;
  });

  closeButton.addEventListener('click', function () {
    bannerElement.style.display = 'none';
    bannerElement.classList.add('on');

    countdownElement.textContent = '5';
    video.play();
    bannerVisible = false;
  });

  function startCountdown() {
    var countdownValue = 5;

    var countdownInterval = setInterval(function () {
      countdownValue--;

      countdownElement.textContent = countdownValue === 0 ? 'X' : countdownValue;

      if (countdownValue === 0) {
        clearInterval(countdownInterval); 
        closeButton.removeAttribute('disabled'); 
      }
    }, 1000);
  }
});



// velocidade
const speedBtn = document.querySelector(".speed-btn")

speedBtn.addEventListener("click", changePlaybackSpeed)
function changePlaybackSpeed() {
  let newPlaybackRate = video.playbackRate + 0.25
  if (newPlaybackRate > 2) newPlaybackRate = 0.25
  video.playbackRate = newPlaybackRate
  speedBtn.textContent = `${newPlaybackRate}x`
}


// View Modes
const fullScreenBtn = document.querySelector(".full-screen-btn");
const videoContainer = document.querySelector(".video-container");

fullScreenBtn.addEventListener("click", toggleFullScreenMode);

function toggleFullScreenMode() {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

document.addEventListener("fullscreenchange", () => {
  videoContainer.classList.toggle("full-screen", document.fullscreenElement);
  if (document.fullscreenElement) {
    videoContainer.style.width = "100vw";
    videoContainer.style.height = "100vh";
  } else {
    videoContainer.style.width = null;
    videoContainer.style.height = null;
  }
});


