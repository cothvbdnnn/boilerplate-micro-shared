# shared

## Structure

```
├── src
│   ├── assets
│   │   └── global.css
│   ├── components
│   |   └── Example.vue
|   |── config
|   |   |── dev.json
|   |   |── staging.json
|   |   |── manage.json
│   |   └── index.js
|   |── lang
|   |   |── vi.json
│   |   └── en.json
|   |── store
|   |   ├──modules
|   |   |  └── loading.js
│   |   └── index.js
|   |── utils
|   |   |── filters.js
|   |   |── i18n.js
|   |   |── raven.js
|   |   |── request.js
│   |   └── response.js
|   └── shared.js
├── .env
├── .eslintrc
├── .gitignore
├── .prettierignore
├── babel.config.json
├── jest.config.js
├── webpack.config.js
└── package.json
```

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

**Run development**

```
yarn start:dev
```

**Run staging**

```
yarn start:staging
```

**Run manage**

```
yarn start:manage
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
