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
  { id:"error_system", label:"System Error", icon:"🔴", components:["title","body","primaryButton","secondaryButton"], mt:"dialog", goal:"Something broke and it's not the user's fault. Write copy that acknowledges the problem, reassures them their data is safe, and gives them a clear recovery action." },
  { id:"error_user", label:"User Input Error", icon:"⛔", components:["title","body","primaryButton"], mt:"dialog", goal:"The user did something wrong (invalid input, wrong format, etc). Write copy that explains exactly what went wrong and how to fix it — without blaming them." },
  { id:"error_perm", label:"Permission Denied", icon:"🚫", components:["title","body","primaryButton"], mt:"dialog", goal:"The user tried to access something they don't have permission for. Write copy that explains why they can't proceed and gives them a clear next step to get access." },
  { id:"empty_first", label:"First-time Empty State", icon:"📭", components:["title","body","primaryButton"], mt:"full", goal:"The user is seeing an empty screen for the first time — no content yet. Write copy that motivates them to take their first action and makes the blank space feel like an opportunity, not a dead end." },
  { id:"empty_search", label:"No Search Results", icon:"🔍", components:["title","body","primaryButton"], mt:"full", goal:"The user searched for something and got zero results. Write copy that acknowledges their intent, suggests how to broaden or fix their search, and keeps them engaged." },
  { id:"onboard_welcome", label:"Welcome / First Screen", icon:"👋", components:["title","body","primaryButton","secondaryButton"], mt:"full", goal:"This is the very first screen a new user sees after signing up. Write copy that communicates the product's core value in seconds and gets them excited to start." },
  { id:"onboard_step", label:"Onboarding Step", icon:"📋", components:["title","body","primaryButton","skipLink"], mt:"full", goal:"The user is mid-onboarding being asked to complete a setup step. Write copy that explains why this step matters, makes it feel quick, and lets them skip without guilt." },
  { id:"loading", label:"Loading / Progress", icon:"⏳", components:["loadMsg1","loadMsg2","loadMsg3"], mt:"full", goal:"The user is waiting for something to load. Write 3 sequential messages that reduce anxiety, show progress, and make the wait feel purposeful rather than frustrating." },
  { id:"confirm_destroy", label:"Destructive Confirmation", icon:"⚠️", components:["title","body","destructiveButton","cancelButton"], mt:"dialog", goal:"The user is about to do something irreversible (delete, remove, disconnect). Write copy that makes the consequences crystal clear so they can make an informed choice — without being so scary they abandon the action entirely." },
  { id:"confirm_safe", label:"Non-destructive Confirm", icon:"✔️", components:["title","body","primaryButton","cancelButton"], mt:"dialog", goal:"The user is about to take a significant but reversible action (publish, send, upgrade). Write copy that confirms the details, builds confidence, and makes the primary action feel safe." },
  { id:"success", label:"Success / Celebration", icon:"🎉", components:["title","body","primaryButton","secondaryButton"], mt:"dialog", goal:"The user just completed something meaningful. Write copy that celebrates proportionately, reinforces the value of what they did, and guides them to a logical next step." },
  { id:"permission", label:"Permission Request", icon:"🔐", components:["title","body","primaryButton","skipLink"], mt:"full", goal:"The app needs a device permission (location, camera, notifications, etc). Write copy that explains why you need it, what the user gets out of granting it, and makes declining feel safe." },
  { id:"paywall", label:"Paywall / Upgrade Gate", icon:"💎", components:["title","body","primaryButton","secondaryButton"], mt:"dialog", goal:"The user hit a feature or limit that requires a paid plan. Write copy that shows the value of upgrading and gives them a clear path forward — without shaming them for being on the free tier." },
  { id:"notif", label:"Push Notification", icon:"🔔", components:["notifTitle","notifBody"], mt:"notif", goal:"Write a push notification that's worth the interruption. It should be scannable in under 2 seconds, give the user enough info to decide whether to tap, and feel relevant — not spammy." },
  { id:"tooltip", label:"Tooltip / Nudge", icon:"💡", components:["tipBody","tipCta","tipDismiss"], mt:"tip", goal:"The user hasn't noticed a feature that would help them. Write a tooltip that teaches them something useful in one glance, with a clear action to try it and an easy way to dismiss." },
  { id:"cancel", label:"Cancellation Flow", icon:"🚪", components:["title","body","retainButton","confirmCancel"], mt:"full", goal:"The user wants to cancel their subscription or leave. Write copy that gives them a genuine reason to stay and makes the consequences of leaving clear — without being manipulative or hiding the cancel option." },
  { id:"settings", label:"Settings / Preferences", icon:"⚙️", components:["setLabel1","setDesc1","setLabel2","setDesc2"], mt:"settings", goal:"Write labels and descriptions for two settings/preferences. Each label should be self-explanatory, and each description should explain the real-world impact of toggling it on or off." },
  { id:"banner", label:"Banner / Announcement", icon:"📢", components:["title","body","primaryButton","skipLink"], mt:"full", goal:"Write a banner announcement that earns the screen space it occupies. Whether it's maintenance, a new feature, or a policy update — communicate the key info and action without disrupting the user's flow." },
  { id:"email", label:"Transactional Email", icon:"📧", components:["emailSubject","title","body","primaryButton"], mt:"email", goal:"Write a transactional email (receipt, alert, digest, etc). The subject line must get opened, the body must be scannable, and the CTA must make it clear what happens when they click." },
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


// ═══════════════ FICTIONAL COMPANY PROFILES ═══════════════
// 3-4 per niche. Each has its own vocab that feeds into context templates.
const COMPANIES = {
  fintech: [
    { name:"Kova", desc:"An AI-powered budgeting app for freelancers and gig workers", audience:"Freelancers aged 22-35 managing irregular income", items:"transactions", content:"financial data", action:"schedule a transfer", tool:"budget planner", asset:"account balance", team:"financial advisors", export:"spending report", unit:"$1,200 invoice payment", collab:"shared account holders", platform:"budget dashboard", upload:"bank statement", search:"transactions or categories", notifActor:"budget assistant", achievement:"savings goal reached", premium:"AI cash flow forecasting", setting1:"Low balance alerts", setting2:"Spending category sharing", integration:"Plaid / bank account", eventType:"payment", deliverable:"monthly spending report" },
    { name:"Ledgr", desc:"A modern invoicing and expense platform for small businesses", audience:"Small business owners with 1-20 employees", items:"invoices", content:"billing records", action:"send invoice", tool:"invoice builder", asset:"outstanding receivables", team:"accountant", export:"tax summary", unit:"$3,400 client invoice", collab:"bookkeeper", platform:"invoicing dashboard", upload:"receipt photo", search:"invoices or clients", notifActor:"client", achievement:"revenue milestone", premium:"automated payment reminders", setting1:"Invoice due alerts", setting2:"Late payment notifications", integration:"QuickBooks / Stripe", eventType:"payment due date", deliverable:"quarterly tax summary" },
    { name:"Stacko", desc:"A commission-free micro-investing app that rounds up purchases", audience:"Young adults 18-28 new to investing", items:"investments", content:"portfolio data", action:"invest round-up", tool:"portfolio tracker", asset:"portfolio value", team:"investment community", export:"tax document", unit:"$50 weekly round-up", collab:"investment club members", platform:"portfolio overview", upload:"tax form", search:"stocks or ETFs", notifActor:"market alert", achievement:"portfolio milestone", premium:"advanced market analysis", setting1:"Round-up notifications", setting2:"Portfolio visibility to friends", integration:"bank account / Apple Pay", eventType:"dividend payout", deliverable:"annual investment summary" },
  ],
  health: [
    { name:"Wellora", desc:"A holistic wellness app combining meditation, fitness, and nutrition tracking", audience:"Health-conscious professionals aged 25-45", items:"wellness activities", content:"health data", action:"log activity", tool:"meal planner", asset:"wellness score", team:"wellness coaches", export:"health summary", unit:"30-day streak", collab:"accountability partners", platform:"wellness dashboard", upload:"meal photo", search:"workouts or recipes", notifActor:"wellness coach", achievement:"streak milestone", premium:"personalized nutrition plans", setting1:"Daily reminder timing", setting2:"Health data sharing with coach", integration:"Apple Health / Fitbit", eventType:"coaching session", deliverable:"weekly wellness report" },
    { name:"Mindli", desc:"A CBT-based therapy companion app with journaling and mood tracking", audience:"Adults 20-40 managing anxiety or depression", items:"journal entries", content:"mood data", action:"log mood", tool:"thought reframing tool", asset:"mood patterns", team:"therapist", export:"therapy summary", unit:"weekly check-in", collab:"trusted support circle", platform:"mood dashboard", upload:"therapist note", search:"entries or patterns", notifActor:"therapist", achievement:"consistency milestone", premium:"therapist matching", setting1:"Check-in reminders", setting2:"Mood data sharing with therapist", integration:"calendar / therapist portal", eventType:"therapy session", deliverable:"mood trend report" },
    { name:"Pulseway", desc:"A remote patient monitoring app for chronic condition management", audience:"Patients 40-70 with diabetes, hypertension, or heart conditions", items:"health readings", content:"vital signs data", action:"log reading", tool:"symptom checker", asset:"health timeline", team:"care team", export:"care report", unit:"blood pressure reading", collab:"family caregivers", platform:"health timeline", upload:"lab results", search:"readings or symptoms", notifActor:"nurse coordinator", achievement:"controlled readings streak", premium:"24/7 nurse hotline", setting1:"Abnormal reading alerts", setting2:"Data sharing with family members", integration:"glucose monitor / blood pressure cuff", eventType:"care check-in", deliverable:"monthly health summary" },
  ],
  saas: [
    { name:"Draftwork", desc:"A collaborative document editor with built-in approval workflows", audience:"Marketing teams at mid-size companies (50-500 employees)", items:"documents", content:"workspace content", action:"create document", tool:"approval workflow builder", asset:"team workspace", team:"team members", export:"content report", unit:"enterprise plan", collab:"reviewers and approvers", platform:"document dashboard", upload:"template file", search:"documents or templates", notifActor:"reviewer", achievement:"documents approved milestone", premium:"AI writing assistant", setting1:"Review request notifications", setting2:"Document visibility defaults", integration:"Slack / Google Drive", eventType:"review deadline", deliverable:"content performance report" },
    { name:"Taskpilot", desc:"An AI-powered project management tool that auto-prioritizes work", audience:"Product and engineering teams at startups", items:"tasks", content:"project data", action:"create task", tool:"sprint planner", asset:"project board", team:"engineering team", export:"sprint report", unit:"sprint cycle", collab:"assignees", platform:"project board", upload:"spec document", search:"tasks or epics", notifActor:"teammate", achievement:"sprint completion", premium:"AI auto-prioritization", setting1:"Task assignment notifications", setting2:"Board visibility to stakeholders", integration:"GitHub / Slack / Jira", eventType:"sprint review", deliverable:"velocity report" },
    { name:"Signable", desc:"A modern e-signature and contract management platform", audience:"Legal and ops teams at growing companies", items:"contracts", content:"agreement data", action:"send for signature", tool:"template editor", asset:"contract library", team:"legal team", export:"audit trail", unit:"enterprise contract", collab:"signers and witnesses", platform:"contract dashboard", upload:"PDF contract", search:"contracts or signers", notifActor:"signer", achievement:"contracts processed milestone", premium:"AI clause detection", setting1:"Signature reminder frequency", setting2:"Contract access permissions", integration:"Salesforce / Google Drive", eventType:"signing deadline", deliverable:"quarterly compliance report" },
  ],
  ecommerce: [
    { name:"Thread & Co", desc:"A sustainable fashion marketplace connecting indie designers with conscious shoppers", audience:"Eco-conscious women aged 25-40", items:"products", content:"order history", action:"add to cart", tool:"style quiz", asset:"wishlist", team:"seller partners", export:"purchase history", unit:"$89 dress order", collab:"shared wishlist members", platform:"shop feed", upload:"product photo", search:"items, brands, or materials", notifActor:"seller", achievement:"sustainable shopping milestone", premium:"early access to drops", setting1:"Restock notifications", setting2:"Order tracking updates", integration:"Apple Pay / Klarna", eventType:"flash sale", deliverable:"order confirmation" },
    { name:"Packsmith", desc:"A subscription box platform where users build custom monthly boxes", audience:"Millennials who love curation and discovery", items:"subscriptions", content:"box history", action:"customize box", tool:"box builder", asset:"subscription", team:"brand partners", export:"subscription summary", unit:"$45/month box", collab:"gift recipients", platform:"box builder", upload:"product review photo", search:"products or categories", notifActor:"brand partner", achievement:"boxes received milestone", premium:"premium product tier", setting1:"Shipping notifications", setting2:"Taste profile sharing", integration:"Stripe / shipping carriers", eventType:"monthly box curation", deliverable:"monthly box summary" },
    { name:"Gearside", desc:"A peer-to-peer marketplace for buying and selling used outdoor gear", audience:"Outdoor enthusiasts aged 20-45 who value sustainability", items:"listings", content:"sales history", action:"list item", tool:"pricing estimator", asset:"seller profile", team:"buyers and sellers", export:"sales report", unit:"$220 used tent listing", collab:"co-sellers", platform:"marketplace feed", upload:"gear photos", search:"gear, brands, or activities", notifActor:"buyer", achievement:"items sold milestone", premium:"promoted listings", setting1:"New offer notifications", setting2:"Location visibility on listings", integration:"PayPal / shipping labels", eventType:"offer received", deliverable:"seller performance report" },
  ],
  edtech: [
    { name:"Leapwise", desc:"An adaptive learning platform that adjusts difficulty in real-time", audience:"Adult learners 25-45 reskilling for tech careers", items:"courses", content:"learning progress", action:"start lesson", tool:"skill assessment", asset:"learning path", team:"mentors", export:"skill report", unit:"12-week bootcamp", collab:"study partners", platform:"learning dashboard", upload:"assignment submission", search:"courses or skills", notifActor:"mentor", achievement:"course completion", premium:"1-on-1 mentorship", setting1:"Lesson reminders", setting2:"Progress sharing with employer", integration:"LinkedIn / Google Calendar", eventType:"live workshop", deliverable:"skills certificate" },
    { name:"Polyglot", desc:"A language learning app using AI conversation partners", audience:"Professionals aged 22-40 learning a second language for work", items:"lessons", content:"conversation history", action:"start conversation", tool:"pronunciation coach", asset:"fluency score", team:"language coaches", export:"proficiency report", unit:"B2 assessment", collab:"conversation partners", platform:"practice dashboard", upload:"voice recording", search:"topics or grammar points", notifActor:"AI conversation partner", achievement:"fluency milestone", premium:"human tutor sessions", setting1:"Daily practice reminders", setting2:"Streak visibility to friends", integration:"calendar / Zoom", eventType:"tutoring session", deliverable:"monthly fluency report" },
    { name:"Curiobyte", desc:"A STEM learning platform with interactive simulations for K-12 students", audience:"Students aged 10-16 and their parents/teachers", items:"experiments", content:"lab data", action:"launch simulation", tool:"hypothesis builder", asset:"lab notebook", team:"classmates", export:"lab report", unit:"module completion", collab:"lab partners", platform:"lab dashboard", upload:"lab photo", search:"experiments or concepts", notifActor:"teacher", achievement:"experiments completed", premium:"advanced simulations", setting1:"Assignment due reminders", setting2:"Grade sharing with parents", integration:"Google Classroom / LMS", eventType:"live lab session", deliverable:"progress report card" },
  ],
  social: [
    { name:"Murmur", desc:"A text-first social platform for thoughtful, long-form conversations", audience:"Writers, thinkers, and readers aged 25-45", items:"posts", content:"conversation threads", action:"publish post", tool:"thread composer", asset:"profile", team:"followers", export:"data archive", unit:"post", collab:"co-authors", platform:"home feed", upload:"cover image", search:"posts, people, or topics", notifActor:"commenter", achievement:"follower milestone", premium:"analytics dashboard", setting1:"Reply notifications", setting2:"Profile discoverability", integration:"RSS / Substack", eventType:"live discussion", deliverable:"engagement report" },
    { name:"Hivelink", desc:"A private community platform for niche interest groups", audience:"Community builders and hobbyists aged 20-50", items:"groups", content:"community posts", action:"create group", tool:"event scheduler", asset:"community", team:"members", export:"community report", unit:"membership", collab:"co-moderators", platform:"community feed", upload:"event banner", search:"groups or discussions", notifActor:"member", achievement:"community growth milestone", premium:"custom branding", setting1:"New post notifications", setting2:"Member directory visibility", integration:"Discord / Zoom", eventType:"community event", deliverable:"weekly community digest" },
  ],
  travel: [
    { name:"Wayfinder", desc:"An AI travel planner that builds personalized itineraries from your preferences", audience:"Millennial and Gen Z travelers who prefer experiences over tourist traps", items:"trips", content:"trip history", action:"plan trip", tool:"itinerary builder", asset:"upcoming trip", team:"travel companions", export:"itinerary PDF", unit:"$2,400 Japan trip", collab:"co-travelers", platform:"trip planner", upload:"passport scan", search:"destinations or experiences", notifActor:"local guide", achievement:"countries visited milestone", premium:"concierge planning", setting1:"Flight price alerts", setting2:"Trip sharing with companions", integration:"Google Maps / airline apps", eventType:"trip", deliverable:"post-trip summary" },
    { name:"Staywell", desc:"A boutique hotel booking platform focused on wellness retreats", audience:"Professionals 30-55 seeking restorative travel experiences", items:"bookings", content:"stay history", action:"book retreat", tool:"wellness matcher", asset:"upcoming stay", team:"retreat hosts", export:"booking confirmation", unit:"$480/night wellness retreat", collab:"retreat group members", platform:"retreat browser", upload:"health preferences form", search:"retreats, locations, or wellness types", notifActor:"host", achievement:"retreats completed", premium:"priority booking", setting1:"Price drop alerts", setting2:"Wellness preferences sharing with hosts", integration:"Calendar / Apple Health", eventType:"retreat check-in", deliverable:"stay receipt" },
  ],
  media: [
    { name:"Wavelength", desc:"A podcast discovery platform that uses AI to match listeners with shows", audience:"Podcast enthusiasts aged 22-40 who want to find new voices", items:"podcasts", content:"listening history", action:"play episode", tool:"playlist builder", asset:"library", team:"friends", export:"listening data", unit:"premium subscription", collab:"shared playlist members", platform:"discovery feed", upload:"podcast recommendation", search:"shows, topics, or hosts", notifActor:"podcast host", achievement:"listening hours milestone", premium:"ad-free listening", setting1:"New episode alerts", setting2:"Listening activity visibility", integration:"Spotify / Apple Podcasts", eventType:"live episode", deliverable:"year in listening" },
    { name:"Framehaus", desc:"An indie film streaming service curated by filmmakers and critics", audience:"Cinephiles aged 25-55 who prefer arthouse and independent cinema", items:"watchlist films", content:"viewing history", action:"add to watchlist", tool:"mood-based recommender", asset:"watchlist", team:"film club members", export:"viewing stats", unit:"$12/month subscription", collab:"watch party members", platform:"browse catalog", upload:"review", search:"films, directors, or genres", notifActor:"curator", achievement:"films watched milestone", premium:"filmmaker commentary tracks", setting1:"New release notifications", setting2:"Viewing history visibility", integration:"Chromecast / Apple TV", eventType:"virtual screening", deliverable:"monthly film digest" },
  ],
  auto: [
    { name:"Voltwise", desc:"A smart EV charging management app for electric vehicle owners", audience:"EV owners aged 28-55 who want to optimize charging costs", items:"charging sessions", content:"charging data", action:"start charge", tool:"charge scheduler", asset:"vehicle battery status", team:"household members", export:"charging report", unit:"45kWh charge session", collab:"family drivers", platform:"charging dashboard", upload:"electricity bill", search:"chargers or routes", notifActor:"vehicle system", achievement:"kWh milestone", premium:"smart grid optimization", setting1:"Charge complete notifications", setting2:"Location sharing with household", integration:"Tesla / ChargePoint / home energy", eventType:"scheduled charge", deliverable:"monthly charging summary" },
    { name:"Garagen", desc:"A connected car maintenance platform that predicts issues before they happen", audience:"Car owners 25-60 who want to stay ahead of maintenance", items:"service records", content:"vehicle diagnostics", action:"book service", tool:"diagnostic scanner", asset:"vehicle health score", team:"trusted mechanics", export:"maintenance log", unit:"scheduled service", collab:"co-owners", platform:"vehicle dashboard", upload:"service receipt", search:"mechanics or parts", notifActor:"maintenance AI", achievement:"mileage milestone", premium:"predictive diagnostics", setting1:"Maintenance due alerts", setting2:"Diagnostic data sharing with mechanic", integration:"OBD-II scanner / dealer portal", eventType:"service appointment", deliverable:"annual vehicle health report" },
  ],
  realestate: [
    { name:"Nestkey", desc:"A first-time homebuyer platform that guides users from pre-approval to closing", audience:"First-time buyers aged 26-38 overwhelmed by the process", items:"properties", content:"saved homes", action:"schedule tour", tool:"mortgage calculator", asset:"home search", team:"buyer's agent", export:"comparison report", unit:"$385,000 listing", collab:"co-buyer / partner", platform:"home search feed", upload:"pre-approval letter", search:"homes or neighborhoods", notifActor:"agent", achievement:"offer accepted", premium:"off-market listings", setting1:"New listing alerts", setting2:"Search activity visible to agents", integration:"Zillow / lender portal", eventType:"open house", deliverable:"property comparison PDF" },
    { name:"Tenantli", desc:"A rental management app for landlords with 1-10 properties", audience:"Independent landlords aged 30-60 managing properties on the side", items:"properties", content:"tenant records", action:"collect rent", tool:"lease generator", asset:"property portfolio", team:"tenants", export:"income report", unit:"$1,800/mo rent collection", collab:"co-owners / property managers", platform:"property dashboard", upload:"lease document", search:"tenants or properties", notifActor:"tenant", achievement:"on-time payment streak", premium:"tenant screening", setting1:"Rent due reminders", setting2:"Maintenance request notifications", integration:"bank account / Venmo", eventType:"lease renewal", deliverable:"annual income summary" },
  ],
  food: [
    { name:"Bento", desc:"A healthy meal prep delivery service with weekly rotating menus", audience:"Busy professionals 25-40 who want to eat healthy without cooking", items:"meals", content:"order history", action:"place order", tool:"meal customizer", asset:"weekly menu", team:"chefs", export:"nutrition summary", unit:"$65 weekly meal plan", collab:"household members sharing a plan", platform:"menu browser", upload:"allergy info", search:"meals or dietary preferences", notifActor:"delivery driver", achievement:"weeks subscribed milestone", premium:"custom macro targets", setting1:"Delivery window notifications", setting2:"Dietary preference sharing with chefs", integration:"Apple Pay / Google Maps", eventType:"delivery", deliverable:"weekly nutrition report" },
    { name:"Forked", desc:"A local restaurant discovery app with real-time wait times and ordering", audience:"Urban foodies aged 21-40 who eat out 3+ times per week", items:"restaurants", content:"dining history", action:"join waitlist", tool:"menu browser", asset:"saved restaurants", team:"dining companions", export:"dining summary", unit:"$45 dinner for two", collab:"group order members", platform:"restaurant feed", upload:"food photo", search:"restaurants, cuisines, or dishes", notifActor:"restaurant", achievement:"restaurants visited milestone", premium:"priority seating", setting1:"Wait time alerts", setting2:"Dining history visibility to friends", integration:"Google Maps / OpenTable", eventType:"reservation", deliverable:"monthly dining recap" },
  ],
  gaming: [
    { name:"Questline", desc:"A social gaming platform for organizing multiplayer sessions and tournaments", audience:"Gamers aged 16-35 who play with friends regularly", items:"game sessions", content:"match history", action:"host session", tool:"matchmaker", asset:"player profile", team:"squad members", export:"stats export", unit:"tournament entry", collab:"team roster", platform:"session lobby", upload:"highlight clip", search:"games, players, or teams", notifActor:"squad member", achievement:"wins milestone", premium:"tournament hosting", setting1:"Session invite notifications", setting2:"Online status visibility", integration:"Discord / Steam / Xbox Live", eventType:"tournament", deliverable:"match summary" },
    { name:"Lootbox", desc:"A digital game marketplace with trades, reviews, and wishlists", audience:"Budget-conscious gamers aged 18-30 hunting for deals", items:"games", content:"game library", action:"purchase game", tool:"deal finder", asset:"wishlist", team:"friends", export:"purchase history", unit:"$29.99 game purchase", collab:"gift recipients", platform:"store front", upload:"review screenshot", search:"games, genres, or publishers", notifActor:"store", achievement:"games collected milestone", premium:"early access deals", setting1:"Wishlist price drop alerts", setting2:"Library visibility to friends", integration:"Steam / Epic / payment methods", eventType:"flash sale", deliverable:"yearly gaming recap" },
  ],
  hr: [
    { name:"Hirely", desc:"An AI-powered applicant tracking system for growing startups", audience:"Hiring managers and recruiters at companies with 20-200 employees", items:"candidates", content:"hiring pipeline", action:"advance candidate", tool:"interview scheduler", asset:"job posting", team:"hiring panel", export:"hiring report", unit:"engineering role", collab:"interviewers", platform:"candidate pipeline", upload:"resume", search:"candidates or roles", notifActor:"candidate", achievement:"hire made milestone", premium:"AI resume screening", setting1:"Application received alerts", setting2:"Candidate data access permissions", integration:"LinkedIn / Calendar / Slack", eventType:"interview", deliverable:"quarterly hiring report" },
    { name:"Culturekit", desc:"An employee engagement platform with pulse surveys, recognition, and feedback", audience:"People ops teams at remote-first companies (50-500 employees)", items:"surveys", content:"engagement data", action:"send pulse survey", tool:"recognition wall", asset:"team health score", team:"employees", export:"engagement report", unit:"quarterly survey cycle", collab:"department leads", platform:"engagement dashboard", upload:"company announcement", search:"surveys, feedback, or employees", notifActor:"manager", achievement:"engagement score improvement", premium:"advanced sentiment analysis", setting1:"Survey reminder frequency", setting2:"Anonymous feedback visibility", integration:"Slack / Teams / HRIS", eventType:"feedback cycle", deliverable:"monthly engagement digest" },
  ],
  legal: [
    { name:"Clausebound", desc:"An AI contract review tool that flags risks and suggests edits", audience:"In-house legal teams at tech companies", items:"contracts", content:"review history", action:"upload contract", tool:"risk analyzer", asset:"contract library", team:"legal team", export:"risk report", unit:"vendor agreement", collab:"outside counsel", platform:"contract dashboard", upload:"PDF contract", search:"contracts, clauses, or parties", notifActor:"AI reviewer", achievement:"contracts reviewed milestone", premium:"custom playbook rules", setting1:"Review completion alerts", setting2:"Contract access permissions", integration:"DocuSign / Google Drive / Salesforce", eventType:"review deadline", deliverable:"monthly risk summary" },
    { name:"Paralegal.ai", desc:"A case management platform for solo practitioners and small law firms", audience:"Solo attorneys and small firms (1-10 lawyers)", items:"cases", content:"case files", action:"file document", tool:"deadline tracker", asset:"case timeline", team:"paralegals", export:"case summary", unit:"civil litigation case", collab:"co-counsel", platform:"case dashboard", upload:"court filing", search:"cases, clients, or deadlines", notifActor:"court system", achievement:"cases resolved milestone", premium:"AI brief drafting", setting1:"Filing deadline alerts", setting2:"Client portal access settings", integration:"court e-filing / calendar", eventType:"hearing", deliverable:"case status report" },
  ],
  devtools: [
    { name:"Shipper", desc:"A deployment platform that makes shipping to production as easy as git push", audience:"Full-stack developers and small engineering teams", items:"deployments", content:"deploy history", action:"deploy to production", tool:"CI/CD pipeline", asset:"production environment", team:"engineering team", export:"build log", unit:"v2.4.1 release", collab:"code reviewers", platform:"deploy dashboard", upload:"config file", search:"deployments, services, or logs", notifActor:"CI bot", achievement:"deploy streak", premium:"canary deployments", setting1:"Build failure alerts", setting2:"Deploy permissions per environment", integration:"GitHub / Slack / AWS", eventType:"release", deliverable:"changelog" },
    { name:"Apidog", desc:"An API design and testing platform with collaborative documentation", audience:"Backend developers and API-first teams", items:"endpoints", content:"API docs", action:"run test suite", tool:"mock server", asset:"API workspace", team:"API consumers", export:"test report", unit:"API v3 release", collab:"doc contributors", platform:"API workspace", upload:"OpenAPI spec", search:"endpoints, schemas, or errors", notifActor:"test runner", achievement:"API uptime milestone", premium:"load testing", setting1:"Test failure notifications", setting2:"Workspace visibility (public/private)", integration:"GitHub / Postman / Swagger", eventType:"breaking change", deliverable:"API health report" },
  ],
  nonprofit: [
    { name:"Pledgewise", desc:"A fundraising platform that makes recurring donations transparent and engaging", audience:"Donors aged 25-55 who want to see the impact of their giving", items:"donations", content:"giving history", action:"make donation", tool:"impact tracker", asset:"giving portfolio", team:"cause partners", export:"tax receipt", unit:"$50 monthly donation", collab:"matching donors", platform:"impact dashboard", upload:"event flyer", search:"causes, campaigns, or organizations", notifActor:"nonprofit partner", achievement:"giving milestone", premium:"donor matching", setting1:"Campaign update notifications", setting2:"Giving history visibility to causes", integration:"bank / PayPal / Stripe", eventType:"fundraising campaign", deliverable:"annual giving summary" },
    { name:"Volunto", desc:"A volunteer matching platform connecting people with local opportunities", audience:"Community-minded individuals aged 18-65 looking to help locally", items:"opportunities", content:"volunteer history", action:"sign up to volunteer", tool:"skills matcher", asset:"volunteer profile", team:"organizations", export:"hours report", unit:"4-hour volunteer shift", collab:"volunteer team", platform:"opportunity feed", upload:"background check", search:"opportunities, causes, or organizations", notifActor:"organizer", achievement:"hours volunteered milestone", premium:"verified volunteer badge", setting1:"New opportunity alerts", setting2:"Profile visibility to organizations", integration:"Google Maps / Calendar", eventType:"volunteer shift", deliverable:"impact report" },
  ],
  petcare: [
    { name:"Pawprint", desc:"An all-in-one pet health app with vet records, reminders, and telehealth", audience:"Pet owners aged 25-45 who treat their pets like family", items:"health records", content:"pet health data", action:"book vet visit", tool:"symptom checker", asset:"pet profile", team:"veterinary team", export:"vaccination record", unit:"annual checkup", collab:"family members with pet access", platform:"pet health dashboard", upload:"vet document", search:"symptoms, vets, or medications", notifActor:"veterinarian", achievement:"care milestone", premium:"24/7 vet telehealth", setting1:"Medication reminders", setting2:"Health record sharing with vet", integration:"vet clinic system / calendar", eventType:"vet appointment", deliverable:"annual health summary" },
    { name:"Fetchly", desc:"A premium pet food subscription with customized nutrition plans", audience:"Dog owners aged 28-50 who care about pet nutrition", items:"meal plans", content:"nutrition data", action:"customize plan", tool:"nutrition calculator", asset:"subscription", team:"pet nutritionists", export:"feeding guide", unit:"$75/month food plan", collab:"household feeders", platform:"nutrition dashboard", upload:"pet weight photo", search:"ingredients or recipes", notifActor:"nutritionist", achievement:"months subscribed", premium:"1-on-1 nutritionist consults", setting1:"Delivery reminders", setting2:"Weight tracking sharing with vet", integration:"Chewy / auto-ship / scale", eventType:"delivery", deliverable:"monthly nutrition report" },
  ],
  dating: [
    { name:"Kinship", desc:"A dating app focused on deep compatibility through shared values and life goals", audience:"Relationship-seeking adults aged 25-40 tired of swipe culture", items:"matches", content:"conversation history", action:"send message", tool:"compatibility quiz", asset:"dating profile", team:"matches", export:"data archive", unit:"premium subscription", collab:"mutual connections", platform:"discovery feed", upload:"profile photos", search:"people or shared interests", notifActor:"match", achievement:"meaningful connections milestone", premium:"unlimited messaging", setting1:"Match notification preferences", setting2:"Profile visibility settings", integration:"Instagram / Spotify", eventType:"video date", deliverable:"compatibility report" },
    { name:"Plus One", desc:"A social events app for singles that organizes group activities and meetups", audience:"Socially active singles aged 23-38 in major cities", items:"events", content:"event history", action:"RSVP to event", tool:"group matcher", asset:"event calendar", team:"event organizers", export:"social profile", unit:"$15 event ticket", collab:"event group", platform:"events feed", upload:"event photo", search:"events, activities, or neighborhoods", notifActor:"organizer", achievement:"events attended milestone", premium:"VIP event access", setting1:"New event alerts by neighborhood", setting2:"Attendance history visibility", integration:"Calendar / Maps / Eventbrite", eventType:"mixer event", deliverable:"social recap" },
  ],
  crypto: [
    { name:"Vaultchain", desc:"A beginner-friendly crypto wallet with built-in education", audience:"Crypto-curious adults aged 22-40 making their first purchase", items:"assets", content:"transaction history", action:"buy crypto", tool:"portfolio tracker", asset:"wallet balance", team:"community", export:"tax report", unit:"0.05 BTC purchase", collab:"multi-sig approvers", platform:"portfolio dashboard", upload:"ID verification", search:"tokens or protocols", notifActor:"market alert system", achievement:"portfolio milestone", premium:"advanced charting", setting1:"Price movement alerts", setting2:"Transaction confirmation requirements", integration:"MetaMask / Ledger / bank", eventType:"governance vote", deliverable:"portfolio summary" },
    { name:"Yieldra", desc:"A DeFi aggregator that finds the best yield farming opportunities", audience:"Experienced crypto users aged 25-45 managing DeFi positions", items:"positions", content:"yield history", action:"stake tokens", tool:"yield optimizer", asset:"staked positions", team:"DAO members", export:"yield report", unit:"$5,000 staking position", collab:"vault co-depositors", platform:"yield dashboard", upload:"wallet import", search:"protocols, pools, or APYs", notifActor:"protocol", achievement:"yield earned milestone", premium:"auto-compounding", setting1:"APY change alerts", setting2:"Position visibility in community", integration:"MetaMask / WalletConnect", eventType:"harvest", deliverable:"monthly yield report" },
  ],
  insurance: [
    { name:"Coverly", desc:"A modern renters and homeowners insurance platform with instant quotes", audience:"Renters and first-time homeowners aged 24-40", items:"policies", content:"coverage details", action:"file claim", tool:"coverage calculator", asset:"active policy", team:"claims team", export:"coverage summary", unit:"$120/month premium", collab:"co-policyholders", platform:"policy dashboard", upload:"damage photos", search:"coverage options or claims", notifActor:"claims adjuster", achievement:"claim-free years", premium:"umbrella coverage", setting1:"Payment due reminders", setting2:"Claims status notifications", integration:"bank / landlord portal", eventType:"policy renewal", deliverable:"annual coverage review" },
    { name:"Safeguard", desc:"A small business insurance platform that bundles coverage by industry", audience:"Small business owners (1-50 employees) who find insurance confusing", items:"coverage bundles", content:"claims history", action:"get quote", tool:"risk assessor", asset:"insurance bundle", team:"insurance advisors", export:"certificate of insurance", unit:"$340/month business bundle", collab:"business partners", platform:"coverage dashboard", upload:"business documents", search:"coverage types or industries", notifActor:"advisor", achievement:"years covered milestone", premium:"dedicated advisor", setting1:"Renewal reminders", setting2:"Certificate sharing with clients", integration:"accounting software / payroll", eventType:"policy audit", deliverable:"quarterly risk review" },
  ],
};

// ═══════════════ CONTEXT TEMPLATES PER SCREEN TYPE ═══════════════
// Each template is a function that takes a niche vocab and returns a context
const CTX_TEMPLATES = {
  error_system: [
    v => ({ feature: "server timeout", page: v.platform, detail: `User was mid-action on ${v.platform} when the server timed out after 30 seconds. Their work from the last 5 minutes may not have saved. They were in a flow state.`, visible: `${v.platform} with frozen UI, unsaved indicator, last action partially completed` }),
    v => ({ feature: "sync failure", page: v.platform, detail: `User's ${v.content} stopped syncing 10 minutes ago. They've been making edits offline without realizing. 3 other ${v.collab} are editing the same item.`, visible: `${v.platform} with 'Offline' badge, last sync: 10m ago, conflict warning` }),
    v => ({ feature: "payment processing", page: "checkout", detail: `User's payment was charged but the order confirmation failed. Money left their account. They don't know if their ${v.unit} went through.`, visible: `Checkout screen frozen, spinner stuck, bank notification showing charge` }),
    v => ({ feature: v.integration, page: "integrations settings", detail: `User connected ${v.integration} but the authentication exchange failed. The connection shows as 'pending.' They need this working for a demo in 2 hours.`, visible: `${v.integration} tile with spinner, status: connecting, error code visible` }),
    v => ({ feature: "data export", page: "export screen", detail: `User requested a large ${v.export} (2GB+) that failed mid-generation at 73%. The partial file is corrupted. They need this report for a meeting tomorrow.`, visible: `Progress bar stuck at 73%, 'Export Failed' status, file size shown` }),
    v => ({ feature: "image upload", page: v.platform, detail: `User uploaded ${v.upload} that appeared to succeed, but the processing pipeline crashed. The file shows as 'processing' with no progress for 5 minutes.`, visible: `Upload area showing processing spinner, file name visible, no progress` }),
    v => ({ feature: "search index", page: "search results", detail: `The search system is temporarily down. User searched for ${v.items} and got a system error instead of results. They can't access ${v.search} at all.`, visible: `Search bar with query, error where results should be, empty list` }),
    v => ({ feature: "notification system", page: v.platform, detail: `Push notifications stopped working silently. User missed 3 critical ${v.notifActor} alerts over the past hour. The system just detected the failure.`, visible: `${v.platform} banner showing notification backlog, 3 missed alerts` }),
    v => ({ feature: "auto-save", page: v.platform, detail: `Auto-save has been failing silently for the last 20 minutes. User has extensive unsaved changes to their ${v.content}. The system just detected the issue.`, visible: `${v.platform} with red 'Not saved' indicator, last save: 20m ago` }),
    v => ({ feature: "API rate limit", page: v.platform, detail: `The app hit an internal API rate limit during a bulk operation on ${v.items}. 847 of 1,200 items were processed before it failed. The rest are stuck.`, visible: `Bulk operation progress: 847/1200, error status, partial completion` }),
    v => ({ feature: "database migration", page: v.platform, detail: `A scheduled database migration caused temporary read errors. Users can see their ${v.platform} but some ${v.items} show stale data from 6 hours ago.`, visible: `${v.platform} with stale data warning, some items showing old timestamps` }),
    v => ({ feature: "third-party service", page: v.platform, detail: `A third-party service the app depends on (${v.integration}) is experiencing an outage. Core features work but ${v.premium} is unavailable until it's resolved.`, visible: `${v.platform} with degraded service banner, ${v.premium} grayed out` }),
  ],
  error_user: [
    v => ({ feature: "email validation", page: "account settings", detail: `User tried to update their email but entered an invalid format (missing dot in domain). Form submitted and returned with only the email field highlighted — other fields they filled in are preserved.`, visible: `Email field highlighted red, old email shown as current, other fields intact` }),
    v => ({ feature: "file format", page: "import screen", detail: `User tried to upload a .pages file for ${v.upload}. The system only accepts .pdf, .csv, and .xlsx. They may not know how to convert the file on their device.`, visible: `Drag-and-drop zone with rejected file icon, supported formats listed below` }),
    v => ({ feature: "password creation", page: "registration form", detail: `User chose a 6-character all-lowercase password. Requirements are: 8+ characters, one number, one uppercase. They've already filled in every other field correctly.`, visible: `All fields filled, password field highlighted red, strength meter: Weak` }),
    v => ({ feature: "duplicate entry", page: v.platform, detail: `User is creating a ${v.items.slice(0,-1)} with the same name as an existing one created 2 months ago. The existing one might be theirs — they just forgot about it.`, visible: `Creation form, duplicate name highlighted, existing entry shown with date` }),
    v => ({ feature: "character limit", page: v.platform, detail: `User wrote a description for their ${v.items.slice(0,-1)} that exceeds the 500-character limit by 47 characters. They spent 10 minutes crafting it and don't want to start over.`, visible: `Text field showing 547/500, excess characters highlighted in red, no save button` }),
    v => ({ feature: "date format", page: v.platform, detail: `User entered a date as "13/25/2024" (invalid month/day). The field expected MM/DD/YYYY format. This is for scheduling a ${v.eventType} that others are waiting on.`, visible: `Date picker with red border, format hint below, ${v.eventType} form partially filled` }),
    v => ({ feature: "number range", page: v.platform, detail: `User entered a value of 0 in a field that requires a minimum of 1. They're trying to set the quantity for ${v.items} in a bulk operation affecting 200+ entries.`, visible: `Number field showing 0, minimum requirement note, bulk operation pending` }),
    v => ({ feature: "URL format", page: v.platform, detail: `User pasted a URL without the https:// prefix into a link field. The validator rejects "www.example.com" as invalid. They copied it from their browser's address bar.`, visible: `URL field with red border, pasted value visible, validation message below` }),
    v => ({ feature: "required fields", page: v.platform, detail: `User submitted a form with 3 of 8 required fields empty. They thought optional fields were required and skipped the ones they found confusing. The form scrolled to the top on error.`, visible: `Form with 3 highlighted empty fields, scroll position at top, submit button disabled` }),
    v => ({ feature: "image dimensions", page: v.platform, detail: `User uploaded a profile image that's 50x50px. Minimum required is 400x400px. The image looks pixelated in the preview and they might not have a larger version.`, visible: `Image preview showing pixelated thumbnail, dimension requirements listed, upload button` }),
    v => ({ feature: "special characters", page: v.platform, detail: `User tried to name their ${v.items.slice(0,-1)} with emojis and special characters (e.g., "🚀 My Project!"). The system only allows alphanumeric characters, hyphens, and underscores.`, visible: `Name field with invalid characters highlighted, allowed characters listed below` }),
    v => ({ feature: "conflicting inputs", page: v.platform, detail: `User set a start date that's after the end date for their ${v.eventType}. Both fields look valid individually but conflict with each other. They need to fix one without losing the other.`, visible: `Two date fields both filled, conflict indicator between them, neither highlighted as wrong` }),
  ],
  error_perm: [
    v => ({ feature: "admin panel", page: "team management", detail: `A team member (role: Editor) tried to remove another member from the ${v.team}. Only Admins and Owners can manage membership. The editor has been on the team for 8 months.`, visible: `${v.platform} with grayed-out remove buttons, role badge: Editor, 12 team members listed` }),
    v => ({ feature: v.premium, page: v.platform, detail: `A free-tier user tried to use ${v.premium} after seeing it mentioned in an onboarding tooltip. They can see the feature button but clicking it leads here. They've been a free user for 3 months.`, visible: `${v.platform} with lock icon on ${v.premium}, account type: Free, upgrade path needed` }),
    v => ({ feature: "restricted content", page: v.platform, detail: `User tried to open ${v.content} that they were removed from 2 days ago after a team restructure. They still have the direct link bookmarked and reference it daily.`, visible: `Item title visible with lock icon, empty content area, 'Access removed 2d ago'` }),
    v => ({ feature: "billing access", page: "billing settings", detail: `A team member (not billing admin) needs to download an invoice for their expense report due today. Billing info is restricted to the account owner who is on vacation.`, visible: `Billing page with blurred details, role badge: Team Member, owner status: Away` }),
    v => ({ feature: "API key access", page: "developer settings", detail: `A developer on the team needs to view the production API key to debug a critical issue. API keys are restricted to the ${v.team} lead. The lead is in a different timezone and offline.`, visible: `API keys page, production key: hidden, role: Developer, key admin: offline` }),
    v => ({ feature: "delete action", page: v.platform, detail: `User tried to delete a ${v.items.slice(0,-1)} they created but it's been shared with 5 ${v.collab}. Only the workspace owner can delete shared items. The user wants to clean up their space.`, visible: `${v.items.slice(0,-1)} detail page, delete button grayed, shared with 5 people badge` }),
    v => ({ feature: "export restriction", page: v.platform, detail: `User needs to export ${v.content} for an external audit but their role (Viewer) doesn't allow exports. The data owner set this restriction intentionally for compliance.`, visible: `${v.content} visible but export button disabled, role: Viewer, compliance badge` }),
    v => ({ feature: "workspace creation", page: v.platform, detail: `User tried to create a new workspace but their organization limits workspace creation to Admins. They need a dedicated space for a new project starting next week.`, visible: `'New Workspace' button disabled, org policy notice, role: Member` }),
    v => ({ feature: "settings modification", page: "workspace settings", detail: `User wants to change the ${v.setting1} configuration but only workspace owners can modify settings. The current setting is causing notification fatigue for the whole team.`, visible: `Settings page with locked toggles, role: Member, owner name shown` }),
    v => ({ feature: "publish action", page: v.platform, detail: `User finished creating ${v.content} and hit Publish, but their role requires approval from an Admin before anything goes live. No admins are currently online.`, visible: `Publish button replaced with 'Submit for Review', 0 admins online indicator` }),
    v => ({ feature: "invite members", page: "team settings", detail: `User wants to invite a freelance ${v.collab} to the workspace but invitations require Admin approval. The project deadline is in 3 days and they need help now.`, visible: `Invite form visible, 'Requires admin approval' note, pending invites: 0` }),
    v => ({ feature: "archive access", page: v.platform, detail: `User is looking for ${v.items} that were archived last quarter. Archived content is only accessible to Admins and the original creator — this user is neither.`, visible: `Archive section locked, 47 archived ${v.items} count visible, role: Member` }),
  ],
  empty_first: [
    v => ({ feature: v.items, page: v.platform, detail: `User just landed on their ${v.items} section for the first time. It's completely empty. They signed up 3 minutes ago and this is the first screen after onboarding.`, visible: `Empty area with dotted outline, sidebar showing navigation, account age: 3 minutes` }),
    v => ({ feature: v.content, page: v.platform, detail: `User just enabled the ${v.content} feature from settings. The section is blank but other parts of their ${v.platform} already have 2 weeks of activity.`, visible: `Blank ${v.content} area, navigation showing activity dots on other sections` }),
    v => ({ feature: "saved items", page: "favorites / saved", detail: `User opened their saved ${v.items} tab for the first time. They've been actively browsing for 20 minutes and viewed 15 ${v.items} but haven't saved anything yet.`, visible: `Empty list with faint bookmark icon, count: 0 saved, browse history: 15 viewed` }),
    v => ({ feature: "activity feed", page: "home / dashboard", detail: `Brand new user sees the activity feed on ${v.platform} — it's the main screen they'll see every time they open the app. It's empty because they haven't done anything yet.`, visible: `Blank feed area, full navigation visible, default profile avatar, 0 activity` }),
    v => ({ feature: "team space", page: v.platform, detail: `User created a new shared workspace and invited 6 ${v.collab}, but no one has joined or contributed yet. The workspace was created 2 minutes ago.`, visible: `Empty workspace, 6 pending invite badges, 'Created 2m ago' label` }),
    v => ({ feature: v.tool, page: v.platform, detail: `User navigated to the ${v.tool} feature for the first time. It requires at least 3 ${v.items} to generate insights, but the user has zero. The feature looks powerful but empty.`, visible: `${v.tool} dashboard with empty charts, '0 ${v.items}' indicator, setup prompt area` }),
    v => ({ feature: "inbox", page: "messages / notifications", detail: `User opened their inbox for the first time. No one has messaged them yet because they haven't interacted with any ${v.collab}. The inbox is the first tab in navigation.`, visible: `Empty inbox with envelope icon, 0 messages, tabs: All / Unread / Mentions` }),
    v => ({ feature: v.deliverable, page: v.platform, detail: `User clicked on the ${v.deliverable} section expecting to see data, but reports require at least 7 days of activity. They signed up yesterday. The section feels broken even though it's working correctly.`, visible: `Empty ${v.deliverable} area, 'Insufficient data' state, account age: 1 day` }),
    v => ({ feature: "templates", page: v.platform, detail: `User opened the templates gallery to kickstart their first ${v.items.slice(0,-1)}. The 'My Templates' tab is empty but a 'Community Templates' tab has 200+ options they haven't discovered.`, visible: `Two tabs: My Templates (0) and Community (200+), empty state on My Templates` }),
    v => ({ feature: "integrations", page: "integrations page", detail: `User opened the integrations page. Nothing is connected yet. They use ${v.integration} daily and connecting it would save them 2 hours/week, but they don't know that.`, visible: `Grid of available integrations, all showing 'Connect' buttons, 0 active` }),
    v => ({ feature: "project list", page: v.platform, detail: `User's main ${v.platform} is empty. They came from a competitor and expected an import option. They have 50+ ${v.items} to migrate and don't want to recreate them manually.`, visible: `Empty project list, create button prominent, no import option visible` }),
    v => ({ feature: "calendar view", page: v.platform, detail: `User switched to calendar view of their ${v.items}. It's empty because none of their ${v.items} have dates assigned. The calendar looks broken but it's just reflecting missing data.`, visible: `Empty calendar grid, month navigation, 0 events, list view has 12 ${v.items}` }),
  ],
  empty_search: [
    v => ({ feature: "search", page: "search results", detail: `User searched for a very specific ${v.items.slice(0,-1)} using 3 filters simultaneously. Zero exact matches, but 8 results exist if they remove just one filter. They don't know which filter is too narrow.`, visible: `Search bar with query, 3 active filter chips, empty results, '8 results without [filter]' hint possible` }),
    v => ({ feature: "people search", page: "team directory", detail: `User searched for a colleague by name who was invited 3 days ago but hasn't accepted yet. The person exists in the system as a pending invite, just not as an active member.`, visible: `Search bar with name, 0 active results, 'Pending invites' section in sidebar` }),
    v => ({ feature: "content search", page: v.platform, detail: `User searched for ${v.content} they personally created last month, but it was moved to a different workspace by an admin during a reorganization. The user wasn't notified.`, visible: `Search query shown, 0 results in current workspace, workspace switcher in header` }),
    v => ({ feature: "filtered view", page: v.platform, detail: `User applied 4 filters to their ${v.items} list that together match nothing. Each individual filter has results, but the combination is too narrow. They've been refining for 5 minutes.`, visible: `Filter bar with 4 active chips, empty results, total count: 0 (was 340 unfiltered)` }),
    v => ({ feature: "typo search", page: v.platform, detail: `User searched for "${v.items.slice(0,-1)}" but misspelled it by 2 characters. 45 results exist for the correct spelling. The search engine doesn't have fuzzy matching.`, visible: `Search bar with misspelled query, 0 results, no 'Did you mean?' suggestion` }),
    v => ({ feature: "date range search", page: v.platform, detail: `User filtered ${v.items} by a date range (last 7 days) but all recent activity happened 8-14 days ago. The date picker doesn't show how many results each range would return.`, visible: `Date filter: 'Last 7 days' selected, 0 results, no range preview counts` }),
    v => ({ feature: "tag search", page: v.platform, detail: `User is searching by a tag they remember applying to several ${v.items}, but the tag was renamed by an admin last week. The old tag name returns nothing.`, visible: `Tag filter with old name selected, 0 results, tag list showing new names` }),
    v => ({ feature: "archived search", page: v.platform, detail: `User is looking for ${v.items} they know exist but were auto-archived after 90 days of inactivity. The default search only covers active items.`, visible: `Search results: 0 active, toggle for 'Include archived' unchecked` }),
    v => ({ feature: "cross-workspace search", page: v.platform, detail: `User searched for ${v.content} that exists in a different workspace. Search is scoped to the current workspace only. They have 3 workspaces and don't remember which one has it.`, visible: `Search scoped to 'Current Workspace', 0 results, workspace count: 3` }),
    v => ({ feature: "category filter", page: v.platform, detail: `User selected a category that has been empty since the last data migration. 200+ ${v.items} exist in other categories. The empty category should probably be hidden or merged.`, visible: `Category sidebar with selected empty category, other categories showing counts` }),
    v => ({ feature: "status filter", page: v.platform, detail: `User filtered for 'Completed' ${v.items} but their team uses 'Done' as the final status instead. The status names are similar enough to cause confusion.`, visible: `Status filter: 'Completed' selected, 0 results, 'Done' status has 34 items` }),
    v => ({ feature: "location search", page: v.platform, detail: `User searched for ${v.items} near their location, but their location services are turned off. The app can't filter by proximity without GPS access.`, visible: `Location search active, 0 nearby results, location: Unknown, permission prompt` }),
  ],
  onboard_welcome: [
    v => ({ feature: "app first launch", page: "welcome screen", detail: `User just downloaded the app after seeing an ad on social media. They know the product name but not exactly what it does. They have 3 similar apps installed and will delete this one if it doesn't click in 30 seconds.`, visible: `Full screen, app logo centered, clean background, no navigation yet` }),
    v => ({ feature: "post-signup", page: "first screen after signup", detail: `User just completed email verification. They signed up because a ${v.collab} shared a link. They're expecting to see what was shared but land on a generic welcome instead.`, visible: `Welcome screen, user's name shown, shared item not visible yet` }),
    v => ({ feature: "platform switch", page: "welcome screen", detail: `User is migrating from a competitor. They have 3 years of data elsewhere and chose this product because of ${v.premium}. They want to feel confident they made the right switch.`, visible: `Welcome screen, import data option, feature comparison not visible` }),
    v => ({ feature: "team invite join", page: "welcome screen", detail: `User was invited by their ${v.team} lead to join the workspace. They didn't choose this product — it was chosen for them. They need to understand why they're here and what they're supposed to do.`, visible: `Welcome screen with ${v.team} name, inviter's name, team already active` }),
    v => ({ feature: "trial start", page: "trial welcome", detail: `User just started a 14-day free trial of the premium plan. They want to evaluate ${v.premium} specifically before the trial ends. They're comparing 2 other products this week.`, visible: `Welcome screen, '14 days remaining' badge, premium features listed` }),
    v => ({ feature: "re-signup", page: "welcome back", detail: `User deleted their account 6 months ago and just re-signed up. They're back because the product added features they originally left for. Their old data is gone.`, visible: `Fresh account, no data, returning user detected (same email)` }),
    v => ({ feature: "referral signup", page: "welcome screen", detail: `User signed up through a referral link that promises a specific benefit (e.g., extended trial, bonus ${v.items}). They expect to see that benefit immediately.`, visible: `Welcome screen, referral badge, bonus not yet applied visibly` }),
    v => ({ feature: "mobile first launch", page: "mobile welcome", detail: `User already uses the desktop version daily and just downloaded the mobile app. They don't need onboarding on product features — they need to know what's different about mobile.`, visible: `Mobile welcome screen, account already connected, desktop data synced` }),
    v => ({ feature: "enterprise onboard", page: "welcome screen", detail: `User is joining as part of a 500-person company rollout. IT set up their account. They have no idea what this product does but they're required to use it starting Monday.`, visible: `Welcome screen with company logo, pre-configured workspace, admin note` }),
    v => ({ feature: "waitlist conversion", page: "welcome screen", detail: `User was on the waitlist for 3 months and just got access. They were excited when they signed up but may have forgotten why. They need to be re-sold on the value.`, visible: `Welcome screen, 'You're in!' messaging, waitlist position: cleared` }),
    v => ({ feature: "free tier start", page: "welcome screen", detail: `User chose the free plan after seeing pricing. They're cost-conscious and want to get maximum value before considering an upgrade. They need to know exactly what's included.`, visible: `Welcome screen, plan: Free, feature limits visible, upgrade prompt subtle` }),
    v => ({ feature: "creator account", page: "welcome screen", detail: `User signed up as a creator/seller on the platform. They need to set up their presence, add ${v.content}, and understand how to reach their ${v.team}. Monetization is their primary goal.`, visible: `Creator welcome screen, setup checklist, audience size: 0, earnings: $0` }),
  ],
  onboard_step: [
    v => ({ feature: "profile setup", page: "step 2 of 4", detail: `User is on step 2: adding a profile photo and bio. Step 1 (name/email) is done. They're impatient — they want to see ${v.platform} but this step helps ${v.collab} find and trust them.`, visible: `Progress: step 2/4, photo upload area, bio field, skip option` }),
    v => ({ feature: "preferences", page: "step 3 of 4", detail: `User is selecting their interests to customize their ${v.platform} feed. There are 24 options in 6 categories. They need to pick at least 3 but the categories feel overwhelming.`, visible: `Progress: step 3/4, 24 interest tiles in grid, 0 selected, minimum: 3` }),
    v => ({ feature: "team creation", page: "step 2 of 3", detail: `User needs to name their ${v.team} and invite the first member. They can do this later but teams with 2+ people in the first week retain 3x better. They might not have email addresses handy.`, visible: `Progress: step 2/3, team name field, email invite field, 'Invite later' link` }),
    v => ({ feature: "integration connect", page: "step 3 of 3", detail: `Final onboarding step: connecting ${v.integration}. This is optional but dramatically improves the experience. 70% of power users have it connected. The OAuth popup can feel scary.`, visible: `Progress: step 3/3, ${v.integration} logo, 'Connect' button, permissions preview` }),
    v => ({ feature: "goal setting", page: "step 2 of 3", detail: `User is choosing their primary goal for using the product. Options: personal use, team collaboration, client work, or learning. This determines their default ${v.platform} layout.`, visible: `Progress: step 2/3, 4 goal cards with icons, none selected yet` }),
    v => ({ feature: "data import", page: "step 2 of 4", detail: `User can import existing ${v.items} from ${v.integration} or start fresh. They have 3 years of data but importing might take 5 minutes and they're not sure if it'll work correctly.`, visible: `Progress: step 2/4, import option with ${v.integration} logo, 'Start fresh' alternative` }),
    v => ({ feature: "notification setup", page: "step 4 of 4", detail: `Last step: choosing notification preferences. Users who enable ${v.notifActor} alerts are 2x more likely to engage in the first week, but many users find notification prompts annoying.`, visible: `Progress: step 4/4, notification channel toggles, preview of each type` }),
    v => ({ feature: "workspace customize", page: "step 3 of 4", detail: `User is personalizing their workspace: choosing a color theme, layout preference (list vs. grid), and whether to show the ${v.tool} sidebar by default.`, visible: `Progress: step 3/4, color swatches, layout toggle, sidebar preview` }),
    v => ({ feature: "role selection", page: "step 1 of 3", detail: `User must select their role: Creator, Collaborator, or Viewer. This determines their permissions and default features. The distinction isn't obvious and choosing wrong creates friction later.`, visible: `Progress: step 1/3, 3 role cards with descriptions, none selected` }),
    v => ({ feature: "tutorial offer", page: "step 3 of 3", detail: `Final step offers an interactive tutorial (2 minutes) or a quick-start guide (PDF). 65% of users who do the tutorial complete their first ${v.items.slice(0,-1)} within an hour. But many just want to explore.`, visible: `Progress: step 3/3, tutorial option with preview, quick-start PDF, 'Skip and explore'` }),
    v => ({ feature: "use case selection", page: "step 2 of 4", detail: `User selects their industry or use case from 12 options. This pre-loads relevant templates for ${v.items}. Choosing 'Other' gives a blank slate. They're not sure which fits best.`, visible: `Progress: step 2/4, 12 industry/use case tiles, search bar, 'Other' option` }),
    v => ({ feature: "first action prompt", page: "step 4 of 4", detail: `User is prompted to complete their very first action: creating a ${v.items.slice(0,-1)}. A pre-filled template is offered or they can start blank. This step has a 40% drop-off rate.`, visible: `Progress: step 4/4, template preview, blank option, 'I'll do this later' link` }),
  ],
  loading: [
    v => ({ feature: "dashboard generation", page: v.platform, detail: `User's ${v.platform} is loading their personalized dashboard with ${v.items} data. They have 2,000+ ${v.items} spanning 18 months. First load takes 4-8 seconds depending on volume.`, visible: `${v.platform} skeleton, loading spinner, user's name in header` }),
    v => ({ feature: "report compilation", page: v.deliverable, detail: `User requested their ${v.deliverable} which aggregates data from 6 different sources. Expected time: 10-15 seconds. The report was last generated a week ago.`, visible: `Report generation screen, data source indicators, estimated time` }),
    v => ({ feature: "AI processing", page: v.platform, detail: `User triggered an AI-powered feature (${v.tool}) that's analyzing their ${v.content}. Processing takes 15-30 seconds. The AI output will replace a task that normally takes 2 hours.`, visible: `AI processing indicator, ${v.content} preview behind overlay, progress steps` }),
    v => ({ feature: "file upload processing", page: v.platform, detail: `User uploaded a large ${v.upload} (50MB) that needs server-side processing. Upload finished but parsing and validation take another 8-12 seconds.`, visible: `Upload: complete, processing: in progress, file name and size shown` }),
    v => ({ feature: "search indexing", page: v.platform, detail: `User just imported 500+ ${v.items} and the search index is rebuilding. New items won't appear in search for another 20-30 seconds. They're trying to find a specific imported item.`, visible: `Import complete badge, search indexing progress, item count: 500+` }),
    v => ({ feature: "sync in progress", page: v.platform, detail: `User opened the app after 3 days offline. Syncing 3 days of changes from ${v.collab} — 47 updates across 12 ${v.items}. Sync takes 5-10 seconds.`, visible: `Sync progress indicator, 47 updates pending, last sync: 3 days ago` }),
    v => ({ feature: "first-time setup", page: v.platform, detail: `User's account is being provisioned for the first time. Workspace setup, default templates, and preferences are being configured. This only happens once and takes 6-10 seconds.`, visible: `Setup progress with steps: creating workspace, loading templates, applying preferences` }),
    v => ({ feature: "export generation", page: "export screen", detail: `User's ${v.export} is being generated. It includes 200 pages of ${v.content} with charts and tables. Expected: 12-18 seconds. They need it for a presentation in 30 minutes.`, visible: `Export progress bar, page count increasing, format: PDF, estimated time` }),
    v => ({ feature: "collaboration load", page: v.platform, detail: `User is joining a live collaboration session. Loading the shared ${v.content} state, 4 other ${v.collab} cursors, and real-time sync. Takes 3-5 seconds.`, visible: `Joining session, 4 collaborator avatars loading, shared document preview` }),
    v => ({ feature: "migration progress", page: v.platform, detail: `User initiated a data migration from ${v.integration}. 1,847 ${v.items} being imported. Processing at ~50/second. Estimated: 37 seconds remaining.`, visible: `Migration progress: 423/1847, source: ${v.integration}, speed indicator` }),
    v => ({ feature: "security scan", page: v.platform, detail: `User's account is undergoing a routine security scan after logging in from a new device. All features are locked until the 8-second scan completes. This feels intrusive but protects their data.`, visible: `Security scan progress, device info shown, 'Verifying your identity' status` }),
    v => ({ feature: "payment processing", page: "checkout", detail: `User just submitted payment for ${v.unit}. The payment gateway is processing. Takes 3-8 seconds. They're anxious about whether it'll go through — their card was declined once this month.`, visible: `Payment processing spinner, amount shown, card last 4 digits, 'Do not close' warning` }),
  ],
  confirm_destroy: [
    v => ({ feature: "delete account", page: "account settings", detail: `User wants to permanently delete their account. They have 11 months of data, 45 ${v.items}, and 3 active ${v.collab} who depend on shared resources. Deletion is irreversible after 30 days.`, visible: `Account deletion page, data summary: 45 ${v.items}, 3 ${v.collab}, 11 months, 30-day grace period` }),
    v => ({ feature: "delete shared item", page: v.platform, detail: `User is deleting a ${v.items.slice(0,-1)} that 8 ${v.collab} have contributed to over 4 months. The item has 23 comments and is referenced in 3 other ${v.items}. No export has been made.`, visible: `Delete confirmation, contributors: 8, comments: 23, references: 3, no backup` }),
    v => ({ feature: "revoke access", page: "team settings", detail: `Admin is removing a team member who has 67 ${v.items} assigned to them. Those items will become unassigned. The person is being let go and this can't be discussed openly.`, visible: `Member profile, assigned: 67 ${v.items}, role: Team Member, last active: today` }),
    v => ({ feature: "clear all data", page: "settings", detail: `User wants to clear all ${v.content} and start fresh. They have 2 years of data across 340 ${v.items}. They're frustrated with clutter but this is irreversible.`, visible: `Clear data dialog, total: 340 ${v.items}, 2 years of history, 'This cannot be undone'` }),
    v => ({ feature: "disconnect integration", page: "integrations", detail: `User is disconnecting ${v.integration} which currently syncs 1,200+ ${v.items} bidirectionally. Disconnecting will stop sync but existing data stays. Re-connecting requires re-authentication.`, visible: `${v.integration} status: Connected, synced items: 1,200+, last sync: 5 min ago` }),
    v => ({ feature: "delete workspace", page: "workspace settings", detail: `Owner is deleting an entire workspace containing 89 ${v.items}, 12 members, and 6 months of ${v.content}. All members will lose access immediately. 3 members are currently online.`, visible: `Workspace summary: 89 ${v.items}, 12 members, 3 online now, created 6 months ago` }),
    v => ({ feature: "cancel subscription", page: "billing", detail: `User is canceling mid-billing cycle with 18 days remaining. They've already been charged for this month. They'll lose ${v.premium} immediately, not at end of cycle. Current data exceeds free tier limits.`, visible: `Billing: 18 days remaining, paid, ${v.premium} features list, free tier limits shown` }),
    v => ({ feature: "delete comment thread", page: v.platform, detail: `User is deleting a comment thread with 34 replies from 7 different ${v.collab}. The thread contains a decision that was made based on the discussion. No one else knows they're deleting it.`, visible: `Thread preview: 34 replies, 7 participants, contains decision points, delete button` }),
    v => ({ feature: "remove from favorites", page: v.platform, detail: `User wants to bulk-remove 200+ ${v.items} from their favorites. They favorited too liberally and now the list is useless. There's no way to undo a bulk remove.`, visible: `Favorites: 247 items, bulk select: all, remove action, no undo warning` }),
    v => ({ feature: "reset settings", page: "settings", detail: `User wants to reset all customizations to defaults. They've spent 3 months configuring ${v.platform} but something broke and they can't figure out which setting caused it. Nuclear option.`, visible: `Reset to defaults button, custom settings count: 23, 'All preferences will be lost'` }),
    v => ({ feature: "archive project", page: v.platform, detail: `User is archiving a project that has active dependencies. 3 other ${v.items} reference it and those references will break. The project has 14 open tasks and 2 upcoming ${v.eventType}s.`, visible: `Project summary: 14 open tasks, 2 upcoming events, 3 dependencies, archive button` }),
    v => ({ feature: "unlink accounts", page: "connected accounts", detail: `User is unlinking their SSO login (Google/GitHub). They'll need to create a password they'll remember. If they forget, account recovery is complex. They have 2FA disabled.`, visible: `SSO: Google Connected, 'Unlink' button, no password set, 2FA: disabled` }),
  ],
  confirm_safe: [
    v => ({ feature: "publish content", page: v.platform, detail: `User is about to publish ${v.content} to their ${v.team}. 12 people will see it immediately. The content has been in draft for 2 weeks and was reviewed by 1 ${v.collab}.`, visible: `Publish confirmation, audience: 12, draft age: 2 weeks, 1 review completed` }),
    v => ({ feature: "send invites", page: "team management", detail: `User is about to send ${v.team} invitations to 8 people via email. Each recipient gets a personalized link. 3 of them are external contractors who'll get limited permissions.`, visible: `8 email addresses listed, 5 internal + 3 external badges, send button` }),
    v => ({ feature: "apply changes", page: v.platform, detail: `User is applying a bulk update to 150 ${v.items} at once — changing the status from 'Draft' to 'Active'. This action is reversible but would take significant time to undo manually.`, visible: `Bulk action: 150 ${v.items}, change: Draft → Active, reversible note` }),
    v => ({ feature: "upgrade plan", page: "billing", detail: `User is upgrading from Free to Pro at $29/month. Card will be charged today. They get ${v.premium}, unlimited ${v.items}, and priority support. They can downgrade anytime.`, visible: `Plan comparison, Free → Pro, $29/mo, features unlocked list, card last 4 digits` }),
    v => ({ feature: "schedule event", page: v.platform, detail: `User is confirming a ${v.eventType} scheduled for next Tuesday at 2pm. 14 people are invited. Calendar invites will be sent immediately. The ${v.eventType} can be rescheduled later.`, visible: `${v.eventType} details, date/time, 14 invitees, 'Send calendar invites' action` }),
    v => ({ feature: "merge items", page: v.platform, detail: `User is merging 2 duplicate ${v.items} into one. The merge keeps all data from both but the secondary item's URL will redirect. 5 ${v.collab} reference the secondary item.`, visible: `Primary and secondary ${v.items.slice(0,-1)} previews, data merge summary, redirect note` }),
    v => ({ feature: "share externally", page: v.platform, detail: `User is creating a public share link for ${v.content}. Anyone with the link can view it — no login required. The link doesn't expire unless they revoke it. The content contains internal data.`, visible: `Share dialog, visibility: Public (anyone with link), expiry: never, content preview` }),
    v => ({ feature: "run automation", page: v.platform, detail: `User is about to run a ${v.tool} automation that will process 2,000+ ${v.items}. It will take ~3 minutes. Previous runs had a 99.2% success rate. Failed items can be retried individually.`, visible: `Automation summary: 2,000+ items, estimated: 3 min, success rate: 99.2%` }),
    v => ({ feature: "transfer ownership", page: "workspace settings", detail: `User is transferring workspace ownership to another ${v.team} member. They'll keep their account but lose admin privileges for this workspace. The new owner gets billing control.`, visible: `Transfer dialog, new owner name, permissions change summary, billing transfer note` }),
    v => ({ feature: "enable feature", page: "settings", detail: `User is enabling ${v.premium} for the first time. It changes the default ${v.platform} layout and adds new navigation items. The feature can be disabled later but user-created data within it persists.`, visible: `Feature toggle: OFF → ON, layout change preview, 'Data will persist' note` }),
    v => ({ feature: "submit for review", page: v.platform, detail: `User is submitting their ${v.content} for team review. 3 reviewers will be notified. Average review time is 2 business days. They can't edit while it's under review.`, visible: `Submit dialog, 3 reviewers listed, avg review: 2 days, edit lock warning` }),
    v => ({ feature: "restore backup", page: v.platform, detail: `User is restoring a backup from 5 days ago. This will overwrite current ${v.content} with the older version. Changes from the last 5 days will be moved to a conflict folder.`, visible: `Backup date: 5 days ago, current version preview, conflict resolution note` }),
  ],
  success: [
    v => ({ feature: "first item created", page: v.platform, detail: `User just created their very first ${v.items.slice(0,-1)} on the platform. This is a meaningful milestone — most users who create their first item within 24 hours become long-term users.`, visible: `New ${v.items.slice(0,-1)} live, confetti animation, 'First one!' badge` }),
    v => ({ feature: "team milestone", page: v.platform, detail: `The ${v.team} just completed their 100th ${v.items.slice(0,-1)} together. This is a shared achievement. The user who triggered it should feel proud and share the moment.`, visible: `Milestone badge: 100th item, team members listed, share option` }),
    v => ({ feature: "export complete", page: "export screen", detail: `User's ${v.export} is ready to download. It's 47 pages with charts, data, and commentary. They requested it 20 seconds ago. The file is available for 72 hours.`, visible: `Download ready button, file size, 47 pages, available for 72h` }),
    v => ({ feature: "integration connected", page: "integrations", detail: `User successfully connected ${v.integration}. Initial sync is starting — 340 ${v.items} will be imported over the next 2 minutes. The connection is bidirectional.`, visible: `${v.integration}: Connected ✓, sync starting, 340 items found` }),
    v => ({ feature: "payment confirmed", page: "checkout", detail: `User's payment for ${v.unit} was successful. Receipt is being emailed. Their upgraded features are available immediately. Next billing date is in 30 days.`, visible: `Payment confirmed, amount, receipt sent, features unlocked, next billing date` }),
    v => ({ feature: "goal achieved", page: v.platform, detail: `User hit a personal goal they set 3 months ago (${v.achievement}). This is a significant moment — they should feel celebrated and motivated to set a new goal.`, visible: `Achievement badge, goal details, 3-month journey recap, 'Set new goal' prompt` }),
    v => ({ feature: "invite accepted", page: "team", detail: `A key ${v.collab} just accepted the team invitation. The team is now at 5 members — the minimum for unlocking ${v.premium} team features. They've been waiting for this person.`, visible: `New member joined notification, team: 5/5 for premium unlock, new member avatar` }),
    v => ({ feature: "migration complete", page: v.platform, detail: `Data migration from the user's previous tool is complete. 1,847 ${v.items} imported successfully. 3 items had issues and were placed in a review queue. 99.8% success rate.`, visible: `Migration complete, 1,847 imported, 3 need review, review queue link` }),
    v => ({ feature: "verification complete", page: "account", detail: `User's identity/account verification is complete after a 48-hour review. They now have a verified badge and access to features that require it (${v.premium}).`, visible: `Verified badge, features unlocked list, '48h review complete' note` }),
    v => ({ feature: "collaboration published", page: v.platform, detail: `A shared ${v.content} that 6 ${v.collab} worked on for 2 weeks is now live. Everyone contributed and should feel ownership. The publish was triggered by this user.`, visible: `Published status, 6 contributors listed, 2-week project timeline, share options` }),
    v => ({ feature: "streak milestone", page: v.platform, detail: `User has been active for 30 consecutive days — their longest streak. Daily active users who hit 30 days have a 90% chance of becoming permanent users.`, visible: `30-day streak badge, calendar heatmap, streak history, next milestone: 60 days` }),
    v => ({ feature: "referral reward", page: "referral program", detail: `User's referral link was used — their friend just signed up and completed onboarding. The referrer earned a reward (extended trial, bonus ${v.items}, or credit). 3 total referrals now.`, visible: `Referral accepted, friend's name, reward applied, total referrals: 3` }),
  ],
  permission: [
    v => ({ feature: "location access", page: "pre-permission screen", detail: `User just searched for ${v.items} near them. The app needs GPS to show relevant local results. They've never been asked before. Location permission opt-in rates average 62%.`, visible: `Search query visible, map outline, location pin icon, results: 'Enable location to see nearby'` }),
    v => ({ feature: "push notifications", page: "post-onboarding prompt", detail: `User just completed onboarding successfully. The app wants to enable notifications for ${v.notifActor} updates and ${v.eventType} reminders. Industry opt-in rate: 48%. Asking too aggressively kills trust.`, visible: `Notification previews showing sample ${v.notifActor} alert, ${v.eventType} reminder, toggles` }),
    v => ({ feature: "camera access", page: "feature activation", detail: `User tapped a feature that needs camera access to scan ${v.upload}. They've used the app for 2 weeks without needing the camera. This is a new workflow for them.`, visible: `Camera viewfinder outline, scan icon, feature description, 'Why we need this' link` }),
    v => ({ feature: "contacts access", page: "friend finder", detail: `User opened 'Find Friends' to see who's already on the platform. The app needs contacts to match. 4 of their contacts already use it, but the app can't show that without permission.`, visible: `Friend finder illustration, contacts icon, '4 people you know are here' (blurred)` }),
    v => ({ feature: "microphone access", page: "voice feature", detail: `User activated voice input for the first time. The app needs microphone access for dictation / voice search. They're in a quiet environment and this feature would save them significant typing.`, visible: `Microphone icon, voice input UI, 'Speak to search' prompt, privacy note` }),
    v => ({ feature: "calendar access", page: "scheduling feature", detail: `User is trying to schedule a ${v.eventType} and the app can check their calendar for conflicts. Without calendar access, they'll have to manually check availability.`, visible: `Schedule picker, 'Check your calendar' prompt, time slots shown without conflict data` }),
    v => ({ feature: "photo library", page: "profile setup", detail: `User is setting up their profile and wants to add a photo from their camera roll. The app needs photo library access. They're privacy-conscious and have 10,000+ photos on their device.`, visible: `Profile photo placeholder, 'Choose from library' button, camera option` }),
    v => ({ feature: "biometric auth", page: "security settings", detail: `User is enabling Face ID / fingerprint login for faster access. This is optional but saves entering a password every time. They log in 4-5 times per day.`, visible: `Biometric toggle, 'Use Face ID to log in' description, current: password only` }),
    v => ({ feature: "background refresh", page: "settings", detail: `The app wants permission to refresh data in the background so ${v.items} are up-to-date when the user opens the app. Without it, there's a 3-5 second load every time they open it.`, visible: `Background refresh toggle, explanation of benefit, battery impact note` }),
    v => ({ feature: "health data", page: "integration setup", detail: `A wellness feature wants to read step count and sleep data from the phone's health app. This is for the ${v.tool} feature. Data is processed locally, not sent to servers.`, visible: `Health data types listed, 'Read only' badge, local processing note, ${v.tool} preview` }),
    v => ({ feature: "storage access", page: "file management", detail: `User wants to save ${v.export} files directly to their device storage. The app needs storage write permission. They prefer having local copies as backup.`, visible: `Save to device option, storage permission prompt, file location preview` }),
    v => ({ feature: "bluetooth access", page: "device connection", detail: `User is trying to connect a physical device or accessory via Bluetooth. The pairing process requires Bluetooth permission. The device is in pairing mode and waiting.`, visible: `Bluetooth scan screen, nearby device detected, pairing prompt, timeout: 60s` }),
  ],
  paywall: [
    v => ({ feature: v.premium, page: v.platform, detail: `Free user was mid-workflow and tried to use ${v.premium} — a paid feature. They've been working for 15 minutes and this was their logical next step. They feel blocked and frustrated.`, visible: `${v.platform} with ${v.premium} feature locked, Pro badge, user's work visible behind lock` }),
    v => ({ feature: "export quality", page: "export dialog", detail: `User finished a 2-hour project and wants to export a high-quality ${v.export}. Free tier only allows basic format (watermarked/low-res). They need this for a client presentation tomorrow.`, visible: `Export options: basic (free, watermarked), premium (locked, HD), content preview` }),
    v => ({ feature: "team seats", page: "team settings", detail: `User tried to invite a 6th team member. Free plan allows 5. The new person is a critical hire starting Monday. The team has been at capacity for 2 months.`, visible: `Team list (5/5), invite form with 6th email typed, plan: Free, seat limit reached` }),
    v => ({ feature: "storage limit", page: "upload screen", detail: `User's storage is 100% full at 2GB. They need to upload a critical ${v.upload} right now. Upgrading doubles storage to 4GB. They have hundreds of ${v.items} and don't want to delete any.`, visible: `Storage bar at 100% (2.0/2.0 GB), upload failed notification, ${v.items} count` }),
    v => ({ feature: "usage limit", page: v.platform, detail: `User hit the free tier's monthly limit of 100 ${v.action} operations. They still have 12 days left in the month. Their workflow depends on this daily. Pro plan has unlimited operations.`, visible: `Usage: 100/100 this month, 12 days remaining, daily average: 8 operations, Pro: unlimited` }),
    v => ({ feature: "advanced feature", page: v.platform, detail: `User discovered ${v.tool} through a tooltip and tried to use it. It's a Pro-only feature that would save them 3 hours/week. They can see a preview of what it does but can't activate it.`, visible: `${v.tool} preview/demo, 'Pro feature' badge, feature benefit summary, upgrade path` }),
    v => ({ feature: "history access", page: v.platform, detail: `User needs to access version history for ${v.content} they edited last week. Free plan only keeps 24 hours of history. The version they need is 5 days old.`, visible: `Version history, entries from last 24h visible, older entries locked, target: 5 days ago` }),
    v => ({ feature: "customization", page: v.platform, detail: `User wants to customize their ${v.platform} branding (logo, colors, domain). Free tier uses default branding. They're presenting to a client who expects a professional, branded experience.`, visible: `Customization panel, all options locked, default branding shown, 'Pro' badges` }),
    v => ({ feature: "analytics", page: v.platform, detail: `User wants to see detailed analytics for their ${v.items}. Free tier shows basic counts; Pro shows trends, breakdowns, and comparisons. They need insights to make a decision this week.`, visible: `Basic analytics visible, advanced charts blurred/locked, 'Upgrade for insights' prompt` }),
    v => ({ feature: "API access", page: "developer settings", detail: `Developer on the team needs API access to integrate ${v.platform} with their internal tools. API is Pro-only. They've already written the integration code and just need the key.`, visible: `API documentation visible, API key: locked, integration code ready, Pro badge` }),
    v => ({ feature: "priority support", page: "support", detail: `User submitted a support ticket 3 days ago about a critical issue. Free tier has 5-day response time. Pro has 4-hour response. Their issue is blocking their entire ${v.team}.`, visible: `Support ticket: open 3 days, priority: Low (Free), Pro response time: 4h` }),
    v => ({ feature: "automation", page: v.platform, detail: `User tried to set up an automation rule for their ${v.items}. Automations are Pro-only. They currently do this task manually 15 times per day, wasting about 45 minutes.`, visible: `Automation builder visible, 'Pro feature' overlay, manual task frequency: 15/day` }),
  ],
  notif: [
    v => ({ feature: "@mention", page: "phone lock screen", detail: `A ${v.team} member @mentioned the user in a comment asking a direct question about ${v.items}. The question is time-sensitive — a decision needs to be made today. User last opened the app 2 hours ago.`, visible: `App icon, sender avatar, message preview, timestamp: now` }),
    v => ({ feature: "weekly digest", page: "home screen", detail: `User's weekly ${v.deliverable} is ready. The key metric they track was up 23% this week — the best result in 3 months. They have 4 unread messages and 2 pending approvals.`, visible: `App icon, report icon, stat preview: +23%, unread badge` }),
    v => ({ feature: "deadline reminder", page: "lock screen", detail: `A ${v.items.slice(0,-1)} is due in 2 hours. It's been 'In Progress' for 3 days and is 80% done. The ${v.team} lead and 2 stakeholders are waiting on it.`, visible: `App icon, task name, due: 2h, progress: 80%, watchers: 3` }),
    v => ({ feature: "price/status change", page: "home screen", detail: `Something the user has been monitoring changed status — a ${v.items.slice(0,-1)} they favorited dropped in price or changed availability. The window is 6 hours before it changes again.`, visible: `App icon, item thumbnail, old → new status, urgency: 6h window` }),
    v => ({ feature: "security alert", page: "home screen", detail: `A new device logged into the user's account from 800 miles away. It could be them traveling or an unauthorized access. The session is active and has read access to all ${v.content}.`, visible: `App icon, security shield, location: unfamiliar city, 'Was this you?' action` }),
    v => ({ feature: "collaboration invite", page: "lock screen", detail: `A respected ${v.collab} just shared a ${v.content} with the user and left a note: 'Would love your input on this.' It's a time-sensitive project with a Friday deadline.`, visible: `App icon, sharer avatar, ${v.content} title, personal note preview` }),
    v => ({ feature: "payment confirmation", page: "home screen", detail: `User's scheduled payment of ${v.unit} was successfully processed. Next charge is in 30 days. They have a new receipt available. Account balance is healthy.`, visible: `App icon, payment amount, 'Successful' badge, next charge date` }),
    v => ({ feature: "milestone reached", page: "home screen", detail: `User just hit ${v.achievement} — a milestone they've been working toward for 6 weeks. This is worth celebrating. The app knows they care because they check progress daily.`, visible: `App icon, celebration emoji, milestone name, progress: complete` }),
    v => ({ feature: "content update", page: "lock screen", detail: `A ${v.content} the user follows was significantly updated by the author. 40% of the content changed. The user referenced this in a meeting yesterday and may be working with outdated info.`, visible: `App icon, ${v.content} title, 'Major update' badge, changed: 40%` }),
    v => ({ feature: "action required", page: "lock screen", detail: `User has a pending approval that's been waiting for 3 days. It's blocking a ${v.collab} from proceeding. This is the second reminder — the first was ignored or missed.`, visible: `App icon, 'Action required' label, pending 3 days, blocking: 1 person` }),
    v => ({ feature: "trial expiring", page: "home screen", detail: `User's premium trial expires in 48 hours. They've used ${v.premium} daily and created 23 ${v.items} that depend on premium features. Those items will become read-only on downgrade.`, visible: `App icon, '48h remaining' badge, at-risk items count: 23` }),
    v => ({ feature: "new message", page: "lock screen", detail: `User received a direct message from someone on their ${v.team}. It's a short message with a question mark — likely needs a quick reply. The sender is online right now.`, visible: `App icon, sender name, message preview truncated, sender: online` }),
  ],
  tooltip: [
    v => ({ feature: "new feature badge", page: v.platform, detail: `User is looking at a 'New' badge on ${v.premium} which launched this week. The feature could save them 2 hours/week based on their usage pattern. They haven't clicked the badge.`, visible: `${v.platform} with 'New' badge, cursor near ${v.premium}, feature unused` }),
    v => ({ feature: "keyboard shortcut", page: v.platform, detail: `User just performed an action the slow way (3 clicks through menus) for the 10th time this session. A keyboard shortcut (Cmd+Shift+K) exists. Average time saved: 4 seconds per use.`, visible: `Action menu open, slow method highlighted, no shortcut visible, usage count: 10` }),
    v => ({ feature: "empty description", page: v.platform, detail: `User created a ${v.items.slice(0,-1)} but left the description empty. ${v.items} with descriptions get 3x more engagement from ${v.collab}. They might not know descriptions are valuable.`, visible: `${v.items.slice(0,-1)} header, empty description field, 'Add description' placeholder` }),
    v => ({ feature: "privacy setting", page: "privacy settings", detail: `A toggle labeled '${v.setting2}' is ON by default (opt-out model). Most users don't understand what it controls. 78% of users who discover it turn it OFF. It affects data shared with ${v.team}.`, visible: `Toggle: ON, label: '${v.setting2}', no description visible, default state` }),
    v => ({ feature: "advanced filter", page: v.platform, detail: `User has been using basic search on 2,000+ ${v.items} for 3 weeks. An 'Advanced Filters' panel exists that power users say saves 80% of search time. They've never opened it.`, visible: `Search bar with basic query, ${v.items} list, 'Filters' button with dot indicator` }),
    v => ({ feature: "bulk actions", page: v.platform, detail: `User has been editing ${v.items} one by one for the past 15 minutes — 12 items with the same change. A bulk edit feature exists in the toolbar. They've never noticed it.`, visible: `${v.items} list view, selection checkboxes visible, bulk toolbar hidden until selected` }),
    v => ({ feature: "template library", page: v.platform, detail: `User is creating a new ${v.items.slice(0,-1)} from scratch for the 5th time. A template library with 30+ pre-built ${v.items} templates exists. Each template saves 20-30 minutes of setup.`, visible: `Blank creation screen, 'Templates' tab next to 'Blank', user on blank tab` }),
    v => ({ feature: "collaboration feature", page: v.platform, detail: `User has been working solo on ${v.content} for a week. They don't know they can invite ${v.collab} for real-time editing. Teams that collaborate finish 40% faster.`, visible: `Solo editor view, share button in toolbar (never clicked), single avatar shown` }),
    v => ({ feature: "export option", page: v.platform, detail: `User has been taking screenshots of their ${v.platform} to share with stakeholders. A proper ${v.export} feature generates polished reports automatically. It's in the menu they never open.`, visible: `${v.platform} view, menu bar with hidden export option, no recent exports` }),
    v => ({ feature: "automation rule", page: v.platform, detail: `User manually changes the status of ${v.items} every day — the same pattern: when X happens, move to Y status. An automation rule could do this automatically. They do it 8 times/day.`, visible: `${v.items} list with recent manual status changes, automation icon in sidebar` }),
    v => ({ feature: "saved views", page: v.platform, detail: `User applies the same 3 filters every time they open ${v.platform}. 'Saved Views' lets them bookmark filter combinations. They've applied this exact combination 23 times.`, visible: `Filter bar with 3 active filters, 'Save this view' option in dropdown, not yet used` }),
    v => ({ feature: "mobile app", page: v.platform, detail: `Desktop user who logs in 5+ times daily doesn't know a mobile app exists. The mobile app has offline access and push notifications for ${v.notifActor} alerts.`, visible: `Desktop ${v.platform}, no mobile app promotion visible, high engagement user` }),
  ],
  cancel: [
    v => ({ feature: "subscription cancel", page: "cancellation flow", detail: `User clicked 'Cancel Subscription.' Active for 11 months, uses the product 4x/week, has 45 saved ${v.items}. Renewal is in 6 days. They're canceling because of a tight budget, not dissatisfaction.`, visible: `Plan details, member 11 months, 4x/week usage, 45 ${v.items}, renews in 6 days` }),
    v => ({ feature: "account deactivation", page: "account settings", detail: `User wants to deactivate (not permanently delete). Their data is preserved for 90 days. 3 ${v.team} members depend on shared resources they created.`, visible: `Deactivation vs deletion options, 90-day retention, 3 affected ${v.collab}` }),
    v => ({ feature: "plan downgrade", page: "plan settings", detail: `User is downgrading from Pro ($29/mo) to Free. They'll lose: ${v.premium}, unlimited ${v.items} (→ 3 limit), priority support, and ${v.tool}. They currently have 12 active ${v.items}.`, visible: `Current: Pro → Free comparison, 12 items (limit: 3), features being lost` }),
    v => ({ feature: "event cancellation", page: "event management", detail: `User is canceling a ${v.eventType} that 28 people confirmed for. It's in 48 hours. 12 people added it to their calendar. 3 people traveled specifically for this.`, visible: `${v.eventType} details, 48h away, 28 confirmed, 12 calendar adds, 3 travelers` }),
    v => ({ feature: "trial cancel", page: "billing", detail: `User wants to cancel their 14-day premium trial on day 6. They've used ${v.premium} features 34 times but think the price is too high. 8 days of trial remain unused.`, visible: `Trial: day 6/14, ${v.premium} usage: 34 times, price shown, 8 days remaining` }),
    v => ({ feature: "team departure", page: "team settings", detail: `User is leaving a ${v.team} they've been part of for 8 months. They have 23 ${v.items} assigned and 5 open ${v.eventType}s. Their departure will leave gaps in the workflow.`, visible: `Team member page, 23 assigned items, 5 open events, member since: 8 months` }),
    v => ({ feature: "integration disconnect", page: "integrations", detail: `User is disconnecting ${v.integration} which has been syncing for 6 months. 1,200+ ${v.items} were imported through it. Disconnecting stops future sync but existing data stays.`, visible: `${v.integration}: Connected 6 months, 1,200+ synced items, bidirectional sync active` }),
    v => ({ feature: "auto-renewal cancel", page: "billing", detail: `User wants to turn off auto-renewal but keep using the service until the current billing period ends in 22 days. They might come back — they're just testing a competitor.`, visible: `Auto-renew: ON, next charge in 22 days, 'Cancel renewal' vs 'Cancel now' options` }),
    v => ({ feature: "feature opt-out", page: "settings", detail: `User wants to disable a feature (${v.tool}) that was automatically enabled in a recent update. The feature changed their workflow and they preferred the old behavior.`, visible: `${v.tool}: Enabled (auto), 'This was enabled in the latest update' note, disable option` }),
    v => ({ feature: "workspace exit", page: "workspace settings", detail: `User is leaving a shared workspace with 15 members. They're the most active contributor with 89 ${v.items}. Their items will remain but become 'orphaned' with no assigned owner.`, visible: `Workspace exit page, contributions: 89 items, 15 members, orphan warning` }),
    v => ({ feature: "pause subscription", page: "billing", detail: `User doesn't want to fully cancel — they want to pause for 2 months during a slow season. Pausing isn't available; they can only cancel and re-subscribe. Their data would be kept for 60 days.`, visible: `Cancel page, no pause option, data retention: 60 days, re-subscribe anytime note` }),
    v => ({ feature: "remove data", page: "privacy settings", detail: `User wants to delete their personal data but keep using the free tier of the service. GDPR gives them this right. Deleting data resets their ${v.deliverable} history and ${v.achievement} progress.`, visible: `Data deletion request, items to be deleted list, service continues on free tier` }),
  ],
  settings: [
    v => ({ feature: "notification preferences", page: "notification settings", detail: `User gets 30+ notifications/day and wants to reduce noise. They need to configure which types they receive (${v.notifActor} alerts, ${v.eventType} reminders, ${v.team} updates) and through which channels (push, email, in-app).`, visible: `Notification categories list, per-channel toggles (push/email/in-app), all currently ON` }),
    v => ({ feature: "privacy controls", page: "privacy settings", detail: `User is reviewing two privacy settings: '${v.setting1}' and '${v.setting2}'. Both are ON by default. The first controls functionality, the second controls data sharing. The implications aren't obvious.`, visible: `Two toggle sections: ${v.setting1} (ON), ${v.setting2} (ON), no descriptions visible` }),
    v => ({ feature: "two-factor auth", page: "security settings", detail: `User is setting up 2FA for the first time after receiving a security alert. Options: authenticator app (recommended, more secure) or SMS (easier but less secure). They've never used an authenticator app.`, visible: `2FA: Not enabled, two method cards (Authenticator: recommended, SMS: easier)` }),
    v => ({ feature: "display preferences", page: "appearance settings", detail: `User changing theme (light/dark/auto) and font size. They also see a new 'Reduce motion' accessibility toggle that was added this week. They have a mild sensitivity to animations.`, visible: `Theme selector (3 options), font slider, new 'Reduce motion' toggle, preview panel` }),
    v => ({ feature: "email preferences", page: "email settings", detail: `User gets 12 emails/week from the platform and wants to reduce them. Settings show 6 email types. They want to keep ${v.deliverable} updates but stop everything else.`, visible: `6 email toggles, frequency labels, current: all ON, unsubscribe-all option at bottom` }),
    v => ({ feature: "language & region", page: "account settings", detail: `User switching their account language from English to Spanish. The interface will translate but user-generated ${v.content} stays in the original language. Date/time format also changes.`, visible: `Language dropdown, region/timezone selector, format preview (dates, currency)` }),
    v => ({ feature: "default workspace", page: "workspace settings", detail: `User has 3 workspaces and wants to change which one loads by default. They currently land in an old workspace they rarely use. The option to change this is buried 2 levels deep.`, visible: `Default workspace selector, 3 workspaces listed with last-used dates, current default highlighted` }),
    v => ({ feature: "data export settings", page: "data management", detail: `User configuring automatic ${v.export} backups. Options: weekly or monthly, format (CSV or JSON), destination (email or ${v.integration}). They want peace of mind that their data is backed up.`, visible: `Auto-export toggle, frequency selector, format picker, destination config` }),
    v => ({ feature: "keyboard shortcuts", page: "accessibility settings", detail: `User wants to customize keyboard shortcuts. The defaults conflict with their OS shortcuts. They use shortcuts heavily — 50+ times per day. Changing one might affect muscle memory.`, visible: `Shortcut list with current bindings, edit buttons, 'Reset to defaults' option, conflict warnings` }),
    v => ({ feature: "connected accounts", page: "account settings", detail: `User reviewing which external accounts are connected: ${v.integration}, Google SSO, and a deprecated service that no longer exists. They want to clean up but aren't sure what disconnecting does.`, visible: `3 connected accounts, one showing 'Service unavailable', disconnect buttons, data impact unclear` }),
    v => ({ feature: "auto-save preferences", page: "editor settings", detail: `User configuring auto-save behavior. Options: save every 30s (default), every 5 minutes, or manual only. They're on a slow connection and auto-save causes lag during editing.`, visible: `Auto-save interval selector, current: 30s, connection quality indicator, manual save option` }),
    v => ({ feature: "collaboration permissions", page: "sharing settings", detail: `User setting default sharing permissions for new ${v.items}. Options: private (only me), team (${v.team} can view), public (anyone with link). They want team access by default but not public.`, visible: `Default permission selector, 3 options with descriptions, current: private, recommendation: team` }),
  ],
  banner: [
    v => ({ feature: "scheduled maintenance", page: `${v.platform} (top banner)`, detail: `System maintenance in 4 hours (11 PM EST). Platform unavailable for ~30 minutes. Users should save work. 40% of users are in a timezone where this is mid-workday.`, visible: `Banner over ${v.platform}, countdown timer, save work warning, timezone note` }),
    v => ({ feature: "new feature launch", page: `${v.platform} (banner)`, detail: `${v.premium} just launched after 3 months of beta. Users requested this feature 2,000+ times. It's available on all plans. The banner shouldn't block their workflow.`, visible: `${v.platform} below, feature name + icon in banner, 'Learn more' link, dismiss option` }),
    v => ({ feature: "policy update", page: "any page (banner)", detail: `Privacy policy updated with changes to data retention. Users must review and accept within 14 days to continue using the service. GDPR requires explicit consent.`, visible: `Policy notice, accept button, 14-day countdown, 'Review changes' link` }),
    v => ({ feature: "trial expiring", page: "any page (banner)", detail: `Free trial expires in 48 hours. User has been active daily, used 80% of premium features, and created 23 ${v.items} that depend on premium. Convert without being annoying.`, visible: `'48h remaining' badge, usage summary, subtle upgrade option, dismiss available` }),
    v => ({ feature: "system degradation", page: v.platform, detail: `A third-party service is experiencing issues, causing slower load times for ${v.items}. Core features work but some operations take 3-5x longer than normal. ETA for fix: 2 hours.`, visible: `Warning banner, 'Some features may be slow', ETA: 2h, status page link` }),
    v => ({ feature: "billing issue", page: "any page (banner)", detail: `User's payment method expired 2 days ago. Automatic retry in 5 days. If not updated, account downgrades to free tier. They haven't noticed the expiration yet.`, visible: `Billing warning, 'Update payment method', 5 days until downgrade, card ending in 4242` }),
    v => ({ feature: "security incident", page: "any page (banner)", detail: `A security audit found no breach but recommended all users update passwords as a precaution. This is mandatory within 7 days. The messaging must be firm without causing panic.`, visible: `Security banner, 'Update your password', 7-day deadline, 'Learn more' link` }),
    v => ({ feature: "seasonal promotion", page: v.platform, detail: `Annual sale: 40% off Pro plan if upgraded this week. User is on Free tier and has hit usage limits 3 times this month. The promotion is genuine but shouldn't feel spammy.`, visible: `Promotional banner, 40% off badge, 'This week only', upgrade CTA, dismiss option` }),
    v => ({ feature: "feedback request", page: v.platform, detail: `The team wants to collect user feedback on a recent update. They're asking for a 2-minute survey. User has been active post-update for 5 days. Participation is optional.`, visible: `Feedback banner, '2-min survey', participation incentive (if any), skip option` }),
    v => ({ feature: "data migration", page: v.platform, detail: `Background data migration happening over the weekend. No downtime expected but some ${v.items} may show stale data for up to 1 hour during the process. Users don't need to do anything.`, visible: `Info banner, 'Data migration in progress', no action required, completion: this weekend` }),
    v => ({ feature: "compliance deadline", page: "any page (banner)", detail: `Users must complete profile verification (upload ID) by end of month for regulatory compliance. 12 days remaining. Users who don't verify will have restricted access.`, visible: `Compliance banner, verification required, 12 days remaining, restricted access warning` }),
    v => ({ feature: "app update available", page: v.platform, detail: `A critical app update is available with performance improvements and a security patch. Users on the old version may experience bugs. Update is recommended but not forced.`, visible: `Update banner, version number, 'Performance + security improvements', update CTA` }),
  ],
  email: [
    v => ({ feature: "payment failed", page: "email inbox", detail: `Recurring payment failed — card expired. System auto-retries in 3 days. If it fails again, account downgrades in 7 days. User may not check email daily.`, visible: `App logo, payment amount, card last 4, retry date, downgrade deadline` }),
    v => ({ feature: "welcome email", page: "email inbox", detail: `User just signed up 2 minutes ago. This is the first email they receive. It should reinforce their decision, set expectations, and give them one clear next step.`, visible: `App logo, welcome subject, user's name, CTA to first action` }),
    v => ({ feature: "weekly digest", page: "email inbox", detail: `User's weekly ${v.deliverable} email. Key stats: 23 ${v.items} updated, 5 ${v.team} comments, 1 milestone hit. They receive this every Monday. Open rate for these: 34%.`, visible: `App logo, week summary stats, key highlights, 'View full report' CTA` }),
    v => ({ feature: "password reset", page: "email inbox", detail: `User requested a password reset. The link expires in 1 hour. They're locked out and frustrated. This email needs to be immediately scannable — link above the fold.`, visible: `App logo, reset link/button, expiry note, 'Didn't request this?' footer` }),
    v => ({ feature: "team activity", page: "email inbox", detail: `A ${v.collab} left 3 comments on shared ${v.content} requesting input. The comments are from 4 hours ago. The ${v.collab} is waiting for a response before they can proceed.`, visible: `App logo, commenter name, ${v.content} title, comment previews, reply CTA` }),
    v => ({ feature: "trial ending", page: "email inbox", detail: `User's 14-day premium trial ends in 3 days. They've been highly active: used ${v.premium} 47 times, created 15 ${v.items}. Those items become read-only on downgrade.`, visible: `App logo, '3 days remaining', usage summary, items at risk, upgrade CTA` }),
    v => ({ feature: "security alert", page: "email inbox", detail: `New login from unrecognized device in a different country. If this wasn't the user, they need to secure their account immediately. Time is critical.`, visible: `App logo, alert badge, device info, location, 'Secure account' CTA, 'This was me' link` }),
    v => ({ feature: "invoice receipt", page: "email inbox", detail: `Monthly invoice for ${v.unit}. User needs this for expense reporting. The receipt should include: amount, date, plan name, and a download link for the PDF. Their accountant may also see this.`, visible: `App logo, amount, date, plan name, invoice number, download PDF CTA` }),
    v => ({ feature: "feature announcement", page: "email inbox", detail: `Major feature launch: ${v.premium} is now available on all plans. The user requested this 4 months ago. They should feel heard and excited to try it.`, visible: `App logo, feature name with visual, 'You asked, we built it' framing, try it CTA` }),
    v => ({ feature: "inactivity re-engagement", page: "email inbox", detail: `User hasn't logged in for 21 days. Their ${v.team} posted 8 updates they haven't seen. 2 ${v.items} need their input. This email should re-engage without guilting.`, visible: `App logo, '8 updates waiting', ${v.items} needing input, 'See what you missed' CTA` }),
    v => ({ feature: "account deletion warning", page: "email inbox", detail: `User requested account deletion 25 days ago. It processes in 30 days (5 remaining). This is their final chance to cancel the deletion. All data will be permanently lost.`, visible: `App logo, urgent subject, deletion date, data summary, 'Cancel deletion' CTA, 'Keep my account' button` }),
    v => ({ feature: "referral reward", page: "email inbox", detail: `User's referral was accepted — their friend signed up and completed onboarding. The referrer earned a reward (extended trial, credit, or bonus). Encourage them to refer more.`, visible: `App logo, celebration tone, friend's name (or 'a friend'), reward details, referral link` }),
  ],
};

// ═══════════════ NICHE-AWARE BRIEF GENERATOR ═══════════════
function generateBrief(nicheId, toneId, screenId, personaId, NICHES, TONES, SCREENS, PERSONAS) {
  const niche = NICHES.find(n=>n.id===nicheId);
  const tone = TONES.find(t=>t.id===toneId);
  const screen = SCREENS.find(s=>s.id===screenId);
  const persona = PERSONAS.find(p=>p.id===personaId);
  const companyPool = COMPANIES[nicheId] || COMPANIES.saas;
  const company = companyPool[Math.floor(Math.random()*companyPool.length)];
  const templates = CTX_TEMPLATES[screenId] || CTX_TEMPLATES.error_system;
  const template = templates[Math.floor(Math.random()*templates.length)];
  const ctx = template(company);
  return { niche, tone, screen, persona, ctx, company };
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

// ═══════════════ SELF-REVIEW RUBRIC PER SCREEN TYPE ═══════════════
const RUBRICS = {
  error_system: ["Does your headline acknowledge the problem without blaming the user?","Does the body explain what happened AND what to do next?","Is the primary action clear about what it does (not just 'OK')?","Would a frustrated user feel reassured reading this?"],
  error_user: ["Does the message explain what went wrong specifically?","Does it tell the user exactly how to fix it?","Is the tone blame-free (no 'you failed' language)?","Is the error recoverable from this screen without starting over?"],
  error_perm: ["Does it explain WHY access is restricted?","Does it give a clear next step (who to contact, how to upgrade)?","Does the user understand their current role/permissions?"],
  empty_first: ["Does the headline motivate the user to take their first action?","Is the CTA specific (not just 'Get Started')?","Does the body reduce intimidation and set expectations?"],
  empty_search: ["Does it acknowledge the search attempt (not just 'Nothing found')?","Does it offer at least one recovery path (broaden search, remove filters)?","Is the tone empathetic rather than dead-end?"],
  onboard_welcome: ["Could someone understand the product value in under 5 seconds?","Is the primary CTA action-oriented (not 'Next' or 'Continue')?","Does the skip/secondary option feel safe to choose?"],
  onboard_step: ["Is it clear what this step accomplishes and why it matters?","Does the skip option feel judgment-free?","Is the progress visible (the user knows where they are in the flow)?"],
  loading: ["Do the messages reduce anxiety about the wait?","Do they show progression (not the same message repeated)?","Would the user feel confident something is actually happening?"],
  confirm_destroy: ["Are the consequences of this action crystal clear?","Is the destructive button clearly labeled (not ambiguous)?","Does the cancel/keep option feel like the safe default?","Would someone skim-reading still understand the stakes?"],
  confirm_safe: ["Does the user feel confident about what's about to happen?","Are the details accurate (amounts, counts, timing)?","Is the confirmation button reassuring rather than scary?"],
  success: ["Does the celebration feel proportionate to the achievement?","Is there a clear next step so the user isn't stranded?","Does it reinforce the value of what they just did?"],
  permission: ["Is it clear WHY you need this permission?","Is the benefit to the user stated (not just the app's need)?","Does the skip/deny option feel safe and judgment-free?","Would a privacy-conscious user trust this request?"],
  paywall: ["Does it show value before asking for money?","Is the free alternative clear (what CAN they still do)?","Does it avoid shame ('you can't' vs 'unlock this with...')?"],
  notif: ["Would you tap this notification? Is it worth the interruption?","Is the information actionable (not just informational)?","Is it scannable in under 2 seconds?"],
  tooltip: ["Is the tip contextually relevant (not generic help)?","Is there a clear action the user can take?","Can the user easily dismiss it without friction?"],
  cancel: ["Does the retention offer feel genuine (not manipulative)?","Is the cancel button findable (not hidden or guilt-tripping)?","Are the consequences of leaving clearly stated?"],
  settings: ["Is each setting label self-explanatory without the description?","Does the description explain the IMPACT of toggling?","Would a non-technical user understand both settings?"],
  banner: ["Is the banner worth the screen real estate it occupies?","Can the user dismiss it easily?","Is the urgency level appropriate (not over-alarming)?"],
  email: ["Would the subject line get opened (clear + relevant)?","Is the email scannable (key info visible without scrolling)?","Is the CTA specific about what happens when clicked?"],
};

// ═══════════════ EXAMPLE ANSWERS PER SCREEN TYPE ═══════════════
// (Examples removed — generic screen-level examples don't match specific briefs)

// ═══════════════ THEME ═══════════════
// ═══════════════ THEME ═══════════════
const LIGHT = {
  bg:"#FAF9F7", card:"#FFFFFF", alt:"#F2F1ED", border:"#E4E2DC",
  bf:"#1A1A1A", text:"#1A1A1A", sub:"#6B6860", muted:"#9C9A93",
  accent:"#C7432B", aS:"rgba(199,67,43,0.07)", aB:"rgba(199,67,43,0.18)",
  ok:"#2D7A4F", okS:"rgba(45,122,79,0.07)", err:"#B83A3A", errS:"rgba(184,58,58,0.07)",
};
const DARK = {
  bg:"#131315", card:"#1C1C20", alt:"#222228", border:"#333339",
  bf:"#E8E6E1", text:"#E8E6E1", sub:"#9A9890", muted:"#6B6860",
  accent:"#E05A3A", aS:"rgba(224,90,58,0.1)", aB:"rgba(224,90,58,0.22)",
  ok:"#4ADE80", okS:"rgba(74,222,128,0.1)", err:"#F87171", errS:"rgba(248,113,113,0.1)",
};
let T = LIGHT;
const setTheme = (dark) => { T = dark ? DARK : LIGHT; };
const getCSS = () => `
@keyframes fu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes si{from{opacity:0;transform:translateX(-6px)}to{opacity:1;transform:translateX(0)}}
@keyframes sp{to{transform:rotate(360deg)}}
*{box-sizing:border-box;margin:0;padding:0}body{background:${T.bg};transition:background 0.3s}
::selection{background:${T.aS};color:${T.accent}}textarea{font-family:inherit}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:${T.border};border-radius:3px}
@media(max-width:768px){.wl-grid{grid-template-columns:1fr!important}.wl-brief-grid{grid-template-columns:1fr!important}}
@media(min-width:769px) and (max-width:1024px){.wl-brief-grid{grid-template-columns:1fr 1fr!important}}
details summary{list-style:none}details summary::-webkit-details-marker{display:none}`;
const FONTS="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500&family=IBM+Plex+Mono:wght@400;500&display=swap";

// ═══════════════ UI COMPONENTS ═══════════════
const Btn=({children,v="primary",disabled,onClick,style:sx,...r})=>{
  const base={fontFamily:"'Outfit',sans-serif",fontSize:14,fontWeight:600,cursor:disabled?"default":"pointer",border:"none",borderRadius:8,padding:"12px 24px",transition:"all 0.2s",opacity:disabled?0.35:1,letterSpacing:"0.01em",display:"inline-flex",alignItems:"center",gap:8,justifyContent:"center",whiteSpace:"nowrap"};
  const vs={primary:{background:T.text,color:T.bg},secondary:{background:T.alt,color:T.text,border:`1px solid ${T.border}`},accent:{background:T.accent,color:"#fff"},ghost:{background:"transparent",color:T.sub,padding:"8px 16px"},danger:{background:T.errS,color:T.err}};
  return <button onClick={disabled?undefined:onClick} style={{...base,...vs[v],...sx}} {...r}>{children}</button>;
};
const Tag=({children,color=T.sub,bg=T.alt})=><span style={{fontSize:11,fontWeight:600,padding:"3px 9px",borderRadius:5,background:bg,color,letterSpacing:"0.04em",textTransform:"uppercase",fontFamily:"'IBM Plex Mono',monospace",whiteSpace:"nowrap"}}>{children}</span>;
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
const Mono=({children})=><span style={{fontSize:11,fontWeight:600,color:T.muted,textTransform:"uppercase",letterSpacing:"0.07em",fontFamily:"'IBM Plex Mono',monospace"}}>{children}</span>;

// ═══════════════ MOCKUP RENDERER ═══════════════
function Mockup({sid,ans,extras,dev,company}){
  const s=SCREENS.find(x=>x.id===sid);
  const ph=dev==="phone";const g=k=>ans[k]||"";
  const cn=company||"App";
  // Shared sub-components
  const Title=({k})=><p style={{fontSize:ph?17:19,fontWeight:600,color:T.text,lineHeight:1.3,marginBottom:7,fontFamily:"'Newsreader',Georgia,serif"}}>{g(k)||COMP[k]?.ph}</p>;
  const Body=({k})=><p style={{fontSize:ph?13:14,color:T.sub,lineHeight:1.55,marginBottom:14}}>{g(k)||COMP[k]?.ph}</p>;
  const PB=({k,danger})=><div style={{padding:"10px 0",borderRadius:8,textAlign:"center",fontSize:13,fontWeight:600,background:danger?T.err:T.text,color:T.bg,fontFamily:"'Outfit',sans-serif"}}>{g(k)||COMP[k]?.ph}</div>;
  const SB=({k,link})=><div style={{padding:link?"5px 0":"10px 0",borderRadius:8,textAlign:"center",fontSize:link?12:13,fontWeight:link?400:600,color:T.sub,border:link?"none":`1px solid ${T.border}`,textDecoration:link?"underline":"none",fontFamily:"'Outfit',sans-serif"}}>{g(k)||COMP[k]?.ph}</div>;

  // Scaffolding pieces — reusable app chrome
  const NavBar=({title,back})=><div style={{padding:"10px 14px",borderBottom:`1px solid ${T.border}`,background:T.card,display:"flex",alignItems:"center",gap:8}}>
    {back&&<span style={{fontSize:12,color:T.muted}}>‹</span>}
    <span style={{fontSize:13,fontWeight:600,color:T.text}}>{title||cn}</span>
    <span style={{marginLeft:"auto",width:20,height:20,borderRadius:10,background:T.alt,border:`1px solid ${T.border}`}}/>
  </div>;
  const TabBar=()=><div style={{position:"absolute",bottom:0,left:0,right:0,height:ph?48:40,borderTop:`1px solid ${T.border}`,background:T.card,display:"flex",alignItems:"center",justifyContent:"space-around",padding:"0 16px"}}>
    {["●","○","○","○"].map((d,i)=><div key={i} style={{width:ph?20:16,height:ph?20:16,borderRadius:10,background:i===0?T.text:T.border,opacity:i===0?1:0.3}}/>)}
  </div>;
  const ListRow=({w,accent})=><div style={{padding:"10px 14px",borderBottom:`1px solid ${T.alt}`,display:"flex",alignItems:"center",gap:10}}>
    <div style={{width:ph?28:24,height:ph?28:24,borderRadius:6,background:accent?T.aS:T.alt,flexShrink:0}}/>
    <div style={{flex:1}}>
      <div style={{height:8,borderRadius:4,background:T.border,width:`${w||65}%`,marginBottom:4}}/>
      <div style={{height:6,borderRadius:3,background:T.alt,width:`${(w||65)-20}%`}}/>
    </div>
    <span style={{fontSize:10,color:T.muted}}>›</span>
  </div>;
  const SearchBar=()=><div style={{margin:"10px 14px",padding:"8px 12px",borderRadius:8,background:T.alt,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:6}}>
    <span style={{fontSize:11,color:T.muted}}>🔍</span>
    <span style={{fontSize:12,color:T.muted}}>Search…</span>
  </div>;
  const DimBg=({children})=><div style={{position:"relative",height:"100%"}}>
    <div style={{opacity:0.15,filter:"blur(1px)",padding:0}}>
      <NavBar/><SearchBar/>
      <ListRow w={70}/><ListRow w={55}/><ListRow w={80}/><ListRow w={45}/>
    </div>
    <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.3)",display:"flex",alignItems:"center",justifyContent:"center",padding:ph?14:28}}>
      {children}
    </div>
  </div>;
  const ProgressDots=({step,total})=><div style={{display:"flex",gap:5,justifyContent:"center",margin:"12px 0"}}>
    {Array.from({length:total},(_, i)=><div key={i} style={{width:i===step?18:6,height:6,borderRadius:3,background:i===step?T.text:T.border,transition:"all 0.2s"}}/>)}
  </div>;

  const ExtraLayer=()=>{
    if(!extras?.length)return null;
    return extras.map((e,i)=>{
      const c=EXTRAS.find(x=>x.id===e.type);if(!c)return null;
      const v=e.value||c.field.ph;
      if(e.type==="toast")return<div key={i} style={{position:"absolute",bottom:ph?56:12,left:12,right:12,padding:"9px 13px",borderRadius:9,background:T.text,color:T.bg,fontSize:12,fontFamily:"'Outfit',sans-serif",boxShadow:"0 4px 16px rgba(0,0,0,0.12)",zIndex:20}}>✓ {v}</div>;
      if(e.type==="banner_c")return<div key={i} style={{position:"absolute",top:0,left:0,right:0,padding:"8px 12px",background:"#EFF6FF",borderBottom:"1px solid #BFDBFE",fontSize:11,color:"#1E40AF",fontFamily:"'Outfit',sans-serif",zIndex:20}}>ℹ️ {v}</div>;
      if(e.type==="helper")return<div key={i} style={{position:"absolute",bottom:ph?56:16,left:ph?24:40,fontSize:11,color:T.muted,fontFamily:"'Outfit',sans-serif",zIndex:20}}>{v}</div>;
      if(e.type==="link")return<div key={i} style={{position:"absolute",bottom:ph?56:16,right:ph?24:40,fontSize:12,color:T.accent,textDecoration:"underline",fontFamily:"'Outfit',sans-serif",zIndex:20}}>{v}</div>;
      if(e.type==="inlineErr")return<div key={i} style={{position:"absolute",bottom:ph?56:16,left:ph?24:40,fontSize:11,color:T.err,fontFamily:"'Outfit',sans-serif",zIndex:20}}>⚠ {v}</div>;
      if(e.type==="inlineOk")return<div key={i} style={{position:"absolute",bottom:ph?56:16,left:ph?24:40,fontSize:11,color:T.ok,fontFamily:"'Outfit',sans-serif",zIndex:20}}>✓ {v}</div>;
      return null;
    });
  };

  const content=(()=>{
    // ── LOADING ──
    if(sid==="loading"){
      const msgs=[g("loadMsg1")||"Loading…",g("loadMsg2")||"Almost there…",g("loadMsg3")||"Just a moment…"].filter(Boolean);
      // Show all 3 messages with staggered progress visualization
      return<div style={{height:"100%",display:"flex",flexDirection:"column"}}>
        <NavBar/>
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,padding:28}}>
          <div style={{width:32,height:32,border:`3px solid ${T.border}`,borderTopColor:T.accent,borderRadius:"50%",animation:"sp 1s linear infinite"}}/>
          {/* Show all messages as sequential stages */}
          <div style={{width:"100%",maxWidth:200}}>
            {msgs.map((msg,i)=>{
              const opacity = i===0?1:i===1?0.55:0.3;
              const barWidth = i===0?"85%":i===1?"50%":"15%";
              return <div key={i} style={{marginBottom:12,opacity,transition:"opacity 0.3s"}}>
                <p style={{fontSize:12,color:T.sub,textAlign:"center",marginBottom:4}}>{msg}</p>
                <div style={{height:3,borderRadius:2,background:T.border,overflow:"hidden"}}>
                  <div style={{height:"100%",width:barWidth,background:T.accent,borderRadius:2,transition:"width 0.5s"}}/>
                </div>
              </div>;
            })}
          </div>
        </div>
        <TabBar/>
      </div>;
    }
    // ── NOTIFICATION ──
    if(sid==="notif"){
      return<div style={{height:"100%",background:"linear-gradient(145deg, #2C2C3A 0%, #1A1A2E 100%)",padding:ph?14:20,display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"4px 4px 16px",color:"rgba(255,255,255,0.7)"}}>
          <div>
            <p style={{fontSize:ph?38:32,fontWeight:300,letterSpacing:"-1px",color:"#fff"}}>9:41</p>
            <p style={{fontSize:11,marginTop:2}}>Monday, February 23</p>
          </div>
          <div style={{display:"flex",gap:6,marginTop:4}}>
            <div style={{width:20,height:20,borderRadius:10,background:"rgba(255,255,255,0.1)"}}/>
            <div style={{width:20,height:20,borderRadius:10,background:"rgba(255,255,255,0.1)"}}/>
          </div>
        </div>
        {/* Earlier notification (stale) */}
        <div style={{padding:10,background:"rgba(255,255,255,0.08)",borderRadius:13,marginBottom:8,backdropFilter:"blur(20px)"}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
            <div style={{width:18,height:18,borderRadius:4,background:"rgba(255,255,255,0.15)"}}/>
            <span style={{fontSize:10,color:"rgba(255,255,255,0.5)"}}>Messages · 2h ago</span>
          </div>
          <p style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>Hey, are you free for a quick call?</p>
        </div>
        {/* Active notification — the one user writes */}
        <div style={{padding:12,background:"rgba(255,255,255,0.12)",borderRadius:13,border:"1px solid rgba(255,255,255,0.08)",backdropFilter:"blur(20px)"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <div style={{width:24,height:24,borderRadius:6,background:T.aS,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>📱</div>
            <span style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.8)"}}>{g("notifTitle")||cn}</span>
            <span style={{fontSize:10,color:"rgba(255,255,255,0.4)",marginLeft:"auto"}}>now</span>
          </div>
          <p style={{fontSize:12,color:"#fff",lineHeight:1.45}}>{g("notifBody")||COMP.notifBody.ph}</p>
        </div>
      </div>;
    }
    // ── TOOLTIP ──
    if(sid==="tooltip"){
      return<div style={{height:"100%",display:"flex",flexDirection:"column"}}>
        <NavBar/>
        <SearchBar/>
        <ListRow w={70} accent/><ListRow w={55}/><ListRow w={80}/>
        {/* Tooltip target + tooltip */}
        <div style={{padding:"6px 14px",display:"flex",alignItems:"center",gap:8,borderBottom:`1px solid ${T.alt}`,position:"relative"}}>
          <div style={{width:ph?28:24,height:ph?28:24,borderRadius:6,background:T.aS,flexShrink:0}}/>
          <div style={{flex:1}}>
            <div style={{height:8,borderRadius:4,background:T.border,width:"60%",marginBottom:4}}/>
            <div style={{height:6,borderRadius:3,background:T.alt,width:"40%"}}/>
          </div>
          <div style={{padding:"3px 8px",borderRadius:5,border:`1px solid ${T.accent}`,fontSize:10,color:T.accent,fontWeight:600}}>NEW</div>
        </div>
        {/* The tooltip pointing up at the row */}
        <div style={{margin:"0 auto",width:"88%",position:"relative",marginTop:4}}>
          <div style={{position:"absolute",top:-5,left:ph?"70%":"75%",transform:"translateX(-50%) rotate(45deg)",width:10,height:10,background:T.text,borderRadius:1,zIndex:2}}/>
          <div style={{padding:12,background:T.text,color:T.bg,borderRadius:9,fontSize:12,lineHeight:1.45,position:"relative",zIndex:1}}>
            <p>{g("tipBody")||COMP.tipBody.ph}</p>
            <div style={{display:"flex",gap:10,marginTop:8,fontSize:11}}>
              <span style={{fontWeight:600,color:T.accent}}>{g("tipCta")||"Got it"}</span>
              <span style={{color:"rgba(255,255,255,0.45)"}}>{g("tipDismiss")||"Skip"}</span>
            </div>
          </div>
        </div>
        <ListRow w={65}/><ListRow w={50}/>
        <TabBar/>
      </div>;
    }
    // ── SETTINGS ──
    if(sid==="settings"){
      return<div style={{height:"100%",display:"flex",flexDirection:"column"}}>
        <NavBar title="Settings" back/>
        <div style={{flex:1,padding:ph?14:20,overflowY:"auto"}}>
          {/* Existing placeholder setting */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:`1px solid ${T.alt}`}}>
            <div><div style={{height:8,borderRadius:4,background:T.border,width:100,marginBottom:4}}/><div style={{height:6,borderRadius:3,background:T.alt,width:70}}/></div>
            <div style={{width:36,height:20,borderRadius:10,background:T.border}}><div style={{width:16,height:16,borderRadius:"50%",background:"#fff",marginTop:2,marginLeft:2,boxShadow:"0 1px 3px rgba(0,0,0,0.1)"}}/></div>
          </div>
          {/* User's settings */}
          {[["setLabel1","setDesc1",true],["setLabel2","setDesc2",false]].map(([lk,dk,on],i)=>
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"12px 0",borderBottom:`1px solid ${T.alt}`}}>
              <div style={{flex:1}}>
                <p style={{fontSize:13,fontWeight:500,color:T.text}}>{g(lk)||COMP[lk]?.ph}</p>
                <p style={{fontSize:11,color:T.sub,marginTop:2,lineHeight:1.4}}>{g(dk)||COMP[dk]?.ph}</p>
              </div>
              <div style={{width:40,height:22,borderRadius:11,background:on?T.accent:T.border,position:"relative",flexShrink:0,marginLeft:14,marginTop:1}}>
                <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:2,left:on?20:2,boxShadow:"0 1px 3px rgba(0,0,0,0.12)"}}/>
              </div>
            </div>
          )}
          {/* Another placeholder */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:`1px solid ${T.alt}`}}>
            <div><div style={{height:8,borderRadius:4,background:T.border,width:80,marginBottom:4}}/><div style={{height:6,borderRadius:3,background:T.alt,width:120}}/></div>
            <span style={{fontSize:10,color:T.muted}}>›</span>
          </div>
        </div>
        <TabBar/>
      </div>;
    }
    // ── EMAIL ──
    if(sid==="email"){
      return<div style={{height:"100%",display:"flex",flexDirection:"column",background:T.card}}>
        <div style={{padding:"10px 14px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:12,color:T.muted}}>‹</span>
          <span style={{fontSize:13,fontWeight:600}}>Inbox</span>
        </div>
        <div style={{flex:1,padding:ph?14:20,overflowY:"auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <div style={{width:32,height:32,borderRadius:16,background:T.aS,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:T.accent}}>{cn[0]}</div>
            <div style={{flex:1}}>
              <p style={{fontSize:12,fontWeight:600,color:T.text}}>{cn}</p>
              <p style={{fontSize:10,color:T.muted}}>to me · just now</p>
            </div>
          </div>
          <div style={{padding:"8px 0",borderBottom:`1px solid ${T.alt}`,marginBottom:10}}>
            <p style={{fontSize:14,fontWeight:600,color:T.text}}>{g("emailSubject")||COMP.emailSubject.ph}</p>
          </div>
          <Title k="title"/><Body k="body"/><PB k="primaryButton"/>
          <div style={{borderTop:`1px solid ${T.alt}`,marginTop:16,paddingTop:10}}>
            <p style={{fontSize:10,color:T.muted,lineHeight:1.5,textAlign:"center"}}>You received this email because you have an account with {cn}.<br/><span style={{textDecoration:"underline"}}>Unsubscribe</span> · <span style={{textDecoration:"underline"}}>Manage preferences</span></p>
          </div>
        </div>
      </div>;
    }
    // ── DIALOGS (error, confirm, paywall, success) — shown over dimmed app bg ──
    if(s.mt==="dialog"){
      const ic={error_system:"⚠️",error_user:"⛔",error_perm:"🚫",confirm_destroy:"⚠️",confirm_safe:"✔️",success:"🎉",paywall:"💎"};
      return<DimBg>
        <div style={{background:T.card,borderRadius:14,padding:ph?20:28,border:`1px solid ${T.border}`,width:"100%",maxWidth:300,boxShadow:"0 6px 32px rgba(0,0,0,0.15)"}}>
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
      </DimBg>;
    }
    // ── FULLSCREEN (onboarding, empty states, permission, cancel, banner) ──
    const ic2={empty_first:"📭",empty_search:"🔍",onboard_welcome:"👋",onboard_step:"📋",permission:"🔐",cancel:"🚪",banner:"📢"};
    const isOnboard=sid.startsWith("onboard");
    const isEmpty=sid.startsWith("empty");
    const isCancel=sid==="cancel";
    return<div style={{height:"100%",display:"flex",flexDirection:"column"}}>
      {isOnboard?<ProgressDots step={sid==="onboard_welcome"?0:1} total={3}/>:<NavBar title={isCancel?"Account":isEmpty?"":undefined} back={isCancel||isEmpty}/>}
      <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:ph?24:40}}>
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
      </div>
      {(isEmpty||isCancel)&&<TabBar/>}
    </div>;
  })();

  const fH=ph?600:420;
  return<div style={{width:ph?310:"100%",height:fH,background:T.alt,borderRadius:ph?30:11,border:ph?`7px solid ${T.text}`:`1px solid ${T.border}`,overflow:"hidden",position:"relative",margin:ph?"0 auto":0,boxShadow:ph?"0 10px 50px rgba(0,0,0,0.08)":"0 3px 16px rgba(0,0,0,0.03)"}}>
    {ph&&<div style={{height:32,background:sid==="notif"?"transparent":T.alt,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 18px",fontSize:11,fontWeight:600,color:sid==="notif"?"rgba(255,255,255,0.7)":T.text,position:sid==="notif"?"absolute":"relative",top:0,left:0,right:0,zIndex:10}}>
      <span>9:41</span>
      <div style={{width:60,height:20,borderRadius:10,background:sid==="notif"?"rgba(255,255,255,0.15)":T.text,position:"absolute",top:5,left:"50%",transform:"translateX(-50%)"}}/>
      <span style={{fontSize:10}}>●● 📶 🔋</span>
    </div>}
    <div style={{height:ph?fH-39:"100%",overflow:"auto",position:"relative"}}>{content}<ExtraLayer/></div>
  </div>;
}

// ═══════════════ EXPORT HELPER ═══════════════
function exportCaseStudy(brief, ans, extras) {
  const lines = [];
  lines.push(`# UX Writing Challenge — ${brief.company?.name || "Challenge"}`);
  lines.push("");
  lines.push(`## The Brief`);
  lines.push(`**Product:** ${brief.company?.name} — ${brief.company?.desc}`);
  lines.push(`**Screen:** ${brief.screen.icon} ${brief.screen.label}`);
  lines.push("");
  lines.push(`## Problem Statement`);
  lines.push(`**Scenario:** ${brief.ctx.detail}`);
  lines.push("");
  lines.push(`**Goal:** ${brief.screen.goal}`);
  lines.push("");
  lines.push(`**On screen:** ${brief.ctx.visible}`);
  lines.push("");
  lines.push(`## Context`);
  lines.push(`- **Page:** ${brief.ctx.page}`);
  lines.push(`- **Feature:** ${brief.ctx.feature}`);
  lines.push(`- **Situation:** ${brief.ctx.detail}`);
  lines.push(`- **What's visible:** ${brief.ctx.visible}`);
  lines.push("");
  lines.push(`## My Response`);
  brief.screen.components.forEach(k => {
    const m = COMP[k];
    if (m && ans[k]) lines.push(`- **${m.label}:** ${ans[k]}`);
  });
  if (extras?.length) {
    lines.push("");
    lines.push("### Additional Components");
    extras.forEach(e => {
      const c = EXTRAS.find(x => x.id === e.type);
      if (c && e.value) lines.push(`- **${c.field.label}:** ${e.value}`);
    });
  }
  lines.push("");
  lines.push(`---`);
  lines.push(`*Generated with Writer's Room*`);
  return lines.join("\n");
}

function exportScreenshot(brief, ans, extras, isDark) {
  const t = isDark ? {bg:"#131315",card:"#1C1C20",alt:"#222228",border:"#333339",text:"#E8E6E1",sub:"#9A9890",muted:"#6B6860",accent:"#E05A3A",aS:"rgba(224,90,58,0.1)",aB:"rgba(224,90,58,0.22)",ok:"#4ADE80"} : {bg:"#FAF9F7",card:"#FFFFFF",alt:"#F2F1ED",border:"#E4E2DC",text:"#1A1A1A",sub:"#6B6860",muted:"#9C9A93",accent:"#C7432B",aS:"rgba(199,67,43,0.07)",aB:"rgba(199,67,43,0.18)",ok:"#2D7A4F"};
  const esc = s => (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const comps = brief.screen.components.map(k => {
    const m = COMP[k]; if (!m) return "";
    const v = esc(ans[k]||"");
    return `<div style="margin-bottom:16px"><div style="font-size:11px;font-weight:600;color:${t.muted};text-transform:uppercase;letter-spacing:0.05em;font-family:'IBM Plex Mono',monospace;margin-bottom:4px">${esc(m.label)}</div><div style="font-size:15px;color:${t.text};line-height:1.55;padding:10px 14px;border-radius:8px;background:${t.alt};border:1px solid ${t.border}">${v||'<em style="color:'+t.muted+'">(empty)</em>'}</div></div>`;
  }).join("");
  const extHtml = (extras||[]).map(e => {
    const c = EXTRAS.find(x=>x.id===e.type); if(!c||!e.value) return "";
    return `<div style="margin-bottom:12px"><div style="font-size:11px;font-weight:600;color:${t.muted};text-transform:uppercase;letter-spacing:0.05em;font-family:'IBM Plex Mono',monospace;margin-bottom:3px">${esc(c.field.label)}</div><div style="font-size:14px;color:${t.text};padding:8px 12px;border-radius:6px;background:${t.alt};border:1px solid ${t.border}">${esc(e.value)}</div></div>`;
  }).join("");
  const chip = (txt) => `<span style="display:inline-block;font-size:11px;font-weight:600;padding:4px 10px;border-radius:5px;background:${t.alt};color:${t.sub};letter-spacing:0.04em;text-transform:uppercase;font-family:'IBM Plex Mono',monospace;margin-right:6px;margin-bottom:6px">${txt}</span>`;
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${esc(brief.company?.name)} — ${esc(brief.screen.label)} | Writer's Room</title>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:${t.bg};font-family:'Outfit',sans-serif;color:${t.text};padding:48px 20px}
.card{max-width:680px;margin:0 auto;background:${t.card};border-radius:16px;border:1px solid ${t.border};overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,${isDark?"0.3":"0.06"})}
@media print{body{padding:0}.card{box-shadow:none;border:none;border-radius:0}}
</style></head><body>
<div class="card">
  <div style="padding:28px 32px 20px;border-bottom:1px solid ${t.border}">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
      <div style="width:36px;height:36px;border-radius:8px;background:${t.text};color:${t.bg};display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;font-family:'Newsreader',Georgia,serif">${esc((brief.company?.name||"W")[0])}</div>
      <div>
        <div style="font-size:20px;font-weight:700;font-family:'Newsreader',Georgia,serif">${esc(brief.company?.name)}</div>
        <div style="font-size:12px;color:${t.sub};font-style:italic">${esc(brief.company?.desc)}</div>
      </div>
    </div>
    <div style="margin-bottom:10px">${chip(brief.niche.icon+" "+brief.niche.label)}${chip(brief.screen.icon+" "+brief.screen.label)}${chip("🎨 "+brief.tone.label)}${chip("👤 "+brief.persona.label+" (~"+brief.persona.age+")")}</div>
    <div style="padding:12px 14px;border-radius:8px;background:${t.aS};border:1px solid ${t.aB};font-size:13px;line-height:1.55;color:${t.sub}"><strong style="color:${t.text}">Scenario:</strong> ${esc(brief.ctx.detail)}<br><br><strong style="color:${t.text}">Goal:</strong> ${esc(brief.screen.goal)}</div>
  </div>
  <div style="padding:24px 32px;display:grid;grid-template-columns:1fr 1fr;gap:10px;border-bottom:1px solid ${t.border}">
    <div><div style="font-size:10px;color:${t.muted};font-weight:600;letter-spacing:0.05em;text-transform:uppercase;font-family:'IBM Plex Mono',monospace">PAGE</div><div style="font-size:13px;margin-top:3px">${esc(brief.ctx.page)}</div></div>
    <div><div style="font-size:10px;color:${t.muted};font-weight:600;letter-spacing:0.05em;text-transform:uppercase;font-family:'IBM Plex Mono',monospace">FEATURE</div><div style="font-size:13px;margin-top:3px">${esc(brief.ctx.feature)}</div></div>
    <div style="grid-column:span 2"><div style="font-size:10px;color:${t.muted};font-weight:600;letter-spacing:0.05em;text-transform:uppercase;font-family:'IBM Plex Mono',monospace">SITUATION</div><div style="font-size:13px;margin-top:3px;line-height:1.5">${esc(brief.ctx.detail)}</div></div>
  </div>
  <div style="padding:24px 32px">
    <div style="font-size:12px;font-weight:700;color:${t.accent};text-transform:uppercase;letter-spacing:0.06em;font-family:'IBM Plex Mono',monospace;margin-bottom:16px">✍️ My Copy</div>
    ${comps}${extHtml}
  </div>
  <div style="padding:14px 32px;background:${t.alt};border-top:1px solid ${t.border};display:flex;justify-content:space-between;align-items:center">
    <span style="font-size:11px;color:${t.muted};font-weight:500">Writer's Room — UX Writing Practice</span>
    <span style="font-size:11px;color:${t.muted}">${new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}</span>
  </div>
</div>
<div style="text-align:center;margin-top:24px;font-size:12px;color:${t.muted}">Right-click → Save as PDF, or take a screenshot to share</div>
</body></html>`;
  const w = window.open("","_blank");
  if (w) { w.document.write(html); w.document.close(); }
}

// ═══════════════ MAIN APP ═══════════════
// ═══════════════ SAFE STORAGE (works in artifact sandbox + real browsers) ═══════════════
const _mem = {};
const LS = {
  get: (k) => { try { return window.localStorage.getItem(k); } catch(e) { return _mem[k] || null; } },
  set: (k,v) => { try { window.localStorage.setItem(k,v); } catch(e) {} _mem[k]=v; },
  del: (k) => { try { window.localStorage.removeItem(k); } catch(e) {} delete _mem[k]; },
};

const V = { GATE:0, BROWSE:1, CHALLENGE:2 };


export default function App() {
  const [dark, setDarkState] = useState(() => {
    try { return window.localStorage.getItem("wl_dk") === "1"; } catch(e) { return false; }
  });
  setTheme(dark);

  const [view, setView] = useState(V.GATE);
  const [email, setEmail] = useState("");
  const [used, setUsed] = useState(0);
  const [uDate, setUDate] = useState("");
  const [mode, setMode] = useState("quick");
  const [sN, setSN] = useState(null);
  const [sT, setST] = useState(null);
  const [sS, setSS] = useState(null);
  const [sP, setSP] = useState(null);
  const [brief, setBrief] = useState(null);
  const [ans, setAns] = useState({});
  const [extras, setExtras] = useState([]);
  const [dev, setDev] = useState("phone");
  const [done, setDone] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [checks, setChecks] = useState({});
  const [copied, setCopied] = useState(false);
  const [hist, setHist] = useState([]);
  const [briefOpen, setBriefOpen] = useState(true);
  const [showAllHist, setShowAllHist] = useState(false);
  const [showMockup, setShowMockup] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [showFeedback, setShowFeedback] = useState(false);
  const [fbText, setFbText] = useState("");

  const LIM = 5;

  const toggleDark = () => {
    const next = !dark;
    setDarkState(next);
    setTheme(next);
    try { window.localStorage.setItem("wl_dk", next ? "1" : "0"); } catch(e) {}
  };

  // Keyboard: Cmd+Enter to complete
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && view === V.CHALLENGE && brief && !done) {
        const allGood = brief.screen.components.every(k => {
          const m = COMP[k]; if (!m) return false;
          const val = (ans[k]||"").trim();
          return val.length >= Math.ceil(m.max * 0.3) && val.length <= m.max;
        });
        if (allGood) { setDone(true); saveH(brief); setShowReview(true); }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  useEffect(() => {
    try {
      const e = LS.get("wl_email");
      const ac = LS.get("wl_ac");
      if (e && ac === "1") { setEmail(e); setView(V.BROWSE); }
      const d = JSON.parse(LS.get("wl_d") || "null");
      const td = new Date().toISOString().split("T")[0];
      if (d?.date === td && d?.email === (e||"")) { setUsed(d.c); setUDate(td); } else setUDate(td);
      setHist(JSON.parse(LS.get("wl_h") || "[]"));
    } catch (e) {}
  }, []);

  const [alphaCode, setAlphaCode] = useState("");
  const [gateError, setGateError] = useState("");
  const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim());
  const ALPHA_PASS = "writers-room";
  const gate = () => {
    if (!validEmail(email)) return;
    if (alphaCode.trim().toLowerCase() !== ALPHA_PASS) { setGateError("Invalid alpha code. This is an invite-only alpha."); return; }
    setGateError("");
    LS.set("wl_email", email); LS.set("wl_ac", "1"); setView(V.BROWSE);
  };
  const bump = () => {
    const td = new Date().toISOString().split("T")[0];
    const n = (uDate === td) ? used + 1 : 1;
    setUsed(n); setUDate(td);
    LS.set("wl_d", JSON.stringify({ date: td, c: n, email }));
  };
  const canGo = used < LIM;
  const hasUnsavedWork = view === V.CHALLENGE && !done && brief && brief.screen.components.some(k => (ans[k]||"").trim().length > 0);
  const safeNav = (fn) => { if (hasUnsavedWork && !window.confirm("You have unsaved work. Leave anyway?")) return; fn(); };
  const saveH = b => {
    const e = { id: Date.now(), brief: b, answers: { ...ans }, extras: [...extras], date: new Date().toISOString() };
    const h = [e, ...hist].slice(0, 50);
    setHist(h); LS.set("wl_h", JSON.stringify(h));
  };
  const rand = () => {
    setSN(NICHES[~~(Math.random()*NICHES.length)].id);
    setST(TONES[~~(Math.random()*TONES.length)].id);
    setSS(SCREENS[~~(Math.random()*SCREENS.length)].id);
    setSP(PERSONAS[~~(Math.random()*PERSONAS.length)].id);
  };
  const gen = (n,t,s,p) => {
    if (!n||!t||!s||!p) return;
    setGenerating(true);
    setTimeout(() => {
      const b = generateBrief(n,t,s,p,NICHES,TONES,SCREENS,PERSONAS);
      setBrief(b); setAns({}); setExtras([]); setDone(false); setShowReview(false); setChecks({}); setCopied(false); setShowMockup(false); setBriefOpen(true);
      bump(); setView(V.CHALLENGE); setGenerating(false);
    }, 400);
  };
  const quickStart = () => {
    const n=NICHES[~~(Math.random()*NICHES.length)].id, t=TONES[~~(Math.random()*TONES.length)].id;
    const s=SCREENS[~~(Math.random()*SCREENS.length)].id, p=PERSONAS[~~(Math.random()*PERSONAS.length)].id;
    setSN(n); setST(t); setSS(s); setSP(p); gen(n,t,s,p);
  };
  const clearAll = () => {
    if (Object.values(ans).some(v => v && v.trim()) && !window.confirm("Clear all fields?")) return;
    setAns({}); setExtras([]);
  };
  const logout = () => { LS.del("wl_email"); LS.del("wl_ac"); setEmail(""); setAlphaCode(""); setView(V.GATE); };
  const goBack = () => safeNav(() => { setView(V.BROWSE); });
  const newChallenge = () => { setView(V.BROWSE); setBrief(null); setAns({}); setExtras([]); setDone(false); setShowReview(false); setShowMockup(false); };

  const DarkBtn = () => <button onClick={toggleDark} title={dark?"Light mode":"Dark mode"} style={{background:"none",border:"none",fontSize:16,cursor:"pointer",padding:4,lineHeight:1}}>{dark?"☀️":"🌙"}</button>;
  const Head = () => <><style>{getCSS()}</style><link href={FONTS} rel="stylesheet" /></>;
  const FEEDBACK_EMAIL = "atulramdhyani.work@gmail.com"; // ← Change this to your email
  const feedbackUI = <>
    <button onClick={()=>{setShowFeedback(true);setFbText("");}} style={{position:"fixed",bottom:20,right:20,zIndex:200,padding:"10px 16px",borderRadius:10,background:T.text,color:T.bg,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Outfit',sans-serif",boxShadow:"0 4px 16px rgba(0,0,0,0.15)",transition:"transform 0.15s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>💬 Feedback</button>
    {showFeedback && <div style={{position:"fixed",inset:0,zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.4)",padding:20}} onClick={e=>{if(e.target===e.currentTarget)setShowFeedback(false)}}>
      <div style={{background:T.card,borderRadius:14,padding:24,maxWidth:400,width:"100%",border:`1px solid ${T.border}`,boxShadow:"0 8px 32px rgba(0,0,0,0.12)",animation:"fu 0.3s ease"}}>
        <p style={{fontSize:18,fontWeight:600,marginBottom:4}}>How's the alpha?</p>
        <p style={{fontSize:13,color:T.sub,marginBottom:14}}>Bugs, ideas, confusion, praise — all welcome. Your feedback shapes what we build next.</p>
        <textarea value={fbText} onChange={e=>setFbText(e.target.value)} placeholder="What's on your mind?" rows={4} style={{width:"100%",padding:"10px 14px",borderRadius:8,fontSize:14,fontFamily:"'Outfit',sans-serif",lineHeight:1.6,resize:"vertical",background:T.alt,border:`1.5px solid ${T.border}`,color:T.text,outline:"none",marginBottom:12}} autoFocus />
        <div style={{display:"flex",gap:8}}>
          <Btn v="accent" disabled={!fbText.trim()} onClick={()=>{
            const page = view===V.CHALLENGE&&brief ? brief.company?.name+" — "+brief.screen.label : "Browse";
            const subject = encodeURIComponent("[Writer's Room] Alpha feedback");
            const body = encodeURIComponent(`${fbText}\n\n---\nFrom: ${email}\nPage: ${page}\nDate: ${new Date().toLocaleString()}`);
            window.open(`mailto:${FEEDBACK_EMAIL}?subject=${subject}&body=${body}`,"_self");
            setShowFeedback(false);
          }} style={{flex:1}}>Send feedback</Btn>
          <Btn v="ghost" onClick={()=>setShowFeedback(false)}>Cancel</Btn>
        </div>
      </div>
    </div>}
  </>;

  // ═════ GENERATING TRANSITION ═════
  if (generating) return (
    <div style={{fontFamily:"'Outfit',sans-serif",color:T.text,background:T.bg,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16}}>
      <Head/>
      <div style={{width:36,height:36,border:`3px solid ${T.border}`,borderTopColor:T.accent,borderRadius:"50%",animation:"sp 0.8s linear infinite"}}/>
      <p style={{fontSize:15,color:T.sub}}>Building your brief…</p>
    </div>
  );

  // ═════ GATE ═════
  if (view === V.GATE) return (
    <div style={{fontFamily:"'Outfit',sans-serif",color:T.text,background:T.bg,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <Head/>
      <div style={{position:"absolute",top:16,right:16}}><DarkBtn/></div>
      <div style={{maxWidth:420,width:"100%",animation:"fu 0.5s ease"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:32}}>
          <div style={{width:42,height:42,borderRadius:10,background:T.text,color:T.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,fontWeight:700,fontFamily:"'Newsreader',Georgia,serif"}}>W</div>
          <span style={{fontSize:18,fontWeight:600}}>Writer's Room</span>
        </div>
        <h1 style={{fontFamily:"'Newsreader',Georgia,serif",fontSize:36,fontWeight:500,lineHeight:1.15,marginBottom:10}}>Practice the words<br/><em style={{color:T.accent}}>users actually read.</em></h1>
        <p style={{color:T.sub,fontSize:15,lineHeight:1.6,marginBottom:10}}>Realistic UX writing challenges with fictional company briefs, live mockup previews, and a self-review rubric. Build your portfolio or sharpen your craft.</p>
        <p style={{color:T.muted,fontSize:13,marginBottom:20}}>5 challenges per day during alpha. Enter your email and alpha code to start.</p>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <input placeholder="you@email.com" type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();const next=e.target.parentElement.querySelector('input[type=text]');if(next)next.focus();}}}
            style={{padding:"13px 16px",borderRadius:8,border:`1.5px solid ${T.border}`,fontSize:15,fontFamily:"inherit",outline:"none",background:T.card,color:T.text}} />
          <input placeholder="Alpha code" type="text" value={alphaCode} onChange={e=>{setAlphaCode(e.target.value);setGateError("");}} onKeyDown={e=>e.key==="Enter"&&gate()}
            style={{padding:"13px 16px",borderRadius:8,border:`1.5px solid ${gateError?T.err:T.border}`,fontSize:15,fontFamily:"inherit",outline:"none",background:T.card,color:T.text}} />
          {gateError && <p style={{fontSize:13,color:T.err}}>{gateError}</p>}
          <Btn disabled={!validEmail(email)||!alphaCode.trim()} onClick={gate} style={{alignSelf:"flex-start"}}>Start →</Btn>
        </div>
      </div>
    </div>
  );

  // ═════ BROWSE ═════
  if (view === V.BROWSE) return (
    <div style={{fontFamily:"'Outfit',sans-serif",color:T.text,background:T.bg,minHeight:"100vh"}}>
      <Head/>
      <div style={{borderBottom:`1px solid ${T.border}`,padding:"11px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",background:T.card,position:"sticky",top:0,zIndex:100,flexWrap:"wrap",gap:8}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:30,height:30,borderRadius:7,background:T.text,color:T.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,fontFamily:"'Newsreader',Georgia,serif"}}>W</div>
          <span style={{fontSize:15,fontWeight:600}}>Writer's Room</span>
          <Tag color={T.accent} bg={T.aS}>Alpha</Tag>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <DarkBtn/>
          <span title={`${used} of ${LIM} challenges used today. Resets at midnight.`} style={{cursor:"help"}}><Tag color={canGo?T.ok:T.err} bg={canGo?T.okS:T.errS}>{used}/{LIM} today</Tag></span>
          <button onClick={logout} style={{background:"none",border:"none",fontSize:13,color:T.muted,cursor:"pointer",fontFamily:"inherit"}}>{email.split("@")[0]} · Sign out</button>
        </div>
      </div>

      <div style={{maxWidth:800,margin:"0 auto",padding:"40px 22px"}}>
        {canGo ? (
          <div style={{textAlign:"center",padding:"48px 24px",background:T.card,borderRadius:16,border:`1px solid ${T.border}`,marginBottom:32,animation:"fu 0.4s ease"}}>
            <h1 style={{fontFamily:"'Newsreader',Georgia,serif",fontSize:30,fontWeight:500,marginBottom:8}}>Ready to practice?</h1>
            <p style={{color:T.sub,fontSize:15,marginBottom:24,maxWidth:440,margin:"0 auto 24px"}}>We'll generate a realistic brief from a fictional company — complete with context, constraints, and a live mockup to write into.</p>
            <Btn v="accent" onClick={quickStart} style={{fontSize:16,padding:"14px 36px"}}>🎲 Generate a random challenge</Btn>
            {hist.length === 0 && <p style={{color:T.muted,fontSize:12,marginTop:14,lineHeight:1.5}}>You'll get a fictional company brief, a live mockup that updates as you type, and a self-review rubric when you're done.</p>}
            <div style={{marginTop:14}}>
              <button onClick={()=>setMode(mode==="custom"?"quick":"custom")} style={{background:"none",border:"none",fontSize:13,color:T.sub,cursor:"pointer",fontFamily:"inherit",textDecoration:"underline"}}>{mode==="custom"?"Hide custom options":"Or build your own challenge →"}</button>
            </div>
          </div>
        ) : (
          <div style={{textAlign:"center",padding:"40px 24px",background:T.errS,borderRadius:16,border:"1px solid rgba(184,58,58,0.12)",marginBottom:32}}>
            <p style={{fontSize:20,fontWeight:600,marginBottom:6}}>You've used all 5 challenges today</p>
            <p style={{color:T.sub,fontSize:14}}>Come back tomorrow for 5 more. Review your completed work below.</p>
          </div>
        )}

        {/* Custom mode with descriptions */}
        {mode==="custom" && canGo && (
          <div style={{animation:"fu 0.3s ease",marginBottom:32}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:20}} className="wl-brief-grid">
              {[{l:"Product Niche",items:NICHES,sel:sN,set:setSN,r:n=>`${n.icon} ${n.label}`,dk:null},
                {l:"Tone of Voice",items:TONES,sel:sT,set:setST,r:t=>t.label,dk:t=>t.desc},
                {l:"Screen Type",items:SCREENS,sel:sS,set:setSS,r:s=>`${s.icon} ${s.label}`,dk:s=>s.goal},
                {l:"User Persona",items:PERSONAS,sel:sP,set:setSP,r:p=>p.label,dk:p=>p.d}
              ].map(dim=>(
                <div key={dim.l}>
                  <label style={{display:"block",marginBottom:8}}><Mono>{dim.l}</Mono></label>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                    {dim.items.map(item=><button key={item.id} onClick={()=>dim.set(item.id)} title={item.desc||item.d||item.goal||""} style={{padding:"6px 12px",borderRadius:6,fontSize:12,fontWeight:500,fontFamily:"inherit",cursor:"pointer",transition:"all 0.15s",background:dim.sel===item.id?T.text:T.card,color:dim.sel===item.id?T.bg:T.sub,border:`1.5px solid ${dim.sel===item.id?T.text:T.border}`}}>{dim.r(item)}</button>)}
                  </div>
                  {dim.dk && dim.sel && (()=>{const sel=dim.items.find(i=>i.id===dim.sel); return sel&&dim.dk(sel)?<p style={{fontSize:12,color:T.sub,marginTop:6,lineHeight:1.4,fontStyle:"italic"}}>{dim.dk(sel)}</p>:null;})()}
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <Btn v="secondary" onClick={rand}>🎲 Randomize</Btn>
              <Btn disabled={!sN||!sT||!sS||!sP} onClick={()=>gen(sN,sT,sS,sP)}>Generate Challenge →</Btn>
            </div>
          </div>
        )}

        {/* Progress stats — only after first completion */}
        {hist.length > 1 && (()=>{
          const screenTypes = new Set(hist.map(h=>h.brief.screen.id));
          const tones = new Set(hist.map(h=>h.brief.tone.id));
          const niches = new Set(hist.map(h=>h.brief.niche.id));
          return <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:24}} className="wl-brief-grid">
            <div style={{padding:14,borderRadius:10,background:T.card,border:`1px solid ${T.border}`,textAlign:"center"}}>
              <p style={{fontSize:24,fontWeight:700,fontFamily:"'Newsreader',Georgia,serif",color:T.accent}}>{hist.length}</p>
              <p style={{fontSize:11,color:T.muted,marginTop:2}}>Challenges</p>
            </div>
            <div style={{padding:14,borderRadius:10,background:T.card,border:`1px solid ${T.border}`,textAlign:"center"}}>
              <p style={{fontSize:24,fontWeight:700,fontFamily:"'Newsreader',Georgia,serif"}}>{screenTypes.size}<span style={{fontSize:13,color:T.muted}}>/{SCREENS.length}</span></p>
              <p style={{fontSize:11,color:T.muted,marginTop:2}}>Screen types</p>
            </div>
            <div style={{padding:14,borderRadius:10,background:T.card,border:`1px solid ${T.border}`,textAlign:"center"}}>
              <p style={{fontSize:24,fontWeight:700,fontFamily:"'Newsreader',Georgia,serif"}}>{tones.size}<span style={{fontSize:13,color:T.muted}}>/{TONES.length}</span></p>
              <p style={{fontSize:11,color:T.muted,marginTop:2}}>Tones used</p>
            </div>
            <div style={{padding:14,borderRadius:10,background:T.card,border:`1px solid ${T.border}`,textAlign:"center"}}>
              <p style={{fontSize:24,fontWeight:700,fontFamily:"'Newsreader',Georgia,serif"}}>{niches.size}<span style={{fontSize:13,color:T.muted}}>/{NICHES.length}</span></p>
              <p style={{fontSize:11,color:T.muted,marginTop:2}}>Niches explored</p>
            </div>
          </div>;
        })()}

        {/* History with previews */}
        {hist.length > 0 && (
          <div>
            <Mono>Completed challenges</Mono>
            <div style={{marginTop:10}}>
              {hist.slice(0,showAllHist?50:5).map(h => {
                const firstKey = h.brief.screen.components[0];
                const preview = h.answers?.[firstKey] || "";
                return (
                  <button key={h.id} onClick={()=>{setBrief(h.brief);setAns(h.answers);setExtras(h.extras||[]);setDone(true);setShowReview(false);setChecks({});setCopied(false);setShowMockup(false);setBriefOpen(true);setView(V.CHALLENGE)}}
                    style={{textAlign:"left",padding:"12px 14px",borderRadius:9,background:T.card,border:`1px solid ${T.border}`,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s",width:"100%",marginBottom:6}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor=T.accent}
                    onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div>
                        <span style={{fontSize:14,fontWeight:600}}>{h.brief.company?.name}</span>
                        <span style={{fontSize:13,color:T.sub,marginLeft:8}}>{h.brief.screen.icon} {h.brief.screen.label}</span>
                      </div>
                      <span style={{fontSize:11,color:T.muted}}>{new Date(h.date).toLocaleDateString()}</span>
                    </div>
                    {preview && <p style={{fontSize:12,color:T.muted,marginTop:4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>"{preview}"</p>}
                  </button>
                );
              })}
            </div>
            {hist.length > 5 && <button onClick={()=>setShowAllHist(!showAllHist)} style={{background:"none",border:"none",fontSize:13,color:T.sub,cursor:"pointer",fontFamily:"inherit",textDecoration:"underline",marginTop:8,display:"block"}}>{showAllHist?`Show less`:`Show all ${hist.length} challenges`}</button>}
          </div>
        )}
      </div>
      {feedbackUI}
    </div>
  );

  // ═════ CHALLENGE ═════
  if (view === V.CHALLENGE && brief) {
    const rubric = RUBRICS[brief.screen.id] || [];
    return (
      <div style={{fontFamily:"'Outfit',sans-serif",color:T.text,background:T.bg,minHeight:"100vh"}}>
        <Head/>
        {/* Topbar */}
        <div style={{borderBottom:`1px solid ${T.border}`,padding:"9px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",background:T.card,position:"sticky",top:0,zIndex:100,flexWrap:"wrap",gap:6}}>
          <button onClick={goBack} style={{background:"none",border:"none",color:T.sub,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>← Back</button>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <DarkBtn/>
            <div style={{display:"flex",borderRadius:6,overflow:"hidden",border:`1.5px solid ${T.border}`}}>
              {[{k:"phone",l:"📱"},{k:"desktop",l:"🖥"}].map(d=><button key={d.k} onClick={()=>setDev(d.k)} style={{padding:"5px 10px",fontSize:13,fontFamily:"inherit",cursor:"pointer",background:dev===d.k?T.text:T.card,color:dev===d.k?T.bg:T.sub,border:"none",transition:"all 0.15s"}}>{d.l}</button>)}
            </div>
            <span title={`${used} of ${LIM} challenges used today. Resets at midnight.`} style={{cursor:"help"}}><Tag>{used}/{LIM}</Tag></span>
          </div>
        </div>

        {/* Brief — restructured: Product → User → Component → Problem Statement */}
        <div style={{background:T.alt,borderBottom:`1px solid ${T.border}`,padding:briefOpen?"20px 22px":"12px 22px",transition:"padding 0.2s"}}>
          <div style={{maxWidth:920,margin:"0 auto"}}>
            {/* Product header — always visible, click to toggle */}
            <div style={{display:"flex",alignItems:"center",gap:12,cursor:"pointer",flexWrap:"wrap"}} onClick={()=>setBriefOpen(!briefOpen)}>
              <div style={{width:38,height:38,borderRadius:9,background:T.text,color:T.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:700,fontFamily:"'Newsreader',Georgia,serif"}}>{(brief.company?.name||"W")[0]}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:18,fontWeight:700,fontFamily:"'Newsreader',Georgia,serif"}}>{brief.company?.name}</div>
                <div style={{fontSize:12,color:T.sub,fontStyle:"italic"}}>{brief.company?.desc}</div>
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
                <span style={{fontSize:11,padding:"3px 9px",borderRadius:5,background:T.card,border:`1px solid ${T.border}`,color:T.sub,fontWeight:600,fontFamily:"'IBM Plex Mono',monospace",textTransform:"uppercase",letterSpacing:"0.04em"}}>{brief.niche.icon} {brief.niche.label}</span>
                <span style={{fontSize:11,padding:"3px 9px",borderRadius:5,background:T.card,border:`1px solid ${T.border}`,color:T.sub,fontWeight:600,fontFamily:"'IBM Plex Mono',monospace",textTransform:"uppercase",letterSpacing:"0.04em"}}>{brief.screen.icon} {brief.screen.label}</span>
                <span style={{fontSize:14,color:T.muted,marginLeft:4}}>{briefOpen?"▲":"▼"}</span>
              </div>
            </div>

            {briefOpen && <div style={{marginTop:14,animation:"fu 0.25s ease"}}>

            {/* 3-column: Persona | Tone | Component */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}} className="wl-brief-grid">
              <div style={{padding:10,borderRadius:8,background:T.card,border:`1px solid ${T.border}`}}>
                <Mono>👤 User persona</Mono>
                <p style={{fontSize:13,fontWeight:600,color:T.text,marginTop:4}}>{brief.persona.label} <span style={{fontWeight:400,color:T.muted}}>(~{brief.persona.age})</span></p>
                <p style={{fontSize:12,color:T.sub,marginTop:2,lineHeight:1.4}}>{brief.persona.d}</p>
              </div>
              <div style={{padding:10,borderRadius:8,background:T.card,border:`1px solid ${T.border}`}}>
                <Mono>🎨 Tone of voice</Mono>
                <p style={{fontSize:13,fontWeight:600,color:T.text,marginTop:4}}>{brief.tone.label}</p>
                <p style={{fontSize:12,color:T.sub,marginTop:2,lineHeight:1.4}}>{brief.tone.desc}</p>
              </div>
              <div style={{padding:10,borderRadius:8,background:T.card,border:`1px solid ${T.border}`}}>
                <Mono>✍️ Write these {brief.screen.components.length} parts</Mono>
                <div style={{marginTop:6}}>
                  {brief.screen.components.map(k => { const m=COMP[k]; if(!m)return null; return <div key={k} style={{fontSize:12,color:T.text,marginBottom:3}}><strong>{m.label}</strong> <span style={{color:T.muted,fontSize:10}}>({m.max} chars)</span></div>; })}
                </div>
              </div>
            </div>

            {/* Problem statement — 3 structured sections */}
            <div style={{padding:16,borderRadius:10,background:T.card,border:`1.5px solid ${T.aB}`}}>
              <div style={{marginBottom:14}}>
                <Mono>📍 The scenario</Mono>
                <p style={{marginTop:6,fontSize:14,color:T.text,lineHeight:1.65}}>{brief.ctx.detail}</p>
              </div>
              <div style={{borderTop:`1px solid ${T.border}`,paddingTop:12,marginBottom:14}}>
                <Mono>🎯 What your copy needs to do</Mono>
                <p style={{marginTop:6,fontSize:14,color:T.text,lineHeight:1.65}}>{brief.screen.goal}</p>
              </div>
              <div style={{borderTop:`1px solid ${T.border}`,paddingTop:12}}>
                <Mono>🖥 What's on screen</Mono>
                <p style={{marginTop:6,fontSize:13,color:T.sub,lineHeight:1.55}}>{brief.ctx.visible}</p>
              </div>
            </div>
            </div>}
          </div>
        </div>

        {/* Mobile mockup toggle */}
        <style>{`@media(max-width:768px){.wl-mob-show{display:block!important}.wl-form-hide{display:none!important}.wl-mock-hide{display:none!important}}`}</style>
        <div style={{display:"none",padding:"10px 22px",background:T.card,borderBottom:`1px solid ${T.border}`,textAlign:"center"}} className="wl-mob-show">
          <button onClick={()=>setShowMockup(!showMockup)} style={{background:"none",border:`1px solid ${T.border}`,borderRadius:6,padding:"6px 16px",fontSize:13,cursor:"pointer",fontFamily:"inherit",color:T.sub}}>{showMockup?"✏️ Back to writing":"👁 Show preview"}</button>
        </div>

        {/* Form + Mockup grid */}
        <div style={{display:"grid",gridTemplateColumns:dev==="phone"?"1fr 370px":"1fr 1fr",maxWidth:1160,margin:"0 auto",minHeight:"calc(100vh - 240px)"}} className="wl-grid">
          {/* Form */}
          <div style={{padding:"24px 24px 80px",borderRight:`1px solid ${T.border}`,overflowY:"auto"}} className={showMockup?"wl-form-hide":""}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <Mono>Required copy</Mono>
              {!done && <button onClick={clearAll} style={{background:"none",border:"none",fontSize:12,color:T.muted,cursor:"pointer",fontFamily:"inherit",textDecoration:"underline"}}>Clear all</button>}
            </div>
            <div style={{marginTop:12}}>
              {brief.screen.components.map(k => { const m=COMP[k]; if(!m)return null; return <Inp key={k} label={m.label} max={m.max} value={ans[k]} onChange={v=>setAns({...ans,[k]:v})} ph={m.ph} rows={m.rows} disabled={done}/>; })}
            </div>

            {extras.length > 0 && <>
              <Mono>Added components</Mono>
              <div style={{marginTop:8}}>
                {extras.map((ext,i) => { const c=EXTRAS.find(x=>x.id===ext.type); if(!c)return null; return <div key={i} style={{position:"relative",animation:"si 0.3s ease"}}><Inp label={`${c.icon} ${c.field.label}`} max={c.field.max} value={ext.value} onChange={v=>{const cp=[...extras];cp[i]={...cp[i],value:v};setExtras(cp);}} ph={c.field.ph} rows={c.field.rows} disabled={done}/>{!done&&<button onClick={()=>setExtras(extras.filter((_,j)=>j!==i))} style={{position:"absolute",top:0,right:0,background:"none",border:"none",color:T.muted,cursor:"pointer",fontSize:15,padding:3}}>×</button>}</div>; })}
              </div>
            </>}

            {!done && <div style={{marginTop:16}}>
              <Mono>+ Add component</Mono>
              <div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:8}}>
                {EXTRAS.map(ec=><button key={ec.id} onClick={()=>setExtras([...extras,{type:ec.id,value:""}])} style={{padding:"5px 11px",borderRadius:6,fontSize:12,fontWeight:500,fontFamily:"inherit",cursor:"pointer",background:T.card,color:T.sub,border:`1px dashed ${T.border}`,transition:"all 0.15s"}}>{ec.icon} {ec.label}</button>)}
              </div>
            </div>}

            {/* Progress + actions */}
            {(()=>{
              const fields=brief.screen.components.map(k=>{const m=COMP[k];if(!m)return null;const val=(ans[k]||"").trim();const min=Math.ceil(m.max*0.3);const over=val.length>m.max;const good=val.length>=min&&!over;return{k,label:m.label,good,over,len:val.length,max:m.max,min,short:val.length>0&&val.length<min};}).filter(Boolean);
              const allGood=fields.every(f=>f.good);const anyOver=fields.some(f=>f.over);const filledCount=fields.filter(f=>f.good).length;
              return <>
                <div style={{marginTop:20,padding:12,borderRadius:8,background:T.alt,border:`1px solid ${T.border}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                    <Mono>{filledCount}/{fields.length} fields ready</Mono>
                    {anyOver&&<span style={{fontSize:11,color:T.err,fontWeight:600}}>Over limit</span>}
                  </div>
                  <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                    {fields.map(f=><span key={f.k} style={{fontSize:11,padding:"3px 8px",borderRadius:5,fontWeight:500,background:f.good?T.okS:f.over?T.errS:f.short?"rgba(146,64,14,0.08)":T.card,color:f.good?T.ok:f.over?T.err:f.short?"#92400E":T.muted,border:`1px solid ${f.good?"rgba(45,122,79,0.15)":f.over?"rgba(184,58,58,0.15)":f.short?"rgba(146,64,14,0.15)":T.border}`}}>{f.good?"✓":"○"} {f.label} <span style={{opacity:0.7}}>{f.len}/{f.max}</span></span>)}
                  </div>
                </div>
                <div style={{marginTop:16,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
                  {!done?<><Btn v="accent" disabled={!allGood} onClick={()=>{setDone(true);saveH(brief);setShowReview(true)}} title="⌘+Enter">✓ Mark Complete{allGood?"":" ("+( fields.length-filledCount)+" remaining)"}</Btn><span style={{fontSize:11,color:T.muted}}>⌘+Enter</span></>
                  :<div style={{padding:"11px 18px",borderRadius:8,background:T.okS,border:"1px solid rgba(45,122,79,0.12)",color:T.ok,fontSize:14,fontWeight:600}}>✓ Complete</div>}
                </div>
              </>;
            })()}

            {/* Post-completion */}
            {done && (
              <div style={{marginTop:28,animation:"fu 0.4s ease"}}>
                <div style={{padding:18,borderRadius:12,background:T.card,border:`1px solid ${T.border}`,marginBottom:16}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:showReview?12:0,cursor:"pointer"}} onClick={()=>setShowReview(!showReview)}>
                    <Mono>📋 Self-review checklist</Mono>
                    <span style={{fontSize:12,color:T.sub}}>{showReview?"▼":"▶"}</span>
                  </div>
                  {showReview && rubric.map((q,i)=><label key={i} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"8px 0",borderTop:i>0?`1px solid ${T.alt}`:"none",cursor:"pointer",fontSize:13,color:T.text,lineHeight:1.5}}><input type="checkbox" checked={!!checks[i]} onChange={()=>setChecks({...checks,[i]:!checks[i]})} style={{marginTop:3,accentColor:T.accent}}/>{q}</label>)}
                </div>
                <Btn v="accent" style={{width:"100%",marginBottom:8}} onClick={()=>exportScreenshot(brief,ans,extras,dark)}>
                  📸 Export as portfolio card
                </Btn>
                <Btn v="secondary" style={{width:"100%",marginBottom:12}} onClick={()=>{const md=exportCaseStudy(brief,ans,extras);navigator.clipboard.writeText(md).then(()=>setCopied(true)).catch(()=>{});}}>
                  {copied?"✓ Copied to clipboard!":"📋 Copy as Markdown"}
                </Btn>
                <Btn v="secondary" style={{width:"100%",textAlign:"center",justifyContent:"center"}} onClick={newChallenge}>🎲 Generate another challenge</Btn>
              </div>
            )}
          </div>

          {/* Mockup */}
          <div style={{padding:24,display:"flex",alignItems:"flex-start",justifyContent:"center",background:T.bg,position:"sticky",top:130,alignSelf:"start"}} className={showMockup?"":"wl-mock-hide"}>
            <style>{`@media(min-width:769px){.wl-mock-hide{display:flex!important}}`}</style>
            <div style={{width:"100%"}}>
              <p style={{textAlign:"center",marginBottom:14}}><Mono>Live Preview — {dev==="phone"?"Mobile":"Desktop"}</Mono></p>
              {!done && Object.values(ans).every(v=>!v) && <p style={{textAlign:"center",fontSize:11,color:T.muted,marginBottom:10,marginTop:-8}}>Updates live as you type ↑</p>}
              <Mockup sid={brief.screen.id} ans={ans} extras={extras} dev={dev} company={brief.company?.name||"App"} />
            </div>
          </div>
        </div>
        {feedbackUI}
      </div>
    );
  }

  return null;
}
