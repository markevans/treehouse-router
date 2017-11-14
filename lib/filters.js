const emptyStringToNull = {
  filter: a => a === '' ? null : a,
  unfilter: a => a === null ? '' : a
}

module.exports = {
  emptyStringToNull
}
