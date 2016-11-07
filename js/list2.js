
// HTML이 화면에 로드되면 바로 호출해요!!

// Get the modal
var modal = document.getElementById('id01');
var modal2 = document.getElementById('id02');

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == modal2) {
        modal2.style.display = "none";
    }

}
// 로그인 체크


function registerInfo(){

            $.ajax({
                url : "http://localhost:7070/book/memberInsert",
                type : "GET",
                dataType : "jsonp",
                jsonp : "callback",
                data : {
                    id : $(".idd").val(),
                    password : $(".passwordd").val(),
                    email : $(".emaill").val()

                },
                success : function(result){
                    alert("정상적으로 처리되었습니다.");

                    $(location).attr("href","main.html");
                },
                error : function(){
                    alert("회원가입 에러 발생!!");
                }
            });

}

function login(){

    $.ajax({
        url : "http://localhost:7070/book/memberLogin",
        type : "GET",
        dataType : "jsonp",
        jsonp : "callback",
        data : {
            id : $(".id").val(),
            password : $(".password").val(),
        },
        success : function(result){
            if(result) {
                alert("로그인 되었습니다.");
                $(location).attr("href", "main.html");
            }else{
                alert("로그인 불가. 먼가 이상");
                $(location).attr("href", "main.html");
            }


        },
        error : function(){
            alert("로그인 오류!!");

        }
    });

}

function logout(){

    $.ajax({
        url : "http://localhost:7070/book/memberLogout",
        type : "GET",
        dataType : "jsonp",
        jsonp : "callback",

        success : function(result){

                alert("로그아웃 되었다!");
                $(location).attr("href", "main.html");

        },
        error : function(){
            alert("로그인 오류!!");

        }
    });

}