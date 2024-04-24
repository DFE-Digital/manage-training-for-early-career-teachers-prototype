// version
var v = '/v2/'
var request = 'request-as-school/'
var claimed = 'school-claimed-and-nominate/'
var newInductionTutor = 'new-induction-tutor/'
var inductionTutor = 'induction-tutor/'

module.exports = router => {

    // wizard proto start

    router.post(v + 'wizard', (req, res) => {
        if (req.body.selectProtoJourney === 'existingUserPreviousFIP' && !req.body.previousFIPPartnerChange) {
            res.render(v + 'wizard', { error: 'yes' });
        }
        else if (req.body.selectProtoJourney) {
            if (req.body.selectProtoJourney === 'newUser'){
                req.session.data['newUser'] = 'yes'
                req.session.data['previous-programme'] = 'no'
            }
            else if (req.body.selectProtoJourney === 'existingUserNoProgramme'){
                req.session.data['previous-programme'] = 'no'
            }
            else if (req.body.selectProtoJourney === 'existingUserPreviousFIP'){
                req.session.data['previous-programme'] = 'yes-fip'
                if (req.body.previousFIPPartnerChange === 'yes') {
                    req.session.data['partner-change'] = 'yes'
                }
                else {
                    req.session.data['partner-change'] = 'no'
                }
            }
            else if (req.body.selectProtoJourney === 'existingUserPreviousCIP'){
                req.session.data['previous-programme'] = 'yes-cip'
            }
            else if (req.body.selectProtoJourney === 'existingUserPreviousDIY'){
                req.session.data['previous-programme'] = 'yes-diy'
            }
            res.redirect(v + 'index')
        }
        else {
            res.render(v + 'wizard', { error: 'yes' });
        }
    })

    // sign in to logged in user

    router.post(v + 'sign-in', (req, res) => {
        res.redirect(v + 'check-your-email')
    })

    router.get(v + 'sign-in-continue', (req, res) => {
        if (req.session.data['previous-programme'] === 'no') {
            res.redirect(v + newInductionTutor + 'privacy-policy')
        }
        if (req.session.data['previous-programme'] === 'yes-fip') {
            res.redirect(v + inductionTutor + 'tell-us-if-new-ects-or-mentors')
        }
        else {
            res.redirect(v + 'signed-in/home')
        }
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
        res.redirect(v + newInductionTutor + 'confirm-your-training-programme')
    })

    router.post(v + newInductionTutor + 'confirm-your-training-programme', (req, res) => {
        if (req.session.data['programme-choice'] === 'design_our_own') {
            res.redirect(v + newInductionTutor + 'success-submitted-ab-and-training')
        }
        else {
            res.redirect(v + newInductionTutor + 'have-you-appointed-appropriate-body')
        }
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

    // induction tutor logging in for registration -- previous programme **

    router.post(v + inductionTutor + 'tell-us-if-new-ects-or-mentors', (req, res) => {
        res.redirect(v + inductionTutor + 'will-any-ects-start')
    })

    router.post(v + inductionTutor + 'will-any-ects-start', (req, res) => {
        if (req.session.data['expect-any-ects'] === 'no') {
            res.redirect(v + inductionTutor + 'your-info-has-been-saved')
        }
        else {
            if (req.session.data['partner-change'] === 'yes') {
                res.redirect(v + inductionTutor + 'relationship-between-lp-and-dp-changed')
            }
            else {
                res.redirect(v + inductionTutor + 'use-same-lp-and-dp')
            }
        }
    })

    router.post(v + inductionTutor + 'relationship-between-lp-and-dp-changed', (req, res) => {
        res.redirect(v + inductionTutor + 'what-changes-would-you-like-to-make')
    })

    router.post(v + inductionTutor + 'what-changes-would-you-like-to-make', (req, res) => {
        if (req.session.data['what-changes'] === 'change_to_design_our_own') {
            req.session.data['programme-choice'] = 'design_our_own'
        }
        else if (req.session.data['what-changes'] === 'change_to_core_induction_programme') {
            req.session.data['programme-choice'] = 'core_induction_programme'
        }
        else {
            req.session.data['programme-choice'] = 'full_induction_programme'
        }

        if (req.session.data['what-changes'] === 'change_lead_provider') {
            res.redirect(v + inductionTutor + 'you-are-going-to-form-a-new-partnership')
        }
        else {
            res.redirect(v + inductionTutor + 'confirm-your-training-programme')
        }
    })

    router.post(v + inductionTutor + 'confirm-your-training-programme', (req, res) => {
        if (req.session.data['programme-choice'] === 'design_our_own') {
            res.redirect(v + inductionTutor + 'success-submitted-ab-and-training')
        }
        else {
            res.redirect(v + inductionTutor + 'have-you-appointed-appropriate-body')
        }
    })

    router.post(v + inductionTutor + 'you-are-going-to-form-a-new-partnership', (req, res) => {
        res.redirect(v + inductionTutor + 'have-you-appointed-appropriate-body')
    })

    router.post(v + inductionTutor + 'use-same-lp-and-dp', (req, res) => {
        req.session.data['programme-choice'] === 'full_induction_programme'
        res.redirect(v + inductionTutor + 'have-you-appointed-appropriate-body')
    })

    router.post(v + inductionTutor + 'have-you-appointed-appropriate-body', (req, res) => {
        if (req.session.data['have-you-appointed'] === 'No') {
            res.redirect(v + inductionTutor + 'no-appropriate-body')
        }
        else {
            res.redirect(v + inductionTutor + 'appropriate-body-options')
        }
    })

    router.post(v + inductionTutor + 'appropriate-body-options', (req, res) => {
        if (req.session.data['typeOfBody'] === "My appropriate body isn't listed"){
            res.redirect(v + inductionTutor + 'ab-not-listed')
        }
        else {
            res.redirect(v + inductionTutor + 'success-submitted-ab-and-training')
        }
    })

    // end of induction tutor **
}
