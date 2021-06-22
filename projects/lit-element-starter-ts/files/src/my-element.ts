/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html} from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * An example application.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-app')
export class MyElement extends LitElement {
  render() {
    return html`
      <div cds-layout="vertical gap:lg align:center">
        <a href="https://clarity.design">
          <img
            style="width:150px"
            alt="Clarity Design System"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36' viewBox='0 0 36 36' width='36'%3E%3Cg fill='none' fill-rule='evenodd' transform='translate(0 4.544118)'%3E%3Cpath d='m24.7018129.03888403 11.2778281 6.67879663-.0181821 13.56348904-11.259646 6.6606051-6.6844666-3.9709902 11.6514714-6.541272v-5.8973849l-4.7471673-2.60470586-6.8895427-3.93711399' fill='%230095d3'/%3E%3Cpath d='m11.3313965.03888403-11.277828 6.67879663.01818205 13.56348904 11.25964595 6.6606051 6.6852924-3.9717138-10.66220196-6.5405484v-5.8973849l10.67797726-6.54221107' fill='%23f38b00'/%3E%3Cpath d='m18.017374 22.9708988-6.5183252-3.998915 6.5222007-3.8447451 6.9298332 3.951391' fill='%23004b70'/%3E%3Cpath d='m18.0314053 3.98921729-6.5046536 3.98442963 6.5172421 3.88418548 6.8619013-3.93951296' fill='%2398441e'/%3E%3C/g%3E%3C/svg%3E"
            type="image/svg+xml"
          />
        </a>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-app': MyElement;
  }
}
