app.controller("DashboardController", main);

function main($scope, $location, AddressValueService) {
    var vm = this;
    vm.homeItemStack = [];
    vm.connectionLabel = "Disconnected";
    vm.loading = true;

    //A constructor for the homeItem object
    function homeItem(itemName, itemTitle, itemData, itemImageSource,isConnected){
        this.itemName = itemName;
        this.itemTitle = itemTitle;
        this.itemData = itemData;
        this.itemImageSource = itemImageSource;
        this.isConnected = isConnected;
    }

    // Add any new cards here. Look at the model above to determine the format. 
    vm.homeItemStack.push(new homeItem("smartMirror", "Smart Mirror", "Active", './assets/img/mirror.png', true));
    vm.homeItemStack.push(new homeItem("webCam", "Web Camera", "Active", './assets/img/webcam-icon.png', true));
    vm.homeItemStack.push(new homeItem("garage", "Garage Door Controller", "Active", './assets/img/garage.png', true));
    vm.homeItemStack.push(new homeItem("infinityLights", "Infinity Lights", "On", './assets/img/light_icon.png', true));
    vm.homeItemStack.push(new homeItem("dogWater", "Dog Water Bowl", "Full", './assets/img/water.png', false));
    

    //a manual timeout so that you can see the screen loading
    vm.timeOut =  function () {
       setTimeout(function () 
       {
         $scope.$apply(function()
         {
           vm.loading = false;
         });
       }, 3000);
     }

     //attempts to change the vm.connection label to something different (DOESN"T WORK)
     vm.checkingForControllerConnection =  function () {
        vm.connectionLabel = "Connecting...";
       setTimeout(function () 
       {
         $scope.$apply(function()
         {
           vm.connectionLabel = "Disconnected";
         });
       }, 3000);
     }

     vm.sendGetRequest = function(theURL)
     {
        //do nothing for now but uncomment when you do want to do something

        // getRequest(theURL, function(response){
        //     console.log(response);
        // });
     }

    var getRequest = function (theUrl, callback){
        var params = "turnLightsOn=true";
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl+"?"+params, true); // true for asynchronous 
        xmlHttp.send(null);
    }

    vm.processCardAction = function (item){
        if(item.itemName == "garage"){
            $location.path("/garage");
        }
        if(item.itemName == "webCam"){
            $location.path("/webCam");
        }
        if(item.itemName == "infinityLights"){
            $location.path("/infinityLights");
        }
        if(item.itemName == "smartMirror"){
            var smartMirrorURL = AddressValueService.getSmartMirrorURL();
            console.log(smartMirrorURL);
            window.open(smartMirrorURL, '_blank');
            window.focus();
        }
    }
}
