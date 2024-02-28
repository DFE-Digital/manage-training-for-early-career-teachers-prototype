module.exports = router => {

    router.post('/lead-provider/change/change-lead-provider',(req,res) => {
        res.redirect('participant/participant-email')
    })

    router.post('/lead-provider/change/participant/participant-email',(req,res) => {
        res.redirect('participant/contacted-lead-provider')
    })
}