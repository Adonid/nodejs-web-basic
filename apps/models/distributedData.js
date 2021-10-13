const {distributed_data} = require('../../models')

/** LAY DANH SACH TAT CA CAC DU LIEU PHAN TAN
 * 
 * @param none
 * 
 * @return array [{'id', 'type', 'content'}]
*/
const getDistributedDatas = async (obj={}) => {
    try {
        const data = await distributed_data.findAll({
            attributes: ['id', 'type', 'content'],
            where: obj
        })
        // console.log(data)
        return data
    } catch (error) {
        console.log(error)
        return false
    }
}

/** LAY 1 DU LIEU PHAN TAN THEO CAC TRUONG
 * 
 * @param obj options
 * 
 * @return boolean or OBJECT
*/
const getDistributedData = async obj => {
    try {
        const data = await distributed_data.findOne({
            attributes: ['id', 'type','content'],
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

/** TAO MOI DU LIEU PHAN TAN
 * 
 * @param {type, imageId, color} = payload 
 * 
 * @returns boolean
 */
 const createDistributedData = async (payload) => {
    const obj = await distributed_data.create(payload)
    .then(obj => {
        return obj?true:false
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return obj
}

/** CAP NHAT FIELD(s) TRONG BANG TAG
 * 
 * @param {value, index}
 * @return {array | false}
 */
 const updateDistributedData = async (value, index) => {
    const data = await distributed_data.update(value, {
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
    return data
}

/** XOA 1 TAG NGOAI TRU CAT DAU TIEN - MAC DINH
 * 
 * @param {id}
 * @return {array | false}
 */
 const deleteDistributedData = async (id) => {
    const resuft = await distributed_data.destroy({
        where: {id}
    })
    .catch(err => {
        console.log(err)
        return false
    })
    return resuft
}

module.exports={
    getDistributedDatas,
    getDistributedData,
    createDistributedData,
    updateDistributedData,
    deleteDistributedData
}