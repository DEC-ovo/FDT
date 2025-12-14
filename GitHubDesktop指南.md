# 使用GitHub Desktop发布项目（图形化界面）

如果命令行Git使用有困难，GitHub Desktop是一个更简单的选择。以下是详细步骤：

## 一、下载并安装GitHub Desktop

1. 访问GitHub Desktop官网：https://desktop.github.com/
2. 点击"Download for Windows"
3. 运行下载的安装程序，按照默认选项安装

## 二、登录GitHub账号

1. 打开GitHub Desktop
2. 点击"Sign in to GitHub.com"
3. 输入您的GitHub用户名和密码
4. 授权GitHub Desktop访问您的GitHub账号

## 三、创建GitHub仓库

1. 打开GitHub网站：https://github.com/
2. 点击右上角的"+"号，选择"New repository"
3. 填写仓库信息：
   - Repository name: 输入一个名称（例如：yuling-music-universe）
   - Description: 可以输入简短描述
   - Public/Private: 选择"Public"（公开）
   - 不要勾选任何初始化选项
4. 点击"Create repository"

## 四、使用GitHub Desktop发布项目

### 步骤1：克隆仓库到本地

1. 在GitHub仓库页面，点击绿色的"Code"按钮
2. 选择"Open with GitHub Desktop"
3. GitHub Desktop会自动打开
4. 选择本地保存位置（建议选择D:\FDT\）
5. 点击"Clone"

### 步骤2：复制项目文件

1. 找到克隆的仓库文件夹（例如：D:\FDT\yuling-music-universe）
2. 将您的项目文件复制到这个文件夹中：
   - 玉铃的音乐宇宙.html
   - music/ 文件夹（如果包含音乐文件）
   - README.md
   - 其他必要文件

### 步骤3：提交更改

1. 回到GitHub Desktop
2. 您会看到所有添加的文件都显示在"Changes"面板中
3. 在"Summary"输入框中填写提交信息（例如："Initial commit"）
4. 点击"Commit to master"

### 步骤4：推送到GitHub

1. 点击右上角的"Push origin"
2. 等待推送完成

## 五、启用GitHub Pages（让朋友可以访问）

1. 打开GitHub仓库页面
2. 点击"Settings"
3. 滚动到"GitHub Pages"部分
4. 在"Source"下拉菜单中选择"master branch"
5. 点击"Save"
6. 几分钟后，刷新页面，您会看到一个URL（例如：https://您的用户名.github.io/仓库名称/）
7. 将这个URL分享给您的朋友，他们就可以访问了

## 六、更新项目

如果您需要更新项目：

1. 修改本地仓库中的文件
2. 回到GitHub Desktop
3. 填写提交信息并提交
4. 点击"Push origin"

## 七、音乐文件处理建议

由于GitHub对文件大小有限制，建议您：

1. **使用在线音乐平台嵌入**：
   - 例如网易云音乐、QQ音乐等
   - 在音乐平台找到歌曲，点击"分享" -> "生成外链播放器"
   - 复制嵌入代码，替换HTML中的embedCode

2. **使用外部存储**：
   - 如腾讯云、阿里云等对象存储服务
   - 将音乐文件上传到外部存储，获取链接
   - 在代码中使用这些链接

## 八、常见问题

### 1. 无法登录GitHub Desktop

- 确保您的网络连接正常
- 检查GitHub账号密码是否正确
- 尝试重新安装GitHub Desktop

### 2. 推送失败

- 确保您有仓库的写入权限
- 检查网络连接
- 尝试重新登录GitHub Desktop

### 3. GitHub Pages无法访问

- 等待几分钟，有时需要时间生效
- 检查仓库名称和分支是否正确
- 检查项目中的HTML文件是否正确命名（建议使用index.html）

## 九、将玉铃的音乐宇宙.html重命名为index.html

为了让GitHub Pages默认显示您的网页，建议将主HTML文件重命名为index.html：

1. 找到"玉铃的音乐宇宙.html"文件
2. 右键点击，选择"重命名"
3. 改为"index.html"
4. 在GitHub Desktop中提交更改并推送

这样，访问GitHub Pages时就会直接显示您的网页。

## 十、联系我

如果遇到任何问题，随时可以向我寻求帮助！
