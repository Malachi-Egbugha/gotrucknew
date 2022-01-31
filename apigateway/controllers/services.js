const fs = require('fs');
const axios = require('axios');
exports.allservices = async (req,res)=>{
  try {
   
        
        /*
    if(registry.services[req.params.apiName]){
    registry.services[req.params.apiName].forEach(async (instance) => {
    const rurl = instance.url + req.params.path;
    var data = req.body;
    var rmethod = req.method;
    var rheaders = req.headers
    var data = req.body;
    var config = {
      method: rmethod,
      url: rurl,
      headers: rheaders,
      data : data
    };
    try{
    const response = await axios(config);
    res.send(response.data);
    }
    catch(error){
        console.log(error);
    }
    
    
    })
    
    
       
    }else{
        res.send("API name doesn't exist")
    }
    
    */
    
  } catch (err) {
    res.json({ msg: "Please Contact Administrator", status: false });
  }

}

exports.register = async (req,res)=>{
    try {
        const registrationInfo = req.body;
    registrationInfo.url = registrationInfo.protocol + "://" + registrationInfo.host + ":" + registrationInfo.port + "/";
    if(registry.services.hasOwnProperty(registrationInfo.apiName))
    {
        if(apiAlreadyExists(registrationInfo)){
            //return already exist
            res.send("Configuration already exist for" + registrationInfo.apiName + "at" + registrationInfo.host + ":" + registrationInfo.port);
        }
        else{
        registry.services[registrationInfo.apiName].push({...registrationInfo});
        fs.writeFile('./routes/registry.json',JSON.stringify(registry),(error)=>{
            if(error){
                res.send('could not registered' + ' ' + registrationInfo.apiName + '\n' + error)
            }
            else{
                res.send('Successfully registered' + ' ' + registrationInfo.apiName);
            }
    
        })
        }

    }
    else{
        registry.services[registrationInfo.apiName] = [];
        registry.services[registrationInfo.apiName].push({...registrationInfo});
        fs.writeFile('./routes/registry.json',JSON.stringify(registry),(error)=>{
            if(error){
                res.send('could not registered' + registrationInfo.apiName + '\n' + error)
            }
            else{
                res.send('Successfully registered' + registrationInfo.apiName);
            }
    
        })

    }
  
      
    } catch (err) {
      res.json({ msg: "Please Contact Administrator", status: false });
    }
  
  }



  const apiAlreadyExists = (registrationInfo) =>{
    let exists = false;
    registry.services[registrationInfo.apiName].forEach(instance => {
        console.log(instance);
        console.log(registrationInfo);
        if(instance.url === registrationInfo.url){
            exists = true;
            
            return

        }
    })
    return exists
}