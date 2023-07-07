const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter



function includes (array, item) {

  return array.includes(item)
}

addFilter('includes', includes)
