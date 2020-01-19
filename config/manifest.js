'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  return {
    name: 'Athletic Clock',
    short_name: 'Athletic Clock',
    description: 'Free workout timer APP, fully customizable for TABATA or HIIT',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#222',
    icons: [
      {
       "src": "\/android-icon-36x36.png",
       "sizes": "36x36",
       "type": "image\/png",
       "density": "0.75"
      },
      {
       "src": "\/android-icon-48x48.png",
       "sizes": "48x48",
       "type": "image\/png",
       "density": "1.0"
      },
      {
       "src": "\/android-icon-72x72.png",
       "sizes": "72x72",
       "type": "image\/png",
       "density": "1.5"
      },
      {
       "src": "\/android-icon-96x96.png",
       "sizes": "96x96",
       "type": "image\/png",
       "density": "2.0"
      },
      {
       "src": "\/android-icon-144x144.png",
       "sizes": "144x144",
       "type": "image\/png",
       "density": "3.0"
      },
      {
       "src": "\/android-icon-192x192.png",
       "sizes": "192x192",
       "type": "image\/png",
       "density": "4.0"
      }
    ],
    ms: {
      tileColor: '#fff'
    }
  };
};
