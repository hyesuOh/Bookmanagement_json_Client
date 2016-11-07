
//var isbn = $(this).parent().parent().attr("data-isbn");
alert("list5 in");
$.ajax({
    url : "http://localhost:7070/book/myshareList",
    type : "GET",
    //서버로부터 오는 데이터가 JSON 문자열
    //추가적으로 JSON 문자열을 JavaScript객체로 자동 변환
    dataType : "jsonp",
    jsonp : "callback",
    data : {

    },
    success : function(result){

        for(var i = 0; i<result.length; i++) {

            //var tr = $("<tr></tr>");
            var tr = $("<tr></tr>").attr("data-isbn",result[i].isbn);
            var titleTd = $("<td></td>").text(result[i].title);
            var authorTd = $("<td></td>").text(result[i].author);
            var deletebtn = $("<input />").attr("type","button").attr("value","반납하기").attr("class","btn-xs, btn-danger");

            deletebtn.on("click",function(){

                if($(this).attr("value") == "반납하기") {

                    var isbn = $(this).parent().parent().attr("data-isbn");
                    var ee = $(this);

                    $.ajax({
                        url: "http://localhost:7070/book/bookReturn",
                        type: "GET",
                        dataType: "jsonp",
                        jsonp: "callback",
                        data: {
                            isbn: isbn
                        },
                        success: function (result) {

                            if (result) {
                                alert("성공적으로 반납하였습니다.");
                                ee.addClass("btn btn-success").attr("value", "대여하기"); //여쭤보기
                            }

                        },
                        error: function () {
                            alert("삭제 에러 발생!!");
                        }
                    });

                }else{

                    var isbn = $(this).parent().parent().attr("data-isbn");
                    var eee=$(this);
                    $.ajax({
                        url : "http://localhost:7070/book/bookShare",
                        type : "GET",
                        dataType : "jsonp",
                        jsonp : "callback",
                        data : {
                            isbn : isbn

                        },
                        success : function(){

                            if(result){
                                alert("성공적으로 대여하였습니다.");
                                eee.addClass("btn btn-danger").attr("value","반납하기");
                            }else{
                                alert("이미 대여 된 책입니다.");
                            }

                        },
                        error : function(){
                            alert("삭제 에러 발생!!");
                        }
                    });
                }

            });
            var deleteTd = $("<td></td>").append(deletebtn);
            tr.append(titleTd);
            tr.append(authorTd);
            tr.append(deleteTd);
            $("tbody").append(tr);

        }
    },
    error : function(){
        alert("뭔가 이상함 list 3");
    }

});
