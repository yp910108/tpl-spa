const fs = require('fs')
const path = require('path')
const Generator = require('yeoman-generator')

function exists(filename) {
  const filePath = path.join(process.cwd(), filename)
  return fs.existsSync(filePath)
}

module.exports = class extends Generator {
  promting() {
    return this.prompt([
      {
        type: 'input',
        name: 'appName',
        message: '项目名称',
        validate(input) {
          if (!input) return '请输入项目名称'
          if (exists(input)) return '目录已存在'
          return true
        }
      }
    ]).then(answers => {
      this.answers = answers
    })
  }
  writing() {
    this.fs.copyTpl(
      this.templatePath(),
      path.join(process.cwd(), this.answers.appName),
      this.answers
    )
  }
  end() {
    console.log('happy coding!')
  }
}
