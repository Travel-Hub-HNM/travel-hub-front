module.exports = {
    apps: [
        {
            name: 'travel-hub-front',
            script: 'pnpm',
            args: 'start:prod',
            env: {
                NODE_ENV: 'production',
            },
            instances: 1,
            exec_mode: 'fork',
            max_memory_restart: '1G',
            autorestart: true,
            max_restarts: 10,
            restart_delay: 4000,
            error_file: 'logs/error.log',
            out_file: 'logs/out.log',
            merge_logs: true,
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
            wait_ready: true,
            listen_timeout: 10000,
            kill_timeout: 5000,
        },
    ],
}
