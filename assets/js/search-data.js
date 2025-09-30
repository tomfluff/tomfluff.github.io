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
        },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-awarded-the-mext-scholarship-for-research-students-monbukagakusho-文部科学省奨学金-to-pursue-my-master-s-in-japan",
          title: 'Awarded the MEXT Scholarship for Research Students (Monbukagakusho: 文部科学省奨学金) to pursue my Master’s...',
          description: "",
          section: "News",},{id: "news-started-my-master-s-program-at-the-university-of-tokyo-under-the-supervision-of-prof-takeo-igarashi",
          title: 'Started my Master’s program at the University of Tokyo under the supervision of...',
          description: "",
          section: "News",},{id: "news-started-a-6-month-internship-at-honda-research-institute-hri-japan-supervised-by-dr-christian-arzate-cruz",
          title: 'Started a 6-month internship at Honda Research Institute (HRI) Japan supervised by Dr....',
          description: "",
          section: "News",},{id: "news-our-paper-smart-replay-eラーニング動画における視覚的-時間的アクセシビリティの向上-was-accepted-to-wiss-2023",
          title: 'Our paper “Smart Replay: eラーニング動画における視覚的・時間的アクセシビリティの向上” was accepted to WISS 2023. ✨',
          description: "",
          section: "News",},{id: "news-received-the-google-award-for-inclusion-research-grant-to-advance-accessible-e-learning-supervised-by-james-stout",
          title: 'Received the Google Award for Inclusion Research Grant to advance accessible e-learning, supervised...',
          description: "",
          section: "News",},{id: "news-presented-our-work-smart-replay-at-wiss-2023-️",
          title: 'Presented our work Smart Replay at WISS 2023. 🗣️',
          description: "",
          section: "News",},{id: "news-awarded-the-helpfeel-award-for-quot-smart-replay-quot-wiss-2023",
          title: 'Awarded the Helpfeel award for &amp;quot;Smart Replay&amp;quot; (WISS 2023) 🎉',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2023-12-01-helpfeel-award-wiss-2023/";
            },},{id: "news-our-project-mystoryknight-accepted-as-a-demo-to-interaction-2024",
          title: 'Our project MyStoryKnight accepted as a demo to INTERACTION 2024! ✨',
          description: "",
          section: "News",},{id: "news-our-work-smartlearn-visual-temporal-accessibility-for-slide-based-e-learning-videos-was-accepted-to-chi-2024-as-late-breaking-work",
          title: 'Our work “SmartLearn: Visual-Temporal Accessibility for Slide-based e-learning Videos” was accepted to CHI...',
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
          title: 'Our work “Data Augmentation for 3DMM-based Arousal-Valence Prediction for HRI” was accepted to...',
          description: "",
          section: "News",},{id: "news-started-a-3-month-research-visit-to-the-university-of-texas-at-austin-with-prof-amy-pavel",
          title: 'Started a 3-month research visit to the University of Texas at Austin with...',
          description: "",
          section: "News",},{id: "news-our-work-showme-対話的な強調表示と拡大表示によるプレゼンテーションビデオの視覚的アクセシビリティの改善-was-accepted-to-wiss-2024",
          title: 'Our work “ShowMe: 対話的な強調表示と拡大表示によるプレゼンテーションビデオの視覚的アクセシビリティの改善” was accepted to WISS 2024! ✨',
          description: "",
          section: "News",},{id: "news-presented-our-work-showme-at-wiss-2024-conference-️",
          title: 'Presented our work ShowMe at WISS 2024 conference. 🗣️',
          description: "",
          section: "News",},{id: "news-received-the-beyondai-softbank-research-grant-for-supporting-visual-access-of-low-vision-people",
          title: 'Received the BeyondAI SoftBank research grant for supporting visual access of low-vision people!...',
          description: "",
          section: "News",},{id: "news-our-work-veasyguide-personalized-visual-guidance-for-low-vision-learners-on-instructor-actions-in-presentation-videos-was-accepted-to-assets-2025",
          title: 'Our work “VeasyGuide: Personalized Visual Guidance for Low-vision Learners on Instructor Actions in...',
          description: "",
          section: "News",},{id: "news-our-work-veasyguide-received-an-honorable-mention-award-at-assets-2025",
          title: 'Our work VeasyGuide received an Honorable Mention Award at ASSETS 2025! 🎉',
          description: "",
          section: "News",},{id: "news-started-a-2-month-research-visit-to-the-university-of-washington-at-the-makeability-lab-with-prof-jon-froehlich",
          title: 'Started a 2-month research visit to the University of Washington at the Makeability...',
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
