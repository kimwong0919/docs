function refreshTheme(themeName, themeLink) {
    var head=document.getElementsByTagName('head')[0];
    var menuId = themeName;
    var link =document.createElement('link');　　　　　　　　　　　　 //创建link元素节点，也就是link标签
　　 link.rel="stylesheet";　　　　　　　　　　　　　　　　　　　　//为link标签添加rel属性
　　 link.href=themeLink;　　　　　　　　　　　　　　　　　　　　//为link标签添加href属性 ， 属性值是css外链样式表的路径
　　 head.appendChild(link);
    localStorage.setItem('theme', themeName);
}

function showVue() {
    var themeName = 'vue';
    var themeLink = '//unpkg.com/docsify/lib/themes/vue.css';
    refreshTheme(themeName, themeLink);
}

function showDark() {
    var themeName = 'dark';
    var themeLink = '//unpkg.com/docsify/themes/dark.css';
    refreshTheme(themeName, themeLink);
}

function initThemeMenu() {

    // <link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/vue.css">
    // <link rel="stylesheet" href="//unpkg.com/docsify/themes/vue.css">
    // <link rel="stylesheet" href="//unpkg.com/docsify/themes/buble.css">
    // <link rel="stylesheet" href="//unpkg.com/docsify/themes/dark.css">
    // <link rel="stylesheet" href="//unpkg.com/docsify/themes/pure.css">

    var vueMenuItem = document.getElementById('vue');
    vueMenuItem.onclick = showVue;

    var darkMenuItem = document.getElementById('dark');
    darkMenuItem.onclick = showDark;

    var defaultThemeName = localStorage.getItem('theme') || 'vue';
    if ('vue' == defaultThemeName) {
        showVue();
    } else {
        showDark();
    }
}

// window.onload = initThemeMenu;