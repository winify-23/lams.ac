document.addEventListener('DOMContentLoaded', function () {
  const tabLinks = document.querySelectorAll('[data-toggle="tab"]');

  tabLinks.forEach(link => {
    // Convert Bootstrap 3 to Bootstrap 5 classes/attributes
    link.setAttribute('data-bs-toggle', 'tab');
    link.classList.add('nav-link'); // required for BS5 styling
    link.removeAttribute('data-toggle');

    const fullHref = link.getAttribute('href');
    const tabId = fullHref.includes('#') ? fullHref.split('#')[1] : null;
    if (tabId) {
      link.setAttribute('href', '#' + tabId);
    }

    // Add event listener
    link.addEventListener('click', function (e) {
      e.preventDefault();

      // Deactivate all tab links
      document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));

      // Hide all tab panes
      document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active', 'show');
      });

      // Activate clicked tab link
      this.classList.add('active');

      // Activate associated tab pane
      const targetPane = document.getElementById(tabId);
      if (targetPane) {
        targetPane.classList.add('active', 'show');
      }
    });
  });

  // Initial styling fix for the active tab on page load
  const activePane = document.querySelector('.tab-pane.active');
  if (activePane) {
    const id = activePane.id;
    const activeLink = document.querySelector('[href="#' + id + '"]');
    if (activeLink) activeLink.classList.add('active', 'nav-link');
  }
});