# 1. Introduction

## 1.1 Purpose

This document defines the complete REST API specification for the Freelancer Client & Invoice Manager application.

Its primary purpose is to establish a clear, consistent, and implementation-ready contract between the frontend, backend, and any future API consumers. It specifies how clients interact with the system through HTTP endpoints, including request formats, response structures, authentication requirements, validation expectations, and error handling.

This document is intended to eliminate ambiguity during development and ensure that all teams implement and consume the APIs consistently.

## 1.2 Scope

This specification covers all public and authenticated REST APIs required by the application, including:

- Business Profile Management
- Client Management
- Invoice Management
- Payment Management
- Timeline Management
- Relationship Notes Management
- Dashboard & Business Pulse
- Application Settings

The specification defines API contracts only. It does not describe internal implementation details, database schemas, UI behavior, or business logic already documented elsewhere.

## 1.3 Intended Audience

This document is intended for:

- Backend Developers
- Frontend Developers
- QA Engineers
- Technical Architects
- Future Maintainers
- API Integrators

## 1.4 Relationship to Other Project Documents

This API Specification builds upon the previously approved project documentation.

It should be read together with:

| Document                     | Purpose                                           |
| ---------------------------- | ------------------------------------------------- |
| Product Discovery            | Product vision and business goals                 |
| PRD                          | Functional requirements                           |
| Domain Model                 | Core business entities and relationships          |
| Business Rules Specification | Business constraints and validation rules         |
| Functional Specification     | Feature behaviour and workflows                   |
| UX Specification             | User interactions and experience                  |
| Wireframes                   | Screen layouts and navigation                     |
| Information Architecture     | Frontend structure and routing                    |
| Quality Attributes           | Non-functional requirements                       |
| System Architecture          | Technical architecture and component interactions |
| Database Design              | Data model and persistence strategy               |

Where business rules, workflows, or data definitions already exist in those documents, this specification references them rather than duplicating them.

## 1.5 Document Conventions

Throughout this specification:

- Each API endpoint is documented using a consistent structure.
- HTTP methods follow RESTful conventions.
- JSON is used for all request and response bodies unless stated otherwise.
- All timestamps use the ISO 8601 format in UTC.
- Validation rules and business constraints reference the approved Business Rules Specification where applicable.
- Error responses follow a standardized error model defined in this document.

The objective is to provide a concise, implementation-ready API contract while avoiding duplication across the project documentation.

# 2. API Design Principles

This section defines the global design standards and conventions followed by every API in the Freelancer Client & Invoice Manager application.

These principles ensure consistency, predictability, maintainability, and ease of integration across the entire system. Unless explicitly stated otherwise, every API endpoint in this specification adheres to the standards defined in this section.

## 2.1 Architectural Style

The application exposes RESTful APIs over HTTPS.

API design follows standard REST principles:

- Resources are represented as nouns.
- HTTP methods define the requested operation.
- APIs are stateless.
- JSON is used for all request and response bodies.
- Each request contains all information required for processing.
- Responses are self-contained and predictable.

Example:

```
GET    /api/v1/clients
POST   /api/v1/clients
GET    /api/v1/clients/{clientId}
PATCH  /api/v1/clients/{clientId}
DELETE /api/v1/clients/{clientId}
```

## 2.2 Base URL

All endpoints are exposed under a common API version.

```
/api/v1
```

Example:

```
GET /api/v1/clients
```

## 2.3 Resource Naming Convention

Resource names follow these conventions:

- Use plural nouns for collections.
- Use lowercase letters.
- Separate multiple words using hyphens (`-`) where necessary.
- Never use verbs in endpoint URLs.
- Resource identifiers are represented using path parameters.

Good examples:

```
/clients
/invoices
/payments
/relationship-notes
/business-profile
```

Avoid:

```
/getClients
/createInvoice
/deletePayment
```

## 2.4 HTTP Methods

The following HTTP methods are used consistently throughout the API.

| Method | Purpose                                              |
| ------ | ---------------------------------------------------- |
| GET    | Retrieve one or more resources                       |
| POST   | Create a new resource                                |
| PATCH  | Partially update an existing resource                |
| PUT    | Replace an entire resource (used only when required) |
| DELETE | Remove a resource                                    |

## 2.5 Content Type

All requests and responses use JSON unless explicitly specified otherwise.

Request Header

```
Content-Type: application/json
```

Response Header

```
Content-Type: application/json
```

## 2.6 Stateless Communication

The API is stateless.

Each request must contain all information necessary for authentication, authorization, validation, and processing.

No client session state is stored on the server between requests.

## 2.7 Consistent Resource Structure

Every business entity follows a consistent REST pattern.

Example:

| Operation | Endpoint                   |
| --------- | -------------------------- |
| List      | GET /clients               |
| Get       | GET /clients/{clientId}    |
| Create    | POST /clients              |
| Update    | PATCH /clients/{clientId}  |
| Delete    | DELETE /clients/{clientId} |

This convention applies to all primary resources unless explicitly documented otherwise.

## 2.8 HTTP Status Codes

The API uses standard HTTP status codes.

| Code                      | Meaning                                    |
| ------------------------- | ------------------------------------------ |
| 200 OK                    | Request completed successfully             |
| 201 Created               | Resource created successfully              |
| 204 No Content            | Operation completed with no response body  |
| 400 Bad Request           | Invalid request                            |
| 401 Unauthorized          | Authentication required                    |
| 403 Forbidden             | User is authenticated but lacks permission |
| 404 Not Found             | Requested resource does not exist          |
| 409 Conflict              | Business rule conflict                     |
| 422 Unprocessable Entity  | Validation failed                          |
| 500 Internal Server Error | Unexpected server error                    |

## 2.9 Date and Time Format

All timestamps use the ISO 8601 standard in UTC.

Example:

```
2026-07-28T14:35:21Z
```

## 2.10 Monetary Values

All monetary values are represented as decimal numbers.

Example:

```json
{
  "amount": 12500.5,
  "currency": "INR"
}
```

Currency values must preserve precision and must never be rounded implicitly by the API.

## 2.11 Unique Resource Identifiers

Every primary resource has a unique identifier.

Examples include:

- Client ID
- Invoice ID
- Payment ID
- Timeline Event ID
- Relationship Note ID

Identifiers are immutable after creation.

## 2.12 API Consistency Principles

All APIs should follow these principles:

- Consistent endpoint structure
- Predictable request formats
- Standardized response models
- Uniform error handling
- Consistent naming conventions
- Business-rule validation before data persistence
- No duplicated functionality across endpoints

These principles ensure that every API behaves consistently regardless of the business module.

# 3. Common Standards

This section defines the common request and response standards used throughout the API. These standards ensure consistency across all endpoints and eliminate the need to redefine the same structures multiple times.

## 3.1 Request Headers

Unless otherwise specified, every API request must include the following headers.

| Header        | Required | Description                                         |
| ------------- | -------- | --------------------------------------------------- |
| Authorization | Yes*     | Bearer access token for protected endpoints         |
| Content-Type  | Yes      | Must be `application/json` for requests with a body |
| Accept        | Yes      | Must be `application/json`                          |

> *Public endpoints do not require an Authorization header.

Example

```http
Authorization: Bearer <access_token>
Content-Type: application/json
Accept: application/json
```

## 3.2 Standard Success Response

Successful operations return a consistent response structure.

```json
{
  "success": true,
  "message": "Client created successfully.",
  "data": {}
}
```

| Field   | Type                  | Description                             |
| ------- | --------------------- | --------------------------------------- |
| success | Boolean               | Indicates whether the request succeeded |
| message | String                | Human-readable response message         |
| data    | Object / Array / Null | Requested or newly created resource     |

## 3.3 Standard Error Response

Failed requests return a consistent error structure.

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    {
      "field": "email",
      "code": "INVALID_EMAIL",
      "message": "Please enter a valid email address."
    }
  ]
}
```

| Field   | Type    | Description                            |
| ------- | ------- | -------------------------------------- |
| success | Boolean | Always `false`                         |
| message | String  | Summary of the error                   |
| errors  | Array   | Detailed validation or business errors |

## 3.4 Validation Error Format

When multiple validation errors occur, the API returns all detected errors in a single response.

Example

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    {
      "field": "name",
      "code": "REQUIRED",
      "message": "Client name is required."
    },
    {
      "field": "email",
      "code": "INVALID_EMAIL",
      "message": "Please enter a valid email address."
    }
  ]
}
```

## 3.5 Pagination Standard

Endpoints returning collections should support pagination.

Example Request

```http
GET /api/v1/clients?page=1&limit=20
```

Example Response

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalItems": 245,
    "totalPages": 13,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

| Field       | Description                      |
| ----------- | -------------------------------- |
| page        | Current page number              |
| limit       | Number of records per page       |
| totalItems  | Total matching records           |
| totalPages  | Total available pages            |
| hasNext     | Indicates another page exists    |
| hasPrevious | Indicates a previous page exists |

## 3.6 Sorting Standard

Endpoints that return collections may support sorting.

Example

```http
GET /api/v1/invoices?sortBy=issueDate&order=desc
```

| Parameter | Description            |
| --------- | ---------------------- |
| sortBy    | Field used for sorting |
| order     | `asc` or `desc`        |

## 3.7 Filtering Standard

Collection endpoints may support filtering.

Example

```http
GET /api/v1/invoices?status=paid
GET /api/v1/clients?country=India
GET /api/v1/payments?method=upi
```

Supported filters for each resource are documented with the respective endpoint.

## 3.8 Search Standard

Resources that support searching use a common query parameter.

Example

```http
GET /api/v1/clients?search=rahul
```

The search behavior for each resource is documented in its corresponding API section.

## 3.9 Field Selection

Unless explicitly documented, APIs always return the complete resource representation.

Partial field selection is not supported.

## 3.10 Request Validation

Every request is validated before business logic execution.

Validation includes:

- Required fields
- Data type validation
- Field length validation
- Format validation
- Enum validation
- Business rule validation
- Resource existence validation

Detailed validation rules are defined in the Business Rules Specification.

## 3.11 Null Value Handling

The API follows these principles for null values:

- Required fields must never be null.
- Optional fields may be null.
- Empty strings should not be used as substitutes for null unless explicitly allowed.
- Arrays should return an empty array instead of null where applicable.

## 3.12 Response Encoding

All request and response bodies use UTF-8 encoded JSON.

Special characters and Unicode text are fully supported.

## 3.13 Idempotency

GET, PUT, and DELETE requests are idempotent.

POST requests are generally non-idempotent unless explicitly documented otherwise.

## 3.14 Documentation Convention

Each endpoint documented in this specification follows a consistent structure:

1. Purpose
2. Endpoint
3. Authentication
4. Request Parameters
5. Request Body
6. Validation Rules
7. Business Rules
8. Success Response
9. Error Responses
10. Related Documents

This standardized format makes the specification easy to navigate and ensures consistency across all business modules.

# 4. Authentication & Authorization

This section defines how clients authenticate with the API and how access to protected resources is controlled.

## 4.1 Authentication Method

The API uses **JSON Web Token (JWT)** based authentication.

After successful authentication, the server issues an Access Token and a Refresh Token.

The Access Token must be included in the `Authorization` header for all protected API requests.

Example

```http
Authorization: Bearer <access_token>
```

## 4.2 Authentication Flow

The authentication process follows these steps:

1. User signs in using valid credentials.
2. Server validates the credentials.
3. Server generates an Access Token and Refresh Token.
4. Client securely stores both tokens.
5. Client sends the Access Token with every protected request.
6. When the Access Token expires, the Refresh Token is used to obtain a new Access Token.
7. The user must sign in again if both tokens are expired or invalid.

## 4.3 Protected Endpoints

Unless explicitly stated otherwise, all API endpoints require authentication.

Examples of protected resources include:

- Business Profile
- Clients
- Invoices
- Payments
- Timeline
- Relationship Notes
- Dashboard
- Settings

## 4.4 Public Endpoints

The following endpoints are accessible without authentication:

- Sign In
- Refresh Access Token
- Health Check (if implemented)

Additional public endpoints, if introduced in future versions, will be documented individually.

## 4.5 Access Token

The Access Token is used to authorize API requests.

Characteristics:

- Short-lived
- Digitally signed
- Contains authenticated user information
- Sent using the `Authorization` header
- Required for all protected endpoints

Clients should never modify the contents of the token.

## 4.6 Refresh Token

The Refresh Token is used to obtain a new Access Token without requiring the user to sign in again.

Characteristics:

- Longer validity than the Access Token
- Stored securely by the client
- Used only with the Refresh Token endpoint
- Never sent with normal API requests

## 4.7 Authorization

After successful authentication, every request is authorized before executing business logic.

Authorization verifies that:

- The Access Token is valid.
- The token has not expired.
- The authenticated user is permitted to access the requested resource.

If authorization fails, the request is rejected.

## 4.8 Authentication Errors

The API returns standard HTTP status codes for authentication and authorization failures.

| Status Code      | Description                                                                 |
| ---------------- | --------------------------------------------------------------------------- |
| 401 Unauthorized | Authentication is required or the Access Token is invalid or expired.       |
| 403 Forbidden    | The authenticated user is not permitted to perform the requested operation. |

Example Response

```json
{
  "success": false,
  "message": "Unauthorized access.",
  "errors": [
    {
      "code": "UNAUTHORIZED",
      "message": "A valid access token is required."
    }
  ]
}
```

## 4.9 Security Best Practices

Clients integrating with the API should follow these practices:

- Always use HTTPS.
- Store tokens securely.
- Never expose tokens in URLs.
- Never include tokens in application logs.
- Remove stored tokens after user sign-out.
- Automatically refresh expired Access Tokens using the Refresh Token.
- Reject requests made with expired or invalid tokens.

## 4.10 Related Documents

This section should be read alongside:

- System Architecture
- Quality Attributes
- Business Rules Specification

# 5. Business Module APIs

This section defines the REST API endpoints for each business module in the Freelancer Client & Invoice Manager application.

Endpoints are organized by business capability rather than by HTTP method, making the specification easier to navigate and maintain.

Each module contains all operations required to manage its corresponding business resource.

## 5.1 API Documentation Structure

To ensure consistency throughout this specification, every endpoint is documented using the same structure.

| Section           | Description                                    |
| ----------------- | ---------------------------------------------- |
| Purpose           | Describes the objective of the endpoint        |
| Endpoint          | HTTP method and URL                            |
| Authentication    | Authentication requirement                     |
| Path Parameters   | URL path parameters                            |
| Query Parameters  | Optional query parameters                      |
| Request Body      | JSON request payload                           |
| Validation Rules  | Input validation requirements                  |
| Business Rules    | Business constraints governing the operation   |
| Success Response  | Successful response example                    |
| Error Responses   | Possible error conditions                      |
| Related Documents | References to supporting project documentation |

Unless explicitly stated otherwise, every endpoint follows the standards defined in Sections 2, 3, and 4 of this document.

## 5.2 Business Modules Covered

The API is organized into the following business modules.

| Module             | Description                                      |
| ------------------ | ------------------------------------------------ |
| Business Profile   | Manage business information and preferences      |
| Clients            | Create and manage client records                 |
| Invoices           | Create, update, send, and manage invoices        |
| Payments           | Record and manage invoice payments               |
| Timeline           | Track chronological business activities          |
| Relationship Notes | Store client-specific notes and interactions     |
| Dashboard          | Provide business metrics and summary information |
| Settings           | Manage application configuration                 |

The following sections describe the endpoints for each module in detail.

## 5.3 Client API

### Purpose

The Client API manages the complete lifecycle of business clients.

It enables authenticated users to create, retrieve, update, archive, restore, and delete client records while preserving business history and maintaining consistency with the approved business rules.

Client records serve as the foundation for invoices, payments, relationship notes, reminders, and timeline events.

### Related Domain Concept

- Client

### Related Business Rules

- BR-CL-001 to BR-CL-010

### Related Screens

- SCR-002 — Client List
- SCR-003 — Create Client
- SCR-004 — Edit Client
- SCR-005 — Client Workspace

### Supported Operations

| Operation      | HTTP Method | Endpoint                             |
| -------------- | ----------- | ------------------------------------ |
| List Clients   | GET         | `/api/v1/clients`                    |
| Get Client     | GET         | `/api/v1/clients/{clientId}`         |
| Create Client  | POST        | `/api/v1/clients`                    |
| Update Client  | PATCH       | `/api/v1/clients/{clientId}`         |
| Archive Client | PATCH       | `/api/v1/clients/{clientId}/archive` |
| Restore Client | PATCH       | `/api/v1/clients/{clientId}/restore` |
| Delete Client  | DELETE      | `/api/v1/clients/{clientId}`         |

### 5.3.1 List Clients

#### Purpose

Retrieves a paginated list of clients belonging to the authenticated Business Profile.

Supports searching, filtering, sorting, and pagination to help users efficiently locate and manage client records.

#### Endpoint

```http
GET /api/v1/clients
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

None.

#### Query Parameters

| Parameter | Type    | Required | Description                                                  |
| --------- | ------- | -------- | ------------------------------------------------------------ |
| page      | Integer | No       | Page number. Default: 1                                      |
| limit     | Integer | No       | Number of records per page.                                  |
| search    | String  | No       | Search by client name, company name, email, or phone number. |
| status    | String  | No       | Filter by client status (`active`, `archived`).              |
| sortBy    | String  | No       | Field used for sorting.                                      |
| order     | String  | No       | `asc` or `desc`.                                             |

#### Request Body

None.

#### Validation Rules

- Page must be greater than zero.
- Limit must be greater than zero.
- Status must be a supported client status.
- Sort field must be supported.

#### Business Rules

- Returns only clients belonging to the authenticated Business Profile.
- Archived clients are returned only when requested through filtering.
- Search behavior follows the approved Client search requirements.

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "message": "Clients retrieved successfully.",
  "data": [
    {
      "id": "client_001",
      "name": "Rahul Patel",
      "companyName": "ABC Technologies",
      "email": "rahul@example.com",
      "phone": "+91XXXXXXXXXX",
      "status": "active",
      "preferredCurrency": "INR",
      "createdAt": "2026-07-28T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalItems": 125,
    "totalPages": 7,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

#### Error Responses

| Status | Description              |
| ------ | ------------------------ |
| 400    | Invalid query parameters |
| 401    | Unauthorized             |
| 500    | Internal Server Error    |

#### Related Documents

- Domain Model
- Business Rules Specification (Client)
- Functional Specification
- UX Specification (SCR-002)

### 5.3.2 Get Client

#### Purpose

Retrieves the complete details of a specific client.

#### Endpoint

```http
GET /api/v1/clients/{clientId}
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| clientId  | String | Unique Client identifier. |

#### Query Parameters

None.

#### Request Body

None.

#### Validation Rules

- Client ID must be valid.
- Client must exist.
- Client must belong to the authenticated Business Profile.

#### Business Rules

- Returns the latest client information.
- Historical invoice snapshots are not modified.
- Archived clients remain accessible.

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "message": "Client retrieved successfully.",
  "data": {
    "id": "client_001",
    "name": "Rahul Patel",
    "companyName": "ABC Technologies",
    "email": "rahul@example.com",
    "phone": "+91XXXXXXXXXX",
    "billingAddress": {},
    "taxIdentificationNumber": "GSTIN123456",
    "preferredCurrency": "INR",
    "notes": "Long-term client",
    "status": "active",
    "createdAt": "2026-07-28T10:30:00Z",
    "updatedAt": "2026-08-01T09:15:00Z"
  }
}
```

#### Error Responses

| Status | Description           |
| ------ | --------------------- |
| 401    | Unauthorized          |
| 404    | Client not found      |
| 500    | Internal Server Error |

#### Related Documents

- Domain Model
- Business Rules Specification (Client)
- UX Specification (SCR-005)

### 5.3.3 Create Client

#### Purpose

Creates a new client within the authenticated Business Profile.

#### Endpoint

```http
POST /api/v1/clients
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

None.

#### Query Parameters

None.

#### Request Body

```json
{
  "name": "Rahul Patel",
  "companyName": "ABC Technologies",
  "email": "rahul@example.com",
  "phone": "+91XXXXXXXXXX",
  "billingAddress": {},
  "taxIdentificationNumber": "GSTIN123456",
  "preferredCurrency": "INR",
  "notes": "Long-term client"
}
```

#### Validation Rules

Required

- name

Optional

- companyName
- email
- phone
- billingAddress
- taxIdentificationNumber
- preferredCurrency
- notes

#### Business Rules

- Every client belongs to exactly one Business Profile.
- Duplicate client names are allowed.
- Clients may exist before invoices are created.
- New clients are created with **Active** status.
- Creating a client generates a Timeline event.

#### Success Response

**HTTP 201 Created**

```json
{
  "success": true,
  "message": "Client created successfully.",
  "data": {
    "id": "client_001",
    "status": "active"
  }
}
```

#### Error Responses

| Status | Description            |
| ------ | ---------------------- |
| 400    | Invalid request        |
| 401    | Unauthorized           |
| 409    | Business rule conflict |
| 422    | Validation failed      |
| 500    | Internal Server Error  |

#### Related Documents

- Business Rules Specification (BR-CL-001 to BR-CL-010)
- UX Specification (SCR-003)

### 5.3.4 Update Client

#### Purpose

Updates the information of an existing client.

#### Endpoint

```http
PATCH /api/v1/clients/{clientId}
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| clientId  | String | Unique Client identifier. |

#### Query Parameters

None.

#### Request Body

```json
{
  "name": "Rahul Patel",
  "companyName": "ABC Technologies",
  "email": "rahul@example.com",
  "phone": "+91XXXXXXXXXX",
  "billingAddress": {},
  "taxIdentificationNumber": "GSTIN123456",
  "preferredCurrency": "USD",
  "notes": "Updated notes"
}
```

#### Validation Rules

- Client must exist.
- Updated values must satisfy client validation rules.
- Preferred currency must be supported.

#### Business Rules

- Client information may be updated at any time.
- Changes affect future business activities only.
- Existing issued invoices remain unchanged.
- Updating a client generates a Timeline event.

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "message": "Client updated successfully.",
  "data": {
    "id": "client_001"
  }
}
```

#### Error Responses

| Status | Description           |
| ------ | --------------------- |
| 400    | Invalid request       |
| 401    | Unauthorized          |
| 404    | Client not found      |
| 422    | Validation failed     |
| 500    | Internal Server Error |

#### Related Documents

- Business Rules Specification (Client)
- UX Specification (SCR-004)

### 5.3.5 Archive Client

#### Purpose

Archives an active client while preserving all historical business records.

Archived clients remain available for reporting and historical reference but cannot be used for new business operations.

#### Endpoint

```http
PATCH /api/v1/clients/{clientId}/archive
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| clientId  | String | Unique Client identifier. |

#### Query Parameters

None.

#### Request Body

None.

#### Validation Rules

- Client must exist.
- Client must belong to the authenticated Business Profile.
- Client must currently be Active.

#### Business Rules

- Only active clients can be archived.
- Archived clients cannot receive new invoices.
- Historical invoices, payments, notes, reminders, and timeline events remain unchanged.
- Archiving generates a Timeline event.

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "message": "Client archived successfully.",
  "data": {
    "id": "client_001",
    "status": "archived"
  }
}
```

#### Error Responses

| Status | Description                |
| ------ | -------------------------- |
| 400    | Invalid client state       |
| 401    | Unauthorized               |
| 404    | Client not found           |
| 409    | Client is already archived |
| 500    | Internal Server Error      |

#### Related Documents

- Business Rules Specification (BR-CL-006)
- UX Specification (SCR-005)

### 5.3.6 Restore Client

#### Purpose

Restores an archived client to active status.

After restoration, the client can participate in normal business operations again.

#### Endpoint

```http
PATCH /api/v1/clients/{clientId}/restore
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| clientId  | String | Unique Client identifier. |

#### Query Parameters

None.

#### Request Body

None.

#### Validation Rules

- Client must exist.
- Client must belong to the authenticated Business Profile.
- Client must currently be Archived.

#### Business Rules

- Only archived clients may be restored.
- Restored clients become Active.
- Historical records remain unchanged.
- Restoration generates a Timeline event.

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "message": "Client restored successfully.",
  "data": {
    "id": "client_001",
    "status": "active"
  }
}
```

#### Error Responses

| Status | Description              |
| ------ | ------------------------ |
| 400    | Invalid client state     |
| 401    | Unauthorized             |
| 404    | Client not found         |
| 409    | Client is already active |
| 500    | Internal Server Error    |

#### Related Documents

- Business Rules Specification (BR-CL-007)
- UX Specification (SCR-005)

### 5.3.7 Delete Client

#### Purpose

Permanently deletes a client that has no business history.

Deletion removes the client record from the system and is intended only for clients that have never participated in business operations.

#### Endpoint

```http
DELETE /api/v1/clients/{clientId}
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| clientId  | String | Unique Client identifier. |

#### Query Parameters

None.

#### Request Body

None.

#### Validation Rules

- Client must exist.
- Client must belong to the authenticated Business Profile.
- Client must have no business history.

#### Business Rules

- Clients with invoices cannot be deleted.
- Clients with payments cannot be deleted.
- Clients with relationship notes cannot be deleted.
- Clients with reminders cannot be deleted.
- Clients with timeline events cannot be deleted.
- If business history exists, the client must be archived instead of deleted.

#### Success Response

**HTTP 204 No Content**

No response body is returned.

#### Error Responses

| Status | Description                                              |
| ------ | -------------------------------------------------------- |
| 401    | Unauthorized                                             |
| 404    | Client not found                                         |
| 409    | Client cannot be deleted because business history exists |
| 500    | Internal Server Error                                    |

#### Related Documents

- Business Rules Specification (BR-CL-008)
- Domain Model
- Functional Specification

### 5.4.3 Create Invoice

#### Purpose

Creates a new draft invoice.

#### Endpoint

```http
POST /api/v1/invoices
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

None.

#### Query Parameters

None.

#### Request Body

```json
{
  "clientId": "client_001",
  "currency": "INR",
  "issueDate": "2026-07-28",
  "dueDate": "2026-08-10",
  "notes": "",
  "items": [
    {
      "description": "Website Development",
      "quantity": 1,
      "unitPrice": 25000
    }
  ]
}
```

#### Validation Rules

Required

- clientId
- currency
- issueDate
- dueDate
- items

Each line item must include:

- description
- quantity
- unitPrice

#### Business Rules

- Invoice is created with **Draft** status.
- Invoice belongs to exactly one client.
- At least one invoice item is required.
- Invoice totals are calculated by the system.
- No payment can be recorded for a draft invoice.

#### Success Response

**HTTP 201 Created**

```json
{
  "success": true,
  "message": "Invoice created successfully.",
  "data": {
    "id": "inv_001",
    "status": "Draft"
  }
}
```

#### Error Responses

| Status | Description           |
| ------ | --------------------- |
| 400    | Invalid request       |
| 401    | Unauthorized          |
| 422    | Validation failed     |
| 500    | Internal Server Error |

#### Related Documents

- Business Rules Specification
- Functional Specification
- UX Specification

### 5.4.1 List Invoices

#### Purpose

Retrieves a paginated list of invoices belonging to the authenticated Business Profile.

Supports searching, filtering, sorting, and pagination.

#### Endpoint

```http
GET /api/v1/invoices
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

None.

#### Query Parameters

| Parameter | Type    | Required | Description                                            |
| --------- | ------- | -------- | ------------------------------------------------------ |
| page      | Integer | No       | Page number. Default: 1                                |
| limit     | Integer | No       | Records per page. Default: 20                          |
| search    | String  | No       | Search by invoice number or client name                |
| status    | String  | No       | Draft, Issued, PartiallyPaid, Paid, Overdue, Cancelled |
| clientId  | String  | No       | Filter by client                                       |
| currency  | String  | No       | Filter by currency                                     |
| fromDate  | Date    | No       | Issue date from                                        |
| toDate    | Date    | No       | Issue date to                                          |
| sortBy    | String  | No       | Sort field                                             |
| order     | String  | No       | asc or desc                                            |

#### Request Body

None.

#### Validation Rules

- Page and limit must be positive integers.
- Status must be a supported invoice status.
- Date range must be valid.
- Sort field must be supported.

#### Business Rules

- Returns only invoices belonging to the authenticated Business Profile.
- Invoice status reflects the current lifecycle state.
- Supports pagination, filtering, searching, and sorting. :contentReference[oaicite:0]{index=0}

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "message": "Invoices retrieved successfully.",
  "data": [
    {
      "id": "inv_001",
      "invoiceNumber": "INV-2026-001",
      "clientName": "Rahul Patel",
      "status": "Issued",
      "currency": "INR",
      "grandTotal": 25000,
      "amountPaid": 10000,
      "amountDue": 15000,
      "issueDate": "2026-07-28",
      "dueDate": "2026-08-10"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalItems": 85,
    "totalPages": 5
  }
}
```

#### Error Responses

| Status | Description              |
| ------ | ------------------------ |
| 400    | Invalid query parameters |
| 401    | Unauthorized             |
| 500    | Internal Server Error    |

#### Related Documents

- Business Rules Specification (BR-INV-001 to BR-INV-015)
- Functional Specification (FS-005)
- UX Specification (SCR-006)

### 5.4.2 Get Invoice

#### Purpose

Retrieves the complete details of a specific invoice.

#### Endpoint

```http
GET /api/v1/invoices/{invoiceId}
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| invoiceId | String | Unique invoice identifier |

#### Query Parameters

None.

#### Request Body

None.

#### Validation Rules

- Invoice must exist.
- Invoice must belong to the authenticated Business Profile.

#### Business Rules

- Returns the complete invoice including Business Profile snapshot, Client snapshot, line items, totals, payment summary, and current invoice status.
- Historical snapshots are returned exactly as stored. :contentReference[oaicite:1]{index=1}

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "message": "Invoice retrieved successfully.",
  "data": {
    "id": "inv_001",
    "invoiceNumber": "INV-2026-001",
    "status": "Issued",
    "clientSnapshot": {},
    "businessSnapshot": {},
    "lineItems": [],
    "subTotal": 22000,
    "taxAmount": 3000,
    "grandTotal": 25000,
    "amountPaid": 10000,
    "amountDue": 15000,
    "issueDate": "2026-07-28",
    "dueDate": "2026-08-10",
    "notes": ""
  }
}
```

#### Error Responses

| Status | Description           |
| ------ | --------------------- |
| 401    | Unauthorized          |
| 404    | Invoice not found     |
| 500    | Internal Server Error |

#### Related Documents

- Business Rules Specification
- Functional Specification (FS-006)
- UX Specification (SCR-008)

### 5.4.3 Create Invoice

#### Purpose

Creates a new Draft invoice for a client.

#### Endpoint

```http
POST /api/v1/invoices
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

None.

#### Query Parameters

None.

#### Request Body

```json
{
  "clientId": "client_001",
  "invoiceNumber": "INV-2026-001",
  "issueDate": "2026-07-28",
  "dueDate": "2026-08-10",
  "currency": "INR",
  "lineItems": [
    {
      "description": "Website Development",
      "quantity": 1,
      "unitPrice": 25000
    }
  ],
  "notes": "",
  "termsAndConditions": ""
}
```

#### Validation Rules

Required Fields

- clientId
- invoiceNumber
- issueDate
- dueDate
- currency
- lineItems

Business Validation

- Invoice number must be unique.
- Due date cannot precede the issue date.
- At least one line item is required.
- Invoice total must be greater than zero. :contentReference[oaicite:2]{index=2}

#### Business Rules

- Every invoice belongs to one client.
- Every invoice starts in **Draft** status.
- Draft invoices remain editable until issued.
- Invoice totals are calculated by the system.
- Timeline event is generated after creation. :contentReference[oaicite:3]{index=3}

#### Success Response

**HTTP 201 Created**

```json
{
  "success": true,
  "message": "Invoice created successfully.",
  "data": {
    "id": "inv_001",
    "invoiceNumber": "INV-2026-001",
    "status": "Draft"
  }
}
```

#### Error Responses

| Status | Description              |
| ------ | ------------------------ |
| 400    | Invalid request          |
| 401    | Unauthorized             |
| 409    | Duplicate invoice number |
| 422    | Validation failed        |
| 500    | Internal Server Error    |

#### Related Documents

- Business Rules Specification (BR-INV-001 to BR-INV-004)
- Functional Specification (FS-006)
- UX Specification (SCR-007)

### 5.4.4 Update Draft Invoice

#### Purpose

Updates an existing Draft invoice before it is issued.

#### Endpoint

```http
PATCH /api/v1/invoices/{invoiceId}
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| invoiceId | String | Unique invoice identifier |

#### Query Parameters

None.

#### Request Body

```json
{
  "clientId": "client_001",
  "invoiceNumber": "INV-2026-001",
  "issueDate": "2026-07-30",
  "dueDate": "2026-08-15",
  "currency": "INR",
  "lineItems": [
    {
      "description": "Website Development",
      "quantity": 1,
      "unitPrice": 30000
    }
  ],
  "notes": "Updated notes",
  "termsAndConditions": "Net 15 Days"
}
```

#### Validation Rules

- Invoice must exist.
- Invoice must be in Draft status.
- Invoice number must remain unique.
- Due date cannot precede issue date.
- At least one line item is required.
- Invoice total must be greater than zero.

#### Business Rules

- Only Draft invoices may be updated.
- Financial values remain editable until issuance.
- Updating generates a Timeline event. :contentReference[oaicite:0]{index=0}

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "message": "Invoice updated successfully.",
  "data": {
    "id": "inv_001",
    "status": "Draft"
  }
}
```

#### Error Responses

| Status | Description             |
| ------ | ----------------------- |
| 400    | Invalid request         |
| 401    | Unauthorized            |
| 404    | Invoice not found       |
| 409    | Invoice is not editable |
| 422    | Validation failed       |
| 500    | Internal Server Error   |

#### Related Documents

- Business Rules Specification
- Functional Specification (FS-006)
- UX Specification (SCR-007)

### 5.4.5 Issue Invoice

#### Purpose

Issues a Draft invoice and creates the official financial obligation.

#### Endpoint

```http
PATCH /api/v1/invoices/{invoiceId}/issue
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| invoiceId | String | Unique invoice identifier |

#### Query Parameters

None.

#### Request Body

None.

#### Validation Rules

- Invoice must exist.
- Invoice must be Draft.
- All mandatory financial information must be present.

#### Business Rules

- Only Draft invoices can be issued.
- Business Profile and Client snapshots are captured.
- Financial information becomes immutable.
- Invoice enters Issued status.
- Timeline event is generated. :contentReference[oaicite:1]{index=1}

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "message": "Invoice issued successfully.",
  "data": {
    "id": "inv_001",
    "status": "Issued"
  }
}
```

#### Error Responses

| Status | Description                  |
| ------ | ---------------------------- |
| 400    | Required information missing |
| 401    | Unauthorized                 |
| 404    | Invoice not found            |
| 409    | Invoice already issued       |
| 422    | Validation failed            |
| 500    | Internal Server Error        |

#### Related Documents

- Business Rules Specification (BR-INV-004 to BR-INV-008)
- Functional Specification (FS-006)

### 5.4.6 Cancel Invoice

#### Purpose

Cancels an eligible issued invoice.

#### Endpoint

```http
PATCH /api/v1/invoices/{invoiceId}/cancel
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| invoiceId | String | Unique invoice identifier |

#### Query Parameters

None.

#### Request Body

None.

#### Validation Rules

- Invoice must exist.
- Invoice must belong to the authenticated Business Profile.

#### Business Rules

- Only unpaid issued invoices may be cancelled.
- Partially Paid, Paid, and Draft invoices cannot be cancelled.
- Cancelled invoices remain part of business history.
- Timeline event is generated. :contentReference[oaicite:2]{index=2}

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "message": "Invoice cancelled successfully.",
  "data": {
    "id": "inv_001",
    "status": "Cancelled"
  }
}
```

#### Error Responses

| Status | Description                 |
| ------ | --------------------------- |
| 400    | Invalid invoice state       |
| 401    | Unauthorized                |
| 404    | Invoice not found           |
| 409    | Invoice cannot be cancelled |
| 500    | Internal Server Error       |

#### Related Documents

- Business Rules Specification (BR-INV-014)
- Functional Specification (FS-006)

### 5.4.7 Delete Draft Invoice

#### Purpose

Permanently deletes a Draft invoice.

#### Endpoint

```http
DELETE /api/v1/invoices/{invoiceId}
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| invoiceId | String | Unique invoice identifier |

#### Query Parameters

None.

#### Request Body

None.

#### Validation Rules

- Invoice must exist.
- Invoice must be Draft.

#### Business Rules

- Only Draft invoices may be deleted.
- Issued invoices are never permanently deleted.
- Timeline event is generated after deletion. :contentReference[oaicite:3]{index=3}

#### Success Response

**HTTP 204 No Content**

No response body.

#### Error Responses

| Status | Description                        |
| ------ | ---------------------------------- |
| 401    | Unauthorized                       |
| 404    | Invoice not found                  |
| 409    | Only Draft invoices can be deleted |
| 500    | Internal Server Error              |

#### Related Documents

- Business Rules Specification (BR-INV-015)
- Functional Specification (FS-006)

### 5.4.8 Duplicate Invoice

#### Purpose

Creates a new Draft invoice using an existing invoice as the template.

#### Endpoint

```http
POST /api/v1/invoices/{invoiceId}/duplicate
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| invoiceId | String | Source invoice identifier |

#### Query Parameters

None.

#### Request Body

None.

#### Validation Rules

- Source invoice must exist.
- Source invoice must belong to the authenticated Business Profile.

#### Business Rules

- A new Draft invoice is created.
- A new unique invoice number is generated.
- Payment history is not copied.
- Timeline event is generated.
- Original invoice remains unchanged. :contentReference[oaicite:4]{index=4}

#### Success Response

**HTTP 201 Created**

```json
{
  "success": true,
  "message": "Invoice duplicated successfully.",
  "data": {
    "id": "inv_002",
    "invoiceNumber": "INV-2026-002",
    "status": "Draft"
  }
}
```

#### Error Responses

| Status | Description           |
| ------ | --------------------- |
| 401    | Unauthorized          |
| 404    | Invoice not found     |
| 500    | Internal Server Error |

#### Related Documents

- Business Rules Specification
- Functional Specification (FS-006)
- UX Specification (SCR-008)

## 5.5 Payment API

### Purpose

The Payment API manages the complete lifecycle of invoice payments.

It enables users to record payments, retrieve payment details, view payment history, and void incorrect payments while maintaining complete financial integrity and audit history.

### Related Domain Concept

- Payment

### Related Business Rules

All Payment Business Rules

### Related Screens

- SCR-008 — Invoice Details
- SCR-009 — Record Payment

### Supported Operations

| Operation      | HTTP Method | Endpoint                            |
| -------------- | ----------- | ----------------------------------- |
| List Payments  | GET         | `/api/v1/payments`                  |
| Get Payment    | GET         | `/api/v1/payments/{paymentId}`      |
| Record Payment | POST        | `/api/v1/payments`                  |
| Void Payment   | PATCH       | `/api/v1/payments/{paymentId}/void` |

### 5.5.1 List Payments

#### Purpose

Retrieves a paginated list of recorded payments belonging to the authenticated Business Profile.

#### Endpoint

```http
GET /api/v1/payments
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

None.

#### Query Parameters

| Parameter | Type    | Description       |
| --------- | ------- | ----------------- |
| page      | Integer | Page number       |
| limit     | Integer | Records per page  |
| invoiceId | String  | Filter by invoice |
| clientId  | String  | Filter by client  |
| status    | String  | Recorded, Voided  |
| fromDate  | Date    | Payment date from |
| toDate    | Date    | Payment date to   |
| sortBy    | String  | Sort field        |
| order     | String  | asc or desc       |

#### Request Body

None.

#### Validation Rules

- Query parameters must be valid.
- Date range must be valid.

#### Business Rules

- Returns only payments belonging to the authenticated Business Profile.
- Payment history is read-only.
- Supports searching, filtering, sorting, and pagination. :contentReference[oaicite:0]{index=0}

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "data": [
    {
      "id": "pay_001",
      "invoiceNumber": "INV-2026-001",
      "clientName": "Rahul Patel",
      "amount": 10000,
      "paymentDate": "2026-08-05",
      "status": "Recorded"
    }
  ]
}
```

#### Error Responses

| Status | Description              |
| ------ | ------------------------ |
| 400    | Invalid query parameters |
| 401    | Unauthorized             |
| 500    | Internal Server Error    |

#### Related Documents

- Business Rules Specification
- Functional Specification (FS-007)

### 5.5.2 Get Payment

#### Purpose

Retrieves the complete details of a specific payment.

#### Endpoint

```http
GET /api/v1/payments/{paymentId}
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| paymentId | String | Unique payment identifier |

#### Query Parameters

None.

#### Request Body

None.

#### Validation Rules

- Payment must exist.
- Payment must belong to the authenticated Business Profile.

#### Business Rules

- Returns payment details without modifying financial history.
- Voided payments remain accessible for audit purposes. :contentReference[oaicite:1]{index=1}

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "data": {
    "id": "pay_001",
    "invoiceId": "inv_001",
    "amount": 10000,
    "paymentMethod": "Bank Transfer",
    "paymentDate": "2026-08-05",
    "status": "Recorded",
    "notes": ""
  }
}
```

#### Error Responses

| Status | Description           |
| ------ | --------------------- |
| 401    | Unauthorized          |
| 404    | Payment not found     |
| 500    | Internal Server Error |

#### Related Documents

- Business Rules Specification
- Functional Specification (FS-007)

### 5.5.3 Record Payment

#### Purpose

Records a payment against an issued invoice.

#### Endpoint

```http
POST /api/v1/payments
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

None.

#### Query Parameters

None.

#### Request Body

```json
{
  "invoiceId": "inv_001",
  "amount": 10000,
  "paymentDate": "2026-08-05",
  "paymentMethod": "Bank Transfer",
  "referenceNumber": "TXN123456",
  "notes": ""
}
```

#### Validation Rules

Required Fields

- invoiceId
- amount
- paymentDate
- paymentMethod

Business Validation

- Invoice must exist.
- Invoice must not be Cancelled.
- Payment amount must be greater than zero.
- Payment cannot exceed the outstanding balance. :contentReference[oaicite:2]{index=2}

#### Business Rules

- Every payment belongs to exactly one invoice.
- Multiple partial payments are supported.
- Outstanding balance is automatically recalculated.
- Invoice status is updated automatically.
- Timeline event is generated.
- Business Pulse is refreshed. :contentReference[oaicite:3]{index=3}

#### Success Response

**HTTP 201 Created**

```json
{
  "success": true,
  "message": "Payment recorded successfully.",
  "data": {
    "id": "pay_001",
    "status": "Recorded"
  }
}
```

#### Error Responses

| Status | Description                         |
| ------ | ----------------------------------- |
| 400    | Invalid request                     |
| 401    | Unauthorized                        |
| 404    | Invoice not found                   |
| 409    | Payment exceeds outstanding balance |
| 422    | Validation failed                   |
| 500    | Internal Server Error               |

#### Related Documents

- Business Rules Specification (BR-PAY-001 to BR-PAY-005)
- Functional Specification (FS-007)
- UX Specification (SCR-009)

### 5.5.4 Void Payment

#### Purpose

Voids an incorrectly recorded payment while preserving complete financial audit history.

#### Endpoint

```http
PATCH /api/v1/payments/{paymentId}/void
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| paymentId | String | Unique payment identifier |

#### Query Parameters

None.

#### Request Body

```json
{
  "reason": "Incorrect payment amount"
}
```

#### Validation Rules

- Payment must exist.
- Payment must currently be Recorded.
- Void reason is required.

#### Business Rules

- Payments are corrected by voiding, never by editing.
- Voided payments remain permanently visible.
- Outstanding balance is recalculated automatically.
- Invoice payment status is updated automatically.
- Timeline event is generated. :contentReference[oaicite:4]{index=4}

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "message": "Payment voided successfully.",
  "data": {
    "id": "pay_001",
    "status": "Voided"
  }
}
```

#### Error Responses

| Status | Description            |
| ------ | ---------------------- |
| 400    | Invalid payment state  |
| 401    | Unauthorized           |
| 404    | Payment not found      |
| 409    | Payment already voided |
| 500    | Internal Server Error  |

#### Related Documents

- Business Rules Specification
- Functional Specification (FS-007)

## 5.6 Timeline API

### Purpose

The Timeline API provides a chronological history of important business events generated throughout the application.

Timeline events are automatically created by the system and provide an immutable audit trail of significant business activities.

### Related Domain Concept

- Timeline Event

### Related Business Rules

All Timeline Business Rules

### Related Screens

- SCR-005 — Client Workspace
- SCR-010 — Timeline

### Supported Operations

| Operation            | HTTP Method | Endpoint                            |
| -------------------- | ----------- | ----------------------------------- |
| List Timeline Events | GET         | `/api/v1/timeline-events`           |
| Get Timeline Event   | GET         | `/api/v1/timeline-events/{eventId}` |

### 5.6.1 List Timeline Events

#### Purpose

Retrieves a paginated chronological list of Timeline Events belonging to the authenticated Business Profile.

#### Endpoint

```http
GET /api/v1/timeline-events
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

None.

#### Query Parameters

| Parameter | Type    | Description          |
| --------- | ------- | -------------------- |
| page      | Integer | Page number          |
| limit     | Integer | Records per page     |
| clientId  | String  | Filter by client     |
| eventType | String  | Filter by event type |
| fromDate  | Date    | Event date from      |
| toDate    | Date    | Event date to        |
| sortBy    | String  | Sort field           |
| order     | String  | asc or desc          |

#### Request Body

None.

#### Validation Rules

- Query parameters must be valid.
- Date range must be valid.

#### Business Rules

- Returns only Timeline Events belonging to the authenticated Business Profile.
- Events are ordered chronologically.
- Timeline history is read-only.
- Supports pagination, filtering, searching, and sorting.

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "data": [
    {
      "id": "evt_001",
      "eventType": "InvoiceIssued",
      "clientName": "Rahul Patel",
      "description": "Invoice INV-2026-001 was issued.",
      "occurredAt": "2026-07-28T10:30:00Z"
    }
  ]
}
```

#### Error Responses

| Status | Description              |
| ------ | ------------------------ |
| 400    | Invalid query parameters |
| 401    | Unauthorized             |
| 500    | Internal Server Error    |

#### Related Documents

- Business Rules Specification
- Functional Specification
- UX Specification (SCR-010)

### 5.6.2 Get Timeline Event

#### Purpose

Retrieves the complete details of a specific Timeline Event.

#### Endpoint

```http
GET /api/v1/timeline-events/{eventId}
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

| Parameter | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| eventId   | String | Unique Timeline Event identifier |

#### Query Parameters

None.

#### Request Body

None.

#### Validation Rules

- Timeline Event must exist.
- Timeline Event must belong to the authenticated Business Profile.

#### Business Rules

- Timeline Events are immutable.
- Historical events cannot be modified or deleted.
- Event details reflect the original business activity.

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "data": {
    "id": "evt_001",
    "eventType": "InvoiceIssued",
    "entityType": "Invoice",
    "entityId": "inv_001",
    "clientId": "client_001",
    "description": "Invoice INV-2026-001 was issued.",
    "occurredAt": "2026-07-28T10:30:00Z",
    "createdBy": "system"
  }
}
```

#### Error Responses

| Status | Description              |
| ------ | ------------------------ |
| 401    | Unauthorized             |
| 404    | Timeline Event not found |
| 500    | Internal Server Error    |

#### Related Documents

- Business Rules Specification
- Functional Specification
- UX Specification (SCR-010)

## 5.7 Relationship Notes API

### Purpose

The Relationship Notes API manages private client notes that help preserve relationship context throughout the client lifecycle.

### Related Domain Concept

- Relationship Note

### Related Business Rules

All Relationship Note Business Rules

### Related Screens

- SCR-005 — Client Workspace
- SCR-012 — Relationship Notes

### Supported Operations

| Operation                | HTTP Method | Endpoint                              |
| ------------------------ | ----------- | ------------------------------------- |
| List Relationship Notes  | GET         | `/api/v1/relationship-notes`          |
| Get Relationship Note    | GET         | `/api/v1/relationship-notes/{noteId}` |
| Create Relationship Note | POST        | `/api/v1/relationship-notes`          |
| Update Relationship Note | PATCH       | `/api/v1/relationship-notes/{noteId}` |
| Delete Relationship Note | DELETE      | `/api/v1/relationship-notes/{noteId}` |

### 5.7.1 List Relationship Notes

#### Purpose

Retrieves a paginated list of Relationship Notes.

#### Endpoint

```http
GET /api/v1/relationship-notes
```

#### Authentication

Required

Bearer Access Token

#### Query Parameters

| Parameter | Type    | Description         |
| --------- | ------- | ------------------- |
| page      | Integer | Page number         |
| limit     | Integer | Records per page    |
| clientId  | String  | Filter by client    |
| pinned    | Boolean | Filter pinned notes |
| search    | String  | Search note content |
| sortBy    | String  | Sort field          |
| order     | String  | asc or desc         |

#### Request Body

None.

#### Validation Rules

- Query parameters must be valid.

#### Business Rules

- Returns notes belonging to the authenticated Business Profile.
- Supports pagination, search, filtering, and sorting.

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "data": [
    {
      "id": "note_001",
      "clientId": "client_001",
      "title": "Prefers WhatsApp",
      "isPinned": true,
      "updatedAt": "2026-07-28T10:00:00Z"
    }
  ]
}
```

#### Error Responses

| Status | Description              |
| ------ | ------------------------ |
| 400    | Invalid query parameters |
| 401    | Unauthorized             |
| 500    | Internal Server Error    |

#### Related Documents

- Business Rules Specification
- Functional Specification

### 5.7.2 Get Relationship Note

#### Purpose

Retrieves the complete details of a Relationship Note.

#### Endpoint

```http
GET /api/v1/relationship-notes/{noteId}
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| noteId    | String | Relationship Note identifier |

#### Query Parameters

None.

#### Request Body

None.

#### Validation Rules

- Relationship Note must exist.
- Must belong to the authenticated Business Profile.

#### Business Rules

- Returns complete note details without modification.

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "data": {
    "id": "note_001",
    "clientId": "client_001",
    "title": "Prefers WhatsApp",
    "content": "Client usually responds faster on WhatsApp.",
    "isPinned": true,
    "createdAt": "2026-07-20T09:00:00Z",
    "updatedAt": "2026-07-28T10:00:00Z"
  }
}
```

#### Error Responses

| Status | Description                 |
| ------ | --------------------------- |
| 401    | Unauthorized                |
| 404    | Relationship Note not found |
| 500    | Internal Server Error       |

#### Related Documents

- Business Rules Specification
- Functional Specification

### 5.7.3 Create Relationship Note

#### Purpose

Creates a new Relationship Note for a client.

#### Endpoint

```http
POST /api/v1/relationship-notes
```

#### Authentication

Required

Bearer Access Token

#### Request Body

```json
{
  "clientId": "client_001",
  "title": "Prefers WhatsApp",
  "content": "Client usually responds faster on WhatsApp.",
  "isPinned": true
}
```

#### Validation Rules

Required Fields

- clientId
- title
- content

#### Business Rules

- Every note belongs to exactly one client.
- Creating a note automatically generates a Timeline Event.

#### Success Response

**HTTP 201 Created**

```json
{
  "success": true,
  "message": "Relationship note created successfully.",
  "data": {
    "id": "note_001"
  }
}
```

#### Error Responses

| Status | Description           |
| ------ | --------------------- |
| 400    | Invalid request       |
| 401    | Unauthorized          |
| 404    | Client not found      |
| 422    | Validation failed     |
| 500    | Internal Server Error |

#### Related Documents

- Business Rules Specification
- Functional Specification
- UX Specification (SCR-012)

### 5.7.4 Update Relationship Note

#### Purpose

Updates an existing Relationship Note.

#### Endpoint

```http
PATCH /api/v1/relationship-notes/{noteId}
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| noteId    | String | Relationship Note identifier |

#### Request Body

```json
{
  "title": "Updated Title",
  "content": "Updated note content.",
  "isPinned": false
}
```

#### Validation Rules

- Relationship Note must exist.
- Title and content must be valid.

#### Business Rules

- Only editable note fields may be updated.
- Updating a note generates a Timeline Event.

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "message": "Relationship note updated successfully."
}
```

#### Error Responses

| Status | Description                 |
| ------ | --------------------------- |
| 400    | Invalid request             |
| 401    | Unauthorized                |
| 404    | Relationship Note not found |
| 422    | Validation failed           |
| 500    | Internal Server Error       |

#### Related Documents

- Business Rules Specification
- Functional Specification

### 5.7.5 Delete Relationship Note

#### Purpose

Permanently deletes a Relationship Note.

#### Endpoint

```http
DELETE /api/v1/relationship-notes/{noteId}
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| noteId    | String | Relationship Note identifier |

#### Query Parameters

None.

#### Request Body

None.

#### Validation Rules

- Relationship Note must exist.

#### Business Rules

- Relationship Notes are non-financial records and may be permanently deleted.
- Deletion generates a Timeline Event.

#### Success Response

**HTTP 204 No Content**

#### Error Responses

| Status | Description                 |
| ------ | --------------------------- |
| 401    | Unauthorized                |
| 404    | Relationship Note not found |
| 500    | Internal Server Error       |

#### Related Documents

- Business Rules Specification
- Functional Specification
- UX Specification (SCR-012)

## 5.8 Reminder API

### Purpose

The Reminder API manages client-related reminders to help users track upcoming follow-ups, deadlines, and important business activities.

### Related Domain Concept

- Reminder

### Related Business Rules

All Reminder Business Rules

### Related Screens

- SCR-005 — Client Workspace
- SCR-011 — Reminder Management

### Supported Operations

| Operation         | HTTP Method | Endpoint                                  |
| ----------------- | ----------- | ----------------------------------------- |
| List Reminders    | GET         | `/api/v1/reminders`                       |
| Get Reminder      | GET         | `/api/v1/reminders/{reminderId}`          |
| Create Reminder   | POST        | `/api/v1/reminders`                       |
| Update Reminder   | PATCH       | `/api/v1/reminders/{reminderId}`          |
| Complete Reminder | PATCH       | `/api/v1/reminders/{reminderId}/complete` |
| Delete Reminder   | DELETE      | `/api/v1/reminders/{reminderId}`          |

### 5.8.1 List Reminders

#### Purpose

Retrieves a paginated list of reminders.

#### Endpoint

```http
GET /api/v1/reminders
```

#### Authentication

Required

Bearer Access Token

#### Query Parameters

| Parameter | Type    | Description        |
| --------- | ------- | ------------------ |
| page      | Integer | Page number        |
| limit     | Integer | Records per page   |
| clientId  | String  | Filter by client   |
| status    | String  | Pending, Completed |
| priority  | String  | Low, Medium, High  |
| dueFrom   | Date    | Due date from      |
| dueTo     | Date    | Due date to        |
| sortBy    | String  | Sort field         |
| order     | String  | asc or desc        |

#### Request Body

None.

#### Validation Rules

- Query parameters must be valid.
- Date range must be valid.

#### Business Rules

- Returns reminders belonging to the authenticated Business Profile.
- Supports pagination, filtering, searching, and sorting.

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "data": [
    {
      "id": "rem_001",
      "title": "Follow up with client",
      "clientName": "Rahul Patel",
      "priority": "High",
      "status": "Pending",
      "dueDate": "2026-08-01"
    }
  ]
}
```

#### Error Responses

| Status | Description              |
| ------ | ------------------------ |
| 400    | Invalid query parameters |
| 401    | Unauthorized             |
| 500    | Internal Server Error    |

#### Related Documents

- Business Rules Specification
- Functional Specification

### 5.8.2 Get Reminder

#### Purpose

Retrieves the complete details of a reminder.

#### Endpoint

```http
GET /api/v1/reminders/{reminderId}
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

| Parameter  | Type   | Description         |
| ---------- | ------ | ------------------- |
| reminderId | String | Reminder identifier |

#### Query Parameters

None.

#### Request Body

None.

#### Validation Rules

- Reminder must exist.
- Reminder must belong to the authenticated Business Profile.

#### Business Rules

- Returns complete reminder details.
- Reminder history is preserved.

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "data": {
    "id": "rem_001",
    "clientId": "client_001",
    "title": "Follow up with client",
    "description": "Call regarding project proposal.",
    "priority": "High",
    "status": "Pending",
    "dueDate": "2026-08-01"
  }
}
```

#### Error Responses

| Status | Description           |
| ------ | --------------------- |
| 401    | Unauthorized          |
| 404    | Reminder not found    |
| 500    | Internal Server Error |

#### Related Documents

- Business Rules Specification
- Functional Specification

### 5.8.3 Create Reminder

#### Purpose

Creates a new reminder for a client.

#### Endpoint

```http
POST /api/v1/reminders
```

#### Authentication

Required

Bearer Access Token

#### Request Body

```json
{
  "clientId": "client_001",
  "title": "Follow up with client",
  "description": "Call regarding project proposal.",
  "priority": "High",
  "dueDate": "2026-08-01"
}
```

#### Validation Rules

Required Fields

- clientId
- title
- priority
- dueDate

#### Business Rules

- Every reminder belongs to exactly one client.
- New reminders are created with **Pending** status.
- Creating a reminder generates a Timeline Event.

#### Success Response

**HTTP 201 Created**

```json
{
  "success": true,
  "message": "Reminder created successfully.",
  "data": {
    "id": "rem_001",
    "status": "Pending"
  }
}
```

#### Error Responses

| Status | Description           |
| ------ | --------------------- |
| 400    | Invalid request       |
| 401    | Unauthorized          |
| 404    | Client not found      |
| 422    | Validation failed     |
| 500    | Internal Server Error |

#### Related Documents

- Business Rules Specification
- Functional Specification
- UX Specification (SCR-011)

### 5.8.4 Update Reminder

#### Purpose

Updates an existing pending reminder.

#### Endpoint

```http
PATCH /api/v1/reminders/{reminderId}
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

| Parameter  | Type   | Description         |
| ---------- | ------ | ------------------- |
| reminderId | String | Reminder identifier |

#### Request Body

```json
{
  "title": "Updated Reminder",
  "description": "Updated description",
  "priority": "Medium",
  "dueDate": "2026-08-03"
}
```

#### Validation Rules

- Reminder must exist.
- Reminder must be Pending.

#### Business Rules

- Only Pending reminders may be updated.
- Updating a reminder generates a Timeline Event.

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "message": "Reminder updated successfully."
}
```

#### Error Responses

| Status | Description                           |
| ------ | ------------------------------------- |
| 400    | Invalid request                       |
| 401    | Unauthorized                          |
| 404    | Reminder not found                    |
| 409    | Completed reminders cannot be updated |
| 422    | Validation failed                     |
| 500    | Internal Server Error                 |

#### Related Documents

- Business Rules Specification
- Functional Specification

### 5.8.5 Complete Reminder

#### Purpose

Marks a pending reminder as completed.

#### Endpoint

```http
PATCH /api/v1/reminders/{reminderId}/complete
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

| Parameter  | Type   | Description         |
| ---------- | ------ | ------------------- |
| reminderId | String | Reminder identifier |

#### Query Parameters

None.

#### Request Body

None.

#### Validation Rules

- Reminder must exist.
- Reminder must be Pending.

#### Business Rules

- Only Pending reminders can be completed.
- Completion timestamp is recorded.
- Completing a reminder generates a Timeline Event.

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "message": "Reminder completed successfully.",
  "data": {
    "id": "rem_001",
    "status": "Completed"
  }
}
```

#### Error Responses

| Status | Description                |
| ------ | -------------------------- |
| 401    | Unauthorized               |
| 404    | Reminder not found         |
| 409    | Reminder already completed |
| 500    | Internal Server Error      |

#### Related Documents

- Business Rules Specification
- Functional Specification

### 5.8.6 Delete Reminder

#### Purpose

Permanently deletes a reminder.

#### Endpoint

```http
DELETE /api/v1/reminders/{reminderId}
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

| Parameter  | Type   | Description         |
| ---------- | ------ | ------------------- |
| reminderId | String | Reminder identifier |

#### Query Parameters

None.

#### Request Body

None.

#### Validation Rules

- Reminder must exist.

#### Business Rules

- Reminders may be permanently deleted.
- Deletion generates a Timeline Event.

#### Success Response

**HTTP 204 No Content**

#### Error Responses

| Status | Description           |
| ------ | --------------------- |
| 401    | Unauthorized          |
| 404    | Reminder not found    |
| 500    | Internal Server Error |

#### Related Documents

- Business Rules Specification
- Functional Specification
- UX Specification (SCR-011)

## 5.9 Dashboard API

### Purpose

The Dashboard API provides aggregated business insights and operational summaries for the authenticated Business Profile.

The Dashboard is a **read-only** module. It does not own business data and derives all information from existing Clients, Invoices, Payments, Reminders, and Timeline records. :contentReference[oaicite:0]{index=0} :contentReference[oaicite:1]{index=1}

### Related Domain Concept

- Business Pulse

### Related Business Rules

All Dashboard Business Rules

### Related Screens

- SCR-002 — Dashboard (Business Pulse)

### Supported Operations

| Operation             | HTTP Method | Endpoint                            |
| --------------------- | ----------- | ----------------------------------- |
| Get Dashboard Summary | GET         | `/api/v1/dashboard/summary`         |
| Get Recent Activity   | GET         | `/api/v1/dashboard/recent-activity` |

### 5.9.1 Get Dashboard Summary

#### Purpose

Retrieves the Business Pulse summary for the authenticated Business Profile.

#### Endpoint

```http
GET /api/v1/dashboard/summary
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

None.

#### Query Parameters

None.

#### Request Body

None.

#### Validation Rules

- User must be authenticated.
- Dashboard information is generated from existing business data.

#### Business Rules

- Dashboard is read-only.
- Metrics are calculated from current business records.
- No business data is modified.
- Dashboard automatically reflects the latest valid business state. :contentReference[oaicite:2]{index=2}

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "data": {
    "businessSnapshot": {
      "totalClients": 42,
      "activeClients": 38,
      "draftInvoices": 5,
      "issuedInvoices": 18,
      "overdueInvoices": 3,
      "outstandingRevenue": 186500,
      "paidThisMonth": 92000,
      "pendingReminders": 7
    }
  }
}
```

#### Error Responses

| Status | Description           |
| ------ | --------------------- |
| 401    | Unauthorized          |
| 500    | Internal Server Error |

#### Related Documents

- Functional Specification (FS-002)
- Business Rules Specification

### 5.9.2 Get Recent Activity

#### Purpose

Retrieves recent Timeline activity displayed on the Dashboard.

#### Endpoint

```http
GET /api/v1/dashboard/recent-activity
```

#### Authentication

Required

Bearer Access Token

#### Path Parameters

None.

#### Query Parameters

| Parameter | Type    | Description                           |
| --------- | ------- | ------------------------------------- |
| limit     | Integer | Number of recent activities to return |

#### Request Body

None.

#### Validation Rules

- Limit must be a positive integer.

#### Business Rules

- Returns the latest Timeline events.
- Results are ordered by most recent activity.
- Information is read-only.
- Activity originates from the Timeline module and is not maintained by the Dashboard. :contentReference[oaicite:3]{index=3}

#### Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "data": [
    {
      "id": "evt_001",
      "eventType": "PaymentRecorded",
      "description": "Payment of ₹10,000 recorded for Invoice INV-2026-001.",
      "occurredAt": "2026-07-28T11:30:00Z"
    },
    {
      "id": "evt_002",
      "eventType": "ReminderCreated",
      "description": "Follow-up reminder created for Rahul Patel.",
      "occurredAt": "2026-07-28T10:15:00Z"
    }
  ]
}
```

#### Error Responses

| Status | Description             |
| ------ | ----------------------- |
| 400    | Invalid query parameter |
| 401    | Unauthorized            |
| 500    | Internal Server Error   |

#### Related Documents

- Functional Specification (FS-002)
- Timeline Business Rules

# 6. Common API Components

This section defines standards that apply consistently across all REST APIs in the Freelancer Client & Invoice Manager.

## 6.1 Authentication & Authorization

### Authentication

All protected endpoints require a valid Bearer Access Token.

```http
Authorization: Bearer <access_token>
```

Public endpoints:

- Login
- Forgot Password
- Reset Password

All other endpoints require authentication.

### Authorization

Authorization is enforced using the authenticated user's Business Profile.

Business rules:

- Users may access only their own business data.
- Cross-business data access is prohibited.
- Every request validates resource ownership before processing.

## 6.2 Pagination

Collection endpoints support pagination.

### Query Parameters

| Parameter | Type    | Default | Description      |
| --------- | ------- | ------- | ---------------- |
| page      | Integer | 1       | Page number      |
| limit     | Integer | 20      | Records per page |

### Response Example

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalRecords": 145,
    "totalPages": 8
  }
}
```

## 6.3 Searching, Filtering & Sorting

Collection endpoints may support searching, filtering, and sorting.

### Search

```http
?search=rahul
```

### Filtering

```http
?status=Active
```

```http
?clientId=client_001
```

### Sorting

```http
?sortBy=createdAt&order=desc
```

### General Rules

- Search is case-insensitive.
- Invalid filter values return **400 Bad Request**.
- Default sorting is newest first unless specified otherwise.

## 6.4 Standard Success Response

Successful API responses follow a consistent structure.

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {}
}
```

## 6.5 Standard Error Response

All API errors follow a consistent format.

```json
{
  "success": false,
  "message": "Resource not found.",
  "error": {
    "code": "RESOURCE_NOT_FOUND"
  }
}
```

## 6.6 Validation Error Response

Validation failures return detailed field-level errors.

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    {
      "field": "email",
      "message": "Email is required."
    },
    {
      "field": "invoiceNumber",
      "message": "Invoice number already exists."
    }
  ]
}
```

## 6.7 HTTP Status Codes

| Status | Meaning               |
| ------ | --------------------- |
| 200    | OK                    |
| 201    | Created               |
| 204    | No Content            |
| 400    | Bad Request           |
| 401    | Unauthorized          |
| 403    | Forbidden             |
| 404    | Not Found             |
| 409    | Conflict              |
| 422    | Validation Failed     |
| 500    | Internal Server Error |

## 6.8 Idempotency

Idempotent operations ensure repeated requests produce the same result.

| Method | Idempotent           |
| ------ | -------------------- |
| GET    | Yes                  |
| PUT    | Yes                  |
| PATCH  | Depends on operation |
| DELETE | Yes                  |
| POST   | No                   |

Business operations should prevent duplicate processing where required.

## 6.9 API Versioning

All endpoints use URI-based versioning.

Current version:

```text
/api/v1/
```

Future breaking changes will be introduced through new API versions without affecting existing clients.

## 6.10 Content Type

All requests and responses use JSON.

Request

```http
Content-Type: application/json
```

Response

```http
Content-Type: application/json
```

UTF-8 encoding is used for all payloads.

# 7. API Security Considerations

## 7.1 Authentication

- All protected endpoints require authentication.
- Access tokens must be validated before request processing.
- Unauthenticated requests return **401 Unauthorized**.

## 7.2 Authorization

- Every resource is scoped to the authenticated Business Profile.
- Ownership validation is required before reading or modifying data.
- Cross-business access is prohibited.

## 7.3 Input Validation

- All incoming data is validated.
- Invalid requests return structured validation errors.
- Unexpected fields are ignored or rejected according to API validation rules.

## 7.4 Data Protection

- Sensitive business information is transmitted only over HTTPS.
- Historical financial records remain protected from unauthorized modification.
- Snapshot data preserves historical integrity.

## 7.5 Rate Limiting

Authentication endpoints may apply stricter rate limits than standard business APIs to reduce abuse.

## 7.6 Auditability

Significant business operations generate Timeline Events to provide an immutable audit trail.

# 8. API Specification Approval

This API Specification defines the complete REST API contract for the Freelancer Client & Invoice Manager MVP.

The specification is derived from the approved:

- Product Discovery
- Product Requirements Document (PRD)
- Domain Model
- Business Rules Specification
- Functional Specification
- UX Specification
- Wireframes
- Information Architecture
- Quality Attributes Specification
- System Architecture
- Database Design

This document serves as the authoritative API contract for backend implementation, frontend integration, automated testing, and future API evolution.

Any future changes to API behavior should remain consistent with the approved business rules and functional requirements.
