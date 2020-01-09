import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking"
import { htmlSafe } from "@ember/template";

const circumference = 301.59; // 48 * 2 * 3.14159
/**
 * component to render ring in svg
 *
 * @param {number} progress decimal number represent the percentage, value 0~1
 * @param {number} radius size of the circle, in pixel
 * @param {boolean} hasOuterRing whether if the outer ring should be rendered
 * @extends {Component}
 */
export default class CircleComponent extends Component {
  @tracked progress
  get dashStyle() {
    return htmlSafe(`stroke-dashoffset: ${this.args.progress * -1 * circumference}%`)
  }
}
