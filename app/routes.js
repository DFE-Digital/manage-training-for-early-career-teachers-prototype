//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


router.get('/participants', (req, res) => {

  let mentors = JSON.parse(JSON.stringify(req.session.data.mentors))
  let teachers = JSON.parse(JSON.stringify(req.session.data.teachers))

  let ectsBeingTrained = teachers.filter((teacher) => (!teacher.completedDate && !teacher.noLongerTraining))
  let ectsCompleted = teachers.filter((teacher) => teacher.completedDate)
  let ectsNoLongerTraining = teachers.filter((teacher) => teacher.noLongerTraining)

  let teachersWithoutMentors = ectsBeingTrained.filter((teacher) => !teacher.mentorId)

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

  for (teacher of ectsBeingTrained) {
    if (teacher.mentorId) {
      teacher.mentor = JSON.parse(JSON.stringify(mentors.find((mentor) => mentor.id === teacher.mentorId)))
    }
  }


  ectsBeingTrained = ectsBeingTrained.sort(function(teacherA, teacherB) {
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

  res.render('participants', {
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
  if (teacher.mentorId) {
    mentor = req.session.data.mentors.find((mentor) => mentor.id === teacher.mentorId)
  }

  res.render('early-career-teacher', {
    id,
    teacher,
    mentor
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

  res.render('mentor', {
    id,
    mentor
  })
})

