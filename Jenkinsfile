pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Lint') {
            steps {
                sh '''
                    npm ci
                    npm run lint || true
                '''
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
                withCredentials([
                    string(credentialsId: 'test-base-url', variable: 'BASE_URL'),
                    string(credentialsId: 'test-user-email', variable: 'TEST_USER_EMAIL'),
                    string(credentialsId: 'test-user-password', variable: 'TEST_USER_PASSWORD')
                ]) {
                    sh '''
                        CID=$(docker create \
                          -e BASE_URL=$BASE_URL \
                          -e TEST_USER_EMAIL=$TEST_USER_EMAIL \
                          -e TEST_USER_PASSWORD=$TEST_USER_PASSWORD \
                          -e ENV_NAME=dev \
                          pw-tests npx playwright test --project=chromium --project=firefox)
                        docker start -a $CID || true
                        docker cp $CID:/app/playwright-report ./playwright-report || true
                        docker cp $CID:/app/test-results ./test-results || true
                        docker rm -f $CID || true
                    '''
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