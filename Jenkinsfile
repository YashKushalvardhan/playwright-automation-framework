pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('pw-tests', '-f docker/Dockerfile .')
                }
            }
        }

        stage('Run Tests') {
            environment {
                BASE_URL = 'https://automationexercise.com/'
                TEST_USER_EMAIL = 'cigek50755@doefy.com'
                TEST_USER_PASSWORD = 'Test@1234'
                ENV_NAME = 'dev'
            }
            steps {
                script {
                    docker.image('pw-tests').inside {
                        sh 'npx playwright test --project=chromium --project=firefox || true'
                    }
                }
            }
        }

        stage('Publish Report') {
            steps {
                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report'
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
    }
}