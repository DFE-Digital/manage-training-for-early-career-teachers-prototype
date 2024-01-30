const _ = require('lodash')

module.exports = router => {

  router.get('/admin', (req, res) => {
    let schools = req.session.data.schools

    let selectedProgrammeType = _.get(req.session.data.filters, 'programmeType')

    if(_.get(selectedProgrammeType, 'length')){
      schools  = schools.filter(schools => {
        let matchesProgrammeType = true

        if(_.get(selectedProgrammeType, 'length')) {
          matchesProgrammeType = selectedProgrammeType.includes(schools.programmeType);
        }

        return matchesProgrammeType
      })
    }

    res.render('admin/schools', {
      schools
    })
  })

  router.get('/schools/:schoolId', (req, res) => {
    let school = req.session.data.schools.find(school => schools.id === req.params.schoolId)

    res.render('schools/show', {
      schools
    })
  })

}
 