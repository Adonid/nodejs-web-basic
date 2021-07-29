const {DistributedData} = require('../../models')

/** LAY DANH SACH TAT CA CAC DU LIEU PHAN TAN
 * 
 * @param none
 * 
 * @return array [{'id', 'type', 'content'}]
*/
const getDistributedDatas = async () => {
    try {
        const data = await DistributedData.findAll({
            attributes: ['id', 'type', 'content']
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
        const data = await DistributedData.findOne({
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
    const description = await DistributedData.create(payload)
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
 const updateDistributedData = async (value, index) => {
    const description = await DistributedData.update(value, {
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
 const deleteDistributedData = async (id) => {
    const resuft = await DistributedData.destroy({
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