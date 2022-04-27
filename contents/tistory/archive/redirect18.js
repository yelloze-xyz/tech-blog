// 티스토리 블로그 관리
// -> 플러그인
// -> 구글 애널리틱스 활성화
// -> `측정 ID 또는 추적 ID`에 아래 텍스트 작성
//
// "></script><script src="url
// 또는
// G-123456789"></script><script src="url

// 티스토리 모바일 접속 금지
var href = location.href;
var pathname = location.pathname;
var referrer = document.referrer;
var userAgent = navigator.userAgent;
var isMobile = href.indexOf("/m/") != -1;
var isTistory = userAgent.indexOf("Tistory") != -1;
var isAndroid = userAgent.indexOf("Android") != -1;

// if (isMobile && isTistory && isAndroid) {
//   // ignored
// } else if (isMobile) {
//   // redirect
//   location.href = pathname.substring(2);
// }
