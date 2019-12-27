console.log('main.js');

class CustomElement extends HTMLElement {
    getValue() {
        return this.textInput.value;
    }   

    updateValue(e) {
        console.log('onChange: ' + e);
        this.value = e;
        this.updateView();
    }

    set link(id) {
        console.log(id);
        
        this.linkedNode = document.getElementById(id);
        this.linkedNode.hidden = true;
        this.linkedNode.onchange = () => { this.update(this.linkedNode.value); }
        this.updateValue(this.linkedNode.value);
    }
}


// Create a class for the element
class Increment extends CustomElement {
    updateView() {
        this.linkedNode.value = this.value;
        this.textInput.value = this.value;
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

        this.button = document.createElement('button');
        this.button.setAttribute('type', 'button');
        this.button.innerText = 'Increment';
        this.button.onclick = () => {
            this.updateValue(parseInt(this.value) + 1);
        };

        // Take attribute content and put it inside the info span
        const text = this.getAttribute('data-text');
        const controlId = this.getAttribute('data-control-id');

        // this.linkedNode = document.getElementById(controlId);
        // this.linkedNode.setAttribute('data-control-id', this.id);

        this.textInput.onchange = () => { this.updateValue(this.textInput.value);};

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

// Define the new element
customElements.define('increment-control', Increment);

function replaceControl(id) {
    const pocCtrl = document.createElement('increment-control');
    pocCtrl.link = id;
    document.getElementById(id).parentElement.append(pocCtrl);
}

function showRootControl(id) {
    document.getElementById(id).hidden = false;
}