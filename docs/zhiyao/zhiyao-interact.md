# 知药各子系统页面共用及跳转
> 知药共包括```zhiyao-app```，```zhiyao-react-yszx```，```zhiyao-react-zy-service```，```zhiyao-im```和```zhiyao-h5```五个项目。其中，部分H5页面在各系统中复用，涉及到页面跳转传参、来源判断、页面表现行为等逻辑，在此做一个简要总结以备忘。

### 知药系统架构简图
> 知药系统架构简图描述了知药系统的组成、各子系统数据流转及公用逻辑。

![知药系统架构图](https://raw.githubusercontent.com/kimwong0919/docs/master/docs/resources/imgs/%E7%9F%A5%E8%8D%AF%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84%E5%9B%BE.png)
- [x] 知药系统架构简图

### 基础Url
- 知药药师咨询

```javascript
ZhiYaoReact: {
    DEV: 'https://zhiyao-test-oss.hjyiliao.com/webtest/zhiyao-dev/consultation/index.html#',
    TEST: 'https://zhiyao-test-oss.hjyiliao.com/webtest/zhiyao/consultation/index.html#',
    PRO: 'https://zhiyao.hjyiliao.com/zhiyao/consultation/index.html#'
}
```

- 知药药师服务

```javascript
ZhiYaoService: {
    DEV: 'https://zhiyao-test-oss.hjyiliao.com/webtest/zhiyao-dev/consult/index.html',
   TEST: 'https://zhiyao-test-oss.hjyiliao.com/webtest/zhiyao/consult/index.html',
   PRO:''
}
```

- 知药H5
```javascript
H5Page: {
    DEV: 'https://zhiyao-test-oss.hjyiliao.com/webtest/zhiyao/',
    TEST: 'https://zhiyao-test-oss.hjyiliao.com/test-env/zhiyao/',
    PRO: 'https://zhiyao.hjyiliao.com/zhiyao/'
}
```

- 知药IM
```javascript
IM: {
        DEV: {
        imPatient: 'http://192.168.201.196:3002?',
        imPharmacist: 'http://192.168.201.196:3001?',
    },
    TEST: {
        imPatient: 'https://yf-test-oss.yifengx.com/webtest/zhiyao-im/client/index.html?',
        imPharmacist: 'https://yf-test-oss.yifengx.com/webtest/zhiyao-im/pharmacist/index.html?',
    },
    PRO: {
        imPatient: 'https://zhiyao.hjyiliao.com/zhiyao-im/client/index.html?',
        imPharmacist: 'https://zhiyao.hjyiliao.com/zhiyao-im/pharmacist/index.html?',
    }
}
```

> ### 地址参数编码工具
> url参数使用同一工具编解码

```javascript
/** 编码url中携带的参数信息 */
export const encodeURIParams = (params: object): string => encodeURIComponent(Base64.encode(JSON.stringify(params)));

/** 解码url中携带的参数信息 */
export const decodeURIParams = (params: string): string => JSON.parse(Base64.decode(decodeURIComponent(params)));
```


### 知药App(zhiyao-app)跳转其他系统
- 展示文章
> App内展示文章采用WebView加载H5页面的方式实现。
```javascript
// 若用户已登录，则传递用户登录token，以便在文章详情给文章评论点赞
// 分享文章则url不携带token，以便展示文章底部“下载”推广条
const articleUrl = `${H5Page}h5/view/details/drugExpDetails.html?articleId=${articleId}${login ? '&auth_token=' + token : ''}`
```
- 展示笔记
> App内使用ReactNative页面展示笔记详情，分享笔记的链接如下：
```javascript
// H5笔记详情页默认展示底部“下载”推广条，在知药服务号药师详情页中打开则不显示
const noteUrl = `${ZhiYaoReact}/noteDetailsPage/e30%3D?noteId=${noteId}`
```
- 展示话题
> App内展示话题采用WebView加载H5页面的方式实现。
```javascript
// 笔记详情基础地址
let topicDetailsUrl = `${H5Page}h5/view/details/topic.html?topicId=${topicId}`;
// 携带Token以便点赞、评论、回复
if (AppStore.isLogin) {
    topicDetailsUrl += `&auth_token=${AppStore.getUserToken}`;
} else {
    topicDetailsUrl += `&auth_token=unauthorized`;
}
// 兼容iPhone样式
if (Constants.isIPhoneX) {
    topicDetailsUrl += `&equipSize=max`;
} else if (Constants.isIPhoneV11()) {
    topicDetailsUrl += `&equipSize=mid`;
}
```

- 展示话题回答详情
> App内展示话题回答详情采用WebView加载H5页面方式实现。
```javascript
let topicReplyUrl = `${H5Page}h5/view/details/topicCommen.html?answerId=${topicReplyId}`;
// 携带Token以便点赞、评论、回复
if (AppStore.isLogin) {
    topicReplyUrl += `&auth_token=${AppStore.getUserToken}`;
} else {
    topicReplyUrl += `&auth_token=unauthorized`;
}
```

- 打开知药-IM页面
> App内药师侧和用户侧聊天页面是通过H5实现。App与IM页面交互通过RN<->H5互发消息实现，[参见文档](http://note.youdao.com/noteshare?id=f7c9d720d0edbecc7e4a0ed6c40727ae)。
> 进入H5页面时具体Url如下：
```javascript
let imUrl = isPharmacist ? IM.imPharmacist : IM.imPatient;
const token = userStore.token;
if (this.isPharmacist) {
    this.imUrl += `sessionId=${this.sessionId}`; // 咨询会话id
    this.imUrl += `&onlineSales=${this.onlineSales}`; // 用户所在渠道是否支持推荐商品
    this.imUrl += `&userId=${AppStore.getUserId}`; // 咨询用户id
    this.imUrl += `&userName=${encodeURIComponent(this.userOrPharmacistName)}`; // 用户昵称
    this.imUrl += `&pharmacistAvatar=${encodeURIComponent(this.pharmacistAvatar)}`; // 药师头像
    this.imUrl += `&pharmacistName=${encodeURIComponent(AppStore.getUserName)}`; // 药师昵称
    this.imUrl += `&userAvatar=${encodeURIComponent(this.userAvatar)}`; // 用户头像
    this.imUrl += `&token=${token}`; // token
} else {
    this.imUrl += `customerId=${AppStore.getUserId}`; // 用户会员id(CRM会员id)
    this.imUrl += `&name=${encodeURIComponent(AppStore.getUserName)}`; // 用户昵称
    this.imUrl += `&userAvatar=${encodeURIComponent(this.userAvatar)}`; // 用户头像
    this.imUrl += `&pharmacistAvatar=${encodeURIComponent(this.pharmacistAvatar)}`; // 药师头像
    this.imUrl += `&pharmacistName=${encodeURIComponent(this.userOrPharmacistName)}`; // 药师昵称
    this.imUrl += `&token=${token}`; // token
}
```

### 知药-药师咨询(zhiyao-react-yszx)跳转其他系统
- 展示文章
> 在知药-药师咨询内离线问答详情页，药师回答推荐文章。点击推荐文章链接跳转到H5文章详情页：
```javascript
// from 参数标记知药-药师咨询打开文章详情时的最终来源，因知药服务->药师咨询问答详情->文章路径也可查看文章详情。
// 若from字段为知药服务号的ServerNumber，则文章详情页内药师跳转到知药服务的药师详情，否则跳转到药师咨询的药师详情页
// share 参数标记文章详情页展示底部推广条
const _onArticleClick = (articleId) => RedirectUtils.redirectTo(`${H5Page}h5/view/details/drugExpDetails.html?articleId=${articleId}&from=${AppStore.getServerNumber()}&share=1`);
```

- 展示笔记
> 在知药-药师咨询内离线问答详情页，药师回答推荐笔记。点击推荐文章链接跳转到笔记详情页：
```javascript
// from 参数标记知药-药师咨询打开笔记详情时的最终来源，因知药服务->药师咨询问答详情->笔记详情路径也可查看笔记详情。
// 若from字段为知药服务号的ServerNumber，则笔记详情页内药师跳转到知药服务的药师详情，否则跳转到药师咨询的药师详情页
const _onNoteClick = (noteId) => this.push(`/noteDetailsPage`, { 
    noteId: noteId, 
    from: AppStore.getServerNumber() 
});
```

### 知药-知药服务(zhiyao-react-zy-service)跳转其他系统
- 展示文章
> 同知药-药师咨询，携带from字段以正确跳转药师详情

- 展示笔记
> 同知药-药师咨询，携带from字段以正确跳转药师详情

### 知药-IM(zhiyao-im)跳转其他系统
> 知药IM内打开文章，笔记详情均根据ServerNumber来判断，同知药-药师咨询内。

- 打开药品知识推荐、商品推荐、商品组合推荐、快捷话术等则通过H5与RN交互的方式传递指令来实现。[参见文档](http://note.youdao.com/noteshare?id=f7c9d720d0edbecc7e4a0ed6c40727ae)。
### 知药-H5(zhiyao-h5)跳转其他系统
> 知药H5与App交互通过postMessage方式实现，[参见文档](http://note.youdao.com/noteshare?id=f7c9d720d0edbecc7e4a0ed6c40727ae)。
> 知药H5与知药公众号交互则通过url参数from，判断来源在进行跳转，主要用在文章详情页打开药师详情，具体上文已描述。
