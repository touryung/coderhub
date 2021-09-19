# coderhub

一个比较通用的服务器，涵盖注册、登录、发表动态、评论、标签等接口，符合 RESTful 风格

## 启动

1. 将代码 clone 到本地，执行 npm install 安装依赖

2. 新建 uploads 文件夹用于存储上传的图片

   ```bash
    ├── src
    ├── uploads
    │   ├── avatar
    │   ├── picture
   ```

3. 新建.env 文件配置环境，下面是示例

   ```bash
   APP_HOST = xxx
   APP_PORT = xxx

   MYSQL_HOST = "localhost"
   MYSQL_PORT = 3306
   MYSQL_USER = "root"
   MYSQL_PASSWORD = xxx
   MYSQL_DATABASE = xxx
   ```

4. 执行 npm run start 启动服务
