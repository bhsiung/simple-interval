import Component from '@ember/component';
import { connect } from 'ember-redux';

const stateToComputed = (state) => ({
  configs: state.timers
});

class TimerCollectionComponent extends Component {
  tagName = ''
}

export default connect(stateToComputed)(TimerCollectionComponent);
