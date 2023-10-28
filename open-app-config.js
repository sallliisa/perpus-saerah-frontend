const username = 'arin'
const projectID = 'hka-trom.pttas.xyz'
const appConfigsPath = `storage/app/app-configs`

const exec = require('child_process').exec
exec(`code --folder-uri=vscode-remote://ssh-remote+${username}@pttas.xyz/home`, (err, stdout, stderr) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(stdout)
})
