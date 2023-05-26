class Btn extends HTMLElement {

  // 指定观察的属性，这样 attributeChangedCallback 才会起作用
  static get observedAttributes() { return ['style']; }


  constructor() {
    super()

    const shaDom = this.attachShadow({ mode: 'open' })


    // # 1
    // this.p = this.h('p')
    // this.p.innerText = 'Hello'
    // this.p.setAttribute('style', 'width: 200px;height: 200px;border: 1px solid black;')

    // shaDom.appendChild(this.p)

    // # 2
    this.template = this.h('template')

    this.template.innerHTML = `
      <style>
        div {
          width: 200px;
          height: 200px;
          border: 1px solid black;
        }
      </style>
      <div>自定义节点</div>
    `
    shaDom.appendChild(this.template.content.cloneNode(true))
  }

  h(el) {
    return document.createElement(el)
  }

  // 下面4个方法为常用生命周期
  connectedCallback() {
    console.log('自定义元素加入页面');
    // 执行渲染更新
    this._updateRendering();
  }

  disconnectedCallback() {
    // 本例子该生命周期未使用，占位示意
    console.log('自定义元素从页面移除');
  }

  adoptedCallback() {
    // 本例子该生命周期未使用，占位示意
    console.log('自定义元素转移到新页面');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('自定义元素属性发生变化');
    this._style = newValue;
    // 执行渲染更新
    this._updateRendering();
  }

  // 设置直接get/set rows属性的方法
  get style() {
    return this._style;
  }

  set style(v) {
    this.setAttribute('style', v);
  }

  _updateRendering() {
    // 根据变化的属性，改变组件的UI
    // ...
  }
}


window.customElements.define('btn-jj', Btn)
