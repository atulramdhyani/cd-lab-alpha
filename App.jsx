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


// ═══════════════ NICHE-SPECIFIC VOCABULARY ═══════════════
// Each niche has domain-specific terms that slot into context templates
const NICHE_VOCAB = {
  fintech: { items:"transactions", content:"payment records", action:"transfer", tool:"payment gateway", asset:"account balance", team:"compliance team", export:"financial report", unit:"$2,450", collab:"co-signers", platform:"banking dashboard", upload:"tax document", search:"transaction history", notifActor:"bank partner", achievement:"savings milestone", premium:"advanced analytics", setting1:"Transaction alerts", setting2:"Spending limits", integration:"bank account", eventType:"payment", deliverable:"statement" },
  health: { items:"health records", content:"wellness data", action:"log workout", tool:"symptom checker", asset:"health score", team:"care team", export:"health summary", unit:"12-week program", collab:"healthcare providers", platform:"wellness dashboard", upload:"medical document", search:"symptom or condition", notifActor:"wellness coach", achievement:"fitness streak", premium:"personalized plans", setting1:"Health reminders", setting2:"Data sharing with providers", integration:"Apple Health / Fitbit", eventType:"appointment", deliverable:"wellness report" },
  saas: { items:"projects", content:"workspace data", action:"create project", tool:"automation builder", asset:"workspace", team:"team members", export:"analytics report", unit:"monthly plan", collab:"collaborators", platform:"project dashboard", upload:"CSV import", search:"tasks or docs", notifActor:"teammate", achievement:"productivity milestone", premium:"advanced automations", setting1:"Notification frequency", setting2:"Workspace visibility", integration:"Slack / Calendar", eventType:"sprint", deliverable:"project report" },
  ecommerce: { items:"products", content:"order history", action:"add to cart", tool:"product listing tool", asset:"store inventory", team:"vendor partners", export:"sales report", unit:"$89 order", collab:"suppliers", platform:"storefront dashboard", upload:"product images", search:"products or brands", notifActor:"customer", achievement:"sales milestone", premium:"advanced store analytics", setting1:"Order notifications", setting2:"Inventory alerts", integration:"Shopify / Stripe", eventType:"flash sale", deliverable:"order confirmation" },
  edtech: { items:"lessons", content:"course progress", action:"start lesson", tool:"quiz builder", asset:"learning path", team:"classmates", export:"certificate", unit:"12-week course", collab:"study group", platform:"learning dashboard", upload:"assignment", search:"courses or topics", notifActor:"instructor", achievement:"course completion", premium:"personalized tutoring", setting1:"Study reminders", setting2:"Progress sharing", integration:"Google Classroom", eventType:"live session", deliverable:"progress report" },
  social: { items:"posts", content:"feed data", action:"create post", tool:"content scheduler", asset:"profile", team:"followers", export:"data archive", unit:"post", collab:"tagged friends", platform:"home feed", upload:"photo or video", search:"people or hashtags", notifActor:"friend", achievement:"follower milestone", premium:"creator analytics", setting1:"Who can message you", setting2:"Activity status visibility", integration:"Instagram / TikTok", eventType:"live stream", deliverable:"engagement report" },
  travel: { items:"bookings", content:"trip history", action:"book stay", tool:"itinerary planner", asset:"upcoming trip", team:"travel companions", export:"itinerary PDF", unit:"$340/night booking", collab:"co-travelers", platform:"trip dashboard", upload:"passport scan", search:"destinations or stays", notifActor:"host", achievement:"trips completed", premium:"concierge service", setting1:"Price alerts", setting2:"Booking notifications", integration:"Google Maps / Calendar", eventType:"reservation", deliverable:"booking confirmation" },
  media: { items:"playlists", content:"listening history", action:"play song", tool:"playlist builder", asset:"library", team:"friends", export:"playlist", unit:"premium subscription", collab:"collaborative playlist members", platform:"home screen", upload:"podcast episode", search:"songs, artists, or podcasts", notifActor:"artist", achievement:"listening milestone", premium:"lossless audio", setting1:"Playback quality", setting2:"Listening activity visibility", integration:"Spotify / Apple Music", eventType:"album release", deliverable:"year in review" },
  auto: { items:"vehicles", content:"vehicle data", action:"start remote charge", tool:"diagnostic scanner", asset:"vehicle status", team:"service center", export:"maintenance log", unit:"service appointment", collab:"family members with access", platform:"vehicle dashboard", upload:"insurance document", search:"service centers or parts", notifActor:"vehicle system", achievement:"mileage milestone", premium:"advanced diagnostics", setting1:"Charge notifications", setting2:"Location sharing", integration:"home charging / CarPlay", eventType:"service appointment", deliverable:"vehicle report" },
  realestate: { items:"listings", content:"saved properties", action:"schedule tour", tool:"mortgage calculator", asset:"property portfolio", team:"agents", export:"market report", unit:"$450,000 listing", collab:"co-buyers", platform:"property search", upload:"pre-approval letter", search:"homes or neighborhoods", notifActor:"agent", achievement:"offer accepted", premium:"off-market listings", setting1:"Price drop alerts", setting2:"Search visibility to agents", integration:"Zillow / MLS", eventType:"open house", deliverable:"property comparison" },
  food: { items:"orders", content:"order history", action:"place order", tool:"menu browser", asset:"saved restaurants", team:"delivery drivers", export:"receipt", unit:"$32 order", collab:"group order members", platform:"restaurant listing", upload:"restaurant photo", search:"restaurants or cuisines", notifActor:"restaurant", achievement:"orders placed", premium:"priority delivery", setting1:"Order updates", setting2:"Location sharing with driver", integration:"Google Maps / Apple Pay", eventType:"delivery", deliverable:"order receipt" },
  gaming: { items:"games", content:"game library", action:"launch game", tool:"character builder", asset:"save files", team:"squad members", export:"stats export", unit:"season pass", collab:"co-op partners", platform:"game launcher", upload:"custom mod", search:"games or players", notifActor:"friend", achievement:"achievement unlocked", premium:"exclusive skins", setting1:"Online status", setting2:"Cross-play enabled", integration:"Discord / Steam", eventType:"tournament", deliverable:"match summary" },
  hr: { items:"candidates", content:"employee records", action:"submit application", tool:"interview scheduler", asset:"job posting", team:"hiring panel", export:"hiring report", unit:"job listing", collab:"interviewers", platform:"applicant tracker", upload:"resume", search:"candidates or roles", notifActor:"recruiter", achievement:"hire made", premium:"advanced sourcing", setting1:"Application notifications", setting2:"Profile visibility", integration:"LinkedIn / Calendar", eventType:"interview", deliverable:"offer letter" },
  legal: { items:"cases", content:"legal documents", action:"file document", tool:"contract editor", asset:"case file", team:"legal team", export:"case summary", unit:"retainer agreement", collab:"co-counsel", platform:"case dashboard", upload:"legal filing", search:"cases or statutes", notifActor:"opposing counsel", achievement:"case milestone", premium:"AI contract review", setting1:"Filing deadline alerts", setting2:"Document access permissions", integration:"DocuSign / court systems", eventType:"hearing", deliverable:"legal brief" },
  devtools: { items:"repositories", content:"codebase", action:"deploy", tool:"CI/CD pipeline", asset:"production environment", team:"engineering team", export:"build log", unit:"API calls", collab:"code reviewers", platform:"developer dashboard", upload:"config file", search:"repos or packages", notifActor:"CI bot", achievement:"deploy streak", premium:"advanced monitoring", setting1:"Build failure alerts", setting2:"Branch protection rules", integration:"GitHub / Slack", eventType:"release", deliverable:"changelog" },
  nonprofit: { items:"campaigns", content:"donor records", action:"donate", tool:"fundraiser builder", asset:"campaign goal", team:"volunteers", export:"impact report", unit:"$50 donation", collab:"co-organizers", platform:"campaign dashboard", upload:"event flyer", search:"campaigns or causes", notifActor:"organizer", achievement:"fundraising goal", premium:"donor analytics", setting1:"Campaign updates", setting2:"Donor visibility", integration:"Stripe / Mailchimp", eventType:"fundraiser", deliverable:"impact report" },
  petcare: { items:"pets", content:"pet health records", action:"book vet visit", tool:"symptom checker", asset:"pet profile", team:"vet team", export:"vaccination record", unit:"vet appointment", collab:"family members", platform:"pet dashboard", upload:"vet document", search:"vets or pet services", notifActor:"veterinarian", achievement:"care milestone", premium:"telehealth vet consults", setting1:"Medication reminders", setting2:"Health record sharing with vet", integration:"vet clinic system", eventType:"vet appointment", deliverable:"health summary" },
  dating: { items:"matches", content:"conversations", action:"send message", tool:"profile builder", asset:"dating profile", team:"matches", export:"data archive", unit:"premium subscription", collab:"mutual connections", platform:"discovery feed", upload:"profile photos", search:"people or interests", notifActor:"match", achievement:"connection milestone", premium:"unlimited likes", setting1:"Who can see your profile", setting2:"Read receipts", integration:"Instagram / Spotify", eventType:"date", deliverable:"compatibility report" },
  crypto: { items:"assets", content:"transaction history", action:"execute trade", tool:"portfolio tracker", asset:"wallet balance", team:"DAO members", export:"tax report", unit:"0.5 ETH transaction", collab:"multi-sig signers", platform:"portfolio dashboard", upload:"wallet import", search:"tokens or protocols", notifActor:"market alert", achievement:"portfolio milestone", premium:"advanced charts", setting1:"Price alerts", setting2:"Transaction confirmation requirements", integration:"MetaMask / Ledger", eventType:"governance vote", deliverable:"portfolio summary" },
  insurance: { items:"policies", content:"claims history", action:"file claim", tool:"coverage calculator", asset:"insurance policy", team:"claims team", export:"coverage summary", unit:"annual premium", collab:"beneficiaries", platform:"policy dashboard", upload:"damage photos", search:"plans or coverage options", notifActor:"claims adjuster", achievement:"claim resolved", premium:"priority claims processing", setting1:"Policy renewal reminders", setting2:"Beneficiary access", integration:"healthcare provider / bank", eventType:"policy renewal", deliverable:"claims report" },
};

// ═══════════════ CONTEXT TEMPLATES PER SCREEN TYPE ═══════════════
// Each template is a function that takes a niche vocab and returns a context
const CTX_TEMPLATES = {
  error_system: [
    v => ({ feature: v.upload, page: v.platform, detail: `User was uploading a large ${v.upload}. The upload reached 87% before the server timed out after 45 seconds. The file is not saved anywhere.`, visible: `Progress bar stuck at 87%, ${v.upload} filename visible` }),
    v => ({ feature: v.action, page: v.platform, detail: `User tried to ${v.action} but the server returned a 503 error after 30 seconds. The action may have partially completed on the backend.`, visible: `${v.platform} showing spinner, last known state visible` }),
    v => ({ feature: "real-time sync", page: v.platform, detail: `User was working in ${v.platform} when the connection dropped. Other ${v.collab} are also active. Unsaved changes exist in the buffer.`, visible: `'Last synced: 3 min ago' label, ${v.collab} avatars active` }),
    v => ({ feature: v.export, page: v.platform, detail: `User requested a ${v.export} export. The job crashed halfway through processing. Partial data may exist on the server.`, visible: `Export progress at 64%, estimated file size shown` }),
    v => ({ feature: v.integration, page: "integrations settings", detail: `User connected ${v.integration} but the authentication exchange failed. The connection shows as 'pending.'`, visible: `${v.integration} tile with spinner, status: connecting` }),
  ],
  error_user: [
    v => ({ feature: "email validation", page: "account settings", detail: `User tried to update their email but entered an invalid format (missing dot in domain). Form submitted and returned validation error.`, visible: `Email field highlighted red, old email shown as current` }),
    v => ({ feature: "file format", page: "import screen", detail: `User tried to upload an unsupported file format for ${v.upload}. The system only accepts specific formats. User may not know how to convert.`, visible: `Drag-and-drop zone with rejected file icon, supported formats listed` }),
    v => ({ feature: "password creation", page: "registration form", detail: `User chose a 6-character password. Minimum is 8 with one number. They've already filled in every other field on the form.`, visible: `All fields filled, password field highlighted red, strength meter: Weak` }),
    v => ({ feature: "duplicate entry", page: v.platform, detail: `User is trying to create a ${v.items.slice(0,-1)} with the same name as an existing one. The existing entry was created 2 months ago.`, visible: `Creation form, duplicate name highlighted, existing entry shown as match` }),
    v => ({ feature: "character limit", page: v.platform, detail: `User wrote a description that exceeds the character limit by 40 characters. They need to trim it without losing the key information.`, visible: `Text field showing over limit, excess characters highlighted in red` }),
  ],
  error_perm: [
    v => ({ feature: "admin panel", page: "team management", detail: `A regular member tried to access an admin-only action in ${v.platform}. Only admins and owners can manage ${v.team}.`, visible: `${v.platform} visible but action buttons grayed out, role badge: Member` }),
    v => ({ feature: v.premium, page: v.platform, detail: `A free-tier user tried to access ${v.premium}, which requires a paid plan. They can see the feature but can't use it.`, visible: `${v.platform} with feature visible, lock icon on ${v.premium}` }),
    v => ({ feature: "restricted content", page: v.platform, detail: `User tried to access ${v.content} that they were recently removed from. They can see the title but not the contents.`, visible: `Item name visible with lock icon, empty content area, role: Viewer` }),
    v => ({ feature: "billing access", page: "billing settings", detail: `A team member (not billing admin) tried to view subscription details. Billing info is restricted to the account owner.`, visible: `Billing page with blurred details, role badge: Team Member` }),
  ],
  empty_first: [
    v => ({ feature: v.items, page: v.platform, detail: `User just landed on their ${v.items} section for the first time. It's completely empty. Their ${v.team} also haven't created anything yet.`, visible: `Empty area with dotted outline, sidebar showing ${v.team} avatars` }),
    v => ({ feature: v.content, page: v.platform, detail: `User just enabled the ${v.content} feature. The section is blank. Other parts of the app already have activity.`, visible: `Blank ${v.content} area, navigation showing activity dots on other sections` }),
    v => ({ feature: "saved items", page: "favorites / saved", detail: `User opened their saved ${v.items} for the first time. They've been browsing for 20 minutes but haven't saved anything yet.`, visible: `Empty list with faint bookmark icon, count: 0 saved ${v.items}` }),
    v => ({ feature: "activity feed", page: "home / dashboard", detail: `Brand new user sees the activity feed on ${v.platform}. It's empty because they haven't done anything. This is the main screen.`, visible: `Blank feed, full navigation visible, default profile avatar` }),
    v => ({ feature: "team space", page: v.platform, detail: `User created a new shared space but no ${v.collab} have contributed yet. There are 6 people invited, space created 2 minutes ago.`, visible: `Empty workspace, 6 member avatars, 'Created 2m ago' label` }),
  ],
  empty_search: [
    v => ({ feature: "search", page: "search results", detail: `User searched for a very specific ${v.items.slice(0,-1)} with multiple filters applied. Zero exact matches. Similar results exist with slightly different criteria.`, visible: `Search bar with full query, empty results area, 3 active filter chips` }),
    v => ({ feature: "people search", page: "team directory", detail: `User searched for a person who hasn't joined yet. That person was invited 3 days ago but hasn't accepted.`, visible: `Search bar with name, empty results, 'Pending invites' badge in sidebar` }),
    v => ({ feature: "content search", page: v.platform, detail: `User searched for specific ${v.content} but it was deleted by someone else last week. The content existed and the user remembers it.`, visible: `Search query shown, 0 results, 'Recently Deleted' section in sidebar` }),
    v => ({ feature: "filtered view", page: v.platform, detail: `User applied filters that match nothing in their ${v.items}. The filters are too narrow but the user doesn't realize it.`, visible: `Filter bar with 4 active chips, empty results, total count: 0` }),
  ],
  onboard_welcome: [
    v => ({ feature: "app first launch", page: "first screen after install", detail: `User just downloaded the app after seeing an ad. They know the product name but not what it does. They have 5 similar apps installed.`, visible: `Full screen, app logo centered, clean background, no navigation` }),
    v => ({ feature: "web signup", page: "post-registration landing", detail: `User just verified email and sees ${v.platform} for the first time. Signed up because a friend recommended it. On laptop.`, visible: `${v.platform} skeleton underneath, welcome overlay, user's first name available` }),
    v => ({ feature: "team invite", page: "accept invitation", detail: `User clicked an invite link from their manager. Joining an existing workspace with 40 people. Doesn't know the product.`, visible: `Team name, inviter's name and avatar, role: Member` }),
    v => ({ feature: "trial start", page: "trial welcome", detail: `User started a 14-day free trial of the premium plan. Was on free tier for 3 months. Needs to understand what's unlocked.`, visible: `Premium badge, trial countdown: 14 days, feature highlights` }),
  ],
  onboard_step: [
    v => ({ feature: "profile setup", page: "onboarding step 2 of 4", detail: `User completed welcome, now needs to set up profile: photo, display name, and role. Skip rate on this step is 45%.`, visible: `Progress bar at 50%, avatar upload circle, name and role fields` }),
    v => ({ feature: "preferences", page: "onboarding step 3 of 5", detail: `User needs to select their interests so the app can personalize their ${v.platform}. Should pick at least 3 from 20 options.`, visible: `Progress: 60%, category grid with icons, counter: '0 of 3 minimum'` }),
    v => ({ feature: v.integration, page: "onboarding step 4 of 4", detail: `Final step: connecting ${v.integration}. Not required, but connected users retain 3x better.`, visible: `Integration card with connect button, 'Skip for now' visible` }),
    v => ({ feature: "goal setting", page: "onboarding step 2 of 3", detail: `The app needs the user to define their primary goal. This determines the entire ${v.platform} experience. Options range from beginner to advanced.`, visible: `Goal cards with illustrations, difficulty indicators, time estimates` }),
  ],
  loading: [
    v => ({ feature: "AI analysis", page: "results screen", detail: `User triggered an AI analysis of their ${v.content}. The system is scanning, extracting patterns, and generating insights. Takes 15-25 seconds.`, visible: `${v.content} thumbnail, progress indicator, estimated time remaining` }),
    v => ({ feature: v.export, page: v.platform, detail: `User requested a comprehensive ${v.export} that aggregates data from multiple sources. Takes 20-40 seconds to compile.`, visible: `Report template outline, source indicators (3/5 loaded)` }),
    v => ({ feature: "data import", page: "import wizard", detail: `User is importing data from a competitor. The system is processing thousands of records. Running for 90 seconds, ~2 minutes remaining.`, visible: `Record counter (8,200/15,000), elapsed time, source app logo` }),
    v => ({ feature: v.action, page: v.platform, detail: `User initiated ${v.action}. The system is verifying and processing. They must stay on screen. Expected wait: 10-15 seconds.`, visible: `Action summary, verification spinner, ${v.unit} details shown` }),
  ],
  confirm_destroy: [
    v => ({ feature: `${v.items} deletion`, page: v.platform, detail: `User is about to permanently delete ${v.items} that ${v.collab} also have access to. One of them made changes 30 minutes ago. Recoverable from trash for 30 days.`, visible: `Item name, ${v.collab} avatars, last edit: 30m ago, linked content count` }),
    v => ({ feature: "account deletion", page: "account settings", detail: `User wants to permanently delete their account. They have years of ${v.content}, an active subscription, and their ${v.team} will need a new admin.`, visible: `Account age, ${v.content} count, subscription status, ${v.team} affected` }),
    v => ({ feature: "integration disconnect", page: "integrations", detail: `User is disconnecting ${v.integration}. 14 automated workflows depend on this integration. All will break immediately.`, visible: `${v.integration} card, '14 workflows affected' warning, workflow names` }),
    v => ({ feature: `${v.team} removal`, page: "team management", detail: `Admin is removing a member of ${v.team} who owns active ${v.items} and is the only admin of 2 channels. Work needs reassignment.`, visible: `Member profile, active ${v.items} owned, last active: 1hr ago` }),
  ],
  confirm_safe: [
    v => ({ feature: "publishing", page: v.platform, detail: `User is about to publish content to their audience. It's been in draft for 5 days, reviewed by 2 ${v.collab}.`, visible: `Content title, audience count, draft age: 5d, 2/2 reviewer approvals` }),
    v => ({ feature: "batch action", page: v.platform, detail: `User is performing a batch action on 15 ${v.items} at once. Each will be updated immediately. Currently there are 35 total.`, visible: `15 items selected, action summary, total: 35 ${v.items}` }),
    v => ({ feature: "plan upgrade", page: "billing", detail: `User is upgrading their plan. The change is prorated and takes effect immediately, unlocking ${v.premium}.`, visible: `Current plan → New plan, prorated charge shown, features unlocked listed` }),
    v => ({ feature: v.export, page: v.platform, detail: `User is exporting their ${v.content} as a downloadable file. Includes personal info and activity history. Emailed in 10 minutes.`, visible: `Data categories selected, estimated file size, delivery: email` }),
  ],
  success: [
    v => ({ feature: "milestone", page: "celebration modal", detail: `User just hit a major ${v.achievement}. They've been consistent, but their engagement dipped 20% last 2 weeks — possible burnout.`, visible: `${v.achievement} badge, streak length, recent trend: down arrow` }),
    v => ({ feature: "transaction", page: "confirmation", detail: `A ${v.unit} was successfully processed. The user has been waiting for this confirmation. Next steps are available.`, visible: `${v.unit} confirmed, status: Complete, next action available` }),
    v => ({ feature: v.action, page: v.platform, detail: `User just completed a major action (${v.action}) after weeks of preparation. All checks passed. The result is now live.`, visible: `Action summary, all checks green, live status indicator, share option` }),
    v => ({ feature: "referral", page: "referral program", detail: `User's referral was accepted — their friend signed up. User earns a reward. 3 total referrals so far.`, visible: `Friend's name, reward applied, total referrals: 3` }),
  ],
  permission: [
    v => ({ feature: "location access", page: "pre-permission screen", detail: `User just performed a search that would benefit from location data. App needs GPS to show relevant ${v.items}. Never asked before.`, visible: `Search query visible, map outline, location pin icon` }),
    v => ({ feature: "push notifications", page: "post-onboarding prompt", detail: `User just completed onboarding. App wants to enable notifications for ${v.eventType} updates and ${v.notifActor} messages. Opt-in rate: 48%.`, visible: `Notification previews (${v.eventType} update, ${v.notifActor} message), toggles` }),
    v => ({ feature: "camera access", page: "feature activation", detail: `User tapped a feature that needs camera access (scanning ${v.upload}). First time using this. App has been used for 2 weeks.`, visible: `Camera viewfinder outline, scan icon, feature description` }),
    v => ({ feature: "contacts access", page: "friend finder", detail: `User opened 'Find Friends' to see who's already on the platform. App needs contacts to match. 4 contacts already use it.`, visible: `Friend finder illustration, contacts icon, '4 people you know are here'` }),
    v => ({ feature: `${v.integration} access`, page: "integration setup", detail: `User wants to connect ${v.integration} for a richer experience. This involves sharing data between the two services.`, visible: `${v.integration} icon, data types that will be shared, privacy badge` }),
  ],
  paywall: [
    v => ({ feature: v.premium, page: v.platform, detail: `Free user mid-workflow tried to access ${v.premium}. This is a paid feature. They've been working for 15 minutes — this was their next step.`, visible: `${v.platform} with ${v.premium} feature locked, Pro badge on feature` }),
    v => ({ feature: "export quality", page: "export dialog", detail: `User finished work and wants a high-quality ${v.export}. Free tier only allows basic format. They need this for a presentation tomorrow.`, visible: `Export options: basic (free), premium (locked), content preview` }),
    v => ({ feature: "team seats", page: "team settings", detail: `User tried to invite a 6th person to ${v.team}. Free plan allows 5. The new person starts Monday.`, visible: `Team list (5/5), invite form with 6th email, plan: Free` }),
    v => ({ feature: "storage limit", page: "upload screen", detail: `User's storage is full. Upgrading doubles it. They have hundreds of ${v.items} and don't want to delete any.`, visible: `Storage bar at 100%, upload failed, ${v.items} count shown` }),
  ],
  notif: [
    v => ({ feature: "@mention", page: "phone lock screen", detail: `A member of ${v.team} @mentioned the user in a comment on shared ${v.items}. The comment asks a direct question. User last opened app 2hrs ago.`, visible: `App icon, sender avatar, message preview snippet` }),
    v => ({ feature: "weekly digest", page: "home screen", detail: `User's weekly ${v.deliverable} is ready. Key metric was up 23% this week. They have 4 unread messages and 2 pending items.`, visible: `App icon, report icon, stat preview` }),
    v => ({ feature: "deadline", page: "lock screen", detail: `A task related to ${v.items} is due in 2 hours. It's been 'In Progress' for 3 days. The ${v.team} lead is CC'd.`, visible: `App icon, task name, due time, urgency indicator` }),
    v => ({ feature: "price/status change", page: "home screen", detail: `Something the user has been watching changed status. This is time-sensitive — the window is 6 hours. Item is in their saved list.`, visible: `App icon, item thumbnail, old status crossed out, new status` }),
    v => ({ feature: "security alert", page: "home screen", detail: `A new device logged into the user's account from an unfamiliar location. Could be legitimate or a breach.`, visible: `App icon, security shield, unknown location, 'Was this you?'` }),
  ],
  tooltip: [
    v => ({ feature: "new feature badge", page: v.platform, detail: `User is hovering over a new feature badge on ${v.platform}. The feature (${v.premium}) launched this week. It could significantly improve their workflow.`, visible: `${v.platform} with new badge next to ${v.premium}, cursor hovering` }),
    v => ({ feature: "keyboard shortcut", page: v.platform, detail: `User just performed an action the slow way for the 10th time. A keyboard shortcut exists. User seems unaware of it.`, visible: `Action menu open, slow method highlighted, shortcut not shown` }),
    v => ({ feature: "empty description", page: v.platform, detail: `User just created a new ${v.items.slice(0,-1)} but left the description empty. ${v.items} with descriptions get 3x more engagement.`, visible: `${v.items.slice(0,-1)} header, empty description field, just created` }),
    v => ({ feature: "privacy setting", page: "privacy settings", detail: `A toggle labeled '${v.setting2}' is ON by default (opt-out). Most users don't understand what this controls.`, visible: `Toggle: ON, label: '${v.setting2}', no description visible` }),
    v => ({ feature: "advanced feature", page: v.platform, detail: `User is using basic search on 2,000+ ${v.items}. An 'Advanced Filters' button exists but they've never used it. Power users filter 5x faster.`, visible: `Search bar with basic query, ${v.items} list, 'Advanced Filters' button` }),
  ],
  cancel: [
    v => ({ feature: "subscription cancel", page: "cancellation flow", detail: `User clicked 'Cancel Subscription.' Active for 11 months, uses it 4x/week, has 45 saved ${v.items}. Renewal in 6 days.`, visible: `Plan details, member 11 months, 4x/week usage, 45 ${v.items}, renews 6d` }),
    v => ({ feature: "account deactivation", page: "account settings", detail: `User wants to deactivate (not delete). Data preserved 90 days. 3 members of ${v.team} depend on shared resources.`, visible: `Deactivation option, 90-day retention, 3 affected ${v.team} members` }),
    v => ({ feature: "plan downgrade", page: "plan settings", detail: `User downgrading from paid to free. Will lose: ${v.premium}, unlimited ${v.items} (→3), and priority support. Currently has 12 active ${v.items}.`, visible: `Current → Free, features lost listed, 12 ${v.items} (Free limit: 3)` }),
    v => ({ feature: `${v.eventType} cancellation`, page: `${v.eventType} management`, detail: `User is canceling a scheduled ${v.eventType} that 28 people confirmed for. It's in 48 hours. 12 people added it to their calendar.`, visible: `${v.eventType} name, 48hrs away, 28 confirmed, 12 calendar adds` }),
  ],
  settings: [
    v => ({ feature: "notification preferences", page: "notification settings", detail: `User gets 30+ notifications/day, wants to reduce noise. Configuring which types they receive and through which channels.`, visible: `Notification categories, per-channel toggles (push/email/in-app), all ON` }),
    v => ({ feature: "privacy controls", page: "privacy settings", detail: `User reviewing two settings: (1) ${v.setting1} and (2) ${v.setting2}. Both are currently ON by default.`, visible: `Two toggle sections: ${v.setting1} (ON), ${v.setting2} (ON)` }),
    v => ({ feature: "two-factor auth", page: "security settings", detail: `User setting up 2FA for first time. Options: authenticator app (recommended) or SMS.`, visible: `2FA: Not enabled, two method cards (Authenticator recommended), setup button` }),
    v => ({ feature: "display preferences", page: "appearance settings", detail: `User changing theme (light/dark/system) and font size. Also sees a new 'Reduce motion' accessibility toggle.`, visible: `Theme selector (3 options), font slider, reduce motion toggle, preview` }),
  ],
  banner: [
    v => ({ feature: "scheduled maintenance", page: `${v.platform} (top banner)`, detail: `System maintenance in 4 hours. Unavailable ~30 minutes. Users should save their ${v.content}.`, visible: `Banner over ${v.platform}, countdown timer, unsaved work indicator` }),
    v => ({ feature: "new feature launch", page: `${v.platform} (banner)`, detail: `A major feature (${v.premium}) just launched. Users should know about it but aren't forced to interact.`, visible: `${v.platform} below, feature name + icon in banner, 'Learn more'` }),
    v => ({ feature: "policy update", page: "any page (banner)", detail: `Privacy policy was updated. Users must review and accept in 14 days to continue using the service.`, visible: `Policy notice, accept button, 14-day countdown, content below` }),
    v => ({ feature: "trial expiring", page: "any page (banner)", detail: `Free trial expires in 2 days. User has been active daily, used 80% of premium features. Convert without being pushy.`, visible: `'2 days left' badge, usage indicator, upgrade hint` }),
  ],
  email: [
    v => ({ feature: "payment failed", page: "email inbox", detail: `Recurring payment failed — card expired. System auto-retries in 3 days. If it fails again, downgrade to free in 7 days.`, visible: `App logo, payment amount, card last 4, retry date, downgrade warning` }),
    v => ({ feature: "welcome email", page: "email inbox", detail: `User signed up 5 minutes ago. First email they receive. Should reinforce value and get them back into the app.`, visible: `App logo, user's first name, getting started CTA, support link` }),
    v => ({ feature: "password reset", page: "email inbox", detail: `User requested password reset. Link expires in 1 hour. May not have been them (possible unauthorized attempt).`, visible: `Reset button, expiry: 1hr, 'Didn't request this?' section` }),
    v => ({ feature: `${v.deliverable}`, page: "email inbox", detail: `Weekly digest of ${v.platform} activity: key stats, team highlights, pending items. User hasn't logged in for 5 days.`, visible: `Stats summary, highlights, 'Log in' CTA, unsubscribe link` }),
  ],
};

// ═══════════════ NICHE-AWARE BRIEF GENERATOR ═══════════════
function generateBrief(nicheId, toneId, screenId, personaId, NICHES, TONES, SCREENS, PERSONAS) {
  const niche = NICHES.find(n=>n.id===nicheId);
  const tone = TONES.find(t=>t.id===toneId);
  const screen = SCREENS.find(s=>s.id===screenId);
  const persona = PERSONAS.find(p=>p.id===personaId);
  const vocab = NICHE_VOCAB[nicheId] || NICHE_VOCAB.saas;
  const templates = CTX_TEMPLATES[screenId] || CTX_TEMPLATES.error_system;
  const template = templates[Math.floor(Math.random()*templates.length)];
  const ctx = template(vocab);
  return {
    niche, tone, screen, persona, ctx,
    brief: `Write UX copy for a ${niche.label} app or website. The user is on a ${screen.label} screen. They are a ${persona.label} (age ~${persona.age}): ${persona.d}. This product follows a ${tone.label} tone — ${tone.desc}.`,
  };
}


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
  const gen=()=>{if(!sN||!sT||!sS||!sP)return;const b=generateBrief(sN,sT,sS,sP,NICHES,TONES,SCREENS,PERSONAS);setBrief(b);setAns({});setExtras([]);setDone(false);bump();setView(V.CHALLENGE)};
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
