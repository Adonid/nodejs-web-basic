const {editorValidation} = require('../validator')

const verifyEmailEditor = async (req, res, next) => {
    const errors = await editorValidation.isValidEmailEditor(req)
    if(errors){
        res.status(errors.code).send(errors)
        return next('route')
    }
    return next()
}

module.exports={
    verifyEmailEditor
}