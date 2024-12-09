#

Vue.js로 구현했던 영화 정보 제공 사이트를 React.js로 마이그레이션하여 재구현하였습니다.
https://hjmovie-box-app.netlify.app/

주요 프레임워크 및 라이브러리: React.js, Typescript, Zustand, Tailwind CSS
배포: Netlify

디자인

- OTT플랫폼 중 하나인 Wavve(웨이브)를 따라했습니다.
- 반응형 디자인이 적용하였습니다.
- 사용자 경험 개선을 위해 Skeleton UI 적용하였습니다.

API

- TMDB에서 제공하는 API를 활용하여 영화정보를 가져왔습니다.

프로젝트 기능

- 메인화면에서 영화리스트, 티비 프로그램리스트를 확인할 수 있습니다. 스와이퍼가 가능합니다.
- 메인화면 상단의 배너는 기본이 autoplay이며 아이콘으로 stop 혹은 직접 조작이 가능합니다.
- 메인화면 왼쪽 상단 인풋에 키워드를 입력하면 영화 검색이 가능합니다.
- 영화 포스터를 클릭하면 영화 디테일 화면으로 이동하며 영화 정보와 예고편영상을 재생할 수 있습니다.
- 티비 프로그램 포스터를 클릭하면 디테일 화면으로 이동하며 티비프로그램 정보와 예고편영상을 재생할 수 있습니다.
- 해당 프로젝트의 상단 베너를 제외한 데이터(예고편, 영화리스트, 비슷한 영화, 영화정보 등등)는 TMDB api에서 가져왔습니다.

## Project Setup

```sh
npm install
```

<br />

개발 서버 실행

```sh
npm run dev
```
