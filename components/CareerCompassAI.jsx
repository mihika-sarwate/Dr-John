import { useState, useCallback } from "react";

// ─── CAREER DATABASE ─────────────────────────────────────────────────────────
const CAREERS = [
  { id:"occupational_therapist", title:"Occupational Therapist", sector:"Healthcare", description:"Helps people recover, develop, or maintain daily living and work skills after injury, illness, or disability.", riasec:{R:30,I:55,A:35,S:90,E:30,C:40}, ocean:{O:65,C:75,E:60,A:85,N:30}, cognitive:65, eq:90, grit:75, integrity:85, adaptability:75, values:["helping_others","stability","autonomy"], aiResilience:88, resilienceReason:"Requires hands-on physical assessment, empathy-driven care plans, and adaptive human judgment in unpredictable settings.", training:["Licensed OT degree & clinical certification","Supervised fieldwork hours (1,000+)","Empathetic communication & motivational interviewing","Assistive technology & adaptive equipment training"], examPrep:["Biology, Anatomy & Physiology (prerequisite sciences)","Medical terminology & clinical reasoning MCQs","OT licensure exam (NBCOT in USA / country-specific board exams)","Practical OSCE: patient assessment scenarios"] },
  { id:"electrician", title:"Electrician", sector:"Skilled Trades", description:"Installs, maintains, and repairs electrical systems in homes, businesses, and infrastructure.", riasec:{R:90,I:45,A:15,S:25,E:35,C:55}, ocean:{O:40,C:75,E:40,A:55,N:35}, cognitive:60, eq:40, grit:70, integrity:80, adaptability:65, values:["stability","autonomy","tangible_results"], aiResilience:92, resilienceReason:"Physical, situational work in varied real-world environments with safety-critical judgment — extremely difficult to automate at scale.", training:["Trade apprenticeship (3–5 years)","National licensing exam preparation","Electrical code & safety compliance (NEC/IEC)","Smart home & renewable energy specialization"], examPrep:["Electrical theory: Ohm's law, circuit analysis, AC/DC","National Electrical Code (NEC) / regional equivalent","Safety standards: OSHA / local occupational health regulations","Licensing exam: Journeyman then Master Electrician"] },
  { id:"registered_nurse", title:"Registered Nurse", sector:"Healthcare", description:"Provides direct patient care, coordinates treatment plans, and supports patients and families through medical care.", riasec:{R:35,I:55,A:20,S:90,E:40,C:50}, ocean:{O:55,C:80,E:55,A:85,N:30}, cognitive:70, eq:90, grit:85, integrity:90, adaptability:80, values:["helping_others","stability","service"], aiResilience:90, resilienceReason:"Direct patient contact, emotional support, hands-on procedures, and split-second judgment in dynamic clinical settings.", training:["Nursing degree/diploma & NCLEX licensing","Clinical rotations across specializations","Specialized certifications (ICU, pediatrics, etc.)","Continuing education & recertification credits"], examPrep:["NCLEX-RN (USA) / NMC CBT (UK) / country licensing exam","Pharmacology, pathophysiology, medical-surgical nursing","Patient safety, ethics & legal aspects of nursing","Clinical simulation & OSCE preparation"] },
  { id:"data_scientist", title:"Data Scientist", sector:"Technology", description:"Extracts insights from data using statistics, machine learning, and domain expertise to inform business decisions.", riasec:{R:25,I:90,A:30,S:35,E:45,C:60}, ocean:{O:80,C:75,E:40,A:50,N:35}, cognitive:90, eq:50, grit:70, integrity:70, adaptability:75, values:["intellectual_growth","impact","innovation"], aiResilience:45, resilienceReason:"Routine modeling is increasingly automated; resilience depends on strategic framing, stakeholder communication, and AI oversight roles.", training:["Statistics, ML foundations & Python/R proficiency","SQL and big data platform skills","Business domain expertise & data storytelling","AI ethics, model governance & explainability"], examPrep:["AWS/GCP/Azure Data certifications","Google Data Analytics / IBM Data Science certificate","Mathematics: Linear algebra, probability & statistics","Python programming: NumPy, Pandas, Scikit-learn"] },
  { id:"psychologist", title:"Clinical Psychologist / Counselor", sector:"Healthcare", description:"Assesses and treats mental health conditions through therapy, counseling, and psychological assessment.", riasec:{R:10,I:70,A:40,S:95,E:25,C:35}, ocean:{O:70,C:70,E:50,A:90,N:35}, cognitive:75, eq:95, grit:75, integrity:90, adaptability:75, values:["helping_others","intellectual_growth","service"], aiResilience:90, resilienceReason:"Trust-based therapeutic relationships, ethical judgment, and deeply contextual human understanding cannot be substituted by AI.", training:["Graduate degree (Masters/PhD) & clinical licensure","3,000+ supervised clinical hours","Specialized therapy modalities (CBT, EMDR, DBT)","Ongoing supervision, ethics training & CPD"], examPrep:["EPPP (USA) / BPS Qualification (UK) / country board exam","Abnormal psychology, DSM-5 diagnostic criteria","Research methods, psychometrics & assessment tools","Ethics, multicultural counseling & professional standards"] },
  { id:"chef", title:"Chef / Culinary Professional", sector:"Hospitality", description:"Creates and prepares food, manages kitchen operations, and develops menus that delight guests.", riasec:{R:70,I:30,A:75,S:40,E:50,C:35}, ocean:{O:75,C:65,E:55,A:50,N:40}, cognitive:50, eq:55, grit:80, integrity:65, adaptability:80, values:["creativity","autonomy","tangible_results"], aiResilience:85, resilienceReason:"Sensory judgment, creative experimentation, and kitchen management resist automation deeply.", training:["Culinary school or structured apprenticeship","Food safety & HACCP certification","Menu development, costing & food science","Specialization: pastry, sommelier, specific cuisines"], examPrep:["ServSafe / HACCP food safety certification exam","Culinary Institute entrance: portfolio + practical test","Sommelier exams (WSET / Court of Master Sommeliers)","Kitchen management & cost control fundamentals"] },
  { id:"physiotherapist", title:"Physiotherapist", sector:"Healthcare", description:"Helps patients improve movement and manage pain through physical rehabilitation and exercise.", riasec:{R:50,I:55,A:20,S:85,E:30,C:40}, ocean:{O:55,C:75,E:55,A:80,N:30}, cognitive:65, eq:85, grit:75, integrity:85, adaptability:70, values:["helping_others","stability","service"], aiResilience:90, resilienceReason:"Hands-on manual therapy, individualized movement assessment, and motivational coaching require physical presence and empathy.", training:["Physiotherapy degree & national licensure","Supervised clinical placements (1,200+ hours)","Manual therapy & dry needling certifications","Specialization: sports, neurological, geriatric rehab"], examPrep:["NPTE (USA) / HCPC registration (UK) / country board exam","Anatomy, biomechanics & musculoskeletal assessment","Neurological & cardiopulmonary physiotherapy concepts","Clinical OSCE: patient handling & therapeutic techniques"] },
  { id:"entrepreneur", title:"Entrepreneur / Small Business Owner", sector:"Business", description:"Starts and runs an independent business, managing operations, people, finances, and growth strategy.", riasec:{R:45,I:50,A:50,S:50,E:90,C:50}, ocean:{O:75,C:70,E:70,A:50,N:35}, cognitive:75, eq:75, grit:95, integrity:75, adaptability:90, values:["autonomy","impact","financial_growth"], aiResilience:80, resilienceReason:"Vision-setting, relationship-building, risk-taking, and adapting to local market context are inherently human and entrepreneurial.", training:["Business fundamentals: finance, marketing, operations","Networking, sales & customer development skills","Leadership, resilience & adaptive thinking coaching","Regulatory, tax & local market knowledge"], examPrep:["MBA entrance: GMAT / GRE / CAT (India)","Business plan competitions & accelerator applications","CFA Level 1 (financial literacy foundation)","MSME / startup scheme eligibility assessments"] },
  { id:"teacher", title:"Teacher / Educator", sector:"Education", description:"Plans and delivers instruction, mentors students, and adapts teaching to diverse learning needs and backgrounds.", riasec:{R:25,I:55,A:50,S:90,E:45,C:45}, ocean:{O:65,C:70,E:65,A:80,N:35}, cognitive:70, eq:88, grit:75, integrity:85, adaptability:80, values:["helping_others","impact","service"], aiResilience:75, resilienceReason:"Mentorship, emotional development, classroom management, and personalized student motivation remain deeply relational and human.", training:["Teaching degree & certification / PGCE","Subject-matter expertise development & updates","Classroom management & differentiated instruction","EdTech & AI learning tool integration"], examPrep:["CTET / TET (India) / QTS (UK) / state licensing exam","Child development, pedagogy & learning theories","Subject-specific content knowledge assessments","Teaching practice portfolio & demo lesson evaluation"] },
  { id:"social_worker", title:"Social Worker", sector:"Social Services", description:"Supports individuals and families facing crisis, connecting them to resources and advocating for wellbeing.", riasec:{R:15,I:45,A:35,S:95,E:40,C:40}, ocean:{O:60,C:65,E:55,A:90,N:35}, cognitive:60, eq:92, grit:80, integrity:90, adaptability:75, values:["helping_others","service","justice"], aiResilience:88, resilienceReason:"Crisis intervention, trust-building, and navigating complex human and legal systems require sustained empathetic human presence.", training:["Social work degree (BSW/MSW) & licensure","Trauma-informed care & safeguarding certification","Case management systems & documentation","Local resource network knowledge & community ties"], examPrep:["ASWB licensing exam (USA) / SWE registration (UK)","Human behavior, social environment & systems theory","Social policy, law & ethical practice standards","Field placement documentation & competency assessment"] },
  { id:"construction_manager", title:"Construction Project Manager", sector:"Construction", description:"Plans, coordinates, and oversees construction projects from inception to completion on time and budget.", riasec:{R:70,I:40,A:20,S:45,E:75,C:60}, ocean:{O:50,C:80,E:60,A:55,N:35}, cognitive:70, eq:65, grit:80, integrity:85, adaptability:75, values:["stability","tangible_results","leadership"], aiResilience:85, resilienceReason:"On-site coordination, physical site judgment, contractor relationships, and adaptive problem-solving in unpredictable environments.", training:["Construction management degree/diploma or trade background","PMP or Prince2 project management certification","Safety regulation & site compliance training","Negotiation, vendor & subcontractor management"], examPrep:["PMP exam (PMI) / PRINCE2 Foundation & Practitioner","OSHA 30-hour construction safety certification","Civil engineering & building codes fundamentals","Quantity surveying & project cost estimation"] },
  { id:"elder_care", title:"Elder Care / Geriatric Specialist", sector:"Healthcare", description:"Provides care, companionship, and support services for elderly individuals in home or residential settings.", riasec:{R:35,I:30,A:20,S:95,E:25,C:45}, ocean:{O:50,C:70,E:55,A:90,N:30}, cognitive:50, eq:90, grit:80, integrity:85, adaptability:75, values:["helping_others","service","stability"], aiResilience:93, resilienceReason:"Companionship, hands-on personal care, and emotional connection for vulnerable populations is one of the most automation-resistant fields globally.", training:["Caregiver certification & practical skill training","First aid, medication management & dementia care","Family communication & end-of-life support training","Local eldercare regulations & safeguarding compliance"], examPrep:["CNA / HHA certification exam (USA) / NVQ Level 2–3 (UK)","Dementia care & Alzheimer's specialist certification","First aid & basic life support (BLS) certification","Safeguarding vulnerable adults: legal & ethical framework"] },
  { id:"ai_ethics", title:"AI Ethics & Governance Specialist", sector:"Technology/Policy", description:"Evaluates AI systems for fairness, bias, safety, and regulatory compliance across industries.", riasec:{R:15,I:80,A:30,S:55,E:50,C:65}, ocean:{O:80,C:75,E:50,A:60,N:35}, cognitive:85, eq:70, grit:70, integrity:95, adaptability:80, values:["justice","intellectual_growth","impact"], aiResilience:80, resilienceReason:"An emerging field created BY AI disruption — requires interdisciplinary judgment (ethics, law, tech) that's inherently human-oversight-based.", training:["Cross-disciplinary background: law, CS, or philosophy","AI governance frameworks (EU AI Act, ISO 42001)","Bias auditing methodology & fairness metrics","Stakeholder communication & policy writing skills"], examPrep:["Certified Ethical Emerging Technologist (CEET)","EU AI Act compliance professional courses","MIT / Oxford / Stanford AI ethics online certifications","Legal research methods & regulatory writing skills"] },
  { id:"massage_therapist", title:"Massage Therapist", sector:"Wellness", description:"Provides therapeutic touch-based treatments for relaxation, pain relief, and physical rehabilitation.", riasec:{R:60,I:25,A:35,S:75,E:30,C:30}, ocean:{O:55,C:65,E:50,A:80,N:35}, cognitive:45, eq:80, grit:65, integrity:80, adaptability:65, values:["helping_others","autonomy","service"], aiResilience:92, resilienceReason:"Physical touch, tactile diagnosis, and the human connection of bodywork are fundamentally non-digital and non-automatable.", training:["Massage therapy certification & licensure","Anatomy, physiology & kinesiology coursework","Specialization: sports massage, prenatal, lymphatic drainage","Business basics & client management for private practice"], examPrep:["MBLEx (USA) / country-specific licensing board exam","Anatomy & physiology written and practical assessments","Pathology contraindications & treatment planning","Business & ethics for massage therapy practice"] },
  { id:"financial_advisor", title:"Financial Advisor / Wealth Manager", sector:"Finance", description:"Advises individuals and businesses on financial planning, investments, and risk management strategies.", riasec:{R:15,I:55,A:20,S:65,E:75,C:70}, ocean:{O:55,C:80,E:60,A:60,N:35}, cognitive:80, eq:80, grit:75, integrity:92, adaptability:70, values:["financial_growth","service","stability"], aiResilience:60, resilienceReason:"Robo-advisors handle basic portfolio management; trust-based relationships during major life decisions remain irreplaceably human.", training:["Financial certification: CFP, CFA, or regional equivalent","Regulatory compliance & fiduciary duty training","AI-assisted financial analysis tool fluency","Client communication, trust-building & EQ coaching"], examPrep:["CFP exam (6 domains: planning, investment, tax, estate)","CFA Level 1–3 (ethics, economics, portfolio management)","NISM / SEBI certification (India) / FCA authorization (UK)","Securities law, compliance & financial planning case studies"] },
  { id:"cybersecurity", title:"Cybersecurity Analyst", sector:"Technology", description:"Protects systems and data from threats through monitoring, defense strategy, and incident response.", riasec:{R:30,I:80,A:25,S:35,E:40,C:65}, ocean:{O:70,C:80,E:40,A:45,N:40}, cognitive:88, eq:50, grit:80, integrity:90, adaptability:80, values:["intellectual_growth","justice","stability"], aiResilience:65, resilienceReason:"Adversarial human attackers require human creative defense, judgment, and ethical incident-response that AI supports but cannot replace.", training:["Security certifications: CompTIA Security+, CISSP, CEH","Hands-on labs, CTF competitions & threat simulation","AI-driven SIEM & threat intelligence tool fluency","Incident response, forensics & ethical hacking practice"], examPrep:["CompTIA Security+ / Network+ certification exams","CEH (Certified Ethical Hacker) exam preparation","CISSP: 8 domains of cybersecurity knowledge","Hands-on: TryHackMe, HackTheBox, Capture the Flag"] },
  { id:"speech_pathologist", title:"Speech-Language Pathologist", sector:"Healthcare", description:"Assesses and treats communication and swallowing disorders across all ages and clinical conditions.", riasec:{R:25,I:60,A:35,S:90,E:30,C:45}, ocean:{O:60,C:75,E:55,A:80,N:30}, cognitive:75, eq:88, grit:75, integrity:85, adaptability:75, values:["helping_others","service","stability"], aiResilience:88, resilienceReason:"Individualized therapeutic relationships with patients requiring patience and adaptive communication are difficult to automate.", training:["Graduate degree & clinical licensure (CCC-SLP or equivalent)","500+ supervised clinical hours across settings","Specialization: pediatric language, dysphagia, neurogenic disorders","AAC device & assistive communication technology skills"], examPrep:["Praxis SLP exam (USA) / HCPC registration (UK)","Phonetics, linguistics & language acquisition theory","Anatomy of speech mechanism & dysphagia management","Clinical methods: AAC, fluency, voice & resonance"] },
  { id:"diplomat", title:"Diplomat / Foreign Service Officer", sector:"Government", description:"Represents national interests abroad through negotiation, relationship-building, and international policy development.", riasec:{R:10,I:60,A:35,S:70,E:75,C:55}, ocean:{O:75,C:75,E:65,A:60,N:35}, cognitive:85, eq:85, grit:85, integrity:92, adaptability:90, values:["justice","impact","service"], aiResilience:88, resilienceReason:"High-stakes negotiation, cross-cultural relationship building, and geopolitical judgment require deeply human trust and discretion.", training:["Civil/foreign service entrance exams & competitive selection","Language proficiency: 2+ languages at advanced level","Cross-cultural communication & protocol training","International law, policy analysis & negotiation skills"], examPrep:["IFS / UPSC Civil Services (India) / FSOT (USA) / FCDO (UK)","International relations, geopolitics & diplomatic history","Constitutional law, public policy & governance","Essay writing, group discussion & personality interview"] },
  { id:"lawyer", title:"Lawyer / Legal Counsel", sector:"Legal", description:"Provides legal advice, represents clients, and navigates regulatory, contractual, and litigation matters.", riasec:{R:15,I:65,A:30,S:55,E:70,C:65}, ocean:{O:65,C:80,E:60,A:50,N:40}, cognitive:90, eq:70, grit:80, integrity:90, adaptability:70, values:["justice","intellectual_growth","impact"], aiResilience:55, resilienceReason:"Document review is increasingly automated; courtroom advocacy, ethical judgment in ambiguous cases, and client trust remain human-led.", training:["Law degree & bar admission (LLB/JD + bar exam)","AI legal research tool fluency (Harvey, CaseText)","Courtroom advocacy & negotiation skills","Specialization: litigation, corporate, IP, or emerging tech law"], examPrep:["LSAT (USA/Canada) / CLAT (India) / SQE (UK)","Constitutional law, torts, contracts & criminal law","Legal reasoning, case analysis & moot court practice","Bar exam: MBE or country equivalent"] },
  { id:"midwife", title:"Midwife", sector:"Healthcare", description:"Provides holistic care for pregnant individuals through pregnancy, labor, birth, and postpartum recovery.", riasec:{R:45,I:55,A:20,S:90,E:30,C:40}, ocean:{O:55,C:75,E:55,A:85,N:30}, cognitive:70, eq:90, grit:85, integrity:90, adaptability:80, values:["helping_others","service","stability"], aiResilience:92, resilienceReason:"Childbirth support requires physical presence, real-time clinical judgment, and deep emotional trust during a vulnerable life event.", training:["Midwifery degree/diploma & national licensure","Supervised birth attendance (clinical hours requirement)","Emergency obstetric care & neonatal resuscitation","Postnatal mental health & family support training"], examPrep:["NMC registration (UK) / AMCB exam (USA) / country board","Obstetric anatomy, physiology of pregnancy & labor","Emergency obstetric protocols & neonatal assessment","Pharmacology in midwifery & clinical decision making"] },
  { id:"personal_trainer", title:"Personal Trainer / Fitness Coach", sector:"Wellness", description:"Designs and guides individualized fitness programs and motivates clients toward sustainable health goals.", riasec:{R:55,I:30,A:25,S:80,E:55,C:35}, ocean:{O:55,C:70,E:65,A:65,N:35}, cognitive:50, eq:80, grit:80, integrity:75, adaptability:75, values:["helping_others","autonomy","service"], aiResilience:80, resilienceReason:"Motivation, accountability, real-time feedback, and hands-on form correction in physical training require embodied human presence.", training:["Personal training certification: NASM, ACE, ISSA or equivalent","Nutrition science fundamentals & practical application","Injury prevention, corrective exercise & anatomy","Client psychology, behavior change & motivation coaching"], examPrep:["NASM-CPT / ACE-CPT / ISSA certification written exam","Exercise physiology, anatomy & biomechanics","Nutrition fundamentals & special populations training","Practical assessment: program design & client demonstrations"] },
  { id:"urban_planner", title:"Urban / City Planner", sector:"Government/Policy", description:"Plans land use, zoning, and infrastructure to shape livable, sustainable, and equitable communities.", riasec:{R:35,I:65,A:45,S:60,E:50,C:60}, ocean:{O:70,C:75,E:50,A:60,N:35}, cognitive:80, eq:70, grit:70, integrity:85, adaptability:70, values:["impact","justice","stability"], aiResilience:75, resilienceReason:"Community engagement, political negotiation, and balancing competing stakeholder interests require human judgment, trust, and democratic legitimacy.", training:["Urban planning degree (MURP or equivalent)","GIS, spatial analysis & AI planning tool fluency","Public engagement, facilitation & conflict resolution","Zoning law, environmental policy & sustainable design"], examPrep:["AICP exam (USA) / RTPI Assessment (UK) / country equivalent","Urban land use law, zoning codes & environmental regulations","GIS & spatial data analysis practical skills","Community development, housing policy & transport planning"] },
  { id:"landscape_designer", title:"Landscape Designer / Horticulturist", sector:"Design/Agriculture", description:"Designs and maintains outdoor spaces, gardens, and green infrastructure for people and ecosystems.", riasec:{R:75,I:40,A:65,S:30,E:35,C:35}, ocean:{O:75,C:65,E:45,A:55,N:35}, cognitive:60, eq:55, grit:70, integrity:70, adaptability:70, values:["creativity","autonomy","tangible_results"], aiResilience:85, resilienceReason:"Site-specific physical work with living systems, weather variability, and client-specific aesthetic judgment resists automation.", training:["Horticulture / landscape design certification or degree","Plant science, soil health & local ecosystem knowledge","CAD, SketchUp & visualization software basics","Business operations & client management for self-employment"], examPrep:["RHS Level 2–3 (UK) / LDP certification (USA)","Plant identification, soil science & ecology exams","AutoCAD / SketchUp landscape drafting assessment","Business planning & project costing for landscape practice"] },
  { id:"hr_manager", title:"HR / People Operations Manager", sector:"Business", description:"Manages talent acquisition, employee relations, organizational culture, and people development strategy.", riasec:{R:15,I:40,A:30,S:80,E:65,C:60}, ocean:{O:60,C:75,E:60,A:75,N:35}, cognitive:70, eq:88, grit:70, integrity:88, adaptability:75, values:["helping_others","stability","leadership"], aiResilience:70, resilienceReason:"Conflict resolution, culture-building, and sensitive interpersonal judgment in terminations and disputes require deeply human discretion.", training:["HR certification: SHRM-CP, CIPD Level 5 or equivalent","Employment law & compliance updates (region-specific)","Conflict resolution, mediation & coaching skills","People analytics & HRIS platform fluency"], examPrep:["SHRM-CP / SHRM-SCP (USA) or CIPD Level 5 (UK) exam","Employment law, labor relations & HR ethics","Organizational behavior, talent management & L&D","HR analytics: data interpretation & workforce planning"] },
  { id:"event_planner", title:"Event Planner / Producer", sector:"Hospitality", description:"Designs, coordinates, and executes events — from intimate gatherings to large-scale productions.", riasec:{R:30,I:30,A:70,S:65,E:75,C:55}, ocean:{O:75,C:75,E:65,A:60,N:40}, cognitive:60, eq:80, grit:80, integrity:70, adaptability:90, values:["creativity","autonomy","tangible_results"], aiResilience:75, resilienceReason:"Real-time problem solving, vendor relationships, and on-the-ground crisis management during live events resist automation.", training:["Event management certification (CMP or regional equivalent)","Vendor sourcing, contract negotiation & budget management","Crisis management & contingency planning for live events","Industry networking & portfolio development"], examPrep:["CMP (Certified Meeting Professional) exam","Event budgeting, venue contracts & supplier negotiation","Health & safety, risk assessment for public events","Portfolio review: event design brief & case study presentation"] },
  { id:"early_childhood", title:"Early Childhood Educator", sector:"Education", description:"Supports the developmental, social, emotional, and educational growth of young children aged 0–8.", riasec:{R:30,I:35,A:55,S:95,E:35,C:40}, ocean:{O:60,C:70,E:65,A:85,N:30}, cognitive:55, eq:92, grit:80, integrity:88, adaptability:80, values:["helping_others","service","stability"], aiResilience:90, resilienceReason:"Early childhood development is fundamentally relational — requiring nurturing, physical presence, and responsive human connection.", training:["Early childhood education diploma/degree & certification","Child development theory & age-appropriate pedagogy","Safeguarding, first aid & mandatory reporting training","Parent communication & family engagement strategies"], examPrep:["CDA credential exam (USA) / CACHE Level 3 (UK) / country equiv.","Child development theories: Piaget, Vygotsky, Erikson","Observation, documentation & assessment of young children","Safeguarding law, child protection protocols & ethics"] },
  { id:"architect", title:"Architect", sector:"Design/Construction", description:"Designs buildings and spaces, balancing aesthetics, function, sustainability, and regulatory requirements.", riasec:{R:55,I:65,A:80,S:35,E:45,C:55}, ocean:{O:85,C:75,E:45,A:50,N:35}, cognitive:85, eq:60, grit:75, integrity:75, adaptability:75, values:["creativity","tangible_results","intellectual_growth"], aiResilience:65, resilienceReason:"AI assists drafting and visualization, but holistic design judgment, client relationships, and regulatory navigation remain human.", training:["Architecture degree (5–7 years), internship & licensure","AI-assisted CAD, BIM & generative design tool fluency","Building codes, accessibility & sustainability standards","Client presentation, stakeholder management & project leadership"], examPrep:["Architecture Registration Exam (ARE 5.0, USA) / ARB (UK)","Building technology, structures & environmental systems","History & theory of architecture","Design portfolio: studio projects & technical drawings review"] },
  { id:"marketing_strategist", title:"Marketing Strategist / Brand Manager", sector:"Business", description:"Develops brand positioning, campaign strategy, and market growth plans for organizations.", riasec:{R:20,I:50,A:65,S:55,E:80,C:45}, ocean:{O:75,C:65,E:70,A:55,N:40}, cognitive:75, eq:75, grit:70, integrity:65, adaptability:80, values:["creativity","impact","financial_growth"], aiResilience:50, resilienceReason:"AI handles content generation and analytics; resilience depends on strategic vision, cultural insight, and cross-functional leadership.", training:["Marketing fundamentals: brand strategy, consumer psychology","Data analytics, SEO & performance marketing platforms","AI content & campaign tool integration","Storytelling, stakeholder influence & executive communication"], examPrep:["Google Ads / Analytics certification","Meta Blueprint & digital marketing certifications","CIM (Chartered Institute of Marketing) diploma exams","Brand strategy case study presentations & portfolio"] },
  { id:"veterinarian", title:"Veterinarian", sector:"Healthcare", description:"Diagnoses and treats illnesses, injuries, and preventive care needs in animals across species.", riasec:{R:55,I:75,A:20,S:65,E:35,C:45}, ocean:{O:60,C:80,E:50,A:75,N:35}, cognitive:85, eq:75, grit:80, integrity:85, adaptability:70, values:["helping_others","service","stability"], aiResilience:88, resilienceReason:"Physical examination, surgical skill, and animal handling judgment cannot be replicated remotely or digitally at scale.", training:["Veterinary medicine degree (4–6 years) & licensure","Clinical rotations & species-specific hands-on training","Surgical skills development & emergency medicine","Specialization: small animal, large animal, exotic, oncology"], examPrep:["NAVLE (USA) / RCVS membership (UK) / country board exam","Veterinary anatomy, physiology & pharmacology","Pathology, clinical diagnosis & surgical techniques","Animal behavior, welfare & veterinary ethics"] },
  { id:"product_manager", title:"Product Manager", sector:"Technology", description:"Defines product vision, prioritizes roadmaps, and bridges engineering, design, and business stakeholders.", riasec:{R:20,I:60,A:45,S:60,E:80,C:55}, ocean:{O:70,C:75,E:65,A:60,N:35}, cognitive:80, eq:80, grit:75, integrity:75, adaptability:85, values:["impact","innovation","leadership"], aiResilience:60, resilienceReason:"Stakeholder alignment, prioritization judgment, and cross-functional leadership require human negotiation and vision-setting AI can't replicate.", training:["Product management certification (AIPMM, SVPG frameworks)","Data literacy: SQL, analytics & A/B testing fundamentals","Stakeholder communication, negotiation & leadership skills","Domain expertise in target industry or technology vertical"], examPrep:["AIPMM CPM / PMPO certification exam","Google UX Design / Product Analytics certifications","Case study interviews: product design, estimation, strategy","Technical literacy: system design basics, APIs, agile/scrum"] },
];

// ─── ASSESSMENT ITEMS ────────────────────────────────────────────────────────
const COGNITIVE_ITEMS = [
  { id:"c1", text:"Which number comes next: 2, 6, 12, 20, 30, ?", options:["36","40","42","44"], correct:2 },
  { id:"c2", text:"If all Zigs are Zags, and all Zags are Zogs, then all Zigs are:", options:["Zogs","Not Zogs","Zags but not Zogs","Cannot be determined"], correct:0 },
  { id:"c3", text:"BOOK is to READ as FORK is to:", options:["Kitchen","Eat","Spoon","Metal"], correct:1 },
  { id:"c4", text:"A train travels 60 km in 45 minutes. How far in 2 hours?", options:["120 km","150 km","160 km","180 km"], correct:2 },
  { id:"c5", text:"Which word does NOT belong: Trumpet, Flute, Violin, Drum?", options:["Trumpet","Flute","Violin","Drum"], correct:2 },
  { id:"c6", text:"Author is to Book as Composer is to:", options:["Orchestra","Symphony","Piano","Concert"], correct:1 },
  { id:"c7", text:"Rearranging 'NEWDOOR' gives the name of a:", options:["City","Animal","Ocean","Country"], correct:2 },
  { id:"c8", text:"A is taller than B. C is shorter than B. Who is tallest?", options:["A","B","C","Cannot be determined"], correct:0 },
  { id:"c9", text:"What is 15% of 240?", options:["24","30","36","42"], correct:2 },
  { id:"c10", text:"If today is Wednesday, what day is it 100 days from now?", options:["Monday","Tuesday","Thursday","Friday"], correct:2 },
  { id:"c11", text:"Odd one out: 121, 144, 169, 200, 225", options:["144","169","200","225"], correct:2 },
  { id:"c12", text:"Complete: 1, 1, 2, 3, 5, 8, 13, ?", options:["18","20","21","24"], correct:2 },
  { id:"c13", text:"'No fish can fly. A trout is a fish.' Therefore:", options:["A trout can fly","A trout cannot fly","Some fish can fly","Cannot be determined"], correct:1 },
  { id:"c14", text:"A rectangle has perimeter 24 cm, length 7 cm. Width?", options:["3 cm","4 cm","5 cm","6 cm"], correct:1 },
  { id:"c15", text:"Which is prime?", options:["91","87","97","99"], correct:2 },
  { id:"c16", text:"5 machines make 5 widgets in 5 minutes. 100 machines, 100 widgets?", options:["5 minutes","20 minutes","100 minutes","1 minute"], correct:0 },
  { id:"c17", text:"Opposite of 'meticulous'?", options:["Careful","Careless","Curious","Cautious"], correct:1 },
  { id:"c18", text:"STRIPE → TUSJQF. PLANT → ?", options:["QMBOU","QMBOT","OKZMS","QNBOU"], correct:0 },
  { id:"c19", text:"Clock shows 3:15. Angle between hour & minute hands?", options:["0°","7.5°","15°","22.5°"], correct:1 },
  { id:"c20", text:"Circle, Square, Circle, Square, Circle — next?", options:["Circle","Square","Triangle","Hexagon"], correct:1 },
];
const EQ_ITEMS = [
  { id:"eq1", text:"I can usually tell how someone is feeling even if they don't say it.", reverse:false },
  { id:"eq2", text:"When I'm upset, I find it hard to calm myself down.", reverse:true },
  { id:"eq3", text:"I notice when my mood is affecting how I treat other people.", reverse:false },
  { id:"eq4", text:"I find it difficult to understand why people react the way they do.", reverse:true },
  { id:"eq5", text:"I can stay calm and think clearly during stressful situations.", reverse:false },
  { id:"eq6", text:"I often say things I regret when I'm angry or frustrated.", reverse:true },
  { id:"eq7", text:"I am good at resolving conflicts between people.", reverse:false },
  { id:"eq8", text:"I struggle to adapt my communication style to different people.", reverse:true },
  { id:"eq9", text:"I can recognize my own emotional triggers before they take over.", reverse:false },
  { id:"eq10", text:"Other people's emotions don't really affect me.", reverse:true },
  { id:"eq11", text:"I actively listen to understand, not just to respond.", reverse:false },
  { id:"eq12", text:"I find it hard to give or receive constructive feedback gracefully.", reverse:true },
  { id:"eq13", text:"I can motivate myself even when things feel discouraging.", reverse:false },
  { id:"eq14", text:"I tend to avoid difficult conversations rather than address them.", reverse:true },
  { id:"eq15", text:"I can sense tension in a room even before anyone speaks.", reverse:false },
];
const MBTI_ITEMS = [
  { id:"m1", dichotomy:"EI", a:"I feel energized after spending time with a group.", b:"I feel energized after quiet time alone." },
  { id:"m2", dichotomy:"EI", a:"I prefer to think out loud and talk through ideas.", b:"I prefer to think privately before speaking." },
  { id:"m3", dichotomy:"EI", a:"At a party, I mingle with many people.", b:"At a party, I stick with a few people I know." },
  { id:"m4", dichotomy:"EI", a:"I find it easy to start conversations with strangers.", b:"I find small talk with strangers draining." },
  { id:"m5", dichotomy:"EI", a:"I prefer active, busy work environments.", b:"I prefer calm, quiet work environments." },
  { id:"m6", dichotomy:"EI", a:"I tend to act first and reflect later.", b:"I tend to reflect first and act later." },
  { id:"m7", dichotomy:"SN", a:"I focus on concrete facts and present realities.", b:"I focus on patterns, possibilities, and future implications." },
  { id:"m8", dichotomy:"SN", a:"I prefer step-by-step instructions.", b:"I prefer figuring things out my own way." },
  { id:"m9", dichotomy:"SN", a:"I trust experience and what has worked before.", b:"I trust inspiration and new ways of doing things." },
  { id:"m10", dichotomy:"SN", a:"I notice small details others might miss.", b:"I notice the big picture more than details." },
  { id:"m11", dichotomy:"SN", a:"I prefer practical, applicable knowledge.", b:"I enjoy abstract theories for their own sake." },
  { id:"m12", dichotomy:"SN", a:"I describe things in specific, literal terms.", b:"I use metaphors and analogies naturally." },
  { id:"m13", dichotomy:"TF", a:"I prioritize logic and consistency in decisions.", b:"I prioritize people's feelings and harmony." },
  { id:"m14", dichotomy:"TF", a:"I give feedback directly, even if it stings.", b:"I give feedback gently, considering impact." },
  { id:"m15", dichotomy:"TF", a:"I value being seen as competent and fair.", b:"I value being seen as kind and supportive." },
  { id:"m16", dichotomy:"TF", a:"I make decisions based on objective analysis.", b:"I make decisions based on personal values." },
  { id:"m17", dichotomy:"TF", a:"Conflict is acceptable if it leads to the right outcome.", b:"Conflict should be minimized to preserve relationships." },
  { id:"m18", dichotomy:"TF", a:"I critique ideas critically and directly.", b:"I find positives before raising concerns." },
  { id:"m19", dichotomy:"JP", a:"I like having a clear plan and sticking to it.", b:"I like keeping options open and being spontaneous." },
  { id:"m20", dichotomy:"JP", a:"I feel satisfied completing tasks ahead of time.", b:"I work best under the pressure of a deadline." },
  { id:"m21", dichotomy:"JP", a:"I prefer organized, structured environments.", b:"I prefer flexible, adaptable environments." },
  { id:"m22", dichotomy:"JP", a:"I make decisions quickly and move on.", b:"I keep exploring options before deciding." },
  { id:"m23", dichotomy:"JP", a:"My workspace tends to be organized and tidy.", b:"My workspace is functional but can be cluttered." },
  { id:"m24", dichotomy:"JP", a:"I finish one task completely before starting another.", b:"I enjoy juggling multiple tasks simultaneously." },
];
const RIASEC_ITEMS = [
  { id:"r1", text:"Repairing mechanical or electronic equipment", category:"R" },
  { id:"r2", text:"Building or constructing things with tools", category:"R" },
  { id:"r3", text:"Working outdoors with machinery, plants, or animals", category:"R" },
  { id:"r4", text:"Operating vehicles, heavy equipment, or technical instruments", category:"R" },
  { id:"r5", text:"Doing physically active, hands-on work", category:"R" },
  { id:"i1", text:"Conducting scientific experiments or research", category:"I" },
  { id:"i2", text:"Solving complex mathematical or logical problems", category:"I" },
  { id:"i3", text:"Analyzing data to find patterns or insights", category:"I" },
  { id:"i4", text:"Reading about scientific theories or discoveries", category:"I" },
  { id:"i5", text:"Diagnosing the root cause of a problem before fixing it", category:"I" },
  { id:"a1", text:"Creating art, music, writing, or design", category:"A" },
  { id:"a2", text:"Expressing ideas in original or unconventional ways", category:"A" },
  { id:"a3", text:"Performing in front of others (acting, music, dance)", category:"A" },
  { id:"a4", text:"Designing spaces, products, or visual experiences", category:"A" },
  { id:"a5", text:"Improvising or experimenting without a fixed plan", category:"A" },
  { id:"s1", text:"Teaching, training, or mentoring others", category:"S" },
  { id:"s2", text:"Helping people resolve personal problems", category:"S" },
  { id:"s3", text:"Working as part of a caring or support team", category:"S" },
  { id:"s4", text:"Listening to people and offering guidance", category:"S" },
  { id:"s5", text:"Volunteering for causes that help communities", category:"S" },
  { id:"e1", text:"Persuading others to support an idea or buy a product", category:"E" },
  { id:"e2", text:"Leading a team toward a shared goal", category:"E" },
  { id:"e3", text:"Starting new projects or ventures", category:"E" },
  { id:"e4", text:"Negotiating deals or resolving disputes", category:"E" },
  { id:"e5", text:"Taking calculated risks to pursue ambitious goals", category:"E" },
  { id:"c1r", text:"Organizing files, records, or schedules meticulously", category:"C" },
  { id:"c2r", text:"Following clear procedures and established rules", category:"C" },
  { id:"c3r", text:"Working with numbers, spreadsheets, or budgets", category:"C" },
  { id:"c4r", text:"Ensuring accuracy and attention to detail", category:"C" },
  { id:"c5r", text:"Maintaining order and structure in a workplace", category:"C" },
];
const OCEAN_ITEMS = [
  { id:"o1", text:"I enjoy exploring new ideas and unconventional approaches.", trait:"O", reverse:false },
  { id:"o2", text:"I have a vivid imagination.", trait:"O", reverse:false },
  { id:"o3", text:"I prefer familiar routines over new experiences.", trait:"O", reverse:true },
  { id:"o4", text:"I'm curious about many different topics.", trait:"O", reverse:false },
  { id:"o5", text:"I rarely think about abstract or philosophical questions.", trait:"O", reverse:true },
  { id:"c1b", text:"I plan ahead carefully rather than acting on impulse.", trait:"C", reverse:false },
  { id:"c2b", text:"I keep my commitments and follow through on promises.", trait:"C", reverse:false },
  { id:"c3b", text:"I often leave tasks unfinished or postpone them.", trait:"C", reverse:true },
  { id:"c4b", text:"I pay close attention to details in my work.", trait:"C", reverse:false },
  { id:"c5b", text:"My workspace and schedule tend to be disorganized.", trait:"C", reverse:true },
  { id:"e1b", text:"I feel comfortable being the center of attention.", trait:"E", reverse:false },
  { id:"e2b", text:"I gain energy from being around other people.", trait:"E", reverse:false },
  { id:"e3b", text:"I prefer to keep to myself in social settings.", trait:"E", reverse:true },
  { id:"e4b", text:"I am talkative and outgoing with new people.", trait:"E", reverse:false },
  { id:"e5b", text:"I need a lot of alone time to recharge.", trait:"E", reverse:true },
  { id:"a1b", text:"I genuinely care about the wellbeing of others.", trait:"A", reverse:false },
  { id:"a2b", text:"I find it easy to trust people.", trait:"A", reverse:false },
  { id:"a3b", text:"I sometimes put my own interests first without much concern.", trait:"A", reverse:true },
  { id:"a4b", text:"I try to be considerate and avoid hurting others' feelings.", trait:"A", reverse:false },
  { id:"a5b", text:"I can be blunt or insensitive without realizing it.", trait:"A", reverse:true },
  { id:"n1", text:"I often feel anxious or worried about things.", trait:"N", reverse:false },
  { id:"n2", text:"My mood can change quickly and unpredictably.", trait:"N", reverse:false },
  { id:"n3", text:"I generally stay calm and emotionally stable under pressure.", trait:"N", reverse:true },
  { id:"n4", text:"I tend to dwell on negative experiences.", trait:"N", reverse:false },
  { id:"n5", text:"I rarely feel stressed, even in difficult situations.", trait:"N", reverse:true },
];
const VALUES_ITEMS = [
  { id:"v1", text:"Making a meaningful difference in other people's lives", tag:"helping_others" },
  { id:"v2", text:"Having a stable, predictable job and income", tag:"stability" },
  { id:"v3", text:"Making my own decisions without close supervision", tag:"autonomy" },
  { id:"v4", text:"Expressing myself creatively in my work", tag:"creativity" },
  { id:"v5", text:"Continuously learning and growing intellectually", tag:"intellectual_growth" },
  { id:"v6", text:"Having a large positive impact on society", tag:"impact" },
  { id:"v7", text:"Working on cutting-edge or innovative projects", tag:"innovation" },
  { id:"v8", text:"Earning a high income and building wealth", tag:"financial_growth" },
  { id:"v9", text:"Being of service to others, even behind the scenes", tag:"service" },
  { id:"v10", text:"Standing up for fairness and justice", tag:"justice" },
  { id:"v11", text:"Seeing tangible, physical results from my work", tag:"tangible_results" },
  { id:"v12", text:"Leading and guiding others toward goals", tag:"leadership" },
  { id:"v13", text:"Acting with strong personal integrity under pressure", tag:"integrity" },
];
const MI_ITEMS = [
  { id:"mi1", text:"I find it easy to express ideas through writing or speaking.", domain:"Linguistic" },
  { id:"mi2", text:"I enjoy debating, reading, or playing word games.", domain:"Linguistic" },
  { id:"mi3", text:"I'm good at recognizing patterns and solving logical puzzles.", domain:"Logical-Math" },
  { id:"mi4", text:"I enjoy working with numbers, formulas, or systematic processes.", domain:"Logical-Math" },
  { id:"mi5", text:"I can easily picture objects, layouts, or designs in my mind.", domain:"Spatial" },
  { id:"mi6", text:"I'm good at reading maps, diagrams, or visualizing 3D spaces.", domain:"Spatial" },
  { id:"mi7", text:"I learn best by physically doing or practicing something.", domain:"Kinesthetic" },
  { id:"mi8", text:"I have good physical coordination (sports, dance, crafts).", domain:"Kinesthetic" },
  { id:"mi9", text:"I can easily pick up rhythms, melodies, or musical patterns.", domain:"Musical" },
  { id:"mi10", text:"Music significantly affects my mood and concentration.", domain:"Musical" },
  { id:"mi11", text:"I'm skilled at understanding what motivates other people.", domain:"Interpersonal" },
  { id:"mi12", text:"People often come to me for advice or to resolve conflicts.", domain:"Interpersonal" },
  { id:"mi13", text:"I spend time reflecting on my own thoughts, goals, and values.", domain:"Intrapersonal" },
  { id:"mi14", text:"I have a clear sense of my own strengths and weaknesses.", domain:"Intrapersonal" },
  { id:"mi15", text:"I notice and appreciate patterns in nature easily.", domain:"Naturalistic" },
  { id:"mi16", text:"I feel drawn to working with plants, animals, or the outdoors.", domain:"Naturalistic" },
];
const GRIT_ITEMS = [
  { id:"g1", text:"I finish whatever I begin, even when it's difficult.", reverse:false },
  { id:"g2", text:"Setbacks don't discourage me — they motivate me to try harder.", reverse:false },
  { id:"g3", text:"New ideas and projects sometimes distract me from ongoing ones.", reverse:true },
  { id:"g4", text:"I am a hard worker. I never give up.", reverse:false },
  { id:"g5", text:"I often set a goal but later choose to pursue a different one.", reverse:true },
  { id:"g6", text:"I have overcome significant setbacks to complete something important.", reverse:false },
  { id:"g7", text:"I have difficulty maintaining focus on long-term projects.", reverse:true },
  { id:"g8", text:"I have achieved a goal that took years of consistent effort.", reverse:false },
  { id:"g9", text:"My interests change significantly from year to year.", reverse:true },
  { id:"g10", text:"Failure makes me more determined to succeed next time.", reverse:false },
  { id:"g11", text:"I become frustrated and lose motivation when progress is slow.", reverse:true },
  { id:"g12", text:"I maintain focus on a goal, even when others have given up.", reverse:false },
];
const CONFLICT_ITEMS = [
  { id:"cf1", text:"I stay calm even when someone criticizes me unfairly.", type:"likert", reverse:false },
  { id:"cf2", text:"Small frustrations can quickly turn into anger for me.", type:"likert", reverse:true },
  { id:"cf3", text:"I can wait patiently for results without becoming anxious.", type:"likert", reverse:false },
  { id:"cf4", text:"I tend to raise my voice when I disagree strongly.", type:"likert", reverse:true },
  { id:"cf5", text:"I can separate the issue from the person during a disagreement.", type:"likert", reverse:false },
  { id:"cf6", type:"scenario", text:"A colleague takes credit for your idea in front of leadership. You:", options:["Confront them angrily in front of everyone","Say nothing and quietly resent them","Calmly clarify your contribution, then discuss privately later","Complain to other colleagues afterward"], scores:[1,2,4,1] },
  { id:"cf7", text:"I hold onto grudges for a long time after a conflict.", type:"likert", reverse:true },
  { id:"cf8", text:"I can listen to an opposing viewpoint without becoming defensive.", type:"likert", reverse:false },
  { id:"cf9", type:"scenario", text:"You're stuck in a long queue behind a slow customer. You:", options:["Feel frustration rising and consider saying something sharp","Sigh loudly and look visibly annoyed","Feel mildly impatient but use the time productively","Feel completely unaffected"], scores:[1,2,4,3] },
  { id:"cf10", text:"Under tight deadlines, I become irritable with others.", type:"likert", reverse:true },
  { id:"cf11", text:"I believe most conflicts can be resolved through calm discussion.", type:"likert", reverse:false },
  { id:"cf12", type:"scenario", text:"A team member repeatedly misses deadlines, affecting your work. You:", options:["Report them to management immediately, without speaking to them","Avoid the topic to prevent conflict","Have a direct, respectful conversation to find solutions","Start doing their work yourself without saying anything"], scores:[2,1,4,1] },
  { id:"cf13", text:"I find it difficult to apologize, even when I'm wrong.", type:"likert", reverse:true },
  { id:"cf14", text:"I can manage my temper even in high-pressure situations.", type:"likert", reverse:false },
  { id:"cf15", text:"I tend to interrupt others when I feel strongly about a topic.", type:"likert", reverse:true },
];
const ETHICS_ITEMS = [
  { id:"et1", text:"I would report a colleague's serious mistake even at personal cost.", type:"likert", reverse:false },
  { id:"et2", text:"I sometimes bend the truth slightly to avoid uncomfortable situations.", type:"likert", reverse:true },
  { id:"et3", type:"scenario", text:"You discover a pricing error generating huge sales. Manager is thrilled. You:", options:["Say nothing — it's bringing in business","Quietly fix it without telling anyone","Inform your manager of the error and implications","Mention it casually to a coworker but not management"], scores:[1,2,4,1] },
  { id:"et4", text:"I follow rules and policies even when no one is watching.", type:"likert", reverse:false },
  { id:"et5", text:"I am comfortable taking large financial risks for large rewards.", type:"likert", reverse:false },
  { id:"et6", type:"scenario", text:"You exaggerated an achievement in an interview and got the job. You feel:", options:["Fine — everyone does it in interviews","Uneasy but I'd let it go","Uncomfortable and would clarify the truth when relevant","I wouldn't have exaggerated in the first place"], scores:[1,2,3,4] },
  { id:"et7", text:"I avoid taking credit for work I didn't do.", type:"likert", reverse:false },
  { id:"et8", text:"I prefer guaranteed smaller outcomes over risky larger ones.", type:"likert", reverse:false },
  { id:"et9", type:"scenario", text:"A friend asks you to falsely confirm their alibi for being late to work. You:", options:["Agree immediately — it's a small favor","Agree but feel guilty about it","Decline, but offer to help them communicate honestly","Tell their manager the truth without asking the friend first"], scores:[1,2,4,2] },
  { id:"et10", text:"I think the ends sometimes justify the means.", type:"likert", reverse:true },
  { id:"et11", text:"I would speak up about unethical behavior at work, even if risky.", type:"likert", reverse:false },
  { id:"et12", text:"I enjoy activities with an element of danger or unpredictability.", type:"likert", reverse:false },
  { id:"et13", text:"I keep promises even when circumstances make them inconvenient.", type:"likert", reverse:false },
  { id:"et14", text:"I would rather lose a deal than win it through deception.", type:"likert", reverse:false },
  { id:"et15", text:"I tend to act first and consider consequences later.", type:"likert", reverse:true },
];
const MINDSET_ITEMS = [
  { id:"ms1", text:"I believe my abilities can grow significantly through effort and learning.", reverse:false },
  { id:"ms2", text:"If I'm not naturally good at something, I tend to avoid it.", reverse:true },
  { id:"ms3", text:"I see failure as an opportunity to learn, not a reflection of my worth.", reverse:false },
  { id:"ms4", text:"I find it hard to change my approach once I've decided how to do something.", reverse:true },
  { id:"ms5", text:"I actively seek feedback to improve, even when it's uncomfortable.", reverse:false },
  { id:"ms6", text:"Major changes at work or in life make me very anxious.", reverse:true },
  { id:"ms7", text:"I enjoy learning new tools, technologies, or skills.", reverse:false },
  { id:"ms8", text:"I believe talent is mostly fixed and effort makes little difference.", reverse:true },
  { id:"ms9", text:"I adapt quickly when plans change unexpectedly.", reverse:false },
  { id:"ms10", text:"I get discouraged easily when something doesn't work the first time.", reverse:true },
  { id:"ms11", text:"I'm excited rather than threatened by new technology like AI.", reverse:false },
  { id:"ms12", text:"I prefer sticking to what I know rather than trying new methods.", reverse:true },
  { id:"ms13", text:"I view challenges as opportunities for growth.", reverse:false },
  { id:"ms14", text:"I often compare myself negatively to more talented people.", reverse:true },
  { id:"ms15", text:"I'm willing to start over or pivot if my current approach isn't working.", reverse:false },
];

const MODULES = [
  { key:"cognitive", label:"Cognitive Ability (IQ)", icon:"🧠", items:COGNITIVE_ITEMS, type:"mcq", desc:"Abstract reasoning, numerical, verbal & logical thinking." },
  { key:"eq", label:"Emotional Intelligence (EQ)", icon:"💛", items:EQ_ITEMS, type:"likert", desc:"Self-awareness, empathy, social skill & emotional regulation." },
  { key:"mbti", label:"Personality Type (MBTI)", icon:"🔮", items:MBTI_ITEMS, type:"forcedchoice", desc:"Four personality dichotomies to identify your type." },
  { key:"riasec", label:"Interests — RIASEC / Holland Code", icon:"🎯", items:RIASEC_ITEMS, type:"interest", desc:"Career interest profile across 6 work environment themes." },
  { key:"ocean", label:"Big Five Personality (OCEAN)", icon:"🌊", items:OCEAN_ITEMS, type:"likert", desc:"The globally validated five-factor personality model." },
  { key:"values", label:"Values & Motivation", icon:"⭐", items:VALUES_ITEMS, type:"importance", desc:"What you need from work to feel fulfilled and motivated." },
  { key:"mi", label:"Multiple Intelligences", icon:"💡", items:MI_ITEMS, type:"likert", desc:"Gardner's 8 intelligence domains — how you naturally think." },
  { key:"grit", label:"Grit & Perseverance", icon:"🔥", items:GRIT_ITEMS, type:"likert", desc:"Your ability to persist toward long-term goals through setbacks." },
  { key:"conflict", label:"Conflict, Anger & Patience", icon:"⚖️", items:CONFLICT_ITEMS, type:"mixed", desc:"How you manage frustration, disagreement, and tension." },
  { key:"ethics", label:"Integrity, Ethics & Risk", icon:"🛡️", items:ETHICS_ITEMS, type:"mixed", desc:"Ethical decision-making, honesty under pressure, and risk appetite." },
  { key:"mindset", label:"Mindset & Adaptability", icon:"🚀", items:MINDSET_ITEMS, type:"likert", desc:"Growth mindset, openness to change, and adaptability to disruption." },
];

// ─── SCORING ──────────────────────────────────────────────────────────────────
const scoreMCQ=(items,a)=>{ let c=0; items.forEach(i=>{ if(a[i.id]===i.correct)c++; }); return Math.round(c/items.length*100); };
const scoreLik=(items,a)=>{ let t=0,n=0; items.forEach(i=>{ const v=a[i.id]; if(v===undefined)return; t+=i.reverse?(6-v):v; n++; }); return n?Math.round(t/(n*5)*100):50; };
const scoreMBTI=(items,a)=>{ const c={E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0}; items.forEach(i=>{ const v=a[i.id]; if(v===undefined)return; const [l1,l2]=i.dichotomy.split(""); v===0?c[l1]++:c[l2]++; }); return { type:(c.E>=c.I?"E":"I")+(c.S>=c.N?"S":"N")+(c.T>=c.F?"T":"F")+(c.J>=c.P?"J":"P"), scores:c }; };
const scoreRIA=(items,a)=>{ const s={R:0,I:0,A:0,S:0,E:0,C:0},n={R:0,I:0,A:0,S:0,E:0,C:0}; items.forEach(i=>{ const v=a[i.id]; if(v===undefined)return; s[i.category]+=v; n[i.category]++; }); const r={}; Object.keys(s).forEach(k=>{ r[k]=n[k]?Math.round(s[k]/(n[k]*5)*100):50; }); return r; };
const scoreOCEAN=(items,a)=>{ const t={O:[],C:[],E:[],A:[],N:[]}; items.forEach(i=>{ const v=a[i.id]; if(v===undefined)return; t[i.trait].push(i.reverse?(6-v):v); }); const r={}; Object.keys(t).forEach(k=>{ const arr=t[k]; r[k]=arr.length?Math.round(arr.reduce((x,y)=>x+y,0)/(arr.length*5)*100):50; }); return r; };
const scoreVals=(items,a)=>{ const r={}; items.forEach(i=>{ const v=a[i.id]; if(v===undefined)return; if(!r[i.tag]||v>r[i.tag])r[i.tag]=v; }); return r; };
const scoreMI=(items,a)=>{ const d={}; items.forEach(i=>{ if(!d[i.domain])d[i.domain]=[]; const v=a[i.id]; if(v!==undefined)d[i.domain].push(v); }); const r={}; Object.keys(d).forEach(k=>{ const arr=d[k]; r[k]=arr.length?Math.round(arr.reduce((x,y)=>x+y,0)/(arr.length*5)*100):50; }); return r; };
const scoreMixed=(items,a)=>{ let t=0,n=0; items.forEach(i=>{ const v=a[i.id]; if(v===undefined)return; t+=i.type==="scenario"?i.scores[v]/4*5:(i.reverse?(6-v):v); n++; }); return n?Math.round(t/(n*5)*100):50; };
function computeAll(aa){ return { cognitive:scoreMCQ(COGNITIVE_ITEMS,aa.cognitive||{}), eq:scoreLik(EQ_ITEMS,aa.eq||{}), mbti:scoreMBTI(MBTI_ITEMS,aa.mbti||{}), riasec:scoreRIA(RIASEC_ITEMS,aa.riasec||{}), ocean:scoreOCEAN(OCEAN_ITEMS,aa.ocean||{}), values:scoreVals(VALUES_ITEMS,aa.values||{}), mi:scoreMI(MI_ITEMS,aa.mi||{}), grit:scoreLik(GRIT_ITEMS,aa.grit||{}), conflict:scoreMixed(CONFLICT_ITEMS,aa.conflict||{}), ethics:scoreMixed(ETHICS_ITEMS,aa.ethics||{}), mindset:scoreLik(MINDSET_ITEMS,aa.mindset||{}) }; }

// ─── CAREER MATCHING ──────────────────────────────────────────────────────────
function cosine(a,b){ const k=Object.keys(a); let d=0,ma=0,mb=0; k.forEach(k=>{ d+=a[k]*b[k]; ma+=a[k]**2; mb+=b[k]**2; }); return ma&&mb?d/(Math.sqrt(ma)*Math.sqrt(mb)):0; }
function matchCareers(sc){ const {riasec,ocean,cognitive,eq,grit,ethics,mindset,values}=sc; const topVals=Object.entries(values).sort((a,b)=>b[1]-a[1]).slice(0,3).map(x=>x[0]); return CAREERS.map(c=>{ const rs=cosine(riasec,c.riasec)*100,os=cosine(ocean,c.ocean)*100; const cg=Math.max(0,100-Math.abs(cognitive-c.cognitive)*1.5); const eq2=Math.max(0,100-Math.abs(eq-c.eq)*1.5); const gr=Math.max(0,100-Math.abs(grit-c.grit)*1.5); const et=Math.max(0,100-Math.abs(ethics-c.integrity)*1.5); const ms=Math.max(0,100-Math.abs(mindset-c.adaptability)*1.5); const vm=c.values.filter(v=>topVals.includes(v)).length/Math.max(c.values.length,1)*100; const match=Math.round(rs*0.25+os*0.20+cg*0.10+eq2*0.15+gr*0.08+et*0.07+ms*0.07+vm*0.08); const fit=Math.round(match*0.7+c.aiResilience*0.3); return {...c,matchScore:match,overallFit:fit,riasecSim:Math.round(rs),oceanSim:Math.round(os),valuesMatch:Math.round(vm)}; }).sort((a,b)=>b.overallFit-a.overallFit).slice(0,10); }

function getGaps(career,sc){ const g=[]; if(sc.cognitive<career.cognitive-10) g.push({area:"Cognitive / Analytical Thinking",gap:career.cognitive-sc.cognitive,priority:"High"}); if(sc.eq<career.eq-10) g.push({area:"Emotional Intelligence & People Skills",gap:career.eq-sc.eq,priority:"High"}); if(sc.grit<career.grit-10) g.push({area:"Grit & Long-Term Perseverance",gap:career.grit-sc.grit,priority:"Medium"}); if(sc.ethics<career.integrity-10) g.push({area:"Integrity & Ethical Decision-Making",gap:career.integrity-sc.ethics,priority:"High"}); if(sc.mindset<career.adaptability-10) g.push({area:"Growth Mindset & Adaptability",gap:career.adaptability-sc.mindset,priority:"Medium"}); return g; }

// ─── CLAUDE API — AI NARRATIVE GENERATOR ─────────────────────────────────────
async function generateAINarrative(userName, career, scores, rank, gaps, strengths) {
  const topRIASEC = Object.entries(scores.riasec).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([k])=>k).join("");
  const topMI = Object.entries(scores.mi).sort((a,b)=>b[1]-a[1]).slice(0,2).map(([k])=>k).join(" and ");
  const topVals = Object.entries(scores.values).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([k])=>k.replace(/_/g," ")).join(", ");
  const prompt = `You are a world-class career counsellor and I-O psychologist writing a personalised Training Need Analysis report for ${userName}.

PSYCHOMETRIC PROFILE:
- Cognitive IQ Score: ${scores.cognitive}/100
- Emotional Intelligence (EQ): ${scores.eq}/100
- MBTI Personality Type: ${scores.mbti.type}
- RIASEC Holland Code (top 3): ${topRIASEC}
- Big Five OCEAN: Openness ${scores.ocean.O}, Conscientiousness ${scores.ocean.C}, Extraversion ${scores.ocean.E}, Agreeableness ${scores.ocean.A}, Neuroticism ${scores.ocean.N}
- Grit & Perseverance: ${scores.grit}/100
- Integrity & Ethics: ${scores.ethics}/100
- Conflict Management & Patience: ${scores.conflict}/100
- Growth Mindset & Adaptability: ${scores.mindset}/100
- Top Values: ${topVals}
- Dominant Intelligences: ${topMI}

RECOMMENDED CAREER: ${career.title} (Rank #${rank} match, ${career.overallFit}% fit score)
SECTOR: ${career.sector}
AI RESILIENCE SCORE: ${career.aiResilience}/100

STRENGTHS IDENTIFIED: ${strengths.length > 0 ? strengths.join(", ") : "Profile shows broad developmental potential"}
DEVELOPMENT GAPS: ${gaps.length > 0 ? gaps.map(g => `${g.area} (${g.priority} priority, gap of ${g.gap} points)`).join("; ") : "No critical gaps identified"}

Write a personalised, warm, professional TNA narrative for ${userName} in 4 clear paragraphs:

PARAGRAPH 1 — WHY THIS CAREER FITS YOU: Explain in specific, personal terms why ${career.title} is a strong match for ${userName} based on their actual scores. Reference their MBTI type, RIASEC code, and specific trait scores. Be specific and personal, not generic.

PARAGRAPH 2 — YOUR KEY STRENGTHS FOR THIS CAREER: Highlight what ${userName} brings to this career that will give them a natural advantage. Reference actual scores and what those mean in practical terms for day-to-day work in this career.

PARAGRAPH 3 — DEVELOPMENT PRIORITIES (TNA): If there are gaps, frame them as exciting growth opportunities, not deficits. Be specific about what to develop, why it matters for this career, and what the impact of developing it will be. If no gaps, explain how they can further deepen their strengths.

PARAGRAPH 4 — YOUR ROADMAP: Give ${userName} a personalised, motivating 3-step action plan to move toward this career, starting from today. Be practical and specific to their profile.

Write in second person ("you", "your"), be warm and encouraging but honest, and make every sentence specific to ${userName}'s actual scores — not generic career advice. Total: 250-320 words.`;

  const response = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await response.json();
  return data.content?.map(b => b.text || "").join("") || "Unable to generate narrative. Please try again.";
}

// ─── RADAR CHART ──────────────────────────────────────────────────────────────
function RadarChart({data,size=200}){ const keys=Object.keys(data),vals=keys.map(k=>data[k]/100),n=keys.length,cx=size/2,cy=size/2,r=size/2-28,ang=keys.map((_,i)=>(Math.PI*2*i/n)-Math.PI/2); const pt=(v,i)=>({x:cx+r*v*Math.cos(ang[i]),y:cy+r*v*Math.sin(ang[i])}); return (<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{overflow:"visible"}}>{[.2,.4,.6,.8,1].map(lv=>(<polygon key={lv} points={keys.map((_,i)=>`${pt(lv,i).x},${pt(lv,i).y}`).join(" ")} fill="none" stroke="#2D3478" strokeWidth="0.5" opacity="0.5"/>))}{keys.map((_,i)=><line key={i} x1={cx} y1={cy} x2={pt(1,i).x} y2={pt(1,i).y} stroke="#2D3478" strokeWidth="0.5" opacity="0.4"/>)}<polygon points={vals.map((_,i)=>`${pt(vals[i],i).x},${pt(vals[i],i).y}`).join(" ")} fill="#D4A24E" fillOpacity="0.25" stroke="#D4A24E" strokeWidth="2"/>{vals.map((v,i)=><circle key={i} cx={pt(v,i).x} cy={pt(v,i).y} r="4" fill="#D4A24E"/>)}{keys.map((k,i)=>{ const lp=pt(1.22,i); return <text key={k} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#C5C8E0" fontWeight="600">{k}</text>; })}</svg>); }

// ─── QUESTION COMPONENTS ──────────────────────────────────────────────────────
const LL=["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"];
const IL=["Not Important","Slightly Important","Moderately Important","Important","Very Important"];
const RL=["Strongly Dislike","Dislike","Neutral","Like","Strongly Like"];
function LikertQ({item,val,onChange,labels=LL}){ return (<div style={{marginBottom:16}}><p style={{color:"#F7F5F0",fontSize:15,lineHeight:1.6,marginBottom:10}}>{item.text}</p><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{[1,2,3,4,5].map(v=>(<button key={v} onClick={()=>onChange(v)} style={{flex:1,minWidth:80,padding:"8px 4px",borderRadius:8,border:"2px solid",borderColor:val===v?"#D4A24E":"#2D3478",background:val===v?"#D4A24E22":"transparent",color:val===v?"#D4A24E":"#8A8FAF",fontSize:11,cursor:"pointer",lineHeight:1.3,transition:"all .15s"}}>{labels[v-1]}</button>))}</div></div>); }
function MCQQ({item,val,onChange}){ return (<div style={{marginBottom:16}}><p style={{color:"#F7F5F0",fontSize:15,lineHeight:1.6,marginBottom:10}}>{item.text}</p><div style={{display:"flex",flexDirection:"column",gap:8}}>{item.options.map((opt,i)=>(<button key={i} onClick={()=>onChange(i)} style={{padding:"10px 16px",borderRadius:8,border:"2px solid",textAlign:"left",borderColor:val===i?"#D4A24E":"#2D3478",background:val===i?"#D4A24E22":"#12153A",color:val===i?"#D4A24E":"#C5C8E0",fontSize:14,cursor:"pointer",transition:"all .15s"}}><span style={{color:"#8A8FAF",marginRight:8}}>{String.fromCharCode(65+i)}.</span>{opt}</button>))}</div></div>); }
function ForceQ({item,val,onChange}){ return (<div style={{marginBottom:16}}><p style={{color:"#8A8FAF",fontSize:12,marginBottom:8}}>Choose the option that feels MORE like you:</p>{[item.a,item.b].map((opt,i)=>(<button key={i} onClick={()=>onChange(i)} style={{display:"block",width:"100%",padding:"12px 16px",borderRadius:8,border:"2px solid",textAlign:"left",marginBottom:8,borderColor:val===i?"#D4A24E":"#2D3478",background:val===i?"#D4A24E22":"#12153A",color:val===i?"#D4A24E":"#C5C8E0",fontSize:14,cursor:"pointer",transition:"all .15s"}}><span style={{color:"#8A8FAF",marginRight:8}}>{i===0?"A":"B"}.</span>{opt}</button>))}</div>); }

const SC={Healthcare:"#7A8B6F",Technology:"#4A6FA5","Technology/Policy":"#5A7F95",Education:"#9B7A4E",Business:"#8B4E9B",Wellness:"#4E8B7A",Legal:"#9B4E4E","Social Services":"#4E7A9B",Hospitality:"#9B7A4E",Construction:"#8B6F4E",Finance:"#5A8B4E",Government:"#4E5A8B","Government/Policy":"#5E6A9B","Design/Agriculture":"#7A8B4E","Design/Construction":"#6E4E8B"};
const gc=s=>SC[s]||"#D4A24E";
const BG={background:"#0D1025",minHeight:"100vh",fontFamily:"'Segoe UI',system-ui,sans-serif",color:"#F7F5F0"};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen,setScreen]=useState("intro");
  const [modIdx,setModIdx]=useState(0);
  const [itmIdx,setItmIdx]=useState(0);
  const [allAns,setAllAns]=useState({});
  const [userName,setUserName]=useState("");
  const [nameInput,setNameInput]=useState("");
  const [scores,setScores]=useState(null);
  const [topCareers,setTopCareers]=useState([]);
  const [selCareer,setSelCareer]=useState(null);
  const [activeTab,setActiveTab]=useState("ai");
  const [aiNarratives,setAiNarratives]=useState({});
  const [aiLoading,setAiLoading]=useState(false);

  const curMod=MODULES[modIdx];
  const totalItems=MODULES.reduce((a,m)=>a+m.items.length,0);
  const doneItems=MODULES.slice(0,modIdx).reduce((a,m)=>a+m.items.length,0)+itmIdx;
  const pct=Math.round(doneItems/totalItems*100);
  const modAns=allAns[curMod?.key]||{};
  const curItem=curMod?.items[itmIdx];
  const curAns=curItem?modAns[curItem.id]:undefined;

  function setAns(v){ setAllAns(p=>({...p,[curMod.key]:{...(p[curMod.key]||{}),[curItem.id]:v}})); }
  function goNext(){ if(itmIdx<curMod.items.length-1){setItmIdx(i=>i+1);}else if(modIdx<MODULES.length-1){setModIdx(m=>m+1);setItmIdx(0);}else{const sc=computeAll(allAns);const tc=matchCareers(sc);setScores(sc);setTopCareers(tc);setScreen("results");} }
  function goPrev(){ if(itmIdx>0)setItmIdx(i=>i-1); else if(modIdx>0){const pm=MODULES[modIdx-1];setModIdx(m=>m-1);setItmIdx(pm.items.length-1);} }
  function start(){ if(!nameInput.trim())return; setUserName(nameInput.trim());setScreen("test");setModIdx(0);setItmIdx(0);setAllAns({}); }
  function reset(){ setScreen("intro");setAllAns({});setModIdx(0);setItmIdx(0);setSelCareer(null);setNameInput("");setScores(null);setAiNarratives({});setTopCareers([]); }

  const loadAINarrative = useCallback(async (career, idx) => {
    if(aiNarratives[career.id]||aiLoading) return;
    setAiLoading(true);
    try {
      const gaps=getGaps(career,scores);
      const strengths=[];
      if(scores.eq>=career.eq-5)strengths.push("Emotional Intelligence");
      if(scores.cognitive>=career.cognitive-5)strengths.push("Cognitive Ability");
      if(scores.grit>=career.grit-5)strengths.push("Grit & Perseverance");
      if(scores.ethics>=career.integrity-5)strengths.push("Integrity & Ethics");
      if(scores.mindset>=career.adaptability-5)strengths.push("Mindset & Adaptability");
      if(scores.conflict>=70)strengths.push("Conflict Management");
      const narrative=await generateAINarrative(userName,career,scores,idx+1,gaps,strengths);
      setAiNarratives(prev=>({...prev,[career.id]:narrative}));
    } catch(e) {
      setAiNarratives(prev=>({...prev,[career.id]:"⚠️ Could not generate AI narrative. Please check your connection and try again."}));
    }
    setAiLoading(false);
  },[scores,userName,aiNarratives,aiLoading]);

  const getLabels=()=>{ const mt=curMod?.type; return mt==="importance"?IL:mt==="interest"?RL:LL; };
  const isAnswered=curAns!==undefined;
  const isLast=modIdx===MODULES.length-1&&itmIdx===curMod?.items.length-1;

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if(screen==="intro") return (
    <div style={{...BG,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{maxWidth:600,width:"100%"}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:52,marginBottom:10}}>🧭</div>
          <h1 style={{fontSize:30,fontWeight:800,color:"#F7F5F0",margin:"0 0 4px",letterSpacing:"-0.5px"}}>CareerCompass<span style={{color:"#D4A24E"}}>™</span></h1>
          <p style={{color:"#D4A24E",fontSize:13,margin:"0 0 2px",fontWeight:600}}>by OverSimplify.in</p>
          <div style={{display:"inline-block",background:"#D4A24E22",border:"1px solid #D4A24E44",borderRadius:20,padding:"4px 14px",margin:"8px 0"}}>
            <span style={{color:"#D4A24E",fontSize:12,fontWeight:700}}>✨ Now with AI-Powered Personalised TNA Reports</span>
          </div>
          <p style={{color:"#8A8FAF",fontSize:13,marginTop:8}}>Comprehensive Psychometric Assessment · AI-Resilient Career Matching · Claude AI Narrative Reports</p>
        </div>
        <div style={{background:"#12153A",borderRadius:14,padding:18,marginBottom:14}}>
          <p style={{color:"#D4A24E",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,margin:"0 0 12px"}}>11 Assessment Modules</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{MODULES.map(m=>(<div key={m.key} style={{display:"flex",alignItems:"center",gap:8,color:"#C5C8E0",fontSize:13}}><span>{m.icon}</span><span>{m.label.split("—")[0].split("(")[0].trim()}</span></div>))}</div>
        </div>
        <div style={{background:"#12153A",borderRadius:14,padding:14,marginBottom:18,display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center"}}>
          {[["📋",`${totalItems} Questions`],["⏱","45–60 Min"],["🏆","Top 10 Careers"],["🤖","AI TNA Report"],["📝","Exam Prep"],["🔒","100% Private"]].map(([icon,label])=>(<div key={label} style={{textAlign:"center",minWidth:80}}><div style={{fontSize:20}}>{icon}</div><div style={{color:"#8A8FAF",fontSize:11,marginTop:2}}>{label}</div></div>))}
        </div>
        <input value={nameInput} onChange={e=>setNameInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&start()} placeholder="Enter your full name to begin..." style={{width:"100%",padding:"13px 16px",borderRadius:10,border:"2px solid #2D3478",background:"#12153A",color:"#F7F5F0",fontSize:15,outline:"none",boxSizing:"border-box",marginBottom:10}}/>
        <button onClick={start} disabled={!nameInput.trim()} style={{width:"100%",padding:14,borderRadius:10,border:"none",background:nameInput.trim()?"#D4A24E":"#2D3478",color:nameInput.trim()?"#0D1025":"#5A5F7F",fontSize:16,fontWeight:800,cursor:nameInput.trim()?"pointer":"not-allowed",transition:"all .2s"}}>Begin Assessment →</button>
        <p style={{color:"#5A5F7F",fontSize:11,textAlign:"center",marginTop:10}}>No data stored or uploaded. All processing is local to your browser. AI reports use Anthropic's Claude API.</p>
      </div>
    </div>
  );

  // ── TEST ───────────────────────────────────────────────────────────────────
  if(screen==="test") {
    const modType=curMod.type; const isScenario=curItem?.type==="scenario";
    return (
      <div style={{...BG}}>
        <div style={{position:"sticky",top:0,zIndex:10,background:"#0D1025",borderBottom:"1px solid #1E2240",padding:"10px 16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{color:"#D4A24E",fontWeight:700,fontSize:13}}>{curMod.icon} {curMod.label}</span>
            <span style={{color:"#8A8FAF",fontSize:12}}>{pct}% complete</span>
          </div>
          <div style={{background:"#1E2240",borderRadius:4,height:4}}><div style={{width:`${pct}%`,height:"100%",background:"#D4A24E",borderRadius:4,transition:"width .3s"}}/></div>
          <div style={{display:"flex",gap:3,marginTop:6}}>{MODULES.map((m,i)=>(<div key={m.key} style={{flex:1,height:3,borderRadius:2,background:i<modIdx?"#D4A24E":i===modIdx?"#D4A24E88":"#1E2240"}}/>))}</div>
        </div>
        <div style={{maxWidth:660,margin:"0 auto",padding:"20px 16px"}}>
          {itmIdx===0&&(<div style={{background:"#12153A",borderRadius:12,padding:"14px 18px",marginBottom:20,borderLeft:"3px solid #D4A24E"}}><p style={{color:"#8A8FAF",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,margin:"0 0 3px"}}>Section {modIdx+1} of {MODULES.length}</p><h2 style={{color:"#F7F5F0",fontSize:17,margin:"0 0 4px"}}>{curMod.icon} {curMod.label}</h2><p style={{color:"#8A8FAF",fontSize:12,margin:0}}>{curMod.desc}</p></div>)}
          <p style={{color:"#5A5F7F",fontSize:12,marginBottom:12}}>Q {itmIdx+1} of {curMod.items.length}</p>
          {(modType==="likert"||modType==="importance"||modType==="interest")&&!isScenario&&<LikertQ item={curItem} val={curAns} onChange={setAns} labels={getLabels()}/>}
          {modType==="mcq"&&<MCQQ item={curItem} val={curAns} onChange={setAns}/>}
          {modType==="forcedchoice"&&<ForceQ item={curItem} val={curAns} onChange={setAns}/>}
          {modType==="mixed"&&(isScenario?<MCQQ item={curItem} val={curAns} onChange={setAns}/>:<LikertQ item={curItem} val={curAns} onChange={setAns}/>)}
          <div style={{display:"flex",gap:10,marginTop:20}}>
            <button onClick={goPrev} disabled={modIdx===0&&itmIdx===0} style={{padding:"11px 18px",borderRadius:8,border:"2px solid #2D3478",background:"transparent",color:"#8A8FAF",fontSize:14,cursor:"pointer",opacity:(modIdx===0&&itmIdx===0)?0.3:1}}>← Back</button>
            <button onClick={goNext} disabled={!isAnswered} style={{flex:1,padding:12,borderRadius:8,border:"none",background:isAnswered?"#D4A24E":"#2D3478",color:isAnswered?"#0D1025":"#5A5F7F",fontSize:15,fontWeight:700,cursor:isAnswered?"pointer":"not-allowed",transition:"all .2s"}}>{isLast?"See My Results 🎯":"Next →"}</button>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULTS ────────────────────────────────────────────────────────────────
  if(screen==="results"&&scores) {
    const mbtiType=scores.mbti.type;
    const topRIASEC=Object.entries(scores.riasec).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([k])=>k).join("");
    const oceanData={"Open":scores.ocean.O,"Consc":scores.ocean.C,"Extro":scores.ocean.E,"Agree":scores.ocean.A,"Stable":100-scores.ocean.N};

    // ── CAREER DETAIL ───────────────────────────────────────────────────────
    if(selCareer!==null) {
      const c=topCareers[selCareer];
      const gaps=getGaps(c,scores);
      const strengths=[];
      if(scores.eq>=c.eq-5)strengths.push("Emotional Intelligence");
      if(scores.cognitive>=c.cognitive-5)strengths.push("Cognitive Ability");
      if(scores.grit>=c.grit-5)strengths.push("Grit & Perseverance");
      if(scores.ethics>=c.integrity-5)strengths.push("Integrity & Ethics");
      if(scores.mindset>=c.adaptability-5)strengths.push("Mindset & Adaptability");
      if(scores.conflict>=70)strengths.push("Conflict Management");

      const tabs=[{k:"ai",label:"🤖 AI Report"},{k:"tna",label:"📊 Gap Analysis"},{k:"training",label:"🎓 Training"},{k:"exam",label:"📝 Exam Prep"},{k:"resilience",label:"🛡️ AI Resilience"}];
      const narrative=aiNarratives[c.id];

      return (
        <div style={{...BG}}>
          <div style={{background:"#12153A",padding:"12px 16px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid #1E2240",position:"sticky",top:0,zIndex:10}}>
            <button onClick={()=>setSelCareer(null)} style={{background:"none",border:"none",color:"#D4A24E",cursor:"pointer",fontSize:22,padding:0,lineHeight:1}}>←</button>
            <div><p style={{color:"#8A8FAF",fontSize:11,margin:0}}>Career #{selCareer+1} · AI-Powered Report</p><h2 style={{color:"#F7F5F0",fontSize:17,margin:0,fontWeight:700}}>{c.title}</h2></div>
          </div>

          <div style={{maxWidth:700,margin:"0 auto",padding:"20px 16px"}}>
            {/* Score Banner */}
            <div style={{background:"linear-gradient(135deg,#1B1F3B,#12153A)",borderRadius:14,padding:20,marginBottom:14,textAlign:"center",border:"1px solid #D4A24E44"}}>
              <div style={{fontSize:58,fontWeight:800,color:"#D4A24E",lineHeight:1}}>{c.overallFit}%</div>
              <p style={{color:"#8A8FAF",fontSize:12,margin:"6px 0 14px"}}>Overall Fit Score · Psychometric Match + AI Resilience</p>
              <div style={{display:"flex",justifyContent:"center",gap:20,flexWrap:"wrap"}}>
                {[["Trait Match",c.matchScore+"%"],["AI Resilience",c.aiResilience+"%"],["RIASEC Fit",c.riasecSim+"%"],["Values Fit",c.valuesMatch+"%"]].map(([l,v])=>(<div key={l} style={{textAlign:"center"}}><div style={{color:"#F7F5F0",fontWeight:800,fontSize:20}}>{v}</div><div style={{color:"#5A5F7F",fontSize:10}}>{l}</div></div>))}
              </div>
            </div>

            {/* Strengths */}
            {strengths.length>0&&(<div style={{background:"#12153A",borderRadius:12,padding:14,marginBottom:12}}><p style={{color:"#7A8B6F",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,margin:"0 0 8px"}}>✅ Your Strengths for This Career</p><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{strengths.map(s=><span key={s} style={{background:"#7A8B6F22",color:"#7A8B6F",padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:600}}>{s}</span>)}</div></div>)}

            {/* Tabs */}
            <div style={{display:"flex",gap:5,marginBottom:12,flexWrap:"wrap"}}>
              {tabs.map(t=>(<button key={t.k} onClick={()=>{ setActiveTab(t.k); if(t.k==="ai"&&!narrative&&!aiLoading) loadAINarrative(c,selCareer); }} style={{flex:1,minWidth:80,padding:"8px 4px",borderRadius:8,border:"2px solid",borderColor:activeTab===t.k?"#D4A24E":"#2D3478",background:activeTab===t.k?"#D4A24E22":"transparent",color:activeTab===t.k?"#D4A24E":"#8A8FAF",fontSize:11,fontWeight:600,cursor:"pointer"}}>{t.label}</button>))}
            </div>

            {/* AI REPORT TAB */}
            {activeTab==="ai"&&(
              <div style={{background:"#12153A",borderRadius:14,padding:18,marginBottom:14}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                  <div style={{width:32,height:32,borderRadius:8,background:"#D4A24E22",border:"1px solid #D4A24E44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🤖</div>
                  <div><p style={{color:"#D4A24E",fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1,margin:0}}>AI-Generated TNA Report</p><p style={{color:"#5A5F7F",fontSize:11,margin:0}}>Personalised by Claude AI based on your scores</p></div>
                </div>
                {!narrative&&!aiLoading&&(
                  <div style={{textAlign:"center",padding:"24px 0"}}>
                    <p style={{color:"#8A8FAF",fontSize:14,marginBottom:16}}>Generate a personalised career analysis written specifically for <strong style={{color:"#F7F5F0"}}>{userName}</strong> based on your actual psychometric profile.</p>
                    <button onClick={()=>loadAINarrative(c,selCareer)} style={{padding:"12px 28px",borderRadius:10,border:"none",background:"#D4A24E",color:"#0D1025",fontSize:15,fontWeight:800,cursor:"pointer"}}>✨ Generate My AI Report</button>
                  </div>
                )}
                {aiLoading&&!narrative&&(
                  <div style={{textAlign:"center",padding:"24px 0"}}>
                    <div style={{fontSize:32,marginBottom:12,animation:"spin 1s linear infinite"}}>⚙️</div>
                    <p style={{color:"#D4A24E",fontSize:14,fontWeight:600}}>Claude AI is writing your personalised report...</p>
                    <p style={{color:"#8A8FAF",fontSize:12}}>Analysing your psychometric profile against {c.title} requirements</p>
                  </div>
                )}
                {narrative&&(
                  <div>
                    {narrative.split("\n\n").filter(p=>p.trim()).map((para,i)=>(
                      <div key={i} style={{background:"#0D1025",borderRadius:10,padding:16,marginBottom:10,borderLeft:`3px solid ${i===0?"#D4A24E":i===1?"#7A8B6F":i===2?"#E37B5C":"#4A6FA5"}`}}>
                        <p style={{color:"#C5C8E0",fontSize:14,lineHeight:1.75,margin:0}}>{para.trim()}</p>
                      </div>
                    ))}
                    <div style={{display:"flex",justifyContent:"flex-end",marginTop:10}}>
                      <button onClick={()=>{ setAiNarratives(prev=>({...prev,[c.id]:undefined})); setTimeout(()=>loadAINarrative(c,selCareer),100); }} disabled={aiLoading} style={{background:"none",border:"1px solid #2D3478",borderRadius:8,color:"#8A8FAF",fontSize:12,padding:"6px 14px",cursor:"pointer"}}>↻ Regenerate</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* GAP ANALYSIS TAB */}
            {activeTab==="tna"&&(
              <div style={{background:"#12153A",borderRadius:14,padding:16,marginBottom:14}}>
                <p style={{color:"#E37B5C",fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1,margin:"0 0 14px"}}>📊 Development Gap Analysis</p>
                {gaps.length===0?<p style={{color:"#7A8B6F",fontSize:14,margin:0}}>🎉 Your profile closely matches the requirements. No critical gaps identified!</p>:gaps.map(g=>(<div key={g.area} style={{background:"#0D1025",borderRadius:10,padding:14,marginBottom:10,borderLeft:`3px solid ${g.priority==="High"?"#E37B5C":"#D4A24E"}`}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{color:"#F7F5F0",fontSize:14,fontWeight:600}}>{g.area}</span><span style={{background:g.priority==="High"?"#E37B5C22":"#D4A24E22",color:g.priority==="High"?"#E37B5C":"#D4A24E",fontSize:10,padding:"2px 8px",borderRadius:10,fontWeight:600}}>{g.priority}</span></div><div style={{background:"#1E2240",borderRadius:4,height:5,marginBottom:5}}><div style={{width:`${Math.min(100,g.gap)}%`,height:"100%",background:g.priority==="High"?"#E37B5C":"#D4A24E",borderRadius:4}}/></div><p style={{color:"#8A8FAF",fontSize:12,margin:0}}>Gap of ~{g.gap} points — targeted development recommended</p></div>))}
              </div>
            )}

            {/* TRAINING TAB */}
            {activeTab==="training"&&(
              <div style={{background:"#12153A",borderRadius:14,padding:16,marginBottom:14}}>
                <p style={{color:"#D4A24E",fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1,margin:"0 0 14px"}}>🎓 Recommended Training Pathway</p>
                {c.training.map((step,i)=>(<div key={i} style={{display:"flex",gap:14,alignItems:"flex-start",padding:"12px 0",borderBottom:i<c.training.length-1?"1px solid #1E2240":"none"}}><div style={{width:28,height:28,borderRadius:"50%",background:"#D4A24E",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:13,fontWeight:800,color:"#0D1025"}}>{i+1}</div><p style={{color:"#C5C8E0",fontSize:14,lineHeight:1.5,margin:0}}>{step}</p></div>))}
              </div>
            )}

            {/* EXAM PREP TAB */}
            {activeTab==="exam"&&(
              <div style={{background:"#12153A",borderRadius:14,padding:16,marginBottom:14}}>
                <p style={{color:"#7A8B6F",fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1,margin:"0 0 14px"}}>📝 Entrance Exam & Certification Prep</p>
                {c.examPrep.map((step,i)=>(<div key={i} style={{display:"flex",gap:14,alignItems:"flex-start",padding:"12px 0",borderBottom:i<c.examPrep.length-1?"1px solid #1E2240":"none"}}><div style={{width:28,height:28,borderRadius:8,background:"#7A8B6F22",border:"2px solid #7A8B6F",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:13,fontWeight:800,color:"#7A8B6F"}}>✓</div><p style={{color:"#C5C8E0",fontSize:14,lineHeight:1.5,margin:0}}>{step}</p></div>))}
              </div>
            )}

            {/* RESILIENCE TAB */}
            {activeTab==="resilience"&&(
              <div style={{background:"#12153A",borderRadius:14,padding:16,marginBottom:14}}>
                <p style={{color:"#4A6FA5",fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1,margin:"0 0 14px"}}>🛡️ Why This Career Resists AI Disruption</p>
                <div style={{background:"#0D1025",borderRadius:10,padding:16,marginBottom:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                    <div style={{fontSize:32,fontWeight:800,color:"#D4A24E"}}>{c.aiResilience}%</div>
                    <div><div style={{color:"#F7F5F0",fontSize:14,fontWeight:700}}>AI Resilience Score</div><div style={{color:"#8A8FAF",fontSize:11}}>Higher = more protected from automation</div></div>
                  </div>
                  <div style={{background:"#1E2240",borderRadius:4,height:8,marginBottom:12}}><div style={{width:`${c.aiResilience}%`,height:"100%",background:c.aiResilience>=80?"#7A8B6F":c.aiResilience>=60?"#D4A24E":"#E37B5C",borderRadius:4}}/></div>
                  <p style={{color:"#C5C8E0",fontSize:14,lineHeight:1.6,margin:0}}>{c.resilienceReason}</p>
                </div>
                <p style={{color:"#5A5F7F",fontSize:11,margin:0}}>⚠️ AI resilience scores are estimates based on task automation research. Actual disruption rates vary by region, specialization, and technology adoption pace.</p>
              </div>
            )}

            <button onClick={()=>setSelCareer(null)} style={{width:"100%",padding:12,borderRadius:10,border:"2px solid #2D3478",background:"transparent",color:"#D4A24E",fontSize:14,fontWeight:700,cursor:"pointer",marginBottom:8}}>← Back to All 10 Careers</button>
          </div>
        </div>
      );
    }

    // ── RESULTS OVERVIEW ─────────────────────────────────────────────────────
    return (
      <div style={{...BG}}>
        <div style={{background:"linear-gradient(135deg,#12153A,#1B1F3B)",padding:"28px 20px",textAlign:"center",borderBottom:"1px solid #2D3478"}}>
          <div style={{fontSize:40,marginBottom:6}}>🧭</div>
          <h1 style={{fontSize:24,fontWeight:800,color:"#F7F5F0",margin:"0 0 4px"}}>CareerCompass™ Report</h1>
          <p style={{color:"#D4A24E",fontSize:16,fontWeight:700,margin:"0 0 2px"}}>{userName}</p>
          <p style={{color:"#8A8FAF",fontSize:12,margin:0}}>{new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}</p>
          <div style={{display:"inline-block",background:"#D4A24E22",border:"1px solid #D4A24E44",borderRadius:20,padding:"4px 14px",marginTop:10}}>
            <span style={{color:"#D4A24E",fontSize:12,fontWeight:700}}>✨ Tap any career for your AI-generated personalised report</span>
          </div>
        </div>

        <div style={{maxWidth:700,margin:"0 auto",padding:"20px 16px"}}>
          {/* Profile Summary */}
          <div style={{background:"#12153A",borderRadius:14,padding:18,marginBottom:14}}>
            <p style={{color:"#D4A24E",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,margin:"0 0 14px"}}>📋 Your Psychometric Profile</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[["🧠 IQ Score",`${scores.cognitive}/100`,scores.cognitive>=70?"Above Average":scores.cognitive>=50?"Average":"Developing"],["💛 EQ Score",`${scores.eq}/100`,scores.eq>=75?"High EQ":scores.eq>=55?"Moderate":"Developing"],["🔮 MBTI Type",mbtiType,"Personality archetype"],["🎯 RIASEC",topRIASEC,"Top 3 interest themes"],["🔥 Grit",`${scores.grit}/100`,scores.grit>=70?"High Perseverance":"Moderate"],["🛡️ Integrity",`${scores.ethics}/100`,scores.ethics>=75?"Strong Ethics":"Moderate"],["🚀 Mindset",`${scores.mindset}/100`,scores.mindset>=70?"Growth Oriented":"Developing"],["⚖️ Conflict",`${scores.conflict}/100`,scores.conflict>=70?"Strong Mgmt":"Developing"]].map(([lbl,val,desc])=>(<div key={lbl} style={{background:"#0D1025",borderRadius:10,padding:12}}><p style={{color:"#8A8FAF",fontSize:11,margin:"0 0 3px"}}>{lbl}</p><p style={{color:"#F7F5F0",fontSize:20,fontWeight:800,margin:"0 0 2px"}}>{val}</p><p style={{color:"#5A5F7F",fontSize:11,margin:0}}>{desc}</p></div>))}
            </div>
          </div>

          {/* Radar Charts */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
            <div style={{background:"#12153A",borderRadius:14,padding:14,textAlign:"center"}}><p style={{color:"#D4A24E",fontSize:11,fontWeight:700,textTransform:"uppercase",margin:"0 0 8px"}}>OCEAN Profile</p><RadarChart data={oceanData} size={180}/></div>
            <div style={{background:"#12153A",borderRadius:14,padding:14,textAlign:"center"}}><p style={{color:"#D4A24E",fontSize:11,fontWeight:700,textTransform:"uppercase",margin:"0 0 8px"}}>RIASEC Profile</p><RadarChart data={scores.riasec} size={180}/></div>
          </div>

          {/* Top 10 */}
          <h2 style={{fontSize:18,fontWeight:800,margin:"0 0 4px"}}>🏆 Your Top 10 AI-Resilient Career Matches</h2>
          <p style={{color:"#8A8FAF",fontSize:13,margin:"0 0 14px"}}>Each career includes an AI-generated personalised TNA report, training pathway, and exam prep guide.</p>

          {topCareers.map((c,i)=>(
            <button key={c.id} onClick={()=>{ setSelCareer(i); setActiveTab("ai"); }} style={{display:"block",width:"100%",textAlign:"left",background:"#12153A",borderRadius:12,padding:16,marginBottom:10,border:"1px solid #1E2240",cursor:"pointer",borderLeft:`4px solid ${i===0?"#D4A24E":i<3?"#7A8B6F":"#2D3478"}`,transition:"border-color .15s"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                    <span style={{color:"#D4A24E",fontWeight:800,fontSize:18,minWidth:26}}>#{i+1}</span>
                    <h3 style={{color:"#F7F5F0",fontSize:15,fontWeight:700,margin:0}}>{c.title}</h3>
                  </div>
                  <span style={{background:gc(c.sector)+"33",color:gc(c.sector),fontSize:10,padding:"2px 8px",borderRadius:20,fontWeight:600}}>{c.sector}</span>
                  <p style={{color:"#8A8FAF",fontSize:12,margin:"8px 0 0",lineHeight:1.4}}>{c.description.substring(0,85)}...</p>
                </div>
                <div style={{textAlign:"center",flexShrink:0}}>
                  <div style={{fontSize:26,fontWeight:800,color:i===0?"#D4A24E":i<3?"#7A8B6F":"#C5C8E0"}}>{c.overallFit}%</div>
                  <div style={{color:"#5A5F7F",fontSize:9,marginBottom:4}}>Fit Score</div>
                  <div style={{background:"#0D1025",borderRadius:6,padding:"3px 6px"}}><span style={{color:"#7A8B6F",fontSize:10}}>🛡 {c.aiResilience}%</span></div>
                </div>
              </div>
              <div style={{marginTop:10,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{color:"#5A5F7F",fontSize:11}}>{aiNarratives[c.id]?"✅ AI Report Ready":"🤖 AI Report Available"}</span>
                <span style={{color:"#D4A24E",fontSize:11,fontWeight:600}}>View AI Report →</span>
              </div>
            </button>
          ))}

          <div style={{textAlign:"center",marginTop:24,paddingBottom:40}}>
            <button onClick={reset} style={{padding:"11px 28px",borderRadius:10,border:"2px solid #2D3478",background:"transparent",color:"#8A8FAF",fontSize:14,cursor:"pointer"}}>Retake Assessment</button>
            <p style={{color:"#5A5F7F",fontSize:11,marginTop:12}}>© OverSimplify.in — CareerCompass™ · Powered by Claude AI (Anthropic)</p>
          </div>
        </div>
      </div>
    );
  }

  return <div style={BG}/>;
}

