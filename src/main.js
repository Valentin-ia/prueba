import { mountAuthForm } from './components/AuthForm.js';

const root = document.querySelector('[data-auth-root]');
if (root) mountAuthForm(root);
