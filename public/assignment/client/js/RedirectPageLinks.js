/**
 * Created by TanmayPC on 2/3/2016.
 */
$('document').ready(function() {
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

    /*var keyup = function() {
        var phones = $("#inputPhone").val();
        phones = phones.split(",");
        var text = "";
        for(var i = 0; i < phones.length; i++) {
            if(phones[i].length > 3) {
                var str = phones[i];
                str = str.substring(0,3) + "-" + str.substring(4);
                phones[i] = str;
            }
            if(phones[i].length > 7) {
                var str = phones[i];
                str = str.substring(0,7) + "-" + str.substring(8);
                phones[i] = str;
            }
            if(phones[i].length > 11) {
                var str = phones[i];
                str = str + ",";
                text += str;
            }
            else {
                text += phones[i];
            }
        }
        $('#inputPhone').val(text);
    }

    var keyClick = function() {
        console.log("keyup sucks..!!");
    }*/

    $('body').on("keyup",'#inputPhone', function(){
        //console.log('keyed');
        var phones = $("#inputPhone").val();
        phones = phones.split(",");
        var text = "";
        for(var i = 0; i < phones.length; i++) {
            if(phones[i].length > 3) {
                var str = phones[i];
                str = str.substring(0,3) + "-" + str.substring(4);
                phones[i] = str;
            }
            if(phones[i].length > 7) {
                var str = phones[i];
                str = str.substring(0,7) + "-" + str.substring(8);
                phones[i] = str;
            }
            if(phones[i].length > 11) {
                var str = phones[i];
                str = str + ",";
                text += str;
            }
            else {
                text += phones[i];
            }
        }
        $('#inputPhone').val(text);
    });

    $('#register').click(registerOnclick);
    $('#login').click(registerOnclick);
    $('#update').click(registerOnclick);
    /*$('#inputPhone').keyup(keyup);
    $('#inputPhone').click(keyClick);*/

    $('td[name=formRedirect]').click(tdOnclick);
    $('td[name=formRedirect]').hover(tdHover);
});
