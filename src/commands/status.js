const { exec, reporter } = require('@dhis2/cli-helpers-engine')
const { makeComposeProject } = require('../common')

const run = async function({ tag = 'dev', ...argv }) {
    try {
        await exec({
            cmd: 'docker',
            args: ['ps', '--filter', `name=${makeComposeProject(tag)}`],
            pipe: true,
            quiet: !argv.verbose,
        })
    } catch (e) {
        reporter.error("Failed to execute 'docker ps'", e)
        process.exit(1)
    }
}

module.exports = {
    command: 'status [tag]',
    desc: 'Check the status of cluster containers',
    aliases: 's',
    handler: run,
}
