pipeline {
    agent any
    
    options {
        // This stops Jenkins from trying to clone automatically and failing
        skipDefaultCheckout()
    }

    stages {
        stage('Cleanup & Init') {
            steps {
                // Wipe the folder and force a fresh git initialization
                deleteDir() 
                sh 'git init'
                sh 'git remote add origin https://github.com/GElavarasiA/Netflix-cloning.git'
            }
        }

        stage('Clone') {
            steps {
                // Now we pull the code manually
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t netflix-clone ."
            }
        }
        
        // ... rest of your stages (Remove Old Container, Run Container)
    }
}