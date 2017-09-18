(function($){
	
	var fnName = 'magnifier';
	var magnifier = {
		magnifier : ".magnifier",//最外层的大容器

		container : ".magnifier-container",//选择当前主图的承载容器

		containerImg : '.images-cover',//图片的容器

		view : ".magnifier-view",//图片放大后承载容器

		width : 368,//图片放大后承载容器宽度

		height : 368,//图片放大后承载容器高度

		moveView : ".move-view",//跟随鼠标移动的容器

		moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例

		zoom : 4,//缩放比例

		thumbnail : ".magnifier-line > ul",//缩略图容器

		assembly : ".magnifier-btn",//按钮组

		index : 0//当前图片的索引
	};


	$.fn.imgzoon = function(magnifierAttr){

		//设置属性值
		if(typeof(magnifierAttr) == "object"){

			for( var n in magnifierAttr){

				magnifier[n] = magnifierAttr[n];
			}
		}

		var _this = {};
		//绑定容器		
		
		_this.magnifier = $(magnifier.magnifier);
		_this.container = _this.magnifier.find(magnifier.container);
		_this.view = _this.magnifier.find(magnifier.view);
		_this.moveView = _this.magnifier.find(magnifier.moveView);
		_this.thumbnail = _this.magnifier.find(magnifier.thumbnail);
		_this.assembly = _this.magnifier.find(magnifier.assembly);
		_this.containerImg = _this.magnifier.find(magnifier.containerImg);
		var imgBox = _this.containerImg;

		//設置寬高
		_this.magnifier.css({
			"width" : magnifier.width
		});
		_this.container.css({
			"width" : magnifier.width,
			"height" : magnifier.height
		});
		_this.view.css({
			"width" : magnifier.width,
			"height" : magnifier.height
		});

		var boxMoveViewWidth,boxMoveViewHeight;
		if(magnifier.moveWidth){

			boxMoveViewWidth = magnifier.moveWidth;
		}else{

			boxMoveViewWidth = magnifier.width/magnifier.zoom;
		}
		boxMoveViewHeight = boxMoveViewWidth;

		_this.moveView.css({
			"width" : boxMoveViewWidth,
			"height" : boxMoveViewHeight
		});

		//计算体积碰撞的变量
		var deviationXl,
			deviationXr,
			deviationYt,
			deviationYb,
			imgWidth,
			imgHieght,
			multiple;

		_this.eqImg = function(){

			var img = new Image(),
				src = _this.thumbnail.find("img").eq(magnifier.index).attr('src');

				console.log(_this.thumbnail.find("img"));
			img.src = src;
			
			//承载容器的宽高
			var containerWidth = magnifier.width;
			var containerHeight = magnifier.height;

			_this.thumbnail.find('>*').removeClass('active').eq(magnifier.index).addClass('active');

			function imgLoadEnd(){
				
				if(img.width == 0){

					img.onload = imgLoadEnd;
				}

				var styleCss;
				if(img.width > img.height){
					
					imgWidth = magnifier.width;
					imgHieght = img.height / (img.width / magnifier.width);
					// styleCss = "top:50%;margin-top:"+(-imgHieght/2)+"px";
				}else{

					imgWidth = img.width / (img.height / magnifier.width);
					imgHieght = magnifier.width;
					
					// styleCss = "left:50%;margin-left:"+(-imgWidth/2)+"px";
				}

				imgBox.empty().append('<img src="'+src+'" width="'+imgWidth+'" height="'+imgHieght+'" style="'+styleCss+'" />');
				
				//重新计算移动盒子与图片的倍数
				multiple = magnifier.width / boxMoveViewWidth;

				//容器加载图片
				_this.view.empty().append('<img src="'+src+'" width="'+imgWidth*multiple+'" height="'+imgHieght*multiple+'" />');
			
				//偏移量
				deviationXl = (magnifier.width - imgWidth) /2;
				deviationXr = magnifier.width - deviationXl - boxMoveViewWidth + 1;//这里额外+1的是要计算容器的左边框
				deviationYt = (magnifier.height - imgHieght) /2;
				deviationYb = magnifier.height - deviationYt - boxMoveViewHeight + 1;//这里额外+1的是要计算容器的上边框

			}

			imgLoadEnd();
		}
		//完成后执行
		_this.eqImg();

		_this.moveFn = function(e){

			var X = (e.clientX-_this.magnifier.offset().left)-boxMoveViewWidth/2,
				Y = (e.clientY-_this.magnifier.offset().top + $(document).scrollTop())-boxMoveViewHeight/2;

			endX = (X > deviationXl) ? (X < deviationXr) ? X : deviationXr : deviationXl;
			endY = (Y > deviationYt) ? (Y < deviationYb) ? Y : deviationYb : deviationYt;
			
			//当Y轴超出容器
			endY = (endY > 0) ? (endY > (magnifier.width-boxMoveViewHeight)) ? (magnifier.height-boxMoveViewHeight) : endY : 0;
			_this.moveView.css({
				'left' : endX,
				'top' : endY,
				'display' : "block"
			});
			
			positionX = (endX - (magnifier.width-imgWidth)/2)*multiple;
			positionY = (endY - (magnifier.height-imgHieght)/2)*multiple;

			_this.view.css({
				'display' : "block"
			}).find('img').css({
				'margin-left' : -positionX,
				'margin-top' : -positionY
			});
		}

		_this.container.on('mousemove',function(e){
			
			_this.moveFn(e);

		}).on('mouseleave',function(){

			_this.moveView.hide();
			_this.view.hide();
		});

		var thumbnailImg = _this.thumbnail.find('>*'),
			lineLenght = thumbnailImg.length;
		_this.imgMove = function(_boole){

			(_boole) ? magnifier.index++ : magnifier.index--;

			var _deviation = Math.ceil(magnifier.width / thumbnailImg.width() /2);
			if(lineLenght < _deviation){
				return false;
			}
			
			(magnifier.index < 0) ? magnifier.index = 0 : (magnifier.index > lineLenght-_deviation) ? magnifier.index = lineLenght - _deviation : magnifier.index;

			var endLeft = (thumbnailImg.width() * magnifier.index) - thumbnailImg.width();
			
			_this.thumbnail.css({

				"left" : ((endLeft > 0) ? -endLeft : 0)+"px"
			});
		}

		//按钮组动作
		_this.assembly.find(">*").on('click',function(){

			_this.imgMove($(this).index());
		});

		thumbnailImg.on('click',function(){

			magnifier.index = $(this).index();

			//显示图片
			_this.eqImg();

			//缩略图位置移动
			_this.imgMove(magnifier.index);
		});

		_this.setIndex = function(n){

			magnifier.index = (n) ? n : 0;
		}

		$.myimgzoomobj = _this;
		// return _this;
	}
})(jQuery);