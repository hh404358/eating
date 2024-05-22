// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'mini-program-0g18bsar4a46acf1',
        traceUser: true,
      });
      
      this.requestUserInfo();
      
    }
    wx.setStorageSync('baseURL', 'http://localhost:8083/');
    // this.globalData = {
    //   //BaseURL: 'http://localhost:8083/'
    // };
  },
      // 请求用户信息授权
    requestUserInfo: function() {
      let that = this;
      wx.showModal({
        title: '授权登录',
        content: '为了完善您的账户信息，请授权使用您的微信昵称和头像',
        success: function(res) {
          if (res.confirm) {
            // 用户点击确定，调用 getUserProfile 获取用户信息
            wx.getUserProfile({
              desc: '展示个人信息',
              success: function(res) {
                // 处理用户信息，例如保存到本地存储或发送到服务器
               // console.log('data:',res)
                that.saveUserInfo(res.userInfo);
              },
              fail: function(err) {
                console.error('获取用户信息失败', err);
                // 处理失败情况，例如提示用户重新授权
              }
            });
          } else {
            // 用户点击取消，可以提示用户手动授权或跳过
            wx.clearStorage()
          }
        }
      });
    },

    // 从本地存储获取用户信息
    getUserInfoFromStorage: function() {
      // 假设你已经将用户信息保存在本地存储中
      let userInfo = wx.getStorageSync('userInfo');
      if (userInfo) {
        // 使用用户信息
      } else {
        // 用户信息不存在，需要重新获取
        this.requestUserInfo();
      }
    },

    // 保存用户信息
    saveUserInfo: function(userInfo) {
      // 将用户信息保存到本地存储或发送到服务器
      wx.setStorageSync('userInfo', userInfo);
      // 执行登录操作
      this.login();
    },
    login(){
      wx.login({
        success: (res) => {
          //console.log('res'+res.code)
          wx.request({
            url: 'http://localhost:8083/user/login',
            method:'POST',
            data:{
              code:res.code
            },
            success:(res)=>{
              // console.log(res.data)
              wx.setStorageSync('token', res.data.data.token);
              wx.setStorageSync('userId', res.data.data.id);
              this.hasUserInfo = true;
              //let token = wx.getStorageSync('token');
              //console.log('token:',token)
            }
          })
        },
      })
    },

});
