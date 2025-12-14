# 将项目发布到GitHub的详细步骤

## 一、安装Git

首先需要在您的计算机上安装Git：

1. 访问Git官网：https://git-scm.com/
2. 点击"Download for Windows"下载最新版本
3. 运行安装程序，按照默认选项安装即可（一直点击"Next"）
4. 安装完成后，打开命令提示符或PowerShell，输入 `git --version` 验证安装成功

## 二、注册GitHub账号（如果已有账号请跳过此步）

1. 访问GitHub官网：https://github.com/
2. 点击右上角的"Sign up"
3. 按照提示填写用户名、邮箱和密码
4. 完成邮箱验证和账号设置

## 三、创建新的GitHub仓库

1. 登录GitHub账号
2. 点击右上角的"+"号，选择"New repository"
3. 填写仓库信息：
   - Repository name: 输入仓库名称（例如：yuling-music-universe）
   - Description: 输入仓库描述（可选）
   - Public/Private: 选择"Public"（公开），这样您的朋友可以看到
   - Initialize this repository with: 不要勾选任何选项
4. 点击"Create repository"

## 四、将本地项目推送到GitHub

### 步骤1：初始化本地Git仓库

打开PowerShell，导航到项目目录：

```powershell
cd D:\FDT\fdt
```

初始化Git仓库：

```powershell
git init
```

### 步骤2：配置Git用户名和邮箱

```powershell
git config --global user.name "您的GitHub用户名"
git config --global user.email "您的GitHub邮箱"
```

### 步骤3：添加文件到暂存区

```powershell
git add .
```

### 步骤4：提交文件

```powershell
git commit -m "Initial commit"
```

### 步骤5：关联GitHub仓库

在GitHub仓库页面复制仓库URL（HTTPS或SSH格式，推荐HTTPS），然后执行：

```powershell
git remote add origin https://github.com/您的用户名/仓库名称.git
```

### 步骤6：推送到GitHub

```powershell
git push -u origin master
```

输入您的GitHub用户名和密码（或个人访问令牌）进行认证。

## 五、优化GitHub页面显示

### 1. 启用GitHub Pages

为了让您的朋友可以直接访问网页应用：

1. 进入GitHub仓库页面
2. 点击"Settings"
3. 滚动到"GitHub Pages"部分
4. 在"Source"下拉菜单中选择"master branch"
5. 点击"Save"
6. 几分钟后，您可以通过显示的URL访问您的应用

### 2. 添加项目预览图（可选）

在README.md文件中添加项目截图或预览图，可以让页面更吸引人。

## 六、管理音乐文件

由于GitHub对文件大小有限制（单个文件不能超过100MB），而音乐文件可能较大，建议：

1. **方案一**：将音乐文件存储在其他地方（如腾讯云、阿里云等），然后在代码中引用这些URL
2. **方案二**：使用GitHub LFS（大文件存储），但需要额外配置
3. **方案三**：使用在线音乐平台的嵌入代码（如Spotify、网易云音乐等）

## 七、后续更新

当您修改了项目后，只需要执行以下命令即可更新GitHub上的代码：

```powershell
git add .
git commit -m "更新说明"
git push
```

## 八、分享给朋友

将GitHub仓库地址或GitHub Pages地址分享给您的朋友即可！

## 注意事项

- 请不要将敏感信息（如密码）提交到GitHub
- 定期备份您的代码
- 保持README.md文件更新，让朋友了解项目功能

祝您发布成功！
