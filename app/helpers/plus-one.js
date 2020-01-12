import { helper } from '@ember/component/helper';

export default helper(function plusOne([val]/*, hash*/) {
  return parseInt(val) + 1;
});
