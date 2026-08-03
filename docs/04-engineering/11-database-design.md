# 1. Introduction

## 1.1 Purpose

This document defines the complete database design for the **Freelancer Client & Invoice Manager** application. It serves as the authoritative reference for the system's persistence layer and translates the approved Product Requirements, Domain Model, Business Rules, Functional Specification, Quality Attributes, and System Architecture into an implementation-ready database design.

The specification describes how business data is structured, stored, related, validated, secured, and evolved within the system using MongoDB Atlas.

## 1.2 Scope

This document covers:

- Database architecture and design principles
- Collection inventory and ownership
- Aggregate boundaries and data relationships
- Document structures and modeling approach
- Embedding and referencing strategy
- Validation rules and business constraints
- Indexing and query optimization
- Transaction and consistency strategy
- Security and data integrity
- Schema evolution and migration strategy
- Architecture Decision Records (ADRs)

This document does **not** define application business logic, API contracts, user interface behavior, or implementation details that are documented elsewhere.

## 1.3 Intended Audience

This document is intended for:

- Software Architects
- Backend Developers
- Full-Stack Developers
- Technical Leads
- QA Engineers
- Future Contributors

It provides the architectural foundation required to implement, maintain, and evolve the database consistently throughout the project's lifecycle.

## 1.4 Design Goals

The database design is guided by the following goals:

- Model the business domain accurately.
- Maintain financial and business data integrity.
- Optimize common application workflows.
- Keep the design simple and maintainable.
- Support future product evolution without major redesign.
- Align with the approved Modular Monolith and Domain-Driven Design architecture.

# 2. Goals & Design Principles

## 2.1 Database Goals

The database is designed to achieve the following objectives:

- Accurately model the business domain.
- Maintain data integrity and financial correctness.
- Optimize the application's primary business workflows.
- Ensure clear ownership of business data.
- Minimize unnecessary data duplication.
- Support future product evolution with minimal schema changes.
- Align with the approved Domain-Driven Design (DDD) and Modular Monolith architecture.
- Leverage MongoDB's document model effectively while maintaining long-term maintainability.

## 2.2 Design Principles

The database follows these core architectural principles.

### Domain-First Design

The database is organized around business domains rather than user interface screens or API endpoints. Every collection represents a meaningful business concept with clearly defined responsibilities.

### Aggregate-Oriented Modeling

Each Aggregate Root owns a single primary collection and defines the consistency boundary for its data. Business operations are performed through Aggregate Roots to ensure consistent rule enforcement.

### Single Source of Truth

Every business field has exactly one authoritative owner. Other collections may store immutable snapshots or references but never duplicate ownership of mutable business data.

### Explicit Data Ownership

Each collection is owned by a single application module. Only the owning module may create, update, or delete documents within that collection. Cross-module interactions occur through application services rather than direct database modifications.

### Read-Optimized Document Design

Documents are structured to support the application's most common business workflows while minimizing unnecessary database queries. Bounded data is embedded where appropriate, while independent business entities are stored separately.

### Controlled Denormalization

Data duplication is permitted only when it provides clear business value, such as preserving historical accuracy or improving read performance. All duplicated data has a clearly defined purpose and ownership.

### Consistency Before Optimization

Business correctness takes priority over performance optimizations. Financial records, invoice history, payment information, and audit data must remain accurate and consistent at all times.

### Evolution Without Redesign

The schema is designed to support future enhancements—including recurring invoices, online payments, multi-user workspaces, and client portals—through incremental evolution rather than structural redesign.

### Simplicity and Maintainability

The design favors clear ownership, predictable relationships, and straightforward document structures. Unnecessary complexity, premature optimization, and over-engineering are intentionally avoided.

## 2.3 Guiding Rules

The following rules apply throughout the database design:

- Every Aggregate Root owns one primary collection.
- Every business field has a single authoritative owner.
- Business data is organized around aggregates, not application screens.
- Independent business entities communicate through stable document references.
- Historical business records are preserved using immutable snapshots where required.
- Application services coordinate cross-aggregate operations.
- Validation is enforced before persistence.
- Schema evolution is incremental and backward compatible whenever practical.

# 3. Database Overview

## 3.1 Database Technology

The Freelancer Client & Invoice Manager uses **MongoDB Atlas** as its primary database.

MongoDB Atlas was selected because it provides:

- Flexible document-based data modeling.
- Excellent support for aggregate-oriented design.
- High read performance for business workflows.
- Schema evolution without disruptive migrations.
- Managed backups, monitoring, security, and high availability.
- Horizontal scalability for future product growth.

The database design intentionally follows MongoDB best practices while maintaining clear business boundaries and long-term maintainability.

## 3.2 Database Architecture

The database is organized using **Domain-Driven Design (DDD)** and **Aggregate-Oriented Modeling**.

Each business capability is represented by an Aggregate Root that owns its corresponding collection. Every collection has a single responsibility, a clearly defined owner, and an independent lifecycle.

Cross-aggregate communication occurs through stable document references and application services rather than direct collection updates.

This architecture provides:

- Clear ownership boundaries
- High maintainability
- Strong business consistency
- Simplified future evolution

## 3.3 Design Assumptions

The current database design is based on the following architectural assumptions:

- One Business Profile exists per workspace (one per user in the MVP).
- MongoDB Atlas is the primary and only operational database.
- Each Aggregate Root owns exactly one primary collection.
- Cross-aggregate communication occurs through application services.
- Operational workloads are prioritized over analytical reporting workloads.
- Future capabilities such as multi-user workspaces and multiple business profiles can be introduced through incremental schema evolution without redesigning aggregate boundaries.

These assumptions establish the architectural boundaries within which the database has been designed and should be considered when introducing future enhancements.

## 3.4 Aggregate Model

The database consists of the following Aggregate Roots:

| Aggregate Root    | Primary Collection   | Primary Responsibility                                              |
| ----------------- | -------------------- | ------------------------------------------------------------------- |
| Business Profile  | `business_profiles`  | Business identity, branding, banking details, invoice defaults      |
| Settings          | `settings`           | Application configuration and user preferences                      |
| Client            | `clients`            | Client information and relationship lifecycle                       |
| Relationship Note | `relationship_notes` | Private notes associated with clients                               |
| Reminder          | `reminders`          | Follow-up reminders and scheduling                                  |
| Invoice           | `invoices`           | Invoice lifecycle, financial calculations, and historical snapshots |
| Payment           | `payments`           | Payment transactions and payment history                            |
| Timeline Event    | `timeline_events`    | Immutable business activity history                                 |

Each Aggregate Root owns its business data and is responsible for enforcing all associated business rules.

## 3.5 Collection Dependency Overview

The following diagram illustrates the primary dependency flow between business aggregates. It helps developers understand how major business entities relate to one another at a high level.

```text
Business Profile
      │
      ▼
Clients
      │
      ▼
Invoices
      │
      ▼
Payments

Clients
   │
   ├── Relationship Notes
   ├── Reminders
   └── Timeline Events
```

This dependency view complements the detailed collection relationship diagram presented later in this document. It emphasizes the primary business flow rather than individual document references.

## 3.6 Collection Inventory

| Collection           | Aggregate         | Embedded Documents                                     | References                                  |
| -------------------- | ----------------- | ------------------------------------------------------ | ------------------------------------------- |
| `business_profiles`  | Business Profile  | Address, Branding, Bank Details, Invoice Defaults      | None                                        |
| `settings`           | Settings          | Preferences and Configuration                          | None                                        |
| `clients`            | Client            | Address, Contact Information, Billing Preferences      | Business Profile (future workspace support) |
| `relationship_notes` | Relationship Note | None                                                   | Client                                      |
| `reminders`          | Reminder          | None                                                   | Client                                      |
| `invoices`           | Invoice           | Line Items, Totals, Client Snapshot, Business Snapshot | Client, Payments                            |
| `payments`           | Payment           | Payment Metadata                                       | Invoice                                     |
| `timeline_events`    | Timeline Event    | Event Payload                                          | Related Business Entity                     |

## 3.7 Collection Relationships

```text
Business Profile
        │
        │ (Snapshot)
        ▼
     Invoices ───────────► Payments
        ▲
        │
     Clients
      │ │ │
      │ │ └────────► Relationship Notes
      │ │
      │ └──────────► Reminders
      │
      └────────────► Timeline Events
```

Relationship principles:

- Every collection has a single owning Aggregate Root.
- Independent business entities communicate through document references.
- Historical invoice data is preserved using embedded snapshots.
- Financial transactions remain independent documents.
- Timeline events provide an immutable audit trail of business activities.

## 3.8 High-Level Database Characteristics

The database is designed around the following characteristics:

- Business-oriented document model
- Aggregate-based ownership
- Read-optimized document structures
- Controlled denormalization
- Application-level referential integrity
- Financial data consistency
- Immutable historical records
- Incremental schema evolution
- Scalable MongoDB Atlas deployment

# 4. Collection Specifications

This section defines the design of each MongoDB collection, including its purpose, ownership, document structure, relationships, validation rules, business constraints, and indexing strategy.

## 4.1 Business Profile (`business_profiles`)

### Purpose

Stores the freelancer's business identity and default configuration used throughout the application.

This collection acts as the single source of truth for business information.

### Ownership

**Aggregate Root:** Business Profile

**Owning Module:** Business Profile Module

Only the Business Profile module may create or modify documents in this collection.

### Document Structure

| Field                | Type     | Required | Description                   |
| -------------------- | -------- | -------- | ----------------------------- |
| `_id`                | ObjectId | Yes      | Primary identifier            |
| `schemaVersion`      | Number   | Yes      | Document schema version       |
| `businessName`       | String   | Yes      | Display name of the business  |
| `legalName`          | String   | No       | Registered legal name         |
| `ownerName`          | String   | Yes      | Business owner's name         |
| `email`              | String   | Yes      | Primary business email        |
| `phone`              | String   | No       | Contact number                |
| `website`            | String   | No       | Business website              |
| `taxNumber`          | String   | No       | Tax/GST identifier            |
| `registrationNumber` | String   | No       | Business registration number  |
| `address`            | Object   | Yes      | Business address              |
| `branding`           | Object   | Yes      | Logo and brand settings       |
| `bankDetails`        | Object   | No       | Payment information           |
| `invoiceDefaults`    | Object   | Yes      | Default invoice configuration |
| `createdAt`          | Date     | Yes      | Creation timestamp            |
| `updatedAt`          | Date     | Yes      | Last update timestamp         |
| `archivedAt`         | Date     | No       | Archive timestamp             |

### Embedded Documents

#### Address

| Field      |
| ---------- |
| line1      |
| line2      |
| city       |
| state      |
| postalCode |
| country    |

#### Branding

| Field          |
| -------------- |
| logoUrl        |
| primaryColor   |
| secondaryColor |

#### Bank Details

| Field         |
| ------------- |
| accountHolder |
| bankName      |
| accountNumber |
| ifscCode      |
| upiId         |

#### Invoice Defaults

| Field                |
| -------------------- |
| currency             |
| paymentTerms         |
| defaultNotes         |
| defaultTaxRate       |
| numbering.prefix     |
| numbering.nextNumber |

### References

None.

This collection is completely self-contained.

### Validation Rules

- Business name is required.
- Owner name is required.
- Email must be valid.
- Currency must be a valid ISO-4217 currency code.
- Country must be a valid ISO country code.
- Payment terms must be greater than zero.
- Primary and secondary colors must be valid hexadecimal values.
- `createdAt` is immutable.

### Business Constraints

- Only one active Business Profile exists per workspace (one per user in the MVP).
- Business information is never updated inside issued invoices.
- Invoice defaults are applied only when creating new invoices.
- Historical invoices preserve embedded business snapshots.

### Index Strategy

| Index          | Type     |
| -------------- | -------- |
| `_id`          | Primary  |
| `email`        | Unique   |
| `businessName` | Standard |
| `createdAt`    | Standard |

### Design Decisions

- Business configuration is embedded because it has the same lifecycle.
- No references are required.
- The document is optimized for frequent reads.
- Historical invoice accuracy is maintained through snapshots instead of live references.

## 4.2 Settings (`settings`)

### Purpose

Stores application-level configuration and user preferences that control the application's behavior and appearance.

This collection centralizes configurable settings while keeping them independent from business data.

### Ownership

**Aggregate Root:** Settings

**Owning Module:** Settings Module

Only the Settings module may create or modify documents in this collection.

### Document Structure

| Field                | Type     | Required | Description                              |
| -------------------- | -------- | -------- | ---------------------------------------- |
| `_id`                | ObjectId | Yes      | Primary identifier                       |
| `schemaVersion`      | Number   | Yes      | Document schema version                  |
| `appearance`         | Object   | Yes      | Theme and display preferences            |
| `localization`       | Object   | Yes      | Language, timezone and regional settings |
| `notifications`      | Object   | Yes      | Notification preferences                 |
| `dashboard`          | Object   | Yes      | Dashboard preferences                    |
| `invoicePreferences` | Object   | Yes      | Invoice-related preferences              |
| `createdAt`          | Date     | Yes      | Creation timestamp                       |
| `updatedAt`          | Date     | Yes      | Last update timestamp                    |

### Embedded Documents

#### Appearance

| Field       |
| ----------- |
| theme       |
| accentColor |

#### Localization

| Field      |
| ---------- |
| language   |
| timezone   |
| dateFormat |
| currency   |

#### Notifications

| Field               |
| ------------------- |
| paymentReminders    |
| overdueAlerts       |
| systemNotifications |

#### Dashboard

| Field       |
| ----------- |
| defaultView |
| widgets     |

#### Invoice Preferences

| Field                |
| -------------------- |
| defaultStatus        |
| autoCalculateDueDate |
| showTaxBreakdown     |

### References

None.

All settings are stored within a single document because they share the same lifecycle.

### Validation Rules

- One settings document per workspace.
- Theme must be a supported value.
- Language must be a supported locale.
- Timezone must be a valid IANA timezone.
- Currency must be a valid ISO-4217 currency code.
- `createdAt` is immutable.

### Business Constraints

- Settings do not contain business data.
- Updating settings must never modify invoices, clients, or payments.
- New settings should have default values to maintain backward compatibility.

### Index Strategy

| Index | Type    |
| ----- | ------- |
| `_id` | Primary |

### Design Decisions

- All preferences are embedded because they are small and bounded.
- The collection is optimized for full-document reads.
- Future settings can be added without restructuring the document.

## 4.3 Clients (`clients`)

### Purpose

Stores client information and represents the primary customer relationship within the system.

This collection acts as the authoritative source for all client-related business data.

### Ownership

**Aggregate Root:** Client

**Owning Module:** Client Module

Only the Client module may create or modify documents in this collection.

### Document Structure

| Field                | Type     | Required | Description                       |
| -------------------- | -------- | -------- | --------------------------------- |
| `_id`                | ObjectId | Yes      | Primary identifier                |
| `schemaVersion`      | Number   | Yes      | Document schema version           |
| `clientCode`         | String   | No       | Optional business identifier      |
| `name`               | String   | Yes      | Client name                       |
| `companyName`        | String   | No       | Company name                      |
| `email`              | String   | No       | Primary email                     |
| `phone`              | String   | No       | Contact number                    |
| `website`            | String   | No       | Website                           |
| `taxNumber`          | String   | No       | Tax identifier                    |
| `status`             | String   | Yes      | Client status                     |
| `address`            | Object   | No       | Billing address                   |
| `billingPreferences` | Object   | No       | Billing preferences               |
| `tags`               | Array    | No       | Client tags                       |
| `notesSummary`       | String   | No       | Short summary for quick reference |
| `createdAt`          | Date     | Yes      | Creation timestamp                |
| `updatedAt`          | Date     | Yes      | Last update timestamp             |
| `archivedAt`         | Date     | No       | Archive timestamp                 |

### Embedded Documents

#### Address

| Field      |
| ---------- |
| line1      |
| line2      |
| city       |
| state      |
| postalCode |
| country    |

#### Billing Preferences

| Field                  |
| ---------------------- |
| preferredCurrency      |
| preferredPaymentMethod |
| paymentTerms           |

### References

| References         |
| ------------------ |
| Invoices           |
| Reminders          |
| Relationship Notes |
| Timeline Events    |

### Validation Rules

- Client name is required.
- Email must be valid when provided.
- Website must be a valid URL when provided.
- Status must be a supported lifecycle value.
- Tags must not contain duplicates.
- `createdAt` is immutable.

### Business Constraints

- A client may have multiple invoices.
- A client may have multiple reminders.
- A client may have multiple relationship notes.
- A client may have multiple timeline events.
- Clients should be archived rather than permanently deleted once business transactions exist.

### Index Strategy

| Index                 | Type     |
| --------------------- | -------- |
| `_id`                 | Primary  |
| `name`                | Standard |
| `email`               | Standard |
| `status`              | Standard |
| `createdAt`           | Standard |
| `(status, name)`      | Compound |
| `(status, createdAt)` | Compound |

### Design Decisions

- Client profile data is embedded because it belongs exclusively to the Client aggregate.
- Growing business history is stored in separate collections.
- References are used for invoices, reminders, notes, and timeline events to prevent unbounded document growth.
- The collection is optimized for client search, filtering, and workspace navigation.

## 4.4 Relationship Notes (`relationship_notes`)

### Purpose

Stores private notes and relationship history associated with clients.

This collection helps freelancers maintain contextual information that supports long-term client relationships without affecting financial records.

### Ownership

**Aggregate Root:** Relationship Note

**Owning Module:** Relationship Notes Module

Only the Relationship Notes module may create or modify documents in this collection.

### Document Structure

| Field           | Type     | Required | Description                          |
| --------------- | -------- | -------- | ------------------------------------ |
| `_id`           | ObjectId | Yes      | Primary identifier                   |
| `schemaVersion` | Number   | Yes      | Document schema version              |
| `clientId`      | ObjectId | Yes      | Reference to the associated client   |
| `title`         | String   | No       | Short note title                     |
| `content`       | String   | Yes      | Note content                         |
| `isPinned`      | Boolean  | Yes      | Indicates whether the note is pinned |
| `createdAt`     | Date     | Yes      | Creation timestamp                   |
| `updatedAt`     | Date     | Yes      | Last update timestamp                |

### Embedded Documents

None.

### References

| References          |
| ------------------- |
| Client (`clientId`) |

### Validation Rules

- `clientId` must reference an existing client.
- Content is required.
- Content must not be empty.
- `isPinned` defaults to `false`.
- `createdAt` is immutable.

### Business Constraints

- A client may have multiple relationship notes.
- Notes can be edited after creation.
- Pinned notes appear before regular notes.
- Deleting a client should archive or remove associated notes according to the application's data retention policy.

### Index Strategy

| Index                   | Type     |
| ----------------------- | -------- |
| `_id`                   | Primary  |
| `clientId`              | Standard |
| `createdAt`             | Standard |
| `(clientId, createdAt)` | Compound |
| `(clientId, isPinned)`  | Compound |

### Collection Design Decisions

- Notes are stored separately because they grow independently from the client profile.
- Only the client reference is stored; client information is never duplicated.
- The collection is optimized for displaying client-specific notes.

## 4.5 Reminders (`reminders`)

### Purpose

Stores reminders and follow-up tasks related to clients.

This collection helps freelancers track upcoming actions, deadlines, and client follow-ups.

### Ownership

**Aggregate Root:** Reminder

**Owning Module:** Reminder Module

Only the Reminder module may create or modify documents in this collection.

### Document Structure

| Field           | Type     | Required | Description                        |
| --------------- | -------- | -------- | ---------------------------------- |
| `_id`           | ObjectId | Yes      | Primary identifier                 |
| `schemaVersion` | Number   | Yes      | Document schema version            |
| `clientId`      | ObjectId | Yes      | Reference to the associated client |
| `title`         | String   | Yes      | Reminder title                     |
| `description`   | String   | No       | Reminder description               |
| `dueDate`       | Date     | Yes      | Scheduled reminder date            |
| `priority`      | String   | Yes      | Reminder priority                  |
| `status`        | String   | Yes      | Current reminder status            |
| `completedAt`   | Date     | No       | Completion timestamp               |
| `createdAt`     | Date     | Yes      | Creation timestamp                 |
| `updatedAt`     | Date     | Yes      | Last update timestamp              |

### Embedded Documents

None.

### References

| References          |
| ------------------- |
| Client (`clientId`) |

### Validation Rules

- `clientId` must reference an existing client.
- Title is required.
- Due date is required.
- Priority must be one of the supported values.
- Status must follow the defined reminder lifecycle.
- `completedAt` is required only when the reminder is completed.
- `createdAt` is immutable.

### Business Constraints

- A client may have multiple reminders.
- A completed reminder cannot return to a pending state unless explicitly supported by business rules.
- Reminder history should be preserved for auditing and reporting.

### Index Strategy

| Index                 | Type     |
| --------------------- | -------- |
| `_id`                 | Primary  |
| `clientId`            | Standard |
| `status`              | Standard |
| `dueDate`             | Standard |
| `(status, dueDate)`   | Compound |
| `(clientId, dueDate)` | Compound |

### Collection Design Decisions

- Reminders are stored independently because they have their own lifecycle.
- Client information is referenced rather than duplicated.
- The collection is optimized for upcoming reminders, overdue reminders, and client-specific reminder lists.

## 4.6 Invoices (`invoices`)

### Purpose

Stores invoices issued to clients and manages the complete invoice lifecycle, including financial calculations, payment tracking, historical snapshots, and invoice status.

This collection is the central financial aggregate of the application.

### Ownership

**Aggregate Root:** Invoice

**Owning Module:** Invoice Module

Only the Invoice module may create or modify documents in this collection.

### Document Structure

| Field                | Type       | Required | Description                                      |
| -------------------- | ---------- | -------- | ------------------------------------------------ |
| `_id`                | ObjectId   | Yes      | Primary identifier                               |
| `schemaVersion`      | Number     | Yes      | Document schema version                          |
| `invoiceNumber`      | String     | Yes      | Unique business invoice number                   |
| `clientId`           | ObjectId   | Yes      | Reference to the client                          |
| `status`             | String     | Yes      | Current invoice status                           |
| `issueDate`          | Date       | Yes      | Invoice issue date                               |
| `dueDate`            | Date       | Yes      | Payment due date                                 |
| `currency`           | String     | Yes      | Invoice currency                                 |
| `clientSnapshot`     | Object     | Yes      | Client details at the time of invoice creation   |
| `businessSnapshot`   | Object     | Yes      | Business details at the time of invoice creation |
| `lineItems`          | Array      | Yes      | Invoice line items                               |
| `subTotal`           | Decimal128 | Yes      | Total before taxes and discounts                 |
| `discount`           | Decimal128 | No       | Discount amount                                  |
| `taxSummary`         | Object     | No       | Tax calculation summary                          |
| `grandTotal`         | Decimal128 | Yes      | Final invoice amount                             |
| `amountPaid`         | Decimal128 | Yes      | Total payments received                          |
| `amountDue`          | Decimal128 | Yes      | Outstanding balance                              |
| `notes`              | String     | No       | Additional notes                                 |
| `termsAndConditions` | String     | No       | Invoice terms                                    |
| `createdAt`          | Date       | Yes      | Creation timestamp                               |
| `updatedAt`          | Date       | Yes      | Last update timestamp                            |

### Embedded Documents

#### Client Snapshot

| Field       |
| ----------- |
| name        |
| companyName |
| email       |
| phone       |
| address     |
| taxNumber   |

#### Business Snapshot

| Field        |
| ------------ |
| businessName |
| legalName    |
| ownerName    |
| email        |
| phone        |
| address      |
| taxNumber    |
| branding     |

#### Line Item

| Field       |
| ----------- |
| description |
| quantity    |
| unit        |
| unitPrice   |
| taxRate     |
| discount    |
| lineTotal   |

#### Tax Summary

| Field         |
| ------------- |
| taxableAmount |
| totalTax      |
| taxBreakdown  |

### References

| References          |
| ------------------- |
| Client (`clientId`) |
| Payments            |

### Validation Rules

- Invoice number must be unique.
- Client must exist.
- At least one line item is required.
- Quantity must be greater than zero.
- Unit price cannot be negative.
- Tax rate cannot be negative.
- Grand total must equal calculated totals.
- Amount paid cannot exceed grand total.
- Amount due cannot be negative.
- Currency must be a valid ISO-4217 code.
- `createdAt` is immutable.

### Invoice Lifecycle

```text
Draft
   │
   ▼
Sent
   │
   ├────────► Overdue
   │
   ▼
Partially Paid
   │
   ▼
Paid

Draft ─────────► Cancelled
Sent ──────────► Cancelled
```

### Business Constraints

- Invoice numbers are unique.
- Issued invoices preserve historical business and client information.
- Snapshots never change after invoice issuance.
- Financial totals are always derived from line items.
- Payments update invoice balances but never modify historical snapshots.
- Paid invoices cannot have an outstanding balance.
- Invoice history must remain auditable.

### Index Strategy

| Index                 | Type     |
| --------------------- | -------- |
| `_id`                 | Primary  |
| `invoiceNumber`       | Unique   |
| `clientId`            | Standard |
| `status`              | Standard |
| `issueDate`           | Standard |
| `dueDate`             | Standard |
| `(clientId, status)`  | Compound |
| `(status, dueDate)`   | Compound |
| `(issueDate, status)` | Compound |

### Collection Design Decisions

- Client and business information are embedded as immutable snapshots.
- Line items are embedded because they belong exclusively to the invoice.
- Payments remain separate documents due to their independent lifecycle.
- Financial calculations are stored to optimize read performance.
- The document represents a complete financial record that can be rendered without additional lookups.

## 4.7 Payments (`payments`)

### Purpose

Stores payment transactions received against invoices and maintains the financial payment history.

Each document represents a single payment transaction.

### Ownership

**Aggregate Root:** Payment

**Owning Module:** Payment Module

Only the Payment module may create or modify documents in this collection.

### Document Structure

| Field             | Type       | Required | Description                    |
| ----------------- | ---------- | -------- | ------------------------------ |
| `_id`             | ObjectId   | Yes      | Primary identifier             |
| `schemaVersion`   | Number     | Yes      | Document schema version        |
| `invoiceId`       | ObjectId   | Yes      | Reference to the invoice       |
| `paymentDate`     | Date       | Yes      | Payment date                   |
| `amount`          | Decimal128 | Yes      | Payment amount                 |
| `paymentMethod`   | String     | Yes      | Payment method                 |
| `referenceNumber` | String     | No       | External transaction reference |
| `notes`           | String     | No       | Internal notes                 |
| `status`          | String     | Yes      | Payment status                 |
| `createdAt`       | Date       | Yes      | Creation timestamp             |
| `updatedAt`       | Date       | Yes      | Last update timestamp          |

### Embedded Documents

None.

### References

| References            |
| --------------------- |
| Invoice (`invoiceId`) |

### Validation Rules

- Invoice must exist.
- Amount must be greater than zero.
- Amount cannot exceed outstanding balance.
- Payment date is required.
- Payment method must be supported.
- `createdAt` is immutable.

### Business Constraints

- One invoice can have multiple payments.
- Payments cannot exist without an invoice.
- Recorded payments should not be physically deleted.
- Payment corrections should follow controlled business workflows such as voiding or reversal.
- Recording a payment must update the corresponding invoice balance and status.

### Index Strategy

| Index                      | Type     |
| -------------------------- | -------- |
| `_id`                      | Primary  |
| `invoiceId`                | Standard |
| `paymentDate`              | Standard |
| `(invoiceId, paymentDate)` | Compound |

### Collection Design Decisions

- Payments remain independent financial documents.
- Invoice information is referenced rather than duplicated.
- Financial history is preserved through immutable payment records.
- The collection is optimized for invoice payment history and financial reporting.

## 4.8 Timeline Events (`timeline_events`)

### Purpose

Stores an immutable history of important business events across the application.

This collection provides a chronological audit trail of activities related to clients, invoices, payments, reminders, and other business entities.

### Ownership

**Aggregate Root:** Timeline Event

**Owning Module:** Timeline Module

Timeline events are generated by the owning business modules whenever significant business actions occur.

### Document Structure

| Field           | Type     | Required | Description                              |
| --------------- | -------- | -------- | ---------------------------------------- |
| `_id`           | ObjectId | Yes      | Primary identifier                       |
| `schemaVersion` | Number   | Yes      | Document schema version                  |
| `eventType`     | String   | Yes      | Business event type                      |
| `entityType`    | String   | Yes      | Related business entity type             |
| `entityId`      | ObjectId | Yes      | Reference to the related business entity |
| `clientId`      | ObjectId | No       | Associated client, when applicable       |
| `title`         | String   | Yes      | Event title                              |
| `description`   | String   | No       | Event description                        |
| `metadata`      | Object   | No       | Additional event-specific information    |
| `createdAt`     | Date     | Yes      | Event timestamp                          |

### Embedded Documents

#### Metadata

The metadata object stores additional information specific to the event type.

Example fields:

| Field          |
| -------------- |
| previousStatus |
| newStatus      |
| invoiceNumber  |
| paymentAmount  |
| reminderDate   |

### References

| References                           |
| ------------------------------------ |
| Related Business Entity (`entityId`) |
| Client (`clientId`) _(optional)_     |

### Validation Rules

- Event type is required.
- Entity type is required.
- Entity identifier is required.
- Title is required.
- `createdAt` is immutable.
- Metadata must contain only event-specific information.

### Business Constraints

- Timeline events are append-only.
- Existing events must never be modified.
- Timeline events should never be physically deleted.
- Every significant business action should generate a corresponding timeline event.
- Timeline events are intended for auditing and business history, not operational business logic.

### Index Strategy

| Index                    | Type     |
| ------------------------ | -------- |
| `_id`                    | Primary  |
| `entityId`               | Standard |
| `clientId`               | Standard |
| `eventType`              | Standard |
| `createdAt`              | Standard |
| `(entityId, createdAt)`  | Compound |
| `(clientId, createdAt)`  | Compound |
| `(eventType, createdAt)` | Compound |

### Collection Design Decisions

- Timeline events are immutable after creation.
- Event-specific data is stored in the metadata object to support different event types without changing the document structure.
- References are used instead of embedded business data to avoid duplication.
- The collection is optimized for chronological activity feeds, audit history, and business reporting.

# 5. Cross-Collection Design

This section defines the architectural rules that govern how collections interact, maintain consistency, and preserve clear ownership boundaries across the database.

## 5.1 Embedding Strategy

The database follows a hybrid document model that combines embedded documents with document references.

### Embed Data When

- The data belongs exclusively to a single Aggregate Root.
- The data shares the same lifecycle as its parent.
- The data is always loaded with the parent document.
- The data has a bounded size.
- The data represents immutable historical snapshots.

### Embedded Documents

| Parent Collection   | Embedded Data                                               |
| ------------------- | ----------------------------------------------------------- |
| `business_profiles` | Address, Branding, Bank Details, Invoice Defaults           |
| `settings`          | All application preferences                                 |
| `clients`           | Address, Billing Preferences                                |
| `invoices`          | Client Snapshot, Business Snapshot, Line Items, Tax Summary |

### Design Principles

- Embedded data cannot exist independently.
- Embedded documents are managed by their parent Aggregate Root.
- Embedded documents are updated together with the parent document.

## 5.2 Referencing Strategy

References are used for independent business entities with their own lifecycle.

### Use References When

- Data exists independently.
- Data changes independently.
- Data can grow without bound.
- Data belongs to another Aggregate Root.
- Data is queried independently.

### Collection References

| Source Collection    | Target Collection         |
| -------------------- | ------------------------- |
| `invoices`           | `clients`                 |
| `payments`           | `invoices`                |
| `relationship_notes` | `clients`                 |
| `reminders`          | `clients`                 |
| `timeline_events`    | Related business entities |

### Design Principles

- References use immutable ObjectIds.
- Business entities communicate through references rather than duplicated mutable data.
- Historical documents preserve snapshots instead of relying on live references.

## 5.3 Aggregate Boundaries

Each Aggregate Root defines an independent business consistency boundary.

| Aggregate Root    | Primary Collection   |
| ----------------- | -------------------- |
| Business Profile  | `business_profiles`  |
| Settings          | `settings`           |
| Client            | `clients`            |
| Relationship Note | `relationship_notes` |
| Reminder          | `reminders`          |
| Invoice           | `invoices`           |
| Payment           | `payments`           |
| Timeline Event    | `timeline_events`    |

Aggregate boundaries ensure that:

- Every collection has a single owner.
- Business rules are enforced by the owning module.
- Cross-aggregate communication occurs through application services.

## 5.4 Data Ownership

Every business field has a single authoritative owner.

| Business Data        | Owning Collection    |
| -------------------- | -------------------- |
| Business Information | `business_profiles`  |
| Client Information   | `clients`            |
| Invoice Data         | `invoices`           |
| Payment Records      | `payments`           |
| Reminder Data        | `reminders`          |
| Relationship Notes   | `relationship_notes` |
| Timeline History     | `timeline_events`    |
| Application Settings | `settings`           |

### Module Access Matrix

| Collection           | Owner Module       | Read By                                                    | Modified By               |
| -------------------- | ------------------ | ---------------------------------------------------------- | ------------------------- |
| `business_profiles`  | Business Profile   | Invoice Module                                             | Business Profile Module   |
| `settings`           | Settings           | All Modules                                                | Settings Module           |
| `clients`            | Client             | Invoice, Reminder, Relationship Notes, Timeline, Dashboard | Client Module             |
| `relationship_notes` | Relationship Notes | Client Module                                              | Relationship Notes Module |
| `reminders`          | Reminder           | Client Module, Dashboard                                   | Reminder Module           |
| `invoices`           | Invoice            | Payment, Dashboard                                         | Invoice Module            |
| `payments`           | Payment            | Invoice, Dashboard                                         | Payment Module            |
| `timeline_events`    | Timeline           | All Modules                                                | Timeline Module           |

The owning module has exclusive responsibility for creating and modifying documents within its collection. Other modules may read data as required but must never modify another module's collection directly.

### Ownership Rules

- Only the owning module may modify its collection.
- Other modules may read data but must not update it directly.
- Cross-module operations are coordinated through application services.
- Historical snapshots belong to the document that stores them.

## 5.5 Collection Relationship Overview

```text
Business Profile
        │
        │ Snapshot
        ▼
     Invoices ───────────► Payments
        ▲
        │
     Clients
      │ │ │
      │ │ └────────► Relationship Notes
      │ │
      │ └──────────► Reminders
      │
      └────────────► Timeline Events
```

### Cross-Collection Design Principles

- Each collection has a single responsibility.
- Aggregate Roots own their complete business lifecycle.
- Historical information is preserved through immutable snapshots.
- Financial transactions remain independent documents.
- Collections evolve independently while maintaining stable relationships.

# 6. Data Integrity & Consistency

This section defines how the database maintains accurate, reliable, and consistent business data throughout the application's lifecycle.

## 6.1 Data Validation

Business validation is performed by the application before data is persisted to the database.

### Validation Principles

- Validate all required fields.
- Validate data types and formats.
- Validate business constraints.
- Validate state transitions.
- Validate document references.
- Reject invalid data before persistence.

### Validation Scope

| Validation       | Example                                     |
| ---------------- | ------------------------------------------- |
| Required Fields  | Client name, invoice number, payment amount |
| Data Format      | Email, URL, currency code                   |
| Business Rules   | Payment cannot exceed outstanding balance   |
| State Transition | Only valid invoice status transitions       |
| References       | Referenced client or invoice must exist     |

## 6.2 Business Constraints

The application enforces the following business constraints:

### General Constraints

- Every document has a unique identifier.
- Every document includes a schema version.
- Every document includes creation and update timestamps.
- Business ownership is maintained by a single Aggregate Root.

### Invoice Constraints

- Invoice numbers must be unique.
- At least one line item is required.
- Financial totals must be internally consistent.
- Amount paid cannot exceed the invoice total.
- Outstanding balance cannot be negative.
- Historical snapshots cannot be modified after invoice issuance.

### Payment Constraints

- Payments require a valid invoice.
- Payment amounts must be greater than zero.
- Payments cannot exceed the outstanding invoice balance.
- Payment history must be preserved.

### Client Constraints

- Client name is required.
- Clients with business history should be archived instead of deleted.

## 6.3 Transaction Strategy

MongoDB atomic document operations are used by default.

Multi-document transactions are reserved for business operations that must succeed or fail as a single unit.

### Single-Document Operations

Examples:

- Create Client
- Update Business Profile
- Complete Reminder
- Add Relationship Note
- Update Settings

### Multi-Document Transactions

Examples:

- Record Payment
  - Create payment
  - Update invoice balance
  - Update invoice status
  - Create timeline event

- Cancel Invoice
  - Update invoice status
  - Create timeline event

### Transaction Decision Guidelines

The following guidelines define when multi-document transactions are required.

| Business Operation      | Transaction Required | Reason                                                                     |
| ----------------------- | -------------------- | -------------------------------------------------------------------------- |
| Create Client           | No                   | Single Aggregate Root                                                      |
| Update Client           | No                   | Single Aggregate Root                                                      |
| Update Business Profile | No                   | Single Aggregate Root                                                      |
| Create Reminder         | No                   | Single Aggregate Root                                                      |
| Create Invoice          | No                   | Entire operation occurs within the Invoice aggregate                       |
| Record Payment          | Yes                  | Payment creation and invoice balance/status updates must remain consistent |
| Cancel Invoice          | Yes                  | Invoice update and timeline event creation should succeed or fail together |

Transactions should be reserved for business operations that span multiple Aggregate Roots and require strong consistency.

### Transaction Principles

- Keep transactions as short as possible.
- Use transactions only when required.
- Never leave the database in a partially updated state.

## 6.4 Historical Data Preservation

Historical business records must remain accurate throughout the lifetime of the application.

### Preservation Rules

- Issued invoices are immutable.
- Client snapshots remain unchanged after invoice issuance.
- Business snapshots remain unchanged after invoice issuance.
- Payment records are preserved.
- Timeline events are append-only.
- Financial history is never rewritten.

Historical corrections are performed through controlled business operations rather than modifying existing records.

## 6.5 Consistency Strategy

The database prioritizes business correctness over implementation convenience.

### Consistency Principles

- Each Aggregate Root maintains its own consistency boundary.
- Cross-aggregate updates are coordinated through application services.
- Financial operations must remain atomic.
- Referential integrity is enforced by the application.
- Business rules are validated before every write operation.

This approach ensures long-term reliability while remaining aligned with MongoDB's document-oriented architecture.

# 7. Indexing Strategy

The indexing strategy is designed to optimize the application's most common business operations while maintaining efficient write performance and minimizing unnecessary index overhead.

## 7.1 Indexing Objectives

Indexes are designed to:

- Optimize frequently executed business queries.
- Support efficient filtering and sorting.
- Improve lookup performance.
- Enable scalable pagination.
- Maintain balanced read and write performance.

Indexes are created based on actual business access patterns rather than every searchable field.

## 7.2 Index Categories

### Primary Indexes

Every collection uses MongoDB's default primary index.

| Index |
| ----- |
| `_id` |

### Unique Indexes

Unique indexes enforce business uniqueness.

| Collection          | Field           |
| ------------------- | --------------- |
| `business_profiles` | `email`         |
| `invoices`          | `invoiceNumber` |

### Standard Indexes

Standard indexes support common filtering and lookup operations.

Typical indexed fields include:

- Name
- Email
- Status
- Issue Date
- Due Date
- Payment Date
- Created Date

### Compound Indexes

Compound indexes optimize common filtering and sorting combinations.

Examples:

| Collection        | Index                      |
| ----------------- | -------------------------- |
| `clients`         | `(status, name)`           |
| `clients`         | `(status, createdAt)`      |
| `invoices`        | `(clientId, status)`       |
| `invoices`        | `(status, dueDate)`        |
| `payments`        | `(invoiceId, paymentDate)` |
| `timeline_events` | `(entityId, createdAt)`    |

## 7.3 Query Optimization

The database is optimized for the application's primary business workflows.

Common query patterns include:

- Dashboard overview
- Client search
- Client workspace
- Invoice listing
- Invoice details
- Payment history
- Reminder management
- Timeline activity

Collections are structured to minimize unnecessary database lookups while maintaining clear ownership boundaries.

## 7.4 Pagination Strategy

Collections expected to grow continuously support indexed pagination.

These include:

- Invoices
- Payments
- Relationship Notes
- Reminders
- Timeline Events

Pagination should use indexed sorting fields to maintain consistent query performance as data volume increases.

## 7.5 Performance Guidelines

To maintain predictable database performance:

- Create indexes only for supported business queries.
- Avoid unnecessary indexes.
- Monitor index usage as the application grows.
- Review indexes whenever new query patterns are introduced.
- Keep write overhead proportional to application requirements.

Index optimization should be driven by production usage and measurable performance metrics.

## 7.6 Future Optimization

As the application grows, the indexing strategy may be extended with:

- Additional compound indexes
- Partial indexes
- Atlas Search indexes
- Reporting-specific indexes
- Archival strategies for historical records

Future optimizations should improve performance without changing the underlying data model.

# 8. Security

This section defines the security principles used to protect business data, maintain data integrity, and ensure reliable database operations.

## 8.1 Security Objectives

The database is designed to:

- Protect sensitive business information.
- Preserve financial data integrity.
- Prevent unauthorized data modifications.
- Maintain reliable audit history.
- Support secure long-term operations.

## 8.2 Responsibility Model

Security responsibilities are shared between the application and MongoDB Atlas.

| Responsibility             | Application | MongoDB Atlas |
| -------------------------- | ----------- | ------------- |
| Authentication             | ✓           |               |
| Authorization              | ✓           |               |
| Business Rule Validation   | ✓           |               |
| Input Validation           | ✓           |               |
| Data Ownership Enforcement | ✓           |               |
| Encryption at Rest         |             | ✓             |
| Encryption in Transit      |             | ✓             |
| Database Backups           |             | ✓             |
| High Availability          |             | ✓             |
| Database Monitoring        |             | ✓             |

## 8.3 Data Protection

The application protects business data by enforcing:

- Input validation before persistence.
- Business rule validation.
- Aggregate ownership boundaries.
- Controlled document updates.
- Immutable financial records.

Sensitive business information should never be modified outside the owning module.

## 8.4 Financial Data Protection

Financial records require the highest level of integrity.

The following records are treated as protected business documents:

- Issued invoices
- Payment records
- Financial calculations
- Historical invoice snapshots

Financial corrections should be performed through controlled business operations rather than modifying historical records.

## 8.5 Referential Integrity

MongoDB does not provide foreign key constraints.

The application is responsible for ensuring that:

- Referenced documents exist.
- Invalid references cannot be created.
- Business relationships remain consistent.
- Orphaned references are prevented.

## 8.6 Auditability

Important business operations should generate timeline events to provide an auditable business history.

Examples include:

- Client created
- Invoice issued
- Invoice cancelled
- Payment recorded
- Reminder completed

Timeline events are append-only and should never be modified after creation.

## 8.7 Backup and Recovery

MongoDB Atlas provides operational capabilities for:

- Automated backups
- Point-in-time recovery
- High availability
- Disaster recovery
- Monitoring and alerting

The application should rely on these managed services rather than implementing custom backup mechanisms.

## 8.8 Security Principles

The database follows these principles:

- Validate before persisting data.
- Preserve financial history.
- Enforce aggregate ownership.
- Prevent unauthorized modifications.
- Protect sensitive business information.
- Maintain complete audit history.
- Leverage MongoDB Atlas security capabilities.

# 9. Schema Evolution & Migration

This section defines how the database schema will evolve while preserving data integrity, application compatibility, and long-term maintainability.

## 9.1 Evolution Strategy

The database follows an incremental evolution strategy that allows new features to be introduced without requiring major structural redesign.

Schema evolution may include:

- Adding new optional fields.
- Introducing new embedded documents.
- Creating new collections.
- Adding or modifying indexes.
- Extending business states and enumerations.

Existing business data should remain valid throughout the evolution process.

## 9.2 Schema Versioning

Each document includes a `schemaVersion` field that identifies its document structure.

Benefits include:

- Supporting gradual schema evolution.
- Simplifying data migrations.
- Enabling backward compatibility.
- Supporting version-aware application logic.

Schema versions should only change when document structure changes in a backward-incompatible manner.

## 9.3 Migration Principles

All database migrations should follow these principles:

- Version-controlled.
- Repeatable.
- Tested before production deployment.
- Executed using migration scripts.
- Logged for audit and troubleshooting.

Manual database modifications should be avoided.

## 9.4 Backward Compatibility

Whenever practical, schema changes should remain backward compatible.

Recommended practices include:

- Introduce new fields as optional.
- Avoid renaming existing fields.
- Avoid changing field semantics.
- Remove deprecated fields only after all dependent application code has been updated.

This approach enables safer application deployments and minimizes production risk.

## 9.5 Data Preservation

Schema evolution must never compromise business data.

The following records require complete historical preservation:

- Business profiles
- Clients
- Issued invoices
- Payment records
- Relationship notes
- Reminder history
- Timeline events

Any migration affecting these collections must preserve data integrity.

## 9.6 Index Evolution

Indexes should evolve alongside application query patterns.

Index updates may include:

- Adding indexes for new features.
- Modifying compound indexes.
- Removing unused indexes after validation.
- Optimizing indexes based on production usage.

Index changes should be validated before deployment.

## 9.7 Migration Validation

Every migration should be verified before being considered complete.

Validation should confirm:

- Successful migration execution.
- Document integrity.
- Referential integrity.
- Business rule compliance.
- Expected document counts.
- Application compatibility.

Production deployments should proceed only after successful validation.

## 9.8 Future Evolution

The database design supports future enhancements without requiring structural redesign.

Potential future capabilities include:

- Recurring invoices.
- Online payment integration.
- Client portal.
- Multi-user workspaces.
- Multiple business profiles.
- File attachments.
- Advanced reporting and analytics.

These enhancements should extend the existing schema while preserving the established aggregate boundaries and collection ownership model.

# 10. Architecture Decision Records (ADR)

This section summarizes the major architectural decisions that define the database design. These decisions provide the rationale behind the selected architecture and should be reviewed before introducing significant structural changes.

| ADR     | Decision                                                                                                                           |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| ADR-001 | MongoDB Atlas is the primary database platform.                                                                                    |
| ADR-002 | The database follows a Domain-Driven Design (DDD) approach with business-oriented modeling.                                        |
| ADR-003 | Aggregate-Oriented Modeling defines the primary consistency boundaries.                                                            |
| ADR-004 | Each Aggregate Root owns a single primary collection with a clearly defined responsibility.                                        |
| ADR-005 | A hybrid document model is used, combining embedded documents with references where appropriate.                                   |
| ADR-006 | Every business field has a single authoritative owner, and cross-module updates are coordinated through application services.      |
| ADR-007 | Business consistency is prioritized through atomic document operations and selective multi-document transactions.                  |
| ADR-008 | The database is optimized around business query patterns using targeted indexing and read-optimized document structures.           |
| ADR-009 | Data integrity is enforced through application-level validation, immutable financial records, and MongoDB Atlas security features. |
| ADR-010 | The schema follows an incremental evolution strategy with versioning and controlled migrations.                                    |
| ADR-011 | `business_profiles` is the authoritative source for business identity and invoice defaults.                                        |
| ADR-012 | `settings` stores application configuration in a single embedded document.                                                         |
| ADR-013 | `clients` owns all client profile information while business history remains in separate collections.                              |
| ADR-014 | `relationship_notes` is maintained as an independent collection to support unlimited growth and separate lifecycle management.     |
| ADR-015 | `reminders` is maintained independently to support scheduling and reminder lifecycle management.                                   |
| ADR-016 | `invoices` is the primary financial aggregate, embedding immutable snapshots and line items while referencing payments.            |
| ADR-017 | `payments` is maintained as an independent financial collection with immutable transaction history.                                |
| ADR-018 | `timeline_events` provides an append-only audit trail of significant business activities.                                          |

## Decision Governance

Architecture decisions should remain stable throughout the project's lifecycle.

New ADRs should be created only when introducing significant architectural changes, including:

- New Aggregate Roots.
- Additional collections.
- Changes to aggregate boundaries.
- Major schema redesigns.
- Changes to transaction or consistency strategies.
- Fundamental changes to data ownership.
- Adoption of new persistence technologies.

Minor implementation improvements, index tuning, or non-breaking schema extensions do not require new Architecture Decision Records.

# 11. Appendix

## 11.1 Collection Naming Conventions

The database follows consistent naming conventions to improve readability and maintainability.

| Element            | Convention            | Example                                   |
| ------------------ | --------------------- | ----------------------------------------- |
| Collection Names   | `snake_case` (plural) | `business_profiles`, `relationship_notes` |
| Field Names        | `camelCase`           | `invoiceNumber`, `createdAt`              |
| Embedded Documents | `camelCase`           | `clientSnapshot`, `billingPreferences`    |
| Reference Fields   | `<entity>Id`          | `clientId`, `invoiceId`                   |
| Boolean Fields     | Descriptive prefixes  | `isArchived`, `isDefault`                 |
| Timestamp Fields   | Standard names        | `createdAt`, `updatedAt`                  |

## 11.2 Standard Document Metadata

Every business document should include the following metadata where applicable:

| Field           | Purpose                     |
| --------------- | --------------------------- |
| `_id`           | Unique document identifier  |
| `schemaVersion` | Document schema version     |
| `createdAt`     | Document creation timestamp |
| `updatedAt`     | Last modification timestamp |

These fields provide consistency across collections and simplify maintenance, auditing, and schema evolution.

## 11.3 Timestamp Standard

All timestamps follow a consistent approach throughout the database.

| Standard  | Value        |
| --------- | ------------ |
| Format    | ISO 8601     |
| Time Zone | UTC          |
| Precision | Milliseconds |

Using a single time standard prevents ambiguity and simplifies reporting, auditing, and future integrations.

## 11.4 Identifier Standards

Document identifiers follow these conventions:

- MongoDB `ObjectId` is used as the primary identifier for all collections.
- Reference fields store the corresponding `ObjectId`.
- Business identifiers (such as `invoiceNumber`) are maintained separately from database identifiers.
- Business identifiers should remain human-readable where appropriate.

## 11.5 Common Enumerations

The following business values are represented as enumerations.

| Domain              | Examples                                              |
| ------------------- | ----------------------------------------------------- |
| Invoice Status      | Draft, Sent, Overdue, Partially Paid, Paid, Cancelled |
| Reminder Status     | Pending, Completed, Cancelled                         |
| Payment Status      | Pending, Completed, Failed, Refunded                  |
| Timeline Event Type | Created, Updated, Deleted, Sent, Paid, Cancelled      |

Additional enumeration values may be introduced as new business capabilities are added.

## 11.6 Database Design Principles Summary

The database design follows these guiding principles:

- Domain-driven modeling.
- Aggregate-oriented design.
- Single ownership of business data.
- Hybrid embedding and referencing strategy.
- Immutable financial history.
- Read-optimized document structures.
- Application-enforced business integrity.
- Incremental schema evolution.
- Performance-driven indexing.
- Long-term maintainability and scalability.

## 11.7 Glossary

| Term                | Definition                                                                       |
| ------------------- | -------------------------------------------------------------------------------- |
| Aggregate           | A consistency boundary that groups related business data under a single owner.   |
| Aggregate Root      | The primary entity responsible for enforcing business rules within an aggregate. |
| Embedded Document   | A document stored inside its parent document.                                    |
| Reference           | A link to another document using its identifier.                                 |
| Snapshot            | An immutable copy of business data preserved for historical accuracy.            |
| Schema Version      | A version number identifying the document structure.                             |
| Timeline Event      | An append-only record of a significant business activity.                        |
| Business Identifier | A human-readable identifier such as an invoice number.                           |

## 11.8 References

This Database Design Specification is based on the following approved project documentation:

- Product Discovery
- Product Requirements Document (PRD)
- Domain Model
- Business Rules Specification
- Functional Specification
- UX Specification
- Wireframes
- Information Architecture
- Quality Attributes Specification
- System Architecture Specification

Together, these documents define the complete product, business, architectural, and technical foundation for the Freelancer Client & Invoice Manager.
