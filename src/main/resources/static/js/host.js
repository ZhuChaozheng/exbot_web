var host = "http://localhost:8080/exbot_net"
// var host = "http://www.exbot.com"
var searchTitle = null;
var cateId = null;
var tId = null;

/*获取随机数*/
function getRandom(min,max){
	//Math.random()*(上限-下限+1)+下限  
    return parseInt(Math.random() * (max - min + 1) + min); 
}

/* 分页功能
 * pages总页数,firstPage,pageNum,lastPage
firstPage 第一页，isFirstPage 是否是第一页
lastPage 最后一页 ，isLastPage 是否是最后一页
nextPage 下一页 	hasNextPage是否有下一页,
prePage 上一页  hasPreviousPage 是否有上一页，
pageNum 当前页码数，
 start
*/
function pagination(pageNum,pages,firstPage,isFirstPage,lastPage
	,isLastPage,nextPage,hasNextPage,prePage,hasPreviousPage){
	var ul_pagination = $("#ul_pagination");
	ul_pagination.empty();
	if(pages>0){
		//首页
		if(isFirstPage!=true){
		ul_pagination.append("<li><a target='_self' href='javascript:goToPage(1)'>首页</a></li>");
		}
		//上一页
		if(hasPreviousPage==true){
			ul_pagination.append("<li class='prev-page'><a target='_self' href='javascript:goToPage("+(pageNum-1)+")'>上一页</a></li>");
		}
		//数字部分
		//总页数小于7
		if(pages<7){
			for(var i=firstPage;i<=lastPage;i++){
				//当前页高亮显示
				if(i==pageNum){
					ul_pagination.append("<li class='active'><span>"+i+"</span></li>");
				}else{
					ul_pagination.append("<li><a target='_self' href='javascript:goToPage("+i+")'>"+i+"</a></li>")
				}
			}
		//总页数大于7 但是是前三页
		}else if(pageNum<=3){
			for(var i=firstPage;i<=7;i++){
				//当前页高亮显示
				if(i==pageNum){
					ul_pagination.append("<li class='active'><span>"+i+"</span></li>");
				}else{
					ul_pagination.append("<li><a target='_self' href='javascript:goToPage("+i+")'>"+i+"</a></li>")
				}
			}
		//总页数大于7 但是是最后三页
		}else if((pages-pageNum)<=3){
				for(var i = pages-6;i<=pages;i++){
				//当前页高亮显示
				if(i==pageNum){
					ul_pagination.append("<li class='active'><span>"+i+"</span></li>");
				}else{
					ul_pagination.append("<li><a target='_self' href='javascript:goToPage("+i+")'>"+i+"</a></li>")
				}
			}
		//总页数大于7 又刚好能将本页显示在和中间
		}else{
			for(var i = pageNum-3;i<=pageNum+3;i++){
				//当前页高亮显示
				if(i==pageNum){
					ul_pagination.append("<li class='active'><span>"+i+"</span></li>");
				}else{
					ul_pagination.append("<li><a target='_self' href='javascript:goToPage("+i+")'>"+i+"</a></li>")
				}
			}
		}

		//拼接下一页
		if(hasNextPage==true){
			ul_pagination.append("<li class='next-page'><a target='_self' href='javascript:goToPage("+(pageNum+1)+")'>下一页</a></li>")
		} 
		//拼接尾页
		if(isLastPage!=true){
			ul_pagination.append("<li class='last-page'><a target='_self' href='javascript:goToPage("+pages+")'>尾页</a></li>")
		}
		//总页数
		ul_pagination.append("<li class='last-page'><a target='_self' href='#'>共"+pages+"页</a></li>")

	}
}

/* 跳转至指定页*/
function goToPage(pageNum){
		if(pageNum<=0){
			return;
		}else{
			console.log(pageNum);
			console.log(searchTitle);
			console.log(cateId);
			 $.ajax({
			 	type:"post",
			 	dataType:"json",
			 	url:host+"/home/next_page.do",
			 	data:{"pageNum":pageNum,"title":searchTitle,"categoryId":cateId,"tagId":tId},
			 	success:function(data){
		 			var blogList = data.data.list;
		 			var pageInfo = data.data;
	 			 	//分页部分
					var pageNum =pageInfo.pageNum;
					var pages=pageInfo.pages;
					var firstPage=pageInfo.firstPage;
					var isFirstPage=pageInfo.isFirstPage;
					var lastPage = pageInfo.lastPage;
					var isLastPage=pageInfo.isLastPage;
					var nextPage=pageInfo.nextPage;
					var hasNextPage=pageInfo.hasNextPage;
					var prePage = pageInfo.prePage;
					var hasPreviousPage = pageInfo.hasPreviousPage;
					pagination(pageNum,pages,firstPage,isFirstPage,lastPage
		,isLastPage,nextPage,hasNextPage,prePage,hasPreviousPage);

 		 		 	var blogContainer = $("#div_article_container");
 		 		 	blogContainer.empty();
				 	$.each(blogList,function(index,value){
				 		var title = value.title;
				 		var summary = value.summary;
				 		var blogId = value.blogId;
				 		var viewCount = value.viewCount;
				 		var likeCount = value.likeCount;
				 		var commentCount = value.commentCount;
				 		var categoryId = value.categoryId;
				 		var shareCount = value.shareCount;
				 		var createTimeStr = value.createTimeStr;
				 		var categoryName = value.categoryName;
				 		var imgUrl=value.imgHost+value.imgUri;
				 		var blogChild = "<article class='excerpt'><header><a target='_self' class='label label-important' href='category.html?categoryId="+categoryId+"'>"+categoryName+"<i class='label-arrow'></i></a> <h2><a target='_self'  href='article.html?blogId="+blogId+"' title='"+title+"'>"+title+" </a></h2></header><div class='focus'> <a target='_self' target='blank' href='#'><img class='thumb' src='"+imgUrl+"' alt='"+title+"' /></a>	</div> 	<span class='note'>"+summary+"</span>	<p class='auth-span'> <span class='muted'><i class='fa fa-clock-o'></i> "+createTimeStr+"</span> <span class='muted'><i class='fa fa-eye'></i> "+viewCount+"&nbsp;浏览</span> <span class='muted'><a target='_self' target='_self' href='http://www.mycookies.cn/article.html?blogId="+blogId+"'><i class='fa fa-comments-o'></i>&nbsp;<span id = 'http://www.mycookies.cn/article.html?blogId="+blogId+"' class = 'cy_cmt_count'></span><script id='cy_cmt_num' src='https://changyan.sohu.com/upload/plugins/plugins.list.count.js?clientId=cytqlFQwr'></script> 评论</a></span><span class='muted'> <a target='_self' href='javascript:;' data-action='ding' data-id='3849' id='Addlike' class='action'><a href='javascript:addLike("+blogId+")'><i class='fa fa-heart-o'></i></a><span class='count'>"+likeCount+"人喜欢</span></a></span></p> </article>";
				 		blogContainer.append(blogChild);
				 	})
			 	}
			 })

	}
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


/*根据标签查找*/
function findByTag(tagId,tagName){
	changeThePageTitle(tagName);
	initialHeader(0,tagName,tagId);
	$.ajax({
		type:"post",
		dataType:"json",
		url:host+"/user/blog/list_by_tag.do",
		data:{"tagId":tagId},
		success:function(data){
			var blogList = data.data.list;
 			var pageInfo = data.data;
			 	//分页部分
			var pageNum =pageInfo.pageNum;
			var pages=pageInfo.pages;
			var firstPage=pageInfo.firstPage;
			var isFirstPage=pageInfo.isFirstPage;
			var lastPage = pageInfo.lastPage;
			var isLastPage=pageInfo.isLastPage;
			var nextPage=pageInfo.nextPage;
			var hasNextPage=pageInfo.hasNextPage;
			var prePage = pageInfo.prePage;
			var hasPreviousPage = pageInfo.hasPreviousPage;
			pagination(pageNum,pages,firstPage,isFirstPage,lastPage
		,isLastPage,nextPage,hasNextPage,prePage,hasPreviousPage);

			initBlogList(blogList);
			tId = tagId;
		}
	})

}

/*搜索功能*/
function search(){
	var value = $("#input_search").val();
	if(value==""||value==null){
		value=$("#input_search").attr("placeholder");
	}
	$.ajax({
		type:"post",
		dataType:"json",
		url:host+"/home/listByTitle.do",
		data:{title:value},
		success:function(result){
			var pageInfo = result.data.blogPageInfo;
			//分页部分
			var pageNum =pageInfo.pageNum;
			var pages=pageInfo.pages;
			var firstPage=pageInfo.firstPage;
			var isFirstPage=pageInfo.isFirstPage;
			var lastPage = pageInfo.lastPage;
			var isLastPage=pageInfo.isLastPage;
			var nextPage=pageInfo.nextPage;
			var hasNextPage=pageInfo.hasNextPage;
			var prePage = pageInfo.prePage;
			var hasPreviousPage = pageInfo.hasPreviousPage;
			var blogList = pageInfo.list;

		pagination(pageNum,pages,firstPage,isFirstPage,lastPage
		,isLastPage,nextPage,hasNextPage,prePage,hasPreviousPage);
		initBlogList(blogList);

			}
		})
	 searchTitle=value;
	}


/*根据类别查找*/
function findByCategory(categoryId,categoryName){
    changeThePageTitle(categoryName);
    initialHeader(1,categoryName,categoryId);
    $.ajax({
        type:"post",
        dataType:"json",
        url:host+"/home/list_by_category.do",
        data:{"categoryId":categoryId},
        success:function(data){
            var blogList = data.data.list;
            var pageInfo = data.data;
            //分页部分
            var pageNum =pageInfo.pageNum;
            var pages=pageInfo.pages;
            var firstPage=pageInfo.firstPage;
            var isFirstPage=pageInfo.isFirstPage;
            var lastPage = pageInfo.lastPage;
            var isLastPage=pageInfo.isLastPage;
            var nextPage=pageInfo.nextPage;
            var hasNextPage=pageInfo.hasNextPage;
            var prePage = pageInfo.prePage;
            var hasPreviousPage = pageInfo.hasPreviousPage;
            pagination(pageNum,pages,firstPage,isFirstPage,lastPage
                ,isLastPage,nextPage,hasNextPage,prePage,hasPreviousPage);
            initBlogList(blogList);
			cateId = categoryId;
        }
    })
}

/*更改网页标题*/
	function changeThePageTitle(name){
		var title = $("#title_page_name");
		title.empty();
		title.append(name);
	}


/* 增加喜欢 */
/*function addLike(blogId){
	var icon = $("#fa_"+blogId);
	var status = icon.attr("status");
	var likeCount = $("#like_count_"+blogId);
	$.ajax({
		dataType:"json",
		url:host+"/user/blog/add_like.do",
		data:{blogId,blogId},
		success:function(result){
			 if(result.status==4){
		 	  if(status==0){
			 		icon.attr("status",1);
		 			icon.removeClass("fa-heart-o").addClass("fa-heart");
		 			var likeCountNumber = parseInt(likeCount.text())+1;
		 			likeCount.empty().text(likeCountNumber+"人喜欢");
				 	}else{
			 		icon.attr("status",0);
		 			icon.removeClass("fa-heart").addClass("fa-heart-o");
		 			var likeCountNumber = parseInt(likeCount.text())-1;
		 			likeCount.empty().text(likeCountNumber+"人喜欢");
		 		}
			 }else if(result.status==5){
			 	 	icon.attr("status",0);
		 			icon.removeClass("fa-heart").addClass("fa-heart-o");
		 			var likeCountNumber = parseInt(likeCount.text())-1;
		 			likeCount.empty().text(likeCountNumber+"人喜欢");
		 			alert("您已取消点赞！");
			 }

		}
	})
}
 */
function goTop() {
	$('html').animate({
		scrollTop : '0px'
	}, 600);
}