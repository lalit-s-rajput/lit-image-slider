/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
//import {LitElement, html, css} from 'lit-element';
import {customElement, property} from 'lit/decorators.js';

@customElement('image-slider')
export class ImageSlider extends LitElement {
  index = 0;
  imageSource = '';
  private _imageArray: string[] = [];
  @property({type: Array})
  set imageArray(value: string[]) {
    this._imageArray = value;
    this.imageSource = this._imageArray[0];
  }
  //imageArray: string[] = [];
  static override styles = css`
    :host {
      width: 700px;
      height: 500px;
      display: block;
    }
    .container {
      display: flex;
      flex-direction: row;
      position: relative;
      align-items: center;
    }
    .left-button,
    .right-button {
      position: relative;
      font-size: 40px;
      font-weight: bold;
      color: white;
      cursor: pointer;
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
    .left-button {
      left: 40px;
    }
    .right-button {
      right: 40px;
    }
  `;

  override render() {
    //this.imageSource = this.imageArray[0];
    return html`
      <div class="container">
        <div class="left-button" @click="${this.leftButtonClick}">&larr;</div>
        <div class="image-container">
          <img .src="${this.imageSource}" alt="" />
        </div>
        <div class="right-button" @click="${this.rightButtonClick}">&rarr;</div>
      </div>
      <slot></slot>
    `;
  }
  leftButtonClick() {
    this.index = this.index > 0 ? this.index - 1 : this._imageArray.length - 1;
    this.imageSource = this._imageArray[this.index];
    this.requestUpdate();
  }
  rightButtonClick() {
    this.index = this.index < this._imageArray.length - 1 ? this.index + 1 : 0;
    this.imageSource = this._imageArray[this.index];
    this.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'image-slider': ImageSlider;
  }
}
