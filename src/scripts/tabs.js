// Warning:: This relies on there being one set of tabs per page!
const tabs = document.querySelector('[data-tabs]')
const tabList = tabs.querySelector('ul')
const labels = tabs.querySelectorAll('span')
const anchors = [...tabs.querySelectorAll('[href]')]
const panels = document.querySelectorAll('[data-tab-panel]')
// Remove the navigation role
tabs.removeAttribute('role')
// Add the tab list role
tabList.setAttribute('role', 'tablist');
// labels.forEach(label => label.classList.remove('border-b-brand-stroke', 'text-text-1'))

const switchTab = (oldTab, newTab) => {
  newTab.focus();
  // Make the active tab focusable by the user (Tab key)
  newTab.removeAttribute('tabindex');
  newTab.dataset.tabActive = true
  newTab.querySelector('span').classList.add('border-b-brand-stroke', 'text-text-1')
  // Set the selected state
  newTab.setAttribute('aria-selected', 'true');
  oldTab.removeAttribute('aria-selected');
  oldTab.setAttribute('tabindex', '-1');
  oldTab.querySelector('span').classList.remove('border-b-brand-stroke', 'text-text-1')
  oldTab.dataset.tabActive = false
  // Get the indices of the new and old tabs to find the correct
  // tab panels to show and hide
  let index = anchors.indexOf(newTab);
  let oldIndex = anchors.indexOf(oldTab);
  panels[oldIndex].className = 'hidden'
  panels[index].className = 'block';
}


// Initialize the tab links...
anchors.forEach((anchor, i) => {
  // Set the initial attributes if the route is active...
  const isActive = anchor.dataset.tabActive === "true"
  anchor.setAttribute('role', 'tab');
  anchor.setAttribute('id', 'tab' + (i + 1));
  if (!isActive) anchor.setAttribute('tabindex', '-1');
  if (isActive) anchor.setAttribute('aria-selected', true)
  anchor.parentNode.setAttribute('role', 'presentation');  
  anchor.href = `#${anchor.getAttribute('href').slice(1)}`
  // Prevent the default behavior of navigating to a new page
  anchor.addEventListener('click', e => {
    e.preventDefault()
    let currentTab = tabList.querySelector('[aria-selected]');
    if (e.currentTarget !== currentTab) {
      switchTab(currentTab, e.currentTarget);
    }
  })
  anchor.addEventListener('keydown', e => {
    // Get the index of the current tab in the tabs node list
    let index = anchors.indexOf(e.currentTarget)
    // Work out which key the user is pressing and
    // Calculate the new tab's index where appropriate
    let dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;
    if (dir !== null) {
      e.preventDefault();
      // If the down key is pressed, move focus to the open panel,
      // otherwise switch to the adjacent tab
      dir === 'down' ? panels[i].focus() : anchors[dir] ? switchTab(e.currentTarget, anchors[dir]) : void 0;
    }
  })
})
panels.forEach((panel, i) => {
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('tabindex', '-1');
  let id = panel.getAttribute('id');
  panel.setAttribute('aria-labelledby', anchors[i].id);
})