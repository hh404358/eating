// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  onLoad: function () {
      this.getMypost();

  },
  data: {
    userInfo : wx.getStorageSync('userInfo')?wx.getStorageSync('userInfo'):null,
    token : wx.getStorageSync('token')?wx.getStorageSync('token'):'',
    userId: wx.getStorageSync('userId')?wx.getStorageSync('userId'):'',
    collectDishes:[],
    collectPosts:[],
    baseURL: wx.getStorageSync('baseURL'),
    functionItems: [
      {
        id: '1', icon: '../../icons/收藏.png', text: '收藏'
      },
      { id: '2', icon: '../../icons/评价.png', text: '评价' },
      { id: '3', icon: '../../icons/浏览记录.png', text: '浏览记录' },
      { id: '4', icon: '../../icons/浏览记录.png', text: '红包卡券' }
    ],
    evaluation: [
      { id: '1', star: '/images/MDL.png', text: '特别无敌好吃！' },
      { id: '2', star: '/images/MDL.png', text: '酸酸甜甜的糖草莓～' }
      // 可以添加更多评价
    ],
    post:[],
    boxes: [
      { id: '1', image: '/images/MDL.png', text: '第一列第一个盒子的文字信息' },
      { id: '2', image: '/images/MDL.png', text: '第一列第二个盒子的文字信息' },

    ]
  },




  getMypost() {
    console.log('userId',this.data.userId)
      wx.request({
        url: 'http://localhost:8083/community/userPost/'+this.data.userId,
        method:'GET',
        header: {
          'authentication': this.data.token,
          // 'content-type': 'application/json' // 根据实际发送的数据类型调整 content-type
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
  
  action(event){
    let id = event.currentTarget.dataset.id;
    console.log(id);
   // 定义一个函数数组
const actions = [
  this.getMyCollectDish,
  this.getMycomment,
  this.getMyHistory,
  this.getMyCollectPost // 默认情况
];

// 执行对应的函数
if (id >= 1 && id <= actions.length) {
  actions[id - 1].call(this);
}
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
   
  
});