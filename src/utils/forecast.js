const request=require('request')


const forecast=(longitude,latitude,callback)=>{
    url='http://api.weatherstack.com/current?access_key=a22e4c09749e18b8417c90518ae288f7&query='+latitude+','+longitude
   
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect weather service please try later',undefined)
        }else if(body.error){
            callback('unable to find',undefined)
        }else{
            callback(undefined,{
                temprature:body.current.temperature,
                feelslike:body.current.feelslike,
                weather_descriptions:body.current.weather_descriptions[0],
                observation_time:body.current.observation_time

            })
        }

    })

 
}


module.exports=forecast