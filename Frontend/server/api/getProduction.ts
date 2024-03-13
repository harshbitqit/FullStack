import axios, {AxiosError} from 'axios'

export default defineEventHandler(async (event) => {

    const {leverKeyValue} =  getQuery(event)

    console.log(leverKeyValue);
    

    return axios.get("https://api.lever.co/v1/users", 
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
