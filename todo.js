const TodoContainer = document.querySelector(".TodoContainer");
const TodoInput = document.getElementById("TodoInput");
const Todo = [];

TodoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let val = TodoInput.value.trim();
    if (val) {
      Todo.push({ text: val, done: false });
      TodoInput.value = "";
      renderTodo();
    }
  }
});


const clearCompltd = document.getElementById("clearCompleted");
clearCompltd.addEventListener("click", () => {
  const removeComplted = Todo.filter(t => !t.done); 
  renderTodo(removeComplted);
});


    const showCompletd = document.getElementById("showCompleted")
    showCompletd.addEventListener("click", ()=>{
      const completd = Todo.filter(t => t.done)
      renderTodo(completd)
    })

    const active = document.getElementById("showActive")
    active.addEventListener("click", ()=>{
      const activeTodo = Todo.filter(t => !t.done)
      renderTodo(activeTodo)
    })

    const all = document.getElementById("showAll")
    all.addEventListener("click", ()=>{
      renderTodo(Todo)
    })

    
function renderTodo(list = Todo) {
  TodoContainer.innerHTML = "";

  list.forEach((td, index) => {
    const div = document.createElement("div");
    div.className = "border-b border-Gray relative py-3";

    div.innerHTML = `
      <div class="flex items-center justify-between relative">
        <div class="Todocheck rounded-full w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 border border-Gray dark:border-DPurple cursor-pointer
          ${td.done ? "bg-[linear-gradient(hsl(192,100%,67%),hsl(280,87%,65%))]" : ""}">
          <img src="./images/icon-check.svg" alt="checkIcon" class="checker ${td.done ? '' : 'hidden'} absolute left-1 top-1/2 -translate-y-1/2">
        </div>

        <span class="ml-12 text-DNavy dark:text-LGray self-center ${td.done ? "line-through" : ""}">
          ${td.text}
        </span>

        <img
          src="./images/icon-cross.svg"
          alt="close-icon"
          class="cross w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hidden"
          data-index="${index}"
        >
      </div>
    `;

  
    const check = div.querySelector(".Todocheck");
    const del = div.querySelector(".cross");

    check.addEventListener("click", () => {
      td.done = !td.done;
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
      renderTodo();
    });

    TodoContainer.appendChild(div);
  });
  const remaining = Todo.filter(t => !t.done).length;
  document.getElementById("Number").textContent = remaining;
}


TodoContainer.addEventListener("click", (e) => {
  const check = e.target.closest(".Todocheck");
  if (!check) return; 

  const checker = check.querySelector(".checker");
  const text = check.nextElementSibling;

  const isChecked = !checker.classList.contains("hidden");
  checker.classList.toggle("hidden");
  check.style.background = isChecked ? "" : "var(--color-dynamic)";
  text.style.textDecoration = isChecked ? "none" : "line-through";
  text.style.color = isChecked ? "inherit" : "var(--color-Gray)";
  localStorage.getItem("Todo")
});


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
  themeToggles.forEach(toggle => toggle.addEventListener("click", toggleTheme));
  applyStoredTheme();
});

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark"); 
//  console.log("theme toggled:", isDark? "dark": "light");

  localStorage.setItem("theme", isDark ? "dark" : "light");

  // Update icons
  updateThemeIcons();
}


  