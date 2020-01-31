import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('clock', {path: 'clock/:id'}, function() {
    this.route('edit');
  });
  this.route('css-test');
  this.route('new-clock');
  this.route('not-found', {path: '/*path'});
  this.route('about');
  this.route('share-timer');
});

export default Router;
