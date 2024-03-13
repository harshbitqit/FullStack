 <template style="margin: 0; padding: 0;">
    <div>
        
          <div class="header">
                 
            <img class="lever" src="../images/lever_logo.png" alt="">
            <img  class="logo" src="../images/Contact_img.png" alt="">


         </div>

         
         <div class="green-house">

            <NuxtLink class="link">GreenHouse</NuxtLink>
         </div>


         <div class="main">

            <p class="flex-item-left"> <strong>GreenHouse Imports</strong> </p>
            <NuxtLink class="button"  to="/user">+Add New Client</NuxtLink>
         </div> 
         
        <div class="table-wrapper">
         <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Client_Name </th>
                    <th>Email</th>
                    <th>Tag</th>
                    <th>Date</th>

                </tr>
            </thead>
            <tbody>
                <tr  v-for="item in users" :key="item.id">
                 <td>{{ item.id }}</td>
                 <td>{{ item.Client_Name}}</td>
                 <td>{{ item.Email }}</td>
                 <td>{{ item.Tag }}</td>
                 <td>{{ item.Cut_Off_Date }}</td>
                 <td>
                    <NuxtLink :to="`/${item.id}/edit`" class="btn btn-success ">Edit</NuxtLink>
                </td>
                
                </tr>
            </tbody>
         </table>
        </div> 


    </div>
</template>

<script  setup >

const submit = async() => {
    console.log("Hello");
}

import {ref,onMounted} from 'vue';
import axios from 'axios'



const users=ref([]);

onMounted(async () => {
    try{
        const response = await axios.get("http://localhost:8000");
        
        users.value=response.data.users;
    }
    catch(error){
        console.log("Error retrieving user data", error);
    }
});


</script>

<style scoped  >

.table {
  
  margin: 0 auto; /* Center the table */
  width: 70%; /* Set a width for the table */
  border-collapse: collapse;  /* Collapse the table borders */
  border-left: 1px solid rgba(0,0,0,0.2);
  border-right: 1px solid rgba(0,0,0,0.2);
}
th{
        font:15px Montserrat, "Apple System", sans-serif; /* Font family for heading columns */
        color: #000000;
        
    }
    tr:first-child{
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        
    }
    tr{
        font: 13px 'Inter UI', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
        color: #000000;
        border-bottom: 1px  solid rgba(0, 0, 0, 0.2)
    }
th,td{
   
    text-align: left;
    padding: 1rem;
  
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
.button{
    display: flex;
    align-items: center;
    justify-content: center;

    height:20px
}
.main{
    display: flex;
    justify-content: space-between
}
.flex-item-left{
    margin-left: 80px;
}
.button{
    margin-top: 10px;
    margin-right: 80px;
}

body {
    margin: 0;
    padding: 0;
}

</style>