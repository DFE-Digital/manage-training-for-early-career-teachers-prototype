const fs = require('fs')
const path = require('path')
const faker = require('@faker-js/faker').faker

const generateSchool = () => {
    let school = {}
  
    // School ID
    school.id = "" + faker.number.int({ min: 123456, max: 999999 })
  
    let now = new Date().toISOString()
  
    school.sentDate = faker.date.recent({ days: 21 })
  
    school.status = faker.helpers.arrayElement([
      'status 1 tbc',
      'status 2 tbc',
      'status 3 tbc'
    ])
  
    if(school.status == 'stauts 1 tbc') {
      school.rejectedDate = faker.date.between({
        from: school.sentDate,
        to: now
      })
    }
    if(school.status == 'stauts 2 tbc') {
      school.approvedDate = faker.date.between({
        from: school.sentDate,
        to: now
      })
    }
  
    // School details
    school.details = {}
    school.details.name = faker.company.name()
    school.details.emailAddress = `${school.details.name.toLowerCase()}@gmail.com`
    school.details.phoneNumber = faker.helpers.replaceSymbolWithNumber('079## ### ###')
  
    return school
  }
  
  const generateSchools = () => {
    const schools = []
  
    for(let i = 0; i < 10; i++) {
      schools.push(generateSchool())
    }
  
    return schools
  }
  
  const generateSchoolsFile = (filePath) => {
    const schools = generateSchools()
    const filedata = JSON.stringify(schools, null, 2)
    fs.writeFile(
      filePath,
      filedata,
      (error) => {
        if (error) {
          console.error(error)
        }
        console.log(`generateSchool generated: ${filePath}`)
      }
    )
  }
  
  generateSchoolsFile(path.join(__dirname, '../app/data/schools.json'))