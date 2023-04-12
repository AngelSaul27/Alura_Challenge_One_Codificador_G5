const btnEncrypted = document.getElementById('btnEncrypted');
const btnDecrypted = document.getElementById('btnDecrypted');
const inptTextArea = document.getElementById('inptTextArea');
const outptTextArea = document.getElementById('outptTextArea');
const btnCopyResult = document.getElementById('btnCopyResult');
const pre_information = document.getElementsByClassName("pre-information");
const keysEncoded = {
    "e" : "enter",
    "i" : "imes",
    "a" : "ai",
    "o" : "ober",
    "u" : "ufat"
}

inptTextArea.addEventListener("input", validateText);
btnEncrypted.onclick = encrypt; 
btnDecrypted.onclick = decrypt;
btnCopyResult.onclick = copyResult;

function encrypt(){
    if (inptTextArea.value !== ""){
        const text = inptTextArea.value;
        let encrypted = text;
        for (const key in keysEncoded) {
            const regex = new RegExp(key, "g");
            encrypted = encrypted.replace(regex, keysEncoded[key]);
        }
        writeResult(encrypted);
    }
}

function decrypt(){
    if (inptTextArea.value !== ""){
        const text = inptTextArea.value;
        let encrypted = text;
        for (const key in keysEncoded) {
            const regex = new RegExp(keysEncoded[key], "g");
            encrypted = encrypted.replace(regex, key);
        }
        writeResult(encrypted);
    }
}

function writeResult(text){
    outptTextArea.value = text;
    showOrHiddenTextOutput("none", "block");
}

function copyResult(){
    outptTextArea.select();
    if (!navigator.clipboard) {
        document.execCommand("copy");
        return 
    }
    navigator.clipboard.writeText(outptTextArea.value);
}

function validateText() {
    if (inptTextArea.value === "") {
      showOrHiddenTextOutput("block", "none");
      return;
    }

    const regex = /[W]|[áéíóúÁÉÍÓÚñÑ¿¡«»“”‘’'"´`+*()\-–—/\\=|#@^\[\]{}%$§&~;:<>!?]|[A-Z]/g;
    const cleanedText = inptTextArea.value.replace(regex, "");
    inptTextArea.value = cleanedText;
}

function showOrHiddenTextOutput(style1, style2){
    for (let i = 0; i < pre_information.length; i++) {
      pre_information[i].style.display = style1;
    }
    outptTextArea.style.display = style2;
    btnCopyResult.style.display = style2;
}