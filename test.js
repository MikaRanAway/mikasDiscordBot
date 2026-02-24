const { PythonShell } = require("python-shell");

let options = {
    scriptPath:"C:/Users/mufft/SEMREPOS/mikasBot/webScraper",
    pythonOptions: ["-u"]
}

const webScript = new PythonShell("scrape.py", options);

webScript.on("message", (message) => {
    console.log(message);
});

webScript.on("stderr", (stderr) => {
    console.log(stderr);
});