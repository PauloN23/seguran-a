// Elementos principais
const campoSenha = document.querySelector('#campoSenha');
const tamanhoSenhaSpan = document.querySelector('#tamanhoSenha');
let tamanhoSenha = 12;

// Conjuntos de caracteres
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

// Botões de ajuste
const btnDiminuir = document.querySelector('#diminuir');
const btnAumentar = document.querySelector('#aumentar');

// Checkboxes
const chkMaiusculas = document.querySelector('#chkMaiusculas');
const chkMinusculas = document.querySelector('#chkMinusculas');
const chkNumeros = document.querySelector('#chkNumeros');
const chkSimbolos = document.querySelector('#chkSimbolos');

// Força da senha
const barraForca = document.querySelector('.nivel');
const textoEntropia = document.querySelector('#entropia');

// Botões de ação
const btnGerar = document.querySelector('#btnGerar');
const btnCopiar = document.querySelector('#btnCopiar');

// Ajuste do tamanho da senha
btnDiminuir.onclick = () => {
    if (tamanhoSenha > 4) { // limite mínimo
        tamanhoSenha--;
        tamanhoSenhaSpan.textContent = tamanhoSenha;
        geraSenha();
    }
};

btnAumentar.onclick = () => {
    if (tamanhoSenha < 30) { // limite máximo
        tamanhoSenha++;
        tamanhoSenhaSpan.textContent = tamanhoSenha;
        geraSenha();
    }
};

// Geração da senha
function geraSenha() {
    let alfabeto = '';
    if (chkMaiusculas.checked) alfabeto += letrasMaiusculas;
    if (chkMinusculas.checked) alfabeto += letrasMinusculas;
    if (chkNumeros.checked) alfabeto += numeros;
    if (chkSimbolos.checked) alfabeto += simbolos;

    if (alfabeto.length === 0) {
        campoSenha.value = "Selecione pelo menos 1 opção";
        return;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let indice = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[indice];
    }
    campoSenha.value = senha;

    classificaSenha(alfabeto.length);
}

// Classificação da senha
function classificaSenha(tamanhoAlfabeto) {
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);

    barraForca.classList.remove('fraco', 'medio', 'forte');
    if (entropia > 57) {
        barraForca.classList.add('forte');
    } else if (entropia > 35) {
        barraForca.classList.add('medio');
    } else {
        barraForca.classList.add('fraco');
    }

    textoEntropia.textContent =
        "Tempo estimado de quebra: " +
        Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24)) +
        " dias.";
}

// Botão de gerar
btnGerar.onclick = geraSenha;

// Botão de copiar
btnCopiar.onclick = () => {
    if (campoSenha.value && !campoSenha.value.startsWith("Selecione")) {
        navigator.clipboard.writeText(campoSenha.value);
        btnCopiar.textContent = "Copiado!";
        setTimeout(() => (btnCopiar.textContent = "Copiar"), 2000);
    }
};

// Gera senha inicial
geraSenha();
