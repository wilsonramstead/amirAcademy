(function () {
  "use strict";

  var btn = document.getElementById("aa-audio-btn");
  var audio = document.getElementById("aa-audio");
  if (!btn || !audio) return;

  var STORAGE_KEY_PLAYING = "aa_music_playing";
  var STORAGE_KEY_TIME = "aa_music_time";
  var STORAGE_KEY_SONG = "aa_music_song";

  var currentSong = audio.getAttribute("data-song") || "main";
  var storedSong = localStorage.getItem(STORAGE_KEY_SONG);
  var wasAlreadyPlaying = localStorage.getItem(STORAGE_KEY_PLAYING) === "true";
  var storedTime = parseFloat(localStorage.getItem(STORAGE_KEY_TIME)) || 0;

  // If switching songs (e.g. navigating to/from events), reset time
  if (storedSong && storedSong !== currentSong) {
    storedTime = 0;
  }

  localStorage.setItem(STORAGE_KEY_SONG, currentSong);

  var wantsToPlay = true;
  var unlocked = false;

  // If music was already playing on a previous page, restore position and autoplay
  // Otherwise, wait for first interaction and start from the beginning
  audio.addEventListener("loadedmetadata", function () {
    if (wasAlreadyPlaying && storedTime > 0 && storedTime < audio.duration) {
      audio.currentTime = storedTime;
    }
    tryPlay();
  });

  function tryPlay() {
    if (!wantsToPlay) return;
    var p = audio.play();
    if (p && p.then) {
      p.then(function () {
        unlocked = true;
        updateBtn(true);
        removeInteractionListeners();
      }).catch(function () {
        // Autoplay blocked — need user gesture to unlock
        // Start from beginning when user triggers it
        if (!wasAlreadyPlaying) {
          audio.currentTime = 0;
        }
        updateBtn(false);
        addInteractionListeners();
      });
    }
  }

  // Unlock audio on first user interaction
  function onFirstInteraction(e) {
    if (!wantsToPlay || unlocked) return;
    // If this is the audio button click, let the btn handler deal with it
    if (btn.contains(e.target)) return;
    // Start from beginning on first-ever activation
    if (!wasAlreadyPlaying) {
      audio.currentTime = 0;
    }
    audio.play().then(function () {
      unlocked = true;
      updateBtn(true);
      removeInteractionListeners();
    }).catch(function () {});
  }

  // These events fire BEFORE scrolling and count as user gestures in most browsers
  var interactionEvents = [
    "pointerdown", "mousedown", "touchstart",
    "keydown", "wheel", "click"
  ];

  function addInteractionListeners() {
    for (var i = 0; i < interactionEvents.length; i++) {
      document.addEventListener(interactionEvents[i], onFirstInteraction, { passive: true });
    }
  }

  function removeInteractionListeners() {
    for (var i = 0; i < interactionEvents.length; i++) {
      document.removeEventListener(interactionEvents[i], onFirstInteraction);
    }
  }

  // Persist time every 500ms while playing
  var saveInterval;
  audio.addEventListener("play", function () {
    updateBtn(true);
    localStorage.setItem(STORAGE_KEY_PLAYING, "true");
    saveInterval = setInterval(function () {
      localStorage.setItem(STORAGE_KEY_TIME, String(audio.currentTime));
    }, 500);
  });

  audio.addEventListener("pause", function () {
    updateBtn(false);
    localStorage.setItem(STORAGE_KEY_PLAYING, "false");
    localStorage.setItem(STORAGE_KEY_TIME, String(audio.currentTime));
    clearInterval(saveInterval);
  });

  // Loop the song
  audio.addEventListener("ended", function () {
    audio.currentTime = 0;
    audio.play();
  });

  // Save time right before navigating away
  window.addEventListener("beforeunload", function () {
    localStorage.setItem(STORAGE_KEY_TIME, String(audio.currentTime));
  });

  // Toggle play/pause on button click
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (audio.paused) {
      wantsToPlay = true;
      audio.currentTime = unlocked ? audio.currentTime : 0;
      audio.play();
      unlocked = true;
    } else {
      wantsToPlay = false;
      audio.pause();
      removeInteractionListeners();
    }
  });

  function updateBtn(playing) {
    var playIcon =
      '<svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>';
    var pauseIcon =
      '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>';
    btn.innerHTML = playing ? pauseIcon : playIcon;
    if (playing) {
      btn.classList.add("is-playing");
      btn.classList.remove("needs-attention");
    } else {
      btn.classList.remove("is-playing");
    }
  }

  // Set initial icon
  updateBtn(false);
})();
