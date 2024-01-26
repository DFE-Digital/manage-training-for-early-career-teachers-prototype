module.exports = router => {

  router.get('/schools/:schoolId', (req, res) => {
    let school = req.session.data.schools.find(school => schools.id === req.params.schoolId)

    res.render('schools/show', {
      schools
    })
  })

}
 