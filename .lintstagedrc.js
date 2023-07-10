const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  '*.(js|jsx|css|sass|scss)': 'npm run format',
  '*.{js,jsx}': [buildEslintCommand],
  '*.(css|sass|scss)': 'npm run stylelint',
}
