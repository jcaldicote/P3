////test login

function login() {
  const formEl = document.querySelector('#loginForm');
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);
    fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    }).then((res) => console.log(res.json()));
  });
}

login();
