## 外部系统进入知药页面

> 外部系统进入知药微信端页面时url参数规范及示例

知药微信端根地址
```javascript
//生产地址
const baseUrlPro = 'https://zhiyao.hjyiliao.com/zhiyao/consultation/index.html'

//测试地址
const baseUrlTest = 'https://zhiyao-test-oss.hjyiliao.com/webtest/zhiyao/consultation/index.html'

//开发地址 暂未配置开发环境

```


#### 微信模板消息进入离线问答详情页

> 进入点对点问答详情，参数结构如下，base64编码并urlecode编码再拼接在url后

```javascript
const p2pParams = {
    "questionId":"5a90d8db0b199d190ea6d2fc", //问答id
    "serverNumber":"gh_8a17c7b8076e", //serverNumber
    "openId":"oxy7kwF2IMPAYuwmEj0UCipZ32jY", //openId
    "fromOutside":true //标记来自外部
}
const paramsBase64 = Base64.encode(p2pParams)
const paramsUrlencode = encodeURIComponent(paramsBase64)
const finalUrl = baseUrlPro + '#/questionsDetailsPage/' + paramsUrlencode
```

> 进入众包问答详情，参数结构同```p2pParams```,base64编码并urlencode后，拼接在url后面

```javascript
const finalUrl = baseUrlPro + '#/questionsManyDetailsPage/' + paramsUrlencode
```

#### 微信模板消息进入在线咨询记录页
> 跳转到在线咨询记录页需要携带咨询药师信息，用于显示消息头像；咨询sessionId; 是否已评价（evaluated），openId和serverNumber
```javascript
const consultParams = {
    openId: 'oxy7kwF2IMPAYuwmEj0UCipZ32jY',
    serverNumber: 'gh_8a17c7b8076e',
    sessionId: '',
    pharmacistId: '',
    name: '药师昵称',
    headImg: '药师头像',
    evaluated: '',
    advisoryStatus: '最近消息',
    fromOutside: true //标记来自外部
}
```

> 进入在线咨询记录页完整url地址如下：
```
const paramsBase64 = Base64.encode(consultParams)
const paramsUrlencode = encodeURIComponent(paramsBase64)
const finalUrl = baseUrlPro + '#/consultationDetailsPage/' + paramsUrlencode
```

#### 微信模板消息进入在线咨询页
> 进入在线咨询页需会话id即sessionId，药师信息（可选），openId和serverNumber

```javascript
const imParams = {
    openId: 'oxy7kwF2IMPAYuwmEj0UCipZ32jY',
    serverNumber: 'gh_8a17c7b8076e',
    token: '',
    sessionId: '',
    pharmacistId: '',
    name: '药师昵称',
    fromOutside: true //标记来自外部
}

```

> 进入在线咨询页面完整url地址如下
```
const paramsBase64 = Base64.encode(imParams)
const paramsUrlencode = encodeURIComponent(paramsBase64)
const finalUrl = baseUrlPro + '#/im/' + paramsUrlencode
```


#### 进入发起咨询页面

> 发起众包在线咨询，即未指定药师。参数结构如下，base64编码并urlecode编码再拼接在url后

```javascript
const createConsultationParams = {
    "fromOutside":true, //标记来自外部
    "openid":"oxy7kwF2IMPAYuwmEj0UCipZ32jY", //openid
    "serverNumber":"gh_8a17c7b8076e" //serverNumber
}
const paramsBase64 = Base64.encode(createConsultationParams)
const paramsUrlencode = encodeURIComponent(paramsBase64)
const finalUrl = baseUrlPro + '#/launchConsultation/' + paramsUrlencode
```

> 发起众包在线咨询的第二种方式（**==推荐==**）

```
    测试环境：https://weixin-te.yifengx.com/JkrOauth2Servlet?serverNumber=gh_8a17c7b8076e&backUrl=https://zhiyao-test-oss.hjyiliao.com/webtest/zhiyao/consultation/index.html?route?launchConsultation/eyJmcm9tT3V0c2lkZSI6dHJ1ZX0%3D
    
    生产环境：https://weixin.yifengx.com/JkrOauth2Servlet?serverNumber=gh_e1ecec31ee0e&backUrl=https://zhiyao.hjyiliao.com/zhiyao/consultation/index.html?route?launchConsultation/eyJmcm9tT3V0c2lkZSI6dHJ1ZX0%3D
```

> 发起点对点咨询，即指定药师。参数结构如下，base64编码并urlecode编码再拼接在url后

```javascript
const createConsultationParams = {
    "fromOutside":true, //标记来自外部
    "openid":"oxy7kwF2IMPAYuwmEj0UCipZ32jY", //openid
    "serverNumber":"gh_8a17c7b8076e" //serverNumber
    "id":"pharmacistId", //药师id
    "onlineStatus":"ONLINE", //指定发起咨询状态 ONLINE：在线咨询;OFFLINE：离线咨询； 若不指定则由后端根据药师接单状态决定
}
const paramsBase64 = Base64.encode(createConsultationParams)
const paramsUrlencode = encodeURIComponent(paramsBase64)
const finalUrl = baseUrlPro + '#/launchConsultation/' + paramsUrlencode
```


