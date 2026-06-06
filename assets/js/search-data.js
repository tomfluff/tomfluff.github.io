// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "All publications including journal papers, conference papers, posters/demos, and preprints.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "You can download a PDF version of my CV using the dedicated &amp;nbsp; download link.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-google-changed-their-icons-again-and-they-are-still-not-accessible",
        
          title: "Google Changed Their Icons Again... And They are Still Not Accessible",
        
        description: "Google recently redesigned their icons, but the new design is still not accessible for low-vision people. In this post, I discuss the new design, its accessibility issues, and my attempt to improve it as a low-vision person!",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/google-icon-redesign/";
          
        },
      },{id: "post-travel-japan-plum-blossom-festival-and-blv-accessibility",
        
          title: "Travel Japan: Plum Blossom Festival and BLV Accessibility",
        
        description: "February in Tokyo means one thing: the plum blossoms are here! Join me on a trip to Hanegi Park’s Ume Festival as I explore the beautiful scenery and find out how accessible a local Japanese festival truly is for the BLV community—from &quot;Braille Blocks&quot; to audio-guidance.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/hanegi-park/";
          
        },
      },{id: "post-veasyguide-at-assets-2025-recap-and-presentation-recording",
        
          title: "VeasyGuide at ASSETS 2025 Recap and Presentation Recording 🎥",
        
        description: "Recapping my experience presenting VeasyGuide at ASSETS 2025, which got a best paper honorable mention! Read about the conference and watch the recording of my talk. VeasyGuide is making communication between instructors and students in slide-based presentation videos accessible for low-vision learners.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/veasyguide-assets-2025/";
          
        },
      },{id: "post-at-and-me-an-interview-with-yotam-sechayk",
        
          title: 'AT and me: An interview with Yotam Sechayk <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "Veronica Lewis interviews Yotam Sechayk, a University of Tokyo PhD candidate with albinism who studies low-vision accessibility. The discussion covers his assistive tech projects—such as VeasyGuide for lecture videos—and how his personal experiences shape his research, and his passion for solo travel.",
        section: "Posts",
        handler: () => {
          
            window.open("https://www.perkins.org/resource/at-and-me-an-interview-with-yotam-sechayk/", "_blank");
          
        },
      },{id: "post-smart-replay-at-wiss-2023-recap-and-helpfeel-award",
        
          title: "Smart Replay at WISS 2023 Recap and Helpfeel Award 🏆",
        
        description: "Recap of my presentation of &#39;Smart Replay&#39; at WISS 2023, which also was my first WISS! A fun surprize was receiving the Helpfeel Award for improving accessibility in e-learning videos.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/wiss-2023-helpfeel-award/";
          
        },
      },{id: "news-awarded-the-mext-scholarship-for-research-students-monbukagakusho-文部科学省奨学金-to-pursue-my-master-s-in-japan",
          title: 'Awarded the MEXT Scholarship for Research Students (Monbukagakusho: 文部科学省奨学金) to pursue my Master’s...',
          description: "",
          section: "News",},{id: "news-started-my-master-s-program-at-the-university-of-tokyo-under-the-supervision-of-prof-takeo-igarashi",
          title: 'Started my Master’s program at the University of Tokyo under the supervision of...',
          description: "",
          section: "News",},{id: "news-started-a-6-month-internship-at-honda-research-institute-hri-japan-supervised-by-dr-christian-arzate-cruz",
          title: 'Started a 6-month internship at Honda Research Institute (HRI) Japan supervised by Dr....',
          description: "",
          section: "News",},{id: "news-our-paper-smart-replay-eラーニング動画における視覚的-時間的アクセシビリティの向上-was-accepted-to-wiss-2023",
          title: 'Our paper Smart Replay: eラーニング動画における視覚的・時間的アクセシビリティの向上 was accepted to WISS 2023. ✨',
          description: "",
          section: "News",},{id: "news-received-the-google-award-for-inclusion-research-grant-to-advance-accessible-e-learning-supervised-by-james-stout",
          title: 'Received the Google Award for Inclusion Research Grant to advance accessible e-learning, supervised...',
          description: "",
          section: "News",},{id: "news-presented-our-work-smart-replay-at-wiss-2023-️",
          title: 'Presented our work Smart Replay at WISS 2023. 🗣️',
          description: "",
          section: "News",},{id: "news-awarded-the-helpfeel-award-for-our-paper-smart-replay-at-wiss-2023",
          title: 'Awarded the Helpfeel award for our paper Smart Replay at WISS 2023! 🎉...',
          description: "",
          section: "News",},{id: "news-our-project-mystoryknight-accepted-as-a-demo-to-interaction-2024",
          title: 'Our project MyStoryKnight accepted as a demo to INTERACTION 2024! ✨',
          description: "",
          section: "News",},{id: "news-our-work-smartlearn-visual-temporal-accessibility-for-slide-based-e-learning-videos-was-accepted-to-chi-2024-as-late-breaking-work",
          title: 'Our work SmartLearn: Visual-Temporal Accessibility for Slide-based e-learning Videos was accepted to CHI...',
          description: "",
          section: "News",},{id: "news-graduated-the-university-of-tokyo-with-a-creative-informatics-master-s-advised-by-prof-takeo-igarashi",
          title: 'Graduated The University of Tokyo with a Creative Informatics Master’s advised by Prof....',
          description: "",
          section: "News",},{id: "news-awarded-the-mext-scholarship-for-research-students-monbukagakusho-文部科学省奨学金-to-pursue-my-phd-in-japan",
          title: 'Awarded the MEXT Scholarship for Research Students (Monbukagakusho: 文部科学省奨学金) to pursue my PhD...',
          description: "",
          section: "News",},{id: "news-started-a-3-year-phd-program-in-creative-informatics-at-the-university-of-tokyo-advised-by-prof-takeo-igarashi-and-co-advised-by-prof-ariel-shamir",
          title: 'Started a 3-year PhD program in Creative Informatics at The University of Tokyo...',
          description: "",
          section: "News",},{id: "news-presented-a-poster-for-smartlearn-at-the-chi-2024-late-breaking-work-track-️",
          title: 'Presented a poster for SmartLearn at the CHI 2024, late breaking work track....',
          description: "",
          section: "News",},{id: "news-our-work-data-augmentation-for-3dmm-based-arousal-valence-prediction-for-hri-was-accepted-to-ro-man-2024",
          title: 'Our work Data Augmentation for 3DMM-based Arousal-Valence Prediction for HRI was accepted to...',
          description: "",
          section: "News",},{id: "news-started-a-3-month-research-visit-to-the-university-of-texas-at-austin-with-prof-amy-pavel",
          title: 'Started a 3-month research visit to the University of Texas at Austin with...',
          description: "",
          section: "News",},{id: "news-our-work-showme-対話的な強調表示と拡大表示によるプレゼンテーションビデオの視覚的アクセシビリティの改善-was-accepted-to-wiss-2024",
          title: 'Our work ShowMe: 対話的な強調表示と拡大表示によるプレゼンテーションビデオの視覚的アクセシビリティの改善 was accepted to WISS 2024! ✨',
          description: "",
          section: "News",},{id: "news-presented-our-work-showme-at-wiss-2024-️",
          title: 'Presented our work ShowMe at WISS 2024. 🗣️',
          description: "",
          section: "News",},{id: "news-received-the-beyondai-softbank-research-grant-for-supporting-visual-access-of-low-vision-people",
          title: 'Received the BeyondAI SoftBank research grant for supporting visual access of low-vision people!...',
          description: "",
          section: "News",},{id: "news-our-work-veasyguide-personalized-visual-guidance-for-low-vision-learners-on-instructor-actions-in-presentation-videos-was-accepted-to-assets-2025",
          title: 'Our work VeasyGuide: Personalized Visual Guidance for Low-vision Learners on Instructor Actions in...',
          description: "",
          section: "News",},{id: "news-our-work-veasyguide-received-an-honorable-mention-award-at-assets-2025",
          title: 'Our work VeasyGuide received an Honorable Mention Award at ASSETS 2025! 🎉',
          description: "",
          section: "News",},{id: "news-started-a-2-month-research-visit-to-the-university-of-washington-at-the-makeability-lab-with-prof-jon-froehlich",
          title: 'Started a 2-month research visit to the University of Washington at the Makeability...',
          description: "",
          section: "News",},{id: "news-our-paper-graph-guide-低視力者支援のためのセマンティックfocus-context-グラフ表示-has-been-accepted-to-wiss-2025",
          title: 'Our paper Graph Guide: 低視力者支援のためのセマンティックFocus+Context グラフ表示 has been accepted to WISS 2025! ✨...',
          description: "",
          section: "News",},{id: "news-presented-our-work-veasyguide-at-assets-2025-️",
          title: 'Presented our work VeasyGuide at ASSETS 2025. 🗣️',
          description: "",
          section: "News",},{id: "news-our-paper-graph-guide-低視力者支援のためのセマンティックfocus-context-グラフ表示-was-presented-at-wiss-2025-and-received-a-best-paper-award",
          title: 'Our paper Graph Guide: 低視力者支援のためのセマンティックFocus+Context グラフ表示 was presented at WISS 2025 and received...',
          description: "",
          section: "News",},{id: "news-our-paper-improving-low-vision-chart-accessibility-via-on-cursor-visual-context-has-been-conditionally-accepted-to-chi-2026",
          title: 'Our paper Improving Low-Vision Chart Accessibility via On-Cursor Visual Context has been conditionally...',
          description: "",
          section: "News",},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%79%73%65%63%68%61%79%6B@%61%63%6D.%6F%72%67", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/tomfluff", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/yotams", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0009-0002-5286-0080", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=PzDcxYoAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
