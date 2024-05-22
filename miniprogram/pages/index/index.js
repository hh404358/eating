Page({
  data: {
    bannerList: [
      { imgUrl: '/images/image.png' },
      { imgUrl: '/images/KFC.png' },
      { imgUrl: '/images/MDL.png' },
    ],
    blocks: [{ padding: '13px', background: '#FFC107' }],
    prizes: [
      { imgs: [{ src: '/images/foods/麻辣烫冒菜@3x.png', width: '50%' }], background: '#e9e8fe' },
      { imgs: [{ src: '/images/foods/甜点饮品@3x.png', width: '50%' }], background: '#b8c5f2' },
      { imgs: [{ src: '/images/foods/龙虾烧烤(龙虾不会画@3x.png', width: '50%' }], background: '#e9e8fe' },
      { imgs: [{ src: '/images/foods/牛排西餐@3x.png', width: '50%' }], background: '#b8c5f2' },
      { imgs: [{ src: '/images/foods/汉堡披萨@3x.png', width: '50%' }], background: '#e9e8fe' },
      { imgs: [{ src: '/images/foods/日韩料理@3x.png', width: '50%' }], background: '#b8c5f2' },
    ],
    buttons: [
      { radius: '50px', background: '#E64A19' },
      { radius: '45px', background: '#FFC107' },
      {
        radius: '40px', background: '#FF5722',
        pointer: true,
        fonts: [{ text: '随机\n抽取', top: '-20px' }]
      },
    ],
    defaultConfig: {
      rowSpacing: '10px',
      colSpacing: '10px'
    }
  },
  start() {
    // 获取抽奖组件实例
    const child = this.selectComponent('#myLucky')
    // 调用play方法开始旋转
    child.lucky.play()
    // 用定时器模拟请求接口
    setTimeout(() => {
      // 3s 后得到中奖索引 (假设抽到第0个奖品)
      const index = 0
      // 调用stop方法然后缓慢停止
      child.lucky.stop(index)
    }, 3000)
  },
  end(event) {
    // 中奖奖品详情
    console.log(event.detail)
  },
  onLoad: function (options) {
    this.setData({
      title: options.title
    })
  }
})


