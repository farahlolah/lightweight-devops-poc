pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/farahlolah/lightweight-devops-poc.git'
            }
        }
        stage('Build') {
            steps {
                bat 'npm install'
                powershell 'podman run -d -p 3002:3001 localhost/poc-app:latest'
            }
        }
        stage('Test') {
            steps {
                bat 'podman run --rm -d -p 3002:3001 poc-app:latest'
                bat 'timeout /t 5'
                bat 'curl -f http://localhost:3002'
                bat 'curl -f http://localhost:3002/metrics'
                bat 'podman stop $(podman ps -q)'
            }
        }
    }
}
