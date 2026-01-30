// Light / Dark theme toggle
(function () {
  const defaultTheme = 'light'

  const themeToggleButtons = document.querySelectorAll(".theme-toggle");

  // Change the icons of the buttons based on previous settings or system theme
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      ((window.matchMedia("(prefers-color-scheme: dark)").matches && defaultTheme === "system") || defaultTheme === "dark"))
  ) {
    themeToggleButtons.forEach((el) => el.dataset.theme = "dark");
  } else {
    themeToggleButtons.forEach((el) => el.dataset.theme = "light");
  }

  // Add click event handler to the buttons
  themeToggleButtons.forEach((el) => {
    el.addEventListener("click", function () {
      if (localStorage.getItem("color-theme")) {
        if (localStorage.getItem("color-theme") === "light") {
          setDarkTheme();
          localStorage.setItem("color-theme", "dark");
        } else {
          setLightTheme();
          localStorage.setItem("color-theme", "light");
        }
      } else {
        if (document.documentElement.classList.contains("dark")) {
          setLightTheme();
          localStorage.setItem("color-theme", "light");
        } else {
          setDarkTheme();
          localStorage.setItem("color-theme", "dark");
        }
      }
      el.dataset.theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    });
  });

  // Listen for system theme changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (defaultTheme === "system" && !("color-theme" in localStorage)) {
      e.matches ? setDarkTheme() : setLightTheme();
      themeToggleButtons.forEach((el) =>
        el.dataset.theme = document.documentElement.classList.contains("dark") ? "dark" : "light"
      );
    }
  });
})();

// Footer waves color
function updateWaveColors(selector) {
  const isDarkMode = document.documentElement.classList.contains('dark');
  const waves = document.querySelectorAll(`${selector} .wave`);
  if (waves.length > 0) {
    if (isDarkMode) {
      waves[0].setAttribute('fill', 'rgba(50, 50, 50, 0.7)');
      waves[1].setAttribute('fill', 'rgba(50, 50, 50, 0.5)');
      waves[2].setAttribute('fill', 'rgba(50, 50, 50, 0.3)');
      waves[3].setAttribute('fill', '#171717');
    } else {
      waves[0].setAttribute('fill', 'rgba(243,244,246, 0.7)');
      waves[1].setAttribute('fill', 'rgba(243,244,246, 0.5)');
      waves[2].setAttribute('fill', 'rgba(243,244,246, 0.3)');
      waves[3].setAttribute('fill', '#e8e9eb');
    }
  }
}
updateWaveColors('.hero-waves');
updateWaveColors('.footer-waves');

const observer = new MutationObserver(() => {
  updateWaveColors('.hero-waves');
  updateWaveColors('.footer-waves');
});
observer.observe(document.documentElement, {
  attributes: true
});
;
// Hamburger menu for mobile navigation

document.addEventListener('DOMContentLoaded', function () {
  const menu = document.querySelector('.hamburger-menu');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const sidebarContainer = document.querySelector('.sidebar-container');

  // Initialize the overlay
  const overlayClasses = ['hx-fixed', 'hx-inset-0', 'hx-z-10', 'hx-bg-black/80', 'dark:hx-bg-black/60'];
  overlay.classList.add('hx-bg-transparent');
  overlay.classList.remove("hx-hidden", ...overlayClasses);

  function toggleMenu() {
    // Toggle the hamburger menu
    menu.querySelector('svg').classList.toggle('open');

    // When the menu is open, we want to show the navigation sidebar
    sidebarContainer.classList.toggle('max-md:[transform:translate3d(0,-100%,0)]');
    sidebarContainer.classList.toggle('max-md:[transform:translate3d(0,0,0)]');

    // When the menu is open, we want to prevent the body from scrolling
    document.body.classList.toggle('hx-overflow-hidden');
    document.body.classList.toggle('md:hx-overflow-auto');
  }

  menu.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();

    if (overlay.classList.contains('hx-bg-transparent')) {
      // Show the overlay
      overlay.classList.add(...overlayClasses);
      overlay.classList.remove('hx-bg-transparent');
    } else {
      // Hide the overlay
      overlay.classList.remove(...overlayClasses);
      overlay.classList.add('hx-bg-transparent');
    }
  });

  overlay.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();

    // Hide the overlay
    overlay.classList.remove(...overlayClasses);
    overlay.classList.add('hx-bg-transparent');
  });
});

;
// Copy button for code blocks

document.addEventListener('DOMContentLoaded', function () {
  const getCopyIcon = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    `;
    svg.setAttribute('fill', 'none');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    return svg;
  }

  const getSuccessIcon = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    `;
    svg.setAttribute('fill', 'none');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    return svg;
  }

  document.querySelectorAll('.hextra-code-copy-btn').forEach(function (button) {
    // Add copy and success icons
    button.querySelector('.copy-icon')?.appendChild(getCopyIcon());
    button.querySelector('.success-icon')?.appendChild(getSuccessIcon());

    // Add click event listener for copy button
    button.addEventListener('click', function (e) {
      e.preventDefault();
      // Get the code target
      const target = button.parentElement.previousElementSibling;
      let codeElement;
      if (target.tagName === 'CODE') {
        codeElement = target;
      } else {
        // Select the last code element in case line numbers are present
        const codeElements = target.querySelectorAll('code');
        codeElement = codeElements[codeElements.length - 1];
      }
      if (codeElement) {
        let code = codeElement.innerText;
        // Replace double newlines with single newlines in the innerText
        // as each line inside <span> has trailing newline '\n'
        if ("lang" in codeElement.dataset) {
          code = code.replace(/\n\n/g, '\n');
        }
        navigator.clipboard.writeText(code).then(function () {
          button.classList.add('copied');
          setTimeout(function () {
            button.classList.remove('copied');
          }, 1000);
        }).catch(function (err) {
          console.error('Failed to copy text: ', err);
        });
      } else {
        console.error('Target element not found');
      }
    });
  });
});

;
document.querySelectorAll('.hextra-tabs-toggle').forEach(function (button) {
  button.addEventListener('click', function (e) {
    // set parent tabs to unselected
    const tabs = Array.from(e.target.parentElement.querySelectorAll('.hextra-tabs-toggle'));
    tabs.map(tab => tab.dataset.state = '');

    // set current tab to selected
    e.target.dataset.state = 'selected';

    // set all panels to unselected
    const panelsContainer = e.target.parentElement.parentElement.nextElementSibling;
    Array.from(panelsContainer.children).forEach(function (panel) {
      panel.dataset.state = '';
    });

    const panelId = e.target.getAttribute('aria-controls');
    const panel = panelsContainer.querySelector(`#${panelId}`);
    panel.dataset.state = 'selected';
  });
});
;
(function () {
  const triggers = document.querySelectorAll('.language-switcher, .explore-trigger');

  function closeAllExcept(excludeTrigger = null) {
    triggers.forEach((trigger) => {
      if (trigger === excludeTrigger) return;

      if (trigger.dataset.state === 'open') {
        trigger.dataset.state = 'closed';
        const menu = trigger.nextElementSibling;
        if (menu) menu.classList.add('hx-hidden');
      }
    });
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const wasOpen = trigger.dataset.state === 'open';

      closeAllExcept(trigger);

      if (wasOpen) {
        trigger.dataset.state = 'closed';
        const menu = trigger.nextElementSibling;
        if (menu) menu.classList.add('hx-hidden');
      } else {
        trigger.dataset.state = 'open';
        const menu = trigger.nextElementSibling;
        if (!menu) return;

        menu.classList.remove('hx-hidden');

        const triggerRect = trigger.getBoundingClientRect();
        const menuHeight = menu.offsetHeight;

        const spaceBelow = window.innerHeight - triggerRect.bottom;
        const spaceAbove = triggerRect.top;

        let top;

        if (spaceBelow < menuHeight + 20 && spaceAbove > spaceBelow) {
          top = triggerRect.top - menuHeight - 10;
        } else {
          top = triggerRect.bottom + 10;
        }

        Object.assign(menu.style, {
          position: 'fixed',
          left: `${triggerRect.left}px`,
          top: `${top}px`,
          zIndex: 9999
        });
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-switcher') && !e.target.closest('.explore-trigger')) {
      closeAllExcept();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllExcept();
    }
  });
})();
;
// Script for filetree shortcode collapsing/expanding folders used in the theme
// ======================================================================
document.addEventListener("DOMContentLoaded", function () {
  const folders = document.querySelectorAll(".hextra-filetree-folder");
  folders.forEach(function (folder) {
    folder.addEventListener("click", function () {
      Array.from(folder.children).forEach(function (el) {
        el.dataset.state = el.dataset.state === "open" ? "closed" : "open";
      });
      folder.nextElementSibling.dataset.state = folder.nextElementSibling.dataset.state === "open" ? "closed" : "open";
    });
  });
});

;
document.addEventListener("DOMContentLoaded", function () {
  scrollToActiveItem();
  enableCollapsibles();
});

function enableCollapsibles() {
  const buttons = document.querySelectorAll(".hextra-sidebar-collapsible-button");
  buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const list = button.parentElement.parentElement;
      if (list) {
        list.classList.toggle("open")
      }
    });
  });
}

function scrollToActiveItem() {
  const sidebarScrollbar = document.querySelector("aside.sidebar-container > .hextra-scrollbar");
  const activeItems = document.querySelectorAll(".sidebar-active-item");
  const visibleActiveItem = Array.from(activeItems).find(function (activeItem) {
    return activeItem.getBoundingClientRect().height > 0;
  });

  if (!visibleActiveItem) {
    return;
  }

  const yOffset = visibleActiveItem.clientHeight;
  const yDistance = visibleActiveItem.getBoundingClientRect().top - sidebarScrollbar.getBoundingClientRect().top;
  sidebarScrollbar.scrollTo({
    behavior: "instant",
    top: yDistance - yOffset
  });
}

;
// Back to top button

document.addEventListener("DOMContentLoaded", function () {
  const backToTop = document.querySelector("#backToTop");
  if (backToTop) {
    document.addEventListener("scroll", (e) => {
      if (window.scrollY > 300) {
        backToTop.classList.remove("hx-opacity-0");
      } else {
        backToTop.classList.add("hx-opacity-0");
      }
    });
  }
});

function scrollUp() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

;
let currentAssessmentScores = {};
let currentQuizScores = {};

function startQuizAssessment(id) {
  const container = document.querySelector(`#${id}`);
  container.querySelector('.tm-start-button').style.display = 'none';
  container.querySelector('.tm-questions-container').style.display = 'block';
  showQuestion(id, 0);

  if (container.dataset.type === "assessment") {
    setupAssessmentButtons(id);
  } else {
    setupQuizButtons(id);
  }
}

function setupAssessmentButtons(assessmentId) {
  document.querySelectorAll('.tm-option').forEach(button => {
    button.addEventListener('click', function() {
      const currentIndex = parseInt(this.closest('.tm-question').dataset.index);
      const totalQuestions = document.querySelectorAll(`#${assessmentId} .tm-question`).length;

      currentAssessmentScores[assessmentId] = (currentAssessmentScores[assessmentId] || 0) + parseInt(this.dataset.score);

      if (currentIndex < totalQuestions - 1) {
        showQuestion(assessmentId, currentIndex + 1);
      } else {
        showAssessmentResult(assessmentId);
      }
    });
  });
}

function setupQuizButtons(quizId) {
  document.querySelectorAll('.tm-option').forEach(button => {
    button.addEventListener('click', function() {
      const currentIndex = parseInt(this.closest('.tm-question').dataset.index);
      const totalQuestions = document.querySelectorAll(`#${quizId} .tm-question`).length;

      const isCorrect = this.dataset.iscorrect === "true";
      if (isCorrect) {
        currentQuizScores[quizId] = (currentQuizScores[quizId] || 0) + 1;
      }

      if (currentIndex < totalQuestions - 1) {
        showQuestion(quizId, currentIndex + 1);
      } else {
        showQuizResult(quizId);
      }
    });
  });
}

function showQuestion(id, index) {
  const container = document.querySelector(`#${id}`);
  container.querySelectorAll('.tm-question').forEach(q => {
    q.classList.remove('active');
  });
  container.querySelector(`.tm-question[data-index="${index}"]`).classList.add('active');
}

function previousQuestion(id) {
  const currentIndex = parseInt(document.querySelector(`#${id} .tm-question.active`).dataset.index);
  showQuestion(id, Math.max(0, currentIndex - 1));
}

function showAssessmentResult(id) {
  const container = document.querySelector(`#${id}`);
  const totalScore = currentAssessmentScores[id] || 0;
  let resultText = '';

  if (totalScore <= 5) {
    resultText = resultTexts.casual;
  } else if (totalScore <= 10) {
    resultText = resultTexts.privacyConscious;
  } else {
    resultText = resultTexts.advanced;
  }

  container.querySelector('.tm-result-content').textContent = resultText;
  container.querySelector('.tm-result').style.display = 'block';
  container.querySelectorAll('.tm-question').forEach(q => {
    q.style.display = 'none';
  });
}

function showQuizResult(id) {
  const container = document.querySelector(`#${id}`);
  const totalScore = currentQuizScores[id] || 0;
  const totalQuestions = document.querySelectorAll(`#${id} .tm-question`).length;

  let resultText = totalScore + " / " + totalQuestions;

  container.querySelector('.tm-result-content').textContent = resultText;
  container.querySelector('.tm-result').style.display = 'block';
  container.querySelectorAll('.tm-question').forEach(q => {
    q.style.display = 'none';
  });
}

function restartQuizAssessment(id) {
  const container = document.querySelector(`#${id}`);
  currentAssessmentScores[id] = 0;
  currentQuizScores[id] = 0;
  container.querySelector('.tm-result').style.display = 'none';
  container.querySelectorAll('.tm-question').forEach(q => {
    q.style.cssText = '';
  });
  container.querySelector('.tm-questions-container').style.display = 'block';
  showQuestion(id, 0);
}
;
const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
const navContainer = document.querySelector('.nav-container');
navContainer.appendChild(navOverlay);

// Scroll down to common misconceptions section
function scrollMisconceptions() {
  const commonMisconceptionsId = document.getElementById('common-misconceptions');
  if (commonMisconceptionsId) {
    commonMisconceptionsId.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Spread the word button
function toggleShareDropdown() {
  const dropdown = document.getElementById("shareDropdown");
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "block";
  }
}

document.addEventListener('click', function(e) {
  const dropdown = document.getElementById("shareDropdown");
  const dropdownButton = document.querySelector(".shareDropdownButton");
  if (dropdown) {
    if (dropdown.style.display === "block" && !dropdown.contains(e.target) && !dropdownButton.contains(e.target)) {
      dropdown.style.display = "none";
    }
  }
});

// Checklists Carousel
(() => {
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');

    let currentIndex = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragCurrentX = 0;

    const extraWidth = 185;

    function getItemWidth() {
      const style = getComputedStyle(items[0]);
      const marginRight = Math.round(parseFloat(style.marginRight) || 0);
      const marginLeft = Math.round(parseFloat(style.marginLeft) || 0);
      return Math.round(items[0].offsetWidth + marginLeft + marginRight);
    }

    function visibleCount() {
      return Math.floor(carousel.offsetWidth / getItemWidth());
    }

    function totalItemsWidth() {
      return items.reduce((acc, item) => {
        const style = getComputedStyle(item);
        const marginRight = parseFloat(style.marginRight) || 0;
        const marginLeft = parseFloat(style.marginLeft) || 0;
        return acc + item.offsetWidth + marginLeft + marginRight;
      }, 0);
    }

    function updateTrackWidth() {
      const width = totalItemsWidth() + extraWidth;
      track.style.width = `${width}px`;
    }

    function maxTranslateX() {
      const trackWidth = parseFloat(track.style.width) || totalItemsWidth();
      const containerWidth = carousel.offsetWidth;
      const maxTx = trackWidth - containerWidth;
      return maxTx > 0 ? maxTx : 0;
    }

    function updateCarousel() {
      const itemWidth = getItemWidth();
      const maxIndex = Math.max(items.length - visibleCount(), 0);

      if (currentIndex < 0) currentIndex = 0;
      if (currentIndex > maxIndex) currentIndex = maxIndex;

      let translateX = currentIndex * itemWidth;

      if (translateX > maxTranslateX()) {
        translateX = maxTranslateX();
        currentIndex = Math.round(translateX / itemWidth);
      }

      track.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      track.style.transform = `translateX(${-translateX + 35}px)`;
    }

    function moveNext() {
      currentIndex++;
      updateCarousel();
    }

    function movePrev() {
      currentIndex--;
      updateCarousel();
    }

    function onDragStart(pageX) {
      isDragging = true;
      dragStartX = pageX;
      dragCurrentX = pageX;
      track.style.transition = 'none';
    }

    function onDragMove(pageX) {
      if (!isDragging) return;

      dragCurrentX = pageX;
      const dragDistance = dragCurrentX - dragStartX;
      const itemWidth = getItemWidth();
      const maxTx = maxTranslateX();

      let translateX = currentIndex * itemWidth - dragDistance;

      if (translateX < 0) {
        translateX = translateX / 3;
      } else if (translateX > maxTx) {
        translateX = maxTx + (translateX - maxTx) / 3;
      }

      track.style.transform = `translateX(${-translateX}px)`;
    }

    function onDragEnd() {
      if (!isDragging) return;
      isDragging = false;

      const dragDistance = dragCurrentX - dragStartX;
      const itemWidth = getItemWidth();
      let newIndex = currentIndex - Math.round(dragDistance / itemWidth);
      const maxIndex = Math.max(items.length - visibleCount(), 0);

      newIndex = Math.min(Math.max(newIndex, 0), maxIndex);
      currentIndex = newIndex;

      updateCarousel();
    }

    carousel.addEventListener('mousedown', e => {
      e.preventDefault();
      onDragStart(e.pageX);
    });
    window.addEventListener('mouseup', e => {
      onDragEnd();
    });
    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      e.preventDefault();
      onDragMove(e.pageX);
    });

    carousel.addEventListener('touchstart', e => {
      onDragStart(e.touches[0].pageX);
    });
    window.addEventListener('touchend', e => {
      onDragEnd();
    });
    window.addEventListener('touchmove', e => {
      if (!isDragging) return;
      onDragMove(e.touches[0].pageX);
    }, {
      passive: false
    });

    prevBtn.addEventListener('click', movePrev);
    nextBtn.addEventListener('click', moveNext);

    window.addEventListener('resize', () => {
      const maxIndex = Math.max(items.length - visibleCount(), 0);
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      updateCarousel();
      updateTrackWidth();
    });

    updateTrackWidth();
    updateCarousel();
  }
})();
;
function updateRoadmap() {
  const sections = document.querySelectorAll('.roadmap-section');
  sections.forEach(section => section.style.display = 'none');

  const selectedTabInput = document.querySelector('input[name="tabs"]:checked');
  if (selectedTabInput) {
    const selectedTab = selectedTabInput.value;
    const contentElement = document.getElementById(selectedTab + 'Content');

    if (contentElement) {
      contentElement.style.display = 'block';
    }

    const selectedLabel = document.querySelector(`label[for="radio-${selectedTab}"]`);
    const glider = document.querySelector('.glider');

    if (selectedLabel && glider) {
      const labelRect = selectedLabel.getBoundingClientRect();
      const tabsRect = document.querySelector('.tabs')?.getBoundingClientRect();

      if (tabsRect) {
        glider.style.width = `${labelRect.width}px`;
        const verticalOffset = labelRect.top - tabsRect.top;
        glider.style.transform = `translate(${labelRect.left - tabsRect.left}px, ${verticalOffset}px)`;
      }
    }
  }
}

function saveLastTab(tabValue) {
  try {
    localStorage.setItem('roadmap-last-tab', tabValue);
  } catch (e) {}
}

function getLastTab() {
  try {
    return localStorage.getItem('roadmap-last-tab');
  } catch (e) {
    return null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const last = getLastTab();
  if (last) {
    const input = document.getElementById(`radio-${last}`);
    if (input) {
      input.checked = true;
    }
  }

  document.querySelectorAll('input[name="tabs"]').forEach(input => {
    input.addEventListener('change', () => {
      if (input.checked) saveLastTab(input.value);
      updateRoadmap();
    });
  });

  updateRoadmap();
});

// Roadmap Progress
function getRoadmapProgress() {
    let progress = localStorage.getItem('roadmap-progress');
    if (!progress) {
        progress = '{"completedTasks":[]}';
        localStorage.setItem('roadmap-progress', progress);
    }
    return JSON.parse(progress);
}

function saveRoadmapProgress(progress) {
    localStorage.setItem('roadmap-progress', JSON.stringify(progress));
}

function updateRoadmapProgress() {
    const progress = getRoadmapProgress();
    const completedTasks = progress.completedTasks || [];
    const totalTasks = document.querySelectorAll('.hextra-feature-card').length;

    const percentComplete = totalTasks > 0
        ? Math.round((completedTasks.length / totalTasks) * 100)
        : 0;

    if (!totalTasks) {
        return;
    }

    document.getElementById('tasks-completed').textContent = completedTasks.length;
    document.getElementById('total-tasks').textContent = totalTasks;
    document.getElementById('percent-display').textContent = `${percentComplete}%`;

    const circle = document.getElementById('progress-circle');
    const circumference = 276.46;
    const offset = circumference - (percentComplete / 100) * circumference;
    circle.style.strokeDashoffset = offset;

    const startTasks = Array.from(document.querySelectorAll('.start-hf-card-color.hextra-feature-card')).map(card => card.id);
    const basicTasks = Array.from(document.querySelectorAll('.basic-hf-card-color.hextra-feature-card')).map(card => card.id);
    const mediumTasks = Array.from(document.querySelectorAll('.medium-hf-card-color.hextra-feature-card')).map(card => card.id);
    const advancedTasks = Array.from(document.querySelectorAll('.advanced-hf-card-color.hextra-feature-card')).map(card => card.id);

    let privacyLevel = window.translations.privacyStarter;
    const allComplete = (tasks) => tasks.every(taskId => completedTasks.includes(taskId));

    if (allComplete(startTasks) && allComplete(basicTasks) && allComplete(mediumTasks) && allComplete(advancedTasks)) {
        privacyLevel = window.translations.privacyExpert;
    } else if (allComplete(startTasks) && allComplete(basicTasks) && allComplete(mediumTasks)) {
        privacyLevel = window.translations.privacyDefender;
    } else if (allComplete(startTasks) && allComplete(basicTasks)) {
        privacyLevel = window.translations.privacyEnthusiast;
    } else if (allComplete(startTasks)) {
        privacyLevel = window.translations.privacyAware;
    }

    document.getElementById('privacy-level').textContent = privacyLevel;

    document.querySelectorAll('.hextra-feature-card').forEach(card => {
        const taskId = card.id;
        const timeBadgeInfo = card.querySelector('.time-badge-info');
        const startTaskButton = card.querySelector('.start-task-button');

        if (completedTasks.includes(taskId)) {
            const badge = document.createElement('span');
            badge.textContent = window.translations.taskCompleted;
            badge.classList.add('completed-badge');
            timeBadgeInfo.appendChild(badge);

            card.classList.add('completed');
            startTaskButton.textContent = window.translations.reviewTask;
        }
    });
}

function markAsDone(id) {
    let progress = getRoadmapProgress();
    
    if (!progress.completedTasks.includes(id)) {
        progress.completedTasks.push(id);
        saveRoadmapProgress(progress);
    }

    document.querySelectorAll(`button#${id}`).forEach(button => {
        const p = button.querySelector('p');
        if (p) p.textContent = window.translations.taskCompleted;
        button.classList.add('completed');
        button.disabled = true;
    });

    updateRoadmapProgress();
}

document.addEventListener('DOMContentLoaded', () => {
    const progress = getRoadmapProgress();

    document.querySelectorAll('button[id]').forEach(button => {
        const id = button.id;
        if (progress.completedTasks.includes(id)) {
            const p = button.querySelector('p');
            if (p) p.textContent = window.translations.taskCompleted;
            button.classList.add('completed');
            button.disabled = true;
        }
    });

    updateRoadmapProgress();
});

function resetRoadmapProgress() {
    localStorage.removeItem('roadmap-progress');

    const circle = document.getElementById('progress-circle');
    if (circle) circle.style.strokeDashoffset = '276.46';

    document.getElementById('percent-display').textContent = '0%';
    document.getElementById('tasks-completed').textContent = '0';

    document.querySelectorAll('.hextra-feature-card .completed-badge').forEach(badge => badge.remove());
    document.querySelectorAll('.hextra-feature-card.completed').forEach(card => card.classList.remove('completed'));
    document.querySelectorAll('.hextra-feature-card .start-task-button').forEach(button => {
        button.textContent = window.translations.startTask;
    });

    updateRoadmapProgress();
}

document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.getElementById('reset-roadmap-progress');
    if (resetButton) {
        resetButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm(window.translations.resetRoadmapProgressPrompt)) {
                resetRoadmapProgress();
            }
        });
    }
});
;
function fireConfetti() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  let particles = [];
  const particleCount = 300;

  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);

  class Confetti {
    constructor() {
      this.x = Math.random() * width;
      this.y = height;
      this.angle = Math.random() * Math.PI * 2;
      this.tilt = Math.random() * Math.PI * 2;
      this.tiltAngle = (Math.random() - 0.5) * 0.2;
      this.vx = (Math.random() - 0.5) * 8;
      this.vy = Math.random() * -25 - 15;
      this.friction = 0.92;
      this.gravity = 0.7;
      this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
      this.width = Math.random() * 8 + 4;
      this.height = Math.random() * 3 + 1;
      this.life = 0;
      this.maxLife = Math.random() * 150 + 100;
    }

    update() {
      this.vy += this.gravity;
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.x += this.vx;
      this.y += this.vy;
      this.tilt += this.tiltAngle;
      this.life++;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.tilt);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Confetti());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((particle, index) => {
      particle.update();
      particle.draw();

      if (particle.life >= particle.maxLife ||
        particle.x < -50 ||
        particle.x > width + 50 ||
        particle.y > height + 100) {
        particles.splice(index, 1);
      }
    });

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }
  animate();
}

// Checklists Progress
function getChecklistsProgress() {
    let progress = localStorage.getItem('checklists-progress');
    if (!progress) {
        progress = '{"checkedBoxes":[]}';
        localStorage.setItem('checklists-progress', progress);
    }
    return JSON.parse(progress);
}

function saveChecklistsProgress(progress) {
    localStorage.setItem('checklists-progress', JSON.stringify(progress));
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.checklist-checkbox').forEach(checkbox => {
    const id = checkbox.id;
    const progress = getChecklistsProgress();
    if (progress.checkedBoxes.includes(id)) {
      checkbox.checked = true
    }

    checkbox.addEventListener('change', function() {
      let progress = getChecklistsProgress();
      if (checkbox.checked) {
        if (!progress.checkedBoxes.includes(id)) {
          progress.checkedBoxes.push(id);
        }
      } else {
        progress.checkedBoxes = progress.checkedBoxes.filter(taskId => taskId !== id);
      }
      saveChecklistsProgress(progress);

      const checkboxesAll = document.querySelectorAll('.checklist-checkbox');
      const allChecked = Array.from(checkboxesAll).every(cb => cb.checked);
      if (allChecked) {
        fireConfetti();
      }
    });
  });
});
;
let allNewsItems = [];
let filteredNewsItems = [];
let currentPage = 1;
const itemsPerPage = 12;

async function fetchNews() {
  const newsLoadingMessage = document.getElementById('news-loading-message')
  if (newsLoadingMessage) {
    newsLoadingMessage.style.display = 'block';
  }

  try {
    const response = await fetch('https://raw.githubusercontent.com/beginnerprivacy/news/refs/heads/main/news.json');
    const data = await response.json();
    allNewsItems = data.articles || [];
    filteredNewsItems = [...allNewsItems].sort((a, b) => new Date(b.date) - new Date(a.date));
    renderNews();
  } finally {
    if (newsLoadingMessage) {
      document.getElementById('news-loading-message').style.display = 'none';
    }
  }
}

function filterNews() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  const category = document.getElementById('category').value;
  const region = document.getElementById('region').value;
  const sortOrder = document.getElementById('sort').value;

  filteredNewsItems = allNewsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm);
    const matchesCategory = category ? item.category === category : true;
    const matchesRegion = region ? item.region === region : true;
    return matchesSearch && matchesCategory && matchesRegion;
  });

  filteredNewsItems.sort((a, b) => {
    return sortOrder === 'recent' ?
      new Date(b.date) - new Date(a.date) :
      new Date(a.date) - new Date(b.date);
  });

  currentPage = 1;
  renderNews();
}

function changePage(direction) {
  const newPage = currentPage + direction;
  const totalPages = Math.ceil(filteredNewsItems.length / itemsPerPage);

  if (newPage > 0 && newPage <= totalPages) {
    currentPage = newPage;
    renderNews();
  }
}

function renderNews() {
  const container = document.getElementById('news-container');
  if (container) {
    container.innerHTML = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredNewsItems.slice(startIndex, endIndex);

    paginatedItems.forEach(item => {
      const card = document.createElement('a');
      card.className = 'news-card';
      card.href = item.url;
      card.rel = 'noreferrer nofollow';
      card.target = '_blank';

      if (item.title.length > 115) {
        truncatedTitle = item.title.substring(0, 115) + "...";
      } else {
        truncatedTitle = item.title
      }

      card.innerHTML = `
                <div class="news-card-content">
                    <h3>${truncatedTitle}</h3>
                </div>
                <div class="news-card-footer">
                    <small>${item.source}</small>
                    <small>${item.date}</small>
                </div>
            `;

      container.appendChild(card);
    });

    const totalPages = Math.ceil(filteredNewsItems.length / itemsPerPage);
    document.getElementById('prev').disabled = currentPage <= 1;
    document.getElementById('next').disabled = currentPage >= totalPages;
    document.getElementById('news-page-info').textContent = `${currentPage}/${totalPages}`;
  }
}

window.addEventListener('DOMContentLoaded', fetchNews);

// News warning callout
const newsWarningClose = document.querySelector('.news-warning-close')
if (newsWarningClose) {
  newsWarningClose.addEventListener('click', () => {
    document.querySelector('.news-warning-container').style.display = 'none';
  })
}