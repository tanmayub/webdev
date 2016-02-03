/**
 * Created by TanmayPC on 2/3/2016.
 */

var registerOnclick = function(){
    console.log("redirecting to profile.html");
    location.href = "../assignment/profile.html"
}

$('#register').click(registerOnclick);
$('#login').click(registerOnclick);
$('#update').click(registerOnclick);