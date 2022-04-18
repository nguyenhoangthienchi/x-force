pipeline {
    agent any

    stages {
        stage('Setup env') {
            steps {
                echo 'Env setup hehe'
                sh """
                    BUILD_ID="pr-x4ce-${CHANGE_ID}"
                """
                sh "echo ${BUILD_ID}"
                sh """
                    aws s3api create-bucket --bucket "${BUILD_ID}"
                """
                sh """
                    aws s3api put-public-access-block --bucket "${BUILD_ID}" --public-access-block-configuration "\$(< .aws/s3/publicAccessBlock.json)"
                """
                sh """
                    aws s3api put-bucket-policy --bucket x-force-10 --policy "\$(sed "s/###BUILD_ID###/${BUILD_ID}/g" <<< \$(< .aws/s3/permissionPolicy.json))"
                """
                sh """
                    aws s3api put-bucket-website --bucket x-force-10 --website-configuration file://.aws/s3/websiteConfig.json
                """ 
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
                        echo 'Tested on Linux'
                    }
                }
                stage ('Test on MacOS') {
                    steps {
                        echo 'Tested on MacOS'
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