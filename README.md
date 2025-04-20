# Naver SearchAd MCP for Claude Desktop

이 저장소는 **Claude Desktop 전용 MCP 서버**로, 네이버 검색광고 API를 활용해 캠페인, 광고그룹, 키워드 등을 조회하거나 생성/삭제할 수 있도록 도와줍니다.  
`manifest.json` 기반으로 Claude가 인식 가능한 명령어들을 제공합니다.

---

🧠 Claude Desktop 자동 등록 방법
Claude Desktop 설정 파일에 MCP 서버를 자동으로 등록하려면 아래와 같이 구성하세요:


{
  "mcpServers": {
    "naver-searchad-mcp": {
      "command": "npx",
      "args": ["-y", "github:your-github-id/naver-searchad-mcp"],
      "env": {
        "NAVER_API_KEY": "발급받은_네이버_API_키",
        "NAVER_CUSTOMER_ID": "광고주_ID"
      }
    }
  }
}