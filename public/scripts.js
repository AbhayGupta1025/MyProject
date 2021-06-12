
var googleId;
var email;

function onSignIn(googleUser){
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

    var myUserEntity ={};
    myUserEntity.Id = profile.getId();
    myUserEntity.Name = profile.getName();
    myUserEntity.Email = profile.getEmail();
     email = myUserEntity.Email;
     googleId = myUserEntity.Id;
    sessionStorage.setItem('myUserEntity', JSON.stringify(myUserEntity));
    document.getElementById('email').disabled=false;
    document.getElementById('first').disabled=false;
    document.getElementById('second').disabled=false;
    document.getElementById('third').disabled=false;
    document.getElementById('fourth').disabled=false;
    document.getElementById('male').disabled=false;
    document.getElementById('female').disabled=false;
    document.getElementById('next').disabled=false;
    document.getElementById('country').disabled=false;
    
}

function checkIfLoggedIn(){
if(sessionStorage.getItem('myUserEntity') != null){
    console.log("user is logged in");
    var userEntity = {};
    userEntity = JSON.parse(sessionStorage.getItem('myUserEntity'));
    console.log(userEntity);
    document.getElementById('email').disabled=false;
    document.getElementById('first').disabled=false;
    document.getElementById('second').disabled=false;
    document.getElementById('third').disabled=false;
    document.getElementById('fourth').disabled=false;
    document.getElementById('male').disabled=false;
    document.getElementById('female').disabled=false;
    document.getElementById('next').disabled=false;
    document.getElementById('country').disabled=false;
    }
else
{
    console.log('no one logged in');
}
}



function signOut() {
var auth2 = gapi.auth2.getAuthInstance();
auth2.signOut().then(function () {
  console.log('User signed out.');
});
sessionStorage.clear();
document.getElementById('email').disabled=true;
document.getElementById('first').disabled=true;
document.getElementById('second').disabled=true;
document.getElementById('third').disabled=true;
document.getElementById('fourth').disabled=true;
document.getElementById('male').disabled=true;
document.getElementById('female').disabled=true;
document.getElementById('next').disabled=true;
document.getElementById('country').disabled=true;
}



function nextPage(){
    var userData = {};
    userData.email = email;//document.getElementById("email").value;
    var ele = document.getElementsByName('age');  
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked)
        {
            userData.age=ele[i].value;
        }
    }
    ele = document.getElementsByName('gender');
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked)
        {
            userData.gender=ele[i].value;
        }
    }
    userData.country = document.getElementById('country').value;
    console.log(country);
    sessionStorage.setItem('userData', JSON.stringify(userData));
    var data = {};
    data = JSON.parse(sessionStorage.getItem('userData'));
    if(data.email=="")
    {
        alert("kindly fill your email");
    }
    if(data.age==null)
    {
        alert("kindly fill your age");
    }
   if(data.gender==null)    
    {
        alert("kindly fill your gender");
    }
    if(data.country=="")
    {
        alert("kindly fill you country");
    }
    if(data.email!="" && data.age!=null && data.gender!=null && data.country!="")
    {
         if( data.gender=="male")
        {
            location.href="male.html";
        }
        else if( data.gender=="female")
        {
            location.href="female.html";
        }
    }
}

function indexPage(){
    location.href="index.html";
}

function submitForm(){
    var ele = document.getElementsByName('faceType');  
    var facetype;
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked)
        {
            facetype=ele[i].value;
        }
    }
    ele = document.getElementsByName('faceTone');  
    var facetone;
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked)
        {
            facetone=ele[i].value;
        }
    }
    ele = document.getElementsByName('bodyType');  
    var bodytype;
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked)
        {
            bodytype=ele[i].value;
        }
    }
    if(facetype==null || facetone==null || bodytype==null)
    {
        alert("kindly fill all details");
    }
    var data = {};
    data = JSON.parse(sessionStorage.getItem('userData'));
    /*console.log(data.email);
    console.log(data.age);
    console.log(data.gender);
    console.log(data.country);
    console.log(facetype);
    console.log(facetone);
    console.log(bodytype);
    console.log(googleId);*/
    var json = {
        email : data.email,
        age : data.age,
        gender : data.gender,
        country: data.country,
        facetype: facetype,
        facetone: facetone,
        bodytype: bodytype
    }
   var opts = {
        method : 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(json)
    };

    fetch('/infos',opts)
    .then(res => {
        console.log(res);
        var opt = {
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json'
            }
        }
        
        fetch(`/infos`,opt)
        .then(res => res.json())
        .then(data=> console.log(data))
        .catch((err) =>{ 
            console.log(err);
        });
    })
    
   
    .catch((err) =>{ 
        console.log(err);
    });
    
}

