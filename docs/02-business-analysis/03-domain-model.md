# Domain Model

## Purpose

The Domain Model defines the core business concepts and their
relationships for the Freelancer Client & Invoice Manager. It serves as
the business foundation between the Product Requirements Document (PRD)
and System Design, ensuring the application models how freelancers
naturally manage clients, invoices, payments, and business relationships
without introducing implementation details.

## Core Business Concepts

**Business Profile** represents the freelancer or business using the application. It owns all business data within the workspace, provides the default business information for invoices, and establishes the business context for all other domain concepts. It maintains business identity while preserving historical financial records through immutable snapshots captured when invoices are issued.

**Client** represents an individual or organization that hires the freelancer. A Client belongs to exactly one Business Profile, may exist before any financial activity, and can have multiple engagements over time. Clients may be archived to preserve business history, while permanent deletion is allowed only when no business history exists. Changes to Client information affect future business activities without altering historical invoices.

**Invoice** is a formal request for payment issued to exactly one Client. It represents a financial obligation and progresses through its business lifecycle from Draft to completion, cancellation, or overdue status. Once issued, its financial information and Business Profile and Client snapshots become immutable to preserve historical integrity.

**Payment** records money received against exactly one Invoice. Multiple Payments may be recorded for an Invoice to support partial payments. Payments reduce the outstanding balance, automatically influence the Invoice's payment status, and become permanent business records. Incorrect Payments are corrected by voiding rather than modification or deletion.

**Relationship Note** stores non-financial information about a client,
such as communication preferences, meeting summaries, or future
opportunities, helping maintain long-term business relationships.

**Reminder** represents future actions the freelancer intends to
complete, such as following up with a client or requesting missing
information.

**Timeline Event** captures significant business activities as immutable historical records. Timeline Events are generated automatically from approved business events, preserve chronological business history, and never modify business data.

**Business Pulse** provides a read-only summary of business performance by deriving information from Clients, Invoices, Payments, Reminders, and other business records. It never owns or modifies business data and always reflects the current valid business state.

**Notification** informs the freelancer about important business events
that require attention, such as overdue invoices or upcoming reminders.

## Business Relationships

The Business Profile owns all business data within a single workspace.

Each Client belongs to exactly one Business Profile.

Each Invoice belongs to exactly one Client and, through that relationship, exactly one Business Profile.

Each Payment belongs to exactly one Invoice.

A Client may own multiple Relationship Notes, Reminders, and Timeline Events.

Timeline Events reference significant business activities across multiple domain concepts while remaining immutable historical records.

Business Pulse derives information from all relevant business concepts without owning or modifying business data.

## Domain Invariants

The domain is governed by the following business truths:

- Every Business Profile owns all business data within its workspace.
- Every Client belongs to exactly one Business Profile.
- Every Invoice belongs to exactly one Client.
- Every Payment belongs to exactly one Invoice.
- A Client may have zero or many Invoices.
- An Invoice may have zero or many Payments.
- Issued Invoices preserve immutable Business Profile and Client snapshots.
- Historical financial records remain immutable once formally recorded.
- Outstanding balances never become negative.
- Recorded Payments never exceed the corresponding Invoice Total.
- Archived Clients preserve complete business history.
- Timeline Events are immutable historical facts.
- Business Pulse is read-only and derives its information from existing business records.
