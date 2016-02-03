/**
 * Created by TanmayPC on 2/3/2016.
 */

var registerOnclick = function(){
    console.log("redirecting to profile.html");
    location.href = "../assignment/profile.html"
}

var tdOnclick = function(){
    location.href = "../assignment/form-fields.html"
}

$('#register').click(registerOnclick);
$('#login').click(registerOnclick);
$('#update').click(registerOnclick);
$('td[name=formRedirect]').click(tdOnclick);