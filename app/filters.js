const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter


function numberFormat (number) {
  return Intl.NumberFormat('en-US').format(number)
}

function includes (array, item) {
  return array.includes(item)
}

function termName (dateString) {

  const date = new Date(dateString)

  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const monthNames = ["January","February","March","April","May","June","July", "August","September","October","November","December"]

  if (day === 1 && month === 9) {
    return `Autumn term ${year}`
  } else if (day === 1 && month === 1) {
    return `Spring term ${year}`
  } else if (day === 1 && month === 4) {
    return `Summer term ${year}`
  } else {
    return `${day} ${monthNames[month - 1]} ${year}`
  }
}

// Add your filters here
addFilter('statusColour', status => {
  switch(status) {
    case 'FIP':
      return 'govuk-tag--yellow'
    case 'CIP':
      return 'govuk-tag--red'
    case 'DIY':
      return 'govuk-tag--green'
    case 'Self funded DIY':
      return 'govuk-tag--green'
    case 'No programme':
      return 'govuk-tag--grey'
  }
})

addFilter('includes', includes)
addFilter('termName', termName)
addFilter('numberFormat', numberFormat)
