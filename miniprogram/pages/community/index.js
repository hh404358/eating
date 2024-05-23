Page({
  onLoad:function(){
    this.getPosts()
    console.log('getPosts')
  },
  data: {
    isThumb:false,
    baseURL:wx.getStorageSync('baseURL'),
    token:wx.getStorageSync('token'),
    posts:[],
    boxes: [
      { id: '1', image: '/images/foods/麻辣烫冒菜@3x.png', text: '文字文字文字文字文字文字文字' },
      { id: '2', image: '/images/foods/牛排西餐@3x.png', text: '文字文字文字文字文字文字文字' },
    ]
  },
  
  getPosts(){
    console.log('getPosts')
    wx.request({
      url: this.data.baseURL + 'community/postList',
      method:'GET',
      header: {
        'authentication': this.data.token,
        'content-type': 'application/json' // 根据实际发送的数据类型调整 content-type
       },
      success:(res)=>{
          console.log(res.data)
          this.setData({
            posts:res.data.data
          })
      },
      fail:(res)=>{
        console.log(res)
      }
    })
  
  },
  postDetail(event){
    let postId = event.currentTarget.dataset.id;
    wx.request({
      url: this.data.baseURL + 'community/postInfo/'+postId,
      method:'GET',
      header: {
        'authentication': this.data.token,
        'content-type': 'application/json' // 根据实际发送的数据类型调整 content-type
       },
      success:(res)=>{
          console.log(res.data)
      }
    })
   }
  
});