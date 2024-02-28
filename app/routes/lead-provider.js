module.exports = router => {

    router.post('/lead-provider/change/change-lead-provider',(req,res) => {
        res.redirect('participant/participant-email')
    })

    router.post('/lead-provider/change/participant/participant-email',(req,res) => {
        res.redirect('contacted-lead-provider')
    })

    router.post('/lead-provider/change/participant/contacted-lead-provider',(req,res) => {
        res.redirect('new-lead-provider')
    })

    router.post('/lead-provider/change/participant/new-lead-provider',(req,res) => {
        res.redirect('check-participant')
    })
}