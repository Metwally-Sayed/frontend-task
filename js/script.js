const userNameInput = document.getElementById('userName');
const userError = document.getElementById('usename-error');

const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');

const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('password-error');

const confirmPasswordInput = document.getElementById('confirm-password');
const confirmPasswordError = document.getElementById('confirm-password-error');

const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
const emailRFC = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

const formEle = document.getElementById('form');

let password = '';

// vaildation Functions :-

const vaildateName = () => {
  const name = userNameInput.value;

  if (name.length < 5) {
    userNameInput.style.backgroundColor = '#f7d9d9';
    userError.style.visibility = 'visible';
    return false;
  } else if (name.length > 15) {
    userNameInput.style.backgroundColor = '#f7d9d9';
    userError.style.visibility = 'visible';
    return false;
  } else if (userNameInput.value.match(specialChars)) {
    userNameInput.style.backgroundColor = '#f7d9d9';
    userError.style.visibility = 'visible';
    return false;
  } else {
    userNameInput.style.backgroundColor = '#ffffff';
    userError.style.visibility = 'hidden';
    return true;
  }
};

const vaildateEmail = () => {
  const email = emailInput.value;

  if (email.includes('@') === false) {
    emailInput.style.backgroundColor = '#f7d9d9';
    emailError.style.visibility = 'visible';
    return false;
  } else {
    emailInput.style.backgroundColor = '#ffffff';
    emailError.style.visibility = 'hidden';
    return true;
  }
};

const vaildatePassword = () => {
  password = passwordInput.value;
  if (password.length <= 8) {
    passwordInput.style.backgroundColor = '#f7d9d9';
    passwordError.style.visibility = 'visible';
    return false;
  } else {
    passwordInput.style.backgroundColor = '#ffffff';
    passwordError.style.visibility = 'hidden';
    return true;
  }
};

const vaildateConfirmPassword = () => {
  const confirmPassword = confirmPasswordInput.value;
  if (confirmPassword === password) {
    confirmPasswordInput.style.backgroundColor = '#ffffff';
    confirmPasswordError.style.visibility = 'hidden';
    return true;
  } else {
    confirmPasswordInput.style.backgroundColor = '#f7d9d9';
    confirmPasswordError.style.visibility = 'visible';
    return false;
  }
};

// submitHandler :-

formEle.addEventListener('submit', (e) => {
  if (
    vaildateConfirmPassword() === false ||
    vaildatePassword() === false ||
    vaildateEmail() === false ||
    vaildateName() === false
  ) {
    e.preventDefault();
    document.getElementById('button-error').style.visibility = 'visible';
  } else {
    e.preventDefault();
    document.getElementById('button-error').style.visibility = 'hidden';

    window.localStorage.setItem('email', emailInput.value);
    console.log(window.localStorage);

    const fromData = {
      username: userNameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      password_confirmation: confirmPasswordInput.value,
    };

    fetch(' https://goldblv.com/api/hiring/tasks/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fromData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }
});
