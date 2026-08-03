# 1. Purpose

## Objective

The UX Specification defines how users interact with the Freelancer Client & Invoice Manager by translating approved business requirements into a consistent, intuitive, and implementation-ready user experience.

It establishes the application's information architecture, navigation patterns, interaction standards, screen specifications, and end-to-end user flows, ensuring a predictable experience across all features.

This document acts as the bridge between the Functional Specification and the technical design, providing a shared reference for designers, frontend developers, backend developers, QA engineers, and stakeholders before implementation begins.

## Goals

- Define a clear and consistent user experience for the entire application.
- Organize the application around freelancer workflows and business priorities.
- Standardize navigation, layouts, interactions, and feedback patterns.
- Document every MVP screen with its purpose and behavior.
- Define complete user flows for all core business operations.
- Reduce implementation ambiguity through consistent UX standards.

## Scope

This document covers:

- Information Architecture
- Navigation Model
- Cross-Screen UX Standards
- Screen Catalog
- Screen Specifications
- User Flows

Visual design, branding, styling, component implementation, and frontend technical architecture are outside the scope of this document and are addressed in later phases.

# 2. UX Principles

## Objective

The UX Principles define the foundational guidelines that shape every user interaction within the application. They ensure consistency, reduce cognitive load, and align the user experience with the product vision and business goals.

## Principles

### Business Pulse First

The application is centered around the Business Pulse Dashboard, enabling freelancers to understand business health, identify priorities, and take action quickly.

### Relationship-Centric Design

Clients are treated as ongoing business relationships rather than simple contact records. All client-related information is organized within a dedicated Client Workspace.

### Simplicity Over Complexity

Interfaces should present only the information and actions required for the current task. Unnecessary options and visual clutter should be avoided.

### Consistency

Navigation, layouts, terminology, interaction patterns, and feedback should remain consistent across all screens to reduce the learning curve.

### Efficiency

Users should complete common tasks with minimal navigation. Frequently used actions remain easily accessible, and workflows are designed to reduce unnecessary steps.

### Context Preservation

Users should remain within their current workflow whenever possible. Navigation should preserve context, filters, sorting, and unsaved work where appropriate.

### Clear Feedback

Every user action should provide immediate and meaningful feedback through validation messages, loading indicators, confirmations, or error messages.

### Error Prevention

The interface should prevent invalid actions through validation, state-aware controls, and confirmation dialogs for destructive operations instead of relying solely on error messages.

### Accessibility

The application should support keyboard navigation, readable layouts, sufficient color contrast, visible focus states, and clear form validation to provide an inclusive user experience.

### Responsive Experience

Core workflows and functionality should remain consistent across desktop, tablet, and mobile devices while adapting layouts to suit each screen size.

# 3. Information Architecture

## Objective

The Information Architecture organizes the application around freelancer workflows rather than technical entities. It provides a clear and predictable structure that helps users navigate the system efficiently and complete business tasks with minimal effort.

## Application Structure

```text
Freelancer Client & Invoice Manager
│
├── Business Pulse
│
├── Clients
│   ├── Client List
│   └── Client Workspace
│       ├── Overview
│       ├── Invoices
│       ├── Payments
│       ├── Relationship Notes
│       ├── Reminders
│       └── Timeline
│
├── Invoices
│   ├── Invoice List
│   └── Invoice Details
│
├── Reminders
│
├── Timeline
│
└── Settings
    └── Business Profile
```

## Primary Workspaces

| Workspace      | Purpose                                                   |
| -------------- | --------------------------------------------------------- |
| Business Pulse | View business health, priorities, and recent activity.    |
| Clients        | Manage client relationships and access client workspaces. |
| Invoices       | Create, manage, and track invoice lifecycles.             |
| Reminders      | Organize and manage pending business tasks.               |
| Timeline       | Review chronological business activity.                   |
| Settings       | Configure business profile and application defaults.      |

## Client Workspace Structure

The Client Workspace serves as the central hub for managing an individual client relationship.

| Section            | Purpose                                     |
| ------------------ | ------------------------------------------- |
| Overview           | Display client summary and key information. |
| Invoices           | View and manage client invoices.            |
| Payments           | Review payment history.                     |
| Relationship Notes | Store important client notes.               |
| Reminders          | Manage client-specific reminders.           |
| Timeline           | View client-related activity history.       |

## Information Hierarchy

The application prioritizes information based on user workflows:

1. Business overview and priorities
2. Client relationships
3. Financial operations
4. Productivity and follow-ups
5. Historical activity
6. Business configuration

## Architecture Principles

- Business Pulse is the default entry point after login.
- Clients are organized as workspaces rather than standalone records.
- Financial operations are managed through a dedicated Invoice workspace.
- Reminders are accessible globally and within the Client Workspace.
- Timeline provides a read-only history of business events.
- Configuration is separated from daily operations through Settings.

# 4. Navigation Model

## Objective

The Navigation Model defines how users move throughout the application. It provides a consistent and predictable navigation experience that minimizes cognitive load and supports efficient completion of business tasks.

## Global Navigation

The primary navigation is available throughout the application and provides direct access to all major workspaces.

| Navigation Item | Purpose                                              |
| --------------- | ---------------------------------------------------- |
| Business Pulse  | View business overview and priorities.               |
| Clients         | Manage client relationships.                         |
| Invoices        | Manage invoices and payments.                        |
| Reminders       | Manage business reminders.                           |
| Timeline        | Review business activity history.                    |
| Settings        | Configure business profile and application settings. |

## Local Navigation

Some workspaces provide contextual navigation for related information.

### Client Workspace

| Section            | Purpose                           |
| ------------------ | --------------------------------- |
| Overview           | View client summary and activity. |
| Invoices           | Manage client invoices.           |
| Payments           | Review payment history.           |
| Relationship Notes | Manage client notes.              |
| Reminders          | View and manage client reminders. |
| Timeline           | Review client activity history.   |

### Invoice Workspace

Invoices can be filtered by lifecycle state:

- Draft
- Issued
- Partially Paid
- Paid
- Cancelled

### Reminder Workspace

Reminders can be filtered by:

- Pending
- Completed
- Cancelled

### Timeline Workspace

Timeline events can be filtered by:

- All Events
- Clients
- Invoices
- Payments
- Reminders
- Relationship Notes

## Primary Actions

Each screen provides a single primary action to guide users toward the most common task.

| Screen           | Primary Action                                           |
| ---------------- | -------------------------------------------------------- |
| Business Pulse   | Create Client                                            |
| Client List      | Create Client                                            |
| Client Workspace | Create Invoice                                           |
| Invoice List     | Create Invoice                                           |
| Invoice Details  | Issue Invoice / Record Payment (based on invoice status) |
| Reminder List    | Create Reminder                                          |
| Business Profile | Save Changes                                             |

## Navigation Principles

- Business Pulse is the default landing page after login.
- Global navigation remains accessible from every primary screen.
- Local navigation preserves the current workspace context.
- Related records can be accessed with minimal navigation.
- Users should reach common tasks within two to three interactions.
- Navigation should preserve search results, filters, sorting, pagination, and scroll position whenever practical.
- Unsaved changes require user confirmation before leaving a page.
- Completed workflows should return users to the most relevant context rather than restarting the navigation flow.

# 5. Cross-Screen UX Standards

## Objective

The Cross-Screen UX Standards establish consistent interaction patterns, layouts, feedback mechanisms, and accessibility guidelines across the application. These standards ensure a predictable, efficient, and user-friendly experience regardless of the current screen.

## Page Layout

All primary screens should follow a consistent layout consisting of:

- Global Navigation
- Page Header
- Primary Action
- Search and Filters (where applicable)
- Main Content Area
- Pagination or Summary (where applicable)

## Primary & Secondary Actions

- Each screen should provide a single, clearly emphasized primary action.
- Secondary actions should support the current workflow without competing for attention.
- Destructive actions should be visually separated and require confirmation where appropriate.

## Search, Filtering & Sorting

Search, filtering, and sorting should be available on collection-based screens.

### Search

- Results update dynamically.
- Search terms remain until cleared.
- Empty results provide a clear recovery action.

### Filtering

- Active filters remain visible.
- Multiple filters may be combined.
- Filters can be reset with a single action.

### Sorting

Where applicable, records can be sorted by:

- Newest First
- Oldest First
- Alphabetical
- Due Date
- Amount

## Forms & Validation

All forms should follow consistent interaction patterns.

### Form Standards

- Related fields are grouped logically.
- Required fields are clearly identified.
- Labels remain visible at all times.
- Primary actions remain easily accessible.

### Validation

- Required fields must be completed before submission.
- Validation messages are displayed inline.
- Invalid fields clearly indicate the issue.
- Previously entered data is preserved after validation failures.

## Empty States

Empty states should guide users toward the next meaningful action.

Each empty state should include:

- Clear title
- Brief explanation
- Primary action

Examples include:

- No Clients
- No Invoices
- No Reminders
- No Timeline Activity

## Loading States

While data is loading:

- Display skeleton placeholders or loading indicators.
- Preserve page layout to prevent layout shifts.
- Keep previously loaded content visible where possible.

## Success Feedback

Successful operations should provide brief, non-intrusive confirmation messages.

Examples include:

- Client created successfully.
- Invoice issued successfully.
- Payment recorded successfully.
- Reminder completed successfully.

## Error Handling

Error messages should:

- Clearly explain the issue.
- Suggest how the user can resolve it.
- Avoid technical terminology.
- Preserve user-entered information whenever possible.

## Confirmation Dialogs

Confirmation is required for actions that are destructive or have significant business impact.

Examples include:

- Delete Client
- Archive Client
- Delete Invoice Draft
- Cancel Invoice
- Delete Reminder
- Discard Unsaved Changes

Routine actions such as search, filtering, sorting, saving valid forms, and opening records should not require confirmation.

## Responsive Experience

The application should provide a consistent experience across supported devices.

### Desktop

- Multi-column layouts where appropriate.
- Persistent navigation.
- Data tables for large collections.

### Tablet

- Responsive layouts.
- Collapsible navigation.

### Mobile

- Single-column layouts.
- Touch-friendly controls.
- Card-based presentation for large datasets.

## Accessibility

The interface should support:

- Keyboard navigation
- Visible focus indicators
- Sufficient color contrast
- Clear labels for all form fields
- Accessible validation messages
- Icons accompanied by text where meaning is important

## UX Standards

The application should consistently:

- Prioritize clarity over visual complexity.
- Keep navigation predictable.
- Preserve user context whenever possible.
- Minimize unnecessary clicks.
- Prevent invalid actions before submission.
- Provide immediate feedback for user actions.
- Use consistent terminology and interaction patterns throughout the application.

# 6. Screen Catalog

## Objective

The Screen Catalog provides a complete inventory of all screens included in the MVP. Each screen is assigned a unique identifier, a primary purpose, and its corresponding functional area to ensure consistency across design, development, testing, and future documentation.

## Screen Inventory

| ID      | Screen                   | Module         | Purpose                                                  |
| ------- | ------------------------ | -------------- | -------------------------------------------------------- |
| SCR-001 | Business Pulse Dashboard | Business Pulse | View business health, priorities, and recent activity.   |
| SCR-002 | Client List              | Clients        | Browse, search, and manage clients.                      |
| SCR-003 | Create Client            | Clients        | Register a new client.                                   |
| SCR-004 | Edit Client              | Clients        | Update client information.                               |
| SCR-005 | Client Workspace         | Clients        | Manage all information related to a specific client.     |
| SCR-006 | Invoice List             | Invoices       | Browse, search, and manage invoices.                     |
| SCR-007 | Create Invoice           | Invoices       | Create and issue a new invoice.                          |
| SCR-008 | Invoice Details          | Invoices       | View invoice details and perform lifecycle actions.      |
| SCR-009 | Record Payment           | Invoices       | Record partial or full invoice payments.                 |
| SCR-010 | Reminder List            | Reminders      | Browse and manage reminders.                             |
| SCR-011 | Create Reminder          | Reminders      | Create reminders linked to clients or invoices.          |
| SCR-012 | Timeline                 | Timeline       | Review chronological business activity.                  |
| SCR-013 | Business Profile         | Settings       | Configure business information and application defaults. |

## Module Overview

| Module         | Screens                                                       |
| -------------- | ------------------------------------------------------------- |
| Business Pulse | Business Pulse Dashboard                                      |
| Clients        | Client List, Create Client, Edit Client, Client Workspace     |
| Invoices       | Invoice List, Create Invoice, Invoice Details, Record Payment |
| Reminders      | Reminder List, Create Reminder                                |
| Timeline       | Timeline                                                      |
| Settings       | Business Profile                                              |

## Screen Relationships

```text
Business Pulse
      │
      ├──────────────┬──────────────┐
      ▼              ▼              ▼
   Clients       Invoices      Reminders
      │              │
      ▼              ▼
Client Workspace  Invoice Details
      │              │
      ├──────┐       ▼
      │      │  Record Payment
      ▼      │
 Timeline ◄──┘

Settings
    │
    ▼
Business Profile
```

## Design Principles

- Every screen has a unique identifier for traceability.
- Each screen has a single primary purpose.
- Related screens are grouped within the same functional module.
- Users should reach any primary screen within two to three interactions.
- New screens introduced in future releases should follow the same identification and organization pattern.

# 7. Screen Specifications

## Objective

This section defines the functional behavior of each MVP screen. Global interaction patterns, navigation rules, validation standards, and UX guidelines are defined in previous sections and are not repeated here.

## Screen Specifications

### SCR-001 — Business Pulse Dashboard

| Property             | Specification                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------- |
| **Purpose**          | Provide an overview of business health, priorities, and recent activity.                 |
| **Primary Action**   | Create Client                                                                            |
| **Key Components**   | Business Snapshot, Attention Required, Recent Activity, Quick Actions                    |
| **Key Interactions** | Open related records, navigate to clients, invoices, reminders, and timeline.            |
| **Business Rules**   | Business metrics, overdue calculations, and recent activity reflect current system data. |
| **Related Screens**  | SCR-002, SCR-005, SCR-006, SCR-008, SCR-010, SCR-012                                     |

### SCR-002 — Client List

| Property             | Specification                                                          |
| -------------------- | ---------------------------------------------------------------------- |
| **Purpose**          | Browse, search, filter, sort, and manage clients.                      |
| **Primary Action**   | Create Client                                                          |
| **Key Components**   | Search, Filters, Client List                                           |
| **Key Interactions** | Open client workspace, search, filter, archive, restore.               |
| **Business Rules**   | Displays client status and outstanding balances based on current data. |
| **Related Screens**  | SCR-003, SCR-004, SCR-005                                              |

### SCR-003 — Create Client

| Property             | Specification                                                    |
| -------------------- | ---------------------------------------------------------------- |
| **Purpose**          | Register a new client.                                           |
| **Primary Action**   | Save Client                                                      |
| **Key Components**   | Client Information Form                                          |
| **Key Interactions** | Validate input, save client, redirect to Client Workspace.       |
| **Business Rules**   | New clients are created as Active and generate a Timeline event. |
| **Related Screens**  | SCR-002, SCR-005                                                 |

### SCR-004 — Edit Client

| Property             | Specification                                                     |
| -------------------- | ----------------------------------------------------------------- |
| **Purpose**          | Update client information.                                        |
| **Primary Action**   | Save Changes                                                      |
| **Key Components**   | Client Information Form                                           |
| **Key Interactions** | Edit existing information and save updates.                       |
| **Business Rules**   | Updates follow client lifecycle rules and create Timeline events. |
| **Related Screens**  | SCR-002, SCR-005                                                  |

### SCR-005 — Client Workspace

| Property             | Specification                                                         |
| -------------------- | --------------------------------------------------------------------- |
| **Purpose**          | Central workspace for managing a client relationship.                 |
| **Primary Action**   | Create Invoice                                                        |
| **Key Components**   | Overview, Invoices, Payments, Relationship Notes, Reminders, Timeline |
| **Key Interactions** | Navigate between tabs and perform client-related operations.          |
| **Business Rules**   | Client acts as the parent context for related business records.       |
| **Related Screens**  | SCR-006, SCR-007, SCR-010, SCR-012                                    |

### SCR-006 — Invoice List

| Property             | Specification                                            |
| -------------------- | -------------------------------------------------------- |
| **Purpose**          | Browse, search, filter, and manage invoices.             |
| **Primary Action**   | Create Invoice                                           |
| **Key Components**   | Search, Filters, Invoice List                            |
| **Key Interactions** | Open invoice details, search, filter, and sort invoices. |
| **Business Rules**   | Invoice status follows the approved lifecycle.           |
| **Related Screens**  | SCR-007, SCR-008                                         |

### SCR-007 — Create Invoice

| Property             | Specification                                                         |
| -------------------- | --------------------------------------------------------------------- |
| **Purpose**          | Create and issue invoices.                                            |
| **Primary Action**   | Issue Invoice                                                         |
| **Key Components**   | Invoice Form, Line Items, Totals                                      |
| **Key Interactions** | Validate data, save draft, issue invoice.                             |
| **Business Rules**   | Invoice numbering, totals, and status follow approved business rules. |
| **Related Screens**  | SCR-006, SCR-008                                                      |

### SCR-008 — Invoice Details

| Property             | Specification                                                           |
| -------------------- | ----------------------------------------------------------------------- |
| **Purpose**          | View invoice details and perform lifecycle actions.                     |
| **Primary Action**   | Dynamic based on invoice status                                         |
| **Key Components**   | Invoice Summary, Payment History, Status                                |
| **Key Interactions** | Record payment, download invoice, duplicate, cancel (where applicable). |
| **Business Rules**   | Available actions depend on invoice lifecycle state.                    |
| **Related Screens**  | SCR-006, SCR-007, SCR-009                                               |

### SCR-009 — Record Payment

| Property             | Specification                                         |
| -------------------- | ----------------------------------------------------- |
| **Purpose**          | Record partial or full payments.                      |
| **Primary Action**   | Save Payment                                          |
| **Key Components**   | Payment Form                                          |
| **Key Interactions** | Enter payment details and update invoice balance.     |
| **Business Rules**   | Payment amount cannot exceed the outstanding balance. |
| **Related Screens**  | SCR-008                                               |

### SCR-010 — Reminder List

| Property             | Specification                                   |
| -------------------- | ----------------------------------------------- |
| **Purpose**          | Browse and manage reminders.                    |
| **Primary Action**   | Create Reminder                                 |
| **Key Components**   | Reminder List, Search, Filters                  |
| **Key Interactions** | Complete, cancel, search, and filter reminders. |
| **Business Rules**   | Reminder status follows the approved lifecycle. |
| **Related Screens**  | SCR-011, SCR-005                                |

### SCR-011 — Create Reminder

| Property             | Specification                                                       |
| -------------------- | ------------------------------------------------------------------- |
| **Purpose**          | Create reminders linked to clients or invoices.                     |
| **Primary Action**   | Save Reminder                                                       |
| **Key Components**   | Reminder Form                                                       |
| **Key Interactions** | Validate and save reminder.                                         |
| **Business Rules**   | Reminder becomes available in Business Pulse based on its due date. |
| **Related Screens**  | SCR-010, SCR-005                                                    |

### SCR-012 — Timeline

| Property             | Specification                                              |
| -------------------- | ---------------------------------------------------------- |
| **Purpose**          | Display chronological business history.                    |
| **Primary Action**   | Open Related Record                                        |
| **Key Components**   | Timeline Feed, Filters                                     |
| **Key Interactions** | Browse events and navigate to related records.             |
| **Business Rules**   | Timeline events are automatically generated and immutable. |
| **Related Screens**  | SCR-001, SCR-005, SCR-008                                  |

### SCR-013 — Business Profile

| Property             | Specification                                             |
| -------------------- | --------------------------------------------------------- |
| **Purpose**          | Manage business information and application defaults.     |
| **Primary Action**   | Save Changes                                              |
| **Key Components**   | Business Information, Invoice Defaults                    |
| **Key Interactions** | Update business settings and save changes.                |
| **Business Rules**   | Changes affect future records unless otherwise specified. |
| **Related Screens**  | SCR-001                                                   |

# 8. User Flows

## Objective

This section defines the primary user journeys within the application. Each flow represents a complete business process from initiation to completion and ensures consistent navigation across the MVP.

## FLOW-001 — First-Time Setup

**Goal:** Configure the business and create the first client.

```text
Login
    ↓
Business Profile
    ↓
Business Pulse
    ↓
Create Client
    ↓
Client Workspace
```

## FLOW-002 — Create Client

**Goal:** Register a new client.

```text
Business Pulse / Client List
            ↓
      Create Client
            ↓
      Validate Form
            ↓
       Save Client
            ↓
    Client Workspace
```

## FLOW-003 — Update Client

**Goal:** Modify existing client information.

```text
Client Workspace
        ↓
   Edit Client
        ↓
 Update Details
        ↓
  Save Changes
        ↓
Client Workspace
```

## FLOW-004 — Create & Issue Invoice

**Goal:** Create and issue an invoice for a client.

```text
Client Workspace
        ↓
 Create Invoice
        ↓
 Complete Form
        ↓
  Validate Data
        ↓
  Save Draft / Issue
        ↓
 Invoice Details
```

## FLOW-005 — Record Payment

**Goal:** Record a partial or full payment.

```text
Invoice Details
        ↓
 Record Payment
        ↓
 Enter Details
        ↓
 Save Payment
        ↓
 Updated Invoice
```

## FLOW-006 — Create Reminder

**Goal:** Create a reminder linked to a client or invoice.

```text
Client Workspace / Reminder List
              ↓
      Create Reminder
              ↓
        Save Reminder
              ↓
       Reminder List
```

## FLOW-007 — Complete Reminder

**Goal:** Mark a reminder as completed.

```text
Reminder List
      ↓
Open Reminder
      ↓
Complete Reminder
      ↓
Updated Reminder
```

## FLOW-008 — Daily Business Workflow

**Goal:** Review business health and complete priority tasks.

```text
Login
   ↓
Business Pulse
   ↓
Attention Required
   ↓
Open Related Record
   ↓
Complete Action
   ↓
Business Pulse
```

## FLOW-009 — Review Timeline

**Goal:** Review business activity and navigate to related records.

```text
Timeline
    ↓
Filter Events
    ↓
Select Event
    ↓
Related Record
```

## FLOW-010 — Update Business Profile

**Goal:** Update business information and defaults.

```text
Settings
    ↓
Business Profile
    ↓
Edit Information
    ↓
Save Changes
```

## Flow Principles

- Every workflow begins from a logical entry point.
- Business validation occurs before data is saved.
- Successful actions provide immediate user feedback.
- Business Pulse and Timeline update automatically when relevant.
- Users remain within their current workflow whenever possible.
- Unsaved changes require confirmation before leaving.
- Navigation should minimize unnecessary steps and preserve user context.

# 9. UX Decision Log

## Objective

The UX Decision Log records the key design decisions made during the UX specification process. These decisions establish consistent interaction patterns across the application and provide guidance for future enhancements.

| Decision                                                                     | Rationale                                                                |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Business Pulse is the default landing page.                                  | Provides an immediate overview of business health and priorities.        |
| Clients are managed through a dedicated Client Workspace.                    | Keeps all client-related information in a single contextual location.    |
| Business entities are organized into dedicated workspaces.                   | Reduces navigation complexity and improves discoverability.              |
| Each screen has a single primary action.                                     | Guides users toward the most common task and reduces cognitive load.     |
| Global navigation is available on all primary screens.                       | Enables predictable navigation throughout the application.               |
| Local navigation is used within workspaces.                                  | Keeps related information organized without leaving the current context. |
| Search, filtering, and sorting follow consistent interaction patterns.       | Creates a predictable experience across collection-based screens.        |
| Forms use inline validation and preserve user input.                         | Prevents data loss and improves form completion.                         |
| Destructive actions require confirmation.                                    | Reduces accidental data loss while minimizing unnecessary interruptions. |
| Empty, loading, success, and error states follow common UX standards.        | Provides consistent feedback across the application.                     |
| Timeline is generated automatically and remains read-only.                   | Preserves an accurate and reliable business history.                     |
| Business Pulse and Timeline update automatically after relevant actions.     | Ensures business information remains current without manual refresh.     |
| Responsive behavior follows the same workflows across all supported devices. | Maintains a consistent user experience regardless of screen size.        |
| Accessibility is considered throughout the application.                      | Improves usability and supports a broader range of users.                |

## Future Considerations

The UX Specification is designed to support future enhancements while maintaining consistency with the established navigation model, interaction patterns, and design principles. Any new features or screens should follow the standards defined in this document unless a justified design change is approved.
