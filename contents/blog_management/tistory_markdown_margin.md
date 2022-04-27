# 티스토리 제목 및 문단에 여백 추가하기

안녕하세요.

| 마진 & 패딩                          |
| ------------------------------------ |
| <img src="./source_introduce.png" /> |

![undraw_modern_design]

#### 3-2. 제목 및 단락 사이에 여백 추가하기 (Optional)

이 부분은 개인의 취향이기는 한데 보통 티스토리에서 마크다운 스타일로 글을 쓰고 적용해보면 제목 혹은 단락 사이에 공백이 적습니다. 하지만 마크다운은 제목 혹은 단락 사이에 여백이 있어야 보기 좋습니다.

제목 여백 같은경우는 간단하게 적용이 가능합니다. 마크다운 CSS를 적용한 아래줄에 아래 코드를 추가해주세요.

## 1. 제목에 여백 추가하기

```html
<head>
  ...
  <!-- 
    markdown-css ... 
  -->
  <!-- 제목 위에 공백 추가 -->
  <style>
    .markdown-body h1,
    .markdown-body h2,
    .markdown-body h3,
    .markdown-body h4,
    .markdown-body h5,
    .markdown-body h6 {
      margin-top: 48px;
    }
  </style>
  <!-- 제목 위에 공백 추가 완료 -->
  ...
</head>
```

## 2. 문단에 여백 추가하기

### 2.1 티스토리에서 제공하는 방법으로 설정

단락 사이에 여백을 넣기 위해 여러 가지 방법을 찾아보았는데 가장 간단한 방법은 `블로그 관리 홈` -> `콘텐츠` -> `설정`에 있는 `단락 앞뒤에 공백을 '사용합니다'`로 변경하는 방법인데 제 스킨에는 적용되지 않았습니다. 만약 적용이 되는 분은 이대로 사용하시면 될 것 같습니다. 만약에 적용이 안 된다면 아래 방식으로 적용해주세요.

### 2.2 Html편집을 통한 설정

여러 방식으로 여백에 대한 문제점을 찾아보았는데, `tt_article_useless_p_margin` 클래스에서 강제로 여백을 0으로 주고 있음을 확인할 수 있었습니다. 그래서 `markdown-css`를 적용하고 난 밑에 줄에 아래 `style`을 추가로 적어주었습니다. 만약 여백을 추가로 주고 싶으면 아래 숫자를 변경해서 적용해주세요.

```html
<head>
  ...
  <!-- 
    markdown-css ... 
  -->
  <!-- 단락에 공백 추가 -->
  <style>
    .tt_article_useless_p_margin p {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      margin-top: 0 !important;
      margin-bottom: 1em !important;
    }
  </style>
  <!-- 단락에 공백 추가 완료 -->
  ...
</head>
```

<!-- ---------------------------- -->
<!-- ---------- define ---------- -->
<!-- ---------------------------- -->

<!-- undraw -->

[undraw_art_museum]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/undraw/undraw_art_museum.png?raw=true
[undraw_code_inspection]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/undraw/undraw_code_inspection.png?raw=true
[undraw_modern_design]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/undraw/undraw_modern_design.png?raw=true
[undraw_static_website]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/undraw/undraw_static_website.png?raw=true
