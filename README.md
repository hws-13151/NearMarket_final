# 🛍 **NearMarket** 🛍

<div align="center">
  <img src="https://github.com/user-attachments/assets/cf475d28-29b1-4c02-bdd9-3c5c34c03bcb" alt="NearMarket" width="500"/>
</div>

<br />

<div>
  <span style="background-color: #F7BE81; color: black; padding: 10px; border-radius: 5px; font-size: 18px;">
NearMarket는 대형 마켓을 위한 장보기 어플리케이션은 이미 많이 존재하지만, 중소형 마켓을 위한 스마트 오더 시스템은 부족하다는 문제를 해결하고자 개발된 프로젝트입니다. 이 어플은 집 근처의 작은 마트에서도 스마트폰을 통해 간편하게 장을 볼 수 있도록 하여, 전 연령대가 쉽게 이용할 수 있는 쇼핑 환경을 제공합니다.
<br />
<br />
NearMarket은 다양한 식품 카테고리, 직관적인 UI/UX, 그리고 반응형 디자인을 통해 모바일 및 태블릿에서도 최적화된 쇼핑 경험을 제공합니다. 또한, 관리자가 상품을 효율적으로 관리할 수 있는 관리자 페이지도 갖추고 있어 운영 효율성을 높였습니다.
<br />
<br />
이 프로젝트는 중소형 마트를 위한 스마트 오더 시스템을 통해 소비자와 상점 모두에게 편리하고 스마트한 쇼핑 경험을 제공합니다.
  </span>
</div>

<br>

## 📌 **목차**

* [🔎 프로젝트 소개](#프로젝트-소개)
  + [✔ 프로젝트 기본설정 ✔](#-프로젝트-기본설정-)
  + [✔ 팀원소개 ✔](#-팀원소개-)
  + [✔ 타임라인 ✔](#-타임라인-)
  + [✔ 기술스택 ✔](#-기술스택-)
* [⭐ 프로젝트 시안](#프로젝트-시안)
    + [✔ 메인, 추천, 고기, 디테일 페이지 ✔](#-메인-추천-고기-디테일-페이지-)
    + [✔ 관리자 페이지 ✔](#-관리자-페이지-)
    + [✔ 반응형 ✔](#-반응형-)

---

## 🔎 **프로젝트 소개**

<details>
<summary>프로젝트 기본설정</summary>

| 제목           | 내용          |
|----------------|---------------|
| 일정          | 2024/09/23 ~ 2024/10/25 |
| 주제          | 스마트오더    |
| 프로젝트명    | NEARMARKET    |
| 프로그래밍 언어| HTML, CSS, JAVASCRIPT |
| 프레임워크     | REACT         |
| 데이터베이스   | JSONSERVER    |
| 개발툴         | VSCODE        |

</details>

<details>
<summary>팀원소개</summary>

<table>
  <tbody>
  <tr>
    <th align="center">팀장: 권**</th>
    <th align="center">팀원: 강**</th>
    <th align="center">팀원: 김**</th>
    <th align="center">팀원: 한원세</th>
  </tr>
  <tr>
    <td>과자페이지, 장바구니, Git 담당</td>
    <td>과일페이지, API 담당, Admin페이지 CRUD, PPT 담당</td>
    <td>채소페이지, 결제, 로그인, 회원가입, Start 페이지, Figma 담당</td>
    <td>메인, 고기, 추천 페이지, Admin페이지, CSS 반응형, PPT 담당</td>
  </tr>
  </tbody>
</table>

</details>

<details>
<summary>타임라인</summary>

<div align="center">
  <img src="https://github.com/user-attachments/assets/5c965e74-1b6a-4685-acb4-5f87349334cd" width="700" />
</div>

</details>

<details>
<summary>기술스택</summary>
 
<div align="center">
  <img src="https://github.com/user-attachments/assets/1a0a4bdc-c59a-4739-81d7-97a15cee9d04" width="700" />
</div>

</details>

---

## ⭐ **프로젝트 시안**

### ✔ **메인 추천 고기 디테일 페이지** ✔
<details>
<summary>메인, 추천, 고기, 디테일 페이지 시연 영상</summary>

#### 1. **메인페이지**

- `section`을 두 개로 나누어, Section1 부분은 `setInterval`을 사용하여 일정 시간마다 콜백 함수 `setAutoImg`를 호출하고, 이미지 인덱스를 업데이트하여 자동으로 이미지가 넘어가도록 구현
- Section2는 `useNavigate`를 사용해 사용자가 원하는 코너로 빠르게 이동할 수 있도록 구현

<div align="center">
  <img src="https://github.com/user-attachments/assets/b932cb34-e9a5-4e51-9780-de2bfee0f171" alt="메인" width="700" />
</div>

<br />

#### 2. **추천페이지**

<div align="center">
  <img src="https://github.com/user-attachments/assets/5d4429e1-91b1-4963-87a7-c53986f0ba85" alt="추천" width="700" />
</div>

<br />

#### 3. **고기페이지**

- `Axios get`을 이용해 서버에서 데이터를 가져와 `map`을 사용하여 모든 고기 상품 정보를 표시
- 수량을 증가하거나 감소할 때마다 총 가격을 자동으로 계산
- 장바구니 버튼 클릭 시 모달 창을 띄워 사용자가 주문을 결정할 수 있도록 구현
- 결제 버튼 클릭 시 결제 페이지로 데이터 전송 및 즉시 이동

<div align="center">
  <img src="https://github.com/user-attachments/assets/c2e5d3d0-7bd9-4128-859d-eccf01daf46c" alt="고기" width="700" />
</div>

</details>

### ✔ **관리자 페이지** ✔
<details>
<summary>관리자 페이지 시연 영상</summary>

- Google font를 사용하여 가독성이 좋고 관리하기 편한 UI를 설계
- 카테고리별 상품을 `Axios post`로 등록하고, 입력 데이터가 빠지지 않도록 모달창으로 알림
- 동일한 상품명이 이미 있을 경우 알림창을 통해 관리자에게 알려주는 기능
- `fileReader`를 이용하여 등록하려는 이미지를 미리 확인할 수 있도록 구현

<div align="center">
  <img src="https://github.com/user-attachments/assets/6cf0398f-eadf-4de3-9695-003d9f808243" alt="관리자" width="700" />
</div>

</details>

### ✔ **반응형** ✔
<details>
<summary>반응형 시연 영상</summary>

- 다양한 디바이스에서 NearMarket을 사용할 수 있도록 미디어 쿼리 사용
- 태블릿과 모바일 버전에서 `CSS position`과 `JavaScript`를 이용해 Header 부분을 버튼 클릭 시 나타나도록 구현

#### 1. **태블릿 버전 반응형**

<div align="center">
  <img src="https://github.com/user-attachments/assets/cc7a37a0-d710-45f3-b78c-8fa4a5012954" alt="태블릿 반응형" width="700" />
</div>

#### 2. **모바일 버전 반응형**

<div align="center">
  <img src="https://github.com/user-attachments/assets/460fc378-43a5-478f-be72-b55a8cd247ce" alt="모바일 반응형" width="700" />
</div>

</details>

---

### ✨ **프로젝트 특징**

- **중소형 마켓을 위한 스마트 오더 시스템** 구축
- 다양한 상품 카테고리 제공 (과일, 채소, 고기 등)
- 직관적인 UI와 UX 디자인으로 쉽고 빠른 쇼핑 경험
- **반응형 웹 디자인**을 통해 모바일, 태블릿에서 최적화된 화면 제공
- **관리자 페이지**를 통한 효율적인 상품 관리 및 업데이트 기능

---
