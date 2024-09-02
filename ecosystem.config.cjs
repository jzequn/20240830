module.exports = {// for pm2 running, pm2 config
    apps: [
        {
            script: 'pnpm start',
            name: 'rotate-pdf-nextjs',
        }
    ]
};