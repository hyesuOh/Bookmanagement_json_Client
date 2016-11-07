
$(function() { // 로그인 체크
	$.ajax({
		url : "http://localhost:7070/book/sessionCheck",
		type : "GET",
		dataType : "jsonp",
		jsonp : "callback",
		success : function(result){

			if(result.login != null) {

				alert("환영합니다.");

			} else {

				alert("로그인하세요.");
				$(location).attr("href","main.html");
			}
		},
		error : function(){
			alert("로그인 에러 발생!!");
		}
	});

});


// When the user clicks anywhere outside of the modal, close it




var modal3 = document.getElementById('id03');
//도서 이미지
	$(function(){

		var imageLoader = document.getElementById('filePhoto');
		imageLoader.addEventListener('change',handleImage,false);

		function handleImage(e){
			var reader = new FileReader();
			reader.onload = function(event){
				$('.uploader img').attr('src', event.target.result);
			}
			reader.readAsDataURL(e.target.files[0]);
		}


	});
////////////도서추가
	function insertBook(){

		$.ajax({
			url : "http://localhost:7070/book/bookInsert",
			type : "GET",
			dataType : "jsonp",
			jsonp : "callback",
			data : {
				imgbase64 : $("#img").attr("src"),
				isbn : $("[type=isbn]").val(),
				author: $("[type=author]").val(),
				price : $("[type=price]").val(),
				title : $("[type=title]").val()

			},
			success : function(){
				alert("정상적으로 처리되었습니다.");
			},
			error : function(){
				alert("업데이트 에러 발생!!");
			}
		});

	}
///////////목록
	function searchBook(){
		//입력상자에 키가 입력되면 무조건 호출
		//우리가 원하는 건 enter key를 입력했을 때 서버와 통신
		if(event.keyCode == 13){
		//사용자가 입력한 ISBN번호를 가져와서
		//AJAX로 서버프로그램을 호출
			$.ajax({
				url : "http://localhost:7070/book/bookList",
				type : "GET",
				//서버로부터 오는 데이터가 JSON 문자열
				//추가적으로 JSON 문자열을 JavaScript객체로 자동 변환
				dataType : "jsonp",
				jsonp : "callback",
				data : {
					keyword : $("#place").val()
				},
				success : function(result){
					$("tbody").empty();
					//result : JSON문자열을 JavaScript 객체로 변환시킨 것
						for(var i = 0; i<result.length; i++) {
							var isAble = result[i].share;


							var tr = $("<tr></tr>").attr("data-isbn",result[i].isbn);

							var title_div=$("<div></div>").text(result[i].title);
							var detail_div=$("<div></div>");

							var myTd = $("<td></td>");


							var titleTd=myTd.append(title_div).append(detail_div);


							var authorTd = $("<td></td>").text(result[i].author);
							var priceTd = $("<td></td>").text(result[i].price);
							var img = $("<img/>").attr("src", result[i].imgbase64);
							img.css("width","140px");
							var imgTd = $("<td></td>").append(img);
							var thisTd= null;
							var deletebtn = $("<input />").attr("type","button").attr("value","삭제").attr("id","delete").attr("class","btn-xs, btn-danger");
							deletebtn.on("click",function(){

								var isbn = $(this).parent().parent().attr("data-isbn");

										$.ajax({
											url : "http://localhost:7070/book/bookDelete",
											type : "GET",
											dataType : "jsonp",
											jsonp : "callback",
											data : {
												isbn : isbn
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

							var infobtn= $("<input />").attr("type","button").attr("id","info").attr("value","상세정보보기").attr("class","btn-xs, success");
							infobtn.on("click",function(){
								alert("info!!");
								var isbn = $(this).parent().parent().attr("data-isbn");
								thisTd=$(this).parent().parent().find("td:nth-child(2) > div:nth-child(2)");
								$.ajax({
									// context root , urlMapping
									url: "http://localhost:7070/book/bookInfo",
									type: "GET",
									dataType: "jsonp",
									jsonp: "callback",
									//클라이언트가 서버쪽에 보내주는 데이터
									data: {
										isbn : isbn
									},
									// 서버쪽 프로그램을 실행시키는 과정이 성공했을 때 success호출!
									success: function (result) {
										alert("success");

										// date page supplement publisher
										var date = $("<p></p>").text("출판일: " + result.date);
										thisTd.append(date);

										var page = $("<p></p>").text("페이지수: " + result.page + "쪽");
										thisTd.append(page);

										var supplement = $("<p></p>").text("공급: " + result.supplement);
										thisTd.append(supplement);

										var publisher = $("<p></p>").text("출판사: " + result.publisher);
										thisTd.append(publisher);

										//	$('#myDiv').append(tr);
									},
									error: function() {
										alert("error");
									}

								});
								thisTd.empty();
							});
							var infoTd = $("<td></td>").append(infobtn);

							var updatebtn = $("<input />").attr("type","button").attr("value","수정").attr("class","btn-xs, btn-primary");
							updatebtn.on("click",function(){
								//thisTd = ;
								var price = $(this).parent().parent().find("td:nth-child(4)").text();  //가격부분 내용을 text 안 내용으로 변경
								var price_updatebox = $("<input />").attr("class", "updateClass").attr("type","text").val(price);

								var author = $(this).parent().parent().find("td:nth-child(3)").text();
								var author_updatebox = $("<input />").attr("class", "updateClass").attr("type","text").val(author);

								var title = $(this).parent().parent().find("td:nth-child(2) > div:nth-child(1)").text();
								var title_updatebox = $("<input />").attr("class", "updateClass").attr("type","text").val(title);

								$(this).parent().parent().find("[type=button]").attr("disabled", "disabled");


								price_updatebox.on("keyup",function(){
									if(event.keyCode==13){

										var isbn = $(this).parent().parent().attr("data-isbn");
										var price = $(this).val();
										var title = title_updatebox.val();
										var author = author_updatebox.val();

										var thisTd = $(this).parent().parent();

										$.ajax({
											url : "http://localhost:7070/book/bookUpdate",
											type : "GET",
											dataType : "jsonp",
											jsonp : "callback",
											data : {
												isbn : isbn,  //서버로 전달할 키 값 : value 값
												author: author,
												price : price,
												title : title
											},
											success : function(result){
												alert("정상적으로 처리되었습니다.");

												$(".updateClass").remove();

												thisTd.find("td:nth-child(2)").text(result.title);
												thisTd.find("td:nth-child(3)").text(result.author);
												thisTd.find("td:nth-child(4)").text(result.price);

												$(this).parent().parent().find("td:nth-child(4)").empty();
												$(this).parent().parent().find("td:nth-child(4)").text(price);

												thisTd.find("[type=button]").attr("disabled", false);
											},
											error : function(){
												alert("업데이트 에러 발생!!");
											}
										});
									}
								});

								author_updatebox.on("keyup",function(){
									if(event.keyCode==13){

										var isbn = $(this).parent().parent().attr("data-isbn");
										var author = $(this).val();
										var title = title_updatebox.val();
										var price = price_updatebox.val();

										var thisTd = $(this).parent().parent();

										$.ajax({
											url : "http://localhost:7070/book/bookUpdate",
											type : "GET",
											dataType : "jsonp",
											jsonp : "callback",
											data : {
												isbn : isbn,  //서버로 전달할 키 값 : value 값
												author: author,
												price : price,
												title : title
											},
											success : function(result){
												alert("정상적으로 처리되었습니다.");

												$(".updateClass").remove();

												thisTd.find("td:nth-child(2)").text(result.title);
												thisTd.find("td:nth-child(3)").text(result.author);
												thisTd.find("td:nth-child(4)").text(result.price);

												$(this).parent().parent().find("td:nth-child(3)").empty();
												$(this).parent().parent().find("td:nth-child(3)").text(author);

												thisTd.find("[type=button]").attr("disabled", false);
											},
											error : function(){
												alert("업데이트 에러 발생!!");
											}
										});
									}
								});

								title_updatebox.on("keyup",function(){
									if(event.keyCode==13){
										//update처리
										//db처리
										//ajax 호출해서 서버프로그램을 실행시켜서 database의 데이터를 변경
										//서버프로그램에게 어떤 값을 알려줘야지 처리가 되는가?
										//변경된 책 가격, ISBN값이 필요
										var isbn = $(this).parent().parent().attr("data-isbn");
										var title = $(this).val();
										var author = author_updatebox.val();
										var price = price_updatebox.val();

										var thisTd = $(this).parent().parent();

										$.ajax({
											url : "http://localhost:7070/book/bookUpdate",
											type : "GET",
											dataType : "jsonp",
											jsonp : "callback",
											data : {
												isbn : isbn,  //서버로 전달할 키 값 : value 값
												author: author,
												price : price,
												title : title
											},
											success : function(result){
												alert("정상적으로 처리되었습니다.");

												$(".updateClass").remove();

												thisTd.find("td:nth-child(2)").text(result.title);
												thisTd.find("td:nth-child(3)").text(result.author);
												thisTd.find("td:nth-child(4)").text(result.price);

												$(this).parent().parent().find("td:nth-child(2)").empty();
												$(this).parent().parent().find("td:nth-child(2)").text(title);

												thisTd.find("[type=button]").attr("disabled", false);
											},
											error : function(){
												alert("업데이트 에러 발생!!");
											}
										});
									}
								});

								$(this).parent().parent().find("td:nth-child(4)").text("");
								$(this).parent().parent().find("td:nth-child(4)").append(price_updatebox);

								$(this).parent().parent().find("td:nth-child(3)").text("");
								$(this).parent().parent().find("td:nth-child(3)").append(author_updatebox);


								$(this).parent().parent().find("td:nth-child(2)").text("");
								$(this).parent().parent().find("td:nth-child(2)").append(title_updatebox);




							});
							var updateTd = $("<td></td>").append(updatebtn);
							var sharebtn= null;

							if(isAble==1){sharebtn = $("<input />").attr("type","button").attr("value","대여불가");}
							else if(isAble==0){sharebtn = $("<input />").attr("type","button").attr("value","대여하기");}

							sharebtn.on("click",function(){

								if($(this).attr("value") == "대여하기") {
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
										success : function(result){

											if(result){
												alert("성공적으로 대여하였습니다.");
												eee.addClass("btn btn-danger").attr("value","반납하기");
											}

										},
										error : function(){
											alert("삭제 에러 발생!!");
										}
									});
								} else {
									alert("반납하기0012312313");

									var isbn = $(this).parent().parent().attr("data-isbn");
									var ee=$(this);
									$.ajax({
										url : "http://localhost:7070/book/bookReturn",
										type : "GET",
										dataType : "jsonp",
										jsonp : "callback",
										data : {
											isbn : isbn

										},
										success : function(result){

											if(result){

												alert("성공적으로 반납하였습니다.");
												ee.addClass("btn btn-success").attr("value","대여하기"); //여쭤보기
											}
											else{
												alert("이미 대여 된 책입니다. 대여가 불가합니다.");
											}

										},
										error : function(){
											alert("삭제 에러 발생!!");
										}
									});
								}


							});
							var shareTd=$("<td></td>").append(sharebtn);

							var commentbtn = $("<input />").attr("type","button").attr("value","서평등록").attr("class","commentbtn")
								.attr("data-target", "#id03").attr("data-toggle", "modal").attr("data-isbn",result[i].isbn);
							commentbtn.click(function() {
								// modal 화면을 찾아서..등록버튼에 isbn을 심어봐요!
								var isbn = $(this).attr("data-isbn");
								alert("버튼의 isbn : " + isbn);
								$("#commentRegister").attr("onclick","insertComment('" + isbn + "')");
							});
							var commentTd=$("<td></td>").append(commentbtn);

							var comviewbtn=$("<input/>").attr("type","button").attr("value","서평보기").attr("id","comview");
							comviewbtn.on("click",function (){

								alert("서평 보기!!");
								var isbn = $(this).parent().parent().attr("data-isbn");
								var thisTd=$(this).parent().parent().find("td:nth-child(2) > div:nth-child(2)");
								$.ajax({
									// context root , urlMapping
									url: "http://localhost:7070/book/commentView",
									type: "GET",
									dataType: "jsonp",
									jsonp: "callback",
									//클라이언트가 서버쪽에 보내주는 데이터
									data: {
										isbn : isbn
									},
									// 서버쪽 프로그램을 실행시키는 과정이 성공했을 때 success호출!
									success: function (result) {
										alert("success");

										///
										for(var i = 0; i<result.length; i++) {

											// date page supplement publisher
											var id = $("<p></p>").text("id: " + result[i].id);
											thisTd.append(id);

											var comment = $("<p></p>").text("comment: " + result[i].comment);
											thisTd.append(comment);

										}

											$('#myDiv').append(tr);

									},
									error: function() {
										alert("error");
									}

								});thisTd.empty();
							});

							var comviewTd=$("<td></td>").append(comviewbtn);

							tr.append(imgTd);
							tr.append(titleTd);
							tr.append(authorTd);
							tr.append(priceTd);
							tr.append(updateTd);
							tr.append(deleteTd);
							tr.append(infoTd);
							tr.append(shareTd);
							tr.append(commentTd);
							tr.append(comviewTd);


							$("tbody").append(tr);
						}
				},
				error : function(){
					alert("뭔가 이상함");
				}
					
			});
		}
	}

	$(document).on('click', '#delete', function(){
		$(this).parent().parent().remove();
	});


/////////정렬
	function mySort() {
		var rows = $("table").find("tbody > tr").get();

		rows.sort(function (x, y) {

			var key1 = $(x).children("td").eq(3).text();
			var key2 = $(y).children("td").eq(3).text();

			if(key1 < key2) 
				return -1;
			if(key1 > key2) 
				return 1;

			return 0;
		});

		$.each(rows, function (idx, row) {
			$("table").children("tbody").append(row);

		});
	}
/////서평추가
function insertComment(myisbn){

	alert("comment : " + $("#comment").val());
	var isbn = myisbn;
	alert(isbn);
/*
	var isbn = $(this).parent().parent().attr("data-isbn");
	alert(isbn);
*/
	$.ajax({
		url : "http://localhost:7070/book/commentInsert",
		type : "GET",
		dataType : "jsonp",
		jsonp : "callback",
		data : {
			isbn : isbn,
			comment: $("#comment").val() ///////////////////////////////질문하기.값이 안넘어옴
// )$("[type=comment]").val()
		},
		success : function(){
			alert("정상적으로 처리되었습니다.");
		},
		error : function(){
			alert("업데이트 에러 발생!!");
		}
	});


}
