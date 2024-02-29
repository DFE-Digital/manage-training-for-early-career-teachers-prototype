module.exports = router => {

    router.post('/lead-provider/change-lp-for',(req,res) => {
        res.redirect('/lead-provider/contacted-lead-provider')
    })

    router.post('/lead-provider/participant-email',(req,res) => {
        res.redirect('contacted-lead-provider')
    })

    router.post('/lead-provider/contacted-lead-provider',(req,res) => {
        res.redirect('/lead-provider/new-lead-provider')
    })

    router.post('/lead-provider/new-lead-provider',(req,res) => {
        res.redirect('/lead-provider/check-participant')
    })
}