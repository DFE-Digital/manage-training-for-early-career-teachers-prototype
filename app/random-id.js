module.exports.randomId = () => {
  const letters = Math.random().toString(36).slice(2,5).toUpperCase()
  const numbers = Math.floor(Math.random() * 100000).toString().slice(0,3)

  return letters + numbers
}
