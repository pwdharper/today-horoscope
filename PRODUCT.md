# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js App Router, TypeScript, Tailwind CSS v4. Deploy target: Netlify. Confirmed in the implementation brief.

## Users

한국어를 읽는 사람이 아침에, 또는 하루를 시작하기 전에, 자기 이름과 생년월일로 오늘 하루의 짧은 운세를 읽는다. 점성술 도구가 아니라 일일 리추얼이다.

## Product Purpose

이름과 생년월일을 받아 오늘의 운세를 편지 한 편으로 돌려준다. 성공은 입력 후 바로, 자기 이름이 불리는 본문을 읽고 한 줄 조언을 가져가는 것이다.

## Positioning

별자리 휠이나 12궁 분류가 아니라, 이름을 부르는 오늘의 편지. 생년월일은 개인화에만 쓰이고 결과 화면에 궁을 표시하지 않는다.

## Operating Context

브라우저에서 `/`에 이름과 생년월일을 넣고 제출하면 `/fortune`에서 편지를 읽는다. 운세 문장은 나중에 Claude API로 생성할 예정이며, 현재는 mock 라우트가 같은 JSON 모양을 반환한다.

## Capabilities and Constraints

- 입력: 이름(2–20자), 생년월일(미래 날짜 불가)
- 결과: 인사, 오늘 날짜, 편지 본문, 한 줄 조언
- 공유, 로그인, 별자리 표시는 없음
- Claude API 키와 실제 모델 호출은 아직 없음 (inferred from brief: UI-only phase)

## Brand Commitments

- 언어: 한국어
- 결과 구조: 개인화된 편지. 별자리 강조 없음 (user confirmed)
- 시각 제약 (user-pinned in plan): 밤하늘·금성·보라 글로우·크림+세리프 기본값 금지. 차가운 새벽 빛.

## Evidence on Hand

실사용 운세 문장 없음. mock 본문은 합성(synthetic)이며 화면에 샘플 배지를 달지 않는다. 고객 증언, 가격, 벤치마크는 없음. 만들지 말 것.

## Product Principles

- 첫 화면이 곧 폼이다. 마케팅 랜딩을 앞에 두지 않는다.
- 결과는 편지이지 리포트가 아니다.
- API 교체 지점은 한 곳(`POST /api/fortune`)만 둔다.
- 로딩은 편지 모양 스켈레톤으로 보여 준다.
- 화면에 없는 기능을 암시하지 않는다.
