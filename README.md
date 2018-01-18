
## Install
```bush
npm install
```
## Run
### Development
```bush
npm run dev
```
### Production(Build)
```bush
npm run build
```

## 简介
&emsp;&emsp;lorawan是基于Vue.js，搭配使用[iView](https://www.iviewui.com) UI组件库形成的一套后台集成解决方案，遵守iView设计和开发约定，风格统一，设计考究，并且更多功能在不停开发中。

## 文件结构
```shell
.
├── build  项目构建配置
└── theme  主题配置
└── src
    ├── api  api接口
    ├── images  图片文件
    ├── libs  工具方法
    ├── locale  多语言文件
    ├── router  路由配置
    ├── store  状态管理
    ├── styles  样式文件
    ├── template  模板文件
    ├── vendors  公共库文件
    └── views
        ├── gateway  网关管理
        ├── node  节点管理
        ├── error_page  错误页面
        ├── home  首页
        │   ├── components  首页组件
        ├── main_components  Main组件
        │   ├── lockscreen  锁屏
        │   ├── shrinkable-menu  可收缩菜单
        │   └── theme-switch  主题切换
        ├── message  消息中心
        ├── my_components  业务组件
        │   ├── area-linkage  中国行政区级联选择器
        │   ├── count-to  数字渐变
        │   ├── draggable-list  可拖拽列表
        │   ├── file-upload  文件上传
        │   ├── image-editor  图片预览编辑
        │   ├── markdown-editor  Markdown编辑器
        │   └── text-editor  富文本编辑器
        ├── own-space  个人中心
        └── tables  综合表格
