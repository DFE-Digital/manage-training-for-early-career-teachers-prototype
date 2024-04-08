module.exports = router => {

    ///////////////   Choose APPROPRIATE BODY routes  /////////////////////////

    router.post('/registration/choose-appropriate-body/have-you-appointed-appropriate-body',(req,res) => {
        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        }
        else if (req.body.appointedAB == 'Yes') {
            res.redirect('independent-school')    
        }
        else {
            res.redirect('no-appropriate-body')    
        }   
    })

    router.post('/registration/choose-appropriate-body/independent-school',(req,res) => {
        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        }
        else if (req.body.iStipOrTeachingSchoolHub == 'Yes') {
            res.redirect('choose-teaching-school-hub-or-istip.html')    
        }
        else {
            res.redirect('british-school-overseas')    
        }   
    })


    router.post('/registration/choose-appropriate-body/british-school-overseas',(req,res) => {
        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        }
        else if (req.body.britSchoolOverseas == 'Yes') {
            res.redirect('choose-new-ab-or-teaching-school-hub')    
        }
        else {
            res.redirect('teaching-school-hub-only')    
        }   
    })

    router.post('/registration/choose-appropriate-body/choose-teaching-school-hub-or-istip',(req,res) => {
        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        }
        else if (req.body.tshOnly == 'Teaching school hub (TSH)') {
            res.redirect('which-teaching-school-hub')    
        }
        else {
            res.redirect('check-answers-choose-appropriate-body')    
        }   
    })

    router.post('/registration/choose-appropriate-body/teaching-school-hub-only',(req,res) => {
        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        }
        else {
            res.redirect('check-answers-choose-appropriate-body')    
        }   
    })


}
