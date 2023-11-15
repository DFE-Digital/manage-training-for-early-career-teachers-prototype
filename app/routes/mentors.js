

module.exports = router => {

  let randomId = require('../random-id.js')

  router.get('/mentors', (req, res) => {

    let mentors = JSON.parse(JSON.stringify(req.session.data.mentors))
    let teachers = JSON.parse(JSON.stringify(req.session.data.teachers))

    for (mentor of mentors) {
      mentor.earlyCareerTeachers = []

      for (teacher of req.session.data.teachers) {

        let currentMentor = teacher.mentors.find((mentor) => !mentor.to)

        if (currentMentor && currentMentor.id === mentor.id && !teacher.completedDate &&
        !teacher.noLongerTraining) {

          mentor.earlyCareerTeachers.push(JSON.parse(JSON.stringify(teacher)))
        }
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
    mentor.previouslyMentored = []


    for (teacher of req.session.data.teachers) {

      for (teacherMentor of teacher.mentors) {

        if (mentor.id == teacherMentor.id) {

          if (teacherMentor.to || teacher.completedDate || teacher.noLongerTraining) {
            mentor.previouslyMentored.push({
              from: teacherMentor.from,
              to: teacherMentor.to,
              teacher: JSON.parse(JSON.stringify(teacher))
            })
          } else {
            mentor.earlyCareerTeachers.push(JSON.parse(JSON.stringify(teacher)))
          }

        }

      }
    }


    let justAdded = req.query.justAdded

    res.render('mentors/show', {
      id,
      justAdded,
      mentor
    })
  })

  router.get('/mentors/:id/assign-ect', (req, res) => {
    const { id } = req.params


    let teachers = JSON.parse(JSON.stringify(req.session.data.teachers))

    let mentor = JSON.parse(JSON.stringify(req.session.data.mentors.find(function(mentor) {
      return mentor.id === id
    })))

    teachers = teachers.filter((teacher) => (!teacher.completedDate && !teacher.noLongerTraining))

    for (teacher of teachers) {
      for (mentoring of teacher.mentors) {
        mentoring.mentor =  JSON.parse(JSON.stringify(req.session.data.mentors.find((m) => m.id === mentoring.id)))
      }
    
      teacher.currentMentor = teacher.mentors.find((mentor) => !mentor.to)
    }
    
    teachers = teachers.filter((teacher) => (teacher.currentMentor?.id != id))

    res.render('mentors/assign-ect', {
      mentor,
      teachers
    })
  })


  router.post('/mentors/:id/assign-ect', (req, res) => {
    const { id } = req.params
    const ectId = req.body.ectId
    const dateToday = new Date().toISOString()
    const teacher = req.session.data.teachers.find((teacher) => teacher.id === ectId)
    
    let currentMentor = teacher.mentors.find((mentor) => !mentor.to)
    if (currentMentor) {
      currentMentor.to = dateToday;
    }

    teacher.mentors.push({
      id: id,
      from: dateToday
    })
    
    
    res.redirect(`/mentors/${id}`)
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

    let leadProviderName, deliveryPartnerName, training

    if (data.trainingProvider == "ambition-with-selby") {
      leadProviderName = "Ambition Institute"
      deliveryPartnerName = "Selby Teaching School Hub"
    } else if (data.trainingProvider == "niot-with-northamptonshire") {
      leadProviderName = "National Institute of Teaching"
      deliveryPartnerName = "Northamptonshire Teaching School Hub"
    }


    let mentor = {
      id: randomId.randomId(),
      name: data.name,
      trn: data.trn,
      dateOfBirth: dob,
      emailAddress: data.email,
      training: {
        leadProvider: leadProviderName,
        deliveryPartner: deliveryPartnerName
      }
    }

    req.session.data.mentors.push(mentor)

    // Reset the "Add mentor" flow
    delete data.name
    delete data.trn
    delete data.dob
    delete data.trainingProvider
    delete data.email

    res.redirect(`/mentors/${mentor.id}?justAdded=true`)

  })

}
