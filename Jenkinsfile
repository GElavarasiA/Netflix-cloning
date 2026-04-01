pipeline {
    agent any

    options {
        // Prevents the initial automatic checkout that was failing earlier
        skipDefaultCheckout()
    }

    stages {
        stage('Cleanup & Init') {
            steps {
                // Cleans the workspace and prepares the Git repo manually
                deleteDir()
                sh 'git init'
                sh 'git remote add origin https://github.com/GElavarasiA/Netflix-cloning.git'
            }
        }

        stage('Clone') {
            steps {
                // Pulls the actual code from your main branch
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Uses the Docker Pipeline Plugin to build the image
                    // Ensure 'Docker Pipeline' plugin is installed in Jenkins
                    docker.build("netflix-clone")
                }
            }
        }

        stage('Remove Old Container') {
            steps {
                // Removes existing container if it exists so the port is free
                sh "docker rm -f netflix-container || true"
            }
        }

        stage('Run Container') {
            steps {
                // Runs the new container on port 8085
                sh "docker run -d -p 8085:80 --name netflix-container netflix-clone"
            }
        }
    }

    post {
        failure {
            echo "Build failed. Check if Docker is running and the Dockerfile exists in the repo."
        }
        success {
            echo "Build successful! Application is running on port 8085."
        }
    }
}