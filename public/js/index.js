import '@babel/polyfill';
const loginForm = document.querySelector(`.form--login`);
const registerForm = document.querySelector(`.form--register`);
const updateDataForm = document.querySelector(`.form-user-data`);
const updatePasswordForm = document.querySelector(`.form-user-password`);
const bookBtn = document.querySelector(`#book-tour`);

const logoutBtn = document.querySelector(`.nav__el--logout `);

import { login, register } from './auth';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

if (logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.cookie = `jwt=loggedout; expires=${new Date(Date.now() + 10 * 1000)}; max-age=0 domain=${location.host}`;
    console.log(`Remove second`);
    window.setTimeout(() => {
      location.reload(true);
    }, 1000);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email-reg').value;
    const name = document.getElementById('username-reg').value;
    const password = document.getElementById('password-reg').value;
    const passwordConfirm = document.getElementById('passwordConfirm-reg').value;

    register(email, name, password, passwordConfirm);
  });
}

if (updateDataForm) {
  updateDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    // const name = document.getElementById('name').value;
    // const email = document.getElementById('email').value;
    updateSettings(form, 'profile');
  });
}

if (updatePasswordForm) {
  updatePasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector(`.btn--save-password`).value = 'updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
    document.querySelector(`.btn--save-password`).value = 'Update password';
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
