//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.post('/ects/answer-training-programme', (req, res) => {

  const answer = req.body.trainingProgramme

  if (answer === "fip") {
    res.redirect('/ects/provider')
  } else {
    res.redirect('/ects/appropriate-body')
  }

});


router.post('/ects/confirm', (req, res) => {

  let data = req.session.data;
  req.session.data.ects ||= []

  let inductionStartDate;
  if (data.startTerm == "Start of the Autumn 2023 term") {
    inductionStartDate = {day: 1, month: 9, year: 2023}
  } else if (data.startTerm == "Start of the Spring 2024 term") {
    inductionStartDate = {day: 3, month: 1, year: 2024}
  } else if (data.startTerm == "Start of the Summer 2024 term") {
    inductionStartDate = {day: 17, month: 4, year: 2024}
  } else {
    inductionStartDate = data.startDate
  }

  let mentors = [
    {
      from: inductionStartDate,
      mentor: { name: data.mentor, id: "6454575" }
    }
  ]

  let ect = {
    firstName: data.firstName,
    lastName: data.lastName,
    trn: data.trn,
    dob: data.dob,
    inductionStartDate: inductionStartDate,
    schoolName: data.schoolName,
    inductionTutor: data.inductionTutor,
    mentors: mentors,
    appropriateBody: data.appropriateBody,
    teachingSchoolHub: data.teachingSchoolHub,
    trainingProgramme: data.trainingProgramme,
    leadProvider: data.leadProvider
  }

  req.session.data.ects.push(ect)

  delete data.firstName
  delete data.lastName
  delete data.trn
  delete data.dob
  delete data.schoolName
  delete data.startTerm
  delete data.startDate
  delete data.inductionTutor
  delete data.mentor
  delete data.appropriateBody
  delete data.teachingSchoolHub
  delete data.trainingProgramme
  delete data.leadProvider

  res.redirect('/ects')
});


router.get('/ects/:ectId/show', (req, res) => {

  let ect = req.session.data.ects.find((ect) => ect.trn == req.params.ectId)

  res.render('ects/show', {
    ect
  })
});


router.get('/ects/:ectId/change-mentor', (req, res) => {

  let ect = req.session.data.ects.find((ect) => ect.trn == req.params.ectId)

  let currentMentor

  if (ect.mentors.length > 0) {
    currentMentor = ect.mentors.find((mentor) => mentor.to == undefined)
  }

  res.render('ects/change-mentor', {
    ect,
    currentMentor
  })
});

router.get('/ects/:ectId/new-mentor', (req, res) => {

  let ect = req.session.data.ects.find((ect) => ect.trn == req.params.ectId)

  res.render('ects/new-mentor', {
    ect
  })
});
