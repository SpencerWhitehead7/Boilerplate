const router = require(`express`).Router()
const tokenApiRoute = require(`./tokenApiRoute`)

router.use(`/tokenApiRoute`, tokenApiRoute)

router.use((req, res, next) => {
  const err = new Error(`Route Not Found`)
  err.status = 404
  next(err)
})

module.exports = router
