app.controller("GarageController", main);

function main($scope, $location, AddressValueService) {
    
    var vm = this;
    
    vm.videoIsLive = false;
    vm.garageDoorStatus = "Unknown";

    // REMEMBER TO CHANGE THIS DATA ONCE VIDEO CHANGES
    vm.garageVideoIP = AddressValueService.getFormattedGarageVideoIP();

    vm.turnVideoFeedOn = function(){
        if(vm.garageVideoIP != 0){
            vm.videoIsLive = true;
        }
    }

    vm.toggleGarageDoor = function(isOpen)
     {
        var garageServerIP = AddressValueService.getGarageServerIP();
        if(garageServerIP != '0'){
            var theURL = 'http://' + garageServerIP;
            // condition if the button is open or close
            var params="";
            if(isOpen == true){
                params = "open";
            }
            else{
                params = "close";
            }
            
            console.log(theURL + " " + params);
            getRequest(theURL, params, function(response){
                console.log(response);
            });
        }
     }

    var getRequest = function (theUrl, params, callback){
        
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl+"?"+params, true); // true for asynchronous 
        xmlHttp.send(null);
    }
}

