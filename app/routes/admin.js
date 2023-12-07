

module.exports = router => {

  let randomId = require('../random-id.js')

  const emailTypes = {
    "contractWithATrainingPartner": {
      subject: "Contract with a training partner",
      notifyTemplate: "6.14 SIT - FIP - No partnership received",
      recipientsDescription: "School induction tutors who:\n\n* have selected the full induction programme\n* do not yet have a partnership reported"
    },
    "setUpTraining": {
      subject: "Set up training",
      notifyTemplate: "6.15 SIT - Set up training",
      recipientsDescription: "School induction tutors who:\n\n* have not yet selected a training programme"
    },
    "registerEarlyCareerTeachers": {
      subject: "Register early career teachers and mentors",
      notifyTemplate: "6.16 SIT - FIP - No ECTs registered",
      recipientsDescription: "School induction tutors who:\n\n* have selected the full induction programme\n* have not yet registed an ECT or mentoe"
    },
    "assignAMentor": {
      subject: "Assign a mentor",
      notifyTemplate: "6.17 SIT - Assign a mentor",
      recipientsDescription: "School induction tutors who:\n\n* have selected the full induction programme\n* have an ECT who is not paired with a mentor"
    },
    "newTermReminder": {
      subject: "New term reminder",
      notifyTemplate: "6.18 SIT - New term reminder",
      recipientsDescription: "All school induction tutors"
    }
  }

  // Index page showing upcoming and recently scheduled emails
  router.get('/admin/performance/emails', (req, res) => {

    const allEmails = req.session.data.emailSchedule.sort(function(emailA, emailB) {
      const emailADate = new Date(emailA.date.year, emailA.date.month - 1, emailA.date.day, 12, 0)
      const emailBDate = new Date(emailB.date.year, emailB.date.month - 1, emailB.date.day, 12, 0)

      if (emailADate > emailBDate) {
        return 1
      } else {
        return -1
      }
    });

    const dateToday = new Date();

    const upcomingEmails = allEmails.filter(email => {
      const emailDate = new Date(email.date.year, email.date.month - 1, email.date.day, 12, 0)
      return (emailDate > dateToday)
    });

    const sentEmails = allEmails.filter(email => {

      const emailDate = new Date(email.date.year, email.date.month - 1, email.date.day, 12, 0)

      return (emailDate < dateToday)
    }).reverse();

    res.render('admin/performance/emails', {
      upcomingEmails,
      sentEmails,
      emailTypes
    });
  });

  router.get('/admin/performance/emails/new', (req, res) => {

    const id = randomId.randomId();

    res.render('admin/performance/emails/new');
  });

  router.post('/admin/performance/emails/confirm', (req, res) => {
    const dateToday = new Date();

    const email = {
      id: randomId.randomId(),
      type: req.body.emailType,
      date: req.body.emailDate
    }

    const emailDate = new Date(email.date.year, email.date.month - 1, email.date.day, 12, 0)

    if (emailDate > dateToday) {
      req.session.data.emailSchedule.push(email)

      delete req.session.data.emailType
      delete req.session.data.emailDate

      res.redirect(`/admin/performance/emails/${email.id}`)
    } else {
      res.redirect(`/admin/performance/emails/new`)
    }

  });

  router.post('/admin/performance/emails/:id/delete', (req, res) => {
    const { id } = req.params;

    let emailSchedule = req.session.data.emailSchedule

     req.session.data.emailSchedule = emailSchedule.filter(email => { return email.id != id })

    res.redirect(`/admin/performance/emails`)
  });


  router.get('/admin/performance/emails/:id', (req, res) => {
    const { id } = req.params
    const email = req.session.data.emailSchedule.find(function(email) {
      return email.id === id
    })

    const emailDate = new Date(email.date.year, email.date.month - 1, email.date.day, 12, 0)
    const dateToday = new Date();

    const emailType = emailTypes[email.type];

    res.render('admin/performance/emails/show', {
      email,
      emailDate,
      emailType,
      dateToday
    });
  });


  router.get('/admin/performance/emails/:id/edit', (req, res) => {
    const { id } = req.params;

    const email = req.session.data.emailSchedule.find(function(email) {
      return email.id === id
    })

    const emailType = emailTypes[email.type];

    res.render('admin/performance/emails/edit', {
      email,
      emailType
    });
  });

  router.post('/admin/performance/emails/:id/update', (req, res) => {
    const { id } = req.params;
    const dateToday = new Date();
    const emailDate = new Date(req.body.emailDate.year, req.body.emailDate.month - 1, req.body.emailDate.day, 12, 0)


    if (emailDate > dateToday) {
      const email = req.session.data.emailSchedule.find(function(email) {
        return email.id === id
      });

      email.date = req.body.emailDate;
      res.redirect(`/admin/performance/emails/${id}`)
    } else {
      res.redirect(`/admin/performance/emails/${id}/edit`)
    }

  });


  router.get('/admin/schools/:id', (req, res) => {
    const { id } = req.params;
    const school = req.session.data.schools.find(school => { return school.id === id})


    res.render('admin/schools/show', {
      id,
      school
    })
  });

  router.get('/admin/schools/:id/ects', (req, res) => {
    const { id } = req.params;
    const school = req.session.data.schools.find(school => { return school.id === id})


    res.render('admin/schools/ects', {
      id,
      school
    })
  });
}
