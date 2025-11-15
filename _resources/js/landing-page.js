/*
 * University of Houston
 * Scripts for the 2016 landing/gateway pages
 *
 * Table of Contents:
 * ------------------
 * lazyYT (lazy load YouTube videos)
 * Magic
 * Page Header Image Margin
 * Match Breadcrumb theme
 * Page Contents Nav
 * Initiate Owl Carousel
 *
 */


/*!
* lazyYT (lazy load YouTube videos)
* v1.3.0 - 2016-03-06
* https://github.com/Daugilas/lazyYT
* (CC) This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.
* http://creativecommons.org/licenses/by-sa/4.0/
* Contributors: https://github.com/tylerpearson/lazyYT/graphs/contributors || https://github.com/daugilas/lazyYT/graphs/contributors
*
* Usage: <div class="lazyYT" data-youtube-id="laknj093n" data-parameters="rel=0">loading...</div>
*/

!function(t){"use strict";function e(e,a){var i,l,n=e.data("width"),r=e.data("height"),o=e.attr("title")||e.data("title"),c=e.data("display-title"),d=e.data("ratio")?e.data("ratio"):a.default_ratio,u=e.data("display-duration"),y=e.data("youtube-id"),h=[],v=e.text()?e.text():a.loading_text,f=["https://www.googleapis.com/youtube/v3/videos?id=",y,"&key=",a.yt_api_key,"&part=snippet"].join(""),g=e.data("parameters")||"";d=d.split(":"),g+="&"+a.youtube_parameters,"boolean"!=typeof c&&(c=a.display_title),"boolean"!=typeof u&&(u=a.display_duration),"number"==typeof n&&"number"==typeof r?(e.width(n),i=r+"px"):"number"==typeof n?(e.width(n),i=n*d[1]/d[0]+"px"):(n=e.width(),0==n&&(n=e.parent().width()),i=d[1]/d[0]*100+"%"),h.push('<div class="ytp-thumbnail">'),h.push('<button class="ytp-large-play-button ytp-button" tabindex="0" aria-label="Play"'),320>=n?h.push(' style="transform: scale(0.61);"'):640>=n&&h.push(' style="transform: scale(0.85);"'),c&&o&&h.push(' aria-label="',o,'"'),h.push(">"),h.push('<svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">'),h.push('<path class="ytp-large-play-button-bg" d="m .66,37.62 c 0,0 .66,4.70 2.70,6.77 2.58,2.71 5.98,2.63 7.49,2.91 5.43,.52 23.10,.68 23.12,.68 .00,-1.3e-5 14.29,-0.02 23.81,-0.71 1.32,-0.15 4.22,-0.17 6.81,-2.89 2.03,-2.07 2.70,-6.77 2.70,-6.77 0,0 .67,-5.52 .67,-11.04 l 0,-5.17 c 0,-5.52 -0.67,-11.04 -0.67,-11.04 0,0 -0.66,-4.70 -2.70,-6.77 C 62.03,.86 59.13,.84 57.80,.69 48.28,0 34.00,0 34.00,0 33.97,0 19.69,0 10.18,.69 8.85,.84 5.95,.86 3.36,3.58 1.32,5.65 .66,10.35 .66,10.35 c 0,0 -0.55,4.50 -0.66,9.45 l 0,8.36 c .10,4.94 .66,9.45 .66,9.45 z" fill="#1f1f1e" fill-opacity="0.9"></path>'),h.push('<path d="m 26.96,13.67 18.37,9.62 -18.37,9.55 -0.00,-19.17 z" fill="#fff"></path>'),h.push('<path d="M 45.02,23.46 45.32,23.28 26.96,13.67 43.32,24.34 45.02,23.46 z" fill="#ccc"></path>'),h.push("</svg>"),h.push("</button>"),h.push('<div class="ytp-spinner" data-layer="4">'),h.push('<span class="ytp-spinner-svg">'),h.push('<svg height="100%" version="1.1" viewBox="0 0 22 22" width="100%">'),h.push('<svg x="7" y="1"><circle class="ytp-spinner-dot ytp-spinner-dot-0" cx="4" cy="4" r="2"></circle></svg>'),h.push('<svg x="11" y="3"><circle class="ytp-spinner-dot ytp-spinner-dot-1" cx="4" cy="4" r="2"></circle></svg>'),h.push('<svg x="13" y="7"><circle class="ytp-spinner-dot ytp-spinner-dot-2" cx="4" cy="4" r="2"></circle></svg>'),h.push('<svg x="11" y="11"><circle class="ytp-spinner-dot ytp-spinner-dot-3" cx="4" cy="4" r="2"></circle></svg>'),h.push('<svg x="7" y="13"><circle class="ytp-spinner-dot ytp-spinner-dot-4" cx="4" cy="4" r="2"></circle></svg>'),h.push('<svg x="3" y="11"><circle class="ytp-spinner-dot ytp-spinner-dot-5" cx="4" cy="4" r="2"></circle></svg>'),h.push('<svg x="1" y="7"><circle class="ytp-spinner-dot ytp-spinner-dot-6" cx="4" cy="4" r="2"></circle></svg>'),h.push('<svg x="3" y="3"><circle class="ytp-spinner-dot ytp-spinner-dot-7" cx="4" cy="4" r="2"></circle></svg>'),h.push("</svg>"),h.push("</span>"),h.push('<div class="ytp-spinner-message" style="display: none;">If playback doesn\'t begin shortly, try restarting your device.</div>'),h.push("</div>"),u&&h.push('<span class="video-time" style="display:none;"></span>'),h.push("</div>"),c&&(h.push('<div class="ytp-gradient-top"></div>'),h.push('<div class="ytp-chrome-top">'),h.push('<div class="ytp-title">'),h.push('<div class="ytp-title-text">'),h.push('<a id="lazyYT-title-',y,'" class="ytp-title-link" tabindex="13" target="_blank" data-sessionlink="feature=player-title" href="https://www.youtube.com/watch?v=',y,'">'),h.push(o?o:v),h.push("</a>"),h.push("</div>"),h.push("</div>"),h.push("</div>")),e.css({"padding-bottom":i}).html(h.join("")),l=e.find(".ytp-thumbnail").on("click",function(t){t.preventDefault(),e.hasClass(a.video_loaded_class)||(e.html('<iframe src="//www.youtube.com/embed/'+y+"?"+g+'&autoplay=1" frameborder="0" allowfullscreen></iframe>').addClass(a.video_loaded_class),"function"==typeof a.callback&&a.callback.call(e))}),s(y,n,l,f),(!o&&c||u)&&(u&&(f+=",contentDetails"),t.getJSON(f,function(t){var s=t.items[0];e.find("#lazyYT-title-"+y).text(s.snippet.title),u&&e.find(".video-time").text(p(s.contentDetails.duration,a)).show()}))}function s(e,s,p,l){var n,r,o=new Image;0==s&&(s=p.width()),n=s>640?"maxresdefault.jpg":s>480?"sddefault.jpg":s>320?"hqdefault.jpg":s>120?"mqdefault.jpg":0==s?"hqdefault.jpg":"default.jpg",r=["https://img.youtube.com/vi/",e,"/",n].join(""),o.onload=function(e){var n=i(e,"naturalWidth");s>n?t.getJSON(l,function(t){var e=t.items[0],i=e.snippet.thumbnails;0==s&&(s=p.width()),r=s>640&&"object"==typeof i.maxres?i.maxres.url:s>480&&"object"==typeof i.standard?i.standard.url:s>320&&"object"==typeof i.high?i.high.url:s>120&&"object"==typeof i.medium?i.medium.url:i["default"].url,a(p,r)}):a(p,this.src)},o.src=r}function a(t,e){t.css({"background-image":["url(",e,")"].join("")}).addClass("lazyYT-image-loaded")}function i(t,e){var s;return s="object"==typeof t.path?t.path[0]:"object"==typeof t.target?t.target:t.originalTarget,s.naturalWidth}function p(t,e){for(var s=[],a=0,i=t.match(/P(?:(\d*)Y)?(?:(\d*)M)?(?:(\d*)W)?(?:(\d*)D)?T(?:(\d*)H)?(?:(\d*)M)?(?:(\d*)S)?/i),p=[{pos:1,multiplier:31536e3},{pos:2,multiplier:2592e3},{pos:3,multiplier:604800},{pos:4,multiplier:86400},{pos:5,multiplier:3600},{pos:6,multiplier:60},{pos:7,multiplier:1}],l=0;l<p.length;l++)"undefined"!=typeof i[p[l].pos]&&(a+=parseInt(i[p[l].pos])*p[l].multiplier);return a>3599&&(s.push(parseInt(a/3600)),a%=3600),s.push(("0"+parseInt(a/60)).slice(-2)),s.push(("0"+a%60).slice(-2)),s.join(":")}t.fn.lazyYT=function(s,a){var i={yt_api_key:s,youtube_parameters:"rel=0",loading_text:"Loading...",display_title:!0,default_ratio:"16:9",display_duration:!1,callback:null,video_loaded_class:"lazyYT-video-loaded",container_class:"lazyYT-container"},p=t.extend(i,a);return this.each(function(){var s=t(this).addClass(p.container_class);e(s,p)})}}(jQuery);

/*
 * Magic
 */

$(document).ready(function(){
    // gives page-header container the same background image as it's child image
    var imgUrl = $('.page-header.cover-photo > img, .powerhouse-header > img').attr('src');
    if (typeof imgUrl !== 'undefined') {
        $('.page-header, .powerhouse-header').css('background-image', 'url(' + imgUrl + ')');
    };
    
    // initiates lazyYT plugin
    $('.lazyYT').lazyYT('AIzaSyAT7q0IEqaQKU79OSQ-auESoldDwdSB8PI', {
        display_duration: false,
        youtube_parameters: 'rel=0&amp;showinfo=0',
        default_ratio: '16:9',
        display_title: false
    });
    // hides caption and plays video on caption link click
    $('.video-container .cta-link').click(function(e) {
        e.preventDefault();
        $(this).closest('.caption-wrapper').addClass('disabled');
        $(this).closest('.video-container').find('.lazyYT-image-loaded').trigger('click');
    });
    // hides caption on video player click
    $('.video-container .embed-responsive').click(function() {
        $(this).closest('.video-container').find('.caption-wrapper').addClass('disabled');
    });
});

/*
 * Page Header Image Margin
 */

$(document).ready(function() {
    var headerImageMargin = function() {
        if(Modernizr.mq('(min-width: 1200px)')){
            var offset = $('.page-header').offset();
            if ( typeof offset !== 'undefined') {
                $('.page-header:not(.page-header-scroll) > img').css('margin-top', offset.top * -1 - 1);
            }
        } else {
            $('.page-header > img').css('margin-top', 0);
        };
    };
    headerImageMargin();
    $(window).bind('resize', function() {
        headerImageMargin();
    });
});





// Match Breadcrumb Theme


$(document).ready(function() {
    // Select the <nav> element with class "nav-breadcrumb"
    var $breadcrumb = $('nav.nav-breadcrumb');

    // If the breadcrumb element doesn't exist, exit early and log a warning
    if (!$breadcrumb.length) {
        console.warn('No <nav class="nav-breadcrumb"> element found.');
        return;
    }

    // Find the first <section> element that comes after the breadcrumb in the DOM
    var $firstSection = $breadcrumb.nextAll('section').first();

    // If no such section exists, exit early and log a warning
    if (!$firstSection.length) {
        console.warn('No <section> found after <nav.nav-breadcrumb>.');
        return;
    }

    // Define a list of possible theme classes used to style sections and the breadcrumb
    var themes = ['theme-light-gray', 'theme-cream', 'theme-brick', 'theme-slate', 'bg-white', 'bg-dark', 'bg-light', 'bg-black', 'text-white', 'text-black', 'text-light', 'text-dark'];

    // Remove any existing theme classes from the breadcrumb before applying a new one
    $breadcrumb.removeClass(themes.join(' '));

    // Check each theme to see if the first <section> has it, and apply the first match to the breadcrumb
    var matched = themes.some(function(theme) {
        if ($firstSection.hasClass(theme)) {
            $breadcrumb.addClass(theme);       // Apply the matching theme to the breadcrumb
            console.log('Applied theme:', theme); // Log the applied theme for debugging
        }
        return false; // Continue to the next theme if no match
    });

    // If no matching theme was found, log a message (optional fallback logic could go here)
    if (!matched) {
        console.info('No matching theme found on first <section>. Breadcrumb left unstyled.');
    }
});




/*
 * Page Contents Nav
 */

// fixes the scroll offset when navigating sections
$(window).bind("load resize", function(){
    if(Modernizr.mq("(max-width: 767px)")){
        $('.page-contents a').bind('click',function(event){
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top-0
            }, 400);
            event.preventDefault();
        });
    } else {
        $('.page-contents a').bind('click',function(event){
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top-46
            }, 400);
            event.preventDefault();
        });
    };
});


// data-spy="scroll" and data-spy="affix" were removed in Bootstrap 5

$(function() {
//     $('body').attr('data-spy', 'scroll');
    $('body').attr('data-target', '.page-contents');
    $('body').attr('id', 'top');
    $('.page-contents').attr('data-offset-top', '160');
//     $('.page-contents').attr('data-spy', 'affix');
});
