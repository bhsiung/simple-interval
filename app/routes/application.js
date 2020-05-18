import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  headTags = [{
    type: 'meta',
    tagId: 'meta-description-tag',
    attrs: {
      name: 'description',
      content: 'Free workout timer, 100% customizable for your HIIT or TABATA routine'
    }
  }]
  activate() {
    if (!window.addEventListener) return
    window.addEventListener('beforeinstallprompt', () => {
      // TODO add install prompt stuff
      // console.log('beforeinstallprompt');
    })
  }
}
