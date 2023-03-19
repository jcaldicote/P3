////test login

function validate() {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  if (email === 'josephc@gmail.com' && password === 'azerty') {
    alert('Authentification ok');
    return false;
  } else {
    alert('Login / Password incorrect');
  }
}

validate();
