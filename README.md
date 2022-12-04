# serverless-nodejs-lambda-schedulers

## npm_modules 설치 방법

```
npm run update
```

## 로컬 실행 방법

```
npm run offline
```

## 배포 방법

```
npm run deploy:dev
```

## 파일 구조

- /lib/\*\*  
  공용 functions

- /src/\*\*  
  실제 동작하는 schedulers 코드

  - /posts/\*\*  
    포스트 관련 schedulers

  - /functions.yml  
    프록시 Lambda Functions 설정 yml

- .eslintrc  
  eslint 설정 파일

- .gitignore  
  git에 저장하지 않을 파일 및 폴더 구조 설정 파일

- package.json  
  package 파일

- serverless.yml  
  serverless 환경 세팅 파일