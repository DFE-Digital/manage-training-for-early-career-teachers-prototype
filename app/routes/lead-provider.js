module.exports = router => {

    //Change LP PARTICIPANT routes

    router.post('/lead-provider/change-lp-for',(req,res) => {
        if (req.body.change.leadProvFor == 'Participant') {
            res.redirect('/lead-provider/participant/agreed-change-existing-provider')    
        } else {
            res.redirect('/lead-provider/academic-year/agreed-change-existing-provider')    
        }
    })
    

    router.post('/lead-provider/participant/agreed-change-existing-provider',(req,res) => {
        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        }
        else if (req.body.agreedWithParticipant.providers == 'Yes') {
            res.redirect('already-contacted-lead-provider')    
        }
        else {
            res.redirect('contact-existing-providers')    
        }
    })

    router.post('/lead-provider/participant/already-contacted-lead-provider',(req,res) => {
        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        }
        else if (req.body.contacted.leadProvider == 'Yes') {
            res.redirect('participant-email')    
        }
        else {
            res.redirect('what-to-do-next')    
        }     
    })

    router.post('/lead-provider/participant/participant-email',(req,res) => {

        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        } else {
            res.redirect('new-lead-provider')    
        }       
    })

 

    router.post('/lead-provider/participant/new-lead-provider',(req,res) => {
        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        } else {
            res.redirect('check-participant')
        }       
    })



    /////////// Change LP ACADEMIC YEAR routes 

    router.post('/lead-provider/academic-year/agreed-change-existing-provider',(req,res) => {
        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        }
        else if (req.body.agreedWith.providers == 'Yes') {
            res.redirect('already-contacted-lead-provider')    
        }
        else {
            res.redirect('contact-existing-providers')    
        }
    })




    router.post('/lead-provider/academic-year/already-contacted-lead-provider',(req,res) => {
        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        }
        else if (req.body.contacted.leadProvider == 'Yes') {
            res.redirect('new-lead-provider')    
        }
        else {
            res.redirect('what-to-do-next')    
        }     
    })

    router.post('/lead-provider/academic-year/new-lead-provider',(req,res) => {
        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        } else {
            res.redirect('check-answers-academic-year')
        }
    })

    
    


}