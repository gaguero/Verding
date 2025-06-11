# Verding: Agent-First Microgreens Management System - UX/UI Style Guide

## Color Palette

### Primary Colors

- **Primary Off-White** - #F5F5F0 (Used for backgrounds and main surfaces)
- **Primary Earth Green** - #2C5545 (Primary brand color for buttons, icons, and
  emphasis)

### Secondary Colors

- **Secondary Sage** - #7A9B76 (For secondary elements and hover states)
- **Secondary Cream** - #EAE7DC (For subtle backgrounds and selected states)

### Accent Colors

- **Accent Teal** - #00A896 (For important actions and notifications)
- **Accent Gold** - #D4AF37 (For highlights and special elements)

### Functional Colors

- **Success Green** - #4A7C59 (For success states and confirmations)
- **Error Red** - #A13D3D (For errors and destructive actions)
- **Warning Amber** - #CD853F (For warnings and cautions)
- **Info Blue** - #5B7B9A (For informational elements)

### Background Colors

- **Background Off-White** - #F5F5F0 (Main app background)
- **Background Paper** - #FFFEF8 (For cards and content areas)
- **Background Dark** - #1A1A1A (For dark mode primary background)
- **Background Subtle Pattern** - Subtle dotted pattern overlay (5% opacity)

## Typography

### Font Family

- **Primary Font**: SF Pro Text (iOS) / Roboto (Android) / Inter (Web)
- **Display Font**: Montserrat (for headings and special elements)

### Font Weights

- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Text Styles

#### Headings

- **H1**: 32px/36px, Montserrat, Bold, Letter spacing -0.3px
  - Used for app title and major headers
- **H2**: 26px/30px, Montserrat, Bold, Letter spacing -0.2px
  - Used for section headers and card titles
- **H3**: 22px/26px, Montserrat, Semibold, Letter spacing -0.1px
  - Used for subsection headers and important text

#### Body Text

- **Body Large**: 17px/24px, Regular, Letter spacing 0px
  - Primary reading text for detailed content
- **Body**: 15px/22px, Regular, Letter spacing 0px
  - Standard text for most UI elements
- **Body Small**: 13px/18px, Regular, Letter spacing 0.1px
  - Secondary information and supporting text

#### Special Text

- **Caption**: 12px/16px, Medium, Letter spacing 0.2px
  - Used for dates, timestamps, and labels
- **Button Text**: 16px/24px, Medium, Letter spacing 0.1px
  - Used specifically for buttons and interactive elements
- **Data Label**: 14px/18px, Semibold, Letter spacing 0.5px, All caps
  - Used for data points and metrics
- **Date Display**: 20px/24px, Light, Letter spacing 0.2px
  - Used for calendar dates and time displays

## Component Styling

### Buttons

#### Primary Button

- Background: Primary Earth Green (#2C5545)
- Text: White (#FFFFFF)
- Height: 52dp
- Corner Radius: 26dp (pill-shaped)
- Padding: 16dp horizontal
- Shadow: Y-offset 2dp, Blur 8dp, Opacity 15%, Color #000000
- State Changes:
  - Hover/Focus: 10% lighter
  - Pressed: 10% darker + scale to 98%
  - Disabled: 50% opacity

#### Secondary Button

- Border: 1.5dp Primary Earth Green (#2C5545)
- Text: Primary Earth Green (#2C5545)
- Background: Transparent
- Height: 52dp
- Corner Radius: 26dp (pill-shaped)
- State Changes:
  - Hover/Focus: Background fill 10% opacity
  - Pressed: Background fill 15% opacity + scale to 98%
  - Disabled: 50% opacity

#### Text Button

- Text: Primary Earth Green (#2C5545)
- No background or border
- Height: 44dp
- State Changes:
  - Hover/Focus: 10% darker text
  - Pressed: 15% darker text + scale to 98%
  - Disabled: 50% opacity

### Cards

#### Standard Card

- Background: Background Paper (#FFFEF8)
- Shadow: Y-offset 2dp, Blur 12dp, Opacity 6%
- Corner Radius: 16dp
- Padding: 20dp
- Border: Optional 1dp stroke, 5% black

#### Feature Card

- Background: Background Paper (#FFFEF8)
- Shadow: Y-offset 4dp, Blur 16dp, Opacity 8%
- Corner Radius: 20dp
- Padding: 24dp
- Border: Optional 1dp stroke, 5% black
- Decorative Elements: Subtle leaf pattern or plant accents

#### Data Card

- Background: Background Paper (#FFFEF8)
- Shadow: Y-offset 2dp, Blur 10dp, Opacity 5%
- Corner Radius: 16dp
- Padding: 16dp
- Border: Optional 1dp stroke, 5% black
- Decorative Elements: Subtle microgreens watermark at 5% opacity

### Input Fields

#### Text Input

- Height: 56dp
- Corner Radius: 12dp
- Border: 1dp Secondary Sage (#7A9B76) at 50% opacity
- Active Border: 2dp Primary Earth Green (#2C5545)
- Background: White (#FFFFFF)
- Text: Dark Gray (#333333)
- Placeholder Text: Neutral Gray (#9E9E9E)
- Padding: 16dp horizontal, 12dp vertical
- State Changes:
  - Focus: Border color change + subtle glow effect
  - Error: Error Red border + error message below
  - Disabled: 50% opacity

#### Selection Input (Dropdown/Picker)

- Height: 56dp
- Corner Radius: 12dp
- Border: 1dp Secondary Sage (#7A9B76) at 50% opacity
- Background: White (#FFFFFF)
- Text: Dark Gray (#333333)
- Icon: Chevron down, Primary Earth Green (#2C5545)
- Padding: 16dp horizontal, 12dp vertical

#### Date Picker

- Style consistent with Selection Input
- Calendar Popup:
  - Background: Background Paper (#FFFEF8)
  - Selected Date: Primary Earth Green (#2C5545) circle
  - Today's Date: Outlined circle
  - Day Names: Caption style text
  - Month Navigation: Text Button style

### Icons

#### System Icons

- Primary Size: 24dp x 24dp
- Small Size: 20dp x 20dp
- Navigation Icons: 28dp x 28dp
- Line Weight: 1.5dp for outlined icons
- Style: Rounded corners, consistent with overall aesthetic
- Primary color for interactive icons: Primary Earth Green (#2C5545)
- Secondary color for inactive/decorative icons: Neutral Gray (#9E9E9E)

#### Agriculture Icons

- Plant Icons: 32dp x 32dp for feature areas, 20dp x 20dp for inline
- Sensor Icons: 24dp x 24dp
- Weather Icons: Various sizes (24dp, 32dp) for environmental data
- Style: Simple, elegant line drawings with occasional fill
- Colors: Primary Earth Green (#2C5545) or Secondary Sage (#7A9B76)

### Special Elements

#### Dashboard Widget Framework

- **Widget Container**: Background Paper (#FFFEF8), 16dp corner radius
- **Widget Border**: 1dp stroke, Secondary Sage (#7A9B76) at 20% opacity
- **Widget Padding**: 16dp internal padding, 8dp between widgets
- **Widget Shadow**: Y-offset 2dp, Blur 8dp, Opacity 10%
- **Widget Header**: H4 style title, Caption style subtitle/timestamp
- **Widget Actions**: Icon buttons, 24dp x 24dp, top-right corner
- **Loading State**: Subtle pulse animation, Secondary Sage (#7A9B76) at 30%

#### Sensor Data Widgets

- **Real-time Reading Display**:
  - Value: H2 style for main reading, Body Large for units
  - Status Indicator: 8dp circle, color-coded (green: normal, amber: warning,
    red: critical)
  - Threshold Bars: 4dp height, full widget width, positioned below value
  - Last Update: Caption style, bottom-left corner
- **Historical Trend Chart**:
  - Background: Background Paper (#FFFEF8)
  - Grid Lines: 1dp, 10% black opacity
  - Data Lines: 2dp thickness, Primary Earth Green (#2C5545) for single sensor
  - Multi-sensor: Accent Teal (#00A896), Warm Terracotta (#D4A574), Secondary
    Sage (#7A9B76)
  - Data Points: 4dp circles on hover/active
  - Axis Labels: Caption style
- **Sensor Status Overview**:
  - Sensor Item: 48dp height, horizontal layout
  - Status Icon: 16dp circle, left-aligned
  - Sensor Name: Body style, middle-aligned
  - Last Reading: Caption style, right-aligned

#### Operational Performance Widgets

- **KPI Display**:
  - Main Value: H1 style, center-aligned
  - Target Comparison: Body Large style, below main value
  - Progress Ring: 4dp stroke, 64dp diameter, Primary Earth Green (#2C5545)
  - Performance Icon: 24dp, above main value
- **Performance Summary Cards**:
  - Metric Name: H4 style, top of card
  - Current Value: H2 style, center
  - Trend Indicator: 16dp arrow icon, right-aligned
  - Percentage Change: Body style, color-coded (green: positive, red: negative)

#### Task Management Widgets

- **Task List Items**:
  - Height: 40dp per task item
  - Priority Dot: 8dp circle, left margin, color-coded
  - Task Text: Body style, truncated with ellipsis if needed
  - Due Date: Caption style, right-aligned
  - Hover State: Background Paper (#FFFEF8) with 5% Primary Earth Green tint
- **Task Completion Rate**:
  - Progress Bar: 8dp height, full width, rounded corners
  - Completed: Primary Earth Green (#2C5545)
  - Remaining: Secondary Sage (#7A9B76) at 30%
  - Percentage Label: Body Large style, center of bar

#### Inventory Widgets

- **Stock Level Indicators**:
  - Item Name: Body style, left-aligned
  - Stock Bar: 6dp height, color-coded (green: sufficient, amber: low, red:
    critical)
  - Quantity Text: Caption style, right-aligned
  - Low Stock Alert: 16dp warning icon, Warm Terracotta (#D4A574)

#### Compliance Widgets

- **Record Summary Display**:
  - Count Badge: H3 style, Primary Earth Green (#2C5545) background, white text
  - Period Label: Caption style, below badge
  - Compliance Status: 12dp icon, color-coded
  - Quick Action Button: Text Button style, bottom of widget

#### Widget Interaction States

- **Default State**: Standard styling as defined above
- **Hover State**: 4dp border, Accent Teal (#00A896), subtle scale 102%
- **Active State**: 2dp border, Primary Earth Green (#2C5545)
- **Loading State**: Content area with shimmer animation, Secondary Sage
  (#7A9B76) at 20%
- **Error State**: 2dp border, error red, error icon overlay
- **Empty State**: Centered icon and text, Secondary Sage (#7A9B76) at 50%

#### Property Context Selector

- **Selector Container**: 44dp height, full width
- **Selected Property**: H4 style, Primary Earth Green (#2C5545)
- **Dropdown Icon**: 20dp chevron, right-aligned
- **Dropdown Menu**: Background Paper (#FFFEF8), 8dp corner radius, 4dp shadow
- **Property Options**: 40dp height each, Body style, hover with 5% tint

#### Sensor Data Chart

- Background: Background Paper (#FFFEF8)
- Grid Lines: 1dp, 10% black
- Text: Body Small style
- Data Points: 6dp circles, color-coded by metric
- Line Thickness: 2dp
- Highlight Color: Accent Teal (#00A896) for important metrics

## Spacing System

- 4dp - Micro spacing (between related elements)
- 8dp - Small spacing (internal padding)
- 16dp - Default spacing (standard margins)
- 24dp - Medium spacing (between sections)
- 32dp - Large spacing (major sections separation)
- 48dp - Extra large spacing (screen padding top/bottom)

### Layout Grid

- Base Unit: 8dp
- Margins: 24dp (default screen edge margin)
- Gutters: 16dp (space between grid columns)
- Columns: 4 (mobile), 8 (tablet), 12 (desktop)

## Motion & Animation

### Transitions

- Standard Transition: 250ms, Ease-out curve
- Emphasis Transition: 350ms, Spring curve (tension: 280, friction: 30)
- Microinteractions: 180ms, Ease-in-out
- Page Transitions: 400ms, Custom cubic-bezier(0.2, 0.8, 0.2, 1)

### Animation Principles

- **Growth Movement**: Subtle growing animations for plant elements (3-5px
  movement over 3-4 seconds)
- **Data Connections**: Lines drawing between points when revealing
  relationships or dependencies
- **Sensor Updates**: Subtle pulse effect when new sensor data arrives
- **Card Reveal**: Slight scale up (from 95% to 100%) combined with fade-in
- **Transitions**: Prefer slide transitions for hierarchical navigation, fade
  for lateral navigation

### Specific Animations

- **Task Completion**: Checkmark drawing animation with success color pulse
- **Loading State**: Circular motion resembling plant growth cycle
- **Success Confirmation**: Gentle pulse effect with success color
- **Data Generation**: Progressive reveal of elements from center outward

## Dark Mode Variants

### Dark Mode Colors

- Dark Background: #121212 (primary dark background)
- Dark Surface: #1E1E1E (card backgrounds)
- Dark Paper: #252525 (elevated surfaces)
- Dark Primary Green: #5B8C7B (adjusted for contrast)
- Dark Secondary Sage: #94B090 (adjusted for contrast)
- Dark Text Primary: #EEEEEE
- Dark Text Secondary: #B0BEC5

### Dark Mode Adjustments

- Increase contrast for text elements
- Reduce shadow intensity by 30%
- Increase glow effects for interactive elements
- Use darker variants of accent colors with increased saturation
- Maintain pattern visibility by increasing opacity to 10%

## Accessibility Considerations

### Color Contrast

- All text meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- Interactive elements maintain 3:1 contrast ratio against backgrounds
- Error states use additional indicators beyond color (icons, text)

### Touch Targets

- Minimum touch target size: 44dp x 44dp
- Minimum spacing between touch targets: 8dp
- Increased tap area for smaller visual elements

### Text Scaling

- All text scales appropriately with system font size settings
- Layouts adapt to accommodate larger text sizes
- No fixed height containers for text elements

### Screen Reader Support

- All interactive elements have appropriate accessibility labels
- Proper heading hierarchy for screen reader navigation
- Custom actions for complex data visualization interactions

## Brand Elements

### Logo Treatment

- Logo placement: Centered at top of main screens, left-aligned on secondary
  screens
- Minimum clear space: 16dp on all sides
- Size: 120dp width on splash screen, 80dp on main screen, 40dp on secondary
  screens

### Brand Patterns

- **Leaf Pattern**: Subtle leaf pattern representing growth, used as background
  texture
- **Growth Lines**: Fine lines connecting points, used for decorative elements
  and dividers
- **Microgreens Grid**: Grid arrangement of microgreens, used as a navigational
  element or decorative background

### Imagery Style

- **Plant Photography**: High contrast, close-up imagery of microgreens for
  backgrounds and feature areas
- **Agricultural Illustrations**: Simple, elegant line drawings of plants and
  farming elements
- **Data Visualization**: Clean, minimalist charts and graphs with the brand
  color palette

## Responsive Behavior

### Breakpoints

- Mobile: 320dp - 599dp
- Tablet: 600dp - 1023dp
- Desktop: 1024dp and above

### Adaptation Principles

- Single column layout on mobile
- Two column layout on tablet
- Multi-column layout on desktop
- Maintain consistent padding and spacing ratios across breakpoints
- Data visualizations expand to fill available space while maintaining
  proportions
- Typography scales up slightly on larger screens (approximately 10% increase
  from mobile to desktop)

## Implementation Guidelines

### Design System Components

- Build all UI elements as reusable components
- Maintain consistent naming conventions across platforms
- Document component variants and states
- Create shared symbol library for design handoff

### Asset Delivery

- SVG format for all icons and illustrations
- PNG/WebP for complex imagery with appropriate resolution variants
- Font files included in asset package or linked from approved CDN
- Color definitions in appropriate format for each platform (hex, rgb, rgba)

### Platform-Specific Considerations

- iOS: Respect safe areas and system gestures
- Android: Support material design interaction patterns
- Web: Ensure responsive behavior across all breakpoints
- All Platforms: Support system dark mode toggle

## Agent Interaction Elements

### Conversation Bubble

- Background: Background Paper (#FFFEF8) for user, Primary Earth Green (#2C5545)
  for agent
- Text: Dark Gray (#333333) for user, White (#FFFFFF) for agent
- Corner Radius: 20dp with one corner at 4dp to indicate direction
- Padding: 16dp
- Max Width: 80% of screen width
- Timestamp: Caption style, below bubble, right-aligned for user, left-aligned
  for agent

### Voice Input Button

- Size: 64dp diameter
- Background: Primary Earth Green (#2C5545)
- Icon: Microphone, White (#FFFFFF)
- Active State: Pulse animation with Accent Teal (#00A896)
- Shadow: Y-offset 4dp, Blur 16dp, Opacity 20%

### Suggestion Chips

- Height: 36dp
- Background: Secondary Cream (#EAE7DC)
- Text: Primary Earth Green (#2C5545)
- Corner Radius: 18dp (pill-shaped)
- Padding: 12dp horizontal
- Spacing Between Chips: 8dp
- Max Width: Content + 24dp padding
- Scroll Behavior: Horizontal scroll if multiple chips exceed screen width

### Knowledge Card

- Background: Background Paper (#FFFEF8)
- Border: 1dp stroke, Secondary Sage (#7A9B76) at 30% opacity
- Corner Radius: 16dp
- Padding: 16dp
- Title: H3 style
- Content: Body style
- Source Attribution: Caption style, bottom of card
- Action Buttons: Text Button style, bottom right
