require([
    "../lib/jquery/jquery.min.js"
],
function() {
    require([
        "../lib/notify/notify.min.js",
        "../lib/validator/validator.js"
    ], function(notify, validator){

        var postUrl = '/port-check';

        function startLoader(){
            $("#loader")[0].innerHTML = '<div class="square" ></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square "></div><div class="square last"></div></div>';
        }
        function stopLoader(){
            $("#loader")[0].innerHTML = '';
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
                if(e === 'open'){
                    $("#ippit").notify("Port open.", "success");
                }else if(e === 'closed'){
                    $("#ippit").notify("Closed.", "warn");
                }
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