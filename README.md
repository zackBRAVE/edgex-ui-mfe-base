# edgex-ui-mfe

## 添加子应用
修改src/modules/micro-app.js文件，按照注释添加子应用相关信息，再修改routes中的对应路径即可（redirect的path需要与micro-app中的activeRule一致）。
至于子应用需要添加或修改的内容由于不同版本都有不同之处，建议自行查看相关文档，这里可以参考本人的实现（vue3 + vue-router4，请注意package.json中的相关信息）：https://github.com/zackBRAVE/edgex-ui-system-agent

## Project setup
```
pnpm install
```

### Compiles and hot-reloads for development
```
pnpm run serve
```

### Compiles and minifies for production
```
pnpm run build
```

### Lints and fixes files
```
pnpm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
