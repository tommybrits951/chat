async function upperCaseNames(req, res, next) {
    const { firstName, lastName } = req.body
    let first = firstName.split("")
    let last = lastName.split("")
    first[0] = first[0].toUpperCase()
    let tmpFirst = ""
    first.map(sym => tmpFirst += sym)
    last[0] = last[0].toUpperCase()
    let tmpLast = ""
    last.map(sym => tmpLast += sym)
    req.body.firstName = tmpFirst
    req.body.lastName = tmpLast
    next()
}


module.exports = upperCaseNames