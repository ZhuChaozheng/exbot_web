window.onload=function(){
	//首页数据请求
    $.ajax({
        type:'GET',
        url:'/getCategoryArticle',
        dataType:'json',
        data:{
            category:"教程",
            rows:"9",
            pageNum:"1"
        },
		success:function(data){
        	var result=data.result;
			//首页列表
			var list = result.slice(0,9);
			initIndexList(list);
		}
	});
 }

/* 首页教程填充 */
function initIndexList(indexList){
    var itemWithImg=indexList.slice(0,3);
    var itemContainer = $("#div_item_container");
    itemContainer.empty();
    $.each(itemWithImg,function(index,value){
        var Child ="<div class='exbot-content-item' id='item"+index+"'><a target='_blank' href='/findArticle?articleId="+value['articleId']+"&originalAuthor="+value['originalAuthor']+" '><div class='item-box'><div class='img-area'><img class='normal-img' src='"+value['imgUrl']+"' alt='"+value['articleTitle']+"' /></div><div class='box-header'><p>"+value['articleTitle']+"</p></div></div></a></div>";
        itemContainer.append(Child);
    });
    //appendix
    for(var i=0;i<3;++i){//注意此处补充的内容，很难调试
        var appendixContainer=$("#item"+i);
        appendixContainer.append("<div class='item-appendix'><ul id='ul_appendix_container"+i+"'></ul></div>");
        var itemAppendix=indexList.slice(2*i+3,2*i+5);
        var itemAppendixContainer=$("#ul_appendix_container"+i);
        $.each(itemAppendix,function(index,value){//为了防止由于字数问题导致的放大后换行不一的问题，需要将其限定高度以及隐藏超出范围的文本
            var child = "<li style="height: 60px; overflow: hidden;"><a target='_blank' href='/findArticle?articleId="+value['articleId']+"&originalAuthor="+value['originalAuthor']+"'>"+value['articleTitle']+"</a></li>"
            itemAppendixContainer.append(child);
        });
    }
}

/*首页书籍详情*/
function bookInfo(articleId){
	 if(!isNaN(articleId)){
         $.ajax({
             type:'post',
             url:'/getArticleTitleByArticleIdAndOriginalAuthor',
             dataType:'json',
             data:{
                 articleId:articleId,
                 originalAuthor:"exbot"
             },
             success:function(data){
                 var book_name = $("#book-name");
                 var book_description = $("#book-description");
                 book_name.empty();
                 book_description.empty();
                 book_name.append(data['articleTitle']);
                 book_description.append(data['articleTabloid']);
                 $("#book-info-link").attr("href","findArticle?articleId="+articleId+"&originalAuthor=exbot");
                 $("#book-info").attr("style","display: block;");
             }
         });


			 }
 }
 
/*切换三角指示器*/
function show(obj) {
	 $(obj).parent().parent().find(".exbot-book-tab").removeClass("active");
	 $(obj).parent().addClass("active");
	 var t = $(obj).parent().parent().find(".indicator-triangle");
	 t.css({
		 left: $(obj).position().left + $(obj).outerWidth(!0) / 2 - t.outerWidth(!0) / 2
	 })
 }

function goTop() {
    $('html').animate({
        scrollTop : '0px'
    }, 600);
}

/*下拉时固定导航栏*/
$(window).scroll(function() {
    var nav = $("#headerPage"); // 得到导航对象
    var goTop=$("#goTop");
    if ($(window).scrollTop() >= 100) {
        nav.addClass("navbar-fixed-top");
        goTop.attr("style","cursor: pointer;display: block");
    } else {
        nav.removeClass("navbar-fixed-top");
        goTop.attr("style","display: none");
    }
})