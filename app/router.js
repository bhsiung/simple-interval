import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('timer', {path: 'timer/:id'}, function() {
    this.route('edit');
  });
  this.route('css-test');
  this.route('new-timer');
  // this.route('about');
  this.route('share-timer');
  this.route('not-found', {path: '/*path'});
});

export default Router;
