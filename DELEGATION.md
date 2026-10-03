# Delegation record

## Shared objective

Deliver a functioning, reversible browser prototype that helps a small service business identify which unpaid invoice needs attention and prepare a human-reviewed follow-up draft, without sending messages, using accounts, processing payments, or touching personal data.

## Roles and why they were needed

- **Product strategist — PRODUCT STRATEGIST:** chose the narrowest testable wedge, defined the target customer/problem, MVP, out-of-scope boundaries, assumptions, alternatives, and acceptance criteria. This role prevented the build from expanding into accounting software or an automated collections system.
- **Market researcher — RESEARCHER:** gathered source-backed evidence and separated observed facts from interpretation. This role tested whether the problem was sufficiently grounded to prototype and flagged that demand and willingness to pay remain unvalidated.
- **Software builder — BUILDER:** implemented the static web application and documentation. This role translated the strategy into usable controls, local persistence, import/export, draft generation, and safety boundaries.
- **UX/UI reviewer — UX/UI REVIEWER:** was assigned to challenge the information hierarchy, empty/demo states, accessibility, mobile behavior, and wording. The first dispatch could not inspect the private workspace and was not treated as evidence; the role is re-run against the deployed app for the independent review record.
- **Independent QA reviewer — QUALITY REVIEWER:** checks the final app separately from builder claims, including clean-session behavior, state transitions, XSS-safe rendering, persistence/import handling, unexpected network routes, and obvious runtime errors.

## Handoffs

1. Strategist and researcher worked in parallel; their outputs were consolidated into `PLAN.md` and `RESEARCH.md`.
2. Builder received the target/problem, evidence boundary, MVP, exclusions, and acceptance criteria. The first build attempt timed out with no accepted artifact; the task was narrowed and re-dispatched.
3. The recovered build was independently read back and re-created in the lead workspace so deployment and verification have accessible source.
4. QA receives the deployed URL and inspects the final result without relying on the builder's checklist.
5. Any QA failure is corrected, pushed to GitHub, redeployed, and re-tested.

## Failures and recovery

- Prior money-opportunity research was not available as a durable file. I did not invent it; I used current, directly retrieved Federal Reserve evidence and labeled the opportunity problem-indicated rather than validated.
- The first builder dispatch timed out. I re-dispatched a smaller implementation task and received the source artifact.
- The workspace did not have Node.js or Python available for a local server. Static source verification and the Vercel deployment provide the executable path; production browser testing is the required runtime check.
- The first GitHub repository creation call found an existing empty repository. I reused it and pushed a real commit rather than creating a duplicate.
