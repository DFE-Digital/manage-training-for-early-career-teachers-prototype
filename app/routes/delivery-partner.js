module.exports = router => {

    //Change DELIVERY PARTNER participant routes

    router.post('/delivery-partner/notified-dp-and-lp',(req,res) => {
        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        }
        else if (req.body.notified.deliveryAndLeadProvider == 'Yes') {
            res.redirect('select-academic-year')    
        }
        else {
            res.redirect('what-to-do-next')    
        }       
    })

    router.post('/delivery-partner/new-delivery-partner',(req,res) => {
        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        } else {
            res.redirect('check-answers-delivery-partner')
        }       
    })


}