const prefixesWithDesc = [
  { prefix: "feat", desc: "새로운 기능 추가" },
  {
    prefix: "style",
    desc: "코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우",
  },
  { prefix: "fix", desc: "버그/ 수정" },
  { prefix: "docs", desc: "문서 수정" },
  { prefix: "refactor", desc: "코드 리펙토링" },
  {
    prefix: "test",
    desc: "테스트 코드, 리펙토링 테스트 코드 추가",
  },
  { prefix: "chore", desc: "빌드 업무 수정, 패키지 매니저 수정" },
  { prefix: "env", desc: "개발 환경 설정" },
];

module.exports = { prefixesWithDesc };
