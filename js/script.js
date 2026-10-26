/**
 * DigiLife — Module 1 Homepage Prototype Script
 * Vanilla JavaScript (ES6+)
 * Handles:
 * 1. Mobile navigation drawer open/close & keyboard accessibility
 * 2. Scroll-spy active link highlighting & sticky header state
 * 3. Service pre-selection from CTAs and service cards
 * 4. Browser form validation (:user-invalid sync + WeakMap fallback) & Demo preview
 * 5. Accessible <dialog> modals for Privacy Policy and Terms & Conditions
 * 6. Subtle reveal animations respecting prefers-reduced-motion
 */

(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initYear();
    initHeaderAndMobileMenu();
    initScrollSpy();
    initServicePreselect();
    initDemoFormValidation();
    initLegalModals();
    initRevealAnimations();
    initServicesCalendar();
  });

  
  /* ------------------------------------------------------------------------
     7. Interactive Services Calendar & Scroll Animation
     ------------------------------------------------------------------------ */
  function initServicesCalendar() {
    const calendarContainer = document.getElementById('services-calendar-showcase');
    const servicesSection = document.getElementById('services');
    if (!calendarContainer || !servicesSection) return;

    // Services Dataset representing business growth timeline
    const servicesData = [
      {
        id: 'business-registration',
        serviceName: 'Business Registration',
        phase: 'PHASE 01 • FOUNDATION',
        month: 'JANUARY 2026',
        tagline: 'Legal Setup & Statutory Licences',
        desc: 'LLP, private limited, OPC, proprietorship and partnership setup, along with PAN, GST, Udyam, FSSAI and trade licences, guided by qualified professionals.',
        duration: '7–14 Business Days',
        icon: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z" stroke="#C6F36B" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        activeDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        milestones: {
          1: 'Document Collection & Verification',
          4: 'Name Approval (RUN / SPICe+)',
          8: 'Digital Signature & ROC Filing',
          14: 'Certificate of Incorporation & GST'
        },
        checklist: [
          'LLP / Pvt Ltd / OPC Setup',
          'PAN, TAN & GST Registration',
          'Udyam & MSME Certification',
          'Bank Resolution & Trade Licences'
        ],
        stats: [
          { val: '5–7 Days', label: 'Average Approval' },
          { val: '100%', label: 'Compliance Assurance' }
        ]
      },
      {
        id: 'brand-identity',
        serviceName: 'Brand Identity',
        phase: 'PHASE 02 • CREATIVE ASSETS',
        month: 'FEBRUARY 2026',
        tagline: 'Logo, Typography & Brand Guidelines',
        desc: 'Logo, colour palette, letterhead, visiting cards and brand guidelines that make a new business look established from the very first meeting.',
        duration: '10–14 Business Days',
        icon: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none"><path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3Z" stroke="#C6F36B" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        activeDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        milestones: {
          3: 'Brand Discovery & Moodboards',
          8: 'Logo Design Concepts (3 Options)',
          12: 'Stationery & Visiting Cards',
          18: 'Official Brand Manual Delivery'
        },
        checklist: [
          'Custom Vector Logo Suite',
          'Primary & Secondary Colour Palette',
          'Business Cards & Letterhead',
          'Digital Brand Identity Manual'
        ],
        stats: [
          { val: '3+ Variants', label: 'Initial Concepts' },
          { val: 'Vector High-Res', label: 'Print & Web Ready' }
        ]
      },
      {
        id: 'websites-and-online-presence',
        serviceName: 'Websites and Online Presence',
        phase: 'PHASE 03 • DIGITAL LAUNCH',
        month: 'MARCH 2026',
        tagline: 'High-Speed Responsive Web Presence',
        desc: 'Fast, mobile-friendly websites and landing pages that explain what you offer and make it easy for customers to contact you.',
        duration: '14–21 Business Days',
        icon: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none"><path d="M8.5 8.5L4.5 12l4 3.5M15.5 8.5l4 3.5-4 3.5M13.5 6.5l-3 11" stroke="#C6F36B" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        activeDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        milestones: {
          4: 'Wireframes & Site Architecture',
          10: 'Interactive UI Design Prototype',
          16: 'Frontend Coding & Mobile QA',
          21: 'Domain Setup, SEO & Production Go-Live'
        },
        checklist: [
          '100% Mobile-Responsive Layout',
          'Optimized Loading Speed & Core Vitals',
          'Lead Forms & WhatsApp Integration',
          'Google Search Console & SEO Setup'
        ],
        stats: [
          { val: '95+ Score', label: 'Lighthouse Performance' },
          { val: '100% Fluid', label: 'Mobile & Tablet Ready' }
        ]
      },
      {
        id: 'digital-marketing',
        serviceName: 'Digital Marketing',
        phase: 'PHASE 04 • AUDIENCE ACQUISITION',
        month: 'APRIL 2026',
        tagline: 'Local Search, Google Business & Paid Ads',
        desc: 'Google Business Profile, social media, search and social advertising, and content planned around the customers you want to reach.',
        duration: 'Monthly Active Sprints',
        icon: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none"><path d="M16 5.5L8.5 9H5.5C4.67 9 4 9.67 4 10.5v2C4 13.33 4.67 14 5.5 14h1.2l1.6 4.5h2.1L9 14l7 3.5V5.5Z" fill="#C6F36B"/><path d="M18.5 9.2a3.2 3.2 0 0 1 0 4.6" stroke="#C6F36B" stroke-width="2" stroke-linecap="round"/></svg>',
        activeDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        milestones: {
          5: 'Google Profile Audit & Geo-Optimization',
          12: 'Targeted Ad Campaign Launch',
          20: 'Social Media Content Deployment',
          30: 'Monthly ROI & Leads Report'
        },
        checklist: [
          'Google Maps & Profile Local SEO',
          'Targeted Meta & Search Ads',
          'Creative Content Calendars',
          'Real-Time Lead Tracking'
        ],
        stats: [
          { val: '3.5x Avg', label: 'Inquiry Growth' },
          { val: 'Top 3 Pack', label: 'Google Local Target' }
        ]
      },
      {
        id: 'compliance-coordination',
        serviceName: 'Compliance Coordination',
        phase: 'PHASE 05 • REGULATORY GOVERNANCE',
        month: 'MAY 2026',
        tagline: 'Filing Reminders, Tax Audits & Renewals',
        desc: 'Filing calendars, renewal reminders and document tracking, coordinated with our partner chartered accountants and company secretaries.',
        duration: 'Year-Round Tracking',
        icon: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" stroke="#C6F36B" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="m9 12 2 2 4-4" stroke="#C6F36B" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        activeDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
        milestones: {
          7: 'Books Reconciliation & TDS Review',
          15: 'GST Monthly Return Filing (GSTR-1/3B)',
          20: 'Annual ROC Compliances Track',
          28: 'Licence Renewals & CA Verification'
        },
        checklist: [
          'Monthly & Quarterly GST Returns',
          'Annual ROC & Ministry Filings',
          'Automated Renewal Alerts',
          'Dedicated CA / CS Account Liaison'
        ],
        stats: [
          { val: 'Zero Late Fees', label: 'On-Time Tracking' },
          { val: '100% Verified', label: 'Statutory Safety' }
        ]
      },
      {
        id: 'business-development',
        serviceName: 'Business Development',
        phase: 'PHASE 06 • GROWTH & SCALING',
        month: 'JUNE 2026+',
        tagline: 'MSME Subsidies, Funding & Vendor Onboarding',
        desc: 'Guidance on MSME benefits, funding options, vendor onboarding and growth planning as your business matures.',
        duration: 'Strategic Ongoing Roadmaps',
        icon: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none"><rect x="5" y="13" width="3" height="6" rx="1" fill="#C6F36B"/><rect x="10.5" y="9.5" width="3" height="9.5" rx="1" fill="#C6F36B"/><rect x="16" y="5" width="3" height="14" rx="1" fill="#C6F36B"/></svg>',
        activeDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        milestones: {
          5: 'MSME Subsidy Eligibility Audit',
          14: 'Corporate Vendor Onboarding Dossier',
          22: 'Growth Capital & Loan Proposal',
          30: 'Quarterly Expansion Blueprint'
        },
        checklist: [
          'Govt MSME Scheme Enrollment',
          'Corporate Vendor Documentation',
          'Bank Loan & Working Capital Guidance',
          'Quarterly Business Review Sessions'
        ],
        stats: [
          { val: 'Up to 50%', label: 'Subsidy Potential' },
          { val: 'Direct Pipeline', label: 'B2B Procurement' }
        ]
      }
    ];

    let currentPhaseIndex = 0;
    let autoTourTimer = null;
    let isAutoTourRunning = false;

    // Elements
    const monthTitleEl = document.getElementById('cal-month-title');
    const phaseTagEl = document.getElementById('cal-phase-tag');
    const daysGridEl = document.getElementById('cal-days-grid');
    const progressFillEl = document.getElementById('cal-progress-fill');
    const progressTextEl = document.getElementById('cal-progress-text');
    const spotlightCardEl = document.getElementById('cal-spotlight-card');
    const phasePills = Array.from(document.querySelectorAll('.phase-pill'));
    const prevBtn = document.getElementById('cal-prev-btn');
    const nextBtn = document.getElementById('cal-next-btn');
    const tourToggleBtn = document.getElementById('cal-tour-toggle');
    const calendarView = document.getElementById('services-calendar-view');
    const gridView = document.getElementById('services-grid-view');
    const viewToggleBtns = Array.from(document.querySelectorAll('.view-toggle-btn'));
    const milestoneBannerEl = document.getElementById('cal-milestone-banner');

    // Build Calendar Month Days (31 days representation)
    function renderDays(data) {
      if (!daysGridEl) return;
      daysGridEl.innerHTML = '';

      for (let day = 1; day <= 31; day++) {
        const dayBtn = document.createElement('button');
        dayBtn.type = 'button';
        dayBtn.className = 'cal-day';
        dayBtn.textContent = String(day);
        dayBtn.setAttribute('data-day', String(day));

        const isActive = data.activeDays.includes(day);
        const isMilestone = Boolean(data.milestones && data.milestones[day]);

        if (isActive) {
          dayBtn.classList.add('is-active-service');
        }

        if (isMilestone) {
          dayBtn.classList.add('is-milestone');
          const marker = document.createElement('span');
          marker.className = 'milestone-marker';
          dayBtn.appendChild(marker);
          dayBtn.setAttribute('title', 'Milestone: ' + data.milestones[day]);
          dayBtn.setAttribute('aria-label', 'Day ' + day + ': ' + data.milestones[day]);
        }

        // Click on individual day to preview or activate milestone
        dayBtn.addEventListener('click', () => {
          if (data.milestones && data.milestones[day]) {
            showMilestoneBanner(day, data.milestones[day]);
          } else {
            showMilestoneBanner(day, 'Active service execution window for ' + data.serviceName);
          }
        });

        daysGridEl.appendChild(dayBtn);
      }
    }

    function showMilestoneBanner(day, text) {
      if (!milestoneBannerEl) return;
      milestoneBannerEl.innerHTML = '<span>🗓️ <strong>Day ' + day + ':</strong> ' + text + '</span>';
      milestoneBannerEl.style.display = 'flex';
    }

    // Render Spotlight Card for current phase
    function renderSpotlight(data) {
      if (!spotlightCardEl) return;

      const checklistHtml = data.checklist
        .map(function(item) {
          return '<li class="checklist-item"><span class="checklist-icon" aria-hidden="true">&#10003;</span><span>' + item + '</span></li>';
        })
        .join('');

      const statsHtml = data.stats
        .map(function(stat) {
          return '<div class="spotlight-stat-box"><span class="stat-box-val">' + stat.val + '</span><span class="stat-box-label">' + stat.label + '</span></div>';
        })
        .join('');

      spotlightCardEl.innerHTML = 
        '<div class="spotlight-content-animated">' +
          '<div class="spotlight-top-bar">' +
            '<span class="spotlight-phase-badge">' + data.phase + '</span>' +
            '<span class="spotlight-duration-pill"><span aria-hidden="true">&#9201;</span> ' + data.duration + '</span>' +
          '</div>' +
          '<div class="spotlight-header-group">' +
            '<div class="spotlight-icon-box" aria-hidden="true">' + data.icon + '</div>' +
            '<div class="spotlight-title-group">' +
              '<h3 class="spotlight-title">' + data.serviceName + '</h3>' +
              '<p class="spotlight-tagline">' + data.tagline + '</p>' +
            '</div>' +
          '</div>' +
          '<p class="spotlight-desc">' + data.desc + '</p>' +
          '<ul class="spotlight-checklist">' + checklistHtml + '</ul>' +
          '<div class="spotlight-stats-row">' + statsHtml + '</div>' +
          '<div id="cal-milestone-banner" class="milestone-preview-banner">' +
            '<span>&#128073; <strong>Milestone Highlight:</strong> ' + (data.milestones[Object.keys(data.milestones)[0]] || 'Active Service Window') + '</span>' +
          '</div>' +
        '</div>' +
        '<a href="#contact" class="spotlight-cta-btn" data-select-service="' + data.serviceName + '">' +
          '<span>Schedule ' + data.serviceName + '</span>' +
          '<span aria-hidden="true">&rarr;</span>' +
        '</a>';
    }

    // Update to specific phase
    function setPhase(index, userInitiated = false) {
      if (index < 0) index = servicesData.length - 1;
      if (index >= servicesData.length) index = 0;
      currentPhaseIndex = index;

      const data = servicesData[currentPhaseIndex];

      if (monthTitleEl) monthTitleEl.textContent = data.month;
      if (phaseTagEl) phaseTagEl.textContent = data.phase;

      // Update days
      renderDays(data);

      // Update spotlight
      renderSpotlight(data);

      // Update progress bar
      const progressPercent = Math.round(((currentPhaseIndex + 1) / servicesData.length) * 100);
      if (progressFillEl) progressFillEl.style.width = progressPercent + '%';
      if (progressTextEl) progressTextEl.textContent = 'Phase ' + (currentPhaseIndex + 1) + ' of ' + servicesData.length;

      // Update phase ribbon pills
      phasePills.forEach(function(pill, i) {
        const isActive = i === currentPhaseIndex;
        pill.classList.toggle('is-active', isActive);
        pill.setAttribute('aria-selected', String(isActive));
        if (isActive && userInitiated) {
          pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    }

    // Navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        stopAutoTour();
        setPhase(currentPhaseIndex - 1, true);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        stopAutoTour();
        setPhase(currentPhaseIndex + 1, true);
      });
    }

    // Phase Ribbon Pills Click
    phasePills.forEach(function(pill) {
      pill.addEventListener('click', function() {
        stopAutoTour();
        const targetIndex = parseInt(pill.getAttribute('data-phase-index'), 10);
        if (!isNaN(targetIndex)) {
          setPhase(targetIndex, true);
        }
      });
    });

    // Auto-Tour functionality
    function startAutoTour() {
      isAutoTourRunning = true;
      if (tourToggleBtn) tourToggleBtn.innerHTML = '<span>&#10074;&#10074; Pause Tour</span>';
      autoTourTimer = setInterval(function() {
        setPhase(currentPhaseIndex + 1, false);
      }, 3400);
    }

    function stopAutoTour() {
      isAutoTourRunning = false;
      if (autoTourTimer) {
        clearInterval(autoTourTimer);
        autoTourTimer = null;
      }
      if (tourToggleBtn) tourToggleBtn.innerHTML = '<span>&#9654; Auto-Tour</span>';
    }

    if (tourToggleBtn) {
      tourToggleBtn.addEventListener('click', function() {
        if (isAutoTourRunning) {
          stopAutoTour();
        } else {
          startAutoTour();
        }
      });
    }

    // View Switcher (Calendar Mode vs Grid Mode)
    viewToggleBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const targetMode = btn.getAttribute('data-view-mode');
        viewToggleBtns.forEach(function(b) {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });

        if (targetMode === 'calendar') {
          if (calendarView) calendarView.classList.remove('is-hidden');
          if (gridView) gridView.classList.add('is-hidden');
        } else {
          if (calendarView) calendarView.classList.add('is-hidden');
          if (gridView) gridView.classList.remove('is-hidden');
          stopAutoTour();
        }
      });
    });

    // Scroll-driven animation when scrolling through the Services section
    let lastScrollY = window.scrollY;
    let isTicking = false;

    function handleScrollServices() {
      if (!calendarView || calendarView.classList.contains('is-hidden')) return;

      const rect = calendarContainer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if calendar is currently in active viewing window
      if (rect.top < viewportHeight * 0.75 && rect.bottom > viewportHeight * 0.25) {
        // Calculate scroll percentage through the services calendar section
        const totalHeight = rect.height;
        const progress = Math.max(0, Math.min(1, (viewportHeight * 0.7 - rect.top) / totalHeight));

        const targetIndex = Math.min(
          servicesData.length - 1,
          Math.floor(progress * servicesData.length)
        );

        if (targetIndex !== currentPhaseIndex && !isAutoTourRunning) {
          setPhase(targetIndex, false);
        }
      }
      isTicking = false;
    }

    window.addEventListener('scroll', function() {
      if (!isTicking) {
        window.requestAnimationFrame(handleScrollServices);
        isTicking = true;
      }
    }, { passive: true });

    // Touch Swipe Support for Mobile Calendar
    let touchStartX = 0;
    let touchEndX = 0;

    calendarContainer.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    calendarContainer.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 45) {
        stopAutoTour();
        if (diff < 0) {
          // Swipe left -> Next phase
          setPhase(currentPhaseIndex + 1, true);
        } else {
          // Swipe right -> Prev phase
          setPhase(currentPhaseIndex - 1, true);
        }
      }
    }

    // Initial render
    setPhase(0, false);
  }

  /* ------------------------------------------------------------------------
     1. Footer Dynamic Year
     ------------------------------------------------------------------------ */
  function initYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  }

  /* ------------------------------------------------------------------------
     2. Header Scroll State & Mobile Menu Toggle
     ------------------------------------------------------------------------ */
  function initHeaderAndMobileMenu() {
    const header = document.querySelector('.site-header');
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const primaryNav = document.getElementById('primary-navigation');

    const updateHeaderScroll = () => {
      if (!header) return;
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };

    window.addEventListener('scroll', updateHeaderScroll, { passive: true });
    updateHeaderScroll();

    if (!toggleBtn || !primaryNav) return;

    const setMenuOpen = (isOpen, restoreFocus = false) => {
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      toggleBtn.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
      );
      primaryNav.classList.toggle('is-open', isOpen);

      if (!isOpen && restoreFocus) {
        toggleBtn.focus();
      }
    };

    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      setMenuOpen(!isExpanded);
    });

    // Close menu when clicking a navigation link or CTA inside the mobile menu
    primaryNav.addEventListener('click', (event) => {
      const link = event.target.closest('a[href]');
      if (link && toggleBtn.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
      }
    });

    // Close menu on Escape key and return focus to toggle button
    document.addEventListener('keydown', (event) => {
      if (
        event.key === 'Escape' &&
        toggleBtn.getAttribute('aria-expanded') === 'true'
      ) {
        setMenuOpen(false, true);
      }
    });

    // Close menu when clicking outside the header
    document.addEventListener('click', (event) => {
      if (
        toggleBtn.getAttribute('aria-expanded') === 'true' &&
        header &&
        !header.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    });

    // Ensure mobile menu resets cleanly when resizing to desktop width
    window.addEventListener('resize', () => {
      if (
        window.innerWidth > 900 &&
        toggleBtn.getAttribute('aria-expanded') === 'true'
      ) {
        setMenuOpen(false);
      }
    });
  }

  /* ------------------------------------------------------------------------
     3. Active Section Highlighting (Scroll-Spy)
     ------------------------------------------------------------------------ */
  function initScrollSpy() {
    const navLinks = Array.from(
      document.querySelectorAll('.primary-nav .nav-link[href^="#"]')
    );
    if (!navLinks.length || !('IntersectionObserver' in window)) return;

    const linkMap = new Map();
    navLinks.forEach((link) => {
      const id = link.getAttribute('href')?.slice(1);
      if (id) linkMap.set(id, link);
    });

    const setActiveLink = (sectionId) => {
      // Map intermediate sections to their logical parent nav item
      const normalizedId =
        sectionId === 'how-we-work' || sectionId === 'why-digilife'
          ? 'about'
          : sectionId;

      const targetLink = linkMap.get(normalizedId);
      if (!targetLink) return;

      navLinks.forEach((link) => {
        const isCurrent = link === targetLink;
        link.classList.toggle('active', isCurrent);
        if (isCurrent) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    const observedSections = document.querySelectorAll('main section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: 0
      }
    );

    observedSections.forEach((section) => observer.observe(section));
  }

  /* ------------------------------------------------------------------------
     4. Service Pre-selection from Service Cards, Chips & Consultation CTAs
     ------------------------------------------------------------------------ */
  function initServicePreselect() {
    const serviceSelect = document.getElementById('service-interest');
    const chips = Array.from(document.querySelectorAll('.service-chip'));
    if (!serviceSelect) return;

    const syncChips = (selectedValue) => {
      chips.forEach((chip) => {
        const matches = chip.getAttribute('data-select-service') === selectedValue;
        chip.classList.toggle('is-active', matches);
        chip.setAttribute('aria-pressed', String(matches));
      });
    };

    // Initialize aria-pressed on chips
    syncChips(serviceSelect.value);

    serviceSelect.addEventListener('change', () => {
      syncChips(serviceSelect.value);
    });

    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-select-service]');
      if (!trigger) return;

      const desiredService = trigger.getAttribute('data-select-service');
      if (!desiredService) return;

      // Check if option exists in select
      const matchingOption = Array.from(serviceSelect.options).find(
        (opt) => opt.value === desiredService
      );

      if (matchingOption) {
        serviceSelect.value = desiredService;
        // Dispatch change event so validation & chips stay in sync
        serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }

      // If the user clicked a quick-select button chip in the contact section, focus the select
      if (trigger.classList.contains('service-chip')) {
        serviceSelect.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. Browser Form Validation & Demo Submission Handler
     ------------------------------------------------------------------------ */
  function initDemoFormValidation() {
    const form = document.getElementById('enquiry-form');
    const feedbackBox = document.getElementById('form-feedback');
    if (!form) return;

    const dirtyState = new WeakMap();

    const updateControlValidity = (control) => {
      if (!control || typeof control.checkValidity !== 'function') return true;
      if (control.type === 'submit' || control.type === 'reset' || control.type === 'button') {
        return true;
      }

      // Trim text/email/tel/textarea values before validating if blurred
      const isValid = control.checkValidity();

      control.classList.toggle('user-invalid-fallback', !isValid);
      control.classList.toggle('user-valid-fallback', isValid);

      if (!isValid) {
        control.setAttribute('aria-invalid', 'true');
      } else {
        control.removeAttribute('aria-invalid');
      }

      return isValid;
    };

    // Track interaction state via WeakMap and sync aria-invalid after blur/input
    form.addEventListener(
      'blur',
      (event) => {
        const control = event.target;
        if (!control || typeof control.checkValidity !== 'function') return;

        const state = dirtyState.get(control) || {
          hasInteracted: false,
          hasBlurred: false
        };
        state.hasBlurred = true;
        dirtyState.set(control, state);

        // Sync ARIA and visual fallback if user interacted or if native :user-invalid matched
        const matchesNativeUserInvalid =
          CSS.supports('selector(:user-invalid)') &&
          control.matches(':user-invalid');

        if (state.hasInteracted || matchesNativeUserInvalid) {
          updateControlValidity(control);
        }
      },
      true
    );

    const handleInputOrChange = (event) => {
      const control = event.target;
      if (!control || typeof control.checkValidity !== 'function') return;

      const state = dirtyState.get(control) || {
        hasInteracted: false,
        hasBlurred: false
      };
      state.hasInteracted = true;
      dirtyState.set(control, state);

      if (
        state.hasBlurred ||
        control.hasAttribute('aria-invalid') ||
        control.type === 'checkbox' ||
        control.tagName === 'SELECT'
      ) {
        updateControlValidity(control);
      }
    };

    form.addEventListener('input', handleInputOrChange);
    form.addEventListener('change', handleInputOrChange);

    // Handle Form Reset
    form.addEventListener('reset', () => {
      const controls = Array.from(form.elements);
      controls.forEach((control) => {
        dirtyState.delete(control);
        control.classList.remove('user-invalid-fallback', 'user-valid-fallback');
        control.removeAttribute('aria-invalid');
      });

      document.querySelectorAll('.service-chip').forEach((chip) => {
        chip.classList.remove('is-active');
        chip.setAttribute('aria-pressed', 'false');
      });

      if (feedbackBox) {
        feedbackBox.hidden = true;
        feedbackBox.replaceChildren();
      }
    });

    // Handle Demo Form Submit
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const controls = Array.from(form.elements).filter(
        (el) =>
          typeof el.checkValidity === 'function' &&
          el.type !== 'submit' &&
          el.type !== 'reset' &&
          el.type !== 'button'
      );

      let firstInvalidControl = null;

      controls.forEach((control) => {
        // Trim leading/trailing whitespace on required text fields before checking validity
        if (
          (control.type === 'text' || control.tagName === 'TEXTAREA') &&
          control.value
        ) {
          control.value = control.value.trim();
        }

        const state = dirtyState.get(control) || {
          hasInteracted: true,
          hasBlurred: true
        };
        state.hasInteracted = true;
        state.hasBlurred = true;
        dirtyState.set(control, state);

        const valid = updateControlValidity(control);
        if (!valid && !firstInvalidControl) {
          firstInvalidControl = control;
        }
      });

      if (firstInvalidControl) {
        if (feedbackBox) {
          feedbackBox.hidden = true;
        }
        firstInvalidControl.focus();
        return;
      }

      // All fields valid — render local browser-only demo preview
      renderDemoConfirmation(form, feedbackBox);
    });
  }

  function renderDemoConfirmation(form, feedbackBox) {
    if (!feedbackBox) return;

    const formData = new FormData(form);
    const fullName = String(formData.get('fullName') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const businessName =
      String(formData.get('businessName') || '').trim() || 'Not provided';
    const serviceInterest = String(formData.get('serviceInterest') || '').trim();
    const enquiryMessage = String(formData.get('enquiryMessage') || '').trim();

    feedbackBox.replaceChildren();

    const header = document.createElement('div');
    header.className = 'form-feedback-header';

    const badge = document.createElement('span');
    badge.className = 'feedback-badge';
    badge.textContent = 'Demo Validated';

    const title = document.createElement('span');
    title.textContent = 'Message Validated in Browser (Demo)';

    header.append(badge, title);

    const note = document.createElement('p');
    note.textContent =
      'Your message passed browser validation. Because this is a static frontend prototype, no data was sent to a server.';

    const summary = document.createElement('div');
    summary.className = 'feedback-summary';

    const items = [
      ['Full Name', fullName],
      ['Email', email],
      ['Company', businessName],
      ['Service', serviceInterest],
      ['Message', enquiryMessage]
    ];

    items.forEach(([label, value]) => {
      const row = document.createElement('div');
      const strong = document.createElement('strong');
      strong.textContent = `${label}: `;
      const span = document.createElement('span');
      span.textContent = value;
      row.append(strong, span);
      summary.appendChild(row);
    });

    feedbackBox.append(header, note, summary);
    feedbackBox.hidden = false;
    feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ------------------------------------------------------------------------
     6. Accessible Legal Modals (<dialog>)
     ------------------------------------------------------------------------ */
  function initLegalModals() {
    document.addEventListener('click', (event) => {
      const openTrigger = event.target.closest('[data-modal-target]');
      if (openTrigger) {
        event.preventDefault();
        const modalId = openTrigger.getAttribute('data-modal-target');
        const dialog = modalId ? document.getElementById(modalId) : null;
        if (dialog && typeof dialog.showModal === 'function') {
          dialog.showModal();
        }
        return;
      }

      const closeTrigger = event.target.closest('[data-modal-close]');
      if (closeTrigger) {
        const dialog = closeTrigger.closest('dialog');
        if (dialog && typeof dialog.close === 'function') {
          dialog.close();
        }
        return;
      }

      // Close <dialog> when clicking directly on the backdrop
      if (event.target.tagName === 'DIALOG') {
        const dialog = event.target;
        const rect = dialog.getBoundingClientRect();
        const clickedInDialog =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;

        if (!clickedInDialog) {
          dialog.close();
        }
      }
    });
  }

  /* ------------------------------------------------------------------------
     7. Subtle Scroll Reveal (Respecting Reduced Motion)
     ------------------------------------------------------------------------ */
  function initRevealAnimations() {
    const revealItems = document.querySelectorAll('.reveal-item');
    if (!revealItems.length) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    document.documentElement.classList.add('js-loaded');

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.08
      }
    );

    revealItems.forEach((el) => observer.observe(el));
  }
})();
