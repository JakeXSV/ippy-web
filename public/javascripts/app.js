require([
    "../lib/jquery/jquery.min.js"
],
function() {
    require([
        "../lib/notify/notify.min.js",
        "../lib/validator/validator.js"
    ], function(notify, validator){

        console.log(notify);
        console.log(validator);

        var postUrl = '/ippit';

        function startLoader(){
            $("#loader")[0].innerHTML = '<div class="square" ></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square "></div><div class="square last"></div></div>';
        }
        function stopLoader(){
            $("#loader")[0].innerHTML = '';
        }

        function learnRegExp(s) {
            var regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            return regexp.test(s);
        }

        $("#ippit").click(function(){

            var ip = $("#ip")[0].value;
            var port = $("#port")[0].value;

            if(!validator.isURL(ip) && !validator.isIP(ip)){
                $("#ippit").notify("Failed.", "error");
                return;
            }

            startLoader();
            $("#ippit")[0].disabled = true;

            //make api call
            var jsonData = {
                ip: ip,
                port: port
            };

            var request = $.ajax({
                type: "POST",
                url: postUrl,
                data: jsonData
            });

            request.done(function(e) {
                $("#ippit").notify("Got it.", "success");
            });

            request.fail(function(error, status) {
                $("#ippit").notify("Failed.", "error");
            });

            request.always(function() {
                stopLoader();
                $("#ippit")[0].disabled = false;
            });

        });

    });
});