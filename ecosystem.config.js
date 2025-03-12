module.exports = {
    apps: [
        {
            name: 'travel-hub-front', // 애플리케이션 이름
            script: 'pnpm', // 실행 스크립트
            args: 'start:prod', // 실행 인자
            instances: 'max', // 인스턴스 수
            exec_mode: 'cluster', // 실행 모드
            autorestart: true, // 자동 재시작
            watch: false, // 감시 여부
            max_memory_restart: '1G', // 최대 메모리 재시작
            env: {
                NODE_ENV: 'production', // 노드 환경
                PORT: 3000, // 포트
            },
        },
    ],
}
