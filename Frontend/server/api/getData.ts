import axios, {AxiosError} from 'axios'

export default defineEventHandler(async (event) => {

    const {apiKey} =  getQuery(event)

    console.log(apiKey);
    

    return axios.get("https://harvest.greenhouse.io/v1/tags/candidate", 
          { auth: {
            username: `${apiKey}`,
            password: ""
          },
      //       headers: {
      // 'Access-Control-Allow-Origin': '*',
      // 'Content-Type': 'application/json',
      // "Access-Control-Allow-Methods": "GET,HEAD,PUT,POST,DELETE,PATCH",
      // "Referer": "*",
      //     }
        
        }).then(r => {
          
        return r.data;
    });
  })
