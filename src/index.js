import dva from 'dva';
import { notification } from 'antd'
import * as routerRedux from 'react-router-redux'
import RouterConfig from './router'
import globalModel from './models/global-model'
import loginModel from './routes/login/model'
import { createHashHistory } from 'history'
import './index.less'

import globalModel from './routes/label-report/model'

import { initList, initLog } from './routes'

import { uniqBy } from 'lodash'


let timer = null
// 1. Initialize
export const app = dva({
  history: createHashHistory(),
  onError(e, dispatch) {
    if (e.status === 401) {
      dispatch(routerRedux.push({
        pathname: '/login',
      }))
    } else {
      if (timer) clearTimeout(timer)
      timer = setTimeout(()=>{
        notification.open({
          message: e.status,
          description: e['content-type'] == 'text/html' ? e.data : e.data,
          duration: 7,
        })
      },400)
    }
  },
})

// 2. Plugins
app.use({})

// 3. Model
app.model(globalModel)
app.model(loginModel)

const usedModelList = initList.filter((x) => !!x.models)

uniqBy(usedModelList, 'models').map((x)=> {
  app.model(x.models)
})

// 4. Router
app.router(RouterConfig)

// 5. Start
app.start('#root')
