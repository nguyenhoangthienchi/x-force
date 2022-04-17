pipeline {
    agent any

    stages {
        stage('Setup env') {
            steps {
                echo 'Env setup hehe'
            }
        }
        stage('Setup env 2') {
            parallel {
                stage ('Test on Windows') {
                    steps {
                        echo 'Tested on windows'
                    }
                }
                stage ('Test on Linux') {
                    steps {
                        echo 'Tested on Linux s'
                    }
                }
            }
        }
        stage('Print env') {
            steps {
                sh 'printenv | sort'
            }
        }
    }
}