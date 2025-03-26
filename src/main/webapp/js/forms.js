document.addEventListener("DOMContentLoaded", () => {
  // Inicializar tema oscuro si está guardado
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.add("dark")
  }

  // Agregar botón de cambio de tema en la página de formularios
  const formContainer = document.querySelector(".form-container")
  if (formContainer) {
    const modeToggle = document.createElement("button")
    modeToggle.id = "modeToggle"
    modeToggle.className = "mode-toggle form-mode-toggle"
    modeToggle.setAttribute("aria-label", "Cambiar tema")
    modeToggle.innerHTML = '<span class="sun-icon">☀️</span><span class="moon-icon">🌙</span>'
    formContainer.appendChild(modeToggle)

    // Evento para cambiar tema
    modeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark")
      const isDark = document.body.classList.contains("dark")
      localStorage.setItem("theme", isDark ? "dark" : "light")
    })
  }

  // Formulario de registro
  //   const registroForm = document.getElementById("registroForm")
  //   if (registroForm) {
  //     const passwordInput = document.getElementById("password")
  //     const confirmPasswordInput = document.getElementById("confirmPassword")
  //     const passwordStrength = document.getElementById("passwordStrength")

  //     // Validar fuerza de contraseña
  //     passwordInput.addEventListener("input", function () {
  //       const password = this.value
  //       let strength = 0

  //       if (password.length >= 8) strength += 1
  //       if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 1
  //       if (/[0-9]/.test(password)) strength += 1
  //       if (/[^A-Za-z0-9]/.test(password)) strength += 1

  //       passwordStrength.className = "password-strength"

  //       if (password.length === 0) {
  //         passwordStrength.className = "password-strength"
  //       } else if (strength < 2) {
  //         passwordStrength.className = "password-strength weak"
  //       } else if (strength < 4) {
  //         passwordStrength.className = "password-strength medium"
  //       } else {
  //         passwordStrength.className = "password-strength strong"
  //       }
  //     })

  //     // Validar formulario de registro
  //     registroForm.addEventListener("submit", (e) => {
  //       e.preventDefault()

  //       let isValid = true

  //       // Validar que las contraseñas coincidan
  //       if (passwordInput.value !== confirmPasswordInput.value) {
  //         showError(confirmPasswordInput, "Las contraseñas no coinciden")
  //         isValid = false
  //       } else {
  //         removeError(confirmPasswordInput)
  //       }

  //       // Validar nombre de usuario (solo letras, números y guiones)
  //       const usuarioInput = document.getElementById("usuario")
  //       if (!/^[a-zA-Z0-9_-]+$/.test(usuarioInput.value)) {
  //         showError(usuarioInput, "El nombre de usuario solo puede contener letras, números, guiones y guiones bajos")
  //         isValid = false
  //       } else {
  //         removeError(usuarioInput)
  //       }

  //       // Validar correo electrónico
  //       const emailInput = document.getElementById("email")
  //       if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
  //         showError(emailInput, "Ingresa un correo electrónico válido")
  //         isValid = false
  //       } else {
  //         removeError(emailInput)
  //       }

  //       if (isValid) {
  //         // Simulación de envío exitoso
  //         const request = new Request("http://localhost:8080/testeo/registro-post", {
  //           method: "POST",
  //           body: `{"name": ${usuarioInput}, "email": ${emailInput}, "password": ${passwordInput}}`
  //         } )
  //       }
  //     })
  //   }

  //   // Formulario de inicio de sesión
  //   const loginForm = document.getElementById("loginForm")
  //   if (loginForm) {
  //     loginForm.addEventListener("submit", (e) => {
  //       e.preventDefault()

  //       // Simulación de inicio de sesión exitoso
  //       alert("¡Inicio de sesión exitoso! Redirigiendo al panel...")
  //       window.location.href = "index.html"
  //     })
  //   }

  //   // Funciones de utilidad para mostrar/ocultar errores
  //   function showError(input, message) {
  //     input.classList.add("error")

  //     // Eliminar mensaje de error anterior si existe
  //     const existingError = input.parentNode.querySelector(".error-message")
  //     if (existingError) {
  //       existingError.remove()
  //     }

  //     // Crear y agregar nuevo mensaje de error
  //     const errorElement = document.createElement("div")
  //     errorElement.className = "error-message"
  //     errorElement.textContent = message
  //     input.parentNode.appendChild(errorElement)
  //   }

  //   function removeError(input) {
  //     input.classList.remove("error")
  //     const errorElement = input.parentNode.querySelector(".error-message")
  //     if (errorElement) {
  //       errorElement.remove()
  //     }
  //   }
  // })


  // Agregar estilos adicionales para el botón de cambio de tema en formularios
  document.head.insertAdjacentHTML(
    "beforeend",
    `
    <style>
        .form-mode-toggle {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: 1px solid #e2e8f0;
            border-radius: 50%;
            width: 2.5rem;
            height: 2.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .form-mode-toggle:hover {
            background-color: #f1f5f9;
        }
        
        body.dark .form-mode-toggle {
            border-color: #4a5568;
        }
        
        body.dark .form-mode-toggle:hover {
            background-color: #4a5568;
        }
        
        .form-container {
            position: relative;
        }
    </style>
`,
  )
})

