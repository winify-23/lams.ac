document.addEventListener("DOMContentLoaded", () => {
  //Pause and play for background video
  const video = document.getElementById("bgvid");
  const button = document.getElementById("video-button");
  const playIcon = document.getElementById("playIcon");
  const pauseIcon = document.getElementById("pauseIcon");

  // Remove the initial play button since the video autoplays
  playIcon.style.display = "none";

  button.addEventListener("click", () => {
    if (video.paused || video.ended) {
      video.play();
      playIcon.style.display = "none";
      pauseIcon.style.display = "inline";
    } else {
      video.pause();
      playIcon.style.display = "inline";
      pauseIcon.style.display = "none";
    }
  });
  
  // Get the element with the ID "nav-desktop"
  const navDesktop = document.getElementById("nav-desktop");
  
  // Get all elements with the class "degree-toggle" inside "nav-desktop"
  const degreeToggleElements = navDesktop.querySelectorAll(".degree-toggle");
  
  // Add a click event handler to each "degree-toggle" element
  degreeToggleElements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });
  
  //Admissions toggle
  const firstDiv = document.getElementById("undergrad");
  const secondDiv = document.getElementById("grad");
  const btn1 = document.getElementById("btn1");
  const btn2 = document.getElementById("btn2");
  
  btn1.addEventListener("click", () => {
    if (firstDiv.style.display === "none") {
          firstDiv.style.display = "flex";
          secondDiv.style.display = "none";
    } else {
      firstDiv.style.display = "flex";
    }
  });
  
  btn2.addEventListener("click", () => {
      if (secondDiv.style.display === "none") {
          secondDiv.style.display = "flex";
          firstDiv.style.display = "none";
      } else {
          secondDiv.style.display = "flex";
      }
  });

  //Open/Expand Menu Items by UrlSearchParams and element's data-menuitem attribute
  let UrlParams = new URLSearchParams(window.location.search)
  if (UrlParams.has('menu-item')) {
      let menuitem = UrlParams.get('menu-item');
      let elements = $(`[data-menuitem=${menuitem}]`);
      
      elements?.each((index, element) => {
          //desktop
          if (element.className.includes('dropdown')) {
              $(element).toggleClass('open');
              element.firstChild.setAttribute('aria-expanded', true)
          } 
  
          //mobile
          if (element.className.includes('panel panel-default')) {
              $('#nav-mobile-collapse').collapse('show')
              $(element).children('.panel-collapse.collapse').collapse('show')
  
              let submenuitem = UrlParams.get('submenu-item')
              if (submenuitem) {
                  let smElement = $(`[data-submenuitem=${submenuitem}`);
                  $(smElement).children('.panel-collapse.collapse').collapse('show')
              }
          }
      })
  }

  AOS.init();
});