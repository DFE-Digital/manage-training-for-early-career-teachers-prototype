

module.exports = router => {

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

  router.post('/add-mentor/answer-training-provider', (req, res) => {

    const provider = req.session.data.trainingProvider

    if (provider === "other") {
      res.redirect('/add-mentor/contact-support')
    } else {
      res.redirect('/add-mentor/check')
    }

  })

}
