//  1. LIGAÇÃO COM O SUPABASE 
// Troca pelas tuas chaves verdadeiras do Supabase
const SUPABASE_URL = 'https://rrntqnpkkjopltkfyflc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJybnRxbnBra2pvcGx0a2Z5ZmxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMTUyMzEsImV4cCI6MjA3ODc5MTIzMX0.UNoLM49G237bk6eJiKn9_8fvX4lGAwyePQs3XjE_aIY'; // A tua chave anon public

// Inicializa o cliente Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


// 2 - SELEÇÃO DOS ELEMENTOS DO HTML
// Estes "getElementById" procuram os "id"s que definiste no HTML
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

//  3. LÓGICA DE LOGIN 
// Adiciona um "escutador" ao formulário que espera pelo "submit" (clique no botão)
loginForm.addEventListener('submit', async (event) => {
    // Impede que o formulário recarregue a página (o comportamento padrão)
    event.preventDefault(); 

    // Pega nos valores que o utilizador digitou
    const email = emailInput.value;
    const password = passwordInput.value;

    // Tenta fazer o login no Supabase
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });

        
        if (error) {
            console.error('Erro no login:', error.message);
            errorMessage.textContent = 'E-mail ou senha inválidos. Tente novamente.';
            return; // Para a execução aqui
        }

        
        console.log('Login bem-sucedido!', data);
        
        
        window.location.href = 'home.html'; 

    } catch (error) {
        // Pega em erros de rede ou outros
        console.error('Erro inesperado:', error);
        errorMessage.textContent = 'Ocorreu um erro. Tente mais tarde.';
    }
});