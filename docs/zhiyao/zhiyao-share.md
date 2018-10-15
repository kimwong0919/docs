# 知药分享及报文汇总

> 知药分享功能分布在知药系统多个模块中，接下来根据分享功能分布位置按模块逐个整理分享页面及相应报文。分享功能具体分布如图所示：

![image](https://raw.githubusercontent.com/kimwong0919/docs/master/docs/resources/imgs/%E7%9F%A5%E8%8D%AF%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84%E5%9B%BE.png)
### 分享根地址
> 知药分享涉及到多个分子系统的分享，分享页面地址汇总如下

- 知药药师咨询
> 知药药师咨询支持分享笔记、笔记总结、药师详情、咨询首页

```javascript
ZhiYaoReact: { // 知药部署地址
    DEV: 'https://zhiyao-test-oss.hjyiliao.com/webtest/zhiyao-dev/consultation/index.html#',
    TEST: 'https://zhiyao-test-oss.hjyiliao.com/webtest/zhiyao/consultation/index.html#',
    PRO: 'https://zhiyao.hjyiliao.com/zhiyao/consultation/index.html#'
}
```

- 知药药师服务
> 知药服务支持分享药师详情、首页

```javascript
ZhiYaoService: {
    DEV: 'https://zhiyao-test-oss.hjyiliao.com/webtest/zhiyao-dev/consult/index.html',
   TEST: 'https://zhiyao-test-oss.hjyiliao.com/webtest/zhiyao/consult/index.html',
   PRO:''
}
```

- 知药H5
> 知药H5支持分享文章、话题、药品、药品点评
```javascript
H5Page: {
    DEV: 'https://zhiyao-test-oss.hjyiliao.com/webtest/zhiyao/',
    TEST: 'https://zhiyao-test-oss.hjyiliao.com/test-env/zhiyao/',
    PRO: 'https://zhiyao.hjyiliao.com/zhiyao/'
}
```

### 地址参数编码工具
> url参数使用同一工具编解码

```javascript
/** 编码url中的携带的参数信息 */
export const encodeURIParams = (params: object): string => encodeURIComponent(Base64.encode(JSON.stringify(params)));

/** 解码url中的携带的参数信息 */
export const decodeURIParams = (params: string): string => JSON.parse(Base64.decode(decodeURIComponent(params)));
```

### 分享报文
> 分享报文按照分享在各分子系统的分布汇总。具体分布参考上边图片。

> #### 知药App

1. 分享App

```javascript
const sharaParams = {
    type: 'news',
    title: '为了身边人的健康，您安装了吗？', 
    thumbImage: '应用二维码地址', // 微信分享缩略图,
    imageUrl:  '应用二维码地址', // QQ分享缩略图
    description: '健康的问题，我在这里找到了靠谱的答案，不再盲目信他人，只问专业的药师、营养师、医师。',
    webpageUrl: `${H5Page.PRO}h5/mainPage/coupon.html?userId=${userId}&qrcodeType=APP`
};
```

2. 分享药师
```javascript
const sharaParams = {
    type: 'news',
    title: '来问知药', // Constants.AppName,
    thumbImage: 'https://img.hjyiliao.com/zhiyao/app_logo.png',
    imageUrl: 'https://img.hjyiliao.com/zhiyao/app_logo.png',
    description: `用药的问题欢迎来问${pharmacistName}药师`,
    webpageUrl: 'http://www.hjyiliao.com/'
};
```

3. 分享药师二维码
```javascript
const sharaParams = {
    type: 'imageUrl',
    title: '健康的问题、用药的困惑，欢迎咨询专业的药师、营养师、医师。',
    thumbImage: '药师二维码名片、接口动态返回',
    imageUrl: '药师二维码名片、接口动态返回',
    description: '健康的问题、用药的困惑，欢迎咨询专业的药师、营养师、医师。',
    webpageUrl: `${H5Page.PRO}h5/mainPage/coupon.html?userId=${userId}&qrcodeType=PHARMACIST`
};
```

4. 分享文章
```javascript
const sharaParams = {
    type: 'news',
    title: title, // 文章标题
    thumbImage: 'https://img.hjyiliao.com/zhiyao/article_share.png',
    imageUrl: 'https://img.hjyiliao.com/zhiyao/article_share.png',
    description: '文章知药',
    webpageUrl: `${H5Page}h5/view/details/drugExpDetails.html?articleId=${文章id}` // 文章Url地址
};
```

5. 分享药品
```javascript
const sharaParams = {
    type: 'news',
    title: medicineName + '【专业药师点评】', // 药品名称
    thumbImage: 'https://img.hjyiliao.com/zhiyao/comment_share.png',
    imageUrl: 'https://img.hjyiliao.com/zhiyao/comment_share.png',
    description: medicineFunctionIndications, // 药品主治功能
    webpageUrl: '${H5Page}/h5/view/details/drugDetails.html?drugId=593906e0948e1800d886c238' // 药品详情地址
};
```

6. 分享热门点评
```javascript
const sharaParams = {
    type: 'news',
    title: medicineName, // 药品名
    thumbImage: 'https://img.hjyiliao.com/zhiyao/comment_share.png',
    imageUrl: 'https://img.hjyiliao.com/zhiyao/comment_share.png',
    description: `点评：${hotCommentContent}`, // 点评内容
    webpageUrl: `${H5Page}h5/view/details/doctorCommenDetails.html?commenid=${medicineHotCommentId}&drugId=${drugId}`
};
```

7. 分享笔记
```javascript
const sharaParams = {
    type: 'news',
    title: `药师[${name}]的笔记|知药APP`,
    thumbImage: pictures[0].pictureUrl,  // 笔记第一张图片,
    imageUrl: pictures[0].pictureUrl, // 笔记第一张图片,
    description: content, // 笔记内容摘要
    webpageUrl: `${ZhiYaoReact}/noteDetailsPage/e30%3D?noteId=${id}`
};
```

8. 分享笔记总结
```javascript
const sharaParams = {
    type: 'news',
    title: content, // 笔记总结标题
    thumbImage: littlePictureUrl, // 笔记总结小图,
    imageUrl: littlePictureUrl, // 笔记总结小图,
    description: '听听医师药师们怎么说',
    webpageUrl: `${ZhiYaoReact}/noteCollectionPage?noteSummaryId=${id}`
};
```

9. 分享话题
```javascript
const sharaParams = {
    type: 'news',
    title: `${topicTitle}`, // 话题标题
    thumbImage: 'https://img.hjyiliao.com/zhiyao/topic_share.png',
    imageUrl: 'https://img.hjyiliao.com/zhiyao/topic_share.png',
    description: topicDesc, // 话题简介
    webpageUrl: `${H5Page}h5/view/details/topic.html?topicId=${this.topicId}`
};
```

10. 分享话题回答
```javascript
const sharaParams = {
    type: 'news',
    title: topicTitle, // 话题标题
    thumbImage: 'https://img.hjyiliao.com/zhiyao/topic_share.png',
    imageUrl: 'https://img.hjyiliao.com/zhiyao/topic_share.png',
    description: topicReplyContent, // 回答内容
    webpageUrl: `${H5Page}h5/view/details/topicCommen.html?answerId=${this.topicReplyId}`
};
```

11. 分享徽章升级
```javascript
const badgeImage = {
badgeCrown: 'https://img.hjyiliao.com/zhiyao/crown_share.jpg', // 皇冠徽章
badgeDiamonds: 'https://img.hjyiliao.com/zhiyao/diamonds_share.jpg', // 钻石徽章
badgeGold: 'https://img.hjyiliao.com/zhiyao/gold_share.jpg', // 黄金徽章
}
const sharaParams = {
    type: 'imageUrl',
    title: '我的知药徽章等级又升级了~',
    description: '我的知药徽章等级又升级了~',
    webpageUrl: api.appUrl,
    imageUrl: PharmacistUtil.getBadgeShareImageUrl(badgeLevel) // 徽章图片，
};
```

12. 分享等级升级
```javascript
const sharaParams = {
    type: 'imageUrl',
    title: '我的知药积分等级又升级了~',
    description: '我的知药积分等级又升级了~',
    webpageUrl: 'http://www.hjyiliao.com/',
    imageUrl: 'https://img.hjyiliao.com/zhiyao/upgrade_share.jpg'
};
```

> #### 知药-药师咨询

1.分享首页
> 分享首页时除了需要判断当前环境（如生产、测试或开发），还需判断是否从知药服务进入

```javascript
var INDEX_DEV = 'https://zhiyao-test-oss.hjyiliao.com/webtest/zhiyao-dev/consultation/index.html';
var INDEX_TEST = 'https://zhiyao-test-oss.hjyiliao.com/webtest/zhiyao/consultation/index.html'; // 知药-益丰大药房测试环境首页
var INDEX_PRO = 'https://zhiyao.hjyiliao.com/zhiyao/consultation/index.html'; // 知药-益丰大药房生产环境首页

var INDEX_DEV_ZY = 'https://zhiyao-apps-dev.hjyiliao.com/Oauth2Servlet?serverNumber=gh_8a17c7b8076e&backUrl=https://zhiyao-test-oss.hjyiliao.com/webtest/zhiyao-dev/consult/index.html?route?/home'; // 知药-知药服务开发环境
var INDEX_TEST_ZY = 'https://zhiyao-apps-te.hjyiliao.com/Oauth2Servlet?serverNumber=gh_8a17c7b8076e&backUrl=https://zhiyao-test-oss.hjyiliao.com/webtest/zhiyao/consult/index.html?route?/home'; // 知药-知药服务药师咨询测试环境首页
var INDEX_PRO_ZY = 'https://zhiyao-apps.hjyiliao.com/Oauth2Servlet?serverNumber=gh_8a17c7b8076e&backUrl=https://zhiyao-test-oss.hjyiliao.com/webtest/zhiyao/consult/index.html?route?/home'; // 知药-知药服务药师咨询生产环境首页

var shareIndex = shareZY ? INDEX_PRO_ZY : INDEX_PRO + '#/?serverNumber=gh_e1ecec31ee0e&share=true';
if (currentUrl.indexOf('test') !== -1) {
    shareIndex = shareZY ? INDEX_TEST_ZY : INDEX_TEST + '#/?serverNumber=gh_8a17c7b8076e&share=true';
} else if (currentUrl.indexOf('dev') !== -1) {
    shareIndex = shareZY ? INDEX_DEV_ZY : INDEX_DEV + '#/?serverNumber=gh_8a17c7b8076e&share=true';
}

var shareYSZX = {
    title: '吃药用药别马虎，用药咨询更靠谱！',
    desc: '众多优秀执业药师，免费为您提供专业服务',
    link: shareIndex,
    imgUrl: 'https://img.hjyiliao.com/zhiyao/5a98ac870b199d44a66674a9.png',
    type: 'link',
    dataUrl: ''
};
```

2. 分享药师
```javascript
var sharePharmacistData = {
    title: '让执业药师，成为您的私人健康管家！',
    desc: '众多优秀执业药师，免费为您提供专业服务',
    link: '', // 药师详情页 如 `${ZhiYaoReact}?route?/pharmacistDetails/${encodeURIParams({pharmacistId: id})}`,
    imgUrl: 'https://img.hjyiliao.com/zhiyao/5a98ac870b199d44a66674a9.png',
    type: 'link',
    dataUrl: ''
};  
```

3. 分享笔记
```javascript
const noteShareData = {
    title: `药师[${name}]的笔记|知药APP`,
    desc: content, // 笔记内容摘要
    link: document.location.href, // 笔记地址 如：`${ZhiYaoReact}/noteDetailsPage/e30%3D?noteId=${id}`
    imgUrl: pictures[0].pictureUrl, // 笔记第一张图片
    type: 'link',
    dataUrl: '',
};
```

4.分享笔记总结
```javascript
let { content = '', bigPictureUrl } = this.noteCollectionData;
const noteShareData = {
    title: content || '医师药师们的笔记总结',
    desc: '听听医师药师们怎么说',
    link: document.location.href, // 笔记总结地址  如：`${ZhiYaoReact}/noteCollectionPage?noteSummaryId=${id}`
    imgUrl: bigPictureUrl, // 笔记总结大图
    type: 'link',
    dataUrl: '',
};
```

> #### 知药-知药服务

1. 分享首页
```javascript
const shareInfo = {
    title: '吃药用药别马虎，用药咨询更靠谱！',
    description: '众多优秀执业药师，免费为您提供专业服务',
    link: `${ZhiYaoService}?route?/home?app=weixin&share=home`,
    imgUrl: 'https://img.hjyiliao.com/zhiyao/5a98ac870b199d44a66674a9.png'
};
```

2. 分享药师
```javascript
const shareData: IShareData = {
    title: '让执业药师，成为您的私人健康管家！',
    description: '众多优秀执业药师，免费为您提供专业服务', // 兼容支付宝生活号分享
    desc: '众多优秀执业药师，免费为您提供专业服务', // 针对微信分享描述
    link: location.href, // 药师详情页 如 `${ZhiYaoService}?route?/pharmacistDetail/${encodeURIParams({pharmacistId: id})}`,
    imgUrl: 'https://img.hjyiliao.com/zhiyao/5a98ac870b199d44a66674a9.png'
};
```

> #### 知药H5
> 知药H5分享是通过wxShare工具分享，wxShare封装了wxSDK。

```
<script type="text/javascript" src="../../assets/js/wxShare.js"></script>
```

1. 分享文章
```javascript
var title = ""; // 文章标题
var link = window.location.href; // 文章详情页面地址 如 ${H5Page}h5/view/details/drugExpDetails.html?articleId=${文章id}
var imgUrl = "https://img.hjyiliao.com/zhiyao/article_share.png";
var desc = ""; // 文章摘要
```

2. 分享药品
```javascript
var title = ""; // 药品名称
var link = window.location.href; // 药品详情页面地址 如 ${H5Page}/h5/view/details/drugDetails.html?drugId=593906e0948e1800d886c238
var imgUrl = "https://img.hjyiliao.com/zhiyao/comment_share.png";
var desc = ""; // 药品适应症
```

3. 分享话题
```javascript
var title = ""; // 话题标题
var link = window.location.href; // 话题详情页面地址 如 ${H5Page}h5/view/details/topic.html?topicId=${this.topicId}
var imgUrl = "https://img.hjyiliao.com/zhiyao/topic_share.png";
var desc = ""; // 话题摘要
```

4. 分享话题回答
```javascript
var title = ""; // 话题标题
var link = window.location.href; // 话题回答详情页面地址 如 ${H5Page}h5/view/details/topicCommen.html?answerId=${this.topicReplyId}
var imgUrl = "https://img.hjyiliao.com/zhiyao/topic_share.png";
var desc = ""; // 话题回答摘要
```

5. 分享热门点评（列表）
```javascript
var title = ""; // 药品名称
var link = window.location.href; // 药品点评页面地址 如 ${H5Page}h5/view/details/doctorCommen.html?drugId=${drugId}
var imgUrl = "https://img.hjyiliao.com/zhiyao/comment_share.png";
var desc = ""; // 药品适应症
```

6. 分享热门点评详情
```javascript
var title = ""; // 药品名称
var link = window.location.href; // 药品点评页面地址 如 ${H5Page}h5/view/details/doctorCommenDetails.html?commenid=${medicineHotCommentId}&drugId=${drugId}
var imgUrl = "https://img.hjyiliao.com/zhiyao/comment_share.png";
var desc = ""; // 药品点评摘要
```

> #### 知药-IM-在线咨询
> 无分享功能