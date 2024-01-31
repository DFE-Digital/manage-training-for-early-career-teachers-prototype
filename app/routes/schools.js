const _ = require('lodash')

module.exports = router => {

  //Add Programme Type filter
  router.get('/admin', (req, res) => {
    let schools = req.session.data.schools


    let selectedProgrammeType = _.get(req.session.data.filters, 'programmeType')
    let selectedFilters = {
      categories: []
    }


    if(_.get(selectedProgrammeType, 'length')){
      schools  = schools.filter(schools => {
        let matchesProgrammeType = true

        if(_.get(selectedProgrammeType, 'length')) {
          matchesProgrammeType = selectedProgrammeType.includes(schools.programmeType);
        }

        return matchesProgrammeType
      })

      selectedFilters.categories.push({
        heading: {text: 'Programme Type'},
        items: selectedProgrammeType.map(label => {
          return{
            text: label,
            href: `/admin/remove-status/${label}` 
          }
        })
      })
      
    }
    res.render('admin/schools', {
      schools,
      selectedFilters
    })
  })

  //Clear Programme type filter
  router.get('/admin/remove-status/:programmeType', (req, res) => {
    _.set(req, 'session.data.filters.programmeType', _.pull(req.session.data.filters.programmeType, req.params.programmeType))
    res.redirect('/admin')
  })

  // PAss school name dynamically to individual school page
  router.get('/schools/:schoolId', (req, res) => {
    let schools = req.session.data.schools.find(schools => schools.id === req.params.schoolId)

    res.render('/admin/schools/show', {
      schools
    })
  })

}
 