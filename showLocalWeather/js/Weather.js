$(document).ready(function(){
 var lat, long;

  //ask user for user geolocation
  if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        long = position.coords.longitude;
        lat = position.coords.latitude;
       // $("#location").html("latitude: " + lat + "<br>longitude: " + long);
          //Create API with geolocation
   var api = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=a8376b9652e097de60f92c8546bd1bb4";

      $.getJSON(api, function(data){
    //JSON call for Open Weather API
     var weatherDesc = data.weather[0].description;
     var city = data.name;
     var kTemp = data.main.temp;
     var windSpeed = data.wind.speed;
     var swap = false;
     var fTemp;
     var cTemp;
     var wSpeed;
     var fTempInt;

     //calculate temperature from kelvin to farenheit
    function fConvert(kelvin){
        var farenheit = (1.8 * (kelvin - 273) + 32).toFixed(1);
      return farenheit;
    }
    //calculate temperature from kelvin to celcius
    function cConvert(kelvin){
      var celcius = (kelvin - 273).toFixed(1);
      return celcius;
    }
    //calculate windspeed
    function wConvert(wind){
     var speed = (2.237 * (wind)).toFixed(1);
     return speed;
    }



    //call functions to convert temperatures and windspeed and store in variable
     fTemp = fConvert(kTemp);
     cTemp = cConvert(kTemp);
     wSpeed = wConvert(windSpeed);

     fTempInt =  parseInt(fTemp);


        //change background based on weather description
          if(fTempInt >= 80){
            $('body').css('background-image', 'url(img/sunny.jpg)'); //clear skies picture
          }
         else if (fTempInt < 80 && fTempInt > 45){
            $('body').css('background-image', 'url(img/fair.jpg)');
         }
         else {
            $('body').css('background-image', 'url(img/winter.jpg)');
            $('h1').css('color', 'rgb(186, 29, 18)');
          }

        //set default values
    $("#cityName").html(city);
    $("#location").html("latitude: " + lat.toFixed(2) + "<br> longitude: " +long.toFixed(2));
    $("#temp").html(fTemp + " &deg;F");
    $("#skies").html(weatherDesc);
    $("#windSpeed").html(wSpeed + " mph");


         //toggle between farenheit and Celcius
         //true is farenheit, false is Celcius
           $("button").click(function(){
                if(swap === false)
                {
                  $("#temp").html(cTemp + " &deg;C");
                  swap = true;
                }
                else{
                  $("#temp").html(fTemp + " &deg;F");
                  swap = false;
                }
           });
       });


      });
  }


});
