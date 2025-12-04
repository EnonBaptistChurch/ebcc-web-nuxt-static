// src/data/faqs.ts
export interface FAQ {
  id: number
  category: string
  question: string
  answer: string
  keywords?: string[]
}

export const faqs: FAQ[] = [
  { id: 1, category: 'Service Times & Location', question: 'What time are your Sunday services?', answer: 'Our main Sunday service starts at 10:30am and typically lasts 75–90 minutes.', keywords: ['service times', 'sunday', 'schedule'] },
  { id: 2, category: 'Service Times & Location', question: 'Where is the church located?', answer: 'We are located at 123 Church Road. Full directions and parking info are on our Visit Us page.', keywords: ['location', 'address', 'directions'] },
  { id: 3, category: 'Service Times & Location', question: 'Is there parking available?', answer: 'Yes — we have a car park beside the building and on-street parking nearby.', keywords: ['parking', 'lot', 'drive'] },
  { id: 4, category: 'Service Times & Location', question: 'How long does a service usually last?', answer: 'Services usually last between 60 and 90 minutes depending on special activities or communion.', keywords: ['length', 'duration', 'service'] },
  { id: 5, category: 'Service Times & Location', question: 'Do you livestream your services?', answer: 'Yes — Sunday morning worship is livestreamed on our website and social channels.', keywords: ['livestream', 'online', 'watch'] },

  { id: 6, category: 'Visiting', question: 'What can I expect when I visit?', answer: 'You will get a warm welcome, contemporary worship, practical teaching, and friendly people ready to help.', keywords: ['new here', 'first time', 'visit'] },
  { id: 7, category: 'Visiting', question: 'What should I wear?', answer: 'Come as you are — most people dress casually, though some prefer smart-casual for special services.', keywords: ['dress', 'attire', 'clothing'] },
  { id: 8, category: 'Visiting', question: 'Do I need to register before attending?', answer: 'No registration is required for regular services. For ticketed events, we’ll ask you to register in advance.', keywords: ['register', 'booking', 'reserve'] },
  { id: 9, category: 'Visiting', question: 'Is there a welcome team?', answer: 'Yes — our welcome team is available before and after services to answer questions and help you get connected.', keywords: ['welcome', 'greet', 'usher'] },
  { id: 10, category: 'Visiting', question: 'How do I find the children’s check-in?', answer: 'The children’s check-in desk is near the main entrance; volunteers will show you where your child’s group is.', keywords: ['check-in', 'kids', 'children'] },

  { id: 11, category: 'Kids & Youth', question: 'Is there a children\’s ministry?', answer: 'Yes — we run age-specific groups for toddlers, primary-aged children and youth during the service.', keywords: ['children', 'kids', 'ministry'] },
  { id: 12, category: 'Kids & Youth', question: 'What ages do you cater for?', answer: 'We have groups for 0–3 (crèche), 4–10 (children) and 11–18 (youth). Age ranges may vary by programme.', keywords: ['ages', 'youth', 'crèche'] },
  { id: 13, category: 'Kids & Youth', question: 'Are volunteers DBS-checked?', answer: 'Yes — all children\'s and youth volunteers undergo DBS checks and safeguarding training.', keywords: ['dbs', 'safeguarding', 'police check'] },
  { id: 14, category: 'Kids & Youth', question: 'Do you run holiday clubs or summer camps?', answer: 'We run occasional holiday clubs and activity days—details are published on the events page.', keywords: ['holiday club', 'camp', 'activities'] },
  { id: 15, category: 'Kids & Youth', question: 'Can I stay with my child during the service?', answer: 'Yes — parents are welcome to stay with children in our family seating area or the creche when needed.', keywords: ['parent', 'stay', 'family'] },

  { id: 16, category: 'About', question: 'What does the church believe?', answer: 'We follow the teaching of Jesus Christ and the Bible. A full statement of faith is available on our About page.', keywords: ['beliefs', 'doctrine', 'faith'] },
  { id: 17, category: 'About', question: 'Who are the pastors or leaders?', answer: 'Our leadership includes our lead pastor, associate pastors and a board of elders. Bios are on the Leadership page.', keywords: ['pastor', 'leadership', 'staff'] },
  { id: 18, category: 'About', question: 'Are you part of a denomination?', answer: 'We are an independent evangelical church.', keywords: ['denomination', 'affiliation', 'network'] },
  { id: 19, category: 'About', question: 'What is your mission or vision?', answer: 'Our mission is to love God, love people and serve our local community with practical compassion and the gospel.', keywords: ['mission', 'vision', 'purpose'] },
  { id: 20, category: 'About', question: 'How long have you been meeting?', answer: 'Our church community has been meeting for many years; check our history page for a timeline and milestones.', keywords: ['history', 'founded', 'established'] },

  { id: 21, category: 'Ministries', question: 'What mid-week groups do you have?', answer: 'We run small groups, prayer meetings, Bible studies, youth nights, and community outreach programmes.', keywords: ['small groups', 'midweek', 'bible study'] },
  { id: 22, category: 'Ministries', question: 'Do you have prayer meetings?', answer: 'Yes—regular prayer meetings are held weekly and monthly; see the events calendar for times.', keywords: ['prayer', 'meetings', 'prayer night'] },
  { id: 23, category: 'Ministries', question: 'How do I start a new small group?', answer: 'Contact our pastoral team with your group details and we’ll help you get started with resources and support.', keywords: ['small group', 'start', 'home group'] },
  { id: 24, category: 'Ministries', question: 'Do you offer pastoral care or counselling?', answer: 'Yes — pastoral care and referral to professional counselling is available. Contact the church office for confidential support.', keywords: ['pastoral care', 'counselling', 'support'] },
  { id: 25, category: 'Ministries', question: 'Do you run community outreach activities?', answer: 'Yes — our outreach teams run foodbanks, youth work, and partnerships with local charities.', keywords: ['outreach', 'community', 'charity'] },

  { id: 26, category: 'Sermons & Media', question: 'Where can I watch or listen to sermons?', answer: 'Sermons are published weekly on our website, podcast platforms and our YouTube channel.', keywords: ['sermons', 'podcast', 'youtube'] },
  { id: 27, category: 'Sermons & Media', question: 'Do you provide sermon notes or study guides?', answer: 'Yes—many sermons include downloadable notes and small group discussion guides.', keywords: ['notes', 'study guide', 'discussion'] },
  { id: 28, category: 'Sermons & Media', question: 'Can I request a copy of a past sermon?', answer: 'Contact the media team with the date or title and we’ll help you locate the recording.', keywords: ['request', 'archive', 'recording'] },
  { id: 29, category: 'Sermons & Media', question: 'Do you run a podcast?', answer: 'Yes—our sermon series are available as a podcast you can subscribe to on major platforms.', keywords: ['podcast', 'rss', 'subscribe'] },
  { id: 30, category: 'Sermons & Media', question: 'Are there captions on the videos?', answer: 'We provide captions for most sermon videos. If you need help, contact the media team.', keywords: ['captions', 'subtitles', 'accessibility'] },

  { id: 31, category: 'Life Events', question: 'How do I book a wedding at your church?', answer: 'Contact the church office to check availability and discuss the requirements and fees for weddings.', keywords: ['wedding', 'marriage', 'ceremony'] },
  { id: 32, category: 'Life Events', question: 'What about funerals or memorial services?', answer: 'We can help arrange funerals and memorials with pastoral support—contact the office for details and availability.', keywords: ['funeral', 'memorial', 'bereavement'] },
  { id: 33, category: 'Life Events', question: 'How do baptisms work?', answer: 'We offer baptism classes and hold baptisms periodically—speak to a pastor to express interest and find out the next scheduled date.', keywords: ['baptism', 'christening', 'new believer'] },
  { id: 34, category: 'Life Events', question: 'Do you offer baby dedications?', answer: 'Yes—we run baby dedication services; contact the office to register and receive guidance.', keywords: ['dedication', 'baby', 'child dedication'] },
  { id: 35, category: 'Life Events', question: 'Can non-members be married here?', answer: 'Policies vary by church; contact the office to discuss eligibility and requirements.', keywords: ['non-member', 'wedding', 'eligibility'] },

  { id: 36, category: 'Giving', question: 'How do I give online?', answer: 'Use our secure online giving page or set up a standing order through your bank. Card and bank transfer options are available.', keywords: ['give', 'donate', 'online'] },
  { id: 37, category: 'Giving', question: 'Do you support Gift Aid?', answer: 'Yes—UK taxpayers can add Gift Aid to donations—details are available on the giving page.', keywords: ['giftaid', 'tax', 'donation'] },
  { id: 38, category: 'Giving', question: 'Can I set up a regular giving plan?', answer: 'Yes—regular giving via standing order or monthly card donation is supported. See the giving page for instructions.', keywords: ['regular giving', 'standing order', 'monthly'] },
  { id: 39, category: 'Giving', question: 'Is my donation secure?', answer: 'Yes—we use secure payment processors with encryption to protect your information.', keywords: ['security', 'payment', 'safe'] },
  { id: 40, category: 'Giving', question: 'Where does the money go?', answer: 'Donations support ministry, staff, outreach, building upkeep and mission partners. Annual reports provide full breakdowns.', keywords: ['finance', 'budget', 'report'] },

  { id: 41, category: 'Get Involved', question: 'How can I volunteer?', answer: 'Visit our Get Involved page to view current volunteer opportunities and fill in the interest form.', keywords: ['volunteer', 'serve', 'signup'] },
  { id: 42, category: 'Get Involved', question: 'What training do volunteers receive?', answer: 'Volunteers receive role-specific training and safeguarding orientation where required.', keywords: ['training', 'volunteer', 'orientation'] },
  { id: 43, category: 'Get Involved', question: 'Can I join a serving rota?', answer: 'Yes—contact the ministry leader or sign up through the volunteer portal.', keywords: ['rota', 'schedule', 'serve'] },
  { id: 44, category: 'Get Involved', question: 'Are there opportunities for students or interns?', answer: 'We offer internships and placements—check our careers and internships page for openings.', keywords: ['internship', 'placement', 'student'] },
  { id: 45, category: 'Get Involved', question: 'How do I start a ministry team?', answer: 'Speak to a pastor with your proposal; we’ll help with planning, safeguarding checks, and onboarding.', keywords: ['start', 'team', 'ministry'] },

  { id: 46, category: 'Contact & Communication', question: 'How do I submit a prayer request?', answer: 'Submit a prayer request through our online form or speak to a member of the prayer team after the service.', keywords: ['prayer', 'request', 'support'] },
  { id: 47, category: 'Contact & Communication', question: 'How can I contact the church office?', answer: 'Call, email, or use the contact form on the website. Office hours are published on the contact page.', keywords: ['contact', 'office', 'phone'] },
  { id: 48, category: 'Contact & Communication', question: 'Do you have a newsletter?', answer: 'Yes—subscribe to our weekly newsletter for news, events and prayer points.', keywords: ['newsletter', 'subscribe', 'updates'] },
  { id: 49, category: 'Contact & Communication', question: 'How do I update my contact details?', answer: 'Email the office with your updated details or use the profile section of the members portal.', keywords: ['update', 'contact', 'details'] },
  { id: 50, category: 'Contact & Communication', question: 'Can I speak to a pastor confidentially?', answer: 'Yes—pastoral meetings are confidential. Contact the office to arrange a private appointment.', keywords: ['confidential', 'pastor', 'meeting'] },

  { id: 51, category: 'Accessibility & Practical', question: 'Is the building accessible?', answer: 'Yes—our building has step-free access, accessible toilets and designated seating for those with mobility needs.', keywords: ['accessibility', 'wheelchair', 'disabled'] },
  { id: 52, category: 'Accessibility & Practical', question: 'Do you have a hearing loop or BSL provision?', answer: 'We provide a hearing loop in the main hall and occasional BSL-interpreted services—contact the office for upcoming dates.', keywords: ['hearing loop', 'BSL', 'interpreted'] }
]