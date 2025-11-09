let tasks = [];

const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const footer = document.getElementById("footerMessage");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const celebrate = document.getElementById("celebrateBox");
const celebrateMsg = document.getElementById("celebrateMsg");

document.getElementById("todayDate").innerText =
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = input.value.trim();
  if (!text) return;

  tasks.push({
    id: Date.now(),
    text,
    completed: false,
  });

  input.value = "";
  render();
}

function toggleTask(id) {
  tasks = tasks.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  render();
}

function render() {
  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = `<div class="text-center py-12 text-gray-400 text-lg">
      No tasks yet! Add one to get started 🚀
    </div>`;
  }

  tasks.forEach((task) => {
    list.innerHTML += `
      <div class="flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
        task.completed
          ? "bg-gray-50 border-green-200"
          : "bg-white border-gray-200 hover:border-purple-300"
      }">
        <button onclick="toggleTask(${task.id})" class="hover:scale-110 transition-transform">
          ${
            task.completed
              ? `<i data-lucide="check-circle-2" class="w-7 h-7 text-green-500"></i>`
              : `<i data-lucide="circle" class="w-7 h-7 text-gray-400 hover:text-purple-500"></i>`
          }
        </button>

        <span class="flex-1 text-lg ${
          task.completed ? "line-through text-gray-400" : "text-gray-800"
        }">${task.text}</span>

        <button onclick="deleteTask(${task.id})"
          class="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all">
          <i data-lucide="trash-2" class="w-5 h-5"></i>
        </button>
      </div>
    `;
  });

  lucide.createIcons();

  updateStats();
}

function updateStats() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;

  progressText.innerText = `${done}/${total}`;
  progressBar.style.width = total > 0 ? `${(done / total) * 100}%` : "0%";

  if (total === 0) {
    footer.innerText = "Let's get started! 💪";
    celebrate.classList.add("hidden");
    return;
  }

  if (done === total) {
    footer.innerText = "Perfect! All done! 🌟";
    celebrateMsg.innerText = `You finished ${total} task(s) today!`;
    celebrate.classList.remove("hidden");
    setTimeout(() => celebrate.classList.add("hidden"), 3000);
  } else {
    footer.innerText = `Keep going! ${total - done} task(s) remaining 🎯`;
    celebrate.classList.add("hidden");
  }
}
