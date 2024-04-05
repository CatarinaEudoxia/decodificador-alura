const inputMessage = document.querySelector("#text-to-encrypt");
const buttonEncryptMessage = document.querySelector("#encrypt-message");
const buttonDecryptMessage = document.querySelector("#decrypt-message");
const outputMessage = document.querySelector(".initial-message");
const copyMessage = document.querySelector("#copy-button");

//função de criptografar
function encrypting(text) {
    const vowels = {
        "a": "ai",
        "e": "enter",
        "i": "imes",
        "o": "ober",
        "u": "ufat"
    };

    let encodedMessage = "";

    for (let i = 0; i < text.length; i++) {
        let characters = text[i];

        if (vowels.hasOwnProperty(characters)) {
            encodedMessage += vowels[characters];
        } else {
            encodedMessage += characters;
        }
    }
    return encodedMessage;
};

buttonEncryptMessage.addEventListener("click", () => {
    const messageToEncrypt = inputMessage.value;
    const encryptedMessage = encrypting(messageToEncrypt);
    outputMessage.textContent = encryptedMessage;
    outputMessage.style.alignItems = "flex-start";
    outputMessage.style.justifyContent = "flex-start";
    copyButtonVisibility();
    copyMessage.textContent = "Copiar";
});

//função de descriptografar

function decrypting(text) {
    text = text.replace(/ai/g, "a");
    text = text.replace(/enter/g, "e");
    text = text.replace(/imes/g, "i");
    text = text.replace(/ober/g, "o");
    text = text.replace(/ufat/g, "u");

    return text;
};

buttonDecryptMessage.addEventListener("click", () => {
    const messageToDecrypt = inputMessage.value;
    const decryptedMessage = decrypting(messageToDecrypt);
    outputMessage.textContent = decryptedMessage;
    outputMessage.style.alignItems = "flex-start";
    outputMessage.style.justifyContent = "flex-start";
    copyButtonVisibility();
    copyMessage.textContent = "Copiar";
});

//visibilidade do botão*

function copyButtonVisibility() {
    if (copyMessage.style.visibility === "hidden" || copyMessage.style.visibility === "") {
        copyMessage.style.visibility = "visible";
    }
};

copyMessage.addEventListener("click", () => {
    const textToCopy = outputMessage.textContent;

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            // Altera o texto do botão para "Copiado" temporariamente
            copyMessage.textContent = "Copiado";
        })
        .catch(err => {
            // Trata erros, se houver
            console.error("Falha ao copiar texto: ", err);
        });
});



