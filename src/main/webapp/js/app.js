// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize components
  initTabs()
  initUserNav()
  initModeToggle()

  // Load content
  loadDashboard()
  loadTodoList()
  loadTimer()
  loadAchievements()
})

// Tab functionality
function initTabs() {
  const tabs = document.querySelectorAll(".tab")

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab")

      // Remove active class from all tabs and content
      document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"))
      document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"))

      // Add active class to clicked tab and corresponding content
      this.classList.add("active")
      document.getElementById(tabId).classList.add("active")
    })
  })
}

// User navigation
function initUserNav() {
  const userAvatar = document.querySelector(".user-avatar")
  const userMenu = document.querySelector(".user-menu")

  // Ensure menu is hidden by default
  if (userMenu) {
    userMenu.classList.add("hidden")
  }

  userAvatar.addEventListener("click", (e) => {
    e.stopPropagation()
    if (userMenu) {
      userMenu.classList.toggle("hidden")
    }
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!userMenu.contains(e.target) && e.target !== userAvatar) {
      userMenu.classList.add("hidden")
    }
  })

  // Add click events to menu items
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.addEventListener("click", function () {
      console.log("Menu item clicked:", this.textContent.trim())
      userMenu.classList.add("hidden")
    })
  })
}

// Dark mode toggle
function initModeToggle() {
  const modeToggle = document.getElementById("modeToggle")

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.add("dark")
  }

  modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark")

    // Save theme preference
    const isDark = document.body.classList.contains("dark")
    localStorage.setItem("theme", isDark ? "dark" : "light")
  })
}

// Dashboard
function loadDashboard() {
  const dashboard = document.getElementById("dashboard")

  dashboard.innerHTML = `
        <div class="dashboard-grid">
            ${createDashboardCard("Misiones Completadas", "24/30", 80, "✓")}
            ${createDashboardCard("Tiempo Enfocado", "5h 23m", 67, "⏱")}
            ${createDashboardCard("Puntos de Experiencia", "1,234 XP", 45, "🎯")}
            ${createDashboardCard("Logros", "7/20", 35, "🏆")}
        </div>
    `
}

function createDashboardCard(title, value, progress, icon) {
  return `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">${title}</h3>
                <span class="card-icon">${icon}</span>
            </div>
            <div class="card-value">${value}</div>
            <div class="progress-bar">
                <div class="progress" style="width: ${progress}%"></div>
            </div>
        </div>
    `
}

// Todo List
function loadTodoList() {
  const todos = document.getElementById("todos")

  todos.innerHTML = `
        <div class="todo-container">
            <div class="todo-input-container">
                <input type="text" class="todo-input" id="newTodo" placeholder="Añadir nueva misión...">
                <button class="add-todo-btn" id="addTodo">
                    <span class="add-icon">+</span>
                    <span class="add-text">Añadir Misión</span>
                </button>
            </div>
            <div class="todo-list-container" id="todoList">
                <div class="empty-state">No hay misiones pendientes. ¡Añade una nueva!</div>
            </div>
        </div>
    `

  // Initialize todo functionality
  initTodoList()
}

function initTodoList() {
  const newTodoInput = document.getElementById("newTodo")
  const addTodoButton = document.getElementById("addTodo")
  const todoListContainer = document.getElementById("todoList")

  // Load todos from localStorage
  let todos = JSON.parse(localStorage.getItem("todos") || "[]")

  // Render initial todos
  renderTodos()

  // Add new todo
  addTodoButton.addEventListener("click", addTodo)
  newTodoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTodo()
    }
  })

  function addTodo() {
    const todoText = newTodoInput.value.trim()

    if (todoText) {
      todos.push({
        id: Date.now(),
        text: todoText,
        completed: false,
      })

      newTodoInput.value = ""
      saveTodos()
      renderTodos()
    }
  }

  function toggleTodo(id) {
    todos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))

    saveTodos()
    renderTodos()
  }

  function renderTodos() {
    if (todos.length === 0) {
      todoListContainer.innerHTML = `<div class="empty-state">No hay misiones pendientes. ¡Añade una nueva!</div>`
      return
    }

    todoListContainer.innerHTML = todos
      .map(
        (todo) => `
            <div class="todo-item" data-id="${todo.id}">
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? "checked" : ""}>
                <span class="todo-text ${todo.completed ? "completed" : ""}">${todo.text}</span>
                <span class="todo-icon">⚔️</span>
            </div>
        `,
      )
      .join("")

    // Add event listeners to checkboxes
    document.querySelectorAll(".todo-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        const todoId = Number.parseInt(this.closest(".todo-item").getAttribute("data-id"))
        toggleTodo(todoId)
      })
    })
  }

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
}

// Timer
function loadTimer() {
  const timer = document.getElementById("timer")

  timer.innerHTML = `
        <div class="timer-container">
            <h2 class="timer-title">Forja del Tiempo</h2>
            <div class="timer-display" id="timerDisplay">25:00</div>
            <div class="timer-controls">
                <button class="timer-btn start-btn" id="startTimer">Iniciar</button>
                <button class="timer-btn reset-btn" id="resetTimer">Reiniciar</button>
            </div>
            <div class="timer-set">
                <label class="timer-label" for="timerMinutes">Establecer Minutos:</label>
                <div class="timer-input-group">
                    <input type="number" class="timer-input" id="timerMinutes" value="25" min="1" max="120">
                    <button class="set-btn" id="setTimer">Establecer</button>
                </div>
            </div>
        </div>
    `

  // Initialize timer functionality
  initTimer()
}

function initTimer() {
  const timerDisplay = document.getElementById("timerDisplay")
  const startButton = document.getElementById("startTimer")
  const resetButton = document.getElementById("resetTimer")
  const setButton = document.getElementById("setTimer")
  const minutesInput = document.getElementById("timerMinutes")

  let time = 25 * 60 // 25 minutes in seconds
  let isActive = false
  let interval

  // Update display initially
  updateDisplay()

  // Start/pause timer
  startButton.addEventListener("click", () => {
    isActive = !isActive

    if (isActive) {
      startButton.textContent = "Pausar"
      startButton.classList.add("pause")

      interval = setInterval(() => {
        if (time > 0) {
          time--
          updateDisplay()
        } else {
          clearInterval(interval)
          isActive = false
          startButton.textContent = "Iniciar"
          startButton.classList.remove("pause")

          // Play sound or notification
          alert("¡Tiempo completado!")
        }
      }, 1000)
    } else {
      clearInterval(interval)
      startButton.textContent = "Iniciar"
      startButton.classList.remove("pause")
    }
  })

  // Reset timer
  resetButton.addEventListener("click", () => {
    clearInterval(interval)
    isActive = false
    time = Number.parseInt(minutesInput.value) * 60 || 25 * 60
    startButton.textContent = "Iniciar"
    startButton.classList.remove("pause")
    updateDisplay()
  })

  // Set timer
  setButton.addEventListener("click", () => {
    clearInterval(interval)
    isActive = false
    time = Number.parseInt(minutesInput.value) * 60 || 25 * 60
    startButton.textContent = "Iniciar"
    startButton.classList.remove("pause")
    updateDisplay()
  })

  // Format and display time
  function updateDisplay() {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }
}

function loadAchievements() {
  const achievements = document.getElementById("achievements")

  const achievementsList = [
    { id: 1, name: "Madrugador", description: "Completa 5 tareas antes de las 9 AM", completed: true },
    {
      id: 2,
      name: "Maestro del Enfoque",
      description: "Usa el temporizador durante 2 horas seguidas",
      completed: false,
    },
    { id: 3, name: "Campeón de Misiones", description: "Completa 50 misiones", completed: true },
    { id: 4, name: "Señor del Tiempo", description: "Acumula 24 horas de tiempo enfocado", completed: false },
    { id: 5, name: "Guardián de la Racha", description: "Mantén una racha de 7 días", completed: true },
  ]

  achievements.innerHTML = `
        <div class="achievements-container">
            <h2 class="achievements-title">Logros</h2>
            <div class="achievements-list">
                ${achievementsList
                  .map(
                    (achievement) => `
                    <div class="achievement-item">
                        <div class="achievement-icon ${achievement.completed ? "completed" : ""}">🏆</div>
                        <div class="achievement-info">
                            <h3 class="achievement-name">${achievement.name}</h3>
                            <p class="achievement-desc">${achievement.description}</p>
                        </div>
                        <span class="achievement-badge ${achievement.completed ? "completed" : ""}">
                            ${achievement.completed ? "Completado" : "En Progreso"}
                        </span>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </div>
    `
}

