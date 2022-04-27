# 티스토리에 여백(Margin, Padding) 적용기

인터넷 기사나 책 등 글을 읽을 때 문단과 문단 사이에 적절한 여백이 있지 않으면 한눈에 확인하기 어렵고 답답함을 느낍니다. 또한 조금 더 집중해서 문단을 구분해야 하므로 눈이 피로해지기 쉽습니다. 이처럼 글과 글 사이의 여백은 가독성 측면에서 매우 중요합니다.

티스토리에는 기본 스킨에는 제목, 문단 사이에 여백이 적용되어있습니다. 하지만 티스토리에서 공식적으로 여러 가지 스킨을 제공하고 일반 사용자가 제작한 스킨들도 사용이 가능해서 모든 스킨에 여백이 적용되어있다고 장담하기 어렵습니다. 또한 게시글을 작성할 때 선택되는 에디터의 종류에 따라서 여백이 생기기도 없어지기도 합니다.

![undraw_modern_design]

HTML에는 여러 가지 태그가 있습니다. 여기에서 `제목(h1, h2, h3, h4, h5, h6)` 태그와 `문단(p)` 태그에 여백을 강제로 주어 스킨을 변경하더라도 일관성 있는 여백으로 글을 읽을 때 가독성을 향상해보도록 하겠습니다.

## 1. Margin과 Padding의 이해

마진과 패딩은 한국어로는 모두 여백을 의미하지만, HTML에서는 다르게 표현됩니다. 내가 의도한 내용의 외부 여백이면 마진, 내부 여백이면 패딩입니다.

이해하기 쉽게 아래 이미지를 보면, 그리고자 하는 것은 800치수의 내용과 border라는 구분 선입니다. 마진은 구분 선 밖의 여백을 나타내고, 패딩은 구분 선과 내용 사이의 여백입니다.

| Margin & Padding |
| ---------------- |
| ![white_space]   |

### 1.1. Html에서 여백

HTML에서는 여백을 `<h1>`, `<p>`와 같은 태그에 직접 할당할 수 있지만, 수많은 제목, 문단에 모두 동일하게 할당하기는 쉽지 않을 것입니다. 만약 모든 제목과 문단에 할당했다고 해도 수치에 대한 수정이 있는 경우 모두 다시 할당을 해야 하므로 매우 귀찮은 작업이 될 수 있습니다.

HTML에서는 CSS라는 기능을 통해 일괄적으로 제목과 문단에 할당하는 기능을 제공합니다. 우리는 이 CSS 수정을 통해서 모든 제목과 모든 문단에 간단히 여백을 추가할 예정입니다.

### 1.2. Margin

CSS에서 마진을 주는 속성은 `margin-top`, `margin-right`, `margin-bottom`, `margin-left`입니다. 상하좌우 모두를 한 번에 여백을 할당하는 속성은 `margin`입니다.

원하는 html 태그와 같이 사용해서 아래와 같이 표현합니다.

```html
<style>
  /* h1 제목에 여백 추가 */
  h1 {
    margin-left: 1em;
    margin-top: 2em;
    margin-right: 3em;
    margin-bottom: 4em;
  }
  /* h2 제목에 여백 추가 */
  h2 {
    margin: 1em;
  }
</style>
```

###### 참고

[CSS - Margin](https://developer.mozilla.org/ko/docs/Web/CSS/margin)

### 1.3. Padding

CSS에서 패딩을 주는 속성은 `padding-top`, `padding-right`, `padding-bottom`, `padding-left`입니다. 상하좌우 모두를 한 번에 여백을 할당하는 속성은 `padding`입니다.

원하는 html 태그와 같이 사용해서 아래와 같이 표현합니다.

```html
<style>
  /* h1 제목에 여백 추가 */
  h1 {
    padding-left: 1em;
    padding-top: 2em;
    padding-right: 3em;
    padding-bottom: 4em;
  }
  /* h2 제목에 여백 추가 */
  h2 {
    padding: 1em;
  }
</style>
```

###### 참고

[CSS - Padding](https://developer.mozilla.org/ko/docs/Web/CSS/padding)

## 2. 여백 CSS 작성

티스토리에 여백을 적용하기 전에 앞서 설명해 드린 여백에 대한 CSS를 티스토리에 맞게 작성해야 합니다. CSS에 대한 문법을 설명하는 건 너무 어려우니 대략 이러한 모양이라고 생각하고 진행해주시기를 바랍니다.

우리는 여러 HTML 태그 중 제목 태그와 문단 태그에 적용에 적용해보겠습니다. 먼저 제목 태그는 `<h1>, <h2>, <h3>, <h4>, <h5>, <h6>`가 있고, 문단 태그는 `<p>`가 있습니다. 기본적인 모든 제목과 문단에 여백을 넣으면 아래 코드와 같은 형식이 됩니다.

```html
<style>
  /* 제목 상단에 여백 추가 */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 2em;
  }

  /* 문단 하단에 여백 추가 */
  p {
    margin-bottom: 1em;
  }
</style>
```

하지만 이 내용을 그대로 적용 시 게시 내용뿐만 아니라 모든 곳에 적용이 되어 스킨이 일그러져 보일 수 있습니다. 그래서 반드시 게시 내용에만 적용해야 합니다. HTML을 살펴보면 게시 내용은 `tt_article_useless_p_margin` 클래스로 적용이 되어 있습니다. 그래서 해당 클래스에만 위 CSS를 적용해야 합니다. 또한, 이미 스킨에서 사용 중인 여백이 있을 수 있으므로 `!important` 속성을 사용해서 강제로 적용해야 합니다.

```html
<style>
  /* 제목 상단에 여백 추가 */
  .tt_article_useless_p_margin h1,
  .tt_article_useless_p_margin h2,
  .tt_article_useless_p_margin h3,
  .tt_article_useless_p_margin h4,
  .tt_article_useless_p_margin h5,
  .tt_article_useless_p_margin h6 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-top: 0 !important;
    margin-top: 2em !important;
  }

  /* 문단 하단에 여백 추가 */
  .tt_article_useless_p_margin p {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-top: 0 !important;
    margin-bottom: 1em !important;
  }
</style>
```

저 같은 경우는 제목에는 아래 여백, 문단에는 하단 여백만 주었습니다. 만약 다른 곳에도 패딩 혹은 마진을 추가하고 해당 요소를 추가하거나 숫자를 바꿔서 자신만의 여백으로 수정해주세요.

## 3. 티스토리 블로그에 적용

앞에서 작성한 코드를 이제 티스토리 블로그에 삽입해야 합니다. 티스토리 블로그는 html 편집을 할 수 있는데 그 기능을 통해서 삽입을 진행하겠습니다.

### 3.1 Html 편집 화면 진입

먼저 스킨 편집 화면으로 이동해주세요. 스킨 편집 화면은 관리자 화면 왼쪽에 메뉴들이 나열되어있는데 사진과 같이 외부 링크로 제공되고 있습니다. 스킨 `편집 버튼`을 클릭합니다.

| `스킨 편집` 버튼   |
| ------------------ |
| ![admin_skin_edit] |

그 후 스킨 편집 화면에서 오른쪽에 있는 `Html편집` 버튼을 클릭합니다.

| `Html편집` 버튼    |
| ------------------ |
| ![admin_html_edit] |

### 3.2 Html 편집

우리의 코드는 html 소스 중에 `<head>`태그 안에 삽입이 되어야 정상적으로 작동하게 됩니다.

아래 사진과 같이 `<head>` 부분과 `</head>` 부분을 찾으세요. 이 부분은 사용하고 계신 스킨마다 다른데요. 스킨마다 적용된 CSS의 내용이 달라서 그렇습니다. `<head>`는 보통 맨 위에서 3번째 줄에 있습니다. 그다음 커서를 태그 안에 위치해 보면 블록의 색이 변경되면서 `</head>`의 위치를 아주 쉽게 확인할 수 있습니다.

| `<head>`, `</head>` 태그 |
| ------------------------ |
| ![admin_html_head]       |

### 3.3 CSS 추가

위에서 작성했던 코드를 아래 코드와 같이 `</head>` 바로 위에 붙여넣습니다. 더 위에 넣게 되면 중복되는 스타일이 발생할 수 있기 때문에 가장 아래에 넣습니다.

```html
<head>
  ...
  <!-- 여백 추가 적용 -->
  <style>
    .tt_article_useless_p_margin h1,
    .tt_article_useless_p_margin h2,
    .tt_article_useless_p_margin h3,
    .tt_article_useless_p_margin h4,
    .tt_article_useless_p_margin h5,
    .tt_article_useless_p_margin h6 {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      margin-top: 0 !important;
      margin-top: 2em !important;
    }

    .tt_article_useless_p_margin p {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      margin-top: 0 !important;
      margin-bottom: 1em !important;
    }
  </style>
  <!-- 여백 추가 완료 -->
</head>
```

### 3-3. Html 편집 적용

마지막으로 오른쪽 상단의 적용 버튼을 클릭합니다.

| `적용` 버튼         |
| ------------------- |
| ![admin_html_apply] |

<!-- ---------------------------- -->
<!-- ---------- define ---------- -->
<!-- ---------------------------- -->

<!-- undraw -->

[undraw_art_museum]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/undraw/undraw_art_museum.png?raw=true
[undraw_code_inspection]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/undraw/undraw_code_inspection.png?raw=true
[undraw_modern_design]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/undraw/undraw_modern_design.png?raw=true
[undraw_static_website]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/undraw/undraw_static_website.png?raw=true

<!-- admin -->

[admin_html_apply]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/admin/admin_html_apply.png?raw=true
[admin_html_edit]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/admin/admin_html_edit.png?raw=true
[admin_html_head]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/admin/admin_html_head.png?raw=true
[admin_skin_edit]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/admin/admin_skin_edit.png?raw=true

<!-- images -->

[highlight_common_languages]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/images/highlight_common_languages.png?raw=true
[white_space]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/images/white_space.png?raw=true
[the_clean_architecture]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/images/the_clean_architecture.jpeg?raw=true
