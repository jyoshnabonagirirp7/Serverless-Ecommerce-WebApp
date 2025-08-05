// Replace these
const API_BASE_URL = "https://yfqybf6wgi.execute-api.us-east-2.amazonaws.com/dev";
const USER_POOL_ID = "us-east-2_MgBza9AVJ";
const CLIENT_ID = "63dol8i9tmd7m9fes3saja5hk9";

const poolData = { UserPoolId: USER_POOL_ID, ClientId: CLIENT_ID };
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
let cognitoUser = null;
let idToken = null;
let cart = [];

function showMessage(id, msg, success = false) {
  const el = document.getElementById(id);
  el.style.color = success ? 'green' : 'red';
  el.innerText = msg;
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (!email || !password) return showMessage('loginMessage', 'Enter email & password');

  const auth = new AmazonCognitoIdentity.AuthenticationDetails({ Username: email, Password: password });
  const userData = { Username: email, Pool: userPool };
  cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(auth, {
    onSuccess: result => {
      idToken = result.getIdToken().getJwtToken();
      showMessage('loginMessage', 'Login successful', true);
      document.getElementById("loginSection").style.display = "none";
      document.getElementById("productSection").style.display = "block";
      loadProducts();
    },
    onFailure: err => showMessage('loginMessage', err.message)
  });
}

function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const attrs = [ new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: email }) ];
  userPool.signUp(email, password, attrs, null, (err) => {
    if (err) return showMessage('loginMessage', err.message);
    showMessage('loginMessage', 'Signup successful! Please check email to confirm.', true);
  });
}

function loadProducts() {
  fetch(`${API_BASE_URL}/products`)
    .then(r => r.json())
    .then(products => {
      const list = document.getElementById("productList");
      list.innerHTML = "";
      products.forEach(p => {
        const li = document.createElement("li");
        li.innerHTML = `${p.name} - $${p.price} (Qty: ${p.quantity}) <button>Add</button>`;
        li.querySelector('button').onclick = () => addToCart(p);
        list.appendChild(li);
      });
    });
}

function addToCart(product) {
  if (cart.find(i => i.productId === product.productId)) return alert("Already in cart");
  cart.push(product);
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cartList");
  list.innerHTML = "";
  if (!cart.length) return list.innerHTML = "<li>Cart empty</li>";
  cart.forEach((item, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button>Remove</button>`;
    li.querySelector('button').onclick = () => { cart.splice(i, 1); renderCart(); };
    list.appendChild(li);
  });
}

function placeOrder() {
  if (!idToken) return alert("Login required");
  if (!cart.length) return alert("Cart is empty");

  fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": idToken,
      "Origin": "https://d33t18z7c9d8i1.cloudfront.net" // force it
    },
    //headers: { "Content-Type": "application/json", "Authorization": idToken, },
    body: JSON.stringify({ items: cart })
  })
  .then(r => r.json())
  .then(() => { alert("Order placed!"); cart = []; renderCart(); });
}