
//  AUDIO PLAYER
let currentAudio = null;    

function playAudio(audioIndex) {
    stopCurrentAudio();
    const audioElement = document.getElementById(`audio${audioIndex}`);
    audioElement.play();
    currentAudio = audioElement;
    audioElement.addEventListener('timeupdate', updateProgressSlider);
    updateProgressSlider();
}

function rewindAudio() {
  if (currentAudio !== null) {
      currentAudio.currentTime -= 5; // Rewind 5 seconds
      updateProgressSlider();
  }
}

function forwardAudio() {
  if (currentAudio !== null) {
      currentAudio.currentTime += 5; // Forward 5 seconds
      updateProgressSlider();
  }
}

function togglePause() { //PAUSE
  if (currentAudio !== null) {
    if (currentAudio.paused) {
          currentAudio.play();  } 
          else {
          currentAudio.pause();
          }
    }
}

// BARRA DE PROGRESO 
function seekAudio() {
  if (currentAudio !== null) {
      const progressSlider = document.getElementById(getProgressSliderId());
      const seekToTime = (currentAudio.duration * progressSlider.value) / 100;
      currentAudio.currentTime = seekToTime;
  }
}

function updateProgressSlider() {
  if (currentAudio !== null) {
    const progressSlider = document.getElementById(getProgressSliderId());
    const currentTimeSpan = document.getElementById(`currentTime${currentTab + 1}`);
    const durationSpan = document.getElementById(`duration${currentTab + 1}`);

    if (currentTimeSpan && durationSpan) {
      const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
      progressSlider.value = progress;
    
      const currentMinutes = Math.floor(currentAudio.currentTime / 60);
      const currentSeconds = Math.floor(currentAudio.currentTime % 60);
      const currentTimeString = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;  // Update the current time display
      currentTimeSpan.textContent = currentTimeString;

      const durationMinutes = Math.floor(currentAudio.duration / 60);
      const durationSeconds = Math.floor(currentAudio.duration % 60);
      const durationString = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;// Update the duration display
      durationSpan.textContent = durationString;
    }
  }
}

function stopCurrentAudio() {
  if (currentAudio !== null && !currentAudio.paused) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
  }
}

function getProgressSliderId() {
  const activeTabId = document.querySelector('.tab-button.active').id;
  return `progressSlider${activeTabId[activeTabId.length - 1]}`;
}

// TAB BARS 
 let currentTab = 0;
  function showTab(tabIndex) {

    stopCurrentAudio();
    stopIframeContent(`video${currentTab + 1}`);

    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';  // Hide all tabs
    });

    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');  // Remove the 'active' class from all tab buttons
    });

    const currentTabId = `tab${tabIndex + 1}`;
    document.getElementById(currentTabId).style.display = 'block';  // Show the selected tab
    document.getElementById(`tabButton${tabIndex + 1}`).classList.add('active');  // Add the 'active' class to the clicked tab button

    currentTab = tabIndex;
    
}

//CONTENT IFRAME
function stopIframeContent(iframeId) {
    const iframe = document.getElementById(iframeId);
    if (iframe) {
        const iframeSrc = iframe.src;
        iframe.src = '';  // Setting the src to an empty string stops the video
        iframe.onload = function () {
            iframe.src = iframeSrc;  // Restoring the original src after stopping
            iframe.onload = null;  // Clear the onload handler to avoid potential issues
        };
    }
}

//BOTONES TABS
function showPreviousTab() {
  if (currentTab > 0) {
      showTab(currentTab - 1);  
  }
    stopCurrentAudio();
    stopIframeContent(`video${currentTab + 1}`);
}

function showNextTab() {
  if (currentTab < 4) {
      showTab(currentTab + 1);
  }
    stopCurrentAudio();
    stopIframeContent(`video${currentTab + 1}`);
}

showTab(0); // Show the initial tab