import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking"

const circumference = 301.59; // 48 * 2 * 3.14159
/**
 * component to render ring in svg
 *
 * @param {number} progress decimal number represent the percentage, value 0~1
 * @extends {Component}
 */
export default class CircleComponent extends Component {
  @tracked progress
  get dash() {
    return `${this.args.progress * -1 * circumference}%`
  }
}
