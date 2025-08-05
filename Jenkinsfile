pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        FRONTEND_PORT = '4200'
        NODE_OPTIONS = '--max-old-space-size=4096'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/d2h5a0r5a0n3/Portfolio-Frontend.git', credentialsId: 'github-credentials'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing Node.js dependencies...'
                bat 'npm ci'
            }
        }

        stage('Build Frontend') {
            steps {
                echo '🏗️ Building Angular Application...'
                bat 'npm run build -- --configuration=production'
            }
        }

        stage('Docker Build') {
            steps {
                echo '🐳 Building Docker image...'
                bat 'docker build -t portfolio-frontend .'
            }
        }

        stage('Deploy Frontend') {
            steps {
                script {
                    echo '🧹 Cleaning up existing frontend container and image...'

                    def stopStatus = bat(script: 'docker stop portfolio-frontend 2>nul', returnStatus: true)
                    if (stopStatus != 0) {
                        echo 'No container to stop'
                    }

                    def rmStatus = bat(script: 'docker rm portfolio-frontend 2>nul', returnStatus: true)
                    if (rmStatus != 0) {
                        echo 'No container to remove'
                    }

                    def rmiStatus = bat(script: 'docker rmi portfolio-frontend:old 2>nul', returnStatus: true)
                    if (rmiStatus != 0) {
                        echo 'No old image to remove'
                    }

                    def tagStatus = bat(script: 'docker tag portfolio-frontend portfolio-frontend:old 2>nul', returnStatus: true)
                    if (tagStatus != 0) {
                        echo 'No current image to tag'
                    }

                    echo '🌐 Creating Docker network if not exists...'
                    def netStatus = bat(script: 'docker network create portfolio-network 2>nul', returnStatus: true)
                    if (netStatus != 0) {
                        echo 'Network already exists'
                    }

                    echo '🚀 Starting frontend container...'
                    def runStatus = bat(script: "docker run -d --name portfolio-frontend -p ${FRONTEND_PORT}:80 --network portfolio-network portfolio-frontend", returnStatus: true)
                    if (runStatus != 0) {
                        echo "❌ Docker run failed with exit code ${runStatus}"
                        bat 'docker ps -a'
                        bat 'docker logs portfolio-frontend || echo "No logs available"'
                        error 'Failed to start frontend container.'
                    }

                    echo '🔍 Container started. Checking logs and status...'
                    bat 'docker ps -f name=portfolio-frontend'
                    bat 'docker logs portfolio-frontend || echo "No logs available"'
                }
            }
        }


        stage('Verify Frontend') {
            steps {
                echo '🔍 Waiting for frontend to become available...'
                script {
                    def healthCheckPassed = false
                    for (int i = 0; i < 8 && !healthCheckPassed; i++) {
                        sleep time: 10, unit: 'SECONDS'
                        def status = bat(script: "curl -f http://localhost:${FRONTEND_PORT}", returnStatus: true)
                        if (status == 0) {
                            echo '✅ Frontend is accessible!'
                            healthCheckPassed = true
                        } else {
                            echo "⚠️ Health check attempt ${i + 1}/8 failed (curl exit code: ${status})"
                        }
                    }

                    if (!healthCheckPassed) {
                        error '❌ Frontend health check failed after multiple attempts.'
                    }
                }
            }
        }
    }

    post {
        success {
            echo '✅✅✅ Portfolio Frontend deployed successfully!!!'
            echo "🌐 Frontend is available at: http://localhost:${FRONTEND_PORT}"
        }
        failure {
            echo '❌❌❌ Portfolio Frontend deployment failed!!!'
            echo 'Check Jenkins console output for error details'
        }
        always {
            cleanWs()
        }
    }
}
