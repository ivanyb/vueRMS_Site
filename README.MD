
## 一、运行这个项目的步骤：
- 先在这个文件夹中打开cmd面板，输入  npm install 
- 在cmd面板中执行 npm run dev

```

 当前webpack要升级到2.x，那么webpack-dev-server也必须使和webpack2.x匹配的，理论上讲
 webpack-dev-server肯定也是2.x版本

```
	
## 二、update 版本

- v2:实现除了购物商城之外的页面列表组件

```
    1、subcom中的 categroupcontent.vue 和 contentsildtophot.vue 
    两个组件负责展示除了购物商城页面之外的其他菜单页面中的所有数据

    2、layout.vue中实现了路由切换组件时的动画，组件动画效果的写法

```


- v3:完成商品列表，分类菜单，轮播图，置顶数据获取和根据一级分类分组获取商品数据

- v4:实现商品分类搜索页面分页数据展示，以及分页功能的实现

- v5:完成goodsinfo.vue中集成商品图片放大jquery插件，实现商品相册图片放大查看（有bug，必须刷新goodsinfo页面才会初始化图片）

- v6:修复goodsinfo页面必须刷新页面才会初始化商品图片放大功bug

```
    主要原因是：vue渲染页面需要时间，那么jquery插件初始化一定要等到vue页面渲染完毕，可以将jquery插件初始化代码方到
     setTimeout(()=>{
          $(this.$refs.zoom1).imgzoon({magnifier:'#magnifier1'});
     },100);中

     或者
      this.$nextTick(()=>{                        
        $(this.$refs.zoom1).imgzoon({magnifier:'#magnifier1'});     
    },10); 中
    
```

- v7:完成商品详情页面中的评论提交和分页获取评论数据功能开发，其中利用 iview中的Affix实现滚动时tab栏固定在顶部

-v8:完成购物车页面功能的开发

```
    使用vuex结合localStorage管理购物车数据
   
```

## 三、填坑

```


    


```