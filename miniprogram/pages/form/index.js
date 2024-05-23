Page({
  onLoad:function(){
    this.getRestaurants();
    
  },
  data: {
    baseURL:wx.getStorageSync('baseURL'),
    token:wx.getStorageSync('token'),
    category:[
      { id: '1', img: '../../images/foods/汉堡披萨@3x.png', type: '汉堡披萨' },
      { id: '2', img: '../../images/foods/日韩料理@3x.png', type: '日韩料理'  },
      { id: '3', img: '../../images/foods/龙虾烧烤(龙虾不会画@3x.png', type: '龙虾烧烤'  },
      { id: '4', img: '../../images/foods/火锅香锅@3x.png', type: '火锅香锅'  },
      { id: '5', img: '../../images/foods/甜点饮品@3x.png', type: '甜点饮品'  },
      { id: '6', img: '../../images/foods/牛排西餐@3x.png', type: '牛排西餐'  },
      { id: '7', img: '../../images/foods/麻辣烫冒菜@3x.png', type: '麻辣烫冒菜'  },
      { id: '8', img: '../../images/foods/小吃@3x.png', type: '小吃零食'  }
    ],
  
    shops: [
      // { id: '1', icon: '../../images/foods/汉堡披萨@3x.png', text: '店铺' },
      // { id: '2', icon: 'path/to/image2.png', text: '店铺' },
      // { id: '3', icon: 'path/to/image3.png', text: '店铺' },
      // { id: '4', icon: 'path/to/image4.png', text: '店铺' },
      // { id: '5', icon: 'path/to/image5.png', text: '店铺' },
      // { id: '6', icon: 'path/to/image6.png', text: '店铺' }
    ]
  },
  //获取全部店铺
  getRestaurants(){
    console.log('getrestaunrants')
    wx.request({
      url: this.data.baseURL + 'res',
      method:'GET',
      header: {
        'authentication': this.data.token,
        'content-type': 'application/json' // 根据实际发送的数据类型调整 content-type
       },
       success:(res)=>{
        console.log(res.data)
        this.setData({
          shops:res.data.data
        })
    },
      fail:(res)=>{
        console.log(res)
      }
    })
  },
  getRestaurantByType(event){
    console.log('getrestaunrantByType')
    let id = event.currentTarget.dataset.id;
    console.log(id)
    wx.request({
      url: this.data.baseURL + 'res',
      method:'POST',
      data:{
        dish:null,
        flavour:null,
        category:id,
        lowestPrice:'',
        highestPrice:''
      },
      header: {
        'authentication': this.data.token,
        'content-type': 'application/json' // 根据实际发送的数据类型调整 content-type
       },
      success:(res)=>{
          console.log(res.data)
          this.setData({
            shops:res.data.data
          })
      },
      fail:(res)=>{
        console.log(res)
      }
    })
  },
});