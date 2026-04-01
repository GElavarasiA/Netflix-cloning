pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                git 'https://github.com/GElavarasiA/Netflix-cloning.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t netflix-clone .'
            }
        }

        stage('Remove Old Container') {
            steps {
                sh 'docker rm -f netflix-container || true'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d -p 8085:80 --name netflix-container netflix-clone'
            }
        }
    }
}