import Component from '@ember/component';
import { connect } from 'ember-redux';

const stateToComputed = (state) => ({
  configs: state.clocks
});

class ClockCollectionComponent extends Component {
  tagName = ''
}

export default connect(stateToComputed)(ClockCollectionComponent);
