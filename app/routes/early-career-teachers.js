

module.exports = router => {

  router.get('/early-career-teachers', (req, res) => {

    let mentors = JSON.parse(JSON.stringify(req.session.data.mentors))
    let teachers = JSON.parse(JSON.stringify(req.session.data.teachers))

    let ectsBeingTrained = teachers.filter((teacher) => (!teacher.completedDate && !teacher.noLongerTraining))
    let ectsCompleted = teachers.filter((teacher) => teacher.completedDate)
    let ectsNoLongerTraining = teachers.filter((teacher) => teacher.noLongerTraining)

    let teachersWithoutMentors = ectsBeingTrained.filter((teacher) => !teacher.mentors.find((mentor) => !mentor.to))

    for (mentor of mentors) {
      mentor.earlyCareerTeachers = []

      for (teacher of ectsBeingTrained) {
        const currentMentor = teacher.mentors.find((mentor) => !mentor.to)
        if (currentMentor) {
          teacher.currentMentor = JSON.parse(JSON.stringify(mentors.find((mentor) => mentor.id === currentMentor.id)))
        }
      }
    }

    ectsBeingTrained = ectsBeingTrained.sort(function(teacherA, teacherB) {
      // Teachers without mentors should always appear first
      if (!teacherA.mentors.find((mentor) => !mentor.to)) {
        return -1
      }

      if (!teacherA.inductionStartDate) {
        return -1
      }

      if (!teacherB.inductionStartDate) {
        return 1
      }

      if (teacherA.inductionStartDate > teacherB.inductionStartDate) {
        return -1
      } else {
        return 1
      }
    })

    let show = req.query.show || 'training'

    res.render('ects/index', {
      show,
      ectsBeingTrained,
      ectsCompleted,
      ectsNoLongerTraining,
      mentors,
      teachersWithoutMentors
    })

  })



  router.get('/early-career-teachers/:id', (req, res) => {
    const { id } = req.params

    const teacher = req.session.data.teachers.find((teacher) => teacher.id === id)

    let mentor = null

    for (mentor of teacher.mentors) {
      mentor.mentor =  JSON.parse(JSON.stringify(req.session.data.mentors.find((m) => m.id === mentor.id)))
    }

    if (teacher.completedDate) {
      teacher.currentMentor = teacher.mentors.find((mentor) => mentor.to === teacher.completedDate)
    } else {
      teacher.currentMentor = teacher.mentors.find((mentor) => !mentor.to)
    }

    res.render('early-career-teacher', {
      id,
      teacher,
      mentor
    })
  })

  router.get('/early-career-teachers/:id/change-trn', (req, res) => {
    const { id } = req.params

    const teacher = req.session.data.teachers.find((teacher) => teacher.id === id)

    res.render('ects/change-trn', {
      id,
      teacher
    })
  })

  router.get('/early-career-teachers/:id/change-dob', (req, res) => {
    const { id } = req.params

    const teacher = req.session.data.teachers.find((teacher) => teacher.id === id)

    res.render('ects/change-dob', {
      id,
      teacher
    })
  })

  router.get('/early-career-teachers/:id/change-dp-lp', (req, res) => {
    const { id } = req.params

    const teacher = req.session.data.teachers.find((teacher) => teacher.id === id)

    res.render('ects/change-dp-lp', {
      id,
      teacher
    })
  })

  router.get('/early-career-teachers/:id/change-mentor', (req, res) => {
    const { id } = req.params

    const teacher = req.session.data.teachers.find((teacher) => teacher.id === id)

    let mentors = JSON.parse(JSON.stringify(req.session.data.mentors));

    for (mentor of mentors) {
      mentor.currentMentoringCount = req.session.data.teachers.filter(
        (teacher) => (!teacher.completedDate && !teacher.noLongerTraining)
      ).filter(
        (teacher) => (teacher.mentors.filter(
          (teacherMentor) => (teacherMentor.id == mentor.id)
          )
        ).length > 0
      ).length;

    }

    res.render('ects/change-mentor', {
      id,
      teacher,
      mentors
    })
  })

  router.post('/early-career-teachers/:id/update-mentor', (req, res) => {
    const { id } = req.params
    const teacher = req.session.data.teachers.find((teacher) => teacher.id === id)
    const newMentorId = req.body.newMentorId
    const dateToday = new Date().toISOString()

    let currentMentor = teacher.mentors.find((mentor) => !mentor.to)

    if (currentMentor) {
      currentMentor.to = dateToday;
    }

    if (newMentorId) {
      teacher.mentors.push({
        id: newMentorId,
        from: dateToday
      })
    }

    res.redirect(`/early-career-teachers/${id}`)
  })

  router.get('/early-career-teachers/:id/support-contacted', (req, res) => {
    const { id } = req.params

    const teacher = req.session.data.teachers.find((teacher) => teacher.id === id)

    res.render('ects/support-contacted', {
      id,
      teacher
    })
  })

  router.get('/early-career-teachers/:id/transfer', (req, res) => {
    const { id } = req.params

    const teacher = req.session.data.teachers.find((teacher) => teacher.id === id)

    res.render('transfer', {
      id,
      teacher
    })
  })

  router.get('/early-career-teachers/:id/transfer-reason', (req, res) => {
    const { id } = req.params

    const teacher = req.session.data.teachers.find((teacher) => teacher.id === id)

    res.render('transfer-reason', {
      id,
      teacher
    })
  })

  router.get('/early-career-teachers/:id/transfer-check', (req, res) => {
    const { id } = req.params

    const teacher = req.session.data.teachers.find((teacher) => teacher.id === id)

    res.render('transfer-check', {
      id,
      teacher
    })
  })

  router.get('/early-career-teachers/:id/transfer-contact', (req, res) => {
    const { id } = req.params

    const teacher = req.session.data.teachers.find((teacher) => teacher.id === id)

    res.render('transfer-contact', {
      id,
      teacher
    })
  })

  router.post('/early-career-teachers/:id/answer-transfer-reason', (req, res) => {
    const { id } = req.params
    const { transferReason } = req.session.data

    if (transferReason === "permanent") {
      res.redirect(`/early-career-teachers/${id}/transfer-where`)
    } else {
      res.redirect(`/early-career-teachers/${id}/transfer-check`)
    }

  })

  router.get('/early-career-teachers/:id/transfer-where', (req, res) => {
    const { id } = req.params

    const teacher = req.session.data.teachers.find((teacher) => teacher.id === id)

    res.render('transfer-where', {
      id,
      teacher
    })
  })

  router.post('/early-career-teachers/:id/confirm-transfer', (req, res) => {
    const { id } = req.params
    const { transferReason, transferDate } = req.session.data
    const dateNow = new Date()

    const transferDateAsDate = new Date(transferDate.year, transferDate.month, transferDate.day)

    const teacher = req.session.data.teachers.find((teacher) => teacher.id === id)

    teacher.leftSchoolOn = req.session.data.transferDate
    req.session.data.transferDate = {}

    if ( transferDateAsDate < new Date ) {
      teacher.noLongerTraining = true
    }

    if (transferReason === "temporary") {
      teacher.temporarilyLeft = true
    }

    if (transferReason === "permanent") {
      res.redirect(`/early-career-teachers/${id}/transfer-confirmed`)
    } else {
      res.redirect(`/early-career-teachers/${id}/transfer-contact`)
    }


  })

  router.get('/early-career-teachers/:id/transfer-confirmed', (req, res) => {
    const { id } = req.params

    const teacher = req.session.data.teachers.find((teacher) => teacher.id === id)

    res.render('transfer-confirmed', {
      id,
      teacher
    })
  })



  router.post('/add-ect/answer-new-programme', (req, res) => {

    const newProvider = req.session.data.newProvider

    if (newProvider === "other") {
      res.redirect('/add-ect/transfer-contact-support')
    } else {
      res.redirect('/add-ect/check')
    }

  })

}
