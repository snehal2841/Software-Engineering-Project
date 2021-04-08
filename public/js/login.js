function validateForm(){
	var name = document.forms["myForm"]["username"].value;
	var email = document.forms["myForm"]["email"].value;

	if (name.length<1) {
        document.getElementById('error-name').innerHTML = " Please Enter Your Name *"
    }
    if (email.length<1) {
        document.getElementById('error-email').innerHTML = " Please Enter Your Email *";
    }          
    if(name.length<1 || email.length<1 || phone.length<1 || message.length<1){
       	return false;
    }            
}