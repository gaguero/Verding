# Verding: Agent-First Microgreens Management System - Design Brief

## Agent Core & Natural Language Processing

### Chat Interface Screen

#### Initial State

- Background uses the Primary Off-White (#F5F5F0) with subtle dotted pattern
  overlay at 5% opacity
- Top navigation bar in Primary Earth Green (#2C5545) with app logo centered,
  using 80dp width
- Message input field at bottom, 56dp height with 12dp corner radius, border in
  Secondary Sage (#7A9B76) at 50% opacity
- Voice input button (64dp diameter) in Primary Earth Green (#2C5545) with
  microphone icon in white, positioned at right edge of input field
- Empty state shows welcome message in a conversation bubble with Background
  Paper (#FFFEF8) and subtle shadow
- Welcome message uses Body Large (17px/24px) typography in Dark Gray (#333333)
- "Type a message" placeholder in input field uses Neutral Gray (#9E9E9E)
- Subtle leaf pattern decorative elements in corners at 5% opacity

#### Active Conversation State

- Conversation history displayed in scrollable area between top bar and input
  field
- User messages right-aligned in Background Paper (#FFFEF8) bubbles with 20dp
  corner radius (one corner at 4dp)
- Agent messages left-aligned in Primary Earth Green (#2C5545) bubbles with
  white text
- Timestamps below each message in Caption style (12px/16px, Medium)
- New messages animate with a subtle fade-in and slight scale up (95% to 100%)
- When agent is typing, animated ellipsis indicator pulses gently in Primary
  Earth Green
- Suggestion chips appear above input field when relevant, using Secondary Cream
  (#EAE7DC) background with Primary Earth Green text
- Horizontal scroll for multiple suggestion chips with 8dp spacing
- Messages with actions show action buttons in Text Button style below message
  content
- Pull-to-refresh gesture triggers a gentle growth animation resembling plant
  sprouting

### Knowledge Card Screen

#### Collapsed State

- Card uses Background Paper (#FFFEF8) with 16dp corner radius and subtle shadow
- Card header shows title in H3 style (22px/26px, Montserrat, Semibold)
- Preview of content in Body style (15px/22px, Regular)
- Expand indicator icon in Primary Earth Green (#2C5545)
- Card has 16dp padding on all sides
- Subtle hover effect increases shadow depth on mouse over
- Tap/click triggers expansion animation

#### Expanded State

- Card expands with smooth animation (250ms, Ease-out curve)
- Full content revealed in Body style
- Source attribution at bottom in Caption style
- Action buttons (if applicable) appear at bottom right in Text Button style
- Close/collapse icon replaces expand icon
- Background slightly darkens behind card to create focus
- Scrollable content area if knowledge content exceeds maximum height
- Related knowledge cards may appear below with "Related Information" label

### Multi-channel Integration Screen

#### Channel Selection State

- Tab navigation at top showing available channels (Telegram, Email, Web,
  Mobile)
- Active channel tab uses Primary Earth Green (#2C5545) underline and slightly
  bolder text
- Inactive channels use Neutral Gray (#9E9E9E) with no underline
- Smooth slide transition (250ms) when switching between channels
- Channel-specific icons precede channel names
- Consistent conversation view across channels with subtle formatting
  adaptations
- Channel setup buttons for unconfigured channels using Secondary Button style
- Status indicators show connection state for each channel

#### Channel Configuration State

- Form fields for channel-specific settings using Text Input style
- Step-by-step configuration wizard with progress indicator
- Clear instructions in Body style text above each input
- Validation feedback appears inline below inputs
- Test connection button in Primary Button style
- Success confirmation uses Success Green (#4A7C59) with checkmark animation
- Error feedback uses Error Red (#A13D3D) with helpful resolution steps
- Save configuration button in Primary Button style at bottom
- Cancel button as Text Button style beside save button

## Progressive Setup & Onboarding

### Welcome Screen

#### First Launch State

- Full-screen gradient background transitioning from Primary Off-White (#F5F5F0)
  to Secondary Cream (#EAE7DC)
- Large Verding logo (120dp width) centered in top third of screen
- Welcoming headline in H1 style (32px/36px, Montserrat, Bold)
- Brief app description in Body Large style (17px/24px, Regular)
- "Get Started" button in Primary Button style (Primary Earth Green background,
  white text, 52dp height, pill-shaped)
- "Already have an account? Sign In" as Text Button below primary button
- Subtle leaf pattern animations in background (3-5px movement over 3-4 seconds)
- Language selector in bottom corner as Text Button with globe icon

#### Sign In State

- Clean, focused form on Background Paper (#FFFEF8) card with subtle shadow
- Email and password fields using Text Input style
- "Forgot Password?" link as Text Button below password field
- Sign In button in Primary Button style
- "Back to Welcome" as Text Button
- Form validation provides inline feedback
- Success triggers a gentle pulse animation with Success Green
- Error messages appear below relevant field in Error Red (#A13D3D)
- Loading state shows circular animation resembling plant growth cycle

### Profile Setup Screen

#### Basic Information State

- Progress indicator at top showing 1 of 5 steps completed
- Step title in H2 style (26px/30px, Montserrat, Bold)
- Form fields for name, email, company using Text Input style
- Optional fields clearly marked
- Field labels in Body Small style (13px/18px, Regular)
- Helpful tooltips available via info icons
- Next button in Primary Button style
- Back button as Text Button
- Form fields animate focus state with subtle border glow
- Validation occurs on field exit with gentle feedback animation

#### Business Details State

- Progress indicator advances to 2 of 5
- Smooth transition animation between steps
- Business size selection using radio cards with icons
- Focus area multi-select using checkbox cards
- Visual confirmation of selections with subtle highlight animation
- Contextual help text explains importance of accurate information
- Next and Back buttons maintain consistent positioning
- Skip option available for optional sections as Text Button
- Selected options use Secondary Sage (#7A9B76) highlight

### Subscription Selection Screen

#### Plan Comparison State

- Clean comparison table on Background Paper (#FFFEF8)
- Plan tiers displayed as columns with feature rows
- Current selection highlighted with Secondary Sage (#7A9B76) border
- Feature availability indicated with checkmarks in Primary Earth Green
- Premium features highlighted with Accent Gold (#D4AF37)
- Monthly/annual toggle with pill selector and savings callout
- Clear pricing in H3 style with billing period in Body Small
- "Select Plan" button in Primary Button style within each column
- Hover states provide subtle elevation increase
- Feature tooltips provide additional information on hover/tap

#### Payment Information State

- Secure form indicator with lock icon in Primary Earth Green
- Credit card input with card type detection
- Form fields for billing information using Text Input style
- Country selector as dropdown using Selection Input style
- Save payment method toggle with explanatory text
- Terms and conditions checkbox with link to full terms
- "Complete Purchase" button in Primary Button style
- "Back to Plans" as Text Button
- Secure payment processing animation during submission
- Success confirmation with checkmark animation and confetti effect

### Feature Unlocking Screen

#### Setup Checklist State

- Overall progress bar at top showing percentage complete
- Tasks grouped by category with collapsible sections
- Completed tasks show checkmark in Success Green (#4A7C59)
- Current task highlighted with Primary Earth Green (#2C5545)
- Locked tasks in Neutral Gray (#9E9E9E) with lock icon
- Estimated time for each task in Caption style
- Task cards expand on tap to reveal detailed instructions
- "Continue Setup" button leads to next incomplete task
- "Skip for Now" option available for non-critical tasks
- Celebration animation when completing major milestones

#### Feature Tour State

- Modal overlay focuses attention on new feature
- Step-by-step walkthrough with highlight spotlights
- Navigation dots show progress through tour
- Clear, concise instructions in Body style
- Interactive elements encourage learning by doing
- "Skip Tour" option as Text Button
- "Next" and "Back" buttons to navigate steps
- Final step shows "Got It" button with completion animation
- Tour remembers progress if interrupted
- Subtle guidance animations demonstrate interactions

## Sensor Integration

### Sensor Dashboard Screen

#### Overview State

- Grid layout of sensor cards on Background Off-White (#F5F5F0)
- Each sensor card uses Background Paper (#FFFEF8) with 16dp corner radius
- Sensor readings displayed with current value in H3 style
- Trend indicators show change direction in appropriate color (up/down)
- Status indicators use color coding: Normal (Secondary Sage), Warning (Warning
  Amber), Alert (Error Red)
- Last updated timestamp in Caption style
- Quick action buttons for each sensor in Text Button style
- Add sensor button as Secondary Button in empty grid position
- Sensors grouped by location with collapsible headers
- Pull-to-refresh with circular loading animation

#### Sensor Detail State

- Full-screen view of selected sensor data
- Large current reading in H2 style with appropriate unit
- Historical graph using Primary Earth Green for lines, Secondary Sage for area
  fill
- Time range selector (day, week, month, year) as pill selector
- Min/max values displayed with timestamps
- Threshold configuration controls
- Notification settings toggle
- Data export option as Text Button
- Related sensors section at bottom
- Back button returns to dashboard with smooth transition

### Sensor Configuration Screen

#### Add Sensor State

- Step-by-step wizard interface with progress indicator
- Sensor type selection with visual icons for each type
- Home Assistant connection status indicator
- Discover sensors button triggers scanning animation
- Available sensors listed with signal strength indicators
- Manual configuration option for advanced users
- Form fields for sensor parameters using Text Input style
- Test connection button verifies communication
- Success/failure feedback with appropriate color and icon
- Save button in Primary Button style becomes active when configuration is valid

#### Alert Configuration State

- Threshold sliders with visual range indicators
- Notification method selection (app, email, Telegram)
- Notification frequency options to prevent alert fatigue
- Alert priority selection (low, medium, high)
- Test alert button sends sample notification
- Alert history section shows recent alerts
- Enable/disable toggle for each alert type
- Time-based rules configuration (e.g., only during certain hours)
- Save configuration button in Primary Button style
- Preview of alert message in conversation bubble style

## Operations Management

### Task Planning Screen

#### BuJo Daily Log State

- Clean, paper-like Background Paper (#FFFEF8) surface
- Date navigation at top with current date in H2 style
- Previous/next date buttons as Text Buttons with arrow icons
- Task entries using Body style with BuJo notation system:
  - • Task (empty circle)
  - ✓ Completed (filled circle)
  - > Migrated (right arrow)
  - < Scheduled (left arrow)
  - ⨯ Canceled (cross)
- Priority indicators as color-coded dots
- Add task button as Secondary Button with plus icon
- Task groups collapsible with subtle animation
- Drag-and-drop reordering with haptic feedback
- Swipe actions for quick complete/migrate/cancel
- Natural language task entry field at bottom

#### Calendar View State

- Month grid view with day cells
- Current day highlighted with Primary Earth Green circle
- Days with tasks show dot indicators
- Task count per day displayed in Caption style
- Tap day to expand task list below calendar
- Week/month view toggle as pill selector
- Task preview shows first 3 tasks per day
- "Show More" expands to full list
- Add task button consistently positioned at bottom right
- Smooth animations when switching between days
- Drag tasks between days for rescheduling

### Sowing Planning Screen

#### Plan Creation State

- Split view with available products on left, plan on right
- Product cards with image, name, and key details
- Drag-and-drop interface for adding products to plan
- Quantity selector appears when product is added
- Date selector for sowing date using Date Picker style
- Automatic harvest date calculation based on product data
- Resource requirements automatically calculated and displayed
- Warning indicators for resource conflicts
- Save plan button in Primary Button style
- Template options for quick plan creation
- Validation ensures complete and realistic plan

#### Plan Execution State

- Checklist view of sowing tasks grouped by date
- Task cards show product, quantity, location, and instructions
- Checkbox for marking tasks complete with satisfying animation
- Progress bar shows overall plan completion percentage
- Notes field for adding observations
- Photo upload button for documentation
- Related tasks section shows dependent activities
- Reschedule option for delayed tasks
- Completion triggers next step suggestions
- Historical data comparison shows performance vs. previous cycles

## Customer & Order Management

### Customer Directory Screen

#### Customer List State

- Clean table/list view on Background Off-White (#F5F5F0)
- Customer cards with name, company, contact info, and status
- Search bar at top using Text Input style with filter options
- Sort controls for different customer attributes
- Status indicators use color coding: Active (Secondary Sage), Inactive (Neutral
  Gray), VIP (Accent Gold)
- Add customer button as Primary Button in top right
- Batch actions menu for multiple selections
- Pagination controls at bottom
- List/grid view toggle
- Empty state shows helpful onboarding message and add button
- Hover/tap states provide subtle feedback

#### Customer Detail State

- Customer profile header with name in H2 style and key information
- Contact details section with communication options (call, email, message)
- Order history section with recent and upcoming orders
- Customer preferences section showing product preferences
- Notes section for internal team communication
- Activity timeline showing all interactions
- Edit profile button as Secondary Button
- Back to list button as Text Button with arrow icon
- Tab navigation for different customer information sections
- Floating action button for quick actions (new order, add note)

### Order Management Screen

#### Order Creation State

- Multi-step form with clear progress indicator
- Customer selection with search and recent customers
- Product selection with grid of available products
- Quantity selectors with inventory availability indicators
- Delivery date selection using Date Picker style
- Pricing information with subtotal, discounts, and total
- Special instructions field using Text Input style
- Preview order summary before submission
- Save as template option for recurring orders
- Submit order button in Primary Button style
- Validation ensures complete order information

#### Order Tracking State

- Order cards grouped by status (New, In Progress, Ready, Delivered)
- Visual progress tracker shows order journey
- Color coding indicates status: New (Info Blue), In Progress (Secondary Sage),
  Ready (Warning Amber), Delivered (Success Green)
- Order details expandable with tap/click
- Action buttons appropriate to current status
- Notification badges for orders requiring attention
- Filter controls for viewing specific order types
- Search functionality for finding specific orders
- Batch update options for efficient processing
- Export options for order reports

## Knowledge Base & Document Management

### Document Library Screen

#### Browse State

- Grid/list toggle for document view
- Folder navigation with breadcrumb trail
- Document cards show title, type icon, and preview
- Search bar with advanced filters
- Sort options (name, date, type, size)
- Upload button as Primary Button
- New folder button as Secondary Button
- Selection mode for batch operations
- Empty state provides upload guidance
- Recent documents section at top
- Drag-and-drop area for file uploads with visual feedback

#### Document Detail State

- Document preview occupies main area
- Metadata panel shows file details
- Version history accessible via dropdown
- Share controls with permission settings
- Download button as Secondary Button
- Edit button (if applicable) as Secondary Button
- Related documents section
- Comment thread for collaboration
- Tags management for categorization
- Back button returns to library with smooth transition

### Knowledge Management Screen

#### Article Creation State

- Rich text editor with formatting toolbar
- Title field in H2 style
- Category and tag selectors
- Media insertion tools for images and videos
- Template selection for quick starts
- Auto-save indicator with timestamp
- Preview button to see final appearance
- Publish controls with visibility options
- Version comparison view
- Collaborative editing indicators show other users
- Formatting follows typography hierarchy from style guide

#### Knowledge Search State

- Prominent search bar with autocomplete
- Filters for content type, date, author
- Search results show relevance score
- Quick preview on hover/tap
- Search highlighting in results
- Related searches suggestions
- Recent searches history
- Save search option
- No results state with helpful suggestions
- Voice search option on mobile
- Search analytics for administrators

## Complete GUI Interface

### Dashboard Screen

#### Overview State

- Responsive grid layout adapts to screen size
- Key metrics displayed in card components
- Primary metrics use larger cards with H3 headings
- Secondary metrics in smaller cards with Body headings
- Quick action buttons for common tasks
- Notification center accessible via bell icon
- User profile menu in top right
- Navigation sidebar/bottom bar based on platform
- Data visualizations use Primary Earth Green for primary data, Secondary Sage
  for secondary data
- Time period selector for data (today, week, month, year)
- Refresh button triggers subtle loading animation

#### Customization State

- Edit mode toggle enables dashboard customization
- Cards become draggable with handle indicator
- Add widget button reveals available widget library
- Remove widget option with confirmation
- Resize handles on widgets where applicable
- Layout grid snapping with visual guides
- Save layout button in Primary Button style
- Reset to default option as Text Button
- Preview mode to test layout before saving
- Responsive preview shows layout on different devices
- Success confirmation when layout is saved

### Navigation System

#### Mobile Navigation State

- Bottom navigation bar with 5 key destinations
- Active tab uses Primary Earth Green (#2C5545) with subtle glow
- Inactive tabs use Neutral Gray (#9E9E9E)
- Tab icons use 28dp size with labels in Caption style
- More menu for additional options
- Floating action button for contextual primary action
- Swipe gestures for navigating between related screens
- Pull-down for search from any screen
- Navigation transitions use slide for hierarchical navigation
- Back gesture/button consistently available
- Tab bar hides on scroll down, reveals on scroll up

#### Desktop Navigation State

- Collapsible sidebar navigation with icon and text labels
- Expanded state shows full text labels
- Collapsed state shows only icons with tooltips
- Section headers organize navigation items
- Current section highlighted with Primary Earth Green
- Submenu items nested with appropriate indentation
- Keyboard shortcuts for power users
- Context-sensitive secondary navigation when needed
- Breadcrumb navigation for deep hierarchy
- Search accessible from persistent header
- User settings and profile in top section

### Settings Screen

#### General Settings State

- Clean, organized list of setting categories
- Each category expandable/collapsible
- Setting items use appropriate input controls (toggles, dropdowns, text fields)
- Changes apply immediately with visual feedback
- Reset to defaults option at category level
- Search functionality for finding specific settings
- Help text explains complex settings
- Platform-specific settings clearly marked
- Import/export settings option for backup
- Setting changes trigger appropriate system updates

#### Account Management State

- User profile information with edit controls
- Subscription details and management links
- Team member management for multi-user accounts
- Permission settings with role-based controls
- Security settings (2FA, password change)
- Connected services management
- Notification preferences with granular controls
- Language and localization settings
- Data privacy and export options
- Account deletion option with appropriate safeguards

### Responsive Adaptations

#### Mobile Optimization State

- Single column layouts prioritize important content
- Touch targets minimum 44dp size
- Critical actions within thumb reach zone
- Collapsible sections reduce scrolling
- Form fields expand to full width
- Modal dialogs slide up from bottom
- Context menus appear as bottom sheets
- Landscape orientation supported with adapted layouts
- Pull-to-refresh consistent across all list views
- Keyboard avoidance keeps input fields visible

#### Desktop Enhancement State

- Multi-column layouts utilize additional screen space
- Hover states provide additional information
- Keyboard shortcuts displayed in tooltips
- Drag-and-drop functionality more prominent
- Side panels for additional context without leaving main view
- Split views for related content
- Persistent navigation always visible
- Toolbar customization options
- Multiple windows/tabs support
- Advanced filtering and bulk operations
