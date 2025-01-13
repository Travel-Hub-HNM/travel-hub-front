## 네이밍 컨벤션

### 변수

-   Camel Case 사용(자료 구조 명시)
    ```
      let customerNames = ['kim', 'park', 'jung'] // 자료 구조 명시 되지 않음.
    let customerNameList = ['kim', 'park', 'jung'] // 자료 구조 명시 됨.
    ```
-   Boolean 변수 및 State Varible에 대해서는 구분은 명확하게 할 수 있는 변수 사용(ex> `is-`, `has-`, `should-`)
    ```
    isLoading, hasError, shouldRendering
    ```
-   SCSS 변수 및 함수
    -   Kebab-case 사용
-   Type
    -   **Interface**를 주로 사용하며, prefix로 `I`를 사용, type을 사용할경우 suffix로 `Type`명시
        ```
        interface IUser{
            id: string
            pw: string
        }
        type userType = {
            id: string
            pw: string
        }
        ```

### 상수

-   대문자 Snake Case 사용
    ```
       const JWT_TOKEN_SECRET = "some secret";
    ```

### 함수

-   Camel Case 사용
-   prefix는 해당 함수가 정확히 어떤 기능을 수행하는지 명시
-   event handler(`onClick`, `onChange`등)에 대해서는 prefix에 `handle` 이라고 명시

    ```
    // Posts를 가져오는 함수
    const getPostList = () => {}

    // User정보를 필터링하는 함수
    const filterUserList = ()=> {}

    // Input함수 처리
    const handleInput = () => {}
    ```

-   자식 컴포넌트로 handler를 내려줘야하는 경우 자식 컴포넌트 props를 prefix를 `on-`이라고 명시

    ```
    const App = () => {
    const handlePlayMovie = () => alert('Playing!');
    const handleUploadImage = () => alert('Uploading!');

     return (
         <Toolbar
         onPlayMovie={handlePlayMovie}
         onUploadImage={handleUploadImage}
         />
     );
     }

     const  Toolbar = ({ onPlayMovie, onUploadImage })  => {
     return (
     <div>
         <Button onClick={onPlayMovie}>
         Play Movie
         </Button>
         <Button onClick={onUploadImage}>
         Upload Image
         </Button>
     </div>
     );
     }

    ```

### 파일명

-   Kebab Case 사용
    ```
      ├─ src
      │  ├─ pages
      │  │  ├─ not-found
      │  │  ├  ├─ not-found.ui.tsx
    ```

### 폴더

-   Kebab Case 사용

    ```
      ├─ src
      │  ├─ pages
      │  │  ├─ not-found
    ```
