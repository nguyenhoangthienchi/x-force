pipeline {
    agent any

    stages {
        stage('Setup env') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run test') {
            steps {
                sh 'npm run test -- --coverage'
            }
        }
    }
}