# 1. Purpose

## Objective

The Wireframe Specification defines the structural layout of every MVP screen within the Freelancer Client & Invoice Manager.

It translates the approved UX Specification into low-fidelity screen layouts that communicate information hierarchy, component placement, and user interaction patterns without introducing visual styling or implementation details.

This document serves as the visual blueprint for UI design and frontend implementation while remaining consistent with the approved Product Discovery, PRD, Domain Model, Business Rules Specification, Functional Specification, and UX Specification.

## Goals

- Define the layout of every MVP screen.
- Establish a consistent visual structure across the application.
- Standardize the placement of navigation, content, forms, and actions.
- Document information hierarchy before visual design begins.
- Reduce ambiguity during UI design and frontend development.
- Provide implementation-independent screen blueprints.

## Scope

This document covers:

- Global application layout
- Shared screen components
- Desktop wireframes
- Mobile layout adaptations
- Screen-level component placement
- Low-fidelity ASCII wireframes

This document intentionally excludes:

- Visual branding
- Color palettes
- Typography
- Icons
- Spacing specifications
- Design systems
- UI components
- Animations
- Frontend implementation
- CSS or styling decisions

These concerns are addressed during the UI Design System and Frontend Design phases.

## Relationship to Previous Documents

This document is derived from the approved project artifacts:

1. Product Discovery
2. Product Requirements Document (PRD)
3. Domain Model
4. Business Rules Specification
5. Functional Specification
6. UX Specification

The Wireframe Specification expands these documents by defining **where information and interactions appear on each screen** without changing previously approved business behavior or UX decisions.

Subsequent UI Design, Frontend Development, and QA activities should remain consistent with this specification.

# 2. Wireframe Principles

## Objective

The Wireframe Principles define the structural guidelines used throughout the application. They ensure every screen follows a consistent layout, presents information clearly, and supports efficient user workflows before visual design begins.

## Principles

### Consistent Layout

All primary screens should follow a common page structure to provide a predictable experience and reduce the learning curve.

### Information Hierarchy

The most important information and actions should appear first. Supporting information should be organized into clearly defined sections.

### Single Primary Action

Each screen should emphasize one primary action that represents the user's most common task. Secondary actions should remain available without competing for attention.

### Logical Grouping

Related information and controls should be grouped together to improve readability and reduce cognitive load.

### Progressive Disclosure

Advanced or less frequently used information should be revealed only when needed, keeping the default interface simple and focused.

### Workspace-Oriented Design

Business information should be organized around dedicated workspaces, allowing users to view and manage related information without unnecessary navigation.

### Consistent Navigation

Global and local navigation should remain in predictable locations across all screens, allowing users to move efficiently throughout the application.

### Responsive Structure

Layouts should adapt to different screen sizes while preserving information hierarchy, workflows, and core functionality.

### Readability

Content should be organized using clear sections, meaningful headings, adequate spacing, and easily scannable layouts.

### Low-Fidelity Representation

Wireframes focus exclusively on layout, content organization, and interaction structure. They intentionally exclude visual styling such as colors, typography, icons, spacing specifications, animations, and branding.

## Wireframe Standards

All wireframes in this document should:

- Represent screen structure rather than visual design.
- Use consistent layout patterns across similar screens.
- Clearly identify primary navigation, page content, and primary actions.
- Show only the components necessary to communicate layout and functionality.
- Remain implementation-independent and technology-neutral.
- Align with the approved UX Specification and Functional Specification.

# 3. Global Layout

## Objective

The Global Layout defines the common structural framework shared by all primary screens in the application. It establishes consistent placement of navigation, page headers, content areas, and action zones, ensuring users experience a predictable interface regardless of the current workspace.

## Desktop Layout

All primary screens follow the same high-level layout.

```text
+--------------------------------------------------------------------------------------+
| Header                                                       User Menu / Profile     |
+----------------------+---------------------------------------------------------------+
|                      |                                                               |
|                      | Page Header                                                   |
|                      | Title + Description                  Primary Action           |
|                      +---------------------------------------------------------------+
|                      |                                                               |
| Global Navigation    | Search / Filters / Secondary Actions (where applicable)      |
|                      +---------------------------------------------------------------+
|                      |                                                               |
|                      | Main Content Area                                             |
|                      |                                                               |
|                      |                                                               |
|                      |                                                               |
|                      |                                                               |
|                      +---------------------------------------------------------------+
|                      | Pagination / Summary (where applicable)                      |
+----------------------+---------------------------------------------------------------+
```

## Layout Regions

### Header

The Header provides application-level controls that remain consistent across all primary screens.

Typical contents include:

- Application logo
- Page context
- User profile or account menu

### Global Navigation

The left navigation provides access to the application's primary workspaces.

Navigation includes:

- Business Pulse
- Clients
- Invoices
- Reminders
- Timeline
- Settings

The navigation remains visible throughout normal desktop workflows.

### Page Header

The Page Header identifies the current screen and provides context.

It typically contains:

- Page title
- Short description (when needed)
- Primary action

### Search & Action Bar

Collection-based screens may include a dedicated area for:

- Search
- Filters
- Sorting
- Bulk actions
- Secondary actions

This area appears directly below the Page Header.

### Main Content Area

The Main Content Area displays the primary information for the current screen.

Depending on the screen, it may contain:

- Data tables
- Forms
- Dashboard widgets
- Detail views
- Timeline feeds
- Lists
- Summary cards

### Footer Area

Where applicable, the bottom section of a page displays:

- Pagination
- Record counts
- Summary information

Some screens may omit this area when unnecessary.

## Layout Principles

The Global Layout should:

- Keep navigation consistently positioned.
- Maximize space for primary content.
- Clearly separate navigation from workspace content.
- Maintain a consistent page hierarchy across all screens.
- Support responsive adaptation without changing workflows.
- Allow each workspace to present specialized content while preserving a familiar overall structure.

# 4. Shared Components

## Objective

The Shared Components define the common structural elements reused throughout the application. These components establish consistent layouts, interaction patterns, and information presentation across all screens without specifying visual styling or implementation details.

## Global Header

The Global Header appears on all primary screens and provides application-level context and account access.

### Typical Contents

- Application Logo
- Current Workspace or Page Title
- User Profile / Account Menu

## Global Navigation

The Global Navigation provides access to the application's primary workspaces.

### Navigation Items

- Business Pulse
- Clients
- Invoices
- Reminders
- Timeline
- Settings

The active workspace should always be clearly identifiable.

## Page Header

Every primary screen includes a Page Header that introduces the current workspace.

### Typical Contents

- Page Title
- Short Description (when helpful)
- Primary Action

## Search & Filter Bar

Collection-based screens include a Search & Filter Bar for locating and organizing records.

### Typical Controls

- Search
- Filters
- Sorting
- Secondary Actions

Screens that display a single record may omit this component.

## Data Table

Data Tables display structured collections of business records.

Typical usage includes:

- Client List
- Invoice List
- Reminder List

Data Tables should support:

- Sorting
- Searching
- Filtering
- Row Selection (where applicable)
- Pagination

## Summary Cards

Summary Cards highlight important business information using concise visual sections.

Typical usage includes:

- Business Pulse Dashboard
- Client Overview
- Invoice Summary

Each card should present a single business concept or metric.

## Detail Panel

Detail Panels display comprehensive information about a selected business entity.

Typical usage includes:

- Client Details
- Invoice Details
- Business Profile

Information should be grouped into logical sections to improve readability.

## Form Layout

Forms provide a consistent structure for creating and updating business information.

### Form Structure

- Page Title
- Logical Field Groups
- Required and Optional Fields
- Primary and Secondary Actions

Field organization should follow the natural business workflow.

## Tab Navigation

Tab Navigation organizes related information within a single workspace.

Typical usage includes:

- Client Workspace
  - Overview
  - Invoices
  - Payments
  - Relationship Notes
  - Reminders
  - Timeline

Tabs should preserve the current workspace context while allowing quick access to related information.

## Timeline Feed

The Timeline Feed presents business events in chronological order.

Each event should display:

- Event Description
- Timestamp
- Related Business Record

Timeline entries are read-only and navigate to related records where appropriate.

## Status Indicators

Status Indicators communicate the current state of business records.

Typical statuses include:

- Active
- Archived
- Draft
- Issued
- Partially Paid
- Paid
- Overdue
- Cancelled
- Pending
- Completed
- Voided

Status indicators should remain consistent throughout the application.

## Empty State

Empty States guide users when no information is available.

Each Empty State should include:

- Clear Title
- Brief Explanation
- Primary Action

## Confirmation Dialog

Confirmation Dialogs appear before actions that significantly affect business records.

Typical examples include:

- Archive Client
- Delete Client
- Delete Draft Invoice
- Cancel Invoice
- Void Payment
- Delete Reminder
- Discard Unsaved Changes

Routine actions should not require confirmation.

## Notification Messages

Notification Messages provide immediate feedback after user actions.

Typical message types include:

- Success
- Warning
- Error
- Informational

Messages should be concise, actionable, and non-disruptive.

## Component Principles

Shared Components should:

- Maintain consistent placement across screens.
- Use consistent terminology and interaction patterns.
- Support accessibility and responsive layouts.
- Prioritize clarity over visual complexity.
- Be reusable across multiple workspaces.
- Remain independent of visual styling and implementation technology.

# 5. Desktop Wireframes

## WF-001 — Business Pulse Dashboard

### Purpose

The Business Pulse Dashboard serves as the application's primary landing page. It provides freelancers with a high-level overview of their business, highlights items requiring immediate attention, and offers quick access to common actions.

### Layout Description

The dashboard follows the standard application layout consisting of the Global Header, Global Navigation, Page Header, and Main Content Area.

The main content is organized into multiple sections that summarize business performance, outstanding work, upcoming activities, and recent business events.

### Components

#### Page Header

- Page Title: **Business Pulse**
- Brief page description
- Primary Action: **Create Invoice**

#### Business Snapshot

Displays high-level business metrics, including:

- Total Revenue
- Outstanding Amount
- Active Clients
- Overdue Invoices

#### Attention Required

Highlights business items that need immediate action, such as:

- Overdue invoices
- Upcoming payment reminders
- Recently overdue clients

#### Upcoming Reminders

Displays reminders that are approaching their scheduled dates.

Each reminder includes:

- Reminder title
- Related client
- Due date

#### Recent Activity

Displays the latest business events in chronological order.

Examples include:

- Invoice created
- Payment recorded
- Reminder completed
- Client added

#### Quick Actions

Provides shortcuts to frequently used tasks, such as:

- Create Client
- Create Invoice
- Record Payment
- Create Reminder

### Desktop Wireframe

```text
+--------------------------------------------------------------------------------------+
| Logo                                    Business Pulse                    User Menu  |
+----------------------+---------------------------------------------------------------+
|                      | Business Pulse                             Create Invoice     |
|                      +---------------------------------------------------------------+
|                      | [Revenue] [Outstanding] [Clients] [Overdue]                  |
|                      +---------------------------------------------------------------+
|                      | Attention Required                                            |
| Navigation           |---------------------------------------------------------------|
|                      | Upcoming Reminders                                            |
| • Business Pulse     |---------------------------------------------------------------|
| • Clients            | Recent Activity                                               |
| • Invoices           |---------------------------------------------------------------|
| • Reminders          | Quick Actions                                                 |
| • Timeline           | [Create Client] [Create Invoice] [Record Payment]            |
| • Settings           |                                                               |
+----------------------+---------------------------------------------------------------+
```

### Interaction Notes

- The dashboard is the default landing page after user authentication.
- Summary cards provide a quick overview of current business health.
- Dashboard sections summarize information and allow navigation to detailed workspaces.
- Primary actions remain visible at the top of the screen for quick access.
- The layout prioritizes business visibility while minimizing navigation effort.

## WF-002 — Client List

### Purpose

Displays all clients, allowing users to search, filter, manage, and quickly access individual client workspaces.

### Layout Description

Uses the standard application layout with a searchable, filterable data table and a primary action for creating new clients.

### Components

- Page Header
- Search & Filter Bar
- Client Data Table
- Pagination
- Primary Action: **Create Client**

### Desktop Wireframe

```text
+--------------------------------------------------------------------------------------+
| Business Pulse > Clients                                         Create Client       |
+--------------------------------------------------------------------------------------+
| Search ____________________  Filter ▼  Sort ▼                                    |
+--------------------------------------------------------------------------------------+
| Client Name | Company | Email | Outstanding | Status | Actions                   |
|-------------------------------------------------------------------------------|
| John Doe    | ABC Ltd | ...   | ₹15,000     | Active | View                     |
| Sarah Smith | XYZ Co. | ...   | ₹0          | Active | View                     |
| ...                                                                         |
+--------------------------------------------------------------------------------------+
| Page 1 of N                                                            Pagination    |
+--------------------------------------------------------------------------------------+
```

### Interaction Notes

- Selecting a client opens the Client Workspace.
- Search, filtering, and sorting update the table without leaving the page.
- The Create Client button opens the client creation form.

## WF-003 — Create Client

### Purpose

Allows users to create a new client record.

### Layout Description

A single-column form with logically grouped input fields and action buttons.

### Components

- Page Header
- Client Information Form
- Save & Cancel Actions

### Desktop Wireframe

```text
+--------------------------------------------------------------+
| Create Client                                                |
+--------------------------------------------------------------+
| Full Name *                                                  |
| Company                                                      |
| Email *                                                      |
| Phone                                                        |
| Address                                                      |
| Notes                                                        |
|--------------------------------------------------------------|
|             [Cancel]                [Save Client]            |
+--------------------------------------------------------------+
```

### Interaction Notes

- Required fields are validated before saving.
- Successful creation redirects to the Client Workspace.

## WF-004 — Edit Client

### Purpose

Allows users to update an existing client's information.

### Layout Description

Identical to the Create Client screen, pre-filled with existing client data.

### Components

- Page Header
- Client Form
- Save & Cancel Actions

### Desktop Wireframe

```text
+--------------------------------------------------------------+
| Edit Client                                                  |
+--------------------------------------------------------------+
| Full Name *                                                  |
| Company                                                      |
| Email *                                                      |
| Phone                                                        |
| Address                                                      |
| Notes                                                        |
|--------------------------------------------------------------|
|             [Cancel]                [Save Changes]           |
+--------------------------------------------------------------+
```

### Interaction Notes

- Existing values are loaded automatically.
- Saving updates the client while preserving relationships with invoices and reminders.

## WF-005 — Client Workspace

### Purpose

Provides a centralized workspace for managing all information related to a specific client, including profile details, invoices, payments, reminders, relationship notes, and activity history.

### Layout Description

The workspace follows the standard application layout with a client summary at the top and tab-based navigation for related business information.

### Components

#### Page Header

- Client Name
- Company Name (if available)
- Primary Actions:
  - Create Invoice
  - Record Payment
  - Edit Client

#### Client Summary

Displays key client information, including:

- Contact Details
- Outstanding Balance
- Total Revenue
- Active Invoices
- Next Reminder

#### Tab Navigation

- Overview
- Invoices
- Payments
- Relationship Notes
- Reminders
- Timeline

#### Tab Content Area

Displays information based on the selected tab.

### Desktop Wireframe

```text
+--------------------------------------------------------------------------------------+
| Clients > John Doe                                             Edit | New Invoice   |
+--------------------------------------------------------------------------------------+
| John Doe                    Outstanding ₹15,000    Revenue ₹85,000                  |
| john@email.com              Active Invoices: 3     Next Reminder: Tomorrow          |
+--------------------------------------------------------------------------------------+
| Overview | Invoices | Payments | Notes | Reminders | Timeline                       |
+--------------------------------------------------------------------------------------+
|                                                                              |
|                         Selected Tab Content                                 |
|                                                                              |
|  (Invoices Table / Payment History / Notes / Timeline / Reminder List)       |
|                                                                              |
|                                                                              |
+--------------------------------------------------------------------------------------+
```

### Interaction Notes

- The client summary remains visible while navigating between tabs.
- Switching tabs updates only the content area without leaving the workspace.
- Primary actions remain accessible at all times.
- Each tab provides focused access to a specific aspect of the client relationship.

## WF-006 — Invoice List

### Purpose

Displays all invoices, enabling users to search, filter, monitor statuses, and access invoice details.

### Layout Description

A searchable and filterable data table presenting invoice records with their current payment status.

### Components

- Page Header
- Search & Filter Bar
- Invoice Data Table
- Pagination
- Primary Action: **Create Invoice**

### Desktop Wireframe

```text
+--------------------------------------------------------------------------------------+
| Business Pulse > Invoices                                      Create Invoice        |
+--------------------------------------------------------------------------------------+
| Search _____________  Status ▼  Client ▼  Sort ▼                                   |
+--------------------------------------------------------------------------------------+
| Invoice # | Client | Issue Date | Due Date | Amount | Status | Actions            |
|------------------------------------------------------------------------------------|
| INV-001   | John   | 10 Jul     | 20 Jul   | ₹8,000 | Paid   | View               |
| INV-002   | Sarah  | 12 Jul     | 22 Jul   | ₹5,500 | Due    | View               |
| ...                                                                            |
+--------------------------------------------------------------------------------------+
| Page 1 of N                                                            Pagination    |
+--------------------------------------------------------------------------------------+
```

### Interaction Notes

- Selecting an invoice opens the Invoice Details screen.
- Search, filtering, and sorting update the list dynamically.
- Invoice status provides a quick overview of payment progress.

## WF-007 — Create Invoice

### Purpose

Allows users to generate a new invoice for an existing client.

### Layout Description

A structured form with client selection, invoice details, line items, totals, and action buttons.

### Components

- Page Header
- Client Selection
- Invoice Information
- Line Items
- Totals Summary
- Save Actions

### Desktop Wireframe

```text
+----------------------------------------------------------------------------------+
| Create Invoice                                                                   |
+----------------------------------------------------------------------------------+
| Client *                                                  Invoice Date           |
| Due Date                                                  Currency               |
|----------------------------------------------------------------------------------|
| Description            Qty      Rate      Tax      Amount                        |
|--------------------------------------------------------------------------        |
|                                                                  [+ Add Item]    |
|----------------------------------------------------------------------------------|
| Subtotal                                                            ₹0           |
| Tax                                                                 ₹0           |
| Total                                                               ₹0           |
|----------------------------------------------------------------------------------|
|                [Save Draft]   [Cancel]   [Issue Invoice]                         |
+----------------------------------------------------------------------------------+
```

### Interaction Notes

- Users can add multiple invoice line items.
- Totals update automatically as items are modified.
- Invoices can be saved as drafts or issued immediately.
- Validation ensures required information is completed before issuing.

## WF-008 — Invoice Details

### Purpose

Displays complete invoice information, payment history, and available actions throughout the invoice lifecycle.

### Layout Description

A detail page presenting invoice information, client details, line items, totals, payment records, and invoice actions.

### Components

#### Page Header

- Invoice Number
- Invoice Status
- Primary Actions:
  - Edit (Draft only)
  - Record Payment
  - Download PDF
  - Send Invoice

#### Invoice Summary

Displays:

- Client
- Issue Date
- Due Date
- Currency
- Payment Status

#### Line Items

Displays all billed services or products.

#### Payment History

Displays recorded payments for the invoice.

### Desktop Wireframe

```text
+--------------------------------------------------------------------------------------+
| Invoice INV-001                                          Paid                        |
+--------------------------------------------------------------------------------------+
| Client: John Doe          Issue: 10 Jul        Due: 20 Jul                          |
|--------------------------------------------------------------------------------------|
| Description             Qty       Rate        Tax          Amount                    |
|-------------------------------------------------------------------------------|
| Website Design          1         ₹8,000      ₹0           ₹8,000                   |
|-------------------------------------------------------------------------------|
| Subtotal                                            ₹8,000                         |
| Tax                                                  ₹0                            |
| Total                                               ₹8,000                         |
|-------------------------------------------------------------------------------|
| Payment History                                                            |
| 15 Jul 2026        ₹8,000        Bank Transfer                              |
|-------------------------------------------------------------------------------|
| [Record Payment]   [Download PDF]   [Send Invoice]                           |
+--------------------------------------------------------------------------------------+
```

### Interaction Notes

- Available actions depend on the invoice status.
- Payment history updates immediately after recording a payment.
- Users can navigate to the related client workspace.

## WF-009 — Record Payment

### Purpose

Allows users to record partial or full payments received for an invoice.

### Layout Description

A focused form for entering payment details and updating the invoice balance.

### Components

- Invoice Summary
- Payment Form
- Save & Cancel Actions

### Desktop Wireframe

```text
+--------------------------------------------------------------+
| Record Payment                                               |
+--------------------------------------------------------------+
| Invoice: INV-001                                             |
| Client: John Doe                                             |
| Outstanding Balance: ₹8,000                                  |
|--------------------------------------------------------------|
| Payment Date *                                               |
| Amount *                                                     |
| Payment Method                                               |
| Reference                                                    |
| Notes                                                        |
|--------------------------------------------------------------|
|             [Cancel]          [Save Payment]                 |
+--------------------------------------------------------------+
```

### Interaction Notes

- Partial payments are supported.
- Remaining balance updates automatically.
- Fully paid invoices change to the **Paid** status.
- The payment is added to the invoice history and timeline.

## WF-010 — Reminder List

### Purpose

Displays all reminders, enabling users to monitor upcoming tasks and manage follow-ups.

### Layout Description

A searchable and filterable table listing reminders with their due dates and statuses.

### Components

- Page Header
- Search & Filter Bar
- Reminder Table
- Pagination
- Primary Action: **Create Reminder**

### Desktop Wireframe

```text
+--------------------------------------------------------------------------------------+
| Business Pulse > Reminders                                     Create Reminder       |
+--------------------------------------------------------------------------------------+
| Search ____________  Status ▼  Client ▼  Due Date ▼                                |
+--------------------------------------------------------------------------------------+
| Reminder | Client | Due Date | Priority | Status | Actions                         |
|------------------------------------------------------------------------------------|
| Follow Up | John  | Tomorrow | High     | Pending | View                           |
| Payment   | Sarah | 20 Jul   | Medium   | Pending | View                           |
| ...                                                                            |
+--------------------------------------------------------------------------------------+
| Page 1 of N                                                            Pagination    |
+--------------------------------------------------------------------------------------+
```

### Interaction Notes

- Selecting a reminder opens its details or editing screen.
- Completed reminders remain available for historical reference.
- Filters help users focus on pending or overdue reminders.

## WF-011 — Create Reminder

### Purpose

Allows users to schedule reminders related to clients or business activities.

### Layout Description

A simple form for entering reminder details and scheduling the reminder.

### Components

- Reminder Form
- Save & Cancel Actions

### Desktop Wireframe

```text
+--------------------------------------------------------------+
| Create Reminder                                              |
+--------------------------------------------------------------+
| Title *                                                      |
| Related Client                                               |
| Due Date *                                                   |
| Priority                                                     |
| Notes                                                        |
|--------------------------------------------------------------|
|             [Cancel]          [Save Reminder]                |
+--------------------------------------------------------------+
```

### Interaction Notes

- Users can associate reminders with clients.
- Required fields are validated before saving.
- Saved reminders appear in the Reminder List and Timeline.

## WF-012 — Timeline

### Purpose

Provides a chronological history of business activities, allowing users to track important events across clients, invoices, payments, and reminders.

### Layout Description

The Timeline displays business events in reverse chronological order, with filters to narrow the displayed activity.

### Components

- Page Header
- Search & Filter Bar
- Timeline Feed
- Pagination

### Desktop Wireframe

```text
+--------------------------------------------------------------------------------------+
| Business Pulse > Timeline                                                           |
+--------------------------------------------------------------------------------------+
| Search ____________  Event Type ▼  Client ▼  Date Range ▼                          |
+--------------------------------------------------------------------------------------+
| ● Payment Received                                                                  |
|   John Doe paid ₹8,000 for INV-001                                 15 Jul 2026      |
|--------------------------------------------------------------------------------------|
| ● Invoice Created                                                                   |
|   INV-002 created for Sarah Smith                               14 Jul 2026         |
|--------------------------------------------------------------------------------------|
| ● Reminder Completed                                                                |
|   Follow-up call completed with John Doe                        13 Jul 2026         |
|--------------------------------------------------------------------------------------|
| ● Client Added                                                                      |
|   Michael Johnson added to client list                         12 Jul 2026          |
+--------------------------------------------------------------------------------------+
| Page 1 of N                                                            Pagination    |
+--------------------------------------------------------------------------------------+
```

### Interaction Notes

- Events are displayed from newest to oldest.
- Users can filter activities by client, event type, or date range.
- Selecting an event navigates to the related business record.
- Timeline entries are read-only and cannot be modified.

## WF-013 — Business Profile

### Purpose

Allows users to manage business information used throughout the application, including invoice generation and business identity.

### Layout Description

A structured form divided into logical sections for business details, contact information, financial settings, and invoice preferences.

### Components

#### Business Information

- Business Name
- Owner Name
- Logo (Optional)
- Business Type

#### Contact Information

- Email
- Phone
- Website
- Address

#### Financial Information

- Currency
- Tax Information
- Payment Details

#### Invoice Preferences

- Invoice Prefix
- Invoice Number Format
- Default Payment Terms
- Default Notes

#### Actions

- Save Changes
- Cancel

### Desktop Wireframe

```text
+--------------------------------------------------------------------------------------+
| Business Profile                                                                    |
+--------------------------------------------------------------------------------------+
| Business Information                                                                |
| Business Name *                                                                     |
| Owner Name                                                                          |
| Business Type                                                                       |
| Logo                                                                                |
|--------------------------------------------------------------------------------------|
| Contact Information                                                                 |
| Email *                                                                             |
| Phone                                                                               |
| Website                                                                             |
| Address                                                                             |
|--------------------------------------------------------------------------------------|
| Financial Settings                                                                  |
| Currency                                                                            |
| Tax Information                                                                     |
| Payment Details                                                                     |
|--------------------------------------------------------------------------------------|
| Invoice Preferences                                                                 |
| Invoice Prefix                                                                      |
| Number Format                                                                       |
| Payment Terms                                                                       |
| Default Notes                                                                       |
|--------------------------------------------------------------------------------------|
|                     [Cancel]                     [Save Changes]                      |
+--------------------------------------------------------------------------------------+
```

### Interaction Notes

- Changes affect future invoices unless otherwise specified.
- Required fields are validated before saving.
- Existing values are pre-populated for editing.
- Saving updates the business profile without affecting historical records.

# 6. Mobile Adaptations

## Objective

This section defines how the desktop wireframes adapt to smaller screen sizes while maintaining the same business workflows, information hierarchy, and functionality.

The mobile experience prioritizes usability, readability, and efficient navigation without changing the underlying business behavior.

## Responsive Principles

### Single-Column Layout

Content should stack vertically on smaller screens to improve readability and simplify user interaction.

### Adaptive Navigation

The desktop sidebar should collapse into a mobile navigation menu that provides access to all primary workspaces.

### Prioritized Content

The most important information and primary actions should appear first. Secondary information may be displayed further down the page or within expandable sections.

### Touch-Friendly Controls

Interactive elements should be appropriately sized and spaced to support touch-based interactions.

### Responsive Tables

Large data tables should adapt for mobile by:

- Displaying key information in stacked cards or list views.
- Allowing users to access complete record details through dedicated detail screens.
- Preserving search and filtering capabilities.

### Responsive Forms

Forms should:

- Use a single-column layout.
- Display one input field per row.
- Position action buttons at the bottom of the form.
- Maintain the logical grouping of related fields.

## Mobile Layout

The standard mobile layout consists of:

```text
+--------------------------------------+
| Header                               |
+--------------------------------------+
| Page Title                           |
| Primary Action                       |
+--------------------------------------+
| Search / Filters (if applicable)     |
+--------------------------------------+
| Main Content                         |
|                                      |
|                                      |
+--------------------------------------+
| Bottom Navigation / Menu             |
+--------------------------------------+
```

## Mobile-Specific Considerations

- Dashboard summary cards stack vertically.
- Client, invoice, and reminder lists display as cards instead of tables.
- Tab-based workspaces become horizontally scrollable tabs or segmented controls.
- Primary actions remain easily accessible without obstructing content.
- Long forms support smooth vertical scrolling.
- Timeline events remain in chronological order using a vertically stacked layout.

## Consistency

All mobile adaptations should:

- Preserve the workflows defined in the UX Specification.
- Maintain consistent terminology and navigation.
- Present the same business information as the desktop experience.
- Avoid introducing mobile-only business functionality.
- Ensure users can complete all core MVP tasks regardless of device.

# 7. Wireframe Decision Log

## Purpose

The Wireframe Decision Log records the key structural decisions made during the design of the application's wireframes. It provides context for future design and development work, helping maintain consistency as the product evolves.

| ID     | Decision                                                                              | Rationale                                                                                                     |
| ------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| WD-001 | Adopt a consistent application shell across all primary screens.                      | Reduces cognitive load and provides a predictable user experience.                                            |
| WD-002 | Use a persistent global navigation for desktop layouts.                               | Enables quick access to all major workspaces without disrupting user workflows.                               |
| WD-003 | Organize client information within a dedicated Client Workspace using tab navigation. | Centralizes all client-related data while minimizing unnecessary page navigation.                             |
| WD-004 | Standardize page headers with titles and primary actions.                             | Improves consistency and makes important actions easy to locate.                                              |
| WD-005 | Use data tables for managing collections of clients, invoices, and reminders.         | Supports efficient searching, filtering, sorting, and record management.                                      |
| WD-006 | Use summary cards on the Business Pulse Dashboard.                                    | Provides an at-a-glance overview of key business metrics and outstanding work.                                |
| WD-007 | Design forms using logical field groupings and a single-column flow.                  | Improves readability and simplifies data entry on both desktop and mobile devices.                            |
| WD-008 | Represent business history using a chronological timeline.                            | Provides a clear audit trail of business activities and improves traceability.                                |
| WD-009 | Keep wireframes low-fidelity and implementation-independent.                          | Separates structural design from visual design, allowing UI decisions to evolve independently.                |
| WD-010 | Design all layouts using responsive principles from the outset.                       | Ensures the application remains usable across desktop and mobile devices without changing business workflows. |

## Future Considerations

The following items are intentionally deferred to later design and implementation phases:

- Visual branding and theme
- Color palette and typography
- Iconography
- Spacing and sizing specifications
- Component styling
- Animation and transitions
- Dark mode support
- Accessibility enhancements beyond structural considerations
- UI Design System
- Frontend implementation details

## Approval Status

This Wireframe Specification represents the approved low-fidelity structural layouts for the MVP.

Subsequent UI Design, Frontend Architecture, and Frontend Development should remain consistent with the layouts and structural decisions documented in this specification unless future product requirements require formal revisions.
