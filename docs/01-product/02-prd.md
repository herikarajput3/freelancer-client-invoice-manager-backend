# Product Requirements Document (PRD)

## Project

**Freelancer Client & Invoice Manager**

## 1. Executive Summary

The Freelancer Client & Invoice Manager is a single-user web SaaS
application that helps independent software developers run their
freelance business with confidence. It provides one trusted source of
truth for clients, invoices, payments, relationship history, and
business activity. The product is a freelance business management
application, not a full accounting or bookkeeping solution.

## 2. Product Vision

Enable freelancers to confidently manage their business from one
centralized workspace by reducing mental load and surfacing what
requires attention.

## 3. Product Promise

**Run your freelance business with confidence.**

## 4. Product Philosophy

- One trusted source of truth
- Reduce mental load
- Support decisions, not storage
- Simplicity over completeness
- Relationships are business assets

## 5. Target Users

- Independent software developers
- Freelancers managing 3--20 active clients
- Global audience
- Single-user web application
- Supports individual and company clients

## 6. Product Goals

1.  Create one trusted source of truth.
2.  Reduce mental load.
3.  Help users understand business status through Business Pulse.
4.  Enable confident business decisions.
5.  Preserve client relationship context.

## 7. MVP

Client Workspace, Invoice Management, Payment Tracking, Business Pulse,
Client Timeline, Relationship Notes.

## 8. Out of Scope

Project Management, team collaboration, native mobile apps,
accounting/bookkeeping, payroll, tax filing, recurring invoices, online
payments, AI insights.

## 9. Feature Summary

### Client Workspace

Overview, client information, invoices, payments, timeline, relationship notes, and business summary.

Supports create, edit, archive, restore, limited delete, search, and filter.

Provides a centralized workspace for reviewing the complete client relationship without directly modifying financial records. Archived clients remain viewable but cannot receive new invoices until restored.

### Invoice Management

Draft → Issued → Partially Paid → Paid, with Cancelled and automatic Overdue status.

Supports:

- Create Draft invoices
- Edit Draft invoices before issuance
- Duplicate Draft invoices
- Preview invoices before issuing
- Issue invoices
- PDF download
- Archive
- Search and filter

Business behavior:

- Archived Clients cannot receive new Invoices.
- Clients with business history are archived instead of permanently deleted.
- Client updates affect future business activities only.
- Issued Invoices preserve historical Client information.
- Required information is validated before issuance.
- Issued invoices become read-only for financial information.
- Available actions depend on the current invoice state.

### Payment Tracking

One Payment represents one real-world payment transaction.

Supports:

- Recording multiple payments against an Invoice
- Viewing payment history
- Voiding incorrect payments
- Automatic outstanding balance calculation
- Automatic Invoice status updates

Business behavior:

- Payments must be greater than zero.
- Payments cannot exceed the remaining Invoice balance.
- Payments cannot be permanently deleted.
- Incorrect Payments are corrected by voiding and recording a replacement.
- Recording Payments automatically updates Invoice status and Business Pulse.
- Payment actions are available only while an outstanding balance exists.

### Business Pulse

Default landing page answering: "What requires my attention right now?"

Includes:

- Attention Required
- Outstanding Revenue
- Recent Activity
- Business Snapshot

Business Pulse is read-only, automatically reflects valid business changes, and serves as the primary navigation point for identifying work requiring user attention.

### Client Timeline

Automatic chronological history of significant business events.

Timeline events are generated automatically, remain immutable, and provide navigation to related business records.

### Relationship Notes

Private, searchable, pinnable notes that automatically create timeline
events.

## 10. Global Business Rules

- Every Business Profile owns all business data within its workspace.
- Every Client belongs to exactly one Business Profile.
- Every Invoice belongs to exactly one Client.
- Every Payment belongs to exactly one Invoice.
- Historical financial records are preserved and remain immutable once formally recorded.
- Business Profile and Client information captured by an issued Invoice are preserved as historical snapshots.
- Invoice Numbers are unique within a Business Profile and are never reused.
- Outstanding balances must never become negative.
- Recorded Payments must never exceed the Invoice Total.
- Business Pulse is read-only and always reflects the latest valid business state.
- Timeline automatically records significant business events and preserves them as immutable history.

## 11. Non-Functional Requirements

Simple UX, responsive performance, reliable calculations, accessibility
support, privacy, data protection, and global readiness.

## 12. Success Criteria

The MVP is considered successful when:

- Users manage their freelance business from one application.
- Users regularly use Business Pulse to understand business health.
- Users consistently track Clients, Invoices, and Payments.
- Historical financial records remain accurate and trustworthy throughout the product lifecycle.
- Business rules governing Invoice, Payment, and Client workflows are consistently enforced.
- Users cannot perform actions that violate approved business constraints (such as overpayments, modifying issued financial records, or deleting protected business history).
- Core workflows behave consistently, including validation, confirmation, save/cancel behavior, and automatic status updates.
- Users receive clear feedback for successful operations, validation failures, and exceptional situations.
- Users report feeling more organized, confident, and in control of their freelance business.

## 13. MoSCoW

**Must:** All six MVP features. **Should:** PDF invoices, pinned notes,
archive/restore, search/filter. **Could:** Recurring invoices,
reminders, online payments, client tags, AI insights. **Won't:** Project
management, accounting, payroll, tax filing, mobile apps.

## 14. Conclusion

This PRD defines what the product must do and intentionally excludes
domain modeling, architecture, database design, APIs, and implementation
details.
