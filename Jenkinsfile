pipeline {
    agent any
    
    stages {
        stage('Setup environment') {
            parallel {
                stage('Build and unit test') {
                    environment {
                        BUILD_PREFIX_NAME = 'pr-x4ce-' + "${CHANGE_ID}"
                    }
                    steps {
                        sh 'npm install'
                        sh 'npm run test'
                        sh 'npm run build'
                    }
                }
                stage('Prepare S3 bucket') {
                    when {
                        allOf {
                            expression { env.CHANGE_ID != null }
                            expression { env.CHANGE_BRANCH != null }
                        }
                    }
                    environment {
                        BUILD_PREFIX_NAME = 'pr-x4ce-' + "${CHANGE_ID}"
                    }
                    steps {
                        catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {
                            sh 'aws s3api create-bucket --bucket "${BUILD_PREFIX_NAME}" --region ap-southeast-1 --create-bucket-configuration LocationConstraint=ap-southeast-1'
                            sh 'aws s3api put-public-access-block --bucket "${BUILD_PREFIX_NAME}" --public-access-block-configuration \'{"BlockPublicAcls": false,"IgnorePublicAcls": false,"BlockPublicPolicy": false,"RestrictPublicBuckets": false}\''
                            sh 'aws s3api put-bucket-policy --bucket "${BUILD_PREFIX_NAME}" --policy \'{"Version": "2012-10-17","Statement": [{"Sid": "PublicReadGetObject","Effect": "Allow","Principal": "*","Action": "s3:GetObject","Resource": "arn:aws:s3:::' + "${BUILD_PREFIX_NAME}" + '/*"}]}\''
                            sh 'aws s3api put-bucket-website --bucket "${BUILD_PREFIX_NAME}" --website-configuration \'{"IndexDocument": {"Suffix": "index.html"}}\''
                        }
                    }
                }
            }
        }
        stage("Deploy to S3") {
            parallel {
                stage("Pull request") {
                    when {
                        allOf {
                            expression { env.CHANGE_ID != null }
                            expression { env.CHANGE_BRANCH != null }
                        }
                    }
                    environment {
                        BUILD_PREFIX_NAME = 'pr-x4ce-' + "${CHANGE_ID}"
                    }
                    steps {
                        sh 'aws s3 cp build s3://' + "${BUILD_PREFIX_NAME}" + ' --recursive'
                    }
                }
                stage("Production") {
                    when {
                        expression { env.BRANCH_NAME == 'master' }
                    }
                    steps {
                        sh 'aws s3 cp build s3://x4ce-master --recursive'
                    }
                }
                stage("Test") {
                    when {
                        expression { env.BRANCH_NAME == 'master' }
                    }
                    steps {
                        sh 'aws s3 cp build s3://x4ce-test --recursive'
                    }
                }
            }
        }
    }
}