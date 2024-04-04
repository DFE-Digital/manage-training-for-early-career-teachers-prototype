//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


require('./routes/early-career-teachers')(router)
require('./routes/mentors')(router)
require('./routes/admin')(router)

require('./routes/schools')(router)
require('./routes/lead-provider')(router)
require('./routes/delivery-partner')(router)
require('./routes/programme-academic-year')(router)

require('./routes/choose-appropriate-body')(router)

router.get('/home', (req, res) => {

  const ectsWithoutMentors = 4;

  res.render('home', {
    ectsWithoutMentors
  })
});
