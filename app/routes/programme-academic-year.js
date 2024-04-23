module.exports = router => {

    /////////// Change PROGRAMME ACADEMIC YEAR routes 

    router.post('/programme-academic-year/change-programme-for',(req,res) => {
        if (req.body.change.programmeFor == 'Participant') {
            res.redirect('/programme-academic-year/change-programme-participant')    
        } else {
            res.redirect('/programme-academic-year/agreed-programme-change-with-providers') 
        }
    })

    router.post('/programme-academic-year/agreed-programme-change-with-providers',(req,res) => {
        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        }
        else if (req.body.agreedWith.providers == 'Yes') {
            res.redirect('select-new-programme')   
        }
        else {
            res.redirect('contact-existing-providers')    
        }
    })


    router.post('/programme-academic-year/select-new-programme',(req,res) => {
        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        } else {
            res.redirect('select-academic-year')
        }       
    })


    router.post('/programme-academic-year/select-academic-year',(req,res) => {
        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        } else {
            res.redirect('check-answers-change-programme')
        }       
    })


}