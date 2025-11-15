/*
 * University of Houston
 * Global Website Scripts
 *
 * Table of Contents:
 * ------------------
 * Console handling
 * Search
 * Clean URLs
 * Youtube z-index fix
 * jQuery Browser Plugin
 * Outdated browser message
 * Responsive header actions
 * Wrap UH with abbr tags
 * SVG scaling fix
 * svg4everybody
 * IE11 invert fix
 * 
 */
 
  /* Adding Google Tag Manager*/
 /* Google Tag Manager */
 (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
 new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
 j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
 })(window,document,'script','dataLayer','GTM-M76VPMR');
 /* End Google Tag Manager */
 
 /*
  * Console handling
  * Avoid console errors in browsers that lack a console.
  */
 
 if (!(window.console && console.log)) {
     (function() {
         var noop = function() {};
         var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
         var length = methods.length;
         var console = window.console = {};
         while (length--) {
             console[methods[length]] = noop;
         }
     }());
 }
 
 
 /*
  * Search
  */
 
 $(document).ready(function() {
 
     $(function() {
         $('#global-search .search-submit').click(function(e) {
             e.preventDefault();
             globalSearch();
         });
 
         $('#globalSearchField').keypress(function(e) {
             if (e.which == 13) {
                 e.preventDefault();
                 globalSearch();
             }
         });
 
         function globalSearch() {
             var form = $('#global-search').length ? $('#global-search') : $('#globalSearch');
 
             if ($('#site-search:checked').length) {
                 var site = $('#site-search:checked').data('folder');
                 form.attr('action', '/' + site + '/search/').submit();
 
                 console.log(site);
                 //console.log('uh.edu sub site');
             } else {
                 $('input[name="as_sitesearch"]').val('').remove();
                 form.attr('action', 'https://www.uh.edu/search/').submit();
 
                 console.log('uh.edu');
             }
         }
     });;
 
 });
 
 
 /*
  * Clean URLs (removes the index.php from URLs)
  */
 
 jQuery(document).ready(function($) {
     $("a[href$='/index.php'], a[href='index.php']").each(function() {
         this.href = this.href.replace("/index.php", "/");
     });
 });
 
 /*
  * Youtube z-index fix
  * Fixes a bug where youtube video embeds sometimes appears on top of fixed content no matter the z-index
  */
 
 $(document).ready(function (){
     $('iframe[src*="youtube.com"]').each(function() {
         var url = $(this).attr("src");
         if ($(this).attr("src").indexOf("?") > 0) {
             $(this).attr({
                 "src" : url + "&wmode=transparent",
                 "wmode" : "opaque"
             });
         } else {
             $(this).attr({
                 "src" : url + "?wmode=transparent",
                 "wmode" : "opaque"
             });
         }
     });
 });
 
 /*!
  * jQuery Browser Plugin 0.1.0
  * https://github.com/gabceb/jquery-browser-plugin
  *
  * Original jquery-browser code Copyright 2005, 2015 jQuery Foundation, Inc. and other contributors
  * http://jquery.org/license
  *
  * Modifications Copyright 2015 Gabriel Cebrian
  * https://github.com/gabceb
  *
  * Released under the MIT license
  *
  * Date: 23-11-2015
  */!function(a){"function"==typeof define&&define.amd?define(["jquery"],function(b){return a(b)}):"object"==typeof module&&"object"==typeof module.exports?module.exports=a(require("jquery")):a(window.jQuery)}(function(a){"use strict";function b(a){void 0===a&&(a=window.navigator.userAgent),a=a.toLowerCase();var b=/(edge)\/([\w.]+)/.exec(a)||/(opr)[\/]([\w.]+)/.exec(a)||/(chrome)[ \/]([\w.]+)/.exec(a)||/(iemobile)[\/]([\w.]+)/.exec(a)||/(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("trident")>=0&&/(rv)(?::| )([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[],c=/(ipad)/.exec(a)||/(ipod)/.exec(a)||/(windows phone)/.exec(a)||/(iphone)/.exec(a)||/(kindle)/.exec(a)||/(silk)/.exec(a)||/(android)/.exec(a)||/(win)/.exec(a)||/(mac)/.exec(a)||/(linux)/.exec(a)||/(cros)/.exec(a)||/(playbook)/.exec(a)||/(bb)/.exec(a)||/(blackberry)/.exec(a)||[],d={},e={browser:b[5]||b[3]||b[1]||"",version:b[2]||b[4]||"0",versionNumber:b[4]||b[2]||"0",platform:c[0]||""};if(e.browser&&(d[e.browser]=!0,d.version=e.version,d.versionNumber=parseInt(e.versionNumber,10)),e.platform&&(d[e.platform]=!0),(d.android||d.bb||d.blackberry||d.ipad||d.iphone||d.ipod||d.kindle||d.playbook||d.silk||d["windows phone"])&&(d.mobile=!0),(d.cros||d.mac||d.linux||d.win)&&(d.desktop=!0),(d.chrome||d.opr||d.safari)&&(d.webkit=!0),d.rv||d.iemobile){var f="msie";e.browser=f,d[f]=!0}if(d.edge){delete d.edge;var g="msedge";e.browser=g,d[g]=!0}if(d.safari&&d.blackberry){var h="blackberry";e.browser=h,d[h]=!0}if(d.safari&&d.playbook){var i="playbook";e.browser=i,d[i]=!0}if(d.bb){var j="blackberry";e.browser=j,d[j]=!0}if(d.opr){var k="opera";e.browser=k,d[k]=!0}if(d.safari&&d.android){var l="android";e.browser=l,d[l]=!0}if(d.safari&&d.kindle){var m="kindle";e.browser=m,d[m]=!0}if(d.safari&&d.silk){var n="silk";e.browser=n,d[n]=!0}return d.name=e.browser,d.platform=e.platform,d}return window.jQBrowser=b(window.navigator.userAgent),window.jQBrowser.uaMatch=b,a&&(a.browser=window.jQBrowser),window.jQBrowser});
 
 /*
  * Outdated browser message
  */
 
 $(document).ready(function() {
	 try{
		 // display browser upgrade message if browser is <= Internet Explorer 10 or doesn't support flexbox
		 if (($.browser.msie && $.browser.version<='10.0') || $('html').hasClass('no-flexbox')) {
			 $('body').prepend('<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>');
		 };
 	}catch(e){console.log(e.message)}
 });
 
 /*
  * Responsive header actions
  */
 
 $(document).ready(function() {
     // opens and collapses search form in header
     $('.nav-link-search, .search-close').click(function(e){
         e.preventDefault();
         $('.global-search.collapse').toggleClass('in');
         $('body').toggleClass('active-search');
         $('#globalSearchField').focus();
     });
     // toggle for nav menu
     $('.menu-button').click(function(e) {
         e.preventDefault();
         $('body').toggleClass('active-nav');
         $('.menu-button').toggleClass('active-button');
     });
     // toggle for nav carets
     $('.caret').click(function(e) {
         e.preventDefault();
         $(this).parent().toggleClass('opened');
     });
 });
 
 
 /*
  * Wrap UH with abbr tags
  */
 
 /*!***************************************************
  * mark.js v6.4.0
  * https://github.com/julmot/mark.js
  * Copyright (c) 2014â€“2016, Julian Motz
  * Released under the MIT license https://git.io/vwTVl
  *****************************************************/
 "use strict";function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var _extends=Object.assign||function(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d])}return a},_createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol?"symbol":typeof a};!function(a,b,c){"function"==typeof define&&define.amd?define(["jquery"],function(d){return a(b,c,d)}):"object"===("undefined"==typeof exports?"undefined":_typeof(exports))?a(b,c,require("jquery")):a(b,c,jQuery)}(function(a,b,c){var d=function(){function c(a){_classCallCheck(this,c),this.ctx=a}return _createClass(c,[{key:"log",value:function a(b){var c=arguments.length<=1||void 0===arguments[1]?"debug":arguments[1],a=this.opt.log;this.opt.debug&&"object"===("undefined"==typeof a?"undefined":_typeof(a))&&"function"==typeof a[c]&&a[c]("mark.js: "+b)}},{key:"escapeStr",value:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}},{key:"createRegExp",value:function(a){return a=this.escapeStr(a),Object.keys(this.opt.synonyms).length&&(a=this.createSynonymsRegExp(a)),this.opt.diacritics&&(a=this.createDiacriticsRegExp(a)),a=this.createMergedBlanksRegExp(a),a=this.createAccuracyRegExp(a)}},{key:"createSynonymsRegExp",value:function(a){var b=this.opt.synonyms;for(var c in b)if(b.hasOwnProperty(c)){var d=b[c],e=this.escapeStr(c),f=this.escapeStr(d);a=a.replace(new RegExp("("+e+"|"+f+")","gmi"),"("+e+"|"+f+")")}return a}},{key:"createDiacriticsRegExp",value:function(a){var b=["aÃ€ÃÃ‚ÃƒÃ„Ã…Ã Ã¡Ã¢Ã£Ã¤Ã¥Ä€ÄÄ…Ä„","cÃ‡Ã§Ä‡Ä†ÄÄŒ","dÄ‘ÄÄÄŽ","eÃˆÃ‰ÃŠÃ‹Ã¨Ã©ÃªÃ«Ä›ÄšÄ’Ä“Ä™Ä˜","iÃŒÃÃŽÃÃ¬Ã­Ã®Ã¯ÄªÄ«","lÅ‚Å","nÃ‘Ã±ÅˆÅ‡Å„Åƒ","oÃ’Ã“Ã”Ã•Ã•Ã–Ã˜Ã²Ã³Ã´ÃµÃ¶Ã¸ÅŒÅ","rÅ™Å˜","sÅ Å¡Å›Åš","tÅ¥Å¤","uÃ™ÃšÃ›ÃœÃ¹ÃºÃ»Ã¼Å¯Å®ÅªÅ«","yÅ¸Ã¿Ã½Ã","zÅ½Å¾Å¼Å»ÅºÅ¹"],c=[];return a.split("").forEach(function(d){b.every(function(b){if(-1!==b.indexOf(d)){if(c.indexOf(b)>-1)return!1;a=a.replace(new RegExp("["+b+"]","gmi"),"["+b+"]"),c.push(b)}return!0})}),a}},{key:"createMergedBlanksRegExp",value:function(a){return a.replace(/[\s]+/gim,"[\\s]*")}},{key:"createAccuracyRegExp",value:function(a){var b=this,c=this.opt.accuracy,d="string"==typeof c?c:c.value,e="string"==typeof c?[]:c.limiters,f="";switch(e.forEach(function(a){f+="|"+b.escapeStr(a)}),d){case"partially":return"()("+a+")";case"complementary":return"()([^\\s"+f+"]*"+a+"[^\\s"+f+"]*)";case"exactly":return"(^|\\s"+f+")("+a+")(?=$|\\s"+f+")"}}},{key:"getSeparatedKeywords",value:function(a){var b=this,c=[];return a.forEach(function(a){b.opt.separateWordSearch?a.split(" ").forEach(function(a){a.trim()&&c.push(a)}):a.trim()&&c.push(a)}),{keywords:c,length:c.length}}},{key:"getElements",value:function(){var a=void 0,b=[];return a="undefined"==typeof this.ctx?[]:this.ctx instanceof HTMLElement?[this.ctx]:Array.isArray(this.ctx)?this.ctx:Array.prototype.slice.call(this.ctx),a.forEach(function(a){b.push(a);var c=a.querySelectorAll("*");c.length&&(b=b.concat(Array.prototype.slice.call(c)))}),a.length||this.log("Empty context","warn"),{elements:b,length:b.length}}},{key:"matches",value:function(a,b){return(a.matches||a.matchesSelector||a.msMatchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.oMatchesSelector).call(a,b)}},{key:"matchesFilter",value:function(a,b){var c=this,d=!0,e=this.opt.filter.concat(["script","style","title"]);return this.opt.iframes||(e=e.concat(["iframe"])),b&&(e=e.concat(["*[data-markjs='true']"])),e.every(function(b){return c.matches(a,b)?d=!1:!0}),!d}},{key:"onIframeReady",value:function(a,b,c){try{!function(){var d=a.contentWindow,e="about:blank",f="complete",g=function(){try{if(null===d.document)throw new Error("iframe inaccessible");b(d.document)}catch(a){c()}},h=function(){var b=a.getAttribute("src").trim(),c=d.location.href;return c===e&&b!==e&&b},i=function(){var b=function b(){try{h()||(a.removeEventListener("load",b),g())}catch(a){c()}};a.addEventListener("load",b)};d.document.readyState===f?h()?i():g():i()}()}catch(a){c()}}},{key:"forEachElementInIframe",value:function(a,b){var c=this,d=arguments.length<=2||void 0===arguments[2]?function(){}:arguments[2],e=0,f=function(){--e<1&&d()};this.onIframeReady(a,function(a){var d=Array.prototype.slice.call(a.querySelectorAll("*"));0===(e=d.length)&&f(),d.forEach(function(a){"iframe"===a.tagName.toLowerCase()?!function(){var d=0;c.forEachElementInIframe(a,function(a,c){b(a,c),c-1===d&&f(),d++},f)}():(b(a,d.length),f())})},function(){var b=a.getAttribute("src");c.log("iframe '"+b+"' could not be accessed","warn"),f()})}},{key:"forEachElement",value:function(a){var b=this,c=arguments.length<=1||void 0===arguments[1]?function(){}:arguments[1],d=arguments.length<=2||void 0===arguments[2]?!0:arguments[2],e=this.getElements(),f=e.elements,g=e.length,h=function(){0===--g&&c()};h(++g),f.forEach(function(c){if(!b.matchesFilter(c,d)){if("iframe"===c.tagName.toLowerCase())return void b.forEachElementInIframe(c,function(c){b.matchesFilter(c,d)||a(c)},h);a(c)}h()})}},{key:"forEachNode",value:function(a){var b=arguments.length<=1||void 0===arguments[1]?function(){}:arguments[1];this.forEachElement(function(b){for(b=b.firstChild;b;b=b.nextSibling)3===b.nodeType&&b.textContent.trim()&&a(b)},b)}},{key:"wrapMatches",value:function(a,c,d,e){for(var f=this.opt.element?this.opt.element:"mark",g=d?0:2,h=void 0;null!==(h=c.exec(a.textContent));){var i=h.index;d||(i+=h[g-1].length);var j=a.splitText(i);if(a=j.splitText(h[g].length),null!==j.parentNode){var k=b.createElement(f);k.setAttribute("data-markjs","true"),this.opt.className&&k.setAttribute("class",this.opt.className),k.textContent=h[g],j.parentNode.replaceChild(k,j),e(k)}c.lastIndex=0}}},{key:"unwrapMatches",value:function(a){for(var c=a.parentNode,d=b.createDocumentFragment();a.firstChild;)d.appendChild(a.removeChild(a.firstChild));c.replaceChild(d,a),c.normalize()}},{key:"markRegExp",value:function(a,b){var c=this;this.opt=b,this.log('Searching with expression "'+a+'"');var d=0,e=function(a){d++,c.opt.each(a)};this.forEachNode(function(b){c.wrapMatches(b,a,!0,e)},function(){0===d&&c.opt.noMatch(a),c.opt.complete(d),c.opt.done(d)})}},{key:"mark",value:function(a,b){var c=this;this.opt=b,a="string"==typeof a?[a]:a;var d=this.getSeparatedKeywords(a),e=d.keywords,f=d.length,g=0;0===f&&(this.opt.complete(g),this.opt.done(g)),e.forEach(function(a){var b=new RegExp(c.createRegExp(a),"gmi"),d=0,h=function(a){d++,g++,c.opt.each(a)};c.log('Searching with expression "'+b+'"'),c.forEachNode(function(a){c.wrapMatches(a,b,!1,h)},function(){0===d&&c.opt.noMatch(a),e[f-1]===a&&(c.opt.complete(g),c.opt.done(g))})})}},{key:"unmark",value:function(a){var b=this;this.opt=a;var c=this.opt.element?this.opt.element:"*";c+="[data-markjs]",this.opt.className&&(c+="."+this.opt.className),this.log('Removal selector "'+c+'"'),this.forEachElement(function(a){b.matches(a,c)&&b.unwrapMatches(a)},function(){b.opt.complete(),b.opt.done()},!1)}},{key:"opt",set:function(b){this._opt=_extends({},{element:"",className:"",filter:[],iframes:!1,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:"partially",each:function(){},noMatch:function(){},done:function(){},complete:function(){},debug:!1,log:a.console},b)},get:function(){return this._opt}}]),c}();c.fn.mark=function(a,b){return new d(this).mark(a,b),this},c.fn.markRegExp=function(a,b){return new d(this).markRegExp(a,b),this},c.fn.unmark=function(a){return new d(this).unmark(a),this}},window,document);

 
//  $(document).ready(function (){
//      $('body').mark('UH', {
//          'filter': ['textarea'],
//          'element': 'abbr',
//          'accuracy': {
//              'value': 'exactly',
//              'limiters': ['!', '@', '#', '&', '*', '(', ')', '-', 'â€“', 'â€”', '+', '=', '[', ']', '{', '}', '|', ':', ';', '\'', '\"', 'â€˜', 'â€™', 'â€œ', 'â€', ',', '.', '<', '>', '/', '?']
//          },
//          'each': function(element) {
//              $(element).attr('title', 'University of Houston')
//          }
//      });
//  });

 
// Skip marking 'UH' if it appears inside any element with the class 'accordion-button'
// This ensures we don't interfere with accordion toggle buttons or markup already handled elsewhere


$(document).ready(function () {
	try{
		$('body').mark('UH', {
			'filter': ['textarea'],
			'element': 'abbr',
			'accuracy': {
				'value': 'exactly',
				'limiters': ['!', '@', '#', '&', '*', '(', ')', '-', 'Ã¢â‚¬â€œ', 'Ã¢â‚¬â€', '+', '=', '[', ']', '{', '}', '|', ':', ';', '\'', '\"', 'Ã¢â‚¬Ëœ', 'Ã¢â‚¬â„¢', 'Ã¢â‚¬Å“', 'Ã¢â‚¬Â', ',', '.', '<', '>', '/', '?']
			},
			'filter': function (node, term, totalCounter, counter) {
				return !$(node).closest('.accordion-button').length;
			},
			'each': function (element) {
				$(element).attr('title', 'University of Houston');
			}
		});
	}catch(e){
		console.log(e.message);
	}
});

 
 /*
  * SVG scaling fix
  * Internet Explorer incorrectly calculates the height for SVG images. This fixes that in the header and footer.
  */
 
 // styles height of IMG tags that are SVG files to override an Internet Explorer bug
 $(window).bind('load resize',function(e){
     $('.uh-footer img[src$=".svg"], .uh-header img[src$=".svg"]').each(function(){
         $(this).css('height', 'auto');
         svgHeight = $(this).height();
         $(this).css('height', svgHeight + 'px');
     });
 });
 
 /*
  * svg4everybody v2.1.0
  * github.com/jonathantneal/svg4everybody
  */
 
 !function(e,t){"function"==typeof define&&define.amd?define([],function(){return e.svg4everybody=t()}):"object"==typeof exports?module.exports=t():e.svg4everybody=t()}(this,function(){function e(e,t){if(t){var n=document.createDocumentFragment(),i=!e.getAttribute("viewBox")&&t.getAttribute("viewBox");i&&e.setAttribute("viewBox",i);for(var a=t.cloneNode(!0);a.childNodes.length;)n.appendChild(a.firstChild);e.appendChild(n)}}function t(t){t.onreadystatechange=function(){if(4===t.readyState){var n=t._cachedDocument;n||(n=t._cachedDocument=document.implementation.createHTMLDocument(""),n.body.innerHTML=t.responseText,t._cachedTarget={}),t._embeds.splice(0).map(function(i){var a=t._cachedTarget[i.id];a||(a=t._cachedTarget[i.id]=n.getElementById(i.id)),e(i.svg,a)})}},t.onreadystatechange()}function n(n){function i(){for(var n=0;n<g.length;){var r=g[n],d=r.parentNode;if(d&&/svg/i.test(d.nodeName)){var c=r.getAttribute("xlink:href");if(a&&(!o.validate||o.validate(c,d,r))){d.removeChild(r);var l=c.split("#"),m=l.shift(),f=l.join("#");if(m.length){var v=s[m];v||(v=s[m]=new XMLHttpRequest,v.open("GET",m),v.send(),v._embeds=[]),v._embeds.push({svg:d,id:f}),t(v)}else e(d,document.getElementById(f))}}else++n}u(i,67)}var a,o=Object(n),r=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,d=/\bAppleWebKit\/(\d+)\b/,c=/\bEdge\/12\.(\d+)\b/;a="polyfill"in o?o.polyfill:r.test(navigator.userAgent)||(navigator.userAgent.match(c)||[])[1]<10547||(navigator.userAgent.match(d)||[])[1]<537;var s={},u=window.requestAnimationFrame||setTimeout,g=document.getElementsByTagName("use");a&&i()}return n});
 
 $(document).ready(function(){
     svg4everybody({
         nosvg: true, // shiv <svg> and <use> elements and use image fallbacks
         polyfill: true // polyfill <use> elements for External Content
     });
 });
 
 /*!
  * jQuery Invert Images
  * Licensed under the MIT license
  * Author: @shekhardesigner
  * Version: 1.0.4
  */
 
  ;(function ($, window, document, undefined) {
 
     var defaults = {
         svgWidth: 20,
     svgHeight: 20,
     idHash: "",
     svgSource: "",
     svgContent: "",
     rootElm: "html",
     rootFlag: "inverted"
     };
 
     function InvertImages(elm, options) {
     this.$elm = $(elm);
 
         this.options = $.extend({}, defaults, options);
         this.options.idHash += Math.floor((Math.random() * 100 )) + new Date().getSeconds() + new Date().getMilliseconds();
     
         this.init();
     }
 
     InvertImages.prototype = {
 
         //Build SVG and Append
         init: function () {
 
       var $elm = this.$elm,
         opts = this.options;
       
       opts.svgWidth = $elm.width();
       opts.svgHeight = $elm.height();
       opts.svgSource = $elm.attr("src");
 
       opts.svgContent = '<svg xmlns="http://www.w3.org/2000/svg" id="svgroot_' + opts.idHash + '" class="'+$elm[0].className+' " viewBox="0 0 ' + opts.svgWidth + ' ' + opts.svgHeight + '" width="' + opts.svgWidth + '" height="' + opts.svgHeight + '">';
       opts.svgContent += '<defs>';
       opts.svgContent += '<filter id="filtersPicture_' + opts.idHash + '" >';
       opts.svgContent += '<feComposite result="inputTo_' + opts.idHash + '" in="SourceGraphic" in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="0" k4="0" />';
       opts.svgContent += '<feColorMatrix in="SourceGraphic" type="matrix" values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0"/>';
       opts.svgContent += '</feComponentTransfer>';
       opts.svgContent += '</filter>';
       opts.svgContent += '</defs>';
       opts.svgContent += '<image filter="url(\'#filtersPicture_' + opts.idHash + '\')" x="0" y="0" width="' + opts.svgWidth + '" height="' + opts.svgHeight + '" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + opts.svgSource + '" />';
       opts.svgContent += '</svg>';
 
       $elm.addClass("hide");
 
       this.$elm.after(opts.svgContent);
       $(opts.rootElm).addClass(opts.rootFlag);
         },
     
         //Destroy the SVG Built
     destroy: function(){
       var $elm = this.$elm,
         opts = this.options;
       
       $(opts.rootElm).removeClass(opts.rootFlag);
       
       $elm.removeClass("hide").removeData("cj.invertImages").next("svg").remove();
     }
     };
 
     $.fn.invertImages = function (options) {
       //If CSS3 Filter is available in browser, no point invoking this plugin. Lets go back.
         if (Modernizr && Modernizr.cssfilters) return;
         
         return this.each(function () {
           var $this = $(this),
             data = $(this).data("cj.invertImages"),
             option = typeof options === "object" ? options : {};
 
         if(!data) $.data(this, "cj.invertImages", new InvertImages(this, option));
         if(data && typeof options === "string") data[options]();
 
         });
     };
 
 })(jQuery, window, document);
 
document.addEventListener('DOMContentLoaded', function() {
  var isOpen = false;
  var navbarToggler = document.querySelector('.navbar-toggler');
  const collapsibleNavElements = [];
  
  document.querySelectorAll('.navbar-collapse').forEach(element => {
    const elem =  new bootstrap.Collapse(element, {
      toggle: false
    });

    collapsibleNavElements.push(elem);
  })

  try{
	  navbarToggler.addEventListener('click', function() {
		  if (isOpen) {
			  collapsibleNavElements.forEach(element => element.hide());
			  isOpen = false;
		  } else {
			  collapsibleNavElements.forEach(element => element.show());
			  isOpen = true;
		  }
	  });
  }catch(e){console.log(e.message)}
});

/**
 * Bootstrap5 Accordion Expand All/Collapse All button functions
 * @returns 
 */
function accordionExpandCollapseButtons() {
  /**
   * accordion format
   * .container
   *   .accordion-toggles
   *     .btn.expand-all & btn.collapse-all
   *   .accordion
   *     .accordion-item
   *       button.accordion-button
   *       div.collapse
   */

  const toggleAccordionItems = (element, expand) => {
    const accordion = $(element).closest('.accordion-toggles').next('.accordion');
    const accordionItems = accordion.find('.accordion-item');
    
    accordionItems.each(function() {
      const collapseElement = $(this).find('.accordion-collapse');
      const button = $(this).find('.accordion-button');
      
      if (expand) {
        collapseElement.addClass('show');
        button.removeClass('collapsed').attr('aria-expanded', 'true');
      } else {
        collapseElement.removeClass('show');
        button.addClass('collapsed').attr('aria-expanded', 'false');
      }
    });
  }

  $('.accordion-toggles').each(function() {
    const expandAll = $(this).find('.expand-all');
    const collapseAll = $(this).find('.collapse-all');
    
    expandAll.on('click', function() {
      toggleAccordionItems(this, true);
    });
    
    collapseAll.on('click', function() {
      toggleAccordionItems(this, false);
    });
  });
}

document.addEventListener('DOMContentLoaded', accordionExpandCollapseButtons);

/**
 * Initialize Owl Carousel
 */
async function initializeOwlCarousel() {
  const carousels = document.querySelectorAll('.owl-carousel');
  if (!carousels || carousels.length < 1) return;

  const getResponsiveOption = (items) => {
    var itemsOptions = { 
      '1': { 0: { items: 1 }, 768: { items: 1 }, 992: { items: 1 } },
      '2': { 0: { items: 1 }, 768: { items: 1 }, 992: { items: 2 } }, 
      '3': { 0: { items: 1 }, 768: { items: 2 }, 992: { items: 3 } },
      '4': { 0: { items: 1 }, 768: { items: 2 }, 992: { items: 4 } },
      '6': { 0: { items: 1 }, 768: { items: 3 }, 992: { items: 6 } }
    }

    return itemsOptions[items] ? itemsOptions[items] : itemsOptions['3'];
  };

  const defaultOpts = {
    dots: false,
    nav: true,
    lazyLoad: true,
    autoplay: false,
    autoplayTimeout: 5000,
    navText: ['&lt;', '&gt;'],
    loop: false,
    slideBy: 'page',
  };


  //Loop through the carousels
  for (let i = 0; i < carousels.length; i++) {
    //Use the data attributes to build the options
    const items = carousels[i].dataset.items ? carousels[i].dataset.items : '3';
    const dots = carousels[i].dataset.dots ? carousels[i].dataset.dots === 'true' : defaultOpts.dots;
    const nav = carousels[i].dataset.nav ? carousels[i].dataset.nav === 'true' : defaultOpts.nav;
    const lazyLoad = carousels[i].dataset.lazyLoad ? carousels[i].dataset.lazyLoad === 'true' : defaultOpts.lazyLoad;
    const autoplay = carousels[i].dataset.autoplay ? carousels[i].dataset.autoplay === 'true' : defaultOpts.autoplay;
    const autoplayTimeout = carousels[i].dataset.autoplayTimeout ? parseInt(carousels[i].dataset.autoplayTimeout) : defaultOpts.autoplayTimeout;
    const loop = carousels[i].dataset.loop ? carousels[i].dataset.loop === 'true' : defaultOpts.loop;
    const slideBy = carousels[i].dataset.slideBy ? carousels[i].dataset.slideBy : defaultOpts.slideBy;

    //Get the responsive options
    const responsive = getResponsiveOption(items);

    //Build the options object
    const options = {
      ...defaultOpts,
      dots,
      nav,
      lazyLoad,
      autoplay,
      autoplayTimeout,
      loop,
      slideBy,
      responsive,
    }

    //Initialize the carousel
    $(carousels[i]).owlCarousel(options);
  }
}
document.addEventListener('DOMContentLoaded', initializeOwlCarousel);


//Adding logic to load additional scripts that should not be included in Tag manager
$.getScript('/_resources/js/chatbot.js');
