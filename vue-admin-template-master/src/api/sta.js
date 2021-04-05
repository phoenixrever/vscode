import request from '@/utils/request'

export default{
  createStatistics(startDay,endDay) {
    return request({
      url: `/serviceStatistics/statisticsDaily/dailyCount/${startDay}/${endDay}`,
      method: 'post'
    })
  }
}
