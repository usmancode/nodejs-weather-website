const request = require('request')
const Joi=require('@hapi/joi')

const schema=Joi.object({
    address:Joi.string().pattern(new RegExp('^[a-zA-Z]'))
})


const geocode = (address, callback) => {
    const{error,value}=schema.validate({address:address})
   if(!error){
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZGV2dXNtYW4iLCJhIjoiY2s4eXpzOG1tMWN0cjNpczdpdGFnbTBzYiJ9.cxGhkFMbzp_Gj7lUTfH_hA&limit=1'

        request({ url, json: true }, (error, { body }) => {

            if (error) {
                callback('Unable to connect', undefined)
            } else if (body.features == undefined) {
                callback('Try with different location')
            } else if (body.features.length === 0) {
                callback('Unable to find the given location,try different location')
            } else {
                callback(null, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
        })

     

}
else{
    
    callback(error.details[0].message)
}

}



module.exports = geocode  
