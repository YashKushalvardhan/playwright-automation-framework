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
            steps {
                sh '''
                    CID=$(docker create \
                      -e BASE_URL=https://automationexercise.com/ \
                      -e TEST_USER_EMAIL=cigek50755@doefy.com \
                      -e TEST_USER_PASSWORD=Test@1234 \
                      -e ENV_NAME=dev \
                      pw-tests npx playwright test --project=chromium --project=firefox)
                    docker start -a $CID || true
                    docker cp $CID:/app/playwright-report ./playwright-report || true
                    docker cp $CID:/app/test-results ./test-results || true
                    docker rm -f $CID || true
                '''
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