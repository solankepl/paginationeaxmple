(function($){
    $.fn.extend({ 
        plsPagination: function(options) {
            var defaults = {
                height: 400,
                fadeSpeed: 400,
				shownumPages:6
            };
            var options = $.extend(defaults, options);
			           
            var objContent = $(this);
          
            var fullPages = new Array();
            var subPages = new Array();
            var height = 0;
            var lastPage = 1;
            var paginatePages;
			
			var setAnmationInterval;
			var postionLast;
			var pageContainerWidth; 
			var selctedPravPage = 1;
			var checkFirstlast = false;
			var curMargineLeft=0;
         
            init = function() {
                objContent.children().each(function(i){
                    if (height + this.clientHeight > options.height) {
						console.log(subPages);
                        fullPages.push(subPages);
                        subPages = new Array();
                        height = 0;
                    }

                    height += this.clientHeight;
                    subPages.push(this);
                });

                if (height > 0) {
                    fullPages.push(subPages);
                }
             
                $(fullPages).wrap("<div class='page'></div>");
             
                objContent.children().hide();
               
                paginatePages = objContent.children();
               
                showPage(lastPage);
               
                showPagination($(paginatePages).length);
            };
            
            updateCounter = function(i) {
                //$('#page_number').html(i);
									
            };
           
            showPage = function(page) {				
				if(page>=1 && page <= $(paginatePages).length){
					//var setChild = page;
					//console.log(selctedPravPage);										
					var pravPageNum = selctedPravPage;					
					$(".pagination li a").removeClass("active");				
					$(".pagination li:nth-child("+page+") a").addClass("active");					
					if(!checkFirstlast && $(paginatePages).length>=options.shownumPages){
						setAnimtion(pravPageNum);						
					}
					checkFirstlast = false;
					i = page - 1; 
					if (paginatePages[i]) {
						$(paginatePages[lastPage]).fadeOut(options.fadeSpeed);
						lastPage = i;
						$(paginatePages[lastPage]).fadeIn(options.fadeSpeed);   
						selctedPravPage = page;		               
						updateCounter(page);
					}
				}				
            };
			
			setAnimtion = function(pravPage){
				//selctedPravPage	
				 var cur = parseInt($(".pageContainer ul").css("margin-left").replace("px",""));
				 var curNum = $(".active").text();
				 
				 if(curNum<pravPage){
					 cur = cur + ($('.pagination li').width());					 
				 } else 
				 if(curNum>pravPage){					
					 cur = cur - ($('.pagination li').width());
				 }	
				
				  if(cur>0){
				  	cur =0;
				  }else
				  if(cur<(-1*postionLast)){
				  	cur =-1*postionLast;
				  }					   
				  $(".pageContainer ul").stop().animate({"margin-left":cur+'px'});				  
			}
            
            showPagination = function(numPages) {
                var pagins = '';				
                for (var i = 1; i <= numPages; i++) {
                    pagins += '<li><a href="#" onclick="showPage(' + i + '); return false;">' + i + '</a></li>';
                }				
						
                $('.pagination .pageContainer ul').append(pagins);
				$(".pagination li a").removeClass('active');	
				$('.pagination li:nth-child(1) a').addClass('active');
				
				pageContainerWidth =  options.shownumPages*$('.pagination li').width();
				$('.pagination .pageContainer').css('width',pageContainerWidth +'px');
				
				postionLast = $('.pagination ul').width() - pageContainerWidth;
				
				  if(numPages <= options.shownumPages){
						 $("#prev, #next").hide();
						 var tempWidth = numPages*$('.pagination li').width();
						 $(".pageContainer").css("width",tempWidth+"px");
					}
            };						
			
			backAnimtion = function(direction){
				 var cur = $(".pageContainer ul").css("margin-left").replace("px","");
				 if(direction === "right"){
					 if(cur>(-1*postionLast))
			   	  	 cur--;
				 }else{
					 if(cur<0)
					  cur++;					  
				 }
			     $(".pageContainer ul").css("margin-left",cur+"px"); ;	
			}
           
            init();
           
			$(".pagination #prev").mouseover(function(){				
				setAnmationInterval = setInterval(function () { backAnimtion("left");}, 10);			 
			})
			
			$(".pagination #next").mouseover(function(){					
				setAnmationInterval = setInterval(function () {  backAnimtion("right");}, 10);		   		   
			})
			
			$(".pagination #prev, .pagination #next").mouseout(function(){
				clearTimeout(setAnmationInterval);
			})
		   
			$('#backPage').click(function() {	
				if($(paginatePages).length>=options.shownumPages){								
					animationCrousalContainer();				
				}
				showPage(lastPage);
			});
		   
		    $('#nextPage').click(function() {
				if($(paginatePages).length>=options.shownumPages){				
					animationCrousalContainer();
				}
				showPage(lastPage+2);
			});			
			
		   animationCrousalContainer = function(){			   
				var curNum = ($(".active").text());
				var tempNum=2;
				if(curNum<3){
					tempNum =1;
				}				
				curMargineLeft = -1*((curNum-tempNum)*$('.pagination li').width());
				
				if(curMargineLeft>0){
				  	curMargineLeft =0;
				  }else
				  if(curMargineLeft < (-1*postionLast)){
				  	curMargineLeft = -1*postionLast;
				  }	 
				$(".pageContainer ul").css("margin-left",curMargineLeft+"px");
		   }	   
		  
			
			$('#firstBtn').click(function() {
				if($(paginatePages).length>=options.shownumPages){
					$(".pageContainer ul").stop().animate({"margin-left":'0px'});			
					checkFirstlast = true;
				}
				showPage(1);
			});
		   
			$('#lastBtn').click(function() {
				if($(paginatePages).length>=options.shownumPages){
					 $(".pageContainer ul").stop().animate({"margin-left":(-1*postionLast)+'px'});
					 checkFirstlast = true;
				}
				 showPage($(paginatePages).length);
			});			
        }
    });
})(jQuery);


