<template>
  
  <div class="contianer mt-5">
    <div class="card">
        <div class="card-header">
            <h4>Edit Client</h4>
        </div>
        <div class="mb-3">
            <label for="">Name:  </label>
            <input type="text" class="width-n" v-model="clientName" >
        </div>
      
        <br/>
        
        <div class="mb-3">
            <label for="">Email: </label>
            <input type="text" class="width-e" v-model="email" >
        </div>

        <br/>

        <div class="mb-3">
            <label for="">Tag: </label>
            <input type="text" class="width-t " v-model="tag"  >
        </div>

        <br/>


        <div class="mb-3">
            <label for="">Date: </label>
            <input type="text" class="width-d" v-model="date" >
        </div>

        <br> </br>
        <div class="mb-3">
          <button type="button"  @click="editStudent" class="btn btn-primary">Save</button>
        </div>

    </div>
  </div>


</template>

<script setup>

import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route= useRoute();

const  router = useRouter();

const studentId = route.params.id;

const clientName = ref('');
const tag = ref(''); // Maps to 'Tag'
const email = ref('');
const date = ref(''); 

console.log("Hello",route.params.id);

const fetchAndUpdateData=async() => {

    const clientId = route.params.id;
    console.log("In update",clientId);
    try {

        const response = await axios.get(`http://localhost:8000/user/${clientId}`);

        if(response.status=== 200)console.log("Success");
        clientName.value = response.data.Client_Name;
        tag.value = response.data.Tag; // Ensure your server response matches this structure
        email.value = response.data.Email;
        date.value=response.data.Cut_Off_Date;
        // Assume you need to adjust or add logic to handle 'phone' based on your actual data
    } catch (error) {
        console.error('Failed to fetch student data', error);
        // Consider adding user feedback for the error (e.g., a message or alert)
    }
};

fetchAndUpdateData();


const editStudent = async() =>{

    const id = route.params.id;

    try{
 
        const response = await axios.put(`http://localhost:8000/user/${id}`,{
        Client_Name :clientName.value,
        Email :email.value,
        Tag: tag.value,
        Cut_Off_Date:date.value
        })

        if(response.status===200) console.log("Data edited and sent successfully")
       
    }
    catch(error){
        console.log("Error in editing ", error);

    }
   router.push("/")

}

</script> 



<style scoped>

.width-t{
    margin-left: 25px;

}
.width-e{
margin-left: 10px;
}
.width-n{
    margin-left: 10px;
}

.width-d{
    margin-left: 18px;
}

</style>