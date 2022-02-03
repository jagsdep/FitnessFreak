function validate(){
 
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if(username!="" && password!=""){
        var body={
            username:username,
            password:password
        }
        axios.post(config_url + '/login', body)//It creates the data in the backend and returns a response.  
        .then(response => {
            console.log(response)
            if (response.data.status == 'ok'){
                sessionStorage.setItem('tokenSecret', response.data.token);
                 window.location.href = './input.html'
            }
          
            
        })
        .catch(error => console.error(error));
   
  }
        
    else{
        alert("login failed");
    }
    return false;

}

function register(){
    var email= document.getElementById("email").value;
    var password = document.getElementById("registeredPassword").value;

    if(username!="" && password!=""){
        var body={
            email:email,
            password:password
        }
        axios.post(config_url + '/register', body)//It creates the data in the backend and returns a response.  
        .then(response => {
          console.log(response)
          const data = response.data.signUp;
          
            
        })
        .catch(error => console.error(error));
   
  }
        
    else{
        alert("registration failed");
    }


}
