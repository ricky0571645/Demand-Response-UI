app.controller("WebCamController", main);

function main($scope, $location, AddressValueService) {

    var vm = this;

    vm.videoIsLive = false;
    vm.buttonText = "Turn Video On";



    // REMEMBER TO CHANGE THIS DATA ONCE VIDEO CHANGES
    vm.webCamIP = AddressValueService.getFormattedWebCamIP() + ":8081";


    vm.turnVideoFeedOn = function(){
    	vm.webCamIP = AddressValueService.getFormattedWebCamIP() + ":8081";
        if(vm.webCamIP != 0 && vm.buttonText == "Turn Video On"){
        	var theURL = vm.webCamIP + ":8081";
        	 //var params = "";
        	 //params = ":8081";
             //vm.WebCamIP = "https://" + vm.WebCamIP + ":8081";
            console.log()
            vm.videoIsLive = true;
            vm.buttonText = "Turn Video Off";
        } else{
            vm.videoIsLive = false;
            vm.buttonText = "Turn Video On";
        }
    }
    //change from here
    vm.toggleServo = function(isOpen)
     {
        vm.webCamIP = AddressValueService.getFormattedWebCamIP();
        if(vm.webCamIP != '0'){
            var theURL = vm.webCamIP + '/';
            // condition if the button is open or close
            var params="";
            if(isOpen == 0){
                params = "zero.php";
            }
            else if(isOpen == 45){
                params = "fourfive.php";
            }
            else if(isOpen == 90){
                params = "ninezero.php";
            }
            else if(isOpen == 135){
                params = "onethreefive.php";
            }
            else if(isOpen == 180){
                params = "oneeighty.php";
            }
            
            console.log(theURL + " " + params);
            getRequest(theURL, params, function(response){
                console.log(response);
            });
        }
        vm.webCamIP = AddressValueService.getFormattedWebCamIP() + ":8081";
     }

    var getRequest = function (theUrl, params, callback){
        
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl+params, true); // true for asynchronous 
        xmlHttp.send(null);
    }
    //to here
}

