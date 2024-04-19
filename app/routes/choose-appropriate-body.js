module.exports = router => {

    ///////////////   Choose APPROPRIATE BODY routes  /////////////////////////

    router.post('/registration',(req,res) => {
        if (req.body.whichABJourney) {
            res.redirect('/registration/choose-appropriate-body/have-you-appointed-appropriate-body')      
        }
                
    })

    router.post('/registration/choose-appropriate-body/have-you-appointed-appropriate-body',(req,res) => {
        if (req.body.appointedAB == 'Yes') {
            res.redirect('/registration/choose-appropriate-body/approproate-body-options')
        }
        else{
            res.redirect('/registration/choose-appropriate-body/no-appropriate-body')      
        }
                
    })

    router.post('/registration/choose-appropriate-body/approproate-body-options',(req,res) => {
        if (req.body.tshOrIStip == 'My appropriate body isn\'t listed') {
            res.redirect('/registration/choose-appropriate-body/ab-not-listed')
        }
        else {
            res.redirect('/registration/choose-appropriate-body/success-submitted-ab-and-training')
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
