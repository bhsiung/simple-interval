import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  activate() {
    if (!window.addEventListener) return
    window.addEventListener('beforeinstallprompt', () => {
      // TODO add install prompt stuff
      // console.log('beforeinstallprompt');
    })
  }
}
