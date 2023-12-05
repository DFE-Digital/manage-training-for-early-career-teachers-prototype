//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


require('./routes/early-career-teachers')(router)
require('./routes/mentors')(router)
require('./routes/admin')(router)
