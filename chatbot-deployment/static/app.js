class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
        };
        this.state = false;
        this.messages = [];
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        if (!openButton || !chatBox || !sendButton) {
            console.error('One or more required elements are not found');
            return;
        }

        openButton.addEventListener('click', () => this.toggleState(chatBox));
        sendButton.addEventListener('click', () => this.onSendButton(chatBox));
        const node = chatBox.querySelector('.input');
        if (node) {
            node.addEventListener('keyup', ({ key }) => {
                if (key === 'Enter') {
                    this.onSendButton(chatBox);
                }
            });
        } else {
            console.error('Input field not found');
        }
    }

    toggleState(chatBox) {
        this.state = !this.state;
        if (this.state) {
            chatBox.classList.add('chatbox--active');
        } else {
            chatBox.classList.remove('chatbox--active');
        }
    }

    onSendButton(chatBox) {
        var textField = chatBox.querySelector('.input');
        if (!textField) {
            console.error('Text field not found');
            return;
        }
        let text1 = textField.value;
        if (text1 === '') {
            return;
        }

        let msg1 = { name: "User", message: text1 };
        this.messages.push(msg1);

        fetch($SCRIPT_ROOT + '/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(r => {
            if (!r.ok) {
                throw new Error('Network response was not ok');
            }
            return r.json();
        })
        .then(r => {
            let msg2 = { name: "Bot", message: r.answer };
            this.messages.push(msg2);
            this.updateChatText(chatBox);
            textField.value = '';
        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatBox);
            textField.value = '';
        });
    }

    updateChatText(chatBox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item) {
            if (item.name === 'Bot') {
                html += '<div class="message__item messages__item--visitor">' + item.message + '</div>';
            } else {
                html += '<div class="message__item messages__item--operator">' + item.message + '</div>';
            }
        });

        const chatmessages = chatBox.querySelector('.chatbox__messages');
        chatmessages.innerHTML = html;
    }
}

const chatbox = new Chatbox();
chatbox.display();