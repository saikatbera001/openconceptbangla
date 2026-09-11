export const CATEGORIES = [
  {
    id: "govt-schemes",
    name: "Government Schemes",
    nameBn: "সরকারি প্রকল্প",
    slug: "govt-schemes",
    icon: "Landmark",
    count: 14,
    color: "emerald",
    description: "পশ্চিমবঙ্গ ও কেন্দ্রীয় সরকারের সকল জনকল্যাণমূলক প্রকল্প ও সুবিধার বিস্তারিত তথ্য।"
  },
  {
    id: "online-services",
    name: "Online Services",
    nameBn: "অনলাইন সেবা",
    slug: "online-services",
    icon: "Globe",
    count: 22,
    color: "blue",
    description: "আধার, ভোটার, প্যান, রেশন কার্ড সংশোধন ও নতুন আবেদনের সম্পূর্ণ নির্দেশিকা।"
  },
  {
    id: "jobs",
    name: "Job Updates",
    nameBn: "চাকরির খবর",
    slug: "jobs",
    icon: "Briefcase",
    count: 18,
    color: "purple",
    description: "রাজ্য ও কেন্দ্রীয় সরকারের নতুন শূন্যপদ, অ্যাডমিট কার্ড ও নিয়োগ পরীক্ষা।"
  },
  {
    id: "education",
    name: "Education & Scholarships",
    nameBn: "শিক্ষা ও স্কলারশিপ",
    slug: "education",
    icon: "GraduationCap",
    count: 12,
    color: "amber",
    description: "ঐক্যশ্রী, স্বামী বিবেকানন্দ (SVMCM), নবান্ন ও অন্যান্য স্কলারশিপের আবেদন।"
  },
  {
    id: "technology",
    name: "Technology Tutorials",
    nameBn: "প্রযুক্তি ও টিউটোরিয়াল",
    slug: "technology",
    icon: "Cpu",
    count: 9,
    color: "cyan",
    description: "মোবাইল, কম্পিউটার, ইন্টারনেট সিকিউরিটি ও দরকারি অনলাইন টিপস।"
  },
  {
    id: "pan-voter-card",
    name: "Card & Documents",
    nameBn: "কার্ড ও ডকুমেন্টস",
    slug: "cards-documents",
    icon: "CreditCard",
    count: 16,
    color: "rose",
    description: "প্যান কার্ড, ডিজিটাল রেশন কার্ড ও ড্রাইভিং লাইসেন্স সম্পর্কিত গাইড।"
  }
];

export const SERVICE_SHORTCUTS = [
  {
    title: "লক্ষ্মীর ভাণ্ডার প্রকল্প",
    subtitle: "ভাতা বৃদ্ধি ও স্ট্যাটাস চেক",
    category: "সরকারি প্রকল্প",
    badge: "জনপ্রিয়",
    badgeColor: "bg-rose-500",
    slug: "lakshmir-bhandar-scheme-update-2024",
    icon: "Banknote"
  },
  {
    title: "নতুন ভোটার কার্ড আবেদন",
    subtitle: "ফর্ম ৬ অনলাইন আবেদন ২০২৪",
    category: "অনলাইন সেবা",
    badge: "জরুরি",
    badgeColor: "bg-emerald-600",
    slug: "voter-card-online-apply-form-6",
    icon: "Vote"
  },
  {
    title: "কৃষক বন্ধু টাকা স্ট্যাটাস",
    subtitle: "পরবর্তী কিস্তির টাকা ও নাম চেক",
    category: "সরকারি প্রকল্প",
    badge: "আপডেট",
    badgeColor: "bg-amber-500",
    slug: "krishak-bandhu-payment-status-check",
    icon: "Sprout"
  },
  {
    title: "স্বামী বিবেকানন্দ স্কলারশিপ",
    subtitle: "SVMCM আবেদন ও রিনিউয়াল গাইড",
    category: "শিক্ষা",
    badge: "স্কলারশিপ",
    badgeColor: "bg-blue-600",
    slug: "svmcm-scholarship-application-guide",
    icon: "GraduationCap"
  },
  {
    title: "ইনস্ট্যান্ট প্যান কার্ড তৈরি",
    subtitle: "আধার দিয়ে ১০ মিনিটে ই-প্যান",
    category: "অনলাইন সেবা",
    badge: "ফ্রি",
    badgeColor: "bg-cyan-600",
    slug: "instant-e-pan-card-download-free",
    icon: "CreditCard"
  },
  {
    title: "ডিজিটাল রেশন কার্ড সংশোধন",
    subtitle: "ফর্ম ৫ ও নাম-ঠিকানা পরিবর্তন",
    category: "অনলাইন সেবা",
    badge: "সার্ভিস",
    badgeColor: "bg-teal-600",
    slug: "digital-ration-card-correction-guide",
    icon: "FileCheck"
  }
];

export const TOOLS_DATA = [
  {
    id: "image-compressor",
    title: "অনলাইন ফটো কম্প্রেসার (KB রিডিউসার)",
    titleEn: "Image Compressor to Target KB",
    description: "যেকোনো ছবির সাইজ ২০KB, ৫০KB বা ১০০KB-তে সহজে কমিয়ে নিন। সরকারি চাকরির ফর্ম ফিলাপের জন্য আদর্শ।",
    badge: "১০০% নিরাপদ (অফলাইন)",
    icon: "Sliders",
    category: "ছবি টুলস",
    path: "/tools/image-compressor"
  },
  {
    id: "card-cropper",
    title: "অফিসিয়াল কার্ড ও স্বাক্ষর ক্রপার",
    titleEn: "Official ID & Signature Cropper",
    description: "ভোটার কার্ড, আধার, প্যান কার্ড বা ১৪০x৬০ পিক্সেল স্বাক্ষর এক ক্লিকে পারফেক্ট সাইজে ক্রপ করুন।",
    badge: "নো আপলোড দরকার",
    icon: "Crop",
    category: "ডকুমেন্ট টুলস",
    path: "/tools/card-cropper"
  },
  {
    id: "image-converter",
    title: "ইমেজ কনভার্টার (JPG, PNG, WebP)",
    titleEn: "Image Format Converter",
    description: "ছবির কোয়ালিটি না হারিয়ে তাৎক্ষণিক এক ফরম্যাট থেকে অন্য ফরম্যাটে পরিবর্তন করুন।",
    badge: "ফ্রি ও আনলিমিটেড",
    icon: "FileImage",
    category: "কনভার্টার",
    path: "/tools/image-converter"
  }
];

export const POSTS = [
  {
    id: "post-1",
    title: "লক্ষ্মীর ভাণ্ডার প্রকল্প ২০২৪: মাসিক ভাতা বৃদ্ধি ও নতুন স্ট্যাটাস চেকের সহজ উপায়",
    slug: "lakshmir-bhandar-scheme-update-2024",
    excerpt: "পশ্চিমবঙ্গ সরকারের অন্যতম জনপ্রিয় প্রকল্প লক্ষ্মীর ভাণ্ডার। কীভাবে আপনার আবেদন স্ট্যাটাস চেক করবেন এবং অ্যাকাউন্টে টাকা ঢুকছে কিনা জানবেন?",
    category: "govt-schemes",
    categoryName: "সরকারি প্রকল্প",
    author: {
      name: "শুভম সেনগুপ্ত",
      role: "ডিজিটাল সেবা বিশেষজ্ঞ",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    featuredImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&auto=format&fit=crop&q=80",
    publishedDate: "১০ সেপ্টেম্বর, ২০২৪",
    readingTime: "৫ মিনিট",
    views: 14200,
    likes: 830,
    isFeatured: true,
    isPopular: true,
    tags: ["লক্ষ্মীর ভাণ্ডার", "পশ্চিমবঙ্গ প্রকল্প", "ব্যাংক স্ট্যাটাস", "ভাতা"],
    content: `
### লক্ষ্মীর ভাণ্ডার প্রকল্প সম্পর্কে
পশ্চিমবঙ্গ রাজ্য সরকারের অর্থ ও সমাজকল্যাণ দপ্তরের উদ্যোগে পরিচালিত **লক্ষ্মীর ভাণ্ডার প্রকল্প** বর্তমানে রাজ্যের সাধারণ ও তপশিলি জাতি/উপজাতির মহিলাদের সামাজিক ও অর্থনৈতিক নিরাপত্তা নিশ্চিত করেছে।

### মাসিক ভাতার পরিমাণ
* **তপশিলি জাতি ও উপজাতি (SC/ST)**: প্রতি মাসে ₹১,২০০/- টাকা সরাসরি ব্যাঙ্ক অ্যাকাউন্টে।
* **সাধারণ ও অন্যান্য অনগ্রসর শ্রেণি (General/OBC)**: প্রতি মাসে ₹১,০০০/- টাকা সরাসরি ব্যাঙ্ক অ্যাকাউন্টে।

### কীভাবে মোবাইল থেকে স্ট্যাটাস চেক করবেন?
১. প্রথমে রাজ্য সরকারের অফিশিয়াল পোর্টাল [socialsecurity.wb.gov.in](https://socialsecurity.wb.gov.in) এ প্রবেশ করুন।
২. 'Track Applicant' অপশনে ক্লিক করুন।
৩. আপনার মোবাইল নম্বর অথবা স্বাস্থ্য সাথী কার্ড নম্বর অথবা আধার নম্বর লিখুন।
৪. ক্যাপচা কোডটি পূরণ করে 'Search' বাটনে ক্লিক করুন।
৫. আপনার পেমেন্ট হিস্ট্রি ও বর্তমান স্ট্যাটাস স্ক্রিনে ফুটে উঠবে।

> **জরুরি টিপস**: আপনার ব্যাঙ্ক অ্যাকাউন্টের সঙ্গে আধার লিঙ্ক এবং NPCI ডিবিটি (DBT) সক্রিয় থাকা বাধ্যতামূলক। অন্যথায় টাকা ঢুকতে সমস্যা হতে পারে।
`
  },
  {
    id: "post-2",
    title: "ভোটার কার্ড অনলাইন আবেদন পদ্ধতি ২০২৪: বাড়ি বসে নতুন ভোটার কার্ড (Form 6)",
    slug: "voter-card-online-apply-form-6",
    excerpt: "১৮ বছর বয়স পূর্ণ হয়েছে? এখন কোনো অফিসে না গিয়ে মোবাইল বা ল্যাপটপ থেকে সরাসরি জাতীয় ভোটার সেবা পোর্টালে আবেদন করুন।",
    category: "online-services",
    categoryName: "অনলাইন সেবা",
    author: {
      name: "অনন্যা মুখার্জী",
      role: "কন্টেন্ট রাইটার",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    featuredImage: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=900&auto=format&fit=crop&q=80",
    publishedDate: "০৮ সেপ্টেম্বর, ২০২৪",
    readingTime: "৭ মিনিট",
    views: 9800,
    likes: 620,
    isFeatured: true,
    isPopular: true,
    tags: ["ভোটার কার্ড", "Form 6", "অনলাইন আবেদন", "ECI"],
    content: `
### নতুন ভোটার কার্ড আবেদন গাইড
ভারতের নির্বাচন কমিশন (Election Commission of India - ECI) নতুন ভোটারদের জন্য সম্পূর্ণ ডিজিটাল রেজিস্ট্রেশন পোর্টাল চালু করেছে।

### প্রয়োজনীয় নথিপত্র
1. আবেদনকারীর পাসপোর্ট সাইজের রঙিন ছবি (সর্বোচ্চ 2MB)
2. বয়সের প্রমাণপত্র (মাধ্যমিক অ্যাডমিট / জন্ম সার্টিফিকেট / আধার কার্ড)
3. ঠিকানার প্রমাণপত্র (বিদ্যুৎ বিল / রেশন কার্ড / পাসপোর্ট)

### আবেদন করার সহজ ধাপসমূহ
- **ধাপ ১**: [voters.eci.gov.in](https://voters.eci.gov.in) পোর্টালে গিয়ে সাইন-আপ করুন।
- **ধাপ ২**: 'Fill Form 6 - Register as a New Elector/Voter' নির্বাচন করুন।
- **ধাপ ৩**: নাম, আত্মীয়ের বিবরণ, মোবাইল নম্বর এবং বর্তমান ঠিকানা লিখুন।
- **ধাপ ৪**: ছবি ও প্রয়োজনীয় ডকুমেন্টস আপলোড করুন (আমাদের ওয়েবসাইটের ফটো ক্রপার ও কম্প্রেসার টুল দিয়ে আগে সাইজ ঠিক করে নিতে পারেন)।
- **ধাপ ৫**: সমস্ত তথ্য যাচাই করে সাবমিট করুন। প্রাপ্ত রেফারেন্স নম্বরটি সংরক্ষণ করুন।
`
  },
  {
    id: "post-3",
    title: "কৃষক বন্ধু প্রকল্প ২০২৪: আপনার নাম ও টাকা ঢোকার স্ট্যাটাস যাচাই করুন",
    slug: "krishak-bandhu-payment-status-check",
    excerpt: "পশ্চিমবঙ্গের কৃষকদের জন্য বিশেষ আর্থিক অনুদান প্রকল্প 'কৃষক বন্ধু'। খরিফ ও রবি মরশুমে সরাসরি অ্যাকাউন্টে টাকা পাওয়ার নিয়মাবলী।",
    category: "govt-schemes",
    categoryName: "সরকারি প্রকল্প",
    author: {
      name: "শুভম সেনগুপ্ত",
      role: "ডিজিটাল সেবা বিশেষজ্ঞ",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    featuredImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900&auto=format&fit=crop&q=80",
    publishedDate: "০৫ সেপ্টেম্বর, ২০২৪",
    readingTime: "৪ মিনিট",
    views: 11200,
    likes: 710,
    isFeatured: false,
    isPopular: true,
    tags: ["কৃষক বন্ধু", "কৃষি দপ্তর", "খরিফ অনুদান", "পেমেন্ট"],
    content: `
### কৃষক বন্ধু প্রকল্পের উদ্দেশ্য
রাজ্যের কৃষকদের ফসলের সহায়তা এবং মৃত্যুজনিত আর্থিক ঝুঁকি নিরসনে পশ্চিমবঙ্গ কৃষি বিভাগ এই প্রকল্প পরিচালনা করে।

### বছরে মোট সহায়তার পরিমাণ
* ১ একর বা তার বেশি চাষযোগ্য জমি থাকলে বছরে ₹১০,০০০/- টাকা (দুই কিস্তিতে)।
* ১ একরের কম চাষযোগ্য জমি থাকলে ন্যূনতম ₹৪,০০০/- টাকা।
`
  },
  {
    id: "post-4",
    title: "স্বামী বিবেকানন্দ স্কলারশিপ (SVMCM) ২০২৪-২৫: আবেদন ও রিনিউয়াল পদ্ধতি",
    slug: "svmcm-scholarship-application-guide",
    excerpt: "উচ্চমাধ্যমিক, স্নাতক এবং স্নাতকোত্তর স্তরের মেধাবী শিক্ষার্থীদের জন্য প্রতি বছর ₹১২,০০০ থেকে ₹৬০,০০০ টাকার আর্থিক স্কলারশিপ।",
    category: "education",
    categoryName: "শিক্ষা ও স্কলারশিপ",
    author: {
      name: "অনন্যা মুখার্জী",
      role: "কন্টেন্ট রাইটার",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    featuredImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&auto=format&fit=crop&q=80",
    publishedDate: "০৩ সেপ্টেম্বর, ২০২৪",
    readingTime: "৬ মিনিট",
    views: 16500,
    likes: 1100,
    isFeatured: true,
    isPopular: true,
    tags: ["SVMCM", "স্বামী বিবেকানন্দ", "স্কলারশিপ", "উচ্চশিক্ষা"],
    content: `
### স্কলারশিপের যোগ্যতা
- পশ্চিমবঙ্গে স্থায়ী বসবাসকারী হতে হবে।
- পূর্ববর্তী বোর্ড পরীক্ষায় কমপক্ষে ৬০% নম্বর থাকতে হবে।
- পারিবারিক বার্ষিক আয় ₹২,৫০,০০০ টাকার কম হতে হবে।
`
  },
  {
    id: "post-5",
    title: "অনলাইনে ইনস্ট্যান্ট ই-প্যান কার্ড বানানোর নিয়ম: কোনো চার্জ ছাড়াই",
    slug: "instant-e-pan-card-download-free",
    excerpt: "জরুরি প্রয়োজনে ১০ মিনিটের মধ্যে আধার কার্ডের সাহায্যে ফ্রিতে ইনস্ট্যান্ট ই-প্যান কার্ড ডাউনলোড করুন আয়কর বিভাগের অফিশিয়াল পোর্টাল থেকে।",
    category: "online-services",
    categoryName: "অনলাইন সেবা",
    author: {
      name: "শুভম সেনগুপ্ত",
      role: "ডিজিটাল সেবা বিশেষজ্ঞ",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    featuredImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=900&auto=format&fit=crop&q=80",
    publishedDate: "০১ সেপ্টেম্বর, ২০২৪",
    readingTime: "৫ মিনিট",
    views: 7400,
    likes: 490,
    isFeatured: false,
    isPopular: false,
    tags: ["ই-প্যান", "আয়কর দপ্তর", "আধার ওটিপি", "প্যান কার্ড"],
    content: `
### ইনস্ট্যান্ট ই-প্যান কী?
আয়কর বিভাগ তাৎক্ষণিকভাবে আধার কার্ডে থাকা তথ্যের ভিত্তিতে ডিজিটাল প্যান নম্বর বরাদ্দ করে। এটি বৈধ এবং যেকোনো কাজে গ্রহণযোগ্য।
`
  },
  {
    id: "post-6",
    title: "পশ্চিমবঙ্গ পুলিশ কনস্টেবল নিয়োগ ২০২৪: পরীক্ষার সিলেবাস ও প্রস্তুতি গাইড",
    slug: "wb-police-constable-recruitment-guide",
    excerpt: "রাজ্য পুলিশে হাজার হাজার কনস্টেবল নিয়োগ বিজ্ঞপ্তি। প্রিলিমিনারি পরীক্ষা, শারীরিক মাপজোক এবং মেইন পরীক্ষার সম্পূর্ণ প্রস্তুতি স্ট্র্যাটেজি।",
    category: "jobs",
    categoryName: "চাকরির খবর",
    author: {
      name: "অনন্যা মুখার্জী",
      role: "কন্টেন্ট রাইটার",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    featuredImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&auto=format&fit=crop&q=80",
    publishedDate: "২৯ আগস্ট, ২০২৪",
    readingTime: "৮ মিনিট",
    views: 18900,
    likes: 1250,
    isFeatured: false,
    isPopular: true,
    tags: ["WBP", "পুলিশ কনস্টেবল", "চাকরি", "সিলেবাস"],
    content: `
### পরীক্ষার পর্যায়সমূহ
১. প্রিলিমিনারি লিখিত পরীক্ষা (১০০ নম্বর)
২. শারীরিক পরিমাপ ও দক্ষতা পরীক্ষা (PMT & PET)
৩. ফাইনাল লিখিত পরীক্ষা (৮৫ নম্বর)
৪. ইন্টারভিউ (১৫ নম্বর)
`
  }
];
