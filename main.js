console.log('CustomElement');

class CustomElement extends HTMLElement {
    set value(v) {
        this._value = v;
    }

    get value() {
        return this._value;
    }

    updateValue(v) {
        this._value = v;
        this.linkedNode.setValue(this.value);
        this.updateView();
    }

    set link(id) {
        this.linkedNode = Xrm.Portal.Form.get(id);
        this.linkedNode.c[0].setAttribute('style', 'display:none;');
        this.linkedNode.c[0].onchange = () => { this.update(this.linkedNode.getValue()); }
        this.updateValue(this.linkedNode.getValue());
    }
}


// Create a class for the element
class Increment extends CustomElement {
    updateView() {
        this.textInput.value = this.value;
    }

    increment() {
        this.updateValue(parseInt(this.value) + 1);
    }

    constructor() {
        // Always call super first in constructor
        super();

        // Create a shadow root
        this.shadow = this.attachShadow({ mode: 'open' });

        // Create spans
        this.wrapper = document.createElement('span');
        this.wrapper.setAttribute('class', 'wrapper');

        this.textInput = document.createElement('input');
        this.textInput.setAttribute('tabindex', 0);
        this.textInput.setAttribute('value', this.value ?? '');
        this.textInput.onchange = () => this.updateValue(this.textInput.value);

        this.button = document.createElement('button');
        this.button.setAttribute('type', 'button');
        this.button.innerText = 'Increment';
        this.button.onclick = () => this.increment();

        // Create some CSS to apply to the shadow dom
        const style = document.createElement('style');
        console.log(style.isConnected);

        style.textContent = `
        .wrapper {
          position: relative;
        }
      `;

        // Attach the created elements to the shadow dom
        this.shadow.appendChild(style);
        console.log(style.isConnected);
        this.shadow.appendChild(this.wrapper);
        this.wrapper.appendChild(this.textInput);
        this.wrapper.appendChild(this.button);
    }
}

function registerComponent(tagName, type) {
    customElements.define(tagName, type);
}

function replaceControl(id) {
    const pocCtrl = document.createElement('increment-control');
    pocCtrl.link = id;
    Xrm.Portal.Form.get(id).c[0].parentElement.append(pocCtrl);
}

function showRootControl(id) {
    document.getElementById(id).hidden = false;
}

registerComponent('increment-control', Increment);