const _ = require('lodash')

module.exports = router => {

  router.get('/admin', (req, res) => {
    let schools = req.session.data.schools  


    let selectedProgrammeFilters = _.get(req.session.data.filters, 'programme')
    let selectedSchoolTypeFilters = _.get(req.session.data.filters, 'schoolType')

    let hasFilters = _.get(selectedProgrammeFilters, 'length') || _.get(selectedSchoolTypeFilters, 'length')

    let selectedFilters = {
      categories: []
    }

    // the user has selected a status filter
    if(hasFilters) {
      schools = schools.filter(school => {
        let matchesProgrammeType = true
        let matchesSchoolType = true

        if(_.get(selectedProgrammeFilters, 'length')) {
          matchesProgrammeType = selectedProgrammeFilters.includes(school.programmeType);
        }

        if(_.get(selectedSchoolTypeFilters, 'length')) {
          matchesSchoolType = selectedSchoolTypeFilters.includes(school.phase);
        }

        return matchesProgrammeType && matchesSchoolType
      })
    }

    if(_.get(selectedProgrammeFilters, 'length')) {
      selectedFilters.categories.push({
        heading: { text: 'Programme type' },
        items: selectedProgrammeFilters.map(label => {
          return {
            text: label,
            href: `/admin/remove-programme/${label}`
          }
        })
      })
    }

    if(_.get(selectedSchoolTypeFilters, 'length')) {
      selectedFilters.categories.push({
        heading: { text: 'Type of school' },
        items: selectedSchoolTypeFilters.map(label => {
          return {
            text: label,
            href: `/admin/remove-phase/${label}`
          }
        })
      })
    }


    res.render('admin/schools', {
      schools,
      selectedFilters
    })
  })


router.get('/admin/remove-programme/:programme', (req, res) => {

    // console.log(req.session.data.filters.programme)

    _.set(req, 'session.data.filters?.programme', _.pull(req.session.data.filters?.programme, req.params.programme))
    res.redirect('/admin')
  })

  router.get('/admin/remove-phase/:phase', (req, res) => {
    _.set(req, 'session.data.filters?.phase', _.pull(req.session.data.filters?.phase, req.params.phase))
    res.redirect('/admin')
  })

  router.get('/admin/clear-filters', (req, res) => {
    _.set(req, 'session.data.filters.st', null)
    _.set(req, 'session.data.filters.phase', null)
    res.redirect('/admin')
  })

  router.get('/schools/:schoolsId', (req, res) => {
    let schools = req.session.data.schools.find(school => school.id === req.params.schoolsId)

    res.render('schools/show', {
      school
    })
  })




}