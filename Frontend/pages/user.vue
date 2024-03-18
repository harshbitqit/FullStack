<template>
    <div class="main-content">
        <div>
        <div class="header">
                
           <img class="lever" src="../images/lever_logo.png" alt="">
           <img  class="logo" src="../images/Contact_img.png" alt="">

        </div>

        <div class="green-house">

           <NuxtLink class="link" to="/">GreenHouse</NuxtLink>
        </div>
        
    </div>

      <div class="sub-section">
        <div v-if="edit_id===true"class="left-part">
            Add GreenHouse Import
        </div>

       
            <div v-if="edit_id===false" class="left-part">Edit GreenHouse</div>

        

        <div class="right-part">

             <form class="form-white" @submit.prevent="submitForm" >

                <p class="import">IMPORT DETAILS </p>
                <p class="para-detail">Enter the details for the GreenHouse client for us to <br/>
                    setup the import of the data automatically.</p>

                 <label for="cname" class="client">Client Name:</label>  <br/>
                 <input type="text" class="width" v-model="user.client" required> 
                 
                 <br/>
                 <br/>
                    

                 <div v-if="edit_id ===true">
                 
                 <label  for="api-key" class="greenhouse-api-key">GreenHouse API Key</label> <br/>
                 <input class="width" v-model="apiKey" placeholder="Enter API Key " type="text"  @keyup="validateApiKey" required>
                 <!-- <button @click="checkApiKey">Check API Key</button> -->

                 <span v-if="isLoading" class="loader"></span>
                 <span v-if="isCheck===true" class="correct"><i class= "fa-solid fa-check"></i></span>
                 <span v-else-if="isCheck===false" class="wrong"><i class="fa-regular fa-circle-xmark"></i></span>
                 <!-- <p v-if="isValidApiKey===true">API Key is valid</p>
                 <p v-else-if="isValidApiKey===false">API Key is invalid</p> -->
                  
                 <br/> <br/>
                 <label for="Lever api-key" class="leverapi">Lever API Key</label> <br/>
                 <input class="width" v-model="leverKey" type="text" placeholder="Enter Lever API Key"  @keyup="validateLeverKey" required >
                  
                 <span v-if="isLoadingLever" class="loader"></span>
                 <span v-if="isCheckLever===true" class="correct"><i class= "fa-solid fa-check"></i></span>
                 <span v-else-if="isCheckLever===false" class="wrong"><i class="fa-regular fa-circle-xmark"></i></span>
                 <br/> <br/>

                 <div class="toggle">
                 <label class="switch">
                 <input type="checkbox" v-model="useLeverSandbox" >
                 <span class="slider round" @change="changeToggle"></span>
                 </label>

                 <span class="use-lever">Use Lever Sandbox</span>
                </div>
                
                 <br/><br/>

                </div>
                  <label for="email" class="owneremail">Owner email</label> <br/> 
                 <input class="width" type="email" v-model="user.email" required> 
                 <br/> 
                 <!-- <button>Validate</button> <br/>  -->

                 
                 <span class="ownerID">Owner ID will be used as fallback when the user mapping is omitted</span>
                 
                 <br/> <br/>
                 <label for="Tag" class="tag">Tag</label> <br/>
                 <input class="width" type="text" v-model="user.tag" required > <br/>
                 <span class="tag-para">This tag will be added to postings and opportunites when created on Lever</span>
                 
                 <br/> <br/>
                 <div class="sub">
                    

                     <div>
                        <p class="cutoff">Cutoff Date</p>
                        <input type="date" name="date" id="date"  v-model="user.cal" required>
                     </div>
                    
                      <div>
                        <p class="privatenotes">Private Notes </p>
                          <span class="mark-notes">Mark Notes as Private</span>
                      </div>
                    
                 </div>

                 <p class="files">Files Type to Import</p>
                 <div class="check-box">
    <div class="check-box-left">
        <input type="checkbox" id="resume" name="myCheckbox">
        <label  class="box" for="resume">resume</label>

        <br/>

        <input  type="checkbox" id="admin_only" name="myCheckbox">
        <label class="box" for="admin_only">admin_only</label>

        <br/>

        <input  type="checkbox" id="offer_packet" name="myCheckbox">
        <label class="box" for="offer_packet">offer_packet</label>

        <br/>

        <input  type="checkbox" id="take_home_test" name="myCheckbox">
        <label  class="box" for="take_home_test">take_home_test</label>

    </div>

    <div class="check-box-right">

        <input  type="checkbox" id="cover_letter" name="myCheckbox">
        <label class="box" for="cover_letter">cover_letter</label>

        <br/>

        <input  type="checkbox" id="public" name="myCheckbox">
        <label class="box" for="public">public</label>

        <br/>

        <input  type="checkbox" id="offer_letter" name="myCheckbox">
        <label class="box" for="offer_letter">offer_letter</label>

        <br/>

        <input  type="checkbox" id="other" name="myCheckbox">
        <label class="box" for="other">other</label>

    </div>

    
</div>
              <br/>
                <div v-if="edit_id===true">
                    <button  type='submit'  class="get-button" v-on:keyup.enter="submitForm">Get Started</button>

                </div>

                <div v-if="edit_id===false">
                    <button  type='submit'  class="get-button" @click =saveChanges >Edit</button>
                   
                </div>
             </form>
            </div>
            
        </div>

    </div>
       
    <!-- </div> -->
</template>

<script setup>

const route=useRoute();
console.log(route.path);

const edit_id=ref(true);
const id = route.query.id;

const mode=route.query.mode;



if(id && id.length>0 ){
    edit_id.value=false;
}
else{
    edit_id.value=true;
}

const user =ref({
    client:"",
    email:"",
    tag:"",
    cal:""
})



const editUSer= async(id) =>{

try{

    const response = await axios.get(`http://localhost:8000/user/${id}`);
    if(response.status===200)console.log("success");

    user.value.client= response.data.Client_Name;   
    user.value.email=  response.data.Email;
    user.value.tag=response.data.Tag;
    user.value.cal=response.data.Cut_Off_Date;
    

}catch(error){
    console.error("Not able to edit ",error);
}

}


const saveChanges = async () =>{
    console.log("Hello");
try{

    await axios.put(`http://localhost:8000/user/${id}`,{
       
        Client_Name:user.value.client,
        Email:user.value.email,
        Tag:user.value.tag,
        Cut_Off_Date:user.value.cal
    })

}catch(error){
console.error("Not able to edit ",error);
}


}


if(mode==='edit'){
    console.log("Inside the edit ");

editUSer(id);

}





    






import _ from 'lodash'
import axios, {isCancel, AxiosError} from 'axios'





const errorMsg=ref('');

const router=useRouter();

// const Testsubmit=async()=>{


//     try{
//         await axios.post("http://localhost:8000/submit-form",{
//             Client_Name:"XYZ",
//             Email:"xyz@gmail.com",
//             Tag:"NA",
//             Cut_Off_Date:"123",        
//         });
//         console.log("Data sent successfully");
//         console.log(user.value.client,user.value.email,user.value.tag,user.value.cal)

//     }
//     catch(error){
//         console.log("Error adding client:",error);

//     }
// }
const submitForm = async() => {
    if(!user.value.client || !user.value.email || !user.value.tag || !user.value.cal || isCheck.value===false || isCheckLever.value===false )
    {
        alert("Check the API Key")
        errorMsg.value="Please enter the field";
        
        console.log("check input field or api vlaidation");
        return ;
    }
    else{
        router.push("/");
    }

    try{
        await axios.post("http://localhost:8000/user",{
            Client_Name:user.value.client,
            Email:user.value.email,
            Tag:user.value.tag,
            Cut_Off_Date:user.value.cal,        
        });
        console.log("Data sent successfully");
        console.log(user.value.client,user.value.email,user.value.tag,user.value.cal)
      

    }
    catch(error){
        console.log("Error adding client:",error);

    }


}


import {ref} from 'vue'


const useLeverSandbox = ref(false);

const changeToggle =()=>{

    if(useLeverSandbox.value===true)
    {
        console.log(useLeverSandbox.value)
      validateLeverKey();
    }
     else if(useLeverSandbox.value===false){
        console.log('wrong');
     }
    
}



let apiKey = ref("");
let isValidApiKey = ref(null);

let isCheck=ref(null);
let isLoading=ref(false);



const validateApiKey = _.debounce(async () => {
  isLoading.value=true;
  isCheck.value = null;
      try {
        
          // console.log(apiKey.value);
        // Make a request to the API with the provided API key
        const response = await $fetch(`/api/getData?apiKey=${apiKey.value}`, {
  method: "GET"
});

        console.log(response);

       

        // Check if the API key is valid by verifying if data is returned
        if (response.length > 0) {
          isCheck.value=true;
          isValidApiKey.value = true;
        } else {
          
          isCheck.value=false;
          isValidApiKey.value = false;
        }
      } catch (error) {
        console.error('Error checking API key:', error);
        isValidApiKey.value = false;
        isCheck.value=false;
        
      } finally{
        isLoading.value=false;
      }
    },350);


    let leverKey=ref("");
    let isCheckLever=ref(null);
    let isLoadingLever=ref(false);

  
   
   let validateLeverKey = _.debounce (async()=>{

    let leverKeyValue = leverKey.value.includes("+") ? encodeURIComponent(leverKey.value) : leverKey.value;


    console.log(`in user.vue: ${leverKeyValue}`)
            isLoadingLever.value=false;
            isCheckLever.value=null;
            isLoadingLever.value=true;
    try{
        if(useLeverSandbox.value===false )
        {
           
            try{
            const response2=await $fetch(`/api/getProduction?leverKeyValue=${leverKeyValue}`,{
                method:"GET"
            });

            if(response2.length>0){
                console.log(response2);
                isCheckLever.value=true;
            }
            else if(response1.length===0){
            // console.log("inside 2nd cond");
            isCheckLever.value=false;
           }
         }
         catch(error){
            console.error('Error checking API key:', error);
            isCheckLever.value=false;
        }
        finally{
        
            isLoadingLever.value=false;
        }   
        }
        
        if(useLeverSandbox.value===true){
        const response1=await $fetch(`/api/getLever?leverKeyValue=${leverKeyValue}&useLeverKey=${useLeverSandbox.value}`,{
            method:"GET"
        });
       
        console.log(response1);
              
        if(response1.length>0 ){
            // console.log("inside 1st cond");
            
            isCheckLever.value=true;
        }
        else if(response1.length===0){
            // console.log("inside 2nd cond");
            isCheckLever.value=false;
        }
    }
         }
        catch(error){
            console.error('Error checking API key:', error);
            isCheckLever.value=false;
        }
        finally{
        
            isLoadingLever.value=false;
        }
    
    },350)



   
    


    

</script>



<style scoped >

@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');


.sub-section{
    display: flex;
    flex-direction: row;
    justify-content: space-around;


}
.left-part{
    color:#3F3F3F;
    font-family: "Inter UI", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 24px;
    margin-top: 50px;
    
    
}
.sub{
    display: flex;
    justify-content: space-between;
}

.form-white{
    
    background-color: white;

}
.para-detail{
    color:#3F3F3F;
    font-family: "Inter UI", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
font-size: 16px;

}

.check-box{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.g-button{
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    background-color: #00A46C;
    color: white;
    cursor: pointer;
}

.form-white {
    background-color: white;
    border: 2px solid #ccc;
    padding: 20px;
    margin: 20px auto;
    width:430px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.loader {
    margin-left: 10px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-left: 2px solid #333; /* Change the color to match your design */
  border-radius: 50%;
  width: 19px;
  height: 19px;
  animation: spin 1s linear infinite;
  margin-top: 0px; /* Adjust margin as needed */
  display: inline-block;
  position:absolute;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.correct,.wrong{
    margin-left: 10px;
}
.import{
     font:10.5px  Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    
     color: #3F3F3F;
}
.client{
    font:14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

    color: #000000;
}
.greenhouse-api-key{
    font:14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #000000;

}
.leverapi{
    font:14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #000000;
}
.owneremail{
    font:14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #000000;
}
.ownerID{
    font:12px "Inter UI", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color:#121212AB
}
.tag{
    font:14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #000000;
}
.tag-para{
    font:12px "Inter UI", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color:#3F3F3F
}
.cutoff,.privatenotes,.mark-notes{
    font:14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #000000
}
.files{
    font:14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #000000;
}
.box{
    font :14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
.get-button{
    display: flex;
    align-items: center;
    justify-content: center;
    width:430px;
    height:30px;
    background-color: #00CC99;
    border:1px solid aquamarine;
    color:white;
    cursor: pointer;

}
*body{
    margin:0;
    padding: 0;
    

}
.lever{
    height:50px;
    margin-left: 50px;
   
    
}
.header{
    margin: 0;
    padding: 0;
    background-color:green;
    display: flex;
    flex-direction: row;
    justify-content:space-between ;
}
.logo{
    height:30px;
    border: 2px solid black;
    border-radius: 50%;
    background-color: #FFCC65;
    margin-top: 8px;
    
}
.green-house{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 50px;
    border: 1px solid lightgray;
    
}
.link {
    margin-left:150px;
    cursor:pointer;
   

}


.container {
  position: relative;
}

.container NuxtLink {
  position: absolute;
  top: 100%; /* Position the link below the element */
}

.main{
    display: flex;
    justify-content: space-between;
}

.button{
    
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid black;
    text-decoration: none;
    background-color: green;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    
}
.green-house{
    font:15px "Inter UI", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color:#000000;
}
.width{
    width: 350px;
    height: 20px;
}
.link{
    text-decoration: none;
    color: black;
}

.switch {
  position: relative;
  display: inline-block;
  width:40px;
  height: 25px;
  
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 19px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: green;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(15px);
  -ms-transform: translateX(15px);
  transform: translateX(15px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.use-lever{
    margin-left: 10px;
    color:#000000;
}
.toggle{
    display: flex;
    align-items: center;
    margin-bottom: -25px;
    font:14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    
}
</style>