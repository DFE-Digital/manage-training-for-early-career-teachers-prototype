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

    router.post('/delivery-partner/select-academic-year',(req,res) => {
        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        } else {
            res.redirect('select-new-delivery-partner')
        }       
    })

    router.post('/delivery-partner/select-new-delivery-partner',(req,res) => {
        if (req.query.returnUrl) {
            res.redirect(req.query.returnUrl)    
        } else {
            res.redirect('check-answers-delivery-partner')
        }       
    })

    // Great snippet for random item on clicking a link
    router.get('/home', function(request, response){
        
        var providers = request.session.data['allProviders']
        var provider = providers[Math.round(Math.random()*2)]
        response.locals.data.provider = provider
        request.session.data.provider = provider
        response.render('home')
        console.log('test')
      })


}