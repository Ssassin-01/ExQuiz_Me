# 🚀 **Exquiz Me - Vocabulary Learning Platform**

**Exquiz Me**는 영어 학습자를 위한 단어 학습 플랫폼입니다. 이 프로젝트는 사용자가 자신만의 단어 카드를 만들고 학습할 수 있도록 도와주며, 테스트 기능을 통해 학습 성과를 점검할 수 있도록 설계되었습니다.

## 📖 **프로젝트 개요**
### 기획 배경
- 단어 학습의 반복과 지루함을 해결하기 위해 설계된 맞춤형 학습 플랫폼입니다.
- 게임 요소를 결합하여 학습 동기 부여를 높이고, 사용자가 재미있게 학습할 수 있도록 기획되었습니다.
- 실시간으로 다른 사용자와 경쟁하거나 협력하는 기능을 통해 흥미를 유지하고 학습 효율을 극대화합니다.

### 프로젝트 진행 기간
- **2024/06 ~ 2024/11**

## ✨ **주요 기능**
1. **단어 카드 생성 및 학습**: 사용자가 단어 카드를 생성하고 학습할 수 있습니다.
2. **OX, 사지선다, 단답형 유형으로 연습하기**: 다양한 형식으로 단어를 연습하며 학습 성과를 높입니다.
3. **단어 테스트**: 학습한 단어를 퀴즈로 테스트하여 이해도를 점검할 수 있습니다.
4. **실시간 다른 사람들과 영단어 게임**: 실시간으로 다른 사용자와 단어 게임을 통해 경쟁하며 재미있게 학습합니다.
5. **신고 시스템**: 잘못된 단어나 부적절한 내용을 신고할 수 있는 기능을 통해 콘텐츠 품질 관리.
6. **구독 시스템**: 프리미엄 구독을 통해 추가적인 학습 자료나 기능을 이용할 수 있습니다.
7. **출석량 확인 시스템**: GitHub의 잔디밭처럼 학습 출석량을 시각적으로 확인할 수 있는 기능을 제공합니다.
8. **학습량 체크 그래프**: 사용자가 자신의 학습 진행 상황을 한눈에 파악할 수 있도록 시각화된 그래프를 제공합니다.

## 🔧 **설치 방법**

1. **레포지토리 클론**:
    ```bash
    git clone https://github.com/username/exquiz-me.git
    cd exquiz-me
    ```

2. **실행 스크립트 사용**:
   - 프로젝트는 `start.sh` 스크립트를 사용하여 실행됩니다. 이 스크립트는 로컬 IP를 자동으로 감지하고, 필요한 환경 변수를 설정한 뒤 프론트엔드와 백엔드를 동시에 실행합니다.
   - **스크립트 실행**:
     ```bash
     ./start.sh
     ```

3. **환경 변수 설정**:
   - `start.sh` 스크립트에서 자동으로 환경 변수를 설정하며, React와 Spring Boot 모두 로컬 네트워크 IP에 맞게 설정됩니다.

## 🛠️ **기술 스택**

### 프론트엔드
- **React**: 사용자 인터페이스 구성 (v18.2.0)
- **React Router**: 페이지 라우팅 관리 (v6.22.3)
- **Bootstrap & Tailwind CSS**: 스타일링과 레이아웃
- **Axios**: HTTP 통신을 위한 라이브러리 (v1.6.8)
- **Socket.io & SockJS**: 실시간 통신 (v4.7.5)
- **Chart.js**: 데이터 시각화 (v5.2.0)
- **React Quill**: 리치 텍스트 편집기

### 백엔드
- **Spring Boot**: 백엔드 프레임워크 (v3.2.4)
- **Spring Security**: 인증 및 권한 관리
- **Spring Data JPA**: 데이터베이스 연동
- **Java 17**: 애플리케이션 소스 코드
- **Gradle**: 빌드 도구
- **IntelliJ IDEA**: 개발 환경

### 데이터베이스
- **MySQL**: 관계형 데이터베이스

### 협업 및 커뮤니케이션
- **Jira**: 프로젝트 관리
- **Notion**: 문서 관리 및 협업
- **Discord**: 팀 커뮤니케이션

## 🌍 **개발 및 협업 환경**
<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot">
  <img src="https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white" alt="Spring Security">
  <img src="https://img.shields.io/badge/Spring_Data_JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white" alt="Spring Data JPA">
  <img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white" alt="Java">
  <img src="https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white" alt="Gradle">
  <img src="https://img.shields.io/badge/IntelliJ_IDEA-000000?style=for-the-badge&logo=intellij-idea&logoColor=white" alt="IntelliJ IDEA">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white" alt="Jira">
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white" alt="Notion">
  <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord">
</p>

## 🚀 **사용 방법**

1. **단어 카드 학습**: 사용자는 학습할 단어 카드 목록을 선택하고, 단어와 그 번역을 학습할 수 있습니다.
2. **단어 테스트**: 학습한 단어에 대해 여러 가지 형식(영어 단어 맞추기, 단어 뜻 맞추기 등)으로 테스트를 진행할 수 있습니다.
3. **북마크 추가**: 중요하다고 생각되는 단어는 북마크하여, 나중에 쉽게 복습할 수 있습니다.
4. **부적절한 콘텐츠 신고**: 잘못된 단어 정보나 부적절한 콘텐츠는 신고 기능을 통해 관리자가 확인하고 수정할 수 있습니다.



