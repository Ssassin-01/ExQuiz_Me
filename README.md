frontend 파일 안에다 config.env파일 생성하고
IP_ADDRESS=10.1.16.44
이런식으로 작성해주세요!!! 
 - cmd에 ipconfig입력 
 - ipv4 주소입니다!

### 버전 및 의존성

- Spring Boot 3.2.1.
- Security 6.2.1
- Lombok
- Spring Data JPA - MySQL
- Gradle - Groovy
- Intelij Ultimate

- node v20.12.1
- npm 10.5.1
- react-router-dom
- tailwind css

- npm install @stomp/stompjs@7.0.0
- npm install @testing-library/jest-dom@5.17.0
- npm install @testing-library/react@13.4.0
- npm install @testing-library/user-event@13.5.0
- npm install axios@1.6.8
-  npm install bootstrap@5.3.3
- npm install cross-env@7.0.3
- npm install dotenv@16.4.5
- npm install http-proxy-middleware@3.0.0
- npm install react-bootstrap@2.10.2
- npm install react-dom@18.2.0
- npm install react-helmet-async@2.0.4
- npm install react-icons@5.1.0
- npm install react-quill@2.0.0
- npm install react-router-dom@6.22.3
- npm install react-scripts@5.0.1
- npm install react-slick@0.30.2
- npm install react@18.2.0
- npm install slick-carousel@1.8.1
- npm install socket.io-client@4.7.5
- npm install sockjs-client@1.6.1
- npm install tailwindcss@3.4.3
- npm install web-vitals@2.1.4
- npm install websocket@1.0.35

---

### start.sh 스크립트와 관련 환경 설정 설명

### 목적

`start.sh` 스크립트는 프로젝트의 프론트엔드와 백엔드를 시작하는 데 필요한 환경 변수를 설정하고, 두 애플리케이션을 동시에 실행시키는 역할을 합니다. 이는 환경 설정을 자동화하여 개발자가 쉽게 프로젝트를 실행할 수 있도록 돕습니다

방화벽설정

1. Windows Defender 방화벽 접근
시작 메뉴에서 "방화벽"을 검색하고, "Windows Defender 방화벽"을 엽니다.
2. 고급 설정
왼쪽 메뉴에서 "고급 설정"을 클릭합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c81aa8cc-3b01-4365-8734-dd180cf942e7/9aadcbc1-94d7-4f2e-8294-5cd7b26f10aa/Untitled.png)

1. 인바운드 규칙 설정
"인바운드 규칙"을 선택하고, 오른쪽 메뉴에서 "새 규칙"을 클릭합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c81aa8cc-3b01-4365-8734-dd180cf942e7/51a381b4-5943-4424-b2a4-83c2579bf4ac/Untitled.png)

1. 포트 규칙 구성
"규칙 유형"에서 "포트"를 선택합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c81aa8cc-3b01-4365-8734-dd180cf942e7/c3bdb1e2-cf99-4b20-afe9-8c98b742f1c5/Untitled.png)

1. "TCP"를 선택하고, "특정 로컬 포트"에 3000을 입력합니다.
동일한 방법으로 8080번도 설정합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c81aa8cc-3b01-4365-8734-dd180cf942e7/9ebdc8fd-b908-420f-9d4d-81e0ca7182d4/Untitled.png)

1. 연결 허용
"연결 허용"을 선택하고, 다음 버튼을 클릭합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c81aa8cc-3b01-4365-8734-dd180cf942e7/3143f075-bf7f-4ef1-a3a1-60331176cbf7/Untitled.png)

1. 프로필 설정
적용할 네트워크 유형(도메인, 개인, 공용)을 선택합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c81aa8cc-3b01-4365-8734-dd180cf942e7/a0e448f2-c3c8-4b51-8f8d-2cf038e5501c/Untitled.png)

1. 규칙 이름 설정
규칙에 이름(예: "React Development Port" 및 "Spring Boot Port")과 설명을 입력합니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c81aa8cc-3b01-4365-8734-dd180cf942e7/0b70b91a-8f17-4cb9-a751-520b21070150/Untitled.png)

1. 이러한 설정을 통해 해당 컴퓨터가 연결된 로컬 네트워크 내의 다른 디바이스에서도 React 개발 서버와 Spring Boot 서버에 접근할 수 있게 됩니다. 방화벽 설정을 조정할 때는 보안을 항상 고려해야 하며, 개발이 끝난 후 불필요한 포트는 다시 닫는 것이 좋습니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c81aa8cc-3b01-4365-8734-dd180cf942e7/be733943-4fbf-4561-b8f2-d2749cfc6a6d/Untitled.png)

---

### `config.env`

```
IP_ADDRESS=10.202.36.72
```

- **`IP_ADDRESS`**: 서버의 IP 주소를 설정합니다.

---

### start.sh

```bash
#!/bin/bash

# Load environment variables from src/main/frontend/config.env
source ./src/main/frontend/config.env

# Ensure IP_ADDRESS is set
if [ -z "$IP_ADDRESS" ]; then
  echo "IP_ADDRESS is not set in config.env"
  exit 1
fi

# Set environment variables for React
export REACT_APP_API_URL="http://$IP_ADDRESS:8080"

# Set environment variables for Backend
export SPRING_SERVER_ADDRESS=$IP_ADDRESS
export SPRING_SECURITY_ALLOWED_ORIGINS="http://$IP_ADDRESS:3000"

# Verify that environment variables are set
echo "SPRING_SERVER_ADDRESS=$SPRING_SERVER_ADDRESS"
echo "SPRING_SECURITY_ALLOWED_ORIGINS=$SPRING_SECURITY_ALLOWED_ORIGINS"
echo "REACT_APP_API_URL=$REACT_APP_API_URL"

# Start Backend app
./gradlew bootRun &
BACKEND_PID=$!

# Start React app
cd src/main/frontend
# Ensure React starts with the correct IP address
export HOST=$IP_ADDRESS
npm start &
FRONTEND_PID=$!

# Wait for both processes to complete
wait $BACKEND_PID
wait $FRONTEND_PID
```

### 스크립트의 각 부분 설명

1. **시작 부분**

```bash
#!/bin/bash
```

- **`#!/bin/bash`**: 이 스크립트가 bash 셸에서 실행됨을 명시합니다.

1. **환경 변수 로드**

```bash
# Load environment variables from src/main/frontend/config.env
source ./src/main/frontend/config.env
```

- **`source`**: 다른 스크립트 파일을 현재 스크립트로 가져와 실행합니다. `config.env` 파일에서 환경 변수를 로드합니다.

1. **IP_ADDRESS 설정 확인**

```bash
# Ensure IP_ADDRESS is set
if [ -z "$IP_ADDRESS" ]; then
  echo "IP_ADDRESS is not set in config.env"
  exit 1
fi
```

- **`if [ -z "$IP_ADDRESS" ]`**: `IP_ADDRESS` 변수가 설정되지 않았는지 확인합니다.
- **`echo`**: 메시지를 출력합니다.
- **`exit 1`**: 오류가 발생했을 때 스크립트를 종료합니다.

1. **React와 백엔드의 환경 변수 설정**

```bash
# Set environment variables for React
export REACT_APP_API_URL="http://$IP_ADDRESS:8080"

# Set environment variables for Backend
export SPRING_SERVER_ADDRESS=$IP_ADDRESS
export SPRING_SECURITY_ALLOWED_ORIGINS="http://$IP_ADDRESS:3000"
```

- **`export`**: 환경 변수를 설정합니다.
- **`REACT_APP_API_URL`**: 프론트엔드에서 사용할 백엔드 API의 URL을 설정합니다.
- **`SPRING_SERVER_ADDRESS`**: 백엔드 서버의 IP 주소를 설정합니다.
- **`SPRING_SECURITY_ALLOWED_ORIGINS`**: CORS 설정을 위해 허용할 오리진(출처) URL을 설정합니다.

1. **환경 변수 확인**

```bash
# Verify that environment variables are set
echo "SPRING_SERVER_ADDRESS=$SPRING_SERVER_ADDRESS"
echo "SPRING_SECURITY_ALLOWED_ORIGINS=$SPRING_SECURITY_ALLOWED_ORIGINS"
echo "REACT_APP_API_URL=$REACT_APP_API_URL"
```

- 설정된 환경 변수를 출력하여 올바르게 설정되었는지 확인합니다.
1. **백엔드 애플리케이션 시작**

```bash
# Start Backend app
./gradlew bootRun &
BACKEND_PID=$!
```

- **`./gradlew bootRun`**: Gradle을 사용하여 Spring Boot 애플리케이션을 시작합니다.
- **`&`**: 이 명령어를 백그라운드에서 실행합니다.
- **`$!`**: 마지막으로 실행된 백그라운드 프로세스의 PID를 저장합니다.

1. **프론트엔드 애플리케이션 시작**

```bash
# Start React app
cd src/main/frontend
# Ensure React starts with the correct IP address
export HOST=$IP_ADDRESS
npm start &
FRONTEND_PID=$!
```

- **`cd src/main/frontend`**: 프론트엔드 디렉터리로 이동합니다.
- **`export HOST=$IP_ADDRESS`**: React 애플리케이션의 호스트를 설정합니다.
- **`npm start`**: React 애플리케이션을 시작합니다.
- **`&`**: 이 명령어를 백그라운드에서 실행합니다.
- **`$!`**: 마지막으로 실행된 백그라운드 프로세스의 PID를 저장합니다.
1. **두 프로세스가 완료될 때까지 대기**

```bash
# Wait for both processes to complete
wait $BACKEND_PID
wait $FRONTEND_PID
```

- **`wait`**: 지정된 PID의 프로세스가 종료될 때까지 기다립니다.

---

### `application.yml`

```yaml
server:
  address: ${SPRING_SERVER_ADDRESS}
  servlet:
    session:
      timeout: 90m

security:
  cors:
    allowed-origins: "${SPRING_SECURITY_ALLOWED_ORIGINS}"

spring:
  web:
    resources:
      static-locations: classpath:/static/

  datasource:
    url: jdbc:mysql://localhost:3306/test?useSSL=false&serverTimezone=UTC
    username: root
    password: 1234
    driver-class-name: com.mysql.cj.jdbc.Driver

  jpa:
    hibernate:
      ddl-auto: update
      naming:
        physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
    show-sql: true
    properties:
      hibernate:
        format_sql: true

logging:
  level:
    org:
      springframework:
        web: DEBUG
        security: DEBUG

    quiz:
      exquiz_me:
        card: DEBUG

```

- **`server`**: 서버 설정.
    - **`address`**: 서버의 IP 주소를 환경 변수로 설정합니다.
    - **`servlet.session.timeout`**: 세션 타임아웃 설정입니다.
- **`security.cors.allowed-origins`**: CORS 설정에서 허용할 오리진을 환경 변수로 설정합니다.
- **`spring.datasource`**: 데이터베이스 설정입니다.
- **`spring.jpa`**: JPA 설정입니다.
    - **`hibernate.ddl-auto`**: 데이터베이스 스키마 자동 업데이트 설정입니다.
    - **`show-sql`**: SQL 쿼리 로깅 설정입니다.
- **`logging`**: 로깅 설정입니다.

이렇게 `start.sh` 스크립트와 관련 환경 설정 파일들은 전체 프로젝트의 환경 변수를 관리하고, 프론트엔드와 백엔드 애플리케이션을 동시에 실행시키는 데 사용됩니다.
