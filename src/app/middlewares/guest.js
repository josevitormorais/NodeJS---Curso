module.exports = (req, res, next) =>{
  if( req.session && !req.session.session){
    return next()
  }

  return res.redirect('/app/dashboard')
}
