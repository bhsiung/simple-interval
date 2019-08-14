'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  return {
    name: "tabata",
    short_name: "tabata",
    description: "",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#222",
    icons: [
    ],
    ms: {
      tileColor: '#fff'
    }
  };
}
