![image](https://github.com/user-attachments/assets/3b2c0f34-6233-401d-9f2b-ca8c95c78783)
# 🛍NearMarket🛍

![image](https://github.com/user-attachments/assets/cf475d28-29b1-4c02-bdd9-3c5c34c03bcb)
<br />
<span style="background-color: #F7BE81; color:black">
처음 이 프로젝트를 만든 이유는 대형 마켓 장보기 어플들은 있어도 중소형 마켓 어플들은 없어서 기획하게 되었습니다. <br />
다양한 식품을 판매하는 마트를 위한 스마트 오더 시스템입니다.<br />
집 근처 작은 마트에서도 스마트 오더 시스템을 통해 집에서도
스마트폰을 사용하는 전 연령대 를 타겟으로 잡았습니다.<br />
간편하게 장을 볼 수 있게 하기 위해서 개발하게 되었습니다.
</span>

<br>


## 📌 목차

* [🔎프로젝트 소개](#프로젝트-소개)
  + [✔ 프로젝트 기본설정 ✔](#-프로젝트-기본설정-)
  + [✔ 팀원소개 ✔](#-팀원소개-)
  + [✔ 타임라인 ✔](#-타임라인-)
  + [✔ 기술스택 ✔](#-기술스택-)
* [⭐프로젝트 시안](#프로젝트-시안)
    + [✔ 메인, 추천, 고기, 디테일 페이지 ✔](#-메인-추천-고기-디테일-페이지-)
    + [✔ 관리자 페이지 ✔](#-관리자-페이지-)
    + [✔ 반응형 ✔](#-반응형-)

<br>

## 🔎프로젝트 소개

<details>
<summary>프로젝트 기본설정</summary>

|제목|내용|
|------|---|
|일정|2024/09/23~2024/10/25|
|주제|스마트오더|
|프로젝트명|NEARMARKET|
|프로그래밍 언어|HTML,CSS,JAVASCRIPT|
|프레임워크|REACT|
|데이터베이스|JSONSERVER|
|개발툴|VSCODE|


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
    <td>과자페이지, 장바구니,Git 담당</td>
    <td>과일페이지, API 담당,
    Admin페이지 CRUD,
    PPT 담당
    </td>
    <td>채소페이지, 결제,
    로그인, 회원가입,
    Start 페이지, Figma 담당 
    </td>
    <td>메인, 고기, 추천 페이지,
    Admin페이지, CSS 반응형, PPT 담당
    </td>
  </tr>
  </tbody>
</table>



</details>

<details>
<summary> 타임라인</summary>

![image](https://github.com/user-attachments/assets/5c965e74-1b6a-4685-acb4-5f87349334cd)

</details>
<details>
<summary>기술스택</summary>
 
![image](https://github.com/user-attachments/assets/1a0a4bdc-c59a-4739-81d7-97a15cee9d04)

</details>
<br>

## ⭐프로젝트 시안
<br>

### ✔ 메인 추천 고기 디테일 페이지 ✔
<details>
<summary>메인, 추천, 고기, 디테일 페이지 시연 영상</summary>

1. 메인페이지

  - section을 두개로 나누어서 Section1부분은 setInterval을 이용하여 일정 시간마다 콜백 함수 setAutoImg를 호출해 현재 인덱스를 업데이트하여 이미지가 넘어가도록 구현
  - Section2는 useNavigate를 사용해 사이트 사용자가 원하는 코너로 빠르게 이동할 수 있도록 구현

![메인](https://github.com/user-attachments/assets/b932cb34-e9a5-4e51-9780-de2bfee0f171)

<br />

2. 추천페이지

![추천](https://github.com/user-attachments/assets/5d4429e1-91b1-4963-87a7-c53986f0ba85)

<br />
3. 고기페이지

- Axios get을 이용해서 서버에 있는 데이터들을 가져와 map으로 모든 고기 상품정보가 나타나도록 구현
- 수량이 증가하거나 감소했을 때 총 가격이 계산되도록 구현
- 장바구니를 눌렀을 때 모달창을 띄워 주문자가 결정할 수 있도록 구현
- 계속 쇼핑하기와 장바구니로 이동하기를 눌렀을 때 장바구니에 데이터 저장
- 결제 버튼을 눌렀을 때 결제 페이지로 데이터 전송 및 결제 페이지로 바로 이동하도록 구현

![고기](https://github.com/user-attachments/assets/c2e5d3d0-7bd9-4128-859d-eccf01daf46c)


<br />
</details>

### ✔ 관리자 페이지 ✔
<details>
<summary>관리자 페이지 시연 영상</summary>

- Google font에서 읽기 편한 font를 사용하여 가독성이 좋고 관리하기 편하도록 제작
- 카테고리를 설정하여 해당 카테고리에 맞는 상품 코너에 Axios post로 input 데이터를 저장하도록 구현
- 하나라도 입력이 안되었을 경우 모달창을 띄워 입력하도록 구현
- 같은 카테고리에 동일한 상품명이 있을 경우 “이미 등록된 상품입니다.”라는 모달창을 띄워 관리자에게 알리도록 구현
- fileReader를 이용하여 등록하려는 이미지를 미리 볼 수 있도록 구현

![관리자](https://github.com/user-attachments/assets/6cf0398f-eadf-4de3-9695-003d9f808243)

<br />
</details>

### ✔ 반응형 ✔
<details>
<summary>반응형 시연 영상</summary>

- 어떤 디바이스로도 NearMarket을 사용할 수 있도록 미디어 쿼리를 이용하여 태블릿과 모바일 두 가지 버전을 제작했습니다.
- 모바일과 태블릿 버전에서 css position과 Javascript 방식을 이용해 Header 부분을 숨겼다가 버튼을 눌렀을 때 나타나도록 구현

1. 태블릿 버전 반응형

![반응형](https://github.com/user-attachments/assets/cc7a37a0-d710-45f3-b78c-8fa4a5012954)

2. 모바일 버전 반응형

![반응형 모바일](https://github.com/user-attachments/assets/460fc378-43a5-478f-be72-b55a8cd247ce)


</details>
