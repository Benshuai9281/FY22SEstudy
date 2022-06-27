new Vue({
  el: '#app',//id="app"をターゲットに
  vuetify: new Vuetify(),
  data: {
    bitcoinHistorical: [],
    // 描画ライブラリEcharts用のOptionを設定
    echartsOption: {},
    isLoading: false
  },
  mounted() {
    this.updateBitcoinData()
  },
  methods: {
    // グラフ表示用のオプションをセットする
    loadBitcoinData: async function(){
      this.updateBitcoinData()
    },
    // Bitcoinの情報を更新する関数
    async updateBitcoinData(){
      this.isLoading = true
      // Echartsのライブラリでどこをターゲットにしたらいいかセット(init)
      let myChart = echarts.init(document.getElementById("bitFig"))
      myChart.clear()
      
      // APIでデータを取得
      const response = await fetch('http://52.192.60.223/api/nori_bitcoin')
      const resData = await response.json()
      if (!resData) throw new Error(resData.message)
      
      this.echartsOption = this.transBitResToEchartsSimpleOption(resData)
      
      // 描画データ(Option)をセット これだけでグラフできる楽
      myChart.setOption(this.echartsOption)

      this.isLoading = false
    },
    // APIレスポンスを描画用のデータに変換する関数
    transBitResToEchartsSimpleOption: function(resData){
      return {
        xAxis: {
          type: 'category',
          name: 'date',
          // 配列のresDataから日付を切り取り
          data: resData.map(eachDate => eachDate.Date).reverse()
        },
        yAxis: {
          type: 'value',
          name: 'Price',
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
          },
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          }
        },
        series: [
          {
            type: 'line',
          // 配列のresDataから値段を切り取り
          data: resData.map(eachDate => eachDate.Price).reverse()
          }
        ]
      }
    }
  }
})