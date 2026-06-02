# Infizium

## Mission
Prepare students for life, not just exams.

## What It Is
Infizium is a WhatsApp-first school operating system and student life platform for schools in Telangana, India.

## Primary Users
- Students
- Parents
- Teachers
- School Administrators

## Principles
- WhatsApp-first parent communication — meet parents where they already are
- Parent-controlled permissions — parents approve actions, not the school on their behalf
- AI-assisted learning — Bedrock-powered tutor, introduced later
- School-first workflows — built around how Telangana schools actually operate
- Low AWS operating cost — serverless wherever possible, no idle compute

## MVP Scope
- Student, parent, teacher, and school admin profiles
- Attendance tracking
- Homework assignments
- School announcements
- WhatsApp notifications via API
- Forms and parent approval flows

## Out of Scope (Do Not Build Yet)
Wallet, loans, marketplace, carpool, fitness tracker, advanced analytics, or any module not listed in the MVP.

## Technology Stack
- **Frontend**: Next.js on AWS Amplify
- **API**: API Gateway + Lambda (Node.js)
- **Database**: Aurora PostgreSQL Serverless v2
- **Auth**: Amazon Cognito
- **Storage**: S3
- **Notifications**: WhatsApp Business API
- **AI (later)**: Amazon Bedrock

## Key Docs
- [Vision](docs/vision.md)
- [Personas](docs/personas.md)
- [Modules](docs/modules.md)
- [Roadmap](docs/roadmap.md)
- [Architecture](docs/architecture.md)
