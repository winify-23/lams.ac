document.addEventListener('DOMContentLoaded', function() {
  const toc = document.getElementsByClassName('table-of-contents');
  if (toc.length <= 0) return;

  const tableOfContents = toc[0];
  // const h2s = document.querySelectorAll('#content-well h2');
  // if (h2s.length <= 0) return;

  // h2s?.forEach((element) => {
  //   const text = element.textContent;
  //   const anchor = element.id;
  //   const li = document.createElement('li');
  //   li.className = 'nav-option';
  //   const a = document.createElement('a');
  //   a.href = '#' + anchor;
  //   a.textContent = text;

  //   li.appendChild(a);
  //   tableOfContents.firstElementChild.appendChild(li);
  // })

  const scrollSpy = new bootstrap.ScrollSpy(document.getElementById('content-well'), {
    target: '.table-of-contents',
    rootMargin: [
      '60px', 
      "0px", 
      '0px',
      "20px"
    ].join(' '),
    threshold: [0.4, 0.5, 1]
  })
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > $('.table-of-contents').parent().offset().top) {
      tableOfContents.classList.add('affix');
    } else {
      tableOfContents.classList.remove('affix');
    }
  })

  const tocWidth = $(tableOfContents).parent().width();
  $(tableOfContents).width(tocWidth);
  
  $(window).resize(function () {
    var tocWidth = $('.table-of-contents').parent().width();
    $('.table-of-contents').width(tocWidth);
  });
})