let cls = 'toast' + Math.random().toString().slice(2,6);

defineCE({
  tag: "toast-ce",
  html:/*html*/`
    <style>
      .${cls} {
        padding: 20px;
        opacity: 1;
        transition: all 0.2s linear;
        position:fixed;
        bottom:0px;
        width:80vw;
        left:7.5vw;
        background: black;
        color: white;
        margin:0;
      }
      .${cls}.hidden {
        opacity: 0;
        bottom: -20px;
      }
    </style>

    <div class="${cls} hidden"></div>
  `, 

  _queue : [],

  async _showNext() {
    console.log('showNext', this._queue);
    let div = this.querySelector(`.${cls}`);
    if (!this._queue.length) { 
      // hide
      div.classList.add('hidden');
      div.innerHTML = '';
      return 
    };
    
    // show
    div.innerHTML = this._queue[0];
    div.classList.remove('hidden');
    await new Promise(res=>setTimeout(res, 
      parseInt(this.getAttribute("timeout") || "1000")
    ));
    div.classList.add('hidden');
    await new Promise(res=>setTimeout(res, 300)); 
    this._queue.shift();
    this._showNext();
  },

  show (content) {
    this._queue.push(content);
    if (this._queue.length === 1) { this._showNext(); }
  }
})


// -- HELPER
function defineCE({tag,attr,html,update,onload, ...rest}) {
  
  customElements.define(tag, class extends HTMLElement {
    
    static get observedAttributes() { return attr };

    attributeChangedCallback (attrName, oldValue, newValue) {
      // first time, it triggers before element is initialized...    
      if (this.update) this.update();
    }

    connectedCallback() {
      this.innerHTML = html.replace('<slot></slot>',this.innerHTML);

      this.update = ()=>Object.entries(update||{}).forEach( ([selector,updater])=>{
        updater(
          this.querySelector(selector), 
          (attrName)=>eval(this.getAttribute(attrName))
        )
      });

      Object.entries(rest).forEach( ([k,v])=>this[k] = v);

      if (onload) { onload.call(this) }
      eval(this.getAttribute('onload'))
      this.update();
    }

  });
}