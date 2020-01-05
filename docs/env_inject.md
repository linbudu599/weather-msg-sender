# Github Actions 与 Node 环境变量

## .env 与 dotenv

一开始想当然的是把信息都写到 **.env** 文件中然后再注入到环境变量里，然后就发现一个问题，不可能把环境变量文件也上传到仓库啊，那不是作死吗，而且这个玩具以后准备开源的...，当然要严谨点，于是经过一番尝试后摸索出了正经写法。

## secrets 与 cross-env

**cross-env** 应该几乎都用过，一开始的想法就是直接 `cross-env SECRET-ID=XXX` ，但是很显然不行，会提示命令不存在。平时我们能用的好好的是因为写在 `npm script` 里，它会帮我们做一件很重要的事情，新建一个 shell，并且将当前 **node_modules/.bin** 加入到 `PATH` 变量里，执行结束后再恢复原样。  
（关于 npm script 的更多内容，可以阅读阮老师的[这篇文章](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)）

也就是说，想要在 bash 中执行 cross-env，需要加上这个目录，即

```bash
node_modules/.bin/cross-env SECRET_ID=$ID SECRET_KEY=$KEY PHONE=$PHONE node ./server/send.js
```

因此，只要在 **secrets/setting** 里添加好秘密变量，在 `steps.env` 中注入即可，如：

```yml
- name: "Send Msg"
    env:
      ID: ${{ secrets.SECRET_ID }}
      KEY: ${{ secrets.SECRET_KEY }}
      PHONE: ${{ secrets.PHONE_NUMBER_OWN }}
    run: |
      node_modules/.bin/cross-env SECRET_ID=$ID SECRET_KEY=$KEY PHONE=$PHONE node ./server/send.js
```

[完整的 workflow 文件](../.github/workflows/action.yml)
