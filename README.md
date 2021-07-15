# How to run

## backend
```
cd packages/backend
npm start
```
## frontend

```
cd packages/frontend
npm run dev
```


# How to deploy

## branch and deployment matching

* master -> 
* private branch -> preview
* Development -> local

## backend

[master](selfschool-backend-git-master.pixelondesign.vercel.app)

### monitor/debug backend


```
vercel logs -f https://selfschool-backend-git-feat-next-ci.pixelondesign.vercel.app/
```




## frontend

[master](https://selfschool-fronted-git-master.pixelondesign.vercel.app/)

#### How to start local

```
cd packages/frontend
npm run dev
```


## prisma db

https://app.prisma.io/pixel/services/prisma-us1/fullstack/dev/databrowser


# Story Book

[master](https://selfschool-storybook.vercel.app/)

## how to start

```
cd packages/storybook
yarn storybook
```
