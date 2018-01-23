import initDashboard from './dashboard/'
import initLogin from './login'
import initListPage from './list'

export const initList = [
  initDashboard,
  initListPage
]

// 有一个坑，是每个view就只有一个model，只后要改....
// 下面2个特殊...所以用处理....之后的加载initList即可
export const initLog = initLogin

export const initDash = initDashboard
