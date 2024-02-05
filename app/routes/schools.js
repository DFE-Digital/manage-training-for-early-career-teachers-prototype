const _ = require('lodash')

module.exports = router => {

  router.get('/admin', (req, res) => {
    let schools = req.session.data.schools  


    //Serach bar code here
    let schoolName = _.get(req.session.data.search, 'schoolName')

    if(schoolName) {
      schools = schools.filter(schools => {
        return schools.name.indexOf(schoolName) > -1
      })
    }



    //Filters code starts here
    let selectedProgrammeFilters = _.get(req.session.data.filters, 'programme')
    let selectedSchoolTypeFilters = _.get(req.session.data.filters, 'schoolType')
    let selectedYearFilters = _.get(req.session.data.filters, 'year')

    let hasFilters = _.get(selectedProgrammeFilters, 'length') || _.get(selectedSchoolTypeFilters, 'length') || _.get(selectedYearFilters, 'length')

    let selectedFilters = {
      categories: []
    }

    // the user has selected a status filter
    if(hasFilters) {
      schools = schools.filter(school => {
        let matchesProgrammeType = true
        let matchesSchoolType = true
        let matchesYear = true

        if(_.get(selectedProgrammeFilters, 'length')) {
          matchesProgrammeType = selectedProgrammeFilters.includes(school.programmeType);
        }

        if(_.get(selectedSchoolTypeFilters, 'length')) {
          matchesSchoolType = selectedSchoolTypeFilters.includes(school.schoolType);
        }

        if(_.get(selectedYearFilters, 'length')) {
          matchesYear = selectedYearFilters.includes(school.year);
        }

        return matchesProgrammeType && matchesSchoolType && matchesYear
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

    if(_.get(selectedYearFilters, 'length')) {
      selectedFilters.categories.push({
        heading: { text: 'Year' },
        items: selectedYearFilters.map(label => {
          return {
            text: label,
            href: `/admin/remove-year/${label}`
          }
        })
      })
    }


    res.render('admin/schools', {
      schools,
      selectedFilters
    })
  })

  router.get('/schools/clear-search', (req, res) => {
    _.set(req, 'session.data.search.schoolName', '')
    res.redirect('/admin')
  })

  router.get('/admin/remove-year/:year', (req, res) => {
    // console.log(req.session.data.filters.year)
    _.set(req, 'session.data.filters?.year', _.pull(req.session.data.filters?.year, req.params.year))
    res.redirect('/admin')
  })


  router.get('/admin/remove-programme/:programme', (req, res) => {
    // console.log(req.session.data.filters.programme)
    _.set(req, 'session.data.filters?.programme', _.pull(req.session.data.filters?.programme, req.params.programme))
    res.redirect('/admin')
  })

  router.get('/admin/remove-phase/:phase', (req, res) => {
    _.set(req, 'session.data.filters?.schoolType', _.pull(req.session.data.filters?.schoolType, req.params.schoolType))
    res.redirect('/admin')
  })

  router.get('/admin/clear-filters', (req, res) => {
    _.set(req, 'session.data.filters.st', null)
    _.set(req, 'session.data.filters.phase', null)
    res.redirect('/admin')
  })

  router.get('/schools/:schoolsId', (req, res) => {
    let school = req.session.data.schools.find(school => school.id === req.params.schoolsId)

    res.render('schools/show', {
      school
    })
  })




}