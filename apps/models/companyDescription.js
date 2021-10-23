const {company_description, colors, icons} = require('../../models')

/** LAY DANH SACH TAT CA CAC MO TA TRANG
 * 
 * @param none
 * 
 * @return array [{'id', 'name', 'color', icon, description}]
*/
const getCompanysDescription = async () => {
    try {
        const description = await company_description.findAll({
            attributes: ['id', 'name', 'description'],
            include: [
                {
                    model: colors,
                    attributes: ['name', 'alias', 'code']
                },
                
                {
                    model: icons,
                    attributes: ['label', 'icon', 'alias']
                }
                
            ],
        })
        // console.log(description)
        return description
    } catch (error) {
        console.log(error)
        return false
    }
}

/** LAY 1 MO TA TRANG THEO CAC TRUONG
 * 
 * @param obj options
 * 
 * @return boolean or OBJECT
*/
const getCompanyDescription = async obj => {
    try {
        const data = await company_description.findOne({
            attributes: ['id', 'name'],
            include: [
                {
                    model: colors,
                    attributes: ['name', 'alias', 'code']
                },
                
                {
                    model: icons,
                    attributes: ['label', 'icon', 'alias']
                }
                
            ],
            where: obj
        })
        // console.log(data)
        // return data ? data.dataValues : false
        return data?data.dataValues:false
    } catch (error) {
        console.log(error)
        return false
    }
}

/** TAO MOI MO TA TRANG
 * 
 * @param {name, imageId, color} = payload 
 * 
 * @returns boolean
 */
 const createCompanyDescription = async (payload) => {
    const description = await company_description.create(payload)
    .then(description => {
        return description?true:false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return description
}

/** CAP NHAT FIELD(s) TRONG BANG TAG
 * 
 * @param {value, index}
 * @return {array | false}
 */
 const updateCompanyDescription = async (value, index) => {
    const description = await company_description.update(value, {
        where: index    
    })
    .then( data => {
        // console.log(data)
        return data||false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return description
}

/** XOA 1 TAG NGOAI TRU CAT DAU TIEN - MAC DINH
 * 
 * @param {id}
 * @return {array | false}
 */
 const deleteCompanyDescription = async (id) => {
    const resuft = await company_description.destroy({
        where: {id}
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return resuft
}

module.exports={
    getCompanysDescription,
    getCompanyDescription,
    createCompanyDescription,
    updateCompanyDescription,
    deleteCompanyDescription
}