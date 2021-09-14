# 5.18

- 스키마가 변경될 때 마다 마이그레이션을 해야한다.
- Prisma Schema, GraphQL Schema, Query, Mutation은 항상 같은 방식으로 작동한다.
- findUnique는 유니크로 지정된 필드만 검색이 가능하다.
- token은 비밀정보를 보관하는 것이 아니다. 토큰은 정보를 넣고 다른 사용자가 정보를 변경하지 못하게 함이다. 그 토큰을 우리가 싸인했는지 확인하는 것이 중요하다.
- DB 업데이트 시 undefined를 보내면 Prisma는 DB에 반영하지 않는다.
- 로그인 시 유저에게 토큰을 발행 > Mutation을 하려할때 토큰을 검증

# 5.19

- 세번째 인자인 Context에 들어가는 모든 것은 모든 resolver에서 접근이 가능하다.

# 9.14

- ngrok 파일이 있는 곳에서 터미널로 ./ngrok http 4000 실행.
