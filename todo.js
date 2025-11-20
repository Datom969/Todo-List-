const TodoContainer = document.querySelector(".TodoContainer");
const TodoInput = document.getElementById("TodoInput");
const Todo = [];


TodoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let val = TodoInput.value.trim();
    if (val) {
      Todo.push({ text: val, done: false });
      TodoInput.value = "";
      saveTodos();
      renderTodo();
    }
  }
});

const clearCompltd = document.querySelectorAll(".clearCompleted");
clearCompltd.forEach(clear =>{
  clear.addEventListener("click", () => {
  for (let i = Todo.length - 1; i >= 0; i--) {
  if (Todo[i].done) Todo.splice(i, 1);
}
    renderTodo(Todo);
    saveTodos();
});
});

    const showCompletd = document.querySelectorAll(".showCompleted")
    showCompletd.forEach(show => {
      show.addEventListener("click", ()=>{
        completed= Todo.filter(t => t.done)
        renderTodo(completed)
    })
  });

    const active = document.querySelectorAll(".showActive")
    active.forEach(actv => {
      actv.addEventListener("click", ()=>{
        activeTodo= Todo.filter(t => !t.done)
        renderTodo(activeTodo)
    })
  });

    const showAll = document.querySelectorAll(".showAll")
    showAll.forEach(all => {
      all.addEventListener("click", ()=>{
        renderTodo(Todo)
    })
  });

  const updateClick = document.querySelectorAll(".update")
    updateClick.forEach(upd =>{
      upd.addEventListener("click", ()=>{
         updateClick.forEach(item=> item.classList.remove("text-[var(--color-blue)]"));
         upd.classList.add("text-[var(--color-blue)]");
      })
    })


function renderTodo(list = Todo) {
  TodoContainer.innerHTML = "";

  list.forEach((td, index) => {
    const div = document.createElement("div");
   div.className = "border-b border-Gray";

div.innerHTML = `
  <div class="flex items-center justify-between py-3 px-4 group">

    <!-- Left side: check + text -->
    <div class="flex items-center gap-4">

      <!-- Check circle -->
      <div class="Todocheck rounded-full min-w-5 min-h-5 w-5 h-5 
        border border-(--border-todocheck) cursor-pointer flex items-center justify-center
        ${td.done ? "bg-[linear-gradient(hsl(192,100%,67%),hsl(280,87%,65%))] border-none" : ""}">
        
        <img 
          src="./images/icon-check.svg" 
          alt="checkIcon" 
          class="checker w-3 h-3 ${td.done ? "" : "hidden"}"
        >
      </div>

      <!-- Todo text -->
      <span class="text-sm ${td.done ? "line-through opacity-50" : ""}">
        ${td.text}
      </span>

    </div>

    <!-- Right side: delete icon -->
    <img
      src="./images/icon-cross.svg"
      alt="Delete todo"
      class="cross w-4 h-4 opacity-0 group-hover:opacity-100 transition cursor-pointer"
      data-index="${index}"
    >
  </div>
`;

  
    const check = div.querySelector(".Todocheck");
    const del = div.querySelector(".cross");

    check.addEventListener("click", () => {
      td.done = !td.done;
       saveTodos();
        renderTodo();
    });

    ["mouseenter", "touchstart"].forEach(evt => {
      div.addEventListener(evt, () => {
        del.classList.remove("hidden");
      });
    });

    div.addEventListener("mouseleave", () => {
      del.classList.add("hidden");
    });

    // Delete item
    del.addEventListener("click", () => {
      Todo.splice(index, 1);
      saveTodos()
      renderTodo();
    });

    TodoContainer.appendChild(div);
  });
  const remaining = Todo.filter(t => !t.done).length;
  document.querySelectorAll(".Number").forEach(num =>{
    num.textContent = remaining;
  })

}

const SunImage = "./images/icon-sun.svg";
const MoonImage = "./images/icon-moon.svg";

const themeToggles = document.querySelectorAll(".theme-toggle");

function applyStoredTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
  } 
  else {
    document.documentElement.classList.remove("dark");
    
  }

  updateThemeIcons();
  
}


function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains("dark");

  themeToggles.forEach(toggle => {
    let img = toggle.querySelector("img");
    if (!img) {
      toggle.innerHTML = ''; 
      img = document.createElement("img");
      toggle.appendChild(img);
    }

    img.src = isDark ? SunImage : MoonImage;
    img.alt = isDark ? "sun icon" : "moon icon";
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("todos")) || [];
  Todo.push(...saved)
  renderTodo(Todo);
  


  themeToggles.forEach(toggle => toggle.addEventListener("click", toggleTheme));
  applyStoredTheme();

});

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark"); 

  localStorage.setItem("theme", isDark ? "dark" : "light");


  updateThemeIcons();
}


function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(Todo));
}


