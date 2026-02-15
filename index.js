const fs = require('fs')
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

rl.question('Welcome to Task Tracker!\nCreate your first task now!\n', (answer) => {

    let tasks = []

    if (fs.existsSync("temp.json")) {
        const data = fs.readFileSync("temp.json", "utf-8")
        tasks = JSON.parse(data)
    }

    const newId = (tasks.length) ? tasks[tasks.length - 1].id + 1 : 1

    const parts = answer.split(" ");
    let toPerform = parts[0]
    if (toPerform === "add") {
        toPerform = "todo"

        let newTasks = {
            id: newId,
            description: parts.slice(1).join(" ").replace(/^"|"$/g, ""),
            status: toPerform,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString()
        }

        tasks.push(newTasks)

        fs.writeFile("temp.json", JSON.stringify(tasks, null, 2), function (err) {
            if (err) console.error(err)
            else console.log(`Task added successfully (ID: ${newId})`)
        })
    }
    else if (toPerform === "update") {
        const task2 = tasks.find(t => t.id === parseInt(parts[1]))

        task2.description = parts.slice(2).join(" ").replace(/^"|"$/g, "")
        task2.updatedAt = new Date().toString()

        fs.writeFile("temp.json", JSON.stringify(tasks, null, 2), function (err) {
            if (err) console.error(err)
            else console.log(`Task Updated successfully (ID: ${task2.id})`)
        })
    }
    else if (toPerform === "delete") {
        tasks = tasks.filter(task => task.id !== parseInt(parts[1]))

        fs.writeFile("temp.json", JSON.stringify(tasks, null, 2), function (err) {
            if (err) console.error(err)
            else console.log(`Task Updated successfully (ID: ${parseInt(parts[1])})`)
        })
    }
    else if (toPerform === "mark-in-progress") {
        const task2 = tasks.find(t => t.id === parseInt(parts[1]))
        if (!task2) {
            console.log(`Task with ID ${parts[1]} not found!`);
        }

        task2.status = "in-progress"
        task2.updatedAt = new Date().toString()

        fs.writeFile("temp.json", JSON.stringify(tasks, null, 2), function (err) {
            if (err) console.error(err)
            else console.log(`Task Updated successfully (ID: ${task2.id})`)
        })
    }
    else if (toPerform === "mark-done") {
        const task2 = tasks.find(t => t.id === parseInt(parts[1]))
        if (!task2) {
            console.log(`Task with ID ${parts[1]} not found!`);
        }

        task2.status = "done"
        task2.updatedAt = new Date().toString()

        fs.writeFile("temp.json", JSON.stringify(tasks, null, 2), function (err) {
            if (err) console.error(err)
            else console.log(`Task Updated successfully (ID: ${task2.id})`)
        })
    }
    else if (parts.length === 1 && toPerform === "list") {
        for (let i = 0; i < tasks.length; i++) {
            console.log(tasks[i])
        }
    }
    else if (toPerform === "list") {
        let stat = parts[1]
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].status === stat) console.log(tasks[i])
        }
    }
    else console.log("Write Properly!!")

    rl.close();
});
