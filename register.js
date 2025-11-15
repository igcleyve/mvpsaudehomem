//  1. LIGAÇÃO COM O SUPABASE 
const SUPABASE_URL = 'https://rrntqnpkkjopltkfyflc.supabase.co'; // A tua URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJybnRxbnBra2pvcGx0a2Z5ZmxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMTUyMzEsImV4cCI6MjA3ODc5MTIzMX0.UNoLM49G237bk6eJiKn9_8fvX4lGAwyePQs3XjE_aIY'; // A tua Chave (cola a mesma do auth.js)


const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


//  2. SELEÇÃO DOS ELEMENTOS DO HTML 
const registerForm = document.getElementById('register-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('password-confirm');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

//  3. LÓGICA DE CADASTRO 
registerForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // 

    // Pega nos valores
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;

    // --- Validação 1: As senhas coincidem? ---
    if (password !== passwordConfirm) {
        errorMessage.textContent = 'As senhas não coincidem. Tente novamente.';
        successMessage.textContent = ''; // Limpa a msg de sucesso
        return;
    }

    // Tenta fazer o cadastro no Supabase
    try {
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: { 
                    full_name: name // Envia o nome do utilizador para o Supabase
                }
            }
        });

        // SE DER ERRO
        if (error) {
            console.error('Erro no cadastro:', error.message);
            successMessage.textContent = ''; // Limpa a msg de sucesso

            // Trata erros comuns
            if (error.message.includes("Password should be at least 6 characters")) {
                errorMessage.textContent = 'A senha deve ter pelo menos 6 caracteres.';
            } else if (error.message.includes("User already registered")) {
                errorMessage.textContent = 'Este e-mail já está cadastrado.';
            } else {
                errorMessage.textContent = 'Erro ao cadastrar. Tente novamente.';
            }
            return;
        }

        // SE DER CERTO
        console.log('Cadastro bem-sucedido!', data);
        errorMessage.textContent = ''; // Limpa erros antigos
        
        // IMPORTANTE: O Supabase envia um e-mail de confirmação.
        // O utilizador não é logado imediatamente.
        successMessage.textContent = 'Cadastro realizado! Verifique o seu e-mail para confirmar a conta.';
        
        registerForm.reset(); // Limpa os campos do formulário

    } catch (error) {
        // Pega em erros de rede ou outros
        console.error('Erro inesperado:', error);
        errorMessage.textContent = 'Ocorreu um erro. Tente mais tarde.';
    }
});