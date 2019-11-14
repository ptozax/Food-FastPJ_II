// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAGzdvnpJIKH84Y5tgZMA68urFZkzYA3UA",
    authDomain: "foodproject-ce8a8.firebaseapp.com",
    databaseURL: "https://foodproject-ce8a8.firebaseio.com",
    projectId: "foodproject-ce8a8",
    storageBucket: "foodproject-ce8a8.appspot.com",
    messagingSenderId: "875669266606",
    appId: "1:875669266606:web:58428db9f3ae508049cd3f"
};
// Initialize Firebase
   firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();


  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');








var Gfood_id;
function category(food_id){
  Gfood_id=food_id;
  document.querySelector('#myNavigator').pushPage('foodselect.html');
 
}




var getresid;
function goresselect(res_id){
  getresid=res_id;
  document.querySelector('#myNavigator').pushPage('resSelect.html');
  console.log(getresid);
}


var getf_id;
function gocatselect(f_id){
  getf_id=f_id;
  document.querySelector('#myNavigator').pushPage('catSelect.html');
 
}




function backbtn(){

  document.querySelector('#myNavigator').popPage();
 
}



/*
function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    f_id : ,
    order_id: ,
    order_no: ,
    qulity: ;
  });
}

*/





document.addEventListener('init', function (event) {
  var page = event.target;
  console.log(page.id);


  


  if (page.id === 'homePage') {
    console.log("homePage");

    $("#menubtn").click(function () {
      $("#sidemenu")[0].open();
    });

    $("#searchbtn").click(function () {
      document.querySelector('#myNavigator').pushPage('search.html');
    });





    $("#carousel").empty();

    db.collection("recommended").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {   
        
        

        db.collection("foodlist").get().then((querySnapshot) => {
          querySnapshot.forEach((doc1) => {   
            
            if(`${doc.data().f_id}`==`${doc1.data().f_id}`){
    
            var item = `
            <ons-carousel-item modifier="nodivider" id="item${doc1.data().f_id}" class="recomended_item" onclick="category(${doc1.data().f_id})"  >
            <img src="${doc1.data().f_url}" width="120" height="120" ></dev>
            <div class="recomended_item_title" id="item1_${doc1.data().f_id}" style="font-size:20px;">${doc1.data().f_name}</div>
            </ons-carousel-item>`
            
            $("#carousel").append(item);
          
            }
          
          });
        });
    




      
      
      
      });
    });


   


//end----------------------------------------
$("#itemlist").empty();

    db.collection("foodlist").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {   
        
        var item = `
        <ons-list-item tappable  id="menulist${doc.data().f_id}"   onclick="category(${doc.data().f_id})"  style="color:rgb(255, 255, 255);" >      
            
            <img src="${doc.data().f_url}" width="80" height="82"  >
            &nbsp;&nbsp;<p style="  font-size:20px;"> ${doc.data().f_name}   </p> 
            <dev class="right">   
            <p style="color:rgb(0, 255, 0);font-size:20px;">${doc.data().f_price}</p> &nbsp;
             
             
             <p style="font-size:20px;"> THB. </p>  
             
             </dev>


             
        
        </ons-list-item>   `
        $("#itemlist").append(item);
      });
    });






  }





  //-------------------------------------------menu page---------------------------------

  if (page.id === 'menuPage') {
    console.log("menuPage");

    $("#login").click(function () {
      $("#content")[0].load("login.html");
      $("#sidemenu")[0].close();
    });

    $("#home").click(function () {
      $("#content")[0].load("home.html");
      $("#sidemenu")[0].close();
    });
 
 
    $("#signout").click(function () {
      console.log('logoutbtn pressed');
      $("#sidemenu")[0].close();
      firebase.auth().signOut().then(function () {
        console.log("pass");
  // Sign-out successful.
      });
  
  });

  $("#address_btn").click(function () {
    document.querySelector('#myNavigator').pushPage('address.html', {data: {title: 'Page 2'}});
    $("#sidemenu")[0].close();
  });





 
  }








//--------------------------------login page-----------------------------------





  if (page.id === 'loginPage') {
    console.log("loginPage");

    $("#backhomebtn").click(function () {

      $("#content")[0].load("home.html");
   
   
    });



    $("#signupbtn1").click(function () {

      document.querySelector('#myNavigator').pushPage('signup.html');
   
   
    });
    


    //email login
   
   


    $("#signinbtn").click(function () {
        
      var username = $("#username").val();
      var password = $("#password").val();
      firebase.auth().signInWithEmailAndPassword(username, password).then(function () {
      
       $("#content")[0].load("home.html");
       $("#sidemenu")[0].close();
    }).catch(function (error) {
        // Handle Errors here.
         var errorCode = error.code;
         var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
      });
      

    }
   
    );

/////--end






//gg login

    $('#ggbtn').click( function googleLogin() {
      firebase.auth().signInWithRedirect(provider);
      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.log('user'+token);
        
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log('error'+errorCode);
      });
    });
    
//-----------------------end----------------


    
  }
 




//-------------recomend----------------------------------------------------------------------------------------
 
  if (page.id === 'foodselect') {
    
     
    $("#foodselect-1").empty();

    db.collection("foodlist").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {   
        
       if(Gfood_id==`${doc.data().f_id}`){

        page.querySelector('ons-toolbar .center').innerHTML = `${doc.data().f_name}` ;

        var item = ` 
        


        <div class="detailfood" >
              <ons-icon icon=""></ons-icon>
              <img src="${doc.data().f_url}"  >
            </div>
        
            <div class="food_info">
            
              <h2 id="food_title" style="color:rgb(255, 255, 255);   font-size:30px;">
             
              ${doc.data().f_name}   
              </h2> 
              
              

              <h2 id="food_title" style="color:rgb(255, 255, 255);   font-size:20px;">
               &nbsp;&nbsp;  
               <ons-icon icon="fa-star" style="color: yellow;"></ons-icon> 
               <ons-icon icon="fa-star" style="color: yellow;"></ons-icon> 
               <ons-icon icon="fa-star" style="color: yellow;"></ons-icon> 
               <ons-icon icon="fa-star" style="color: yellow;"></ons-icon> 
               <ons-icon icon="fa-star" style="color: yellow;"></ons-icon> 
               &nbsp;  
               
               ${doc.data().f_star}  
                </h2> 
              
             
               <div class="food_synopsis" style="color:rgb(255, 255, 255); font-size:17px;">  ${doc.data().f_detail}</div>
        
               <h2 id="food_title" style="color:rgb(125, 255, 0);   font-size:25px; margin-top: 60px;  "  align="right">
             
               ${doc.data().f_price} THB.- &nbsp; 
             
               </h2>

         
        <div style="text-align: center;">
              <ons-button class="center" id="" style="width: 90%;  margin-top: 1px;"   >ADD TO CART</ons-button>

              </div>
        `       
      
      }

        $("#foodselect-1").append(item);
      });
    });

//----------------end---------






  }





//-----------------------------------signup---------------------------------------------------------------------------------------------------

  if (page.id === 'signup') {





    $("#SignUpbtn").click(function () {
      console.log('registerAccountbtn pressed');
      var username = document.getElementById('email').value;
      var password1 = document.getElementById('password1').value;
      var password2 = document.getElementById('password2').value;

      

      if (!(username && password1 && password2)) {
        ons.notification.alert('You should fill everything');
    }
    else if (password1.length < 8) {
        ons.notification.alert('Your password must contains at least 8 characters');
    }
    else if (password1 == password2) {
        firebase.auth().createUserWithEmailAndPassword(username, password1).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
        ons.notification.alert('Successfully Registered!');
    }
    else {
        ons.notification.alert('Password does not match!');
    }



   
  });


  }

//---------------------------------------------------------------


if (page.id === 'search') {




  $("#searchres").empty();

    db.collection("restaurant").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {   
        
        var item = `
        
       
        <ons-carousel-item modifier="nodivider" id="item${doc.data().res_id}" class="recomended_item" onclick="goresselect(${doc.data().res_id})"  >
        <img src="${doc.data().res_url}" width="120" height="120" ></dev>
        <div class="recomended_item_title" id="item1_${doc.data().res_id}" style="font-size:20px;color:rgb(255, 255, 255);text-align: center;" ">${doc.data().res_name}</div>
        </ons-carousel-item>
        
        
        `
        $("#searchres").append(item);
      });
    });





}
  //---------------------------------------------------------------------------------------
  
  
  // page.querySelector('ons-toolbar .center').innerHTML = `${doc.data().f_name}` ;


  if (page.id === 'resselect') {


    db.collection("restaurant").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {   
        if(getresid==`${doc.data().res_id}`){

          page.querySelector('ons-toolbar .center').innerHTML = `${doc.data().res_name}` ;


        }




      });
    });




  

    $("#reslist").empty();

    db.collection("foodlist").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {   
        
        
        console.log(getresid);
        console.log(`${doc.data().f_res}`);
        if(getresid==`${doc.data().f_res}`){


          var item = `
          <ons-list-item tappable  id="menulist${doc.data().f_id}"   onclick="category(${doc.data().f_id})"  style="color:rgb(255, 255, 255);" >      
              
              <img src="${doc.data().f_url}" width="80" height="82"  >
              &nbsp;&nbsp;<p style="  font-size:20px;"> ${doc.data().f_name}   </p> 
              <dev class="right">   
              <p style="color:rgb(0, 255, 0);font-size:20px;">${doc.data().f_price}</p> &nbsp;
               
               
               <p style="font-size:20px;"> THB. </p>  
               
               </dev>
  
  
               
          
          </ons-list-item> 
      
          
          `
          $("#reslist").append(item);
       









        }
        
        
     
     
     
     
      });
    });

   
  





  
  
  
  }



  //////////////////////////////////////address////////////////////////////////





if (page.id === "address") {
  page.querySelector('ons-toolbar .center').innerHTML = 'Address';

  var latitude, selectedLatitude;
  var longitude, selectedLongitude;

  var onSuccess = function (position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    mapboxgl.accessToken = 'pk.eyJ1IjoicHRvemF4IiwiYSI6ImNrMmxhY2hiaDA1MGozbnFzaXFkcG1jYTgifQ.5IHasePqWTnXpq_ytHYK5A';
    var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [longitude, latitude], // starting position [lng, lat]
      zoom: 14 // starting zoom
    });

    // selectedLatitude = latitude;
    // selectedLongitude = longitude;

    var marker = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([longitude, latitude])
      .addTo(map);
    onDragEnd();
    function onDragEnd() {
      var lngLat = marker.getLngLat();
      selectedLatitude = lngLat.lat;
      selectedLongitude = lngLat.lng;

      coordinates.style.display = 'block';
      coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
    }

    marker.on('dragend', onDragEnd);
  };

  // onError Callback receives a PositionError object
  //
  function onError(error) {
    alert('code: ' + error.code + '\n' +
      'message: ' + error.message + '\n');
  }

  navigator.geolocation.getCurrentPosition(onSuccess, onError);

  $("#setAddress").click(function () {
    console.log("Latitude is " + selectedLatitude + " Longitude is " + selectedLongitude);
    $("#content")[0].load("completeOrder.html");
    // ons.notification.alert();
  });

  $("#backbtn").click(function () {
    $("#content")[0].load("foodCategory.html");
  });
}

if (page.id === "completeOrderPage") {

  ons.notification.alert("ありがとう");
  db.collection("restaurant").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.data().Ref === selectedRef) {
        var orderRes = `<img src="${doc.data().pic}" style="width: 20%">
        <br><b>${doc.data().name}</b><br>`;
        $('#orderRes').append(orderRes);
      }
    });
  });

  for (var i = 0; i < getitem.length; i++) {
    var show_OrderMenu = `
    <ons-col width=20%>&emsp;` + (1) + `</ons-col>
    <ons-col width=50%>- `+ getitem[i] + `</ons-col>&emsp;&emsp; 
    <ons-col width=20%>`+ getprice[i] + `</ons-col>`;

    $("#orderMenu").append(show_OrderMenu);
  }

  $("#show_delivery").append("Delivery is " + getdelivery + " ฿");
  var show_total = "Total: " + (prices + getdelivery) + " ฿";
  $("#show_total").append(show_total);

  $("#closebtn").click(function(){
    $("#content")[0].load("foodCategory.html");
  });
}




});