module.exports = router => {

    ///////////////   Choose APPROPRIATE BODY routes  /////////////////////////

    router.post('/registration/choose-appropriate-body/appointed-appropriate-body',(req,res) => {
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
            res.redirect('istip-or-teaching-school-hub')    
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
            res.redirect('teaching-school-hub-or-new-appropriate-body')    
        }
        else {
            res.redirect('teaching-school-hub-only')    
        }   
    })


}