// Import required modules
const fs = require('fs')
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const { notDeepEqual } = require('node:assert');
const { stat } = require('node:fs');

// Create readline interface for CLI input/output
const rl = readline.createInterface({ input, output });

// Prompt user for command
rl.question('Welcome to Task Tracker!\nEnter a command:\n', (answer) => {

    // === 1. Load existing tasks from file ===
    let tasks = []

    if (fs.existsSync("temp.json")) {
        const data = fs.readFileSync("temp.json", "utf-8")
        tasks = JSON.parse(data)
    }

    // === 2. Generate new ID safely ===
    const newId = (tasks.length) ? tasks[tasks.length - 1].id + 1 : 1

    // Split input into words
    const parts = answer.split(" ");
    let toPerform = parts[0]

    // === ADD TASK ===
    if (toPerform === "add") {

        let newTasks = {
            id: newId,
            description: parts.slice(1).join(" ").replace(/^"|"$/g, ""),
            status: "todo",
            createdAt: new Date().toString(),
            updatedAt: new Date().toString()
        }

        tasks.push(newTasks)

        fs.writeFile("temp.json", JSON.stringify(tasks, null, 2), function (err) {
            if (err) console.error(err)
            else console.log(`Task added successfully (ID: ${newId})`)
        })
    }

    // === UPDATE TASK DESCRIPTION ===
    else if (toPerform === "update") {
        const taskId = parseInt(parts[1])
        const task = tasks.find(t => t.id === taskId)

        if(!task) return notFound(taskId)

        task.description = parts.slice(2).join(" ").replace(/^"|"$/g, "")
        task.updatedAt = new Date().toString()

        fs.writeFile("temp.json", JSON.stringify(tasks, null, 2), function (err) {
            if (err) console.error(err)
            else console.log(`Task Updated successfully (ID: ${task2.id})`)
        })
    }

    // === DELETE TASK ===
    else if (toPerform === "delete") {

        const taskId = parseInt(parts[1])
        const exists = tasks.some(t => t.id === taskId)

        if(!exists) return notFound(taskId)

        tasks = tasks.filter(t => t.id !== taskId)

        fs.writeFile("temp.json", JSON.stringify(tasks, null, 2), function (err) {
            if (err) console.error(err)
            else console.log(`Task Deleted successfully (ID: ${parseInt(parts[1])})`)
        })
    }

    // === MARK IN PROGRESS ===
    else if (toPerform === "mark-in-progress") {

        const taskId = parseInt(parts[1])
        const task = tasks.find(t => t.id === taskId)

        if(!task) return notFound(taskId)

        task.status = "in-progress"
        task.updatedAt = new Date().toString()

        fs.writeFile("temp.json", JSON.stringify(tasks, null, 2), function (err) {
            if (err) console.error(err)
            else console.log(`Task marked as in-progress (ID: ${task2.id})`)
        })
    }

    // === MARK DONE ===
    else if (toPerform === "mark-done") {
        
        const taskId = parseInt(parts[1])
        const task = tasks.find(t => t.id === taskId)

        if(!task) return notFound(taskId)

        task.status = "done"
        task.updatedAt = new Date().toString()

        fs.writeFile("temp.json", JSON.stringify(tasks, null, 2), function (err) {
            if (err) console.error(err)
            else console.log(`Task marked as done (ID: ${task2.id})`)
        })
    }

    // === LIST TASKS ===
    else if (toPerform === "list") {

        const statusFilter = parts[1]

        if(tasks.length === 0){
            console.log("No tasks found.")
        }
        else{
            tasks.forEach(task => {
                if(!statusFilter || task.status === statusFilter){
                    console.log(`${task.id}: ${task.description} [${task.status}]`);
                }
            })
        }
    }

    // === INVALID COMMAND ===
    else console.log("Invalid command.")

    rl.close();
});

// =====================================
// Helper Functions
// =====================================

// Handle "task not found" case
function notFound(id){
    console.log(`Task with ID ${id} not found.`);
    rl.close()
}
