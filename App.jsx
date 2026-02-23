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
  // Pick a random company from this niche — its vocab drives the context
  const companyPool = COMPANIES[nicheId] || COMPANIES.saas;
  const company = companyPool[Math.floor(Math.random()*companyPool.length)];
  const templates = CTX_TEMPLATES[screenId] || CTX_TEMPLATES.error_system;
  const template = templates[Math.floor(Math.random()*templates.length)];
  const ctx = template(company);
  return {
    niche, tone, screen, persona, ctx, company,
    brief: `You're a UX writer at ${company.name} — ${company.desc.toLowerCase()}. Your target audience is: ${company.audience.toLowerCase()}. The user is on a ${screen.label} screen. They are a ${persona.label} (age ~${persona.age}): ${persona.d}. Write in a ${tone.label} tone — ${tone.desc.toLowerCase()}.`,
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
const EXAMPLES = {
  error_system: { title:"Something went wrong on our end", body:"We couldn't complete your request due to a server issue. Your data is safe — nothing was lost. Our team has been notified and we're working on it.", primaryButton:"Try again", secondaryButton:"Go to dashboard" },
  error_user: { title:"That doesn't look quite right", body:"Check the highlighted field and try again. If you're not sure what's wrong, the hint below the field can help.", primaryButton:"Fix and resubmit" },
  error_perm: { title:"You need a different role for this", body:"This action requires admin access. Ask your team owner to update your permissions, or reach out to support if you think this is a mistake.", primaryButton:"Request access" },
  empty_first: { title:"This is where your work will live", body:"Once you create your first one, it'll show up right here. Most people start with something small — you can always build from there.", primaryButton:"Create your first" },
  empty_search: { title:"No results for that search", body:"We couldn't find an exact match. Try adjusting your filters or broadening your search terms.", primaryButton:"Clear filters" },
  onboard_welcome: { title:"You're in the right place", body:"We help you do [core value] without the usual headaches. Set up takes about 2 minutes — and you can change everything later.", primaryButton:"Let's set up", secondaryButton:"Take a quick tour" },
  onboard_step: { title:"Pick what matters to you", body:"This helps us personalize your experience. Choose at least 3 — you can always update these in settings.", primaryButton:"Continue", skipLink:"Skip for now" },
  loading: { loadMsg1:"Getting everything ready…", loadMsg2:"Almost there — crunching the numbers…", loadMsg3:"Just a few more seconds…" },
  confirm_destroy: { title:"This can't be undone", body:"Deleting this will permanently remove all associated data, including shared work with collaborators. Consider exporting a backup first.", destructiveButton:"Delete permanently", cancelButton:"Keep it" },
  confirm_safe: { title:"Ready to go live?", body:"This will be published immediately to your audience. You've completed all required steps and everything looks good.", primaryButton:"Publish now", cancelButton:"Not yet" },
  success: { title:"That's a wrap!", body:"Everything went through successfully. Here's what you can do next.", primaryButton:"See details", secondaryButton:"Share this" },
  permission: { title:"Allow location access?", body:"This lets us show results near you — so you see what's relevant, not what's 500 miles away. You can change this anytime in settings.", primaryButton:"Allow location", skipLink:"Not now" },
  paywall: { title:"This one's for Pro members", body:"You've been doing great on the free plan. This feature unlocks with Pro — along with everything else you'll eventually want.", primaryButton:"See Pro plans", secondaryButton:"Maybe later" },
  notif: { notifTitle:"New message from Sarah", notifBody:"Re: Q4 planning — 'Can you review the updated timeline? I've flagged two items for your input.'" },
  tooltip: { tipBody:"Tip: Use advanced filters to narrow 2,000+ results down to exactly what you need. Power users save 5x more time this way.", tipCta:"Try filters", tipDismiss:"Got it" },
  cancel: { title:"Before you go", body:"You've built up 45 saved items and 11 months of history. Canceling means losing access to premium features, but your data stays for 30 days in case you change your mind.", retainButton:"Keep my subscription", confirmCancel:"Cancel anyway" },
  settings: { setLabel1:"Push notifications", setDesc1:"Get alerts on your phone for new messages and urgent updates. You can choose which types.", setLabel2:"Share activity status", setDesc2:"Let others see when you're online. Turn this off to browse privately." },
  banner: { title:"Scheduled maintenance tonight", body:"We'll be down for about 30 minutes starting at 11 PM EST. Save your work before then — we'll be back before you know it.", primaryButton:"Learn more", skipLink:"Dismiss" },
  email: { emailSubject:"Your weekly summary is ready", title:"Here's what happened this week", body:"Your team completed 14 tasks, shipped 2 projects, and welcomed 3 new members. Log in to see the full breakdown.", primaryButton:"View full report" },
};

// ═══════════════ THEME ═══════════════
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
      const msgs=[g("loadMsg1"),g("loadMsg2"),g("loadMsg3")].filter(Boolean);
      return<div style={{height:"100%",display:"flex",flexDirection:"column"}}>
        <NavBar/>
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,padding:28}}>
          <div style={{width:32,height:32,border:`3px solid ${T.border}`,borderTopColor:T.accent,borderRadius:"50%",animation:"sp 1s linear infinite"}}/>
          <p style={{fontSize:13,color:T.sub,textAlign:"center"}}>{msgs[0]||"Loading…"}</p>
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
  lines.push(brief.brief);
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
  lines.push(`*Generated with Wordsmith Lab*`);
  return lines.join("\n");
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
  const [view, setView] = useState(V.GATE);
  const [email, setEmail] = useState("");
  const [used, setUsed] = useState(0);
  const [uDate, setUDate] = useState("");
  // Generator state
  const [mode, setMode] = useState("quick"); // "quick" or "custom"
  const [sN, setSN] = useState(null);
  const [sT, setST] = useState(null);
  const [sS, setSS] = useState(null);
  const [sP, setSP] = useState(null);
  // Challenge state
  const [brief, setBrief] = useState(null);
  const [ans, setAns] = useState({});
  const [extras, setExtras] = useState([]);
  const [dev, setDev] = useState("phone");
  const [done, setDone] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [checks, setChecks] = useState({});
  const [copied, setCopied] = useState(false);
  const [hist, setHist] = useState([]);

  const LIM = 5;

  useEffect(() => {
    try {
      const e = LS.get("wl_email");
      if (e) { setEmail(e); setView(V.BROWSE); }
      const d = JSON.parse(LS.get("wl_d") || "null");
      const td = new Date().toISOString().split("T")[0];
      if (d?.date === td && d?.email === (e||"")) { setUsed(d.c); setUDate(td); } else setUDate(td);
      setHist(JSON.parse(LS.get("wl_h") || "[]"));
    } catch (e) {}
  }, []);

  const gate = () => {
    if (!email.trim() || !email.includes("@")) return;
    LS.set("wl_email", email);
    setView(V.BROWSE);
  };
  const bump = () => {
    const td = new Date().toISOString().split("T")[0];
    const n = (uDate === td) ? used + 1 : 1;
    setUsed(n); setUDate(td);
    LS.set("wl_d", JSON.stringify({ date: td, c: n, email }));
  };
  const canGo = used < LIM;
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
    const b = generateBrief(n,t,s,p,NICHES,TONES,SCREENS,PERSONAS);
    setBrief(b); setAns({}); setExtras([]); setDone(false); setShowReview(false); setShowExample(false); setChecks({}); setCopied(false);
    bump(); setView(V.CHALLENGE);
  };
  const quickStart = () => {
    const n=NICHES[~~(Math.random()*NICHES.length)].id;
    const t=TONES[~~(Math.random()*TONES.length)].id;
    const s=SCREENS[~~(Math.random()*SCREENS.length)].id;
    const p=PERSONAS[~~(Math.random()*PERSONAS.length)].id;
    setSN(n);setST(t);setSS(s);setSP(p);
    gen(n,t,s,p);
  };
  const logout = () => { LS.del("wl_email"); setEmail(""); setView(V.GATE); };
  const Head = () => <><style>{CSS}</style><link href={FONTS} rel="stylesheet" /></>;

  // ══════════════════════════════════════════════
  // GATE — email only, one field
  // ══════════════════════════════════════════════
  if (view === V.GATE) return (
    <div style={{fontFamily:"'Outfit',sans-serif",color:T.text,background:T.bg,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <Head/>
      <div style={{maxWidth:420,width:"100%",animation:"fu 0.5s ease"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:32}}>
          <div style={{width:42,height:42,borderRadius:10,background:T.text,color:T.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,fontWeight:700,fontFamily:"'Newsreader',Georgia,serif"}}>W</div>
          <span style={{fontSize:18,fontWeight:600}}>Wordsmith Lab</span>
        </div>
        <h1 style={{fontFamily:"'Newsreader',Georgia,serif",fontSize:36,fontWeight:500,lineHeight:1.15,marginBottom:10}}>
          Practice the words<br/><em style={{color:T.accent}}>users actually read.</em>
        </h1>
        <p style={{color:T.sub,fontSize:15,lineHeight:1.6,marginBottom:10}}>
          Realistic UX writing challenges with fictional company briefs, live mockup previews, and a self-review rubric. Build your portfolio or sharpen your craft.
        </p>
        <p style={{color:T.muted,fontSize:13,marginBottom:28}}>5 challenges per day during alpha. Enter your email to start.</p>
        <div style={{display:"flex",gap:10}}>
          <input placeholder="you@email.com" type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&gate()}
            style={{flex:1,padding:"13px 16px",borderRadius:8,border:`1.5px solid ${T.border}`,fontSize:15,fontFamily:"inherit",outline:"none",background:T.card,color:T.text}}
            onFocus={e=>e.target.style.borderColor=T.bf} onBlur={e=>e.target.style.borderColor=T.border}/>
          <Btn disabled={!email.trim()||!email.includes("@")} onClick={gate}>Start →</Btn>
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════
  // BROWSE — Quick Start hero + custom mode toggle
  // ══════════════════════════════════════════════
  if (view === V.BROWSE) return (
    <div style={{fontFamily:"'Outfit',sans-serif",color:T.text,background:T.bg,minHeight:"100vh"}}>
      <Head/>
      {/* Topbar */}
      <div style={{borderBottom:`1px solid ${T.border}`,padding:"11px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",background:T.card,position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:30,height:30,borderRadius:7,background:T.text,color:T.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,fontFamily:"'Newsreader',Georgia,serif"}}>W</div>
          <span style={{fontSize:15,fontWeight:600}}>Wordsmith Lab</span>
          <Tag color={T.accent} bg={T.aS}>Alpha</Tag>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <Tag color={canGo?T.ok:T.err} bg={canGo?T.okS:T.errS}>{used}/{LIM} today</Tag>
          <button onClick={logout} style={{background:"none",border:"none",fontSize:13,color:T.muted,cursor:"pointer",fontFamily:"inherit"}}>{email.split("@")[0]} · Sign out</button>
        </div>
      </div>

      <div style={{maxWidth:800,margin:"0 auto",padding:"40px 22px"}}>
        {/* Quick Start — hero action */}
        {canGo ? (
          <div style={{textAlign:"center",padding:"48px 24px",background:T.card,borderRadius:16,border:`1px solid ${T.border}`,marginBottom:32,animation:"fu 0.4s ease"}}>
            <h1 style={{fontFamily:"'Newsreader',Georgia,serif",fontSize:30,fontWeight:500,marginBottom:8}}>Ready to practice?</h1>
            <p style={{color:T.sub,fontSize:15,marginBottom:24,maxWidth:440,margin:"0 auto 24px"}}>
              We'll generate a realistic brief from a fictional company — complete with context, constraints, and a live mockup to write into.
            </p>
            <Btn v="accent" onClick={quickStart} style={{fontSize:16,padding:"14px 36px"}}>🎲 Generate a random challenge</Btn>
            <div style={{marginTop:14}}>
              <button onClick={()=>setMode(mode==="custom"?"quick":"custom")} style={{background:"none",border:"none",fontSize:13,color:T.sub,cursor:"pointer",fontFamily:"inherit",textDecoration:"underline"}}>
                {mode==="custom" ? "Hide custom options" : "Or build your own challenge →"}
              </button>
            </div>
          </div>
        ) : (
          <div style={{textAlign:"center",padding:"40px 24px",background:T.errS,borderRadius:16,border:"1px solid rgba(184,58,58,0.12)",marginBottom:32}}>
            <p style={{fontSize:20,fontWeight:600,marginBottom:6}}>You've used all 5 challenges today</p>
            <p style={{color:T.sub,fontSize:14}}>Come back tomorrow for 5 more. In the meantime, review your completed work below.</p>
          </div>
        )}

        {/* Custom mode */}
        {mode==="custom" && canGo && (
          <div style={{animation:"fu 0.3s ease",marginBottom:32}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:20}}>
              {[{l:"Product Niche",items:NICHES,sel:sN,set:setSN,r:n=>`${n.icon} ${n.label}`},
                {l:"Tone of Voice",items:TONES,sel:sT,set:setST,r:t=>t.label},
                {l:"Screen Type",items:SCREENS,sel:sS,set:setSS,r:s=>`${s.icon} ${s.label}`},
                {l:"User Persona",items:PERSONAS,sel:sP,set:setSP,r:p=>p.label}
              ].map(dim=>(
                <div key={dim.l}>
                  <label style={{display:"block",marginBottom:8}}><Mono>{dim.l}</Mono></label>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                    {dim.items.map(item=><button key={item.id} onClick={()=>dim.set(item.id)} title={item.desc||item.d||""} style={{padding:"6px 12px",borderRadius:6,fontSize:12,fontWeight:500,fontFamily:"inherit",cursor:"pointer",transition:"all 0.15s",background:dim.sel===item.id?T.text:T.card,color:dim.sel===item.id?T.bg:T.sub,border:`1.5px solid ${dim.sel===item.id?T.text:T.border}`}}>{dim.r(item)}</button>)}
                  </div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <Btn v="secondary" onClick={rand}>🎲 Randomize</Btn>
              <Btn disabled={!sN||!sT||!sS||!sP} onClick={()=>gen(sN,sT,sS,sP)}>Generate Challenge →</Btn>
            </div>
          </div>
        )}

        {/* History */}
        {hist.length > 0 && (
          <div>
            <Mono>Completed challenges</Mono>
            <div style={{marginTop:10}}>
              {hist.slice(0,8).map(h => (
                <button key={h.id} onClick={()=>{setBrief(h.brief);setAns(h.answers);setExtras(h.extras||[]);setDone(true);setShowReview(false);setShowExample(false);setChecks({});setCopied(false);setView(V.CHALLENGE)}}
                  style={{textAlign:"left",padding:14,borderRadius:9,background:T.card,border:`1px solid ${T.border}`,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s",display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",marginBottom:6}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=T.bf} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
                  <div>
                    <span style={{fontSize:14,fontWeight:600}}>{h.brief.company?.name}</span>
                    <span style={{fontSize:13,color:T.sub,marginLeft:8}}>{h.brief.screen.icon} {h.brief.screen.label} · {h.brief.tone.label}</span>
                  </div>
                  <span style={{fontSize:12,color:T.muted}}>{new Date(h.date).toLocaleDateString()}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ══════════════════════════════════════════════
  // CHALLENGE — brief, form, mockup, review, example, export
  // ══════════════════════════════════════════════
  if (view === V.CHALLENGE && brief) {
    const rubric = RUBRICS[brief.screen.id] || [];
    const example = EXAMPLES[brief.screen.id] || {};

    return (
      <div style={{fontFamily:"'Outfit',sans-serif",color:T.text,background:T.bg,minHeight:"100vh"}}>
        <Head/>
        {/* Topbar */}
        <div style={{borderBottom:`1px solid ${T.border}`,padding:"9px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",background:T.card,position:"sticky",top:0,zIndex:100}}>
          <button onClick={()=>setView(V.BROWSE)} style={{background:"none",border:"none",color:T.sub,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>← Back to challenges</button>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{display:"flex",borderRadius:6,overflow:"hidden",border:`1.5px solid ${T.border}`}}>
              {[{k:"phone",l:"📱"},{k:"desktop",l:"🖥"}].map(d=><button key={d.k} onClick={()=>setDev(d.k)} style={{padding:"5px 12px",fontSize:13,fontFamily:"inherit",cursor:"pointer",background:dev===d.k?T.text:T.card,color:dev===d.k?T.bg:T.sub,border:"none",transition:"all 0.15s"}}>{d.l}</button>)}
            </div>
            <Tag>{used}/{LIM}</Tag>
          </div>
        </div>

        {/* Brief — restructured: task first, then context */}
        <div style={{background:T.alt,borderBottom:`1px solid ${T.border}`,padding:"18px 22px"}}>
          <div style={{maxWidth:920,margin:"0 auto"}}>
            {/* Company header */}
            <div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:6}}>
              <span style={{fontSize:22,fontWeight:700,fontFamily:"'Newsreader',Georgia,serif"}}>{brief.company?.name}</span>
              <span style={{fontSize:13,color:T.sub,fontStyle:"italic"}}>{brief.company?.desc}</span>
            </div>
            {/* Tags */}
            <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
              <Tag>{brief.niche.icon} {brief.niche.label}</Tag>
              <Tag>{brief.tone.label}</Tag>
              <Tag>{brief.screen.icon} {brief.screen.label}</Tag>
              <Tag>{brief.persona.label} (~{brief.persona.age})</Tag>
            </div>
            {/* Task — what you need to write */}
            <div style={{padding:14,borderRadius:10,background:T.card,border:`1px solid ${T.border}`,marginBottom:10}}>
              <Mono>Your task</Mono>
              <p style={{fontSize:14,color:T.text,lineHeight:1.65,marginTop:6}}>{brief.brief}</p>
            </div>
            {/* Deliverables — crystal clear list of what to produce */}
            <div style={{padding:14,borderRadius:10,background:"rgba(199,67,43,0.04)",border:`1px solid ${T.aB}`,marginBottom:10}}>
              <Mono>✍️ Write these {brief.screen.components.length} components</Mono>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:8}}>
                {brief.screen.components.map(k => {
                  const m = COMP[k]; if (!m) return null;
                  return <span key={k} style={{fontSize:13,color:T.text,padding:"4px 10px",borderRadius:6,background:T.card,border:`1px solid ${T.border}`}}>
                    <strong>{m.label}</strong> <span style={{color:T.muted,fontSize:11}}>({m.max} chars)</span>
                  </span>;
                })}
              </div>
            </div>
            {/* Context — collapsible detail */}
            <div style={{padding:14,borderRadius:10,background:T.card,border:`1px solid ${T.border}`}}>
              <Mono>Context</Mono>
              <div style={{fontSize:13,color:T.sub,lineHeight:1.7,marginTop:6}}>
                <p style={{marginBottom:3}}><strong style={{color:T.text}}>Page:</strong> {brief.ctx.page}</p>
                <p style={{marginBottom:3}}><strong style={{color:T.text}}>Feature:</strong> {brief.ctx.feature}</p>
                <p style={{marginBottom:3}}><strong style={{color:T.text}}>Situation:</strong> {brief.ctx.detail}</p>
                <p><strong style={{color:T.text}}>On screen:</strong> {brief.ctx.visible}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Side-by-side: Form + Mockup */}
        <div style={{display:"grid",gridTemplateColumns:dev==="phone"?"1fr 370px":"1fr 1fr",maxWidth:1160,margin:"0 auto",minHeight:"calc(100vh - 240px)"}}>
          {/* Left: Form */}
          <div style={{padding:"24px 24px 80px",borderRight:`1px solid ${T.border}`,overflowY:"auto"}}>
            <Mono>Required copy</Mono>
            <div style={{marginTop:12}}>
              {brief.screen.components.map(k => {
                const m = COMP[k]; if (!m) return null;
                return <Inp key={k} label={m.label} max={m.max} value={ans[k]} onChange={v => setAns({...ans,[k]:v})} ph={m.ph} rows={m.rows} disabled={done} />;
              })}
            </div>

            {/* Extra components */}
            {extras.length > 0 && <>
              <Mono>Added components</Mono>
              <div style={{marginTop:8}}>
                {extras.map((ext, i) => {
                  const c = EXTRAS.find(x => x.id === ext.type); if (!c) return null;
                  return <div key={i} style={{position:"relative",animation:"si 0.3s ease"}}>
                    <Inp label={`${c.icon} ${c.field.label}`} max={c.field.max} value={ext.value} onChange={v => { const cp=[...extras]; cp[i]={...cp[i],value:v}; setExtras(cp); }} ph={c.field.ph} rows={c.field.rows} disabled={done} />
                    {!done && <button onClick={() => setExtras(extras.filter((_,j) => j!==i))} style={{position:"absolute",top:0,right:0,background:"none",border:"none",color:T.muted,cursor:"pointer",fontSize:15,padding:3}}>×</button>}
                  </div>;
                })}
              </div>
            </>}

            {/* Add components */}
            {!done && <div style={{marginTop:16}}>
              <Mono>+ Add component</Mono>
              <div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:8}}>
                {EXTRAS.map(ec => <button key={ec.id} onClick={() => setExtras([...extras,{type:ec.id,value:""}])}
                  style={{padding:"5px 11px",borderRadius:6,fontSize:12,fontWeight:500,fontFamily:"inherit",cursor:"pointer",background:T.card,color:T.sub,border:`1px dashed ${T.border}`,transition:"all 0.15s"}}
                  onMouseEnter={e=>{e.target.style.borderColor=T.accent;e.target.style.color=T.accent;e.target.style.borderStyle="solid"}}
                  onMouseLeave={e=>{e.target.style.borderColor=T.border;e.target.style.color=T.sub;e.target.style.borderStyle="dashed"}}>{ec.icon} {ec.label}</button>)}
              </div>
            </div>}

            {/* Actions */}
            <div style={{marginTop:24,display:"flex",gap:10,flexWrap:"wrap"}}>
              {!done ? (
                <Btn v="accent" disabled={!brief.screen.components.every(k=>(ans[k]||"").trim().length>0)} onClick={()=>{setDone(true);saveH(brief);setShowReview(true)}}>✓ Mark Complete</Btn>
              ) : (
                <div style={{padding:"11px 18px",borderRadius:8,background:T.okS,border:"1px solid rgba(45,122,79,0.12)",color:T.ok,fontSize:14,fontWeight:600}}>✓ Complete</div>
              )}
              <Btn v="secondary" onClick={()=>{setView(V.BROWSE);setBrief(null);setAns({});setExtras([]);setDone(false);setShowReview(false);setShowExample(false)}}>New Challenge</Btn>
            </div>

            {/* ══════ POST-COMPLETION: Review + Example + Export ══════ */}
            {done && (
              <div style={{marginTop:28,animation:"fu 0.4s ease"}}>
                {/* Self-Review Rubric */}
                <div style={{padding:18,borderRadius:12,background:T.card,border:`1px solid ${T.border}`,marginBottom:16}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,cursor:"pointer"}} onClick={()=>setShowReview(!showReview)}>
                    <Mono>📋 Self-review checklist</Mono>
                    <span style={{fontSize:12,color:T.sub}}>{showReview?"▼":"▶"}</span>
                  </div>
                  {showReview && rubric.map((q, i) => (
                    <label key={i} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"8px 0",borderTop:i>0?`1px solid ${T.alt}`:"none",cursor:"pointer",fontSize:13,color:T.text,lineHeight:1.5}}>
                      <input type="checkbox" checked={!!checks[i]} onChange={()=>setChecks({...checks,[i]:!checks[i]})} style={{marginTop:3,accentColor:T.accent}} />
                      {q}
                    </label>
                  ))}
                </div>

                {/* Example Answer */}
                <div style={{padding:18,borderRadius:12,background:T.card,border:`1px solid ${T.border}`,marginBottom:16}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}} onClick={()=>setShowExample(!showExample)}>
                    <Mono>💡 See an example response</Mono>
                    <span style={{fontSize:12,color:T.sub}}>{showExample?"▼":"▶"}</span>
                  </div>
                  {showExample && (
                    <div style={{marginTop:12,padding:14,borderRadius:8,background:T.alt,border:`1px solid ${T.border}`}}>
                      <p style={{fontSize:11,color:T.muted,marginBottom:8,fontStyle:"italic"}}>This is one possible approach — not the only right answer.</p>
                      {brief.screen.components.map(k => {
                        const m = COMP[k]; const val = example[k];
                        if (!m || !val) return null;
                        return <div key={k} style={{marginBottom:8}}>
                          <span style={{fontSize:11,fontWeight:600,color:T.sub}}>{m.label}:</span>
                          <p style={{fontSize:13,color:T.text,marginTop:2}}>{val}</p>
                        </div>;
                      })}
                    </div>
                  )}
                </div>

                {/* Export */}
                <Btn v="secondary" style={{width:"100%"}} onClick={() => {
                  const md = exportCaseStudy(brief, ans, extras);
                  navigator.clipboard.writeText(md).then(() => setCopied(true)).catch(() => {});
                }}>
                  {copied ? "✓ Copied to clipboard!" : "📋 Copy as case study (Markdown)"}
                </Btn>
              </div>
            )}
          </div>

          {/* Right: Mockup */}
          <div style={{padding:24,display:"flex",alignItems:"flex-start",justifyContent:"center",background:T.bg,position:"sticky",top:130,alignSelf:"start"}}>
            <div style={{width:"100%"}}>
              <p style={{textAlign:"center",marginBottom:14}}><Mono>Live Preview — {dev==="phone"?"Mobile":"Desktop"}</Mono></p>
              <Mockup sid={brief.screen.id} ans={ans} extras={extras} dev={dev} company={brief.company?.name||"App"} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
