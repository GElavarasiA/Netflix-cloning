pipeline {
    agent any
    
    stages {
        stage('Clone') {
            steps {
                checkout scm
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t netflix-clone-app .'
            }
        }
        stage('Cleanup Old Container') {
            steps {
                sh 'docker stop netflix-container || true'
                sh 'docker rm netflix-container || true'
            }
        }
        stage('Deploy') {
            steps {
                // Runs the clone on port 8085
                sh 'docker run -d -p 8085:80 --name netflix-container netflix-clone-app'
            }
        }
    }
}