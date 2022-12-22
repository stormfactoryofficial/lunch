# 프로젝트명
Weekly Project - Lunch

## 프로젝트 설명

### 프로그램

내 위치를 입력하면 음식의 종류를 랜덤으로 골라 가까운 음식점 정보를 제공하는 프로그램

![This is a alt text.](./preview.jpg "미리보기 이미지 입니다.")

* 업무가 루즈해져서 텐션을 올리기 위해 회사에서 1주일 프로젝트를 하기로 함
* 다른사람이 필요한 프로그램을 만들기로 하고, 단톡방에서 아이디어 공모
* 매일 하는 고민,  "점심 뭐 먹지?"에 대한 답변을 위한 프로그램

### 프로그램 사용 시

* 프로젝트 루트 디렉토리의 .env 파일에 google api key를 저장해야 합니다.
```
GOGGLE_API_KEY="YOUR_API_KEY"
```

### 애플리케이션 사용법

* navigator 의 geolocation을 활용해서 초기 정보를 가져오는데, 정보가 정확하지 않으면 주소란을 터치해서 주소 입력 가능하다.
* 근처 맛집 추천받기 버튼을 누르면 음식의 종류가 추천되며 음식점 목록을 확인할 수 있다.
* 음식의 종류는 한식, 분식, 중식, 일식, 김밥&도시락, 외국요리, 경양식, 패스트푸드, 구이, 패밀리레스토랑 중에 랜덤 픽이다.
* 내 위치에서 200m, 300m, 500m, 1km, 3km를 선택할 수 있다.
* 음식의 목록은 거리순으로 정렬되어 있다.
* 메뉴 전체 보기에서 원하는 종류를 선택할 수 있다.
* 다른 메뉴 추천을 누르면 다시 랜덤픽이 된다. 

### 개발 도구

프론트 측 프로그램만 push 함

#### dependencies

* npm
* nuxt 3.0.0
* @googlemaps/js-api-loader: 1.15.1
* @nuxtjs/dotenv: 1.4.1
* axios: 1.2.1

### server

* aphach 2.4.52
* python 3.10.6
* php 8.1.2
* mongo db 5.0.9

#### api

* 공공데이터 서울시 일반음식점 인허가 정보
* daum 주소검색
* Geocoding API
* Maps JavaScript API

#### assets

* font : 라인 Seed
* 음식 사진 : 이미지투데이 유료이미지 (멤버십 사용 중)

### 제한점

* 지역은 서울만 가능하다.
* 카테고리는 서울시 인허가 음식점 목록에서 업태를 가져와서 사용하는데 일부 정보가 제대로 구분되어 있지 않다.
* 가까운 음식점을 볼 수 있는 건 참 좋지만 결정을 하는데 정보가 매우 부족하다.
  
###	개선해야 할 점

*	가격대, 메뉴 등의 결정을 위한 정보가 추가되어야 한다.
*	음식의 종류보다는 식당에서 파는 실제 메뉴로 랜덤 픽을 하는 것이 좋을 것 같다.
*	더 고도화 한다면 요청 시에 크롤링을 해보자는 이야기가 나왔다.



