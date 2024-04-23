// version
var v = '/v1/'
var request = 'request-as-school/'
var claimed = 'school-claimed-and-nominate/'
var newInductionTutor = 'new-induction-tutor/'

module.exports = router => {

    // sign in to logged in user

    router.post(v + 'sign-in', (req, res) => {
        res.redirect(v + 'check-your-email')
    })

    // school sign up *** using folder 'request-as-school'

    router.post(v + request + 'whats-your-schools-local-authority', (req, res) => {
        res.redirect(v + request + 'whats-the-name-of-your-school')
    })

    router.post(v + request + 'whats-the-name-of-your-school', (req, res) => {
        res.redirect(v + request + 'confirm-this-is-your-school')
    })

    router.post(v + request + 'confirm-this-is-your-school', (req, res) => {
        res.redirect(v + request + 'check-your-school-email')
    })

    // end of school sign up ******************

    // nominate induction tutor *** using folder 'school-claimed-and-nominate'

    router.post(v + claimed + 'will-any-ects-start-induction', (req, res) => {
        if (req.session.data['nominate-how-to-continue'] === 'no') {
            res.redirect(v + claimed + 'your-info-has-been-saved')
        }
        else {
            res.redirect(v + claimed + 'nominate-induction-tutor')
        }
    })

    router.post(v + claimed + 'nominate-induction-tutor', (req, res) => {
        res.redirect(v + claimed + 'full-name-of-induction-tutor')
    })

    router.post(v + claimed + 'full-name-of-induction-tutor', (req, res) => {
        res.redirect(v + claimed + 'email-address-of-induction-tutor')
    })

    router.post(v + claimed + 'email-address-of-induction-tutor', (req, res) => {
        res.redirect(v + claimed + 'check-your-answers')
    })

    router.post(v + claimed + 'check-your-answers', (req, res) => {
        res.redirect(v + claimed + 'induction-tutor-nominated')
    })

    // end of nominate *********

    // induction tutor first joins service *** using folder 'new-induction-tutor

    router.get(v + newInductionTutor + 'not-ind-or-bo', (req, res) => {
        req.session.data.schoolType = null
        res.redirect(v + newInductionTutor + 'privacy-policy')
    })

    router.get(v + newInductionTutor + 'ind-school', (req, res) => {
        req.session.data.schoolType = 'indSchool'
        res.redirect(v + newInductionTutor + 'privacy-policy')
    })

    router.get(v + newInductionTutor + 'bo-school', (req, res) => {
        req.session.data.schoolType = 'boSchool'
        res.redirect(v + newInductionTutor + 'privacy-policy')
    })

    router.post(v + newInductionTutor + 'privacy-policy', (req, res) => {
        res.redirect(v + newInductionTutor + 'how-do-you-want-to-run-training')
    })

    router.post(v + newInductionTutor + 'how-do-you-want-to-run-training', (req, res) => {
        if (req.session.data['programme-choice'] === 'full_induction_programme') {
            res.redirect(v + newInductionTutor + 'confirm-your-training-programme')
        }
    })

    router.post(v + newInductionTutor + 'confirm-your-training-programme', (req, res) => {
        res.redirect(v + newInductionTutor + 'have-you-appointed-appropriate-body')
    })

    router.get(v + newInductionTutor + 'ab-not-ind-or-bo', (req, res) => {
        req.session.data['programme-choice'] = 'full_induction_programme'
        req.session.data.schoolType = null
        res.redirect(v + newInductionTutor + 'have-you-appointed-appropriate-body')
    })

    router.get(v + newInductionTutor + 'ab-ind-school', (req, res) => {
        req.session.data['programme-choice'] = 'full_induction_programme'
        req.session.data.schoolType = 'indSchool'
        res.redirect(v + newInductionTutor + 'have-you-appointed-appropriate-body')
    })

    router.get(v + newInductionTutor + 'ab-bo-school', (req, res) => {
        req.session.data['programme-choice'] = 'full_induction_programme'
        req.session.data.schoolType = 'boSchool'
        res.redirect(v + newInductionTutor + 'have-you-appointed-appropriate-body')
    })

    router.post(v + newInductionTutor + 'have-you-appointed-appropriate-body', (req, res) => {
        if (req.session.data['have-you-appointed'] === 'No') {
            res.redirect(v + newInductionTutor + 'no-appropriate-body')
        }
        else {
            res.redirect(v + newInductionTutor + 'appropriate-body-options')
        }
    })

    router.post(v + newInductionTutor + 'appropriate-body-options', (req, res) => {
        if (req.session.data['typeOfBody'] === "My appropriate body isn't listed"){
            res.redirect(v + newInductionTutor + 'ab-not-listed')
        }
        else {
            res.redirect(v + newInductionTutor + 'success-submitted-ab-and-training')
        }
    })

    // ignore these for now **** //

    // router.post(v + newInductionTutor + 'tell-us-if-new-ects-or-mentors', (req, res) => {
    //     res.redirect(v + newInductionTutor + 'will-any-ects-start')
    // })
    //
    // router.post(v + newInductionTutor + 'will-any-ects-start', (req, res) => {
    //     if (req.session.data['expect-any-ects'] === 'no') {
    //         res.redirect(v + newInductionTutor + '')
    //     }
    //     else {
    //         res.redirect(v + newInductionTutor + '')
    //     }
    // })

    // ** end of ignore **

}
