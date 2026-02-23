import { useState, useEffect } from "react";

// ═══════════════ DATA BANK ═══════════════
const NICHES = [
  { id:"fintech", label:"Fintech", icon:"💳" },
  { id:"health", label:"Health & Wellness", icon:"🧘" },
  { id:"saas", label:"SaaS / Productivity", icon:"⚙️" },
  { id:"ecommerce", label:"E-commerce", icon:"🛒" },
  { id:"edtech", label:"EdTech", icon:"📚" },
  { id:"social", label:"Social Media", icon:"💬" },
  { id:"travel", label:"Travel & Hospitality", icon:"✈️" },
  { id:"media", label:"Streaming & Media", icon:"🎧" },
  { id:"auto", label:"Automotive / IoT", icon:"🚗" },
  { id:"realestate", label:"Real Estate / PropTech", icon:"🏠" },
  { id:"food", label:"Food & Delivery", icon:"🍔" },
  { id:"gaming", label:"Gaming", icon:"🎮" },
  { id:"hr", label:"HR & Recruiting", icon:"👥" },
  { id:"legal", label:"LegalTech", icon:"⚖️" },
  { id:"devtools", label:"Developer Tools", icon:"🛠️" },
  { id:"nonprofit", label:"Nonprofit / Civic Tech", icon:"🌍" },
  { id:"petcare", label:"Pet Care", icon:"🐾" },
  { id:"dating", label:"Dating / Relationships", icon:"💕" },
  { id:"crypto", label:"Crypto / Web3", icon:"🪙" },
  { id:"insurance", label:"Insurance", icon:"🛡️" },
];

const TONES = [
  { id:"casual", label:"Casual & Friendly", desc:"Warm, approachable, uses contractions — like a helpful friend" },
  { id:"professional", label:"Professional & Precise", desc:"Clear, confident, no fluff — respects the reader's time" },
  { id:"playful", label:"Playful & Cheeky", desc:"Witty, bold, personality-forward — think Duolingo or Mailchimp" },
  { id:"empathetic", label:"Empathetic & Reassuring", desc:"Calm, supportive, never blaming — like a patient guide" },
  { id:"minimal", label:"Minimal & Direct", desc:"Fewest words possible — every word earns its place" },
  { id:"luxe", label:"Premium & Refined", desc:"Elevated, tasteful, understated — like Apple or Aesop" },
  { id:"technical", label:"Technical & Dev-friendly", desc:"Precise terminology, respects expertise — like Stripe or Vercel" },
  { id:"inclusive", label:"Inclusive & Accessible", desc:"Plain language, no jargon, culturally aware — like gov.uk" },
  { id:"bold", label:"Bold & Motivational", desc:"High energy, action-oriented, inspires confidence — like Nike or Peloton" },
  { id:"quirky", label:"Quirky & Offbeat", desc:"Unconventional phrasing, memorable — like Oatly or Cards Against Humanity" },
  { id:"clinical", label:"Clinical & Trustworthy", desc:"Evidence-based, cautious, authoritative — like a medical provider" },
  { id:"conversational", label:"Conversational & Warm", desc:"Sounds like texting a smart friend — informal but helpful" },
  { id:"corporate", label:"Corporate & Formal", desc:"Buttoned-up, risk-averse, compliance-friendly — enterprise-grade" },
  { id:"witty", label:"Dry Wit & Understated", desc:"Clever but not loud — subtle humor, deadpan delivery" },
  { id:"urgent", label:"Urgent & Action-oriented", desc:"Creates appropriate urgency without panic — time-sensitive context" },
  { id:"editorial", label:"Editorial & Thoughtful", desc:"Magazine-quality prose, considered phrasing — like Monocle" },
];

const SCREENS = [
  { id:"error_system", label:"System Error", icon:"🔴", components:["title","body","primaryButton","secondaryButton"], mt:"dialog" },
  { id:"error_user", label:"User Input Error", icon:"⛔", components:["title","body","primaryButton"], mt:"dialog" },
  { id:"error_perm", label:"Permission Denied", icon:"🚫", components:["title","body","primaryButton"], mt:"dialog" },
  { id:"empty_first", label:"First-time Empty State", icon:"📭", components:["title","body","primaryButton"], mt:"full" },
  { id:"empty_search", label:"No Search Results", icon:"🔍", components:["title","body","primaryButton"], mt:"full" },
  { id:"onboard_welcome", label:"Welcome / First Screen", icon:"👋", components:["title","body","primaryButton","secondaryButton"], mt:"full" },
  { id:"onboard_step", label:"Onboarding Step", icon:"📋", components:["title","body","primaryButton","skipLink"], mt:"full" },
  { id:"loading", label:"Loading / Progress", icon:"⏳", components:["loadMsg1","loadMsg2","loadMsg3"], mt:"full" },
  { id:"confirm_destroy", label:"Destructive Confirmation", icon:"⚠️", components:["title","body","destructiveButton","cancelButton"], mt:"dialog" },
  { id:"confirm_safe", label:"Non-destructive Confirm", icon:"✔️", components:["title","body","primaryButton","cancelButton"], mt:"dialog" },
  { id:"success", label:"Success / Celebration", icon:"🎉", components:["title","body","primaryButton","secondaryButton"], mt:"dialog" },
  { id:"permission", label:"Permission Request", icon:"🔐", components:["title","body","primaryButton","skipLink"], mt:"full" },
  { id:"paywall", label:"Paywall / Upgrade Gate", icon:"💎", components:["title","body","primaryButton","secondaryButton"], mt:"dialog" },
  { id:"notif", label:"Push Notification", icon:"🔔", components:["notifTitle","notifBody"], mt:"notif" },
  { id:"tooltip", label:"Tooltip / Nudge", icon:"💡", components:["tipBody","tipCta","tipDismiss"], mt:"tip" },
  { id:"cancel", label:"Cancellation Flow", icon:"🚪", components:["title","body","retainButton","confirmCancel"], mt:"full" },
  { id:"settings", label:"Settings / Preferences", icon:"⚙️", components:["setLabel1","setDesc1","setLabel2","setDesc2"], mt:"settings" },
  { id:"banner", label:"Banner / Announcement", icon:"📢", components:["title","body","primaryButton","skipLink"], mt:"full" },
  { id:"email", label:"Transactional Email", icon:"📧", components:["emailSubject","title","body","primaryButton"], mt:"email" },
];

const PERSONAS = [
  { id:"newuser", label:"First-time User", age:"25", d:"Just signed up, zero context, slightly impatient, forming first impressions" },
  { id:"power", label:"Power User", age:"34", d:"Daily user, knows every shortcut, values speed and efficiency over explanation" },
  { id:"elder", label:"Older Adult (65+)", age:"68", d:"Less tech-confident, prefers clarity over cleverness, may need larger text" },
  { id:"teen", label:"Teen (16–19)", age:"17", d:"Digital native, extremely short attention span, fluent in internet culture" },
  { id:"parent", label:"Busy Parent", age:"38", d:"Multitasking with kids around, constantly distracted, needs things to work first try" },
  { id:"nonnative", label:"Non-native English Speaker", age:"30", d:"B2 English level, avoids idioms and slang, prefers simple vocabulary" },
  { id:"a11y", label:"Screen Reader User", age:"42", d:"Visually impaired, relies on assistive tech, content must be linear and descriptive" },
  { id:"skeptic", label:"Privacy-conscious Skeptic", age:"45", d:"Distrusts apps, reads fine print, suspicious of upsells and data collection" },
  { id:"admin", label:"Enterprise Admin", age:"40", d:"Managing 200+ users, needs audit trails, cares about compliance and control" },
  { id:"creator", label:"Content Creator", age:"27", d:"Visually oriented, values aesthetics, builds personal brand on this product" },
  { id:"switcher", label:"Competitor Switcher", age:"32", d:"Just left a competitor, comparing everything, looking for reasons to stay" },
  { id:"lapsed", label:"Lapsed / Returning User", age:"35", d:"Was active 6 months ago, re-opening the app, forgot how things work" },
  { id:"lowlit", label:"Low Digital Literacy", age:"55", d:"Struggles with tech jargon, needs step-by-step guidance, easily overwhelmed" },
  { id:"angry", label:"Frustrated / Angry User", age:"36", d:"Something already went wrong, patience is gone, one more friction = churn" },
  { id:"multi", label:"Multi-account Manager", age:"29", d:"Manages 3+ accounts (personal, work, client), needs clear context-switching" },
  { id:"free", label:"Free Tier Loyalist", age:"24", d:"Uses the product heavily but resists paying, extremely price-sensitive" },
];

const CTX = {
  error_system: [
    { feature:"file upload", page:"document editor", detail:"User was uploading a 15MB presentation. Upload reached 87% before the server timed out after 45 seconds. The file is not saved anywhere.", visible:"Progress bar stuck at 87%, filename visible in upload area" },
    { feature:"payment processing", page:"checkout screen", detail:"User entered card details and clicked 'Pay Now.' The payment gateway returned a 503 error. Card may or may not have been charged.", visible:"Order summary showing $149.99, card ending in 4242" },
    { feature:"real-time sync", page:"collaborative workspace", detail:"User was editing a shared doc when the WebSocket connection dropped. Two teammates are also editing. Unsaved changes exist in the buffer.", visible:"'Last synced: 3 min ago' label, 2 collaborator avatars active" },
    { feature:"data export", page:"analytics dashboard", detail:"User requested a CSV export of 50,000 records. Export crashed after 32,000 rows. Partial data exists on the server.", visible:"Export progress bar at 64%, estimated 12MB file size" },
    { feature:"API integration", page:"integrations settings", detail:"User connected Google Calendar but OAuth token exchange failed. The connection shows as 'pending' in their integrations list.", visible:"Google Calendar tile with spinner, status: connecting" },
    { feature:"search index", page:"main search results", detail:"User typed a complex query with 4 filters. Search index is temporarily unavailable due to a backend reindex running.", visible:"Search bar with query text, 4 active filter chips, empty results" },
  ],
  error_user: [
    { feature:"email validation", page:"account settings", detail:"User tried to update email to 'john@gmailcom' (missing dot). Form submitted and returned validation error. Old email still active.", visible:"Email field highlighted red, old email shown as current" },
    { feature:"file format rejection", page:"import screen", detail:"User tried to import a .pages file. System only accepts .docx, .pdf, .csv. User may not know how to convert.", visible:"Drag-and-drop zone with rejected file icon, supported formats listed below" },
    { feature:"password requirements", page:"registration form", detail:"User chose a 6-character password. Minimum is 8 with one number. They've filled in every other field already.", visible:"All fields filled, password field highlighted red, strength meter: Weak" },
    { feature:"scheduling conflict", page:"calendar event creation", detail:"User set end time (1:00 PM) before start time (3:00 PM). They probably meant 1:00 PM the next day.", visible:"Event form with conflicting times highlighted in red" },
    { feature:"quantity limit", page:"shopping cart", detail:"User tried to add 15 units of a limited item. Maximum is 3 per customer. They already have 2 in cart.", visible:"Cart showing item, quantity selector at 15, 'Max 3' warning" },
    { feature:"character overflow", page:"post composer", detail:"User wrote a 320-character post. Limit is 280. They're 40 chars over and need to trim without losing meaning.", visible:"Text input showing 320/280, excess characters highlighted red" },
  ],
  error_perm: [
    { feature:"admin panel access", page:"team management", detail:"A regular team member tried to access admin panel to remove a user. Only owners/admins can manage members.", visible:"Team list visible but action buttons grayed out, role badge: Member" },
    { feature:"premium report export", page:"analytics", detail:"Free-tier user clicked 'Export PDF' on their analytics dashboard. Requires Business plan.", visible:"Dashboard with charts visible, export button shows lock icon" },
    { feature:"private channel", page:"messaging", detail:"User tried to open a private channel they were removed from. They can see the name but not contents. Weren't notified about removal.", visible:"Channel name in sidebar with lock icon, empty message area" },
    { feature:"billing info", page:"billing settings", detail:"A team member (not billing admin) tried to view subscription details. Billing is restricted to account owner.", visible:"Billing page with blurred card details, role: Team Member" },
    { feature:"API key generation", page:"developer settings", detail:"A Viewer tried to generate an API key. Requires Developer or Admin role.", visible:"API settings, 'Generate Key' button disabled, role badge: Viewer" },
  ],
  empty_first: [
    { feature:"project board", page:"projects tab", detail:"User just landed on Projects tab for the first time. Workspace is empty. Team has 4 other members who also haven't created anything.", visible:"Empty canvas with dotted grid, sidebar showing 4 team member avatars" },
    { feature:"habit tracker", page:"my habits dashboard", detail:"User just enabled habit tracking. Dashboard is blank. Other sections (tasks, notes) already have data.", visible:"Blank habits grid, current week dates at top, other nav items have dots" },
    { feature:"saved items", page:"favorites / bookmarks", detail:"User opened Saved Items for the first time. They've been browsing for 20 minutes but saved nothing.", visible:"Empty list area with faint bookmark icon, count: 0 items" },
    { feature:"activity feed", page:"home / dashboard", detail:"Brand new user sees the activity feed. It's empty because they haven't done anything yet. This is the main screen.", visible:"Blank feed area, full sidebar navigation visible, default avatar" },
    { feature:"team channel", page:"messages", detail:"User created a new team channel but nobody has posted. 6 members in channel, created 2 minutes ago.", visible:"Empty chat area, 6 member avatars, channel name at top, 'Created 2m ago'" },
    { feature:"analytics", page:"insights tab", detail:"User opened analytics but hasn't generated enough data. System needs 7 days of usage for meaningful insights.", visible:"Placeholder chart outlines, date range selector, '7 days needed' badge" },
    { feature:"portfolio", page:"my public portfolio", detail:"Creator just signed up and opened their portfolio page. It's public-facing but empty. Visitors could find it via profile link.", visible:"Blank portfolio grid, profile header with name, public URL shown" },
  ],
  empty_search: [
    { feature:"product search", page:"search results", detail:"User searched 'wireless noise-canceling earbuds under $50' — zero results. Similar products exist at $59-$79 and wired options under $50.", visible:"Search bar with full query, empty results, 3 active filter chips" },
    { feature:"people search", page:"team directory", detail:"User searched for 'Alex Chen' but that person hasn't joined yet. Alex was invited 3 days ago, hasn't accepted.", visible:"Search bar: 'Alex Chen', empty results, pending invites badge in sidebar" },
    { feature:"job search", page:"job board", detail:"User searched 'Senior UX Writer, Remote, $120k+'. No exact matches. 4 mid-level roles and 2 hybrid senior roles exist.", visible:"Search with 3 filters, 0 exact results, filter tags visible" },
    { feature:"location search", page:"map / explore", detail:"User searched 'vegan restaurants' in a small town with none. Nearest vegan spot is 25 miles away. 3 vegetarian-friendly places in town.", visible:"Map centered on small town, search query in bar, no map pins" },
    { feature:"help center search", page:"knowledge base", detail:"Customer searched 'how to cancel subscription.' Article exists but titled 'Managing billing preferences' — didn't match.", visible:"Search: 'how to cancel subscription', 0 results, empty related section" },
    { feature:"file search", page:"documents", detail:"User searched 'Q4 Report' but it was deleted by a teammate last week. The file existed and the user remembers it.", visible:"Search: 'Q4 Report', 0 results, 'Recently Deleted' exists in sidebar" },
  ],
  onboard_welcome: [
    { feature:"app first launch", page:"first screen after install", detail:"User downloaded the app from App Store after seeing an Instagram ad. Knows the product name but not what it does. Has 5 similar apps installed.", visible:"Full screen, app logo centered, clean background, no nav visible" },
    { feature:"web signup", page:"post-registration landing", detail:"User just verified email, seeing app for the first time. Signed up because a friend recommended it. On laptop.", visible:"Dashboard skeleton underneath, welcome overlay, user's first name available" },
    { feature:"team invitation", page:"accept invitation screen", detail:"User clicked invite link from their manager. Joining workspace with 40 people. Doesn't know the product.", visible:"Team name, inviter's name and avatar, role: 'Member'" },
    { feature:"major redesign", page:"what's new overlay", detail:"App updated to v3.0 with complete redesign. User has used v2 for 2 years. Navigation, icons, and layout all changed.", visible:"New UI visible underneath, 'What's New' overlay, user's data preserved" },
    { feature:"trial start", page:"trial welcome screen", detail:"User started a 14-day Pro trial. Was on free tier for 3 months. Needs to understand what's now unlocked.", visible:"Pro badge, trial countdown: 14 days, feature highlights" },
  ],
  onboard_step: [
    { feature:"profile setup", page:"onboarding step 2 of 4", detail:"User completed welcome screen, now needs profile: photo, display name, job title. Skip rate on this step is 45%.", visible:"Progress bar at 50%, avatar upload circle, name and title fields" },
    { feature:"preference selection", page:"onboarding step 3 of 5", detail:"User needs to select interests so app can personalize feed. Should pick at least 3 from 20 options.", visible:"Progress: 60%, category grid with icons, counter: '0 of 3 minimum'" },
    { feature:"integrations", page:"onboarding step 4 of 4", detail:"Final step: connect external tools (Calendar, Slack, GitHub). None required but connected users retain 3x better.", visible:"Integration cards with connect buttons, 'Skip for now' visible" },
    { feature:"team creation", page:"onboarding step 2 of 3", detail:"User needs to create first team and invite at least one member. Can invite via email or link. Solo use possible.", visible:"Team name input, email invite field, shareable link toggle, 'Work alone' option" },
    { feature:"goal setting", page:"onboarding step 2 of 3", detail:"Fitness/learning app needs user to set first goal. Goal determines entire content feed. Beginner to advanced options.", visible:"Goal cards with illustrations, difficulty indicators, time estimates" },
  ],
  loading: [
    { feature:"AI resume analysis", page:"results screen", detail:"User triggered AI analysis of uploaded resume. Scanning, extracting skills, matching to jobs. Takes 15-25 seconds.", visible:"Document thumbnail, progress indicator, estimated time remaining" },
    { feature:"monthly report", page:"reports dashboard", detail:"User requested comprehensive report aggregating 5 data sources. Takes 20-40 seconds to compile.", visible:"Report template outline, source indicators (3/5 loaded)" },
    { feature:"file conversion", page:"converter tool", detail:"User uploaded 200-page PDF for DOCX conversion. Processing page by page. Currently on page 67 of 200.", visible:"File: 200 pages / 45MB, progress bar at 33%, page counter" },
    { feature:"data migration", page:"import wizard", detail:"Importing 3 years of data from competitor. Processing 15,000 records. Running for 90 seconds, ~2 min remaining.", visible:"Counter: 8,200/15,000 records, elapsed time, competitor logo" },
    { feature:"recommendation engine", page:"discovery feed", detail:"App recalculating recommendations from 50+ new preference signals. Feed will refresh with better matches.", visible:"Feed skeleton placeholders, 'Personalizing…' badge" },
    { feature:"checkout verification", page:"payment screen", detail:"User clicked 'Place Order' for $89. Payment being verified with bank. Must stay on screen.", visible:"Order total: $89, card last 4 digits, verification spinner" },
  ],
  confirm_destroy: [
    { feature:"project deletion", page:"project settings", detail:"About to permanently delete a project with 12 tasks, 4 collaborators, 47 comments. A collaborator edited it 30 min ago. Recoverable from trash for 30 days.", visible:"Project name, 4 avatars, last edit: 30m ago, 12 tasks" },
    { feature:"account deletion", page:"account settings", detail:"User wants to permanently delete account. 3 years of data, 200+ files, active Pro subscription (forfeit), team needs new owner.", visible:"Account age: 3yr, 200 files, subscription: Pro (renews 18d), team: 8" },
    { feature:"integration disconnect", page:"integrations", detail:"User disconnecting Slack from workspace. 14 automated workflows depend on it. All break immediately.", visible:"Slack card, '14 workflows affected' warning, workflow names" },
    { feature:"team member removal", page:"team management", detail:"Admin removing a member who owns 8 projects and admins 2 channels. Work needs reassignment.", visible:"Member profile, 8 projects, 2 channels, last active: 1hr ago" },
    { feature:"version rollback", page:"version history", detail:"User restoring a version from 2 weeks ago, discarding 23 edits by 3 people since then.", visible:"Version timeline, 23 edits between current and target, 3 editor avatars" },
    { feature:"data wipe (GDPR)", page:"privacy settings", detail:"User requesting complete data wipe under GDPR. Removes all content, analytics, connections. Takes 72 hours. Cannot be undone.", visible:"Data categories listed, processing time: 72hrs, warning icon" },
  ],
  confirm_safe: [
    { feature:"blog publishing", page:"content editor", detail:"About to publish a post to 12,000 subscribers. Draft for 5 days, reviewed by 2 teammates.", visible:"Post title, 12k subscribers, draft age: 5d, 2/2 reviewer approvals" },
    { feature:"batch invitation", page:"team settings", detail:"Sending invitations to 15 new members as 'Editor.' Team currently has 20 members.", visible:"15 emails listed, role: Editor, capacity: 35/50" },
    { feature:"plan upgrade", page:"billing", detail:"Upgrading Basic ($10/mo) to Pro ($25/mo). Prorated, effective immediately. Unlocks 5 features.", visible:"Basic → Pro, prorated charge: $12.50, next bill: $25" },
    { feature:"application submission", page:"job application", detail:"Submitting application with resume, cover letter, portfolio. Cannot edit after submit.", visible:"3 attachments: Ready ✓, company name, role title" },
    { feature:"data export", page:"data settings", detail:"Exporting all data as ZIP: personal info, usage history, uploads. Emailed in 10 min.", visible:"4/4 categories selected, est. 230MB, delivery: email" },
  ],
  success: [
    { feature:"fitness milestone", page:"celebration modal", detail:"User completed 100th workout. Consistent for 8 months, but frequency dropped 20% last 2 weeks — possible burnout.", visible:"100 sessions badge, 8-month streak, trend: down arrow last 2wk" },
    { feature:"payment received", page:"transaction confirmation", detail:"Received $3,500 payment from client, 4 days overdue. Available in bank in 2 business days.", visible:"$3,500 from [Client], status: Received, available: 2 biz days" },
    { feature:"project deployment", page:"deploy screen", detail:"Deployed project to production after 3 weeks. Took 45 seconds, all checks passed. Live URL active.", visible:"Project name, deploy: 45s, 4/4 checks green, live URL" },
    { feature:"course completion", page:"learning path", detail:"Finished a 12-week course. Scored 94% on final assessment. Certificate available. Next course unlocked.", visible:"Course title, 94%, 12 weeks, certificate icon, next course preview" },
    { feature:"savings goal", page:"goals dashboard", detail:"Hit $5,000 savings goal set 6 months ago. Averaged $833/mo. No new goal set yet.", visible:"Goal: $5,000 ✓, 6 months, avg $833/mo, next goal: empty" },
    { feature:"referral accepted", page:"referral program", detail:"Friend signed up via referral link and completed onboarding. User earns $20 credit. 3 total referrals, $60 earned.", visible:"Friend's name, $20 credit, total referrals: 3, earned: $60" },
  ],
  permission: [
    { feature:"location (GPS)", page:"pre-permission screen", detail:"User just searched for nearby restaurants. App needs GPS to show relevant results. Never asked before. iOS system dialog appears next.", visible:"Search query visible, map outline in background, location pin" },
    { feature:"push notifications", page:"post-onboarding prompt", detail:"User just completed onboarding. App wants push for order updates, messages, recs. Current opt-in rate: 48%.", visible:"Notification type previews (order, message, rec), toggle previews" },
    { feature:"camera access", page:"feature activation", detail:"User tapped 'Scan Document' for first time. Camera needed for scanner. Used the app 2 weeks, never this feature.", visible:"Camera viewfinder outline, 'Scan Document' icon" },
    { feature:"contacts access", page:"friend finder", detail:"User opened 'Find Friends.' App needs contacts to match phone numbers. 4 of their contacts already use the app.", visible:"Friend finder illustration, contact book icon, '4 friends here'" },
    { feature:"health data", page:"health integration", detail:"User wants to sync Apple Health data (steps, heart rate, sleep). This is a sensitive permission.", visible:"Health data types listed, Apple Health icon, privacy badge" },
    { feature:"microphone", page:"voice feature", detail:"User tapped voice search button. Microphone needed. This is a voice-first feature user explicitly invoked.", visible:"Voice waveform placeholder, mic icon, search bar above" },
  ],
  paywall: [
    { feature:"background remover", page:"image editor", detail:"Free user mid-design clicked 'Remove Background' on a product photo. Pro feature. They've been editing 15 min — this was the final step.", visible:"Image with BG visible, 'Remove Background' selected, Pro lock badge" },
    { feature:"high-res export", page:"export dialog", detail:"User finished project, wants 4K export. Free tier: 720p only. Need it for client presentation tomorrow.", visible:"Export: 720p selected, 4K grayed + lock icon, project thumbnail" },
    { feature:"team seats", page:"team settings", detail:"Tried to invite 6th member. Free plan: 5 max. The 6th person is a new hire starting Monday.", visible:"Team list 5/5, invite form with 6th email, plan: Free" },
    { feature:"API access", page:"developer settings", detail:"Developer tried to generate API key. Only on Business plan. They're on Pro.", visible:"API settings, 'Generate Key' locked, plan: Pro" },
    { feature:"advanced analytics", page:"analytics", detail:"Clicked 'Funnel Analysis' — premium feature. Can see basic metrics but needs funnel data for board presentation.", visible:"Basic charts visible, 'Funnel Analysis' card with lock, plan: Starter" },
    { feature:"storage limit", page:"upload screen", detail:"Storage full (5GB/5GB). Upgrading doubles to 10GB. User has 200+ files, doesn't want to delete any.", visible:"Storage bar: 100% (5.0/5.0 GB), upload failed, file: 85MB" },
  ],
  notif: [
    { feature:"@mention in comment", page:"phone lock screen", detail:"Teammate @mentioned user in a shared doc comment. Comment asks a direct question, awaiting reply. Last opened app 2hr ago.", visible:"App icon, sender avatar, message preview snippet" },
    { feature:"weekly report ready", page:"home screen", detail:"Weekly activity report is ready. Engagement up 23%. 4 unread messages, 2 pending tasks.", visible:"App icon, report icon, stat preview" },
    { feature:"deadline reminder", page:"lock screen", detail:"Task due in 2 hours. Been 'In Progress' for 3 days. Project manager is CC'd.", visible:"App icon, task name, due time, urgency indicator" },
    { feature:"price drop alert", page:"home screen", detail:"Watched item dropped 30% in price. Sale ends in 6 hours. Item is in user's wishlist.", visible:"App icon, product thumbnail, old price crossed, new price" },
    { feature:"security alert", page:"home screen", detail:"New device logged in from Lagos, Nigeria. User is in Chicago. Could be legitimate or a breach.", visible:"App icon, security shield, location, 'Was this you?' hint" },
    { feature:"delivery update", page:"lock screen", detail:"Order is out for delivery, 3 stops away. ETA: 12 minutes. Ordered 40 min ago.", visible:"App icon, truck icon, ETA, order number" },
  ],
  tooltip: [
    { feature:"AI summarization badge", page:"project dashboard", detail:"User hovering over new 'AI Summary' badge on a project card. Feature launched this week. Auto-generates status summary from recent activity.", visible:"Project card with new badge, cursor hovering, other projects without badge" },
    { feature:"keyboard shortcut hint", page:"text editor", detail:"User clicked Format > Bold (the long way) for the 10th time. Cmd+B shortcut exists. User seems unaware.", visible:"Editor toolbar, Format menu open, Bold highlighted" },
    { feature:"empty channel description", page:"team channel", detail:"User created channel #project-atlas but left description empty. Channels with descriptions get 3x more joins, 40% less off-topic.", visible:"Channel header, empty description field, 1 member, just created" },
    { feature:"billing info icon", page:"subscription settings", detail:"User viewing billing page. Small info icon next to 'Next billing date.' May not understand prorated charges on mid-cycle plan change.", visible:"Next charge: $25 on March 1, plan: Pro, info icon" },
    { feature:"privacy toggle", page:"privacy & security", detail:"Toggle 'Share usage data with partners' is ON (opt-out default). Most users don't understand what this means.", visible:"Toggle: ON, generic label 'Share usage data with partners'" },
    { feature:"advanced filters", page:"list / table view", detail:"User using basic search on 2,000+ records. 'Advanced Filters' button exists but never used. Power users filter 5x faster.", visible:"Search bar, results list, 'Advanced Filters' button with subtle badge" },
    { feature:"auto-save indicator", page:"editor", detail:"User editing for 5 minutes, keeps looking for a save button. App auto-saves every 30 sec. Save button doesn't exist.", visible:"Editor with content, no save button, small 'Saved' in footer" },
  ],
  cancel: [
    { feature:"subscription cancellation", page:"cancel flow", detail:"User clicked 'Cancel Subscription.' Pro member 11 months, uses it 4x/week, 45 saved projects. Renewal in 6 days.", visible:"Pro $25/mo, since April, 4x/week usage, 45 projects, renews 6d" },
    { feature:"account deactivation", page:"account settings", detail:"User wants to deactivate (not delete). Data preserved 90 days. 3 team members depend on shared resources.", visible:"Deactivation option, 90-day retention, 3 affected members" },
    { feature:"trial cancellation", page:"trial management", detail:"Canceling free trial on day 5 of 14. Haven't used 3 of 5 premium features. $0 charged.", visible:"Trial day 5/14, features used: 2/5, unused listed, $0" },
    { feature:"plan downgrade", page:"plan settings", detail:"Downgrading Pro ($25/mo) to Free. Losing: unlimited projects (→3), custom domain, priority support, API. Currently have 12 projects.", visible:"Pro → Free, features lost listed, 12 projects (Free limit: 3)" },
    { feature:"event cancellation", page:"event management", detail:"Canceling scheduled event. 28 RSVPs, event in 48 hours. 12 attendees added to calendar.", visible:"Event name, 48hrs away, 28 RSVPs, 12 calendar adds" },
    { feature:"order cancellation", page:"order details", detail:"Canceling order placed 2hrs ago. Currently being prepared, hasn't shipped. Full refund within 4hr window.", visible:"Order #, 2hrs ago, status: Preparing, refund window: 2hrs left" },
  ],
  settings: [
    { feature:"notification preferences", page:"notification settings", detail:"User gets 30+ notifications/day, wants to reduce noise. Needs to configure types and channels (push, email, in-app).", visible:"Notification category list, per-channel toggles, all currently ON" },
    { feature:"privacy controls", page:"privacy settings", detail:"Reviewing data sharing: (1) share activity with contacts, (2) share anonymous usage for improvement. Both ON.", visible:"Two toggle sections with descriptions, both ON, last updated 6mo ago" },
    { feature:"two-factor auth", page:"security settings", detail:"Setting up 2FA for first time after security recommendation. Options: authenticator app (recommended) or SMS.", visible:"2FA: Not enabled, two method cards, setup button" },
    { feature:"display preferences", page:"appearance settings", detail:"Changing theme (light/dark/system) and font size. Also sees new 'Reduce motion' accessibility toggle.", visible:"Theme selector (3 options), font slider, reduce motion toggle, preview" },
    { feature:"data retention", page:"data management", detail:"Configuring how long app keeps activity data: 30d, 90d, 1yr, forever. Currently: forever (default).", visible:"Retention dropdown: Forever, storage: 2.3GB, category breakdown" },
  ],
  banner: [
    { feature:"scheduled maintenance", page:"any page (top banner)", detail:"System maintenance in 4 hours. Unavailable ~30 minutes. Users should save work.", visible:"Top banner over current content, countdown timer, unsaved work indicator" },
    { feature:"new feature launch", page:"dashboard (banner)", detail:"Major feature just launched that changes core workflow. Users should know but aren't forced to interact.", visible:"Dashboard below, feature name + icon in banner, 'Learn more'" },
    { feature:"policy update", page:"any page (banner)", detail:"Privacy policy updated. Users must review and accept in 14 days to keep using service.", visible:"Policy notice, accept button, 14-day countdown, content below" },
    { feature:"pricing change", page:"dashboard (banner)", detail:"User's plan price increasing $5/mo next month. Emailed already, this is in-app reminder. Can lock price with annual.", visible:"Current price, new price, effective date, annual billing alternative" },
    { feature:"trial expiring", page:"any page (banner)", detail:"Free trial expires in 2 days. Active daily, used 80% of premium features. Goal: convert without being pushy.", visible:"'2 days left' badge, usage indicator, upgrade hint" },
  ],
  email: [
    { feature:"payment failed", page:"email inbox", detail:"Recurring $25/mo payment failed — card expired. Auto-retry in 3 days. If fails again, downgrade to Free in 7 days.", visible:"App logo, amount, card last 4, retry date, downgrade date" },
    { feature:"welcome email", page:"email inbox", detail:"User signed up 5 minutes ago. First email. Should reinforce value prop and get them back into app for setup.", visible:"App logo, user's first name, getting started CTA, support link" },
    { feature:"password reset", page:"email inbox", detail:"User requested password reset. Link expires in 1 hour. May not have been them (possible unauthorized). Need both paths.", visible:"Reset button, expiry: 1hr, 'Didn't request this?' section, IP info" },
    { feature:"invoice/receipt", page:"email inbox", detail:"Monthly invoice $49 charged successfully. User needs receipt for expense reporting. Include tax-relevant details.", visible:"Amount, date, plan, invoice #, PDF link, billing address" },
    { feature:"weekly team digest", page:"email inbox", detail:"Weekly digest: 14 tasks completed, 3 new members, 2 projects shipped. User hasn't logged in for 5 days.", visible:"Stats summary, highlights, 'Log in' CTA, unsubscribe link" },
    { feature:"shipping notification", page:"email inbox", detail:"Order shipped. Tracking available. Estimated 3-5 business days. Contains 2 items.", visible:"Item images, tracking #, carrier, estimated delivery range" },
  ],
};

// ═══════════════ COMPONENT META ═══════════════
const COMP = {
  title:{ label:"Headline", max:45, ph:"Write a clear, scannable headline…", rows:1 },
  body:{ label:"Body Copy", max:160, ph:"Explain the situation and what to do next…", rows:3 },
  primaryButton:{ label:"Primary Button", max:24, ph:"e.g. Try Again, Get Started", rows:1 },
  secondaryButton:{ label:"Secondary Action", max:28, ph:"e.g. Go Back, Learn More", rows:1 },
  destructiveButton:{ label:"Destructive Button", max:22, ph:"e.g. Delete Permanently", rows:1 },
  cancelButton:{ label:"Cancel Button", max:14, ph:"e.g. Keep It", rows:1 },
  retainButton:{ label:"Win-back Button", max:26, ph:"e.g. I Changed My Mind", rows:1 },
  confirmCancel:{ label:"Confirm Cancel", max:22, ph:"e.g. Cancel Anyway", rows:1 },
  skipLink:{ label:"Skip / Dismiss", max:18, ph:"e.g. Maybe Later", rows:1 },
  loadMsg1:{ label:"Loading Message 1", max:50, ph:"First message while loading…", rows:1 },
  loadMsg2:{ label:"Loading Message 2", max:50, ph:"Second (shows progress)…", rows:1 },
  loadMsg3:{ label:"Loading Message 3", max:50, ph:"Final before results…", rows:1 },
  notifTitle:{ label:"Notification Title", max:40, ph:"App name or action…", rows:1 },
  notifBody:{ label:"Notification Body", max:90, ph:"What happened and why it matters…", rows:2 },
  tipBody:{ label:"Tooltip Text", max:90, ph:"Concise contextual guidance…", rows:2 },
  tipCta:{ label:"Tooltip CTA", max:18, ph:"e.g. Try it out", rows:1 },
  tipDismiss:{ label:"Dismiss Text", max:15, ph:"e.g. Not now", rows:1 },
  setLabel1:{ label:"Setting Label 1", max:30, ph:"e.g. Push Notifications", rows:1 },
  setDesc1:{ label:"Setting Description 1", max:80, ph:"Explain what this controls…", rows:2 },
  setLabel2:{ label:"Setting Label 2", max:30, ph:"e.g. Data Sharing", rows:1 },
  setDesc2:{ label:"Setting Description 2", max:80, ph:"Explain what toggling does…", rows:2 },
  emailSubject:{ label:"Email Subject Line", max:55, ph:"Clear, scannable subject…", rows:1 },
};

const EXTRAS = [
  { id:"toast", label:"Toast", icon:"📢", field:{ label:"Toast Message", max:60, ph:"Brief feedback message…", rows:1 }},
  { id:"banner_c", label:"Info Banner", icon:"ℹ️", field:{ label:"Banner Copy", max:100, ph:"Informational banner text…", rows:2 }},
  { id:"helper", label:"Helper Text", icon:"📝", field:{ label:"Helper / Microcopy", max:70, ph:"Small contextual hint…", rows:1 }},
  { id:"link", label:"Text Link", icon:"🔗", field:{ label:"Link Text", max:30, ph:"e.g. Learn more", rows:1 }},
  { id:"inlineErr", label:"Inline Error", icon:"❌", field:{ label:"Inline Error", max:60, ph:"Field-level error…", rows:1 }},
  { id:"inlineOk", label:"Inline Success", icon:"✅", field:{ label:"Success Microcopy", max:60, ph:"Confirmation feedback…", rows:1 }},
];

// ═══════════════ BRIEF GENERATOR ═══════════════
function generateBrief(nicheId, toneId, screenId, personaId, NICHES, TONES, SCREENS, PERSONAS, CTX) {
  const niche = NICHES.find(n=>n.id===nicheId);
  const tone = TONES.find(t=>t.id===toneId);
  const screen = SCREENS.find(s=>s.id===screenId);
  const persona = PERSONAS.find(p=>p.id===personaId);
  const pool = CTX[screenId] || CTX.error_system;
  const ctx = pool[Math.floor(Math.random()*pool.length)];
  return {
    niche, tone, screen, persona, ctx,
    brief: `Write UX copy for a ${niche.label} app or website. The user is on a ${screen.label} screen. They are a ${persona.label} (age ~${persona.age}): ${persona.d}. This product follows a ${tone.label} tone — ${tone.desc}.`,
  };
}

// ═══════════════ MAIN APP ═══════════════

// Inline all data to keep single-file artifact working

const T = {
  bg:"#FAF9F7", card:"#FFFFFF", alt:"#F2F1ED", border:"#E4E2DC",
  bf:"#1A1A1A", text:"#1A1A1A", sub:"#6B6860", muted:"#9C9A93",
  accent:"#C7432B", aS:"rgba(199,67,43,0.07)", aB:"rgba(199,67,43,0.18)",
  ok:"#2D7A4F", okS:"rgba(45,122,79,0.07)", err:"#B83A3A", errS:"rgba(184,58,58,0.07)",
};
const CSS=`
@keyframes fu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes si{from{opacity:0;transform:translateX(-6px)}to{opacity:1;transform:translateX(0)}}
@keyframes sp{to{transform:rotate(360deg)}}
*{box-sizing:border-box;margin:0;padding:0}body{background:${T.bg}}
::selection{background:${T.aS};color:${T.accent}}textarea{font-family:inherit}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:${T.border};border-radius:3px}`;
const FONTS="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500&family=IBM+Plex+Mono:wght@400;500&display=swap";

// Components
const Btn=({children,v="primary",disabled,onClick,style:sx,...r})=>{
  const base={fontFamily:"'Outfit',sans-serif",fontSize:14,fontWeight:600,cursor:disabled?"default":"pointer",border:"none",borderRadius:8,padding:"12px 24px",transition:"all 0.2s",opacity:disabled?0.35:1,letterSpacing:"0.01em",display:"inline-flex",alignItems:"center",gap:8,justifyContent:"center",whiteSpace:"nowrap"};
  const vs={primary:{background:T.text,color:T.bg},secondary:{background:T.alt,color:T.text,border:`1px solid ${T.border}`},accent:{background:T.accent,color:"#fff"},ghost:{background:"transparent",color:T.sub,padding:"8px 16px"}};
  return <button onClick={disabled?undefined:onClick} style={{...base,...vs[v],...sx}} {...r}>{children}</button>;
};
const Tag=({children,color=T.sub,bg=T.alt})=><span style={{fontSize:11,fontWeight:600,padding:"3px 9px",borderRadius:5,background:bg,color,letterSpacing:"0.04em",textTransform:"uppercase",fontFamily:"'IBM Plex Mono',monospace"}}>{children}</span>;
const Inp=({label,max,value,onChange,ph,rows=1,disabled})=>{
  const len=(value||"").length,over=max&&len>max;
  return(<div style={{marginBottom:16}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
      <label style={{fontSize:13,fontWeight:500,color:T.text}}>{label}</label>
      {max>0&&<span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:over?T.err:len>0?T.sub:T.muted}}>{len}/{max}</span>}
    </div>
    <textarea value={value||""} onChange={e=>onChange(e.target.value)} disabled={disabled} rows={rows} placeholder={ph} style={{width:"100%",padding:"10px 14px",borderRadius:8,fontSize:14,fontFamily:"'Outfit',sans-serif",lineHeight:1.6,resize:rows>1?"vertical":"none",background:disabled?T.alt:T.card,border:`1.5px solid ${over?T.err:T.border}`,color:T.text,outline:"none",transition:"border-color 0.2s"}}
      onFocus={e=>{if(!disabled&&!over)e.target.style.borderColor=T.bf}}
      onBlur={e=>{if(!disabled&&!over)e.target.style.borderColor=T.border}}/>
  </div>);
};

// Mockup
function Mockup({sid,ans,extras,dev}){
  const s=SCREENS.find(x=>x.id===sid);
  const ph=dev==="phone";const g=k=>ans[k]||"";
  const Title=({k})=><p style={{fontSize:ph?17:19,fontWeight:600,color:T.text,lineHeight:1.3,marginBottom:7,fontFamily:"'Newsreader',Georgia,serif"}}>{g(k)||COMP[k]?.ph}</p>;
  const Body=({k})=><p style={{fontSize:ph?13:14,color:T.sub,lineHeight:1.55,marginBottom:14}}>{g(k)||COMP[k]?.ph}</p>;
  const PB=({k,danger})=><div style={{padding:"10px 0",borderRadius:8,textAlign:"center",fontSize:13,fontWeight:600,background:danger?T.err:T.text,color:T.bg,fontFamily:"'Outfit',sans-serif"}}>{g(k)||COMP[k]?.ph}</div>;
  const SB=({k,link})=><div style={{padding:link?"5px 0":"10px 0",borderRadius:8,textAlign:"center",fontSize:link?12:13,fontWeight:link?400:600,color:T.sub,border:link?"none":`1px solid ${T.border}`,textDecoration:link?"underline":"none",fontFamily:"'Outfit',sans-serif"}}>{g(k)||COMP[k]?.ph}</div>;

  const ExtraLayer=()=>{
    if(!extras?.length)return null;
    return extras.map((e,i)=>{
      const c=EXTRAS.find(x=>x.id===e.type);if(!c)return null;
      const v=e.value||c.field.ph;
      if(e.type==="toast")return<div key={i} style={{position:"absolute",bottom:12,left:12,right:12,padding:"9px 13px",borderRadius:9,background:T.text,color:T.bg,fontSize:12,fontFamily:"'Outfit',sans-serif",boxShadow:"0 4px 16px rgba(0,0,0,0.12)"}}>✓ {v}</div>;
      if(e.type==="banner_c")return<div key={i} style={{position:"absolute",top:0,left:0,right:0,padding:"8px 12px",background:"#EFF6FF",borderBottom:"1px solid #BFDBFE",fontSize:11,color:"#1E40AF",fontFamily:"'Outfit',sans-serif"}}>ℹ️ {v}</div>;
      if(e.type==="helper")return<div key={i} style={{position:"absolute",bottom:ph?50:60,left:ph?24:40,fontSize:11,color:T.muted,fontFamily:"'Outfit',sans-serif"}}>{v}</div>;
      if(e.type==="link")return<div key={i} style={{position:"absolute",bottom:ph?30:40,right:ph?24:40,fontSize:12,color:T.accent,textDecoration:"underline",fontFamily:"'Outfit',sans-serif"}}>{v}</div>;
      if(e.type==="inlineErr")return<div key={i} style={{position:"absolute",bottom:ph?50:60,left:ph?24:40,fontSize:11,color:T.err,fontFamily:"'Outfit',sans-serif"}}>⚠ {v}</div>;
      if(e.type==="inlineOk")return<div key={i} style={{position:"absolute",bottom:ph?50:60,left:ph?24:40,fontSize:11,color:T.ok,fontFamily:"'Outfit',sans-serif"}}>✓ {v}</div>;
      return null;
    });
  };

  const content=(()=>{
    if(sid==="loading"){
      const msgs=[g("loadMsg1"),g("loadMsg2"),g("loadMsg3")].filter(Boolean);
      return<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:16,padding:28}}>
        <div style={{width:32,height:32,border:`3px solid ${T.border}`,borderTopColor:T.accent,borderRadius:"50%",animation:"sp 1s linear infinite"}}/>
        <p style={{fontSize:13,color:T.sub,textAlign:"center"}}>{msgs[0]||"Loading…"}</p>
      </div>;
    }
    if(sid==="notif"){
      return<div style={{padding:ph?14:20,paddingTop:ph?48:20}}>
        <div style={{padding:14,background:T.card,borderRadius:13,border:`1px solid ${T.border}`,boxShadow:"0 3px 16px rgba(0,0,0,0.05)"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <div style={{width:24,height:24,borderRadius:6,background:T.aS,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>📱</div>
            <span style={{fontSize:11,fontWeight:600,color:T.sub}}>{g("notifTitle")||"App Name"}</span>
            <span style={{fontSize:10,color:T.muted,marginLeft:"auto"}}>now</span>
          </div>
          <p style={{fontSize:12,color:T.text,lineHeight:1.45}}>{g("notifBody")||COMP.notifBody.ph}</p>
        </div>
      </div>;
    }
    if(sid==="tooltip"){
      return<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:10,padding:ph?16:28}}>
        <div style={{width:"75%",height:32,background:T.alt,borderRadius:7,border:`1px solid ${T.border}`}}/>
        <div style={{padding:12,background:T.text,color:T.bg,borderRadius:9,fontSize:12,lineHeight:1.45,maxWidth:"88%",position:"relative"}}>
          <p>{g("tipBody")||COMP.tipBody.ph}</p>
          <div style={{display:"flex",gap:10,marginTop:8,fontSize:11}}>
            <span style={{fontWeight:600,color:T.accent}}>{g("tipCta")||"Got it"}</span>
            <span style={{color:"rgba(255,255,255,0.45)"}}>{g("tipDismiss")||"Skip"}</span>
          </div>
          <div style={{position:"absolute",top:-5,left:"50%",transform:"translateX(-50%) rotate(45deg)",width:10,height:10,background:T.text,borderRadius:1}}/>
        </div>
      </div>;
    }
    if(sid==="settings"){
      return<div style={{padding:ph?18:28}}>
        <h3 style={{fontSize:16,fontWeight:600,marginBottom:16,fontFamily:"'Outfit',sans-serif"}}>Settings</h3>
        {[["setLabel1","setDesc1",true],["setLabel2","setDesc2",false]].map(([lk,dk,on],i)=>
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"14px 0",borderBottom:`1px solid ${T.border}`}}>
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:500,color:T.text}}>{g(lk)||COMP[lk]?.ph}</p>
              <p style={{fontSize:11,color:T.sub,marginTop:2,lineHeight:1.4}}>{g(dk)||COMP[dk]?.ph}</p>
            </div>
            <div style={{width:40,height:22,borderRadius:11,background:on?T.accent:T.border,position:"relative",flexShrink:0,marginLeft:14,marginTop:1}}>
              <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:2,left:on?20:2,boxShadow:"0 1px 3px rgba(0,0,0,0.12)"}}/>
            </div>
          </div>
        )}
      </div>;
    }
    if(sid==="email"){
      return<div style={{padding:ph?16:24,display:"flex",flexDirection:"column",height:"100%"}}>
        <div style={{padding:"8px 0",borderBottom:`1px solid ${T.border}`,marginBottom:12}}>
          <p style={{fontSize:11,color:T.muted}}>Subject:</p>
          <p style={{fontSize:13,fontWeight:600,color:T.text}}>{g("emailSubject")||COMP.emailSubject.ph}</p>
        </div>
        <Title k="title"/><Body k="body"/><PB k="primaryButton"/>
      </div>;
    }
    // Dialog
    if(s.mt==="dialog"){
      const ic={error_system:"⚠️",error_user:"⛔",error_perm:"🚫",confirm_destroy:"⚠️",confirm_safe:"✔️",success:"🎉",paywall:"💎"};
      return<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",padding:ph?14:28}}>
        <div style={{background:T.card,borderRadius:14,padding:ph?20:28,border:`1px solid ${T.border}`,width:"100%",maxWidth:320,boxShadow:"0 6px 32px rgba(0,0,0,0.05)"}}>
          {ic[sid]&&<div style={{fontSize:30,marginBottom:10}}>{ic[sid]}</div>}
          <Title k="title"/><Body k="body"/>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {s.components.filter(c=>c!=="title"&&c!=="body").map(k=>{
              if(k==="destructiveButton"||k==="confirmCancel")return<PB key={k} k={k} danger/>;
              if(k==="primaryButton"||k==="retainButton")return<PB key={k} k={k}/>;
              if(k==="skipLink")return<SB key={k} k={k} link/>;
              return<SB key={k} k={k}/>;
            })}
          </div>
        </div>
      </div>;
    }
    // Fullscreen
    const ic2={empty_first:"📭",empty_search:"🔍",onboard_welcome:"👋",onboard_step:"📋",permission:"🔐",cancel:"🚪",banner:"📢"};
    return<div style={{display:"flex",flexDirection:"column",justifyContent:"center",height:"100%",padding:ph?24:40}}>
      {ic2[sid]&&<div style={{fontSize:34,marginBottom:12}}>{ic2[sid]}</div>}
      {s.components.map(k=>{
        if(k==="title"||k==="emailSubject")return<Title key={k} k={k}/>;
        if(k==="body")return<Body key={k} k={k}/>;
        if(k==="primaryButton"||k==="retainButton")return<div key={k} style={{marginBottom:7}}><PB k={k}/></div>;
        if(k==="destructiveButton"||k==="confirmCancel")return<div key={k} style={{marginBottom:7}}><PB k={k} danger/></div>;
        if(k==="skipLink")return<div key={k} style={{marginBottom:7}}><SB k={k} link/></div>;
        if(k==="cancelButton"||k==="secondaryButton")return<div key={k} style={{marginBottom:7}}><SB k={k}/></div>;
        return null;
      })}
    </div>;
  })();

  const fH=ph?560:400;
  return<div style={{width:ph?310:"100%",height:fH,background:T.alt,borderRadius:ph?30:11,border:ph?`7px solid ${T.text}`:`1px solid ${T.border}`,overflow:"hidden",position:"relative",margin:ph?"0 auto":0,boxShadow:ph?"0 10px 50px rgba(0,0,0,0.08)":"0 3px 16px rgba(0,0,0,0.03)"}}>
    {ph&&<div style={{height:32,background:T.alt,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 18px",fontSize:11,fontWeight:600,color:T.text}}>
      <span>9:41</span>
      <div style={{width:60,height:20,borderRadius:10,background:T.text,position:"absolute",top:5,left:"50%",transform:"translateX(-50%)"}}/>
      <span style={{fontSize:10}}>●● 📶 🔋</span>
    </div>}
    <div style={{height:ph?fH-39:"100%",overflow:"auto",position:"relative"}}>{content}<ExtraLayer/></div>
  </div>;
}

// ═══════════════ APP ═══════════════
const V={LOGIN:0,TIER:1,PROFILE:2,BROWSE:3,CHALLENGE:4};

export default function App(){
  const[view,setView]=useState(V.LOGIN);
  const[user,setUser]=useState({name:"",email:"",level:"",goal:"",tier:"free"});
  const[used,setUsed]=useState(0);
  const[uDate,setUDate]=useState("");
  const[sN,setSN]=useState(null);
  const[sT,setST]=useState(null);
  const[sS,setSS]=useState(null);
  const[sP,setSP]=useState(null);
  const[brief,setBrief]=useState(null);
  const[ans,setAns]=useState({});
  const[extras,setExtras]=useState([]);
  const[dev,setDev]=useState("phone");
  const[done,setDone]=useState(false);
  const[hist,setHist]=useState([]);

  useEffect(()=>{
    try{
      const u=JSON.parse(localStorage.getItem("wl_u")||"null");
      if(u?.name){setUser(u);setView(V.BROWSE)}
      const d=JSON.parse(localStorage.getItem("wl_d")||"null");
      const td=new Date().toISOString().split("T")[0];
      if(d?.date===td){setUsed(d.c);setUDate(td)}else setUDate(td);
      setHist(JSON.parse(localStorage.getItem("wl_h")||"[]"));
    }catch(e){}
  },[]);

  const save=u=>{setUser(u);localStorage.setItem("wl_u",JSON.stringify(u))};
  const bump=()=>{const td=new Date().toISOString().split("T")[0];const n=uDate===td?used+1:1;setUsed(n);setUDate(td);localStorage.setItem("wl_d",JSON.stringify({date:td,c:n}))};
  const lim=user.tier==="paid"?5:1;
  const canGo=used<lim;
  const saveH=b=>{const e={id:Date.now(),brief:b,answers:{...ans},extras:[...extras],date:new Date().toISOString()};const h=[e,...hist].slice(0,50);setHist(h);localStorage.setItem("wl_h",JSON.stringify(h))};
  const gen=()=>{if(!sN||!sT||!sS||!sP)return;const b=generateBrief(sN,sT,sS,sP,NICHES,TONES,SCREENS,PERSONAS,CTX);setBrief(b);setAns({});setExtras([]);setDone(false);bump();setView(V.CHALLENGE)};
  const rand=()=>{setSN(NICHES[~~(Math.random()*NICHES.length)].id);setST(TONES[~~(Math.random()*TONES.length)].id);setSS(SCREENS[~~(Math.random()*SCREENS.length)].id);setSP(PERSONAS[~~(Math.random()*PERSONAS.length)].id)};
  const logout=()=>{localStorage.removeItem("wl_u");setUser({name:"",email:"",level:"",goal:"",tier:"free"});setView(V.LOGIN)};
  const Head=()=><><style>{CSS}</style><link href={FONTS} rel="stylesheet"/></>;

  // ── LOGIN ──
  if(view===V.LOGIN)return(
    <div style={{fontFamily:"'Outfit',sans-serif",color:T.text,background:T.bg,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <Head/>
      <div style={{maxWidth:400,width:"100%",animation:"fu 0.5s ease"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:28}}>
          <div style={{width:38,height:38,borderRadius:9,background:T.text,color:T.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,fontWeight:700,fontFamily:"'Newsreader',Georgia,serif"}}>W</div>
          <span style={{fontSize:17,fontWeight:600}}>Wordsmith Lab</span>
        </div>
        <h1 style={{fontFamily:"'Newsreader',Georgia,serif",fontSize:34,fontWeight:500,lineHeight:1.15,marginBottom:8}}>Practice the words<br/><em style={{color:T.accent}}>users actually read.</em></h1>
        <p style={{color:T.sub,fontSize:15,lineHeight:1.55,marginBottom:32}}>Realistic UX writing challenges with live mockup previews. Build your portfolio or sharpen your craft.</p>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {[["Your name","text","name"],["Email address","email","email"]].map(([ph,type,key])=>
            <input key={key} placeholder={ph} type={type} value={user[key]} onChange={e=>setUser({...user,[key]:e.target.value})} style={{padding:"12px 16px",borderRadius:8,border:`1.5px solid ${T.border}`,fontSize:15,fontFamily:"inherit",outline:"none",background:T.card,color:T.text}}
              onFocus={e=>e.target.style.borderColor=T.bf} onBlur={e=>e.target.style.borderColor=T.border}/>
          )}
          <Btn disabled={!user.name.trim()||!user.email.trim()} onClick={()=>setView(V.TIER)}>Continue →</Btn>
        </div>
      </div>
    </div>
  );

  // ── TIER ──
  if(view===V.TIER)return(
    <div style={{fontFamily:"'Outfit',sans-serif",color:T.text,background:T.bg,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <Head/>
      <div style={{maxWidth:560,width:"100%",animation:"fu 0.5s ease"}}>
        <button onClick={()=>setView(V.LOGIN)} style={{background:"none",border:"none",color:T.sub,fontSize:14,cursor:"pointer",fontFamily:"inherit",marginBottom:28}}>← Back</button>
        <h2 style={{fontFamily:"'Newsreader',Georgia,serif",fontSize:28,fontWeight:500,marginBottom:6}}>Choose your plan</h2>
        <p style={{color:T.sub,fontSize:15,marginBottom:28}}>Start free. Upgrade anytime.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          {[{t:"free",title:"Free",price:"$0",desc:"1 challenge / day",feats:["All screen types","Live mockup preview","Component toolkit"]},{t:"paid",title:"Pro",price:"$9/mo",desc:"5 challenges / day",feats:["Everything in Free","5 challenges/day","Challenge history","Priority support"]}].map(p=>
            <button key={p.t} onClick={()=>{save({...user,tier:p.t});setView(V.PROFILE)}} style={{textAlign:"left",padding:22,borderRadius:13,background:T.card,border:`2px solid ${p.t==="paid"?T.accent:T.border}`,cursor:"pointer",fontFamily:"inherit",transition:"all 0.2s",display:"flex",flexDirection:"column",gap:3}}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>
              {p.t==="paid"&&<Tag color={T.accent} bg={T.aS}>Popular</Tag>}
              <h3 style={{fontSize:18,fontWeight:600,marginTop:p.t==="paid"?6:0}}>{p.title}</h3>
              <p style={{fontSize:26,fontWeight:700,fontFamily:"'Newsreader',Georgia,serif"}}>{p.price}</p>
              <p style={{fontSize:13,color:T.sub,marginBottom:10}}>{p.desc}</p>
              {p.feats.map(f=><div key={f} style={{fontSize:13,color:T.sub,display:"flex",alignItems:"center",gap:6,padding:"1px 0"}}><span style={{color:T.ok,fontSize:11}}>✓</span> {f}</div>)}
              <div style={{marginTop:14,padding:"10px 0",borderRadius:8,textAlign:"center",background:p.t==="paid"?T.accent:T.text,color:T.bg,fontSize:14,fontWeight:600}}>{p.t==="paid"?"Go Pro":"Start Free"}</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // ── PROFILE ──
  if(view===V.PROFILE)return(
    <div style={{fontFamily:"'Outfit',sans-serif",color:T.text,background:T.bg,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <Head/>
      <div style={{maxWidth:440,width:"100%",animation:"fu 0.5s ease"}}>
        <button onClick={()=>setView(V.TIER)} style={{background:"none",border:"none",color:T.sub,fontSize:14,cursor:"pointer",fontFamily:"inherit",marginBottom:28}}>← Back</button>
        <h2 style={{fontFamily:"'Newsreader',Georgia,serif",fontSize:28,fontWeight:500,marginBottom:6}}>A bit about you</h2>
        <p style={{color:T.sub,fontSize:15,marginBottom:28}}>Helps tailor challenges. Change anytime.</p>
        <div style={{marginBottom:22}}>
          <label style={{fontSize:13,fontWeight:500,display:"block",marginBottom:8}}>Experience level</label>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {["Junior","Mid-level","Senior"].map(l=><button key={l} onClick={()=>setUser({...user,level:l})} style={{padding:"9px 18px",borderRadius:8,fontSize:14,fontWeight:500,fontFamily:"inherit",cursor:"pointer",transition:"all 0.15s",background:user.level===l?T.text:T.card,color:user.level===l?T.bg:T.sub,border:`1.5px solid ${user.level===l?T.text:T.border}`}}>{l}</button>)}
          </div>
        </div>
        <div style={{marginBottom:28}}>
          <label style={{fontSize:13,fontWeight:500,display:"block",marginBottom:8}}>Practice goal</label>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {["Job prep","Portfolio building","Skill sharpening"].map(g=><button key={g} onClick={()=>setUser({...user,goal:g})} style={{padding:"9px 18px",borderRadius:8,fontSize:14,fontWeight:500,fontFamily:"inherit",cursor:"pointer",transition:"all 0.15s",background:user.goal===g?T.text:T.card,color:user.goal===g?T.bg:T.sub,border:`1.5px solid ${user.goal===g?T.text:T.border}`}}>{g}</button>)}
          </div>
        </div>
        <Btn disabled={!user.level||!user.goal} onClick={()=>{save(user);setView(V.BROWSE)}}>Start Practicing →</Btn>
      </div>
    </div>
  );

  // ── BROWSE ──
  if(view===V.BROWSE)return(
    <div style={{fontFamily:"'Outfit',sans-serif",color:T.text,background:T.bg,minHeight:"100vh"}}>
      <Head/>
      {/* Topbar */}
      <div style={{borderBottom:`1px solid ${T.border}`,padding:"11px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",background:T.card,position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:30,height:30,borderRadius:7,background:T.text,color:T.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,fontFamily:"'Newsreader',Georgia,serif"}}>W</div>
          <span style={{fontSize:15,fontWeight:600}}>Wordsmith Lab</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <Tag color={canGo?T.ok:T.err} bg={canGo?T.okS:T.errS}>{used}/{lim} today</Tag>
          <Tag color={user.tier==="paid"?T.accent:T.sub} bg={user.tier==="paid"?T.aS:T.alt}>{user.tier==="paid"?"PRO":"FREE"}</Tag>
          <button onClick={logout} style={{background:"none",border:"none",fontSize:13,color:T.muted,cursor:"pointer",fontFamily:"inherit"}}>Sign out</button>
        </div>
      </div>
      <div style={{maxWidth:920,margin:"0 auto",padding:"36px 22px"}}>
        <h1 style={{fontFamily:"'Newsreader',Georgia,serif",fontSize:28,fontWeight:500,marginBottom:4}}>Hey {user.name.split(" ")[0]}, build a challenge.</h1>
        <p style={{color:T.sub,fontSize:14,marginBottom:28}}>Mix the 4 dimensions below, or randomize.</p>
        {/* 4 dimension selectors */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:20}}>
          {[{l:"① Product Niche",items:NICHES,sel:sN,set:setSN,r:n=>`${n.icon} ${n.label}`},
            {l:"② Tone of Voice",items:TONES,sel:sT,set:setST,r:t=>t.label},
            {l:"③ Screen Type",items:SCREENS,sel:sS,set:setSS,r:s=>`${s.icon} ${s.label}`},
            {l:"④ User Persona",items:PERSONAS,sel:sP,set:setSP,r:p=>p.label}
          ].map(dim=>(
            <div key={dim.l}>
              <label style={{fontSize:11,fontWeight:600,color:T.muted,textTransform:"uppercase",letterSpacing:"0.07em",display:"block",marginBottom:8,fontFamily:"'IBM Plex Mono',monospace"}}>{dim.l}</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                {dim.items.map(item=><button key={item.id} onClick={()=>dim.set(item.id)} title={item.desc||item.d||""} style={{padding:"6px 12px",borderRadius:6,fontSize:12,fontWeight:500,fontFamily:"inherit",cursor:"pointer",transition:"all 0.15s",background:dim.sel===item.id?T.text:T.card,color:dim.sel===item.id?T.bg:T.sub,border:`1.5px solid ${dim.sel===item.id?T.text:T.border}`}}>{dim.r(item)}</button>)}
              </div>
            </div>
          ))}
        </div>
        {/* Actions */}
        <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:20,flexWrap:"wrap"}}>
          <Btn v="secondary" onClick={rand}>🎲 Randomize</Btn>
          <Btn disabled={!sN||!sT||!sS||!sP||!canGo} onClick={gen}>Generate Challenge →</Btn>
          {!canGo&&<span style={{fontSize:13,color:T.err,fontWeight:500}}>Daily limit reached.{user.tier==="free"?" Upgrade for 5/day.":""}</span>}
        </div>
        {/* Preview */}
        {(sN||sT||sS||sP)&&<div style={{padding:16,borderRadius:10,background:T.card,border:`1px solid ${T.border}`,marginBottom:28}}>
          <p style={{fontSize:11,fontWeight:600,color:T.muted,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8,fontFamily:"'IBM Plex Mono',monospace"}}>Preview</p>
          <p style={{fontSize:14,color:T.sub,lineHeight:1.6}}>
            {sN&&<><strong style={{color:T.text}}>{NICHES.find(n=>n.id===sN)?.label}</strong> · </>}
            {sT&&<><strong style={{color:T.text}}>{TONES.find(t=>t.id===sT)?.label}</strong> · </>}
            {sS&&<><strong style={{color:T.text}}>{SCREENS.find(s=>s.id===sS)?.label}</strong> · </>}
            {sP&&<strong style={{color:T.text}}>{PERSONAS.find(p=>p.id===sP)?.label}</strong>}
          </p>
        </div>}
        {/* History */}
        {hist.length>0&&<div>
          <p style={{fontSize:11,fontWeight:600,color:T.muted,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:10,fontFamily:"'IBM Plex Mono',monospace"}}>Recent</p>
          {hist.slice(0,5).map(h=><button key={h.id} onClick={()=>{setBrief(h.brief);setAns(h.answers);setExtras(h.extras||[]);setDone(true);setView(V.CHALLENGE)}} style={{textAlign:"left",padding:14,borderRadius:9,background:T.card,border:`1px solid ${T.border}`,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s",display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",marginBottom:6}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=T.bf} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
            <span style={{fontSize:13,fontWeight:500}}>{h.brief.screen.icon} {h.brief.niche.label} — {h.brief.screen.label} · <span style={{color:T.sub,fontWeight:400}}>{h.brief.tone.label}</span></span>
            <span style={{fontSize:12,color:T.muted}}>{new Date(h.date).toLocaleDateString()}</span>
          </button>)}
        </div>}
      </div>
    </div>
  );

  // ── CHALLENGE ──
  if(view===V.CHALLENGE&&brief)return(
    <div style={{fontFamily:"'Outfit',sans-serif",color:T.text,background:T.bg,minHeight:"100vh"}}>
      <Head/>
      {/* Topbar */}
      <div style={{borderBottom:`1px solid ${T.border}`,padding:"9px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",background:T.card,position:"sticky",top:0,zIndex:100}}>
        <button onClick={()=>setView(V.BROWSE)} style={{background:"none",border:"none",color:T.sub,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>← Back</button>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{display:"flex",borderRadius:6,overflow:"hidden",border:`1.5px solid ${T.border}`}}>
            {[{k:"phone",l:"📱"},{k:"desktop",l:"🖥"}].map(d=><button key={d.k} onClick={()=>setDev(d.k)} style={{padding:"5px 12px",fontSize:13,fontFamily:"inherit",cursor:"pointer",background:dev===d.k?T.text:T.card,color:dev===d.k?T.bg:T.sub,border:"none",transition:"all 0.15s"}}>{d.l}</button>)}
          </div>
          <Tag>{used}/{lim}</Tag>
        </div>
      </div>
      {/* Brief */}
      <div style={{background:T.alt,borderBottom:`1px solid ${T.border}`,padding:"18px 22px"}}>
        <div style={{maxWidth:920,margin:"0 auto"}}>
          <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
            <Tag>{brief.niche.icon} {brief.niche.label}</Tag>
            <Tag>{brief.tone.label}</Tag>
            <Tag>{brief.screen.icon} {brief.screen.label}</Tag>
            <Tag>{brief.persona.label} (~{brief.persona.age})</Tag>
          </div>
          <p style={{fontSize:14,color:T.text,lineHeight:1.65,marginBottom:14}}>{brief.brief}</p>
          <div style={{padding:16,borderRadius:10,background:T.card,border:`1px solid ${T.border}`}}>
            <p style={{fontSize:11,fontWeight:600,color:T.accent,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:8,fontFamily:"'IBM Plex Mono',monospace"}}>Context</p>
            <div style={{fontSize:13,color:T.sub,lineHeight:1.7}}>
              <p style={{marginBottom:4}}><strong style={{color:T.text}}>Page:</strong> {brief.ctx.page}</p>
              <p style={{marginBottom:4}}><strong style={{color:T.text}}>Feature:</strong> {brief.ctx.feature}</p>
              <p style={{marginBottom:4}}><strong style={{color:T.text}}>Situation:</strong> {brief.ctx.detail}</p>
              <p><strong style={{color:T.text}}>What's visible:</strong> {brief.ctx.visible}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Side-by-side */}
      <div style={{display:"grid",gridTemplateColumns:dev==="phone"?"1fr 370px":"1fr 1fr",maxWidth:1160,margin:"0 auto",minHeight:"calc(100vh - 200px)"}}>
        {/* Form */}
        <div style={{padding:"24px 24px 80px",borderRight:`1px solid ${T.border}`,overflowY:"auto"}}>
          <p style={{fontSize:11,fontWeight:600,color:T.muted,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:14,fontFamily:"'IBM Plex Mono',monospace"}}>Required Fields</p>
          {brief.screen.components.map(k=>{const m=COMP[k];if(!m)return null;return<Inp key={k} label={m.label} max={m.max} value={ans[k]} onChange={v=>setAns({...ans,[k]:v})} ph={m.ph} rows={m.rows} disabled={done}/>})}
          {extras.length>0&&<>
            <p style={{fontSize:11,fontWeight:600,color:T.muted,textTransform:"uppercase",letterSpacing:"0.07em",margin:"20px 0 10px",fontFamily:"'IBM Plex Mono',monospace"}}>Added Components</p>
            {extras.map((ext,i)=>{const c=EXTRAS.find(x=>x.id===ext.type);if(!c)return null;return<div key={i} style={{position:"relative",animation:"si 0.3s ease"}}>
              <Inp label={`${c.icon} ${c.field.label}`} max={c.field.max} value={ext.value} onChange={v=>{const cp=[...extras];cp[i]={...cp[i],value:v};setExtras(cp)}} ph={c.field.ph} rows={c.field.rows} disabled={done}/>
              {!done&&<button onClick={()=>setExtras(extras.filter((_,j)=>j!==i))} style={{position:"absolute",top:0,right:0,background:"none",border:"none",color:T.muted,cursor:"pointer",fontSize:15,padding:3}}>×</button>}
            </div>})}
          </>}
          {!done&&<div style={{marginTop:18}}>
            <p style={{fontSize:11,fontWeight:600,color:T.muted,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:8,fontFamily:"'IBM Plex Mono',monospace"}}>+ Add Component</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {EXTRAS.map(ec=><button key={ec.id} onClick={()=>setExtras([...extras,{type:ec.id,value:""}])} style={{padding:"5px 11px",borderRadius:6,fontSize:12,fontWeight:500,fontFamily:"inherit",cursor:"pointer",background:T.card,color:T.sub,border:`1px dashed ${T.border}`,transition:"all 0.15s"}}
                onMouseEnter={e=>{e.target.style.borderColor=T.accent;e.target.style.color=T.accent;e.target.style.borderStyle="solid"}}
                onMouseLeave={e=>{e.target.style.borderColor=T.border;e.target.style.color=T.sub;e.target.style.borderStyle="dashed"}}>{ec.icon} {ec.label}</button>)}
            </div>
          </div>}
          <div style={{marginTop:24,display:"flex",gap:10,flexWrap:"wrap"}}>
            {!done?<Btn v="accent" disabled={!brief.screen.components.every(k=>(ans[k]||"").trim().length>0)} onClick={()=>{setDone(true);saveH(brief)}}>✓ Mark Complete</Btn>
            :<div style={{padding:"11px 18px",borderRadius:8,background:T.okS,border:"1px solid rgba(45,122,79,0.12)",color:T.ok,fontSize:14,fontWeight:600,display:"flex",alignItems:"center",gap:6}}>✓ Complete</div>}
            <Btn v="secondary" onClick={()=>{setView(V.BROWSE);setBrief(null);setAns({});setExtras([]);setDone(false)}}>New Challenge</Btn>
          </div>
        </div>
        {/* Mockup */}
        <div style={{padding:24,display:"flex",alignItems:"flex-start",justifyContent:"center",background:T.bg,position:"sticky",top:130,alignSelf:"start"}}>
          <div style={{width:"100%"}}>
            <p style={{fontSize:11,fontWeight:600,color:T.muted,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:14,fontFamily:"'IBM Plex Mono',monospace",textAlign:"center"}}>Live Preview — {dev==="phone"?"Mobile":"Desktop"}</p>
            <Mockup sid={brief.screen.id} ans={ans} extras={extras} dev={dev}/>
          </div>
        </div>
      </div>
    </div>
  );
  return null;
}
