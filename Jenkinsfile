pipeline {
    agent any

    stages {
        stage('Setup env') {
            steps {
                echo 'Env setup'
            }
        }
        stage('Run test') {
            steps {
                sh 'npm run test -- --coverage'
            }
        }
    }
}