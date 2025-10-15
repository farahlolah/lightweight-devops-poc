pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/farahlolah/lightweight-devops-poc.git'
            }
        }
        stage('Build') {
            steps {
                bat 'npm install'
                bat 'podman build -t poc-app:latest .'
            }
        }
        stage('Test') {
            steps {
                bat 'podman run --rm -d -p 3001:3001 poc-app:latest'
                bat 'timeout /t 5'
                bat 'curl -f http://localhost:3001'
                bat 'curl -f http://localhost:3001/metrics'
                bat 'podman stop $(podman ps -q)'
            }
        }
    }
}
