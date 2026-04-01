pipeline {
    agent any

    stages {
        stage('Clean Workspace') {
            steps {
                // Ensure a fresh start to avoid "not a git directory" errors
                cleanWs()
            }
        }

        stage('Clone') {
            steps {
                // Using the full checkout syntax is more reliable in Jenkins Pipelines
                checkout([$class: 'GitSCM', 
                    branches: [[name: '*/main']], 
                    userRemoteConfigs: [[url: 'https://github.com/GElavarasiA/Netflix-cloning.git']]
                ])
            }
        }

        stage('Build Docker Image') {
            steps {
                // It is good practice to use double quotes for sh commands
                sh "docker build -t netflix-clone ."
            }
        }

        stage('Remove Old Container') {
            steps {
                // '|| true' ensures the pipeline doesn't fail if the container doesn't exist yet
                sh "docker rm -f netflix-container || true"
            }
        }

        stage('Run Container') {
            steps {
                sh "docker run -d -p 8085:80 --name netflix-container netflix-clone"
            }
        }
    }
    
    post {
        failure {
            echo "Pipeline failed. Check the Docker logs or Git permissions."
        }
        success {
            echo "Deployment successful! App available on port 8085."
        }
    }
}