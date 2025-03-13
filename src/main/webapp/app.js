// App initialization
document.addEventListener("DOMContentLoaded", () => {
    initTabs()
    initUserNav()
    initModeToggle()
    loadDashboard()
    loadTodoList()
    loadTimer()
    loadAchievements()
})

// Tabs functionality
function initTabs() {
    const tabs = document.querySelectorAll(".tab")
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const tabId = tab.getAttribute("data-tab")
            activateTab(tabId)
        })
    })
}

function activateTab(tabId) {
    const tabs = document.querySelectorAll(".tab")
    const tabContents = document.querySelectorAll(".tab-content")

    tabs.forEach((tab) => tab.classList.remove("active"))
    tabContents.forEach((content) => content.classList.remove("active"))

    document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add("active")
    document.getElementById(tabId).classList.add("active")
}

// User navigation
function initUserNav() {
    const userNav = document.getElementById("userNav")
    const userMenu = userNav.querySelector(".user-menu")

    userNav.addEventListener("click", () => {
        userMenu.classList.toggle("hidden")
    })

    // Populate user menu
    userMenu.innerHTML = `
        <div class="user-info">
            <p class="username">usuario</p>
            <p class="user-level">Nivel 5 Maestro de Productividad</p>
        </div>
        <hr>
        <button class="menu-item"><span class="icon">👤</span> Perfil</button>
        <button class="menu-item"><span class="icon">👑</span> Actualizar a Pro</button>
        <button class="menu-item"><span class="icon">⚙️</span> Configuración</button>
        <hr>
        <button class="menu-item"><span class="icon">🚪</span> Cerrar sesión</button>
    `
}

// Mode toggle
function initModeToggle() {
    const modeToggle = document.getElementById("modeToggle")
    const sunIcon = modeToggle.querySelector(".sun-icon")
    const moonIcon = modeToggle.querySelector(".moon-icon")

    modeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark")
        sunIcon.style.display = document.body.classList.contains("dark") ? "none" : "inline"
        moonIcon.style.display = document.body.classList.contains("dark") ? "inline" : "none"
    })
}

// Dashboard
function loadDashboard() {
    const dashboard = document.getElementById("dashboard")
    dashboard.innerHTML = `
        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            ${createCard("Misiones Completadas", "24/30", 80)}
            ${createCard("Tiempo Enfocado", "5h 23m", 67)}
            ${createCard("Puntos de Experiencia", "1,234 XP", 45)}
            ${createCard("Logros", "7/20", 35)}
        </div>
    `
}

function createCard(title, value, progress) {
    return `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">${title}</h3>
            </div>
            <div class="card-content">
                <div class="card-value">${value}</div>
                <div class="progress-bar">
                    <div class="progress" style="width: ${progress}%"></div>
                </div>
            </div>
        </div>
    `
}

// Todo List
function loadTodoList() {
    const todoList = document.getElementById("todos")
    todoList.innerHTML = `
        <div class="todo-container">
            <div class="todo-input">
                <input type="text" id="newTodo" placeholder="Añadir nueva misión...">
                <button id="addTodo">Añadir Misión</button>
            </div>
            <div class="todo-list" id="todoList"></div>
        </div>
    `

    const newTodoInput = document.getElementById("newTodo")
    const addTodoButton = document.getElementById("addTodo")
    const todoListElement = document.getElementById("todoList")

    let todos = []

    addTodoButton.addEventListener("click", () => addTodo())
    newTodoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTodo()
    })

    function addTodo() {
        const todoText = newTodoInput.value.trim()
        if (todoText) {
            todos.push({ id: Date.now(), text: todoText, completed: false })
            newTodoInput.value = ""
            renderTodos()
        }
    }

    function renderTodos() {
        todoListElement.innerHTML = todos
            .map(
                (todo) => `
            <div class="todo-item">
                <input type="checkbox" ${todo.completed ? "checked" : ""} onchange="toggleTodo(${todo.id})">
                <span class="${todo.completed ? "completed" : ""}">${todo.text}</span>
            </div>
        `,
            )
            .join("")
    }

    window.toggleTodo = (id) => {
        todos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
        renderTodos()
    }
}

// Timer
function loadTimer() {
    const timer = document.getElementById("timer")
    timer.innerHTML = `
        <div class="timer-container">
            <div class="timer-display">25:00</div>
            <div class="timer-controls">
                <button id="startTimer">Iniciar</button>
                <button id="resetTimer">Reiniciar</button>
            </div>
            <div class="timer-set">
                <label for="timerMinutes">Establecer Minutos:</label>
                <input type="number" id="timerMinutes" value="25" min="1">
                <button id="setTimer">Establecer</button>
            </div>
        </div>
    `

    let time = 25 * 60
    let isActive = false
    let interval

    const timerDisplay = timer.querySelector(".timer-display")
    const startButton = document.getElementById("startTimer")
    const resetButton = document.getElementById("resetTimer")
    const setButton = document.getElementById("setTimer")
    const minutesInput = document.getElementById("timerMinutes")

    startButton.addEventListener("click", toggleTimer)
    resetButton.addEventListener("click", resetTimer)
    setButton.addEventListener("click", setTimer)

    function toggleTimer() {
        isActive = !isActive
        startButton.textContent = isActive ? "Pausar" : "Iniciar"
        if (isActive) {
            interval = setInterval(updateTimer, 1000)
        } else {
            clearInterval(interval)
        }
    }

    function updateTimer() {
        if (time > 0) {
            time--
            updateDisplay()
        } else {
            isActive = false
            startButton.textContent = "Iniciar"
            clearInterval(interval)
        }
    }

    function resetTimer() {
        isActive = false
        clearInterval(interval)
        time = Number.parseInt(minutesInput.value) * 60 || 25 * 60
        startButton.textContent = "Iniciar"
        updateDisplay()
    }

    function setTimer() {
        resetTimer()
    }

    function updateDisplay() {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
}

// Achievements
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
            <h2>Logros</h2>
            <div class="achievements-list">
                ${achievementsList
            .map(
                (achievement) => `
                    <div class="achievement-item">
                        <div class="achievement-icon ${achievement.completed ? "completed" : ""}">🏆</div>
                        <div class="achievement-info">
                            <h3>${achievement.name}</h3>
                            <p>${achievement.description}</p>
                        </div>
                        <div class="achievement-status ${achievement.completed ? "completed" : ""}">
                            ${achievement.completed ? "Completado" : "En Progreso"}
                        </div>
                    </div>
                `,
            )
            .join("")}
            </div>
        </div>
    `
}

