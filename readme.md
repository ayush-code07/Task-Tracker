# Task Tracker CLI

A simple Command Line Interface (CLI) application to manage your daily tasks directly from the terminal. You can add, update, delete, and track the status of tasks without any GUI.

---

## ✨ Features

* ➕ Add new tasks
* 📋 List all tasks
* ✏️ Update existing tasks
* ❌ Delete tasks
* ✅ Mark tasks as done
* ⏳ Mark tasks as in‑progress
* 💾 Persistent storage using a JSON file

---

## 📦 Requirements

* Node.js (v14 or higher recommended)
* npm (comes with Node.js)

Check installation:

```bash
node -v
npm -v
```

---

## 🚀 Installation

1. Clone the repository:

```bash
git clone https://github.com/ayush-code07/Task-Tracker.git
```

2. Navigate into the project folder:

```bash
cd Task-Tracker
```

3. Install dependencies (if any):

```bash
npm install
```

---

## ▶️ Usage

Run the CLI using Node:

```bash
node index.js <command> [arguments]
```

---

## 🧩 Available Commands

### ➕ Add a Task

```bash
node index.js add "Buy groceries"
```

Creates a new task with status `todo`.

---

### 📋 List Tasks

List all tasks:

```bash
node index.js list
```

List tasks by status:

```bash
node index.js list done
node index.js list todo
node index.js list in-progress
```

---

### ✏️ Update a Task

```bash
node index.js update <id> "New description"
```

Example:

```bash
node index.js update 2 "Buy groceries and fruits"
```

---

### ❌ Delete a Task

```bash
node index.js delete <id>
```

Example:

```bash
node index.js delete 3
```

---

### ⏳ Mark Task as In‑Progress

```bash
node index.js mark-in-progress <id>
```

---

### ✅ Mark Task as Done

```bash
node index.js mark-done <id>
```

---

## 💾 Data Storage

All tasks are stored locally in a JSON file (e.g., `temp.json`).

Each task contains:

* `id` — Unique identifier
* `description` — Task details
* `status` — todo | in-progress | done
* `createdAt` — Creation timestamp
* `updatedAt` — Last updated timestamp

Example structure:

```json
{
  "id": 1,
  "description": "Buy groceries",
  "status": "todo",
  "createdAt": "2026-03-01T10:00:00.000Z",
  "updatedAt": "2026-03-01T10:00:00.000Z"
}
```

---

## 🛠️ Error Handling

* Displays a message if a task ID is not found
* Prevents invalid operations
* Handles file read/write errors

---

## 📌 Tips

* Always provide the task ID for update/delete/status commands
* Use quotes for descriptions containing spaces

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

Ayush Jagnani

---

⭐ If you found this project helpful, consider giving it a star!

Project idea taken from:
https://roadmap.sh/projects/task-tracker