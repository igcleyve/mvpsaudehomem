// SELEÇÃO DOS ELEMENTOS
const registerForm = document.getElementById('register-form');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('password-confirm');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

// LÓGICA DE CADASTRO SIMULADO
registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;

    // Validação visual: Senhas coincidem?
    if (password !== passwordConfirm) {
        errorMessage.textContent = 'As senhas não coincidem. Tente novamente.';
        successMessage.textContent = '';
        return;
    }

    // SUCESSO SIMULADO
    errorMessage.textContent = '';
    successMessage.textContent = 'Cadastro realizado com sucesso! Redirecionando para o login...';
    
    registerForm.reset(); // Limpa os campos

    // Espera 2 segundos e manda o usuário para a tela de login
    setTimeout(() => {
        window.location.href = 'index.html'; 
    }, 2000);
});