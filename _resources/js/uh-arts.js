// Arts Mega Menu
document.getElementById("artsMenuOpen").addEventListener("click", function () {
  // open the navigation
  console.log("Open navigation");
  const menu = document.getElementById("artsSiteNav");
  menu.classList.add("nav-open");
  // Activate the correct tab based on data-school
  const menuBtn = document.getElementById("artsMenuOpen");
  const dataSchool = menuBtn ? menuBtn.getAttribute("data-school") : null;
  const tabs = document.querySelectorAll(".arts-tabs .nav-link");
  let found = false;

  if (dataSchool) {
    tabs.forEach(tab => {
      // Get the text from the <a> inside the button, or from the button itself
      let link = tab.querySelector("a");
      let text = link ? link.textContent : tab.textContent;
      text = text.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (text === dataSchool && !found) {
        deselectAllTabs();
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        // Show the corresponding tab panel
        const target = tab.getAttribute("data-bs-target");
        if (target) {
          const panel = document.querySelector(target);
          if (panel) {
            panel.classList.add("show", "active");
          }
        }
        found = true;
      }
    });
  }
  // If not found, just open the first tab
  if (!found && tabs.length > 0) {
    deselectAllTabs();
    tabs[0].classList.add("active");
    tabs[0].setAttribute("aria-selected", "true");
    const target = tabs[0].getAttribute("data-bs-target");
    if (target) {
      const panel = document.querySelector(target);
      if (panel) {
        panel.classList.add("show", "active");
      }
    }
  }
});

document.getElementById("artsMenuClose").addEventListener("click", function () {
  // close the navigation
  console.log("Close navigation");
  if (window.innerWidth < 991) {
    deselectAllTabs();
  }
  const menu = document.getElementById("artsSiteNav");
  menu.classList.remove("nav-open");
});

document.getElementById("artsMenuBack").addEventListener("click", function () {
  // close the navigation
  console.log("Close current tab");
  if (window.innerWidth < 991) {
    deselectAllTabs();
  }
});

//function that deselects all tabs in the nav
function deselectAllTabs() {
  const tabs = document.querySelectorAll(".arts-tabs .nav-link");
  tabs.forEach(tab => {
    tab.classList.remove("active");
    tab.setAttribute("aria-selected", "false");
  });
  // hide all tab panels
  const tabPanels = document.querySelectorAll(".tab-content-wrapper .tab-pane");
  tabPanels.forEach(panel => {
    panel.classList.remove("show");
    panel.classList.remove("active");
  });
}

//function that checks if there is no selected tab, select first tab
function checkSelectedTab() {
  const tabs = document.querySelectorAll(".arts-tabs .nav-link");
  let selectedTab = false;
  tabs.forEach(tab => {
    if (tab.classList.contains("active")) {
      selectedTab = true;
    }
  });
  if (!selectedTab) {
    tabs[0].classList.add("active");
    tabs[0].setAttribute("aria-selected", "true");
    const tabPanels = document.querySelectorAll(
      ".tab-content-wrapper .tab-pane"
    );
    tabPanels[0].classList.add("show");
    tabPanels[0].classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var schoolLink = document.querySelector(".school-title a");
  var menuBtn = document.getElementById("artsMenuOpen");
  if (schoolLink && menuBtn) {
    var text = schoolLink.textContent.toLowerCase().replace(/[^a-z0-9]/g, "");
    menuBtn.setAttribute("data-school", text);
  }
});

window.onload = function () {
  if (window.innerWidth < 991) {
    deselectAllTabs();
  }
};

// add a delay to the resize event
let resizeTimer;
window.onresize = function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    if (window.innerWidth < 991) {
      deselectAllTabs();
    } else {
      checkSelectedTab();
    }
  }, 250);
};