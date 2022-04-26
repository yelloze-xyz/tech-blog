# 티스토리에 Markdown CSS 적용기

티스토리에는 Markdown 에디터가 있기는 하지만 적용하고 있는 스킨에 따라서 여러 가지 마크업을 적절하지 못하게 표현하고 있습니다. 저는 `Poster`라는 스킨을 사용하고 있는데 코드와 코드 블록의 배경색이 없고 일반 단락처럼 나오고 있습니다. 전문 기술 블로그 플랫폼인 `Velog`는 코드와 코드 블록을 아름답게 꾸며주고 있습니다.

아래 이미지는 Tistory `Poster` 스킨과 `Velog`의 Markdown 표현 차이입니다. 몇 가지 쉬운 절차를 진행하면 티스토리 블로그도 `Velog`처럼 아름답게 꾸며줄 수 있습니다.

| Tistory            | Velog             |
| ------------------ | ----------------- |
| ![markdown_before] | ![markdown_velog] |

## 0. Markdown 이란?

Markdown은 일반 텍스트 기반의 경량 마크업 언어입니다. 일반 텍스트로 서식이 있는 문서를 작성하는 데 사용되며, 일반 마크업 언어에 비해 문법이 쉽고 간단한 것이 특징입니다. 즉, 숙련만 되어있다면 마우스를 사용하지 않고 키보드만으로 여러 가지 구문을 표현할 수 있습니다. 매우 많은 사이트에서 사용하고 있으면 우리가 너무 잘 알고 있는 Github도 문서를 표현할 때 사용하고 있습니다.

프로젝트 루트 폴더에 `README.MD` 파일을 작성하고 Github 레퍼지토리에 업로드하면 소개 페이지로 아름답게 문서가 나오는데 이 `README.MD` 파일이 Markdown 형식의 문서입니다. Github과 같은 Markdown 문서를 지원하는 웹사이트들은 문서를 파싱해서 HTML, CSS로 우리에게 표현해주고 있습니다.

![undraw_static_website]

## 1. Markdown CSS 작성

Markdown 형식을 표현하는 CSS가 많은데 우리는 가장 유명한 Git 호스팅 사이트인 Github의 Markdown CSS를 적용해보도록 하겠습니다.

#### 1.1. Github Markdown CSS

Github의 Markdown을 잘 표현한 CSS는 `sindresorhus`의 `github-markdown-css`입니다. 가장 유명하고 CDN도 제공해서 가장 간단하게 적용이 가능합니다.

> Github 사이트
> https://github.com/sindresorhus/github-markdown-css

> CDN 사이트
> https://cdnjs.com/libraries/github-markdown-css

#### 1.2. 스타일 선택

CDN 사이트에 들어가서 원하는 테마를 선택해주세요. 파일명 끝에 `light` 혹은 `dark`는 밝은 혹은 어두운 테마이고, `min`이 있는 건 공백을 제거한 비교적 가벼운 용량으로 제공되는 CSS입니다. 제 블로그는 밝은 테마이고 로딩 속도를 위해 가벼운 `/github-markdown-light.min.css`를 선택했습니다. 원하시는 스타일의 CSS를 Tag를 복사합니다.

```html
<!-- github-markdown-light -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-light.min.css"
  integrity="sha512-zb2pp+R+czM7GAemdSUQt6jFmr3qCo6ikvBgVU6F5GvwEDR0C2sefFiPEJ9QUpmAKdD5EqDUdNRtbOYnbF/eyQ=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>
```

## 2. 티스토리 블로그에 적용

앞에서 작성한 코드를 이제 티스토리 블로그에 삽입해야 합니다. 티스토리 블로그는 html 편집을 할 수 있는데 그 기능을 통해서 삽입을 진행하겠습니다.

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

#### 2.3 CSS 추가

위에서 작성했던 코드를 아래 코드와 같이 `</head>` 바로 위에 붙여넣습니다. 더 위에 넣게 되면 중복되는 스타일이 발생할 수 있기 때문에 가장 아래에 넣습니다.

```html
<head>
  ...
  <!-- markdown-css 적용 -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-light.min.css"
    integrity="sha512-zb2pp+R+czM7GAemdSUQt6jFmr3qCo6ikvBgVU6F5GvwEDR0C2sefFiPEJ9QUpmAKdD5EqDUdNRtbOYnbF/eyQ=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <!-- markdown-css 적용 완료 -->
</head>
```

#### 2-3. CSS 적용

추가한 CSS를 실제로 적용하고 싶은 적절한 부분에 적용해야 합니다.

티스토리 블로그는 `[##_KEY_##]`와 같은 특수한 문자열로 실제 우리가 작성한 날짜, 제목, 내용들을 치환하고 있습니다. 그중에서 실제 게시글이 치환되는 부분은 `[##_article_rep_desc_##]`인데, 반드시 이 부분에만 CSS를 적용해 주어야 합니다. 만약 다른 부분에도 적용하게 되면 티스토리에서 제공하는 스킨의 CSS와 우리가 적용한 CSS 사이에 충돌이 일어나 원치 않는 부분까지 적용될 수 있습니다.

먼저 html 소스에서 `[##_article_rep_desc_##]`를 찾아주세요. 찾은 모든 요소에 적용해 주어야 합니다. 스킨마다 요소의 개수가 다른데 `Poster` 스킨은 3개, `Odyssey` 스킨은 2개의 요소가 있었습니다.

아래와 같이 되어있는 요소를

```html
...
<div class="...">
  <!-- markdown-css 적용 전 -->
  [##_article_rep_desc_##]
  <!-- markdown-css 적용 완료 -->
</div>
...
```

모두 아래와 같이 수정해주세요.

```html
...
<div class="...">
  <!-- markdown-css 적용 후 -->
  <div class="markdown-body">[##_article_rep_desc_##]</div>
  <!-- markdown-css 적용 완료 -->
</div>
...
```

#### 2-4. Html 편집 적용

마지막으로 오른쪽 상단의 적용 버튼을 클릭합니다.

| `적용` 버튼         |
| ------------------- |
| ![admin_html_apply] |

## 3. 결과 확인

모두 적용했다면 우리가 작성한 Markdown 게시글에 가서 화면을 새로 고쳐 보면 아래와 같은 모습으로 아름답게 적용이 된 걸 확인할 수 있습니다. `(적용하신 스킨, 스타일에 따라서 적용 후 모습이 다를 수 있습니다.)`

| `markdown css` 적용 전 | `markdown css` 적용 후 |
| ---------------------- | ---------------------- |
| ![markdown_before]     | ![markdown_after1]     |

<!-- ---------------------------- -->
<!-- ---------- define ---------- -->
<!-- ---------------------------- -->

<!-- undraw -->

[undraw_art_museum]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/undraw/undraw_art_museum.png?raw=true
[undraw_code_inspection]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/undraw/undraw_code_inspection.png?raw=true
[undraw_static_website]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/undraw/undraw_static_website.png?raw=true

<!-- markdown -->

[markdown_after1]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/markdown/markdown_after1.png?raw=true
[markdown_after2]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/markdown/markdown_after2.png?raw=true
[markdown_before]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/markdown/markdown_before.png?raw=true
[markdown_velog]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/markdown/markdown_velog.png?raw=true

<!-- admin -->

[admin_html_apply]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/admin/admin_html_apply.png?raw=true
[admin_html_edit]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/admin/admin_html_edit.png?raw=true
[admin_html_head]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/admin/admin_html_head.png?raw=true
[admin_skin_edit]: https://github.com/yelloze-xyz/tech-blog/blob/master/resources/admin/admin_skin_edit.png?raw=true
