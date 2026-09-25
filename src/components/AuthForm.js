import { getSession, onAuthStateChange, signIn, signOut, signUp } from '../auth.js';
import { isSupabaseConfigured } from '../supabase.js';

function formatError(error) {
  const message = error?.message || 'No se pudo completar la operación.';
  const translations = {
    'Invalid login credentials': 'El correo o la contraseña no son correctos.',
    'User already registered': 'Ya existe una cuenta con ese correo.',
    'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres.',
    'Email not confirmed': 'Confirmá tu correo antes de iniciar sesión.'
  };
  return translations[message] || message;
}

export function mountAuthForm(root, { onAuthenticated } = {}) {
  root.innerHTML = `
    <div class="auth-card">
      <div class="auth-intro">
        <span class="auth-mark">L</span>
        <p class="auth-eyebrow">LOOP / ACCOUNT</p>
        <h1>${isSupabaseConfigured ? 'Entrá a tu mundo' : 'Conectá Supabase'}</h1>
        <p>${isSupabaseConfigured ? 'Guardá tus reels, creá tu perfil y compartí lo que descubras.' : 'Copiá .env.example a .env y completá las credenciales de tu proyecto.'}</p>
      </div>
      <div class="auth-tabs" role="tablist">
        <button class="auth-tab active" type="button" data-auth-mode="login">Iniciar sesión</button>
        <button class="auth-tab" type="button" data-auth-mode="signup">Crear cuenta</button>
      </div>
      <div class="auth-user" data-auth-user hidden></div>
      <form class="auth-form" data-auth-form>
        <div class="auth-field auth-signup-only" hidden>
          <label for="auth-name">Nombre visible</label>
          <input id="auth-name" name="displayName" type="text" autocomplete="name" placeholder="Cómo te verá tu comunidad">
        </div>
        <div class="auth-field">
          <label for="auth-email">Correo electrónico</label>
          <input id="auth-email" name="email" type="email" autocomplete="email" placeholder="tu@correo.com" required>
        </div>
        <div class="auth-field">
          <label for="auth-password">Contraseña</label>
          <input id="auth-password" name="password" type="password" minlength="6" autocomplete="current-password" placeholder="Mínimo 6 caracteres" required>
        </div>
        <div class="auth-field auth-signup-only" hidden>
          <label for="auth-avatar">Foto de perfil <small>opcional</small></label>
          <input id="auth-avatar" name="avatar" type="file" accept="image/jpeg,image/png,image/webp,image/gif">
        </div>
        <button class="auth-submit" type="submit" data-auth-submit>Continuar</button>
        <p class="auth-status" data-auth-status role="status" aria-live="polite"></p>
      </form>
      <p class="auth-legal">Al continuar aceptás usar Loop de forma responsable. La clave anon de Supabase es pública por diseño; nunca coloques una clave <code>service_role</code> en el navegador.</p>
    </div>`;

  const form = root.querySelector('[data-auth-form]');
  const status = root.querySelector('[data-auth-status]');
  const submit = root.querySelector('[data-auth-submit]');
  const userPanel = root.querySelector('[data-auth-user]');
  const signupFields = root.querySelectorAll('.auth-signup-only');
  let mode = 'login';

  const setStatus = (message, type = '') => {
    status.textContent = message;
    status.dataset.type = type;
  };

  const setMode = (nextMode) => {
    mode = nextMode;
    root.querySelectorAll('[data-auth-mode]').forEach((tab) => tab.classList.toggle('active', tab.dataset.authMode === mode));
    signupFields.forEach((field) => { field.hidden = mode !== 'signup'; });
    root.querySelector('[data-auth-submit]').textContent = mode === 'login' ? 'Entrar a Loop' : 'Crear mi cuenta';
    root.querySelector('#auth-password').autocomplete = mode === 'login' ? 'current-password' : 'new-password';
    setStatus('');
  };

  const renderUser = (user) => {
    if (!user) {
      userPanel.hidden = true;
      form.hidden = false;
      return;
    }
    userPanel.hidden = false;
    form.hidden = true;
    userPanel.innerHTML = `<div class="auth-user-avatar">${(user.email || 'U').slice(0, 1).toUpperCase()}</div><div><strong>${user.user_metadata?.display_name || user.email}</strong><span>Sesión activa</span></div><button type="button" data-auth-signout>Cerrar sesión</button>`;
    userPanel.querySelector('[data-auth-signout]').addEventListener('click', async () => {
      await signOut();
      setStatus('Sesión cerrada');
    });
    onAuthenticated?.(user);
  };

  root.querySelectorAll('[data-auth-mode]').forEach((tab) => tab.addEventListener('click', () => setMode(tab.dataset.authMode)));

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!isSupabaseConfigured) {
      setStatus('Faltan VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.', 'error');
      return;
    }
    const formData = new FormData(form);
    submit.disabled = true;
    submit.textContent = mode === 'login' ? 'Conectando...' : 'Creando cuenta...';
    setStatus('');
    try {
      if (mode === 'login') {
        const data = await signIn({ email: formData.get('email'), password: formData.get('password') });
        renderUser(data.user);
        setStatus('Sesión iniciada correctamente.', 'success');
      } else {
        const data = await signUp({
          email: formData.get('email'),
          password: formData.get('password'),
          displayName: formData.get('displayName'),
          avatar: formData.get('avatar')
        });
        if (data.session) {
          renderUser(data.user);
          setStatus('Cuenta creada correctamente.', 'success');
        } else {
          setStatus('Revisá tu correo para confirmar la cuenta.', 'success');
        }
      }
    } catch (error) {
      setStatus(formatError(error), 'error');
    } finally {
      submit.disabled = false;
      submit.textContent = mode === 'login' ? 'Entrar a Loop' : 'Crear mi cuenta';
    }
  });

  setMode('login');
  if (isSupabaseConfigured) {
    getSession().then((session) => renderUser(session?.user || null)).catch((error) => setStatus(formatError(error), 'error'));
    onAuthStateChange((_event, session) => renderUser(session?.user || null));
  }
}
