# 티스토리에 Highlight.JS 적용기

티스토리 블로그는 코드 블록이 아름답지 않습니다.

개발 블로그 플랫폼인 `Velog`는 Markdown 형식이 기본 에디터이며, 코드 블록의 소스들이 코드 편집기처럼 지정어, 함수, 변수 등 색이 변경되어서 가독성이 아주 아름답습니다.

하지만, 티스토리 블로그도 몇 개의 과정만 거치면 비슷하게 코드 블록을 아름답게 표현할 수 있습니다.

| Tistory            | Velog             |
| ------------------ | ----------------- |
| ![markdown_after1] | ![markdown_velog] |

## 0. Highlight.JS 란?

`Highlight.JS`는 오픈 소스로 언어, 스타일을 원하는 데로 지정하여 코드 블록을 아름답게 표현할 수 있게 해주는 기능을 합니다. 코드 블록을 아름답게 꾸며주는 오픈 소스 중 가장 유명해서 가이드가 훌륭하고 사용하기도 쉽고 레퍼런스도 매우 많습니다.

우리는 이 훌륭한 `Highlight.JS`를 티스토리 블로그에 적용해서 코드 블록을 `Velog`와 같이 아름답게 표시할 예정입니다.

`Highlight.JS`의 링크 정보는 아래와 같습니다.

> 공식 사이트
> https://highlightjs.org/

> Github 사이트
> https://github.com/highlightjs/highlight.js

> CDN 사이트
> https://cdnjs.com/libraries/highlight.js

![undraw_code_inspection]

## 1. Highlight.JS 코드 작성

위에 적혀있는 CDN 사이트에 들어갑니다.

많은 목록이 있는데 2가지 카테고리로 구분이 됩니다. `languages`와 `styles`입니다. `languages`는 java, kotlin, html과 같은 언어입니다. `styles`는 Github, IntelliJ와 같은 여러 가지 사이트 혹은 코드 작성 프로그램의 코드 표현 방식입니다.

#### 1.1. 언어 코드

`languages`는 일반적으로 사용되는 언어들을 통합으로 적용하거나, 적용하고 싶은 언어들만 지정해서 적용할 수 있습니다.

통합으로 사용하겠다고 한다면 CDN 사이트 목록 중 가장 위에 있는 `/highlight.min.js`를 사용하면 됩니다. 일반적으로 제공되는 언어가 궁금하다면 공식 사이트에서 확인이 가능합니다.

| `/highlight.min.js` 기본 제공 언어 목록                  |
| -------------------------------------------------------- |
| <img src="../resource/highlight_common_languages.png" /> |

만약 자신이 지원하고 싶은 언어가 기본 제공 언어에 해당하지 않는다면 `/highlight.min.js`를 붙여넣은 곳 아래에 `/languages/*.min.js` 코드를 추가로 붙여넣으면 됩니다.

```html
<!-- 약 30개의 기본 언어 -->
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"
  integrity="sha512-yUUc0qWm2rhM7X0EFe82LNnv2moqArj5nro/w1bi05A09hRVeIZbN6jlMoyu0+4I/Bu4Ck/85JQIU82T82M28w=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
></script>

<!-- Kotlin 언어 추가-->
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/languages/kotlin.min.js"
  integrity="sha512-Ssug1es/QWU8LrNoWaHeApBYhDeBV1k4AapzKN2Ip9Nydp8mZnQYUDyqqtuI8c8CxwuzXfHUY1hxbP3RTJr4Gg=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
></script>
```

#### 1.2. 스타일 코드

`styles`은 한가지 스타일로 적용이 가능합니다. `/styles/*.min.css`와 같이 표현되어 있으며 매우 많은 스타일을 제공합니다. 저는 일반적으로 가장 많이 사용하는 Github 스타일인 `/styles/github.min.css`으로 선택했습니다.

```html
<!-- github-light 스타일 -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/github.min.css"
  integrity="sha512-0aPQyyeZrWj9sCA46UlmWgKOP0mUipLQ6OZXu8l4IcAmD2u31EPEy9VcIMvl7SoAaKe8bLXZhYoMaE/in+gcgA=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>
```

#### 1.3. 스크립트 실행

`Highlight.JS`는 스크립트로 html 태그에 스타일을 적용해주고 있습니다. 아래 코드를 추가하면 스크립트가 실행되면서 모든 코드 블록에 선택한 스타일을 적용해 줍니다.

```html
<script>
  hljs.highlightAll();
</script>
```

#### 1.4. 최종 코드

최종적으로 추가해야 하는 코드는 아래와 같습니다. 저는 추가 언어 없이 기본 제공되는 언어만 추가했습니다.

```html
<!-- highlight.js 적용 -->

<!-- github-light 스타일 -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/github.min.css"
  integrity="sha512-0aPQyyeZrWj9sCA46UlmWgKOP0mUipLQ6OZXu8l4IcAmD2u31EPEy9VcIMvl7SoAaKe8bLXZhYoMaE/in+gcgA=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>

<!-- 약 30개의 기본 언어 -->
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"
  integrity="sha512-yUUc0qWm2rhM7X0EFe82LNnv2moqArj5nro/w1bi05A09hRVeIZbN6jlMoyu0+4I/Bu4Ck/85JQIU82T82M28w=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
></script>

<!-- highlight.js 스크립트 실행 -->
<script>
  hljs.highlightAll();
</script>

<!-- highlight.js 적용 완료 -->
```

## 2. 티스토리 블로그에 적용

앞에서 작성한 코드를 이제 티스토리 블로그에 삽입해야 합니다. 티스토리 블로그는 html편집을 할 수 있는데 그 기능을 통해서 삽입을 진행 하겠습니다.

#### 2.1 Html 편집 화면 진입

먼저 스킨 편집 화면으로 이동해주세요. 스킨 편집 화면은 관리자 화면 왼쪽에 메뉴들이 나열되어있는데 사진과 같이 외부 링크로 제공되고 있습니다. 스킨 `편집 버튼`을 클릭합니다.

| `스킨 편집` 버튼   |
| ------------------ |
| ![admin_skin_edit] |

그 후 스킨 편집 화면에서 오른쪽에 있는 `Html편집` 버튼을 클릭합니다.

| `Html편집` 버튼    |
| ------------------ |
| ![admin_html_edit] |

#### 2.2 Html 편집

우리의 코드는 html 소스 중에 `<head>`태그 안에 삽입이 되어야 정상적으로 작동하게 됩니다.

아래 사진과 같이 `<head>` 부분과 `</head>` 부분을 찾으세요. 이 부분은 사용하고 계신 스킨마다 다른데요. 스킨마다 적용된 CSS의 내용이 달라서 그렇습니다. `<head>`는 보통 맨 위에서 3번째 줄에 있습니다. 그다음 커서를 태그 안에 위치해 보면 블록의 색이 변경되면서 `</head>`의 위치를 아주 쉽게 확인할 수 있습니다.

| `<head>`, `</head>` 태그 |
| ------------------------ |
| ![admin_html_head]       |

작성했던 코드를 아래 코드와 같이 `</head>` 바로 위에 붙여넣습니다. 더 위에 넣게 되면 중복되는 스타일이 발생할 수 있기 때문에 가장 아래에 넣습니다.

```html
<head>
  ...
  <!-- 
    markdown-css ... 
  -->
  <!-- highlight.js 적용 -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/github.min.css"
    integrity="sha512-0aPQyyeZrWj9sCA46UlmWgKOP0mUipLQ6OZXu8l4IcAmD2u31EPEy9VcIMvl7SoAaKe8bLXZhYoMaE/in+gcgA=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"
    integrity="sha512-yUUc0qWm2rhM7X0EFe82LNnv2moqArj5nro/w1bi05A09hRVeIZbN6jlMoyu0+4I/Bu4Ck/85JQIU82T82M28w=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  ></script>
  <script>
    hljs.highlightAll();
  </script>
  <!-- highlight.js 적용 완료 -->
</head>
```

마지막으로 오른쪽 상단의 적용 버튼을 클릭합니다.

| `적용` 버튼         |
| ------------------- |
| ![admin_html_apply] |

## 3. 결과 확인

모두 적용했다면 우리가 작성한 Markdown 게시글에 가서 화면을 새로 고쳐 보면 아래와 같은 모습으로 아름답게 적용이 된 걸 확인할 수 있습니다. `(적용하신 스킨, 스타일에 따라서 적용 후 모습이 다를 수 있습니다.)`

| `highlight.js` 적용 전 | `highlight.js` 적용 후 |
| ---------------------- | ---------------------- |
| ![markdown_after1]     | ![markdown_after2]     |

<!-- ---------------------------- -->
<!-- ---------- define ---------- -->
<!-- ---------------------------- -->

<!-- unsplash -->

[undraw_code_inspection]: https://github.com/yelloze-xyz/tech-blog/blob/main//assets/images/undraw_code_inspection.png?raw=true

<!-- markdown -->

[markdown_after1]: https://github.com/yelloze-xyz/tech-blog/blob/main//assets/images/markdown_after1.png?raw=true
[markdown_after2]: https://github.com/yelloze-xyz/tech-blog/blob/main//assets/images/markdown_after2.png?raw=true
[markdown_before]: https://github.com/yelloze-xyz/tech-blog/blob/main//assets/images/markdown_before.png?raw=true
[markdown_velog]: https://github.com/yelloze-xyz/tech-blog/blob/main//assets/images/markdown_velog.png?raw=true

<!-- admin -->

[admin_html_apply]: https://github.com/yelloze-xyz/tech-blog/blob/main//assets/images/admin_html_apply.png?raw=true
[admin_html_edit]: https://github.com/yelloze-xyz/tech-blog/blob/main//assets/images/admin_html_edit.png?raw=true
[admin_html_head]: https://github.com/yelloze-xyz/tech-blog/blob/main//assets/images/admin_html_head.png?raw=true
[admin_skin_edit]: https://github.com/yelloze-xyz/tech-blog/blob/main//assets/images/admin_skin_edit.png?raw=true

<!-- etc -->
