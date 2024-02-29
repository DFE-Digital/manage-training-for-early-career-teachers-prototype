module.exports = router => {

    router.post('/lead-provider/change-lp-for',(req,res) => {
        res.redirect('/lead-provider/contacted-lead-provider')
    })

    router.post('/lead-provider/participant-email',(req,res) => {

        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        } else {
            res.redirect('contacted-lead-provider')    
        }       

    })

    router.post('/lead-provider/contacted-lead-provider',(req,res) => {
        res.redirect('/lead-provider/new-lead-provider')
    })

    router.post('/lead-provider/new-lead-provider',(req,res) => {
        res.redirect('/lead-provider/check-participant')
    })
}