

module.exports = router => {

  let randomId = require('../random-id.js')

  router.get('/mentors', (req, res) => {

    let mentors = JSON.parse(JSON.stringify(req.session.data.mentors))
    let teachers = JSON.parse(JSON.stringify(req.session.data.teachers))

    for (mentor of mentors) {
      mentor.earlyCareerTeachers = []

      for (teacher of req.session.data.teachers.filter((teacher) =>
        teacher.mentorId === mentor.id &&
        !teacher.completedDate &&
        !teacher.noLongerTraining
      )) {
        mentor.earlyCareerTeachers.push(JSON.parse(JSON.stringify(teacher)))
      }
    }

    let mentorsCurrentlyMentoring = mentors.filter(mentor => (mentor.earlyCareerTeachers.length > 0))

    let mentorsNotMentoring = mentors.filter(mentor => (mentor.earlyCareerTeachers.length == 0))

    let show = req.query.show || 'mentoring'

    res.render('mentors/index', {
      show,
      mentorsCurrentlyMentoring,
      mentorsNotMentoring
    })

  })

  router.get('/mentors/:id', (req, res) => {
    const { id } = req.params

    let mentor = JSON.parse(JSON.stringify(req.session.data.mentors.find(function(mentor) {
      return mentor.id === id
    })))

    mentor.earlyCareerTeachers = []

    for (teacher of req.session.data.teachers.filter((teacher) =>
        teacher.mentorId === mentor.id &&
        !teacher.completedDate &&
        !teacher.noLongerTraining
      )) {
        mentor.earlyCareerTeachers.push(JSON.parse(JSON.stringify(teacher)))
      }

    res.render('mentors/show', {
      id,
      mentor
    })
  })

  router.post('/mentors/add/answer-training-provider', (req, res) => {

    const provider = req.session.data.trainingProvider

    if (provider === "other") {
      res.redirect('/mentors/add/contact-support')
    } else {
      res.redirect('/mentors/add/check')
    }

  })

  router.post('/mentors/add/confirm', (req, res) => {

    let data = req.session.data

    let dob = new Date(data.dob.year, data.dob.month, data.dob.day).toISOString().slice(0,10)

    let mentor = {
      id: randomId.randomId(),
      name: data.name,
      trn: data.trn,
      dateOfBirth: dob,
      emailAddress: data.email
    }

    req.session.data.mentors.push(mentor)

    res.redirect('/mentors?show=not-mentoring')

  })

}
