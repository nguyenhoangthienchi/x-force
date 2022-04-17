pipeline {
    agent any

    stages {
        stage('Setup env') {
            steps {
                echo 'Env setup hehe'
            }
        }
        stage('Print env') {
            steps {
                sh 'printenv | sort'
            }
        }
    }
}