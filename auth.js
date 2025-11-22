// auth.js - MODO VISUAL (SEM SUPABASE)

// 1. Seleciona os elementos
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

// 2. Adiciona o evento de clique no botão
loginForm.addEventListener('submit', (event) => {
    
    // Impede a página de recarregar
    event.preventDefault(); 

    const email = emailInput.value;
    const password = passwordInput.value;

    // --- VALIDAÇÃO SIMPLES (Só para visual) ---
    if (password.length < 6) {
        errorMessage.textContent = 'A senha precisa ter no mínimo 6 caracteres.';
        successMessage.textContent = ''; // Limpa sucesso
        return;
    }

    // --- SUCESSO SIMULADO ---
    // Se a senha tiver 6+ dígitos, consideramos "sucesso"
    errorMessage.textContent = ''; // Limpa erro
    successMessage.textContent = 'LOGIN EFETUADO COM SUCESSO! Redirecionando...';

    // 3. Espera 2 segundos e REDIRECIONA
    setTimeout(() => {
        window.location.href = 'home.html'; 
    }, 2000);
});