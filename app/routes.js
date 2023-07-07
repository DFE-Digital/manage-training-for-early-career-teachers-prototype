//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


router.get('/early-career-teachers/:id', (req, res) => {
  const { id } = req.params

  const mentor = req.session.data.mentors.find(function(mentor) {
    return mentor.earlyCareerTeachers.find(function(teacher) {
      return teacher.id === id
    })
  })

  const teacher = req.session.data.mentors.map(function(mentor) {
    return mentor.earlyCareerTeachers
  }).flat().find(function(teacher) {
    return teacher.id === id
  })

  res.render('early-career-teacher', {
    id,
    teacher,
    mentor
  })
})

router.get('/teachers-without-mentors/:id', (req, res) => {
  const { id } = req.params

  const mentor = null

  const teacher = req.session.data.teachersWithoutMentors.find(function(teacher) {
    return teacher.id === id
  })

  res.render('early-career-teacher', {
    id,
    teacher,
    mentor
  })
})

router.get('/mentors/:id', (req, res) => {
  const { id } = req.params

  const mentor = req.session.data.mentors.find(function(mentor) {
    return mentor.id === id
  })

  res.render('mentor', {
    id,
    mentor
  })
})

router.get('/completed/:id', (req, res) => {
  const { id } = req.params

  const teacher = req.session.data.completedInduction.find(function(teacher) {
    return teacher.id === id
  })

  res.render('completed', {
    id,
    teacher
  })
})

router.get('/no-longer-training/:id', (req, res) => {
  const { id } = req.params

  const teacher = req.session.data.noLongerTraining.find(function(teacher) {
    return teacher.id === id
  })

  res.render('no-longer-training', {
    id,
    teacher
  })
})
