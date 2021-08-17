const process = require('process')
const fs = require('fs')
const prompts = require('prompts')

const action = process.argv[2]
const fileName = process.argv[3]
const readline = require('readline');
const { Stream } = require('stream')

if (action === "--createFile") {
    fs.writeFile(`${fileName}`, "", (err) => {
        if (err) throw err;
        console.log(`file created`)
    })
}

if (action === "--writeFile") {
    const text = []
    for (i = 3; i < process.argv.length; i++) {
        text.push(process.argv[i])
    }

    fs.writeFile(`${fileName}`, text.join(' '), (err) => {
        if (err) throw err;
        console.log(`file wrote`)
    })
}


if (action === "--appendFile") {
    const text = []
    for (i = 3; i < process.argv.length; i++) {
        text.push(process.argv[i])
    }

    fs.appendFile(`${fileName}`, " " + text.join(' '), (err) => {
        if (err) throw err;
        console.log(`file appended`)
    })
}

if (action === "--renameFile") {

    fs.rename(`${fileName}`, `${process.argv[4]}.txt`, (err) => {
        if (err) throw err;
        console.log(`file renamed`)
    })
}

if (action === "--deleteFile") {

    (async () => {
        const response = await prompts({
            type: 'confirm',
            name: 'boolean',
            message: `Are you sure delete "${process.argv[3]}"`,
            // validate: answer => answer === "Y" ? true : null
            initial: false
        });

        console.log(response);

        if (response.boolean === true) {
            fs.unlink(`${fileName}`, (err) => {
                if (err) throw err;
                console.log(`file deleted`)
            })
        } else {
            return
        }
    })();
}

if (action === "--listFiles") {

    fs.readdir(`files`, (err, files) => {
        if (err) throw err;
        console.log(`Files list:`)
        files.forEach((file) => {
            console.log(file)
        })
    })
}

if (action === "--copyfile") {
    fs.link(`${process.argv[3]}`, `${process.argv[4]}`, (err) => {
        if (err) throw err;
        console.log(`file copied`)
    })
}

if (action === "--movefile") {

    fs.link(`${process.argv[3]}`, `${process.argv[4]}`, (err) => {
        if (err) throw err;

        fs.unlink(`${process.argv[3]}`, (err) => {
            if (err) throw err;
        })
        console.log(`file moved`)
    })
}

if (action === "--size") {

    fs.stat(`${fileName}`, (err, data) => {

        if (err) throw err;

        console.log(`${data.size} bit`)
        console.log(data)
    })
}

// if (action === "--view") {

//     fs.readFile(`${fileName}`, (err, data) => {

//         if (err) throw err;

//         const body = []
//         body.push(data)
//         const parsedBody = Buffer.concat(body).toString()
//         console.log(parsedBody)
//     })

// }

if (action === "--view") {
    const rl = readline.createInterface({
        input: fs.createReadStream('files/that.txt'),
        output: process.stdout,
        terminal: false
    });

    const line_counter = ((i = 0) => () => ++i)()
    let count = 1

    rl.on('line', (line, lineno = count++) => {
        console.log(lineno);
        console.log(line)
    });

    if (count === 22) {
        rl.on('pause', (line, lineno = count++) => {
            console.log(lineno);
        });
    }
}


