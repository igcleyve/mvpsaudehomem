const bodyElement = document.body;

// 1. Função para Falar o Status (Acessibilidade de Voz)
function announceStatus(message) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = 'pt-BR'; 
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    }
}
 
// 2. Função para Carregar o Estado Salvo
function loadAccessibilityMode() { 
    const savedMode = localStorage.getItem('accessibilityMode');
    const switchButton = document.getElementById('switch-button'); 

    if (savedMode === 'on') {
        bodyElement.classList.add('dark-mode');
        bodyElement.classList.add('large-text');
        if (switchButton) {
            switchButton.setAttribute('aria-checked', 'true');
        }
    } else {
        bodyElement.classList.remove('dark-mode');
        bodyElement.classList.remove('large-text');
        if (switchButton) {
            switchButton.setAttribute('aria-checked', 'false');
        }
    }
} 

// 3. Função para Alternar e Salvar o Estado
function toggleSwitchButton(event) { 
    const switchButton = event.currentTarget;
    let isChecked = switchButton.getAttribute('aria-checked') === 'true';

    if (isChecked) {
        switchButton.setAttribute('aria-checked', 'false');
        bodyElement.classList.remove('dark-mode');
        bodyElement.classList.remove('large-text'); 
        localStorage.setItem('accessibilityMode', 'off'); 
        announceStatus("Modo Acessibilidade Desativado. Tamanho da Fonte Normal.");
    } else {
        switchButton.setAttribute('aria-checked', 'true');
        bodyElement.classList.add('dark-mode');
        bodyElement.classList.add('large-text'); 
        localStorage.setItem('accessibilityMode', 'on'); 
        announceStatus("Modo Acessibilidade Ativado. Modo Noturno e Aumento de Fonte.");
    }
}     

// ======================================================
// 4. FUNÇÃO DE ATALHO DE TECLADO (TECLA ESPAÇO) ⌨️
// ======================================================

function handleKeyboardShortcut(event) {
    // Verifica se a tecla pressionada foi ' ' (barra de espaço)
    if (event.key === ' ' || event.key === 'Spacebar') { 
        
        // Impede que a barra de espaço role a página
        event.preventDefault(); 
        
        // Verifica se o foco está em um input ou textarea para não interferir na digitação
        const focusedElement = event.target.tagName.toLowerCase();
        if (focusedElement === 'input' || focusedElement === 'textarea' || focusedElement === 'button') {
            return;
        }

        // Localiza o botão
        const switchButton = document.getElementById('switch-button');
        
        if (switchButton) {
            // Simula o clique no botão
            switchButton.click(); 
        }
    }
}


// ⚠️ Inicialização: Carrega o estado ANTES de adicionar o clique.
loadAccessibilityMode(); 

// Adiciona o listener de clique
document.querySelectorAll('.switch__button').forEach(switchButton => {
    switchButton.addEventListener('click', toggleSwitchButton);
});

// Adiciona o listener para o atalho de teclado
document.addEventListener('keydown', handleKeyboardShortcut);