<%@page contentType="text/html; charset=UTF-8"%>
<!doctype html>
<html lang="es" xml:lang="es">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>Multitasking</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div id="app" class="min-h-screen flex flex-col">
      <header
        class="flex items-center justify-between px-4 sm:px-6 py-4 border-b"
      >
        <h1 class="text-2xl font-bold">Multitasking</h1>
        <div class="flex items-center space-x-4">
          <button id="modeToggle" class="mode-toggle">
            <span class="sun-icon"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-sun"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" /></svg></span>
            <span class="moon-icon"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-moon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" /></svg></span>
          </button>
          <div id="userNav" class="relative">
            <button class="user-avatar">US</button>
            <div class="user-menu hidden">
              <!-- User menu content will be populated by JavaScript -->
            </div>
          </div>
        </div>
      </header>
      <main class="flex-1 overflow-auto p-6">
        <div class="tabs">
          <div class="tab-list grid w-full grid-cols-2 sm:grid-cols-4 mb-6">
            <button class="tab active" data-tab="dashboard">Panel</button>
            <button class="tab" data-tab="todos">Misiones</button>
            <button class="tab" data-tab="timer">Forja del Tiempo</button>
            <button class="tab" data-tab="achievements">Logros</button>
          </div>
          <div id="dashboard" class="tab-content active"></div>
          <div id="todos" class="tab-content">
          </div>
          <div id="timer" class="tab-content"></div>
          <div id="achievements" class="tab-content"></div>
        </div>
      </main>
    </div>
    <script src="app.js"></script>
  </body>
</html>
