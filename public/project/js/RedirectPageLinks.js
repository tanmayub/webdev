/**
 * Created by TanmayPC on 2/3/2016.
 */

var registerOnclick = function() {
    console.log("redirecting to profile.html");
    location.href = "../assignment/profile.html";
}

var tdOnclick = function() {
    location.href = "../assignment/form-fields.html";
}

var tdHover = function() {
    //console.log("Hovered");
    $(this).addClass('cursor');
}

$('#register').click(registerOnclick);
$('#login').click(registerOnclick);
$('#update').click(registerOnclick);
$('td[name=formRedirect]').click(tdOnclick);
$('td[name=formRedirect]').hover(tdHover);
