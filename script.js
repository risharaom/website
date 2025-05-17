// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Set current year in footer
    const yearElements = document.querySelectorAll('#currentYear');
    yearElements.forEach(element => {
      element.textContent = new Date().getFullYear();
    });
    
    // Mobile menu toggle
    const menuButton = document.getElementById('menuButton');
    const mobileNav = document.getElementById('mobileNav');
    const menuIcon = document.getElementById('menuIcon');
    
    if (menuButton && mobileNav) {
      menuButton.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        menuIcon.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';
      });
    }
    
    // Project details expand/collapse
    const expandButtons = document.querySelectorAll('.expand-button');
    
    expandButtons.forEach(button => {
      button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        const details = document.getElementById(projectId);
        
        if (details) {
          details.classList.toggle('active');
          button.classList.toggle('active');
          
          // Update button text
          const buttonText = button.querySelector('span');
          if (buttonText) {
            buttonText.textContent = details.classList.contains('active') ? 'Less Details' : 'More Details';
          }
        }
      });
    });
    
    // Calendar iframe loading handler
    const calendarFrame = document.getElementById('calendarFrame');
    const calendarLoading = document.getElementById('calendarLoading');
    
    if (calendarFrame && calendarLoading) {
      calendarFrame.addEventListener('load', () => {
        calendarLoading.style.display = 'none';
      });
      
      // Fallback if event doesn't fire
      setTimeout(() => {
        calendarLoading.style.display = 'none';
      }, 3000);
    }
  });