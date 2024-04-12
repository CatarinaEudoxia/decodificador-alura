// Selecionando os elementos HTML relevantes
const inputMessage = document.querySelector("#text-to-encrypt");
const buttonEncryptMessage = document.querySelector("#encrypt-message");
const buttonDecryptMessage = document.querySelector("#decrypt-message");
const outputMessage = document.querySelector(".initial-message");
const copyMessage = document.querySelector("#copy-button");
const warningDiv = document.querySelector(".warning");
const warningMessage = warningDiv.querySelector("p");

const originalOutputContent = outputMessage.innerHTML;

// Função para exibir aviso
function showWarning(message) {
    warningMessage.textContent = message;
    warningDiv.style.visibility = "visible";
};

// Função para ocultar aviso
function hideWarning() {
    warningDiv.style.visibility = "hidden";
};

// Função para tornar o botão de cópia visível quando necessário
function copyButtonVisibility() {
    const message = inputMessage.value.trim();

    // Verifica se o campo de entrada está vazio ou contém uma mensagem inválida
    if (message === "" || /[^a-z,.!?;:'"\s]|[^a-z\s][a-z]/.test(message)) {
        // Se estiver vazio ou contiver uma mensagem inválida, oculta o botão de cópia
        copyMessage.style.visibility = "hidden";
    } else {
        // Se não estiver vazio e não contiver uma mensagem inválida, exibe o botão de cópia
        copyMessage.style.visibility = "visible";
    }
};

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

// Event listener para criptografar a mensagem
buttonEncryptMessage.addEventListener("click", () => {
    const messageToEncrypt = inputMessage.value.trim();

    // Verifica se a mensagem está vazia
    if (messageToEncrypt == "") {
        showWarning("Por favor, insira uma mensagem antes de criptografar.")
        outputMessage.classList.add("empty-message");
        outputMessage.innerHTML = originalOutputContent;
        copyButtonVisibility();
        return;
    } else {
        // Verifica se a mensagem contém apenas letras minúsculas
        if (/[^a-z,.!?;:'"\s]|[^a-z\s][a-z]/.test(messageToEncrypt)) {
            showWarning("Apenas letras minúsculas e sem acento.")
            outputMessage.classList.add("invalid-message");
            outputMessage.textContent = "Mensagem Inválida. Certifique-se de não usar letras maiúsculas ou acentos."
            copyButtonVisibility();
            return;
        };
        // Oculta o aviso se não houver problemas com a mensagem
        hideWarning();
        outputMessage.classList.remove("empty-message");
        outputMessage.classList.remove("invalid-message");

        // Criptografa a mensagem
        const encryptedMessage = encrypting(messageToEncrypt);
        outputMessage.textContent = encryptedMessage;
        outputMessage.classList.add("encrypted-message");
        outputMessage.classList.remove("decrypted-message");
        copyButtonVisibility();
        copyMessage.textContent = "Copiar";
    };
});

//função de descriptografar
function decrypting(text) {
    const vowels = {
        "ai": "a",
        "enter": "e",
        "imes": "i",
        "ober": "o",
        "ufat": "u"
    };

    let decryptedMessage = "";

    // Percorre a mensagem criptografada
    for (let i = 0; i < text.length;) {
        let found = false;

        // Tenta encontrar uma sequência criptografada
        for (let key in vowels) {
            if (text.startsWith(key, i)) {
                decryptedMessage += vowels[key];
                i += key.length;
                found = true;
                break;
            }
        }

        // Se não foi encontrado, adiciona o caractere original
        if (!found) {
            decryptedMessage += text[i];
            i++;
        }
    }

    return decryptedMessage;
};

// Event listener para descriptografar a mensagem
buttonDecryptMessage.addEventListener("click", () => {
    const messageToDecrypt = inputMessage.value;

    if (messageToDecrypt == "") {
        showWarning("Por favor, insira uma mensagem antes de criptografar.")
        outputMessage.classList.add("empty-message");
        outputMessage.innerHTML = originalOutputContent;
        copyButtonVisibility()
        return;
    } else {
        // Verifica se a mensagem contém apenas letras minúsculas
        if (/[^a-z,.!?;:'"\s]|[^a-z\s][a-z]/.test(messageToDecrypt)) {
            showWarning("Apenas letras minúsculas e sem acento.")
            outputMessage.classList.add("invalid-message");
            outputMessage.textContent = "Mensagem Inválida. Certifique-se de não usar letras maiúsculas ou acentos."
            copyButtonVisibility();
            return;
        };
        // Oculta o aviso se não houver problemas com a mensagem
        hideWarning();
        outputMessage.classList.remove("empty-message");
        outputMessage.classList.remove("invalid-message");

        const decryptedMessage = decrypting(messageToDecrypt);
        outputMessage.textContent = decryptedMessage;
        outputMessage.classList.add("decrypted-message");
        outputMessage.classList.remove("encrypted-message");
        copyButtonVisibility();
        copyMessage.textContent = "Copiar";
    };
});

// Event listener para copiar o texto criptografado
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
})