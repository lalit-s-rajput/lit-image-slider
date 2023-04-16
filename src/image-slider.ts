import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';
@customElement('image-slider')
export class ImageSlider extends LitElement {
  index = 0;
  imageSource = '';
  private _imageArray = [];
  @property()
  set imageArray(value: string) {
    try {
      this._imageArray = JSON.parse(value);
      this.imageSource = this._imageArray[0];
    } catch (e) {
      //this._imageArray = value;
      this.imageSource = value;
    }
  }
  static override styles = css`
    :host {
      width: 700px;
      height: 500px;
      display: block;
    }
    .disabled {
      display: none;
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
    const isButtonVisible = {
      display: this._imageArray?.length > 1 ? 'block' : 'none',
    };
    return html`
      <div class="container">
        <div
          style=${styleMap(isButtonVisible)}
          class="left-button"
          @click="${this.leftButtonClick}"
        >
          &larr;
        </div>
        <div class="image-container">
          <img .src="${this.imageSource}" alt="" />
        </div>
        <div
          style=${styleMap(isButtonVisible)}
          class="right-button"
          @click="${this.rightButtonClick}"
        >
          &rarr;
        </div>
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
