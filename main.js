const backendURL = "https://hosting-backend-univalle.onrender.com"; // Cambialo si tu backend está en otra URL

async function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    errorMsg.textContent = "";

    if (!username || !password) {
        errorMsg.textContent = "Por favor completa todos los campos.";
        return;
    }

    try {
        const res = await fetch(`${backendURL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
            errorMsg.textContent = "Credenciales incorrectas.";
            return;
        }

        const data = await res.json();
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
    } catch (err) {
        errorMsg.textContent = "Error de conexión. Intenta más tarde.";
    }
}

// Sólo si estamos en login.html
if (document.getElementById("loginBtn")) {
    document.getElementById("loginBtn").addEventListener("click", login);

    // También login con Enter
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            login();
        }
    });
}
