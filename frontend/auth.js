// LOGIN FUNCTION
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please enter username and password");
    return;
  }

  // Save user session
  localStorage.setItem("user", username);

  alert("Login successful ✅");

  // Redirect
  window.location.href = "index.html";
}

// CHECK LOGIN (Protect index page)
function checkAuth() {
  const user = localStorage.getItem("user");

  // Only protect index page
  if (window.location.pathname.includes("index.html") && !user) {
    window.location.href = "login.html";
  }

  // If already logged in, skip login page
  if (window.location.pathname.includes("login.html") && user) {
    window.location.href = "index.html";
  }
}

// LOGOUT FUNCTION
function logout() {
  localStorage.removeItem("user");

  alert("Logged out successfully 👋");

  window.location.href = "login.html";
}

// Run auth check on page load
checkAuth();