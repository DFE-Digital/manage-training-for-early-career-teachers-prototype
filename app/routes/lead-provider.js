module.exports = router => {



    router.post('/lead-provider/change-lp-for',(req,res) => {
        if (req.body.change.leadProvFor == 'Participant') {
            res.redirect('/lead-provider/contacted-lead-provider')    
        } else {
            res.redirect('/lead-provider/agreed-change-existing-provider')    
        }
    })

    router.post('/lead-provider/participant-email',(req,res) => {

        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        } else {
            res.redirect('contacted-lead-provider')    
        }       
    })

    router.post('/lead-provider/contacted-lead-provider',(req,res) => {
        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        } else {
            res.redirect('/lead-provider/new-lead-provider')
        }       
    })

    router.post('/lead-provider/new-lead-provider',(req,res) => {
        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        } else {
            res.redirect('/lead-provider/check-participant')
        }       
    })
}