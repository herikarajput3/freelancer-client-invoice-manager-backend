# Business Rules Specification (BRS)

## Document Information

| Field        | Value                               |
| ------------ | ----------------------------------- |
| Project      | Freelancer Client & Invoice Manager |
| Document     | Business Rules Specification (BRS)  |
| Version      | 1.0                                 |
| Status       | Approved                            |
| Prepared By  | Product Team                        |
| Last Updated | July 2026                           |

# 1. Purpose

The Business Rules Specification (BRS) defines the business behavior governing the Freelancer Client & Invoice Manager.

Its purpose is to transform approved business requirements into explicit, implementation-independent business rules that eliminate ambiguity before technical design begins.

This document establishes the authoritative business policies that determine how the product must behave regardless of implementation technology.

It serves as the primary reference for Software Architects, UX Designers, Engineers, QA Engineers, and future product stakeholders.

# 2. Scope

This document defines business rules for all core domain concepts within the product, including:

- Business Profile
- Client
- Invoice
- Payment
- Relationship Note
- Reminder
- Timeline Event
- Business Pulse

The document focuses exclusively on business behavior and intentionally excludes technical implementation details.

# 3. Objectives

The objectives of this specification are to:

- Define explicit business behavior.
- Eliminate ambiguous business logic.
- Prevent implementation assumptions.
- Preserve consistency across the product.
- Establish business constraints and invariants.
- Support functional specifications and system design.
- Provide a reliable reference for testing and validation.

# 4. Relationship to Other Project Documents

This document is derived from the following approved project artifacts:

1. Product Discovery Document
2. Product Requirements Document (PRD)
3. Domain Model

These documents collectively represent the business source of truth.

The Business Rules Specification expands upon them by making implicit business behavior explicit.

Subsequent project documentation—including the Functional Specification, System Design, Database Design, API Specification, Backend Design, and QA Test Cases—must remain consistent with this document.

# 5. Intended Audience

This document is intended for:

- Product Managers
- Business Analysts
- UX Designers
- Software Architects
- Backend Engineers
- Frontend Engineers
- QA Engineers
- Future Project Maintainers

# 6. Guiding Principles

The following principles apply throughout this specification:

### Business First

Business rules describe how the business behaves, not how software is implemented.

### Single Source of Truth

Business behavior must originate from approved business documentation rather than engineering assumptions.

### Historical Integrity

Historical financial information must remain accurate and immutable once formally recorded.

### Consistency

Equivalent business situations must always produce consistent outcomes.

### Explicitness

Every important business decision should be documented explicitly rather than inferred.

### Simplicity

Business rules should remain as simple as possible while accurately representing real-world business behavior.

# 7. Business Rule Philosophy

Business Rules describe business truth.

They answer questions such as:

- What is allowed?
- What is prohibited?
- What must always remain true?
- Under which conditions may something occur?
- Under which conditions must it not occur?
- What business events trigger state changes?

Business Rules are intentionally independent of:

- User Interface design
- Application architecture
- Database design
- APIs
- Programming languages
- Frameworks
- Infrastructure

Implementation details belong to later project phases.

# 8. Business Rule Classification

Business Rules in this document are grouped into the following categories:

| Category               | Description                                                    |
| ---------------------- | -------------------------------------------------------------- |
| Lifecycle Rules        | Define how business concepts begin, change, and end.           |
| State Transition Rules | Define valid and invalid business state changes.               |
| Validation Rules       | Define required business information and business constraints. |
| Operational Rules      | Define permitted and prohibited business operations.           |
| Historical Rules       | Preserve historical business records and financial integrity.  |
| Domain Invariants      | Business truths that must always remain valid.                 |
| Business Events        | Significant business occurrences that affect the domain.       |

# 9. Business Rule Format

Individual business rules follow the structure below.

### Rule Identifier

A unique identifier.

Example:

- BR-BP-001
- BR-CL-004
- BR-INV-012

### Rule Statement

A concise description of the business rule.

### Business Rationale

Why the rule exists.

### Business Impact

How the rule affects business behavior.

### Related Domain Concepts

Business concepts governed by the rule.

### Source

Originating business documentation.

# 10. Terminology

The following terminology is used consistently throughout this document.

| Term              | Definition                                                 |
| ----------------- | ---------------------------------------------------------- |
| Business Profile  | The freelancer's business identity within the application. |
| Client            | A person or organization receiving services and invoices.  |
| Invoice           | A formal request for payment issued to a client.           |
| Payment           | Money received against an invoice.                         |
| Relationship Note | Non-financial information maintained about a client.       |
| Reminder          | A business task requiring future action.                   |
| Timeline Event    | An immutable record of significant business activity.      |
| Business Pulse    | A read-only summary of business performance and health.    |

# 11. Document Conventions

Throughout this specification:

- "Must" indicates a mandatory business rule.
- "Must Not" indicates a prohibited business behavior.
- "May" indicates an optional business capability.
- "Should" indicates a recommended business practice.

# 12. Document Structure

The remainder of this specification is organized as follows:

1. Business Profile
2. Client
3. Invoice
4. Payment
5. Relationship Note
6. Reminder
7. Timeline Event
8. Business Pulse
9. Cross-Concept Business Rules
10. Global Domain Invariants
11. Business Rule Decision Log
12. Assumptions
13. Glossary
14. Document Approval

# 13. Business Profile

## 13.1 Purpose

The Business Profile represents the freelancer's business identity within the application.

It serves as the owner of all business data and provides the default business information used when creating invoices.

The Business Profile establishes the business context for Clients, Invoices, Payments, Reminders, and all other domain concepts.

## 13.2 Responsibilities

The Business Profile is responsible for:

- Maintaining the freelancer's business identity.
- Providing default business information for new invoices.
- Defining default business preferences.
- Owning all business records within the workspace.

The Business Profile is **not** responsible for:

- Managing clients.
- Managing invoices.
- Recording payments.
- Tracking reminders.
- Storing relationship notes.
- Producing business analytics.

## 13.3 Lifecycle

The Business Profile follows the lifecycle below:

1. Created during initial workspace onboarding.
2. Updated whenever business information changes.
3. Remains active throughout the lifetime of the workspace.

The Business Profile is never duplicated and is not deleted through normal business operations.

## 13.4 Business Rules

### BR-BP-001 — Single Business Profile

**Rule**

Each workspace must contain exactly one Business Profile.

**Business Rationale**

A workspace represents a single freelancer or business entity.

---

### BR-BP-002 — Mandatory Business Profile

**Rule**

A Business Profile must exist before business operations can begin.

**Business Rationale**

Every Client, Invoice, and Payment belongs to a business.

---

### BR-BP-003 — Ownership

**Rule**

The Business Profile owns all business data created within the workspace.

This includes:

- Clients
- Invoices
- Payments
- Relationship Notes
- Reminders
- Timeline Events

---

### BR-BP-004 — Business Information Updates

**Rule**

Business information may be updated at any time.

Changes affect future business activities only.

Historical financial records remain unchanged.

---

### BR-BP-005 — Invoice Snapshot

**Rule**

When an Invoice is issued, the current Business Profile information must be captured as a historical snapshot.

Subsequent changes to the Business Profile must not modify issued invoices.

---

### BR-BP-006 — Default Currency

**Rule**

The Business Profile defines the default currency used when creating new invoices.

Individual invoices may use a different currency when business requirements require it.

---

### BR-BP-007 — Minimum Information Requirement

**Rule**

A Business Profile must contain at least a Business Name before normal business operations can begin.

Additional business information may be completed later.

## 13.5 State Transition Rules

| Current State | Allowed Transition | Next State |
| ------------- | ------------------ | ---------- |
| Created       | Activate           | Active     |
| Active        | Update Information | Active     |

No additional lifecycle states currently exist for the Business Profile.

## 13.6 Validation Rules

### Required Information

- Business Name

### Optional Information

- Business Logo
- Business Email
- Business Phone
- Business Address
- Website
- Tax Identification Number
- Payment Instructions
- Default Currency

### Business Constraints

- Business Name must always be present.
- Only one default currency may exist at any given time.
- Optional information may remain empty without preventing normal operation.

## 13.7 Edge Cases

The Business Profile must correctly handle the following situations:

- Business name changes after invoices have been issued.
- Business logo changes.
- Business address changes.
- Tax information changes.
- Default currency changes.
- Optional fields remain empty.
- Clients are imported after profile creation.

Historical invoices must remain unaffected by all Business Profile updates.

## 13.8 Domain Invariants

The following business truths must always remain valid:

- Exactly one Business Profile exists per workspace.
- Every Client belongs to exactly one Business Profile.
- Every Invoice belongs to exactly one Business Profile.
- Every Payment belongs to exactly one Business Profile.
- Historical invoices preserve the Business Profile snapshot captured when issued.
- Business Profile updates never modify historical financial records.

## 13.9 Business Events

The following business events may occur:

- Business Profile Created
- Business Profile Updated
- Business Logo Updated
- Business Contact Information Updated
- Business Default Currency Updated

These events may generate Timeline Events.

## 13.10 Business Rule Summary

| Rule ID   | Summary                                            |
| --------- | -------------------------------------------------- |
| BR-BP-001 | One Business Profile per workspace                 |
| BR-BP-002 | Business Profile required before operations        |
| BR-BP-003 | Business Profile owns all business records         |
| BR-BP-004 | Updates affect future activities only              |
| BR-BP-005 | Issued invoices preserve Business Profile snapshot |
| BR-BP-006 | Business Profile defines default currency          |
| BR-BP-007 | Business Name is the minimum required information  |

# 14. Client

## 14.1 Purpose

A Client represents a person or organization that receives services and invoices from the Business Profile.

Clients are the primary business relationships managed by the application and act as the ownership point for invoices, payments, relationship notes, and other client-specific business activities.

## 14.2 Responsibilities

The Client is responsible for:

- Maintaining client identity.
- Storing client contact information.
- Acting as the owner of invoices.
- Supporting long-term business relationships.
- Maintaining client-specific business preferences.

The Client is **not** responsible for:

- Invoice calculations.
- Payment transactions.
- Reminder scheduling.
- Business analytics.

## 14.3 Lifecycle

The Client lifecycle consists of:

1. Client Created
2. Client Updated
3. Client Archived
4. Client Restored

Clients are preserved as long as business history exists.

Deletion is permitted only when no business history has been created.

## 14.4 Business Rules

### BR-CL-001 — Business Profile Ownership

**Rule**

Every Client must belong to exactly one Business Profile.

**Business Rationale**

A client relationship exists within a single freelancer's business.

---

### BR-CL-002 — Independent Client Creation

**Rule**

Clients may be created before any invoices are issued.

A Client is not required to have financial history.

---

### BR-CL-003 — Duplicate Client Names

**Rule**

Multiple Clients may share the same name.

Duplicate names do not represent duplicate business entities.

**Business Rationale**

Different people or companies may legitimately have identical names.

---

### BR-CL-004 — Client Information Updates

**Rule**

Client information may be updated at any time.

Changes affect future business interactions only.

Historical invoices preserve the client information captured when they were issued.

---

### BR-CL-005 — Client Snapshot Preservation

**Rule**

When an Invoice is issued, the current Client information must be captured as a historical snapshot.

Future Client updates must never modify issued invoices.

---

### BR-CL-006 — Client Archiving

**Rule**

Clients may be archived when they become inactive.

Archiving preserves all historical business records.

Archived Clients cannot receive new invoices.

---

### BR-CL-007 — Client Restoration

**Rule**

Archived Clients may be restored to Active status.

Once restored, normal business operations may continue.

---

### BR-CL-008 — Client Deletion

**Rule**

Permanent deletion is permitted only when the Client has no business history.

Business history includes:

- Invoices
- Payments
- Relationship Notes
- Reminders
- Timeline Events

If business history exists, the Client must be archived instead.

---

### BR-CL-009 — Preferred Currency

**Rule**

A Client may define a preferred invoice currency.

This currency becomes the default for future invoices created for that Client.

Individual invoices may still use another currency when necessary.

---

### BR-CL-010 — Financial Independence

**Rule**

Client information must never directly modify existing financial records.

Historical financial documents remain immutable.

## 14.5 State Transition Rules

| Current State | Allowed Transition | Next State |
| ------------- | ------------------ | ---------- |
| Created       | Activate           | Active     |
| Active        | Archive            | Archived   |
| Archived      | Restore            | Active     |
| Active        | Delete*            | Deleted    |

\*Deletion is permitted only when no business history exists.

### Forbidden Transitions

- Archived → Deleted (when business history exists)
- Deleted → Active
- Deleted → Archived

## 14.6 Validation Rules

### Required Information

- Client Name

### Optional Information

- Company Name
- Email Address
- Phone Number
- Billing Address
- Tax Identification Number
- Preferred Currency
- Internal Notes

### Business Constraints

- Client Name must always be provided.
- Preferred Currency must be a valid business currency.
- Optional information may remain empty.
- Every Client belongs to one Business Profile only.

## 14.7 Edge Cases

The Client domain must correctly support:

- Multiple Clients sharing the same name.
- Clients without invoices.
- Clients with unpaid invoices.
- Clients with overdue invoices.
- Clients archived while invoices remain unpaid.
- Client company name changes.
- Client billing address changes.
- Client restoration after long periods of inactivity.
- Imported Clients.
- Clients using different currencies.

## 14.8 Domain Invariants

The following business truths must always remain valid:

- Every Client belongs to exactly one Business Profile.
- Every Invoice belongs to exactly one Client.
- A Client may have zero or many Invoices.
- Client updates never modify historical invoices.
- Archived Clients preserve complete business history.
- Clients with financial history cannot be permanently deleted.

## 14.9 Business Events

The following business events may occur:

- Client Created
- Client Updated
- Client Archived
- Client Restored
- Client Deleted
- Client Preferred Currency Updated

These events may generate Timeline Events.

## 14.10 Business Rule Summary

| Rule ID   | Summary                                       |
| --------- | --------------------------------------------- |
| BR-CL-001 | Every Client belongs to one Business Profile  |
| BR-CL-002 | Clients may exist without invoices            |
| BR-CL-003 | Duplicate Client names are allowed            |
| BR-CL-004 | Client updates affect future business only    |
| BR-CL-005 | Issued invoices preserve Client snapshot      |
| BR-CL-006 | Archived Clients cannot receive new invoices  |
| BR-CL-007 | Archived Clients may be restored              |
| BR-CL-008 | Delete only when no business history exists   |
| BR-CL-009 | Preferred Currency supported                  |
| BR-CL-010 | Historical financial records remain unchanged |

# 15. Invoice

## 15.1 Purpose

An Invoice represents a formal request for payment issued by the Business Profile to a Client for products or services provided.

It serves as the primary financial document within the application and acts as the source of truth for payment tracking, outstanding balances, financial history, and business reporting.

## 15.2 Responsibilities

The Invoice is responsible for:

- Representing a financial agreement.
- Recording billable items.
- Tracking payment status.
- Maintaining outstanding balances.
- Preserving historical financial records.
- Triggering invoice-related business events.

The Invoice is **not** responsible for:

- Managing client information.
- Recording payment transactions.
- Managing reminders.
- Maintaining relationship notes.
- Producing business analytics.

## 15.3 Lifecycle

The Invoice lifecycle consists of the following business states:

1. Draft
2. Issued
3. Partially Paid
4. Paid
5. Overdue
6. Cancelled

Issued invoices remain part of the permanent business history.

Draft invoices may be deleted.

## 15.4 Business Rules

### BR-INV-001 — Invoice Ownership

**Rule**

Every Invoice must belong to exactly one Client.

Every Invoice also belongs to exactly one Business Profile through its Client relationship.

---

### BR-INV-002 — Draft Creation

**Rule**

Invoices are initially created as Drafts.

Draft invoices may be freely modified until issued.

---

### BR-INV-003 — Invoice Number

**Rule**

Every Invoice must have a unique Invoice Number within the Business Profile.

Invoice Numbers must never be reused.

---

### BR-INV-004 — Required Financial Information

**Rule**

An Invoice cannot be issued unless it contains all mandatory financial information.

Required information includes:

- Client
- Invoice Number
- Issue Date
- Due Date
- Currency
- At least one billable item
- Invoice Total

---

### BR-INV-005 — Invoice Issue

**Rule**

Issuing an Invoice represents the official creation of a financial obligation.

Once issued, the Invoice becomes part of the permanent financial history.

---

### BR-INV-006 — Business Snapshot

**Rule**

When an Invoice is issued, the current Business Profile information must be preserved as an immutable snapshot.

Future Business Profile changes must not modify issued invoices.

---

### BR-INV-007 — Client Snapshot

**Rule**

When an Invoice is issued, the current Client information must be preserved as an immutable snapshot.

Future Client updates must not modify issued invoices.

---

### BR-INV-008 — Financial Immutability

**Rule**

Once issued, the following information must not change:

- Invoice Number
- Currency
- Billable Items
- Prices
- Taxes
- Totals
- Client Snapshot
- Business Snapshot

Only non-financial internal information may be updated.

---

### BR-INV-009 — Partial Payments

**Rule**

Invoices may receive one or more partial payments.

Each payment reduces the outstanding balance.

---

### BR-INV-010 — Outstanding Balance

**Rule**

Outstanding Balance equals:

Invoice Total − Recorded Payments

Outstanding Balance must never become negative.

---

### BR-INV-011 — Overpayments

**Rule**

The combined value of recorded payments must never exceed the Invoice Total.

### BR-INV-012 — Invoice Completion

**Rule**

An Invoice becomes Paid when the Outstanding Balance reaches zero.

### BR-INV-013 — Overdue Invoices

**Rule**

If an Invoice is not fully paid by its Due Date, it becomes Overdue.

Partial payment does not prevent an Invoice from becoming Overdue when an outstanding balance remains.

### BR-INV-014 — Invoice Cancellation

**Rule**

Only unpaid issued invoices may be cancelled.

Partially Paid or Paid invoices cannot be cancelled.

Cancelled invoices remain part of the business history.

### BR-INV-015 — Invoice Deletion

**Rule**

Only Draft invoices may be permanently deleted.

Issued invoices must always be preserved.

## 15.5 State Transition Rules

| Current State  | Allowed Transition     | Next State     |
| -------------- | ---------------------- | -------------- |
| Draft          | Issue                  | Issued         |
| Draft          | Delete                 | Deleted        |
| Issued         | Record Partial Payment | Partially Paid |
| Issued         | Record Full Payment    | Paid           |
| Issued         | Due Date Passes        | Overdue        |
| Issued         | Cancel                 | Cancelled      |
| Partially Paid | Additional Payment     | Partially Paid |
| Partially Paid | Remaining Balance Paid | Paid           |
| Partially Paid | Due Date Passes        | Overdue        |
| Overdue        | Partial Payment        | Overdue        |
| Overdue        | Remaining Balance Paid | Paid           |

### Forbidden State Transitions

- Paid → Draft
- Paid → Cancelled
- Paid → Issued
- Cancelled → Issued
- Cancelled → Draft
- Deleted → Any State

## 15.6 Validation Rules

### Required Information

- Client
- Invoice Number
- Issue Date
- Due Date
- Currency
- At least one billable item
- Invoice Total

### Business Constraints

- Invoice Total must be greater than zero.
- Due Date cannot precede the Issue Date.
- Currency must be defined before issuance.
- Invoice Number must be unique.
- At least one billable item is required.
- Outstanding Balance cannot become negative.

## 15.7 Edge Cases

The Invoice domain must correctly support:

- Draft invoices abandoned before issue.
- Invoice issued on the same day it is due.
- Multiple partial payments.
- Invoice becoming overdue after partial payment.
- Invoice fully paid after becoming overdue.
- Client archived after Invoice issuance.
- Business Profile updated after Invoice issuance.
- Attempted duplicate Invoice Numbers.
- Attempted overpayment.
- Attempted modification of financial data after issuance.
- Attempted cancellation after payment has been recorded.

## 15.8 Domain Invariants

The following business truths must always remain valid:

- Every Invoice belongs to exactly one Client.
- Every Invoice belongs to exactly one Business Profile.
- Invoice Numbers are unique.
- Issued invoices preserve historical snapshots.
- Financial information becomes immutable after issuance.
- Outstanding Balance is never negative.
- Total Payments never exceed the Invoice Total.
- Issued invoices are never permanently deleted.

## 15.9 Business Events

The following business events may occur:

- Invoice Draft Created
- Invoice Updated
- Invoice Issued
- Invoice Partially Paid
- Invoice Fully Paid
- Invoice Became Overdue
- Invoice Cancelled
- Invoice Deleted (Draft Only)

These events may generate Timeline Events and refresh Business Pulse metrics.

## 15.10 Business Rule Summary

| Rule ID    | Summary                                |
| ---------- | -------------------------------------- |
| BR-INV-001 | Every Invoice belongs to one Client    |
| BR-INV-002 | Invoices begin as Drafts               |
| BR-INV-003 | Invoice Numbers are unique             |
| BR-INV-004 | Required information before issuance   |
| BR-INV-005 | Issuing creates a financial obligation |
| BR-INV-006 | Preserve Business Profile snapshot     |
| BR-INV-007 | Preserve Client snapshot               |
| BR-INV-008 | Financial data becomes immutable       |
| BR-INV-009 | Partial Payments supported             |
| BR-INV-010 | Outstanding Balance tracked            |
| BR-INV-011 | Overpayments prohibited                |
| BR-INV-012 | Zero balance means Paid                |
| BR-INV-013 | Unpaid invoices become Overdue         |
| BR-INV-014 | Only unpaid invoices may be cancelled  |
| BR-INV-015 | Only Draft invoices may be deleted     |

# 16. Payment

## 16.1 Purpose

A Payment represents money received from a Client against an issued Invoice.

Payments provide the official record of financial settlements and determine the payment status of an Invoice.

## 16.2 Responsibilities

The Payment is responsible for:

- Recording money received.
- Reducing the outstanding invoice balance.
- Updating invoice payment status.
- Preserving financial payment history.

The Payment is **not** responsible for:

- Modifying invoice totals.
- Editing invoice contents.
- Managing clients.
- Cancelling invoices.

## 16.3 Lifecycle

The Payment lifecycle consists of:

1. Recorded
2. Voided

Payments become part of the permanent financial history once recorded.

## 16.4 Business Rules

### BR-PAY-001 — Invoice Association

**Rule**

Every Payment must belong to exactly one Invoice.

---

### BR-PAY-002 — Positive Payment Amount

**Rule**

Payment Amount must be greater than zero.

---

### BR-PAY-003 — Partial Payments

**Rule**

Multiple Payments may be recorded against the same Invoice.

Each Payment reduces the Outstanding Balance.

---

### BR-PAY-004 — Payment Status Updates

**Rule**

Recording Payments automatically updates the associated Invoice status.

- Outstanding Balance > 0 → Partially Paid
- Outstanding Balance = 0 → Paid

---

### BR-PAY-005 — Overpayment Prevention

**Rule**

Total recorded Payments must never exceed the Invoice Total.

---

### BR-PAY-006 — Payment Correction

**Rule**

Incorrect Payments must be corrected by voiding the original Payment and recording a replacement.

Historical Payment records must never be removed.

---

### BR-PAY-007 — Payment Deletion

**Rule**

Payments cannot be permanently deleted.

---

## 16.5 State Transition Rules

| Current State | Allowed Transition | Next State |
| ------------- | ------------------ | ---------- |
| Recorded      | Void               | Voided     |

### Forbidden Transitions

- Voided → Recorded
- Recorded → Deleted
- Voided → Deleted

---

## 16.6 Validation Rules

### Required Information

- Invoice
- Payment Amount
- Payment Date

### Business Constraints

- Payment Amount must be greater than zero.
- Payment Amount must not exceed the remaining balance.
- Cancelled Invoices cannot receive Payments.

---

## 16.7 Edge Cases

The Payment domain must correctly support:

- Multiple Payments on the same Invoice.
- Final Payment exactly matching the remaining balance.
- Attempted overpayment.
- Recording Payment for an Overdue Invoice.
- Voiding an incorrectly recorded Payment.

---

## 16.8 Domain Invariants

- Every Payment belongs to one Invoice.
- Outstanding Balance is never negative.
- Payments never modify Invoice Totals.
- Payments are permanently preserved.
- Voided Payments remain part of the business history.

---

## 16.9 Business Events

- Payment Recorded
- Payment Voided
- Invoice Partially Paid
- Invoice Fully Paid

These events may generate Timeline Events and refresh Business Pulse metrics.

---

## 16.10 Business Rule Summary

| Rule ID    | Summary                              |
| ---------- | ------------------------------------ |
| BR-PAY-001 | Every Payment belongs to one Invoice |
| BR-PAY-002 | Payment Amount must be positive      |
| BR-PAY-003 | Partial Payments supported           |
| BR-PAY-004 | Payments update Invoice status       |
| BR-PAY-005 | Overpayments prohibited              |
| BR-PAY-006 | Payments corrected by voiding        |
| BR-PAY-007 | Payments cannot be deleted           |

---

# 17. Relationship Note

## 17.1 Purpose

A Relationship Note stores non-financial information about a Client to help maintain long-term business relationships.

Examples include communication preferences, meeting summaries, follow-up ideas, and personal notes.

---

## 17.2 Responsibilities

Relationship Notes are responsible for:

- Recording client-specific business information.
- Supporting relationship management.

They are **not** responsible for:

- Financial records.
- Invoice management.
- Payment tracking.

---

## 17.3 Lifecycle

1. Created
2. Updated
3. Deleted

---

## 17.4 Business Rules

### BR-RN-001 — Client Ownership

Every Relationship Note belongs to exactly one Client.

---

### BR-RN-002 — Unlimited Notes

Clients may have any number of Relationship Notes.

---

### BR-RN-003 — Financial Independence

Relationship Notes never modify financial records.

---

### BR-RN-004 — Editing

Relationship Notes may be updated at any time.

---

### BR-RN-005 — Deletion

Relationship Notes may be permanently deleted because they are not financial records.

---

## 17.5 State Transition Rules

| Current State     | Allowed Transition | Next State |
| ----------------- | ------------------ | ---------- |
| Created           | Edit               | Updated    |
| Created / Updated | Delete             | Deleted    |

---

## 17.6 Validation Rules

### Required Information

- Client
- Note Content

---

## 17.7 Edge Cases

- Multiple Notes for one Client.
- Client archived.
- Client restored.

---

## 17.8 Domain Invariants

- Every Note belongs to one Client.
- Notes never modify financial data.

---

## 17.9 Business Events

- Relationship Note Created
- Relationship Note Updated
- Relationship Note Deleted

---

## 17.10 Business Rule Summary

| Rule ID   | Summary                          |
| --------- | -------------------------------- |
| BR-RN-001 | Every Note belongs to one Client |
| BR-RN-002 | Unlimited Notes allowed          |
| BR-RN-003 | Notes never affect finances      |
| BR-RN-004 | Notes may be edited              |
| BR-RN-005 | Notes may be deleted             |

---

# 18. Reminder

## 18.1 Purpose

A Reminder represents a future business action that requires attention.

Reminders help freelancers stay organized and maintain timely communication and financial follow-up.

---

## 18.2 Responsibilities

A Reminder is responsible for:

- Tracking pending business actions.
- Supporting productivity.
- Encouraging timely follow-up.

It is **not** responsible for:

- Performing business actions automatically.
- Modifying business data.

---

## 18.3 Lifecycle

1. Pending
2. Completed

or

1. Pending
2. Cancelled

---

## 18.4 Business Rules

### BR-REM-001 — Ownership

Every Reminder belongs to one Business Profile.

It may optionally reference one Client and/or one Invoice.

### BR-REM-002 — Completion

Completed Reminders cannot return to Pending.

### BR-REM-003 — Cancellation

Cancelled Reminders cannot be completed.

### BR-REM-004 — Historical Preservation

Completed and Cancelled Reminders remain in history.

## 18.5 State Transition Rules

| Current State | Allowed Transition | Next State |
| ------------- | ------------------ | ---------- |
| Pending       | Complete           | Completed  |
| Pending       | Cancel             | Cancelled  |

### Forbidden Transitions

- Completed → Pending
- Cancelled → Pending
- Cancelled → Completed

## 18.6 Validation Rules

### Required Information

- Title
- Due Date

### Optional Information

- Client
- Invoice
- Description

## 18.7 Edge Cases

- Reminder becomes overdue.
- Linked Invoice becomes Paid before Reminder completion.
- Linked Client archived.
- Reminder completed after Due Date.

## 18.8 Domain Invariants

- Every Reminder belongs to one Business Profile.
- Reminder has only one active state.
- Reminder history is preserved.

## 18.9 Business Events

- Reminder Created
- Reminder Completed
- Reminder Cancelled
- Reminder Overdue

## 18.10 Business Rule Summary

| Rule ID    | Summary                                  |
| ---------- | ---------------------------------------- |
| BR-REM-001 | Reminder belongs to one Business Profile |
| BR-REM-002 | Completion is final                      |
| BR-REM-003 | Cancelled Reminders cannot be completed  |
| BR-REM-004 | Reminder history is preserved            |

# 19. Timeline Event

## 19.1 Purpose

A Timeline Event represents an immutable historical record of significant business activity within the application.

Timeline Events provide a chronological audit trail that helps users understand what happened, when it happened, and which business entity was involved.

---

## 19.2 Responsibilities

Timeline Events are responsible for:

- Recording significant business activities.
- Preserving historical business context.
- Supporting auditing and activity tracking.
- Providing chronological business history.

Timeline Events are **not** responsible for:

- Triggering business processes.
- Modifying business data.
- Replacing Relationship Notes.

---

## 19.3 Lifecycle

The Timeline Event lifecycle consists of a single state:

1. Recorded

Timeline Events are automatically created and permanently preserved.

---

## 19.4 Business Rules

### BR-TL-001 — Automatic Creation

**Rule**

Timeline Events are created automatically when supported business events occur.

Users cannot manually create Timeline Events.

---

### BR-TL-002 — Immutability

**Rule**

Timeline Events cannot be edited after creation.

---

### BR-TL-003 — Permanent History

**Rule**

Timeline Events cannot be deleted.

---

### BR-TL-004 — Business Reference

**Rule**

Every Timeline Event must reference the business entity that generated it.

Examples include:

- Business Profile
- Client
- Invoice
- Payment
- Reminder
- Relationship Note

---

### BR-TL-005 — Chronological Order

**Rule**

Timeline Events are always presented in chronological order.

---

## 19.5 Validation Rules

Every Timeline Event must contain:

- Event Type
- Event Timestamp
- Related Business Entity
- Human-readable Description

---

## 19.6 Edge Cases

The Timeline domain must correctly support:

- Multiple events occurring simultaneously.
- Archived Clients with historical events.
- Cancelled Invoices.
- Voided Payments.
- Completed Reminders.

---

## 19.7 Domain Invariants

- Timeline Events are immutable.
- Timeline Events never modify business data.
- Timeline Events always represent completed business events.
- Timeline Events permanently preserve business history.

---

## 19.8 Business Events

Timeline Events are generated for:

- Business Profile Created
- Business Profile Updated
- Client Created
- Client Updated
- Client Archived
- Client Restored
- Invoice Created
- Invoice Issued
- Invoice Cancelled
- Invoice Became Overdue
- Payment Recorded
- Payment Voided
- Reminder Created
- Reminder Completed
- Relationship Note Created

---

## 19.9 Business Rule Summary

| Rule ID   | Summary                                           |
| --------- | ------------------------------------------------- |
| BR-TL-001 | Timeline Events are automatically created         |
| BR-TL-002 | Timeline Events are immutable                     |
| BR-TL-003 | Timeline Events are never deleted                 |
| BR-TL-004 | Every Timeline Event references a business entity |
| BR-TL-005 | Timeline is chronological                         |

---

# 20. Business Pulse

## 20.1 Purpose

Business Pulse provides a real-time summary of business performance by presenting key business metrics derived from existing domain data.

Business Pulse is informational only and never creates or modifies business records.

---

## 20.2 Responsibilities

Business Pulse is responsible for:

- Presenting business health.
- Summarizing financial activity.
- Highlighting business trends.
- Surfacing actionable business insights.

Business Pulse is **not** responsible for:

- Financial calculations beyond reporting.
- Editing business records.
- Performing business operations.

---

## 20.3 Lifecycle

Business Pulse has no independent lifecycle.

Its values are continuously derived from current business records.

---

## 20.4 Business Rules

### BR-BPULSE-001 — Read-Only

Business Pulse is read-only.

Users cannot manually edit Business Pulse metrics.

---

### BR-BPULSE-002 — Derived Data

Business Pulse derives all information from existing business records.

No independent business data is stored.

---

### BR-BPULSE-003 — Automatic Refresh

Business Pulse reflects the current state of the business whenever relevant business records change.

---

### BR-BPULSE-004 — Financial Accuracy

Cancelled Invoices do not contribute to financial metrics.

Voided Payments do not contribute to revenue calculations.

---

### BR-BPULSE-005 — Business Metrics

Business Pulse summarizes information including:

- Total Clients
- Active Clients
- Archived Clients
- Total Invoices
- Draft Invoices
- Issued Invoices
- Paid Invoices
- Overdue Invoices
- Outstanding Balance
- Revenue Received
- Pending Revenue
- Upcoming Reminders

---

## 20.5 Validation Rules

Business Pulse metrics must always:

- Reflect valid business records.
- Exclude invalid financial records.
- Never produce negative balances.

---

## 20.6 Edge Cases

Business Pulse must correctly support:

- New businesses with no Clients.
- Businesses with no Invoices.
- All Invoices paid.
- All Invoices overdue.
- Archived Clients with financial history.
- Voided Payments.

---

## 20.7 Domain Invariants

- Business Pulse is read-only.
- Metrics are derived only from business records.
- Business Pulse never modifies business data.

---

## 20.8 Business Events

Business Pulse refreshes after:

- Client Created
- Client Archived
- Invoice Issued
- Invoice Paid
- Invoice Cancelled
- Payment Recorded
- Payment Voided
- Reminder Completed

---

## 20.9 Business Rule Summary

| Rule ID       | Summary                                   |
| ------------- | ----------------------------------------- |
| BR-BPULSE-001 | Business Pulse is read-only               |
| BR-BPULSE-002 | Metrics are derived from business records |
| BR-BPULSE-003 | Metrics refresh automatically             |
| BR-BPULSE-004 | Invalid financial records excluded        |
| BR-BPULSE-005 | Business Pulse summarizes business health |

---

# 21. Cross-Concept Business Rules

The following rules apply across multiple domain concepts.

### BR-CC-001 — Business Ownership

Every business record belongs to exactly one Business Profile.

---

### BR-CC-002 — Historical Preservation

Historical financial records must never be modified or removed.

---

### BR-CC-003 — Financial Integrity

Financial calculations must always remain internally consistent.

Outstanding balances must never become negative.

---

### BR-CC-004 — Snapshot Preservation

Business Profile and Client information captured by an issued Invoice remains permanently preserved.

---

### BR-CC-005 — Auditability

Every significant business event must remain historically traceable.

---

### BR-CC-006 — Business Consistency

Equivalent business situations must always produce equivalent business outcomes.

# 22. Global Domain Invariants

The following business truths apply to the entire product.

- Every Business Profile owns all business data.
- Every Client belongs to one Business Profile.
- Every Invoice belongs to one Client.
- Every Payment belongs to one Invoice.
- Invoice Numbers are unique.
- Historical financial records are immutable.
- Payments never exceed Invoice totals.
- Outstanding balances are never negative.
- Timeline Events are immutable.
- Business Pulse is read-only.
- Archived business records preserve history.
- Financial records are never permanently deleted after issuance.

# 23. Business Rule Decision Log

The following table summarizes the key business decisions approved during product discovery, requirements analysis, and business rule specification.

| Area              | Decision                                            | Business Rationale                                     |
| ----------------- | --------------------------------------------------- | ------------------------------------------------------ |
| Business Profile  | One Business Profile per workspace                  | Represents a single freelancer or business identity    |
| Business Profile  | Business Name is the minimum required information   | Reduces onboarding friction                            |
| Business Profile  | Business updates affect future invoices only        | Preserve historical financial accuracy                 |
| Client            | Clients may exist without invoices                  | Supports CRM-first workflows                           |
| Client            | Duplicate Client names are allowed                  | Different clients may legitimately share the same name |
| Client            | Archived Clients cannot receive new invoices        | Archived represents an inactive business relationship  |
| Client            | Clients with business history cannot be deleted     | Preserve business history                              |
| Client            | Preferred Currency is supported                     | Simplifies international invoicing                     |
| Invoice           | All invoices begin as Drafts                        | Allows review before issuing                           |
| Invoice           | Invoice Numbers are unique and never reused         | Ensures financial traceability                         |
| Invoice           | Issued invoices are financially immutable           | Protects legal and financial integrity                 |
| Invoice           | Business Profile and Client snapshots are preserved | Historical documents must remain accurate              |
| Invoice           | Partial payments are supported                      | Reflects real-world freelancer workflows               |
| Invoice           | Overpayments are prohibited                         | Prevents financial inconsistencies                     |
| Invoice           | Only unpaid invoices may be cancelled               | Prevents loss of financial history                     |
| Invoice           | Only Draft invoices may be deleted                  | Protects issued financial documents                    |
| Payment           | Payments belong to exactly one Invoice              | Maintains ownership integrity                          |
| Payment           | Payments are corrected by voiding, not editing      | Preserves audit history                                |
| Payment           | Payments cannot be deleted                          | Maintains financial auditability                       |
| Relationship Note | Notes are non-financial and may be deleted          | No impact on financial history                         |
| Reminder          | Completed reminders are final                       | Prevents inconsistent task tracking                    |
| Timeline Event    | Automatically generated and immutable               | Ensures reliable business history                      |
| Business Pulse    | Read-only and derived from business data            | Maintains a single source of truth                     |

# 24. Business Rule Traceability Matrix

This specification is derived from previously approved project artifacts.

| Source Document                     | Contribution to Business Rules                                       |
| ----------------------------------- | -------------------------------------------------------------------- |
| Product Discovery                   | Business vision, objectives, product principles, user goals          |
| Product Requirements Document (PRD) | Functional requirements and product behavior                         |
| Domain Model                        | Business concepts, responsibilities, relationships, and lifecycles   |
| Business Rules Specification        | Explicit business behavior, constraints, validations, and invariants |

This traceability ensures every business rule can be traced back to an approved business decision.

# 25. Business Rule Coverage Checklist

The following checklist confirms that every domain concept has been fully specified.

| Domain Concept    | Purpose | Lifecycle | Rules | States | Validation | Edge Cases | Invariants | Events |
| ----------------- | :-----: | :-------: | :---: | :----: | :--------: | :--------: | :--------: | :----: |
| Business Profile  |    ✓    |     ✓     |   ✓   |   ✓    |     ✓      |     ✓      |     ✓      |   ✓    |
| Client            |    ✓    |     ✓     |   ✓   |   ✓    |     ✓      |     ✓      |     ✓      |   ✓    |
| Invoice           |    ✓    |     ✓     |   ✓   |   ✓    |     ✓      |     ✓      |     ✓      |   ✓    |
| Payment           |    ✓    |     ✓     |   ✓   |   ✓    |     ✓      |     ✓      |     ✓      |   ✓    |
| Relationship Note |    ✓    |     ✓     |   ✓   |   ✓    |     ✓      |     ✓      |     ✓      |   ✓    |
| Reminder          |    ✓    |     ✓     |   ✓   |   ✓    |     ✓      |     ✓      |     ✓      |   ✓    |
| Timeline Event    |    ✓    |     ✓     |   ✓   |   ✓    |     ✓      |     ✓      |     ✓      |   ✓    |
| Business Pulse    |    ✓    |     ✓     |   ✓   |  N/A   |     ✓      |     ✓      |     ✓      |   ✓    |

# 26. Assumptions

The following assumptions apply throughout this specification.

- The application manages a single Business Profile per workspace.
- Every financial record belongs to one Business Profile.
- Historical financial records are preserved indefinitely.
- Users act in good faith and have permission to manage their business data.
- Business rules are independent of implementation technology.
- Currency conversion is outside the scope of this product.
- Tax regulations vary by jurisdiction and are handled through configurable business information rather than fixed business rules.

# 27. Future Considerations (Out of Scope)

The following capabilities are intentionally excluded from the current product scope.

- Multiple Business Profiles within one workspace.
- Multi-user collaboration and role-based permissions.
- Recurring invoices.
- Subscription billing.
- Credit notes.
- Refund management.
- Automated tax calculations.
- Multi-language invoice generation.
- Multi-currency exchange rate management.
- Client portals.
- Accounting system integrations.
- Payment gateway integrations.
- AI-powered business insights.

These capabilities may be evaluated in future versions without affecting the current business rules.

# 28. Glossary

| Term                | Definition                                                      |
| ------------------- | --------------------------------------------------------------- |
| Business Profile    | The freelancer's business identity within the application.      |
| Client              | A person or organization receiving products or services.        |
| Invoice             | A formal request for payment issued to a Client.                |
| Payment             | Money received against an Invoice.                              |
| Outstanding Balance | Invoice Total minus all recorded Payments.                      |
| Draft Invoice       | An editable invoice that has not yet been issued.               |
| Issued Invoice      | A finalized invoice representing a financial obligation.        |
| Overdue Invoice     | An invoice with an unpaid balance after its due date.           |
| Timeline Event      | An immutable historical record of business activity.            |
| Business Pulse      | Read-only business metrics derived from existing business data. |
| Domain Invariant    | A business truth that must always remain valid.                 |
| Business Event      | A significant occurrence that changes business state.           |

# 29. Document Approval

## Approval Status

**Status:** Approved

This Business Rules Specification has been reviewed against the approved:

- Product Discovery Document
- Product Requirements Document (PRD)
- Domain Model

The document is considered the authoritative definition of business behavior for the Freelancer Client & Invoice Manager.

Subsequent project artifacts—including the Functional Specification, System Design, Database Design, API Specification, Backend Design, Frontend Design, and QA Test Cases—must remain consistent with the business rules defined in this document.
