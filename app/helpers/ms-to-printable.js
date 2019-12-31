import { helper } from '@ember/component/helper';
import { msToPrintable } from 'tabata/utils/time-functions'

export default helper(function([ms]/*, hash*/) {
  return msToPrintable(ms);
});
