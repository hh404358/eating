// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  onLoad: function () {
      this.getMypost();
  },
  data: {
    show:1,
    userInfo : wx.getStorageSync('userInfo')?wx.getStorageSync('userInfo'):null,
    token : wx.getStorageSync('token')?wx.getStorageSync('token'):'',
    userId: wx.getStorageSync('userId')?wx.getStorageSync('userId'):'',
    collectDishes:[],
    collectPosts:[],
    baseURL: wx.getStorageSync('baseURL'),
    functionItems: [
      { id: '1', icon: '../../icons/收藏.png', text: '我的帖子' },
      { id: '2', icon: '../../icons/收藏.png', text: '帖子收藏' },
      { id: '3', icon: '../../icons/收藏.png', text: '菜品收藏' },
      { id: '4', icon: '../../icons/评价.png', text: '评价' },
      { id: '5', icon: '../../icons/浏览记录.png', text: '浏览记录' },
      // { id: '6', icon: '../../icons/浏览记录.png', text: '红包卡券' }
    ],
    // evaluation: [
    //   { id: '1', star: '/images/MDL.png', text: '特别无敌好吃！' },
    //   { id: '2', star: '/images/MDL.png', text: '酸酸甜甜的糖草莓～' }
    //   // 可以添加更多评价
    // ],
    post:[],
    
  },




 
  
  action(event){
    let id = event.currentTarget.dataset.id;
    console.log(id);
    // 定义一个函数数组
    const actions = [
      this.getMypost,// 默认情况
      this.getMyCollectPost,
      this.getMyCollectDish,
      this.getMycomment,
      this.getMyHistory,
    ];
    // 执行对应的函数
    if (id >= 1 && id <= actions.length) {
      this.setData({
        show:id
      })
      console.log(this.data.show)
      actions[id - 1].call(this);
    }
  },
  getMypost() {
    wx.request({
      url: 'http://localhost:8083/community/myPost/',
      method:'GET',
      header: {
        'authentication': this.data.token,
        },
      success:(res)=>{
        console.log('myPost',res.data)  
        this.setData({ 
          post : res.data.data
          }); 
          console.log(this.data.post)
         
        }
      })
    
  
},
  getMyCollectDish(){
    wx.request({
      url: this.data.baseURL + 'user/collectDish',
      method:'GET',
      header: {
        'authentication': this.data.token,
        'content-type': 'application/json' // 根据实际发送的数据类型调整 content-type
       },
      success:(res)=>{
          console.log(res.data)
      }
    })
 },
   getMyCollectPost(){
  wx.request({
    url: this.data.baseURL + 'user/collectPost',
    method:'GET',
    header: {
      'authentication': this.data.token,
      'content-type': 'application/json' // 根据实际发送的数据类型调整 content-type
     },
    success:(res)=>{
        console.log(res.data)
    }
  })
},
  getMyComment(){
  wx.request({
    url: this.data.baseURL + 'user/star',
    method:'GET',
    header: {
      'authentication': this.data.token,
      'content-type': 'application/json' // 根据实际发送的数据类型调整 content-type
     },
    success:(res)=>{
        console.log(res.data)
    }
  })
},
  getMyHistory(){
  wx.request({
    url: this.data.baseURL + 'user/history',
    method:'GET',
    header: {
      'authentication': this.data.token,
      'content-type': 'application/json' // 根据实际发送的数据类型调整 content-type
     },
    success:(res)=>{
        console.log(res.data)
    }
  })
},
  
  
});