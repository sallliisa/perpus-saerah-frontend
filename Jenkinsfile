node {
    // Specify the Node.js version
    checkout scm
    nodejs("nodejs-16.20.0") {
        sshagent (credentials: ['CID-SERVER-DEV']) {
            sh 'mkdir -p ~/.ssh'
            sh 'ssh-keyscan -H "192.168.10.100" > ~/.ssh/known_hosts'
            sh 'npm install'
            // sh 'cp ./src/mode-stagging.js ./src/mode.js'
            sh 'npm run build'
            sh 'ls'
            sh "rsync -rav --delete ./dist/ cid@192.168.10.100:/home/tulen/web-mitra/ "
        }
    }
}
