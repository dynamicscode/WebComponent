console.log('CustomElement');

// Create a class for the element
class Increment extends HTMLInputElement {
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

class EmailValidator extends CustomElement {
    updateView() {
        this.textInput.value = this.value;
    }

    setErrorMessage(msg) {
        this.message.textContent = msg;
    }

    validateEmail() {
        var email = this.textInput.value;
        if (email.length < 1) {
            this.setErrorMessage('Please enter an email address');
        } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setErrorMessage('');
            this.updateValue(email);
        }
        else  {
            this.setErrorMessage('Please enter a valid email address.');
        }        
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
        this.textInput.setAttribute('class', 'text form-control');
        this.textInput.setAttribute('tabindex', 0);
        this.textInput.setAttribute('value', this.value ?? '');
        this.textInput.onchange = () => this.validateEmail();

        this.message = document.createElement('span');

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
        this.wrapper.appendChild(this.message);
    }
}

registerComponent('increment-control', Increment);
registerComponent('emailvalidator-control', EmailValidator);