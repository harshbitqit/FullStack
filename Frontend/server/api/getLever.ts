import axios, {AxiosError} from 'axios'

export default defineEventHandler(async (event) => {

    const {leverKeyValue} =  getQuery(event);
    
    const apiUrl= "https://api.sandbox.lever.co/v1/users"
    return axios.get(apiUrl, 
          { auth: {
            username: `${leverKeyValue}`,
            password: ""
          },

        
        }).then((r) => {
            console.log(r)
        return r.data.data;
    }).catch(e=>{
        console.log(e);
    });
  })
 
    


  
