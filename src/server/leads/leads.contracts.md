# Leads API contracts (Stage 1)

## `POST /api/leads`

Public. Rate-limited (5 / min / IP).

```json
{
  "name": "Анна",
  "phone": "+375291112233",
  "telegram": "@anna",
  "quizAnswers": {
    "siteType": "landing",
    "hasSite": "no",
    "goal": "leads",
    "timeline": "2-4w"
  },
  "source": "site"
}
```

**201**

```json
{ "id": "uuid", "createdAt": "ISO" }
```

## `POST /api/admin/login`

```json
{ "username": "admin", "password": "..." }
```

Sets httpOnly cookie `sitescan_admin_session`.

## `POST /api/admin/logout`

Clears session cookie.

## `GET /api/admin/leads`

Auth required.

```json
{ "items": [ /* LeadAdminDto */ ] }
```

## `PATCH /api/admin/leads/:id`

Auth required.

```json
{ "status": "new" | "in_progress" | "closed" }
```

Env: `ADMIN_USER`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`.
