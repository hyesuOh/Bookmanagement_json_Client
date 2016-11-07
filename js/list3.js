
//var isbn = $(this).parent().parent().attr("data-isbn");
alert("list3 in");
$.ajax({
    url : "http://localhost:7070/book/commentList",
    type : "GET",

    dataType : "jsonp",
    jsonp : "callback",
    data : {
       // isbn: isbn
    },
    success : function(result){

        for(var i = 0; i<result.length; i++) {

          var tr = $("<tr></tr>").attr("id",result[i].num);
            var titleTd = $("<td></td>").text(result[i].title);
            var commentTd = $("<td></td>").text(result[i].comment);
            var authorTd = $("<td></td>").text(result[i].author);
            var deletebtn = $("<input />").attr("type","button").attr("value","삭제").attr("class","btn-xs, btn-danger");
            deletebtn.on("click",function(){

                var isbn = $(this).parent().parent().attr("data-isbn");

                $.ajax({
                    url : "http://localhost:7070/book/commentDelete",
                    type : "GET",
                    dataType : "jsonp",
                    jsonp : "callback",
                    data : {
                       // isbn : isbn,
                        num : $(this).parent().parent().attr("id")
                    },
                    success : function(){
                        alert("정상적으로 처리되었습니다.");

                    },
                    error : function(){
                        alert("삭제 에러 발생!!");
                    }
                });

            });
            var deleteTd = $("<td></td>").append(deletebtn);

            tr.append(titleTd);
            tr.append(commentTd);
            tr.append(authorTd);
            tr.append(deleteTd);
            $("tbody").append(tr);

        }
    },
    error : function(){
        alert("뭔가 이상함 list 3");
    }

});
