pipeline {
    agent any

    environment {
        APK_OUTPUT_DIR = 'android/app/build/outputs/apk/release/'  // APK 파일 위치
        APK_FINAL_NAME = 'DONZOOM.apk'  // apk 파일 이름
    }

    stages {
        stage('Checkout SCM') {
            steps {
                echo 'Checking out frontend SCM...'
                checkout scm
            }
        }

        stage('Build APK') {
            steps {
                echo 'Building APK for frontend...'
                sh '''
                    cd frontend
                    chmod +x gradlew  # gradlew 파일에 실행 권한 부여
                    ./gradlew assembleRelease  # APK 생성
                '''
            }
        }

        stage('Rename APK') {
            steps {
                echo 'Renaming APK to DONZOOM.apk...'
                sh '''
                    cd frontend/android
                    mv ${APK_OUTPUT_DIR}app-release.apk ${APK_OUTPUT_DIR}${APK_FINAL_NAME}  # APK 파일 이름 변경
                '''
            }
        }

        stage('Archive APK') {
            steps {
                echo 'Archiving DONZOOM.apk...'
                archiveArtifacts allowEmptyArchive: false, artifacts: "${APK_OUTPUT_DIR}${APK_FINAL_NAME}"
            }
        }
    }

    post {
        always {
            echo 'Frontend pipeline finished.'
        }
        success {
            echo 'Frontend pipeline completed successfully.'
        }
        failure {
            echo 'Frontend pipeline failed.'
        }
    }
}
