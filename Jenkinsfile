pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/GElavarasiA/Netflix-cloning.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '/usr/bin/docker build -t netflix-clone .'
            }
        }

        stage('Remove Old Container') {
            steps {
                sh '/usr/bin/docker rm -f netflix-container || true'
            }
        }

        stage('Run Container') {
            steps {
                sh '/usr/bin/docker run -d -p 8085:80 --name netflix-container netflix-clone'
            }
        }
    }
}