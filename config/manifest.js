'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  return {
    name: 'tabata',
    short_name: 'tabata 2',
    description: 'Free workout timer APP',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#222',
    icons: [
      {
        src: '/assets/icons/icon.png',
        sizes: '192x192'
      }
    ],
    ms: {
      tileColor: '#fff'
    }
  };
};
