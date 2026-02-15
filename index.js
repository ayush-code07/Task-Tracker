const fs = require('fs')
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

rl.question('Welcome to Task Tracker!\nCreate your first task now!\n', (answer) => {

    let tasks = []

    if(fs.existsSync("temp.json")){
        const data = fs.readFileSync("temp.json", "utf-8")
        tasks = JSON.parse(data)
    }

    const newId = tasks.length+1

    const parts = answer.split(" ");
    let newTasks = {
        id : newId,
        description : parts.slice(1).join(" ").replace(/^"|"$/g, ""),
        status : "todo",
        createdAt : new Date().toString(),
        updatedAt : new Date().toString()
    }

    tasks.push(newTasks)

    fs.writeFile("temp.json", JSON.stringify(tasks, null, 2), function (err) {
        if (err) console.error(err)
        else console.log(`Task added successfully (ID: ${newId})`)
    })

    rl.close();
});
