## FSD Architecture

기능 분할 설계(Feature-Sliced Design, FSD)로써 추후에 나올 레이어에 고유한 책임 영역이 있으며, 이는 비즈니스 지향적인 추구를 하는 아키텍쳐입니다.

![fsd-architecture](./fsd-architecture.png)

### Layer

각 레이어는 이미지와 같이 하위(shared)에서 상위(app)로만 공유가 가능하며 상위에서 하위로 공유는 불가능합니다. 이는 한방향으로만 향하는 선형적인 흐름을 유지하기 위한것으로써 FSD Architecture의 매우 중요한 점이라고 할 수 있습니다. 즉, **widgets**레이어는 **features**레이어의 파일들을 사용할 수 있지만, **pages**레이어의 파일은 사용 할 수 없습니다.

또한, 각 레이어 내부 최상위에는 **index.ts**라는 파일을 통해 외부로 공유가 가능합니다.

#### app

애플리케이션의 진입점이자 로직의 초기화되는 폴더로써 providers, routers, global styles, global types, declarations등이 정의

#### pages

전체 페이지를 구성하기 위한 구성 레이어로써, 애플리케이션의 페이지가 포함

#### widgets

페이지에서 사용되는 독립적인 UI 컴포넌트(ex. IssuesList, UserProfile, Header, Footer)

#### features

business value를 전달하는 유저 시나리오와 같은 기능및 토글과 같은 일반적인 기능들을 처리 (ex. Toggle, DarkMode, AddToCart, UsersSearch)

#### entities

business entities를 다루는 폴더로써 CRUD작업들을 해당 폴더에서 처리 (ex. User, Product, Order)

#### shared

특정 비즈니스 로직에 종속되지 않은 재사용가능한 컴포넌트와 유틸리티가 포함 (ex. UIKit, libs, API)

### Slices

slice에서 연결은 추상적인 것이 아니라, 특정 business entities에 대한 것으로써, 비즈니스 도메인 별로 코드를 분할해서 논리적으로 관련된 모듈을 서로 가깝게 유지하여 코드 베이스를 쉽게 탐색할 수 있습니다.

slice는 폴더는 business 영역에 의해 직접 결정되기때문에 이름이 표준화되어있지 않습니다. 예를들어, photo gallery를 생각해보면, photo, album, gallery와 같은 섹션이 있을 수 있다. 그리고 SNS는 post, user, newsfeed와 같은 슬라이스가 필요할 것입니다.

### Segments

세그먼트는 기술적 목적에 따라 슬라이스 내의 코드를 나누는데 도움이 되는 작은 모듈입니다. 일반적 세그먼트는 ui, model(store, actions), api, lib(utils/hooks)있으나, 우리는 api, ui, model, lib, config를 사용할 예정입니다.

api: 서버 요청  
ui: 슬라이스의 UI 컴포넌트  
model: 비즈니스 로직, consts, types  
lib: 슬라이스 내 사용되는 보조 기능 (ex. hooks, utils)  
config: route

### Reference

https://velog.io/@yeonoey/FSD-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90
