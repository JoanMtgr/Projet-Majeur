(function($) {
  $.cookit = function(options) {

    var settings = $.extend({
      backgroundColor: '#1c1c1c',
      messageColor: '#fff',
      linkColor: '#fad04c',
      buttonColor: '#fad04c',
      messageText: "<b>Do you hungry ?</b> 🍪 En continuant votre navigation sur ce site, vous acceptez l'utilisation de cookies.",
      linkText: "En savoir plus",
      linkUrl: "https://www.cookiesandyou.com",
      buttonText: "J'accepte",
    }, options);
    
    const banner = $("<div id='cookit'></div>");
    const container = $("<div id='cookit-container'></div>");
    var message = link = button = null;
    const hasCookieConsent = getCookie('cookies-consent');

    if (!hasCookieConsent) {
      createBanner(settings);
      $('#cookit-button').on('click', () => {
        const cookieBanner = $('#cookit');
        cookieBanner.addClass('hidden');
        setCookie('cookies-consent', 1, 365);
      });
    }

    function createBanner() {
      message = $("<p id='cookit-message'>"+ settings.messageText +"</p>");
      link = $("<a id='cookit-link' href='" + settings.linkUrl + "' target='_blank'>" + settings.linkText + "</a>");
      button = $("<a id='cookit-button' href='#'>" + settings.buttonText + "</a>");
    
      $('body').append(banner);
      banner.append(container);
      container.append(message);
      container.append(link);
      container.append(button);

      customize();
    }

    function customize() {
      banner.css({'background-color': settings.backgroundColor});
      message.css({'color': settings.messageColor});
      link.css({'color': settings.linkColor});
      button.css({
        'background-color': settings.buttonColor,
        'color': settings.backgroundColor
      });
    }
    
    function getCookie(name) {
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      name = name + "=";
    
      for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
      }
    }
    
    function setCookie(name, value, days) {
      const date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      const expires = "expires=" + date.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

  };
})(jQuery);