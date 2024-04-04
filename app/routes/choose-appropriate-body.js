module.exports = router => {

    //Change DELIVERY PARTNER participant routes

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


}