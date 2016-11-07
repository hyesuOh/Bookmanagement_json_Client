


function searchComment(){

    if (event.keyCode == 13) {
        //사용자가 입력한 ISBN번호를 가져와서
        //AJAX로 서버프로그램을 호출
        $.ajax({
            url: "http://localhost:7070/book/commentKeyword",
            type: "GET",
            //서버로부터 오는 데이터가 JSON 문자열
            //추가적으로 JSON 문자열을 JavaScript객체로 자동 변환
            dataType: "jsonp",
            jsonp: "callback",
            data: {
                keyword: $("#placee").val()
            },
            success: function (result) {
                $("tbody").empty();
                //result : JSON문자열을 JavaScript 객체로 변환시킨 것
                for (var i = 0; i < result.length; i++) { //title id comment

                  //  var tr = $("<tr></tr>").attr("data-isbn", result[i].isbn);
                    var tr = $("<tr></tr>");
                    var titleTd = $("<td></td>").text(result[i].title);
                    var commentTd = $("<td></td>").text(result[i].comment);
                    var idTd = $("<td></td>").text(result[i].id);
                    tr.append(titleTd);
                    tr.append(commentTd);
                    tr.append(idTd);
                    $("tbody").append(tr);
                }

            },
            error: function () {
                alert("뭔가 이상함");
            }

        });
    }
}