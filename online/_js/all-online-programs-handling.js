

import { programsData } from './all-online-programs-list.js';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the UI
    initializeUI();
    
    // Render all programs initially
    renderPrograms(programsData);
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize filter counters and selected filters display
    updateFilterCounters();
    updateSelectedFiltersDisplay();
});

// Initialize UI elements
function initializeUI() {
    // Hide all dropdown containers initially
    document.querySelectorAll('.dropdown-container').forEach(container => {
        container.style.display = 'none';
    });
    
    // Hide selected filters container if empty
    const selectedFiltersContainer = document.getElementById('selected-filters');
    if (selectedFiltersContainer.querySelectorAll('.selected-tag').length === 0) {
        selectedFiltersContainer.style.display = 'none';
    }
}

// Set up all event listeners
function setupEventListeners() {
    // Filter button toggle listeners
    setupFilterButtonListeners();
    
    // Search input listener
    document.getElementById('title-search').addEventListener('input', filterPrograms);
    
    // Clear search button listener
    document.querySelector('.clear-search').addEventListener('click', function() {
        document.getElementById('title-search').value = '';
        filterPrograms();
    });
    
    // Checkbox listeners for all filter types
    setupCheckboxListeners('interest-checkbox');
    setupCheckboxListeners('degree-checkbox');
    setupCheckboxListeners('delivery-checkbox');
    setupCheckboxListeners('college-checkbox');
    
    // Clear filter buttons
    setupClearFilterButtons();
}

// Set up filter button toggle listeners
function setupFilterButtonListeners() {
    const filterButtons = {
        'interest-btn': 'interest-dropdown',
        'degree-btn': 'degree-dropdown',
        'delivery-btn': 'delivery-dropdown',
        'college-btn': 'college-dropdown'
    };
    
    for (const [buttonId, dropdownId] of Object.entries(filterButtons)) {
        document.getElementById(buttonId).addEventListener('click', function() {
            const dropdown = document.getElementById(dropdownId);
            const icon = this.querySelector('.icon');
            
            // Toggle the dropdown
            if (dropdown.style.display === 'none' || dropdown.style.display === '') {
                // Hide all other dropdowns first
                document.querySelectorAll('.dropdown-container').forEach(container => {
                    container.style.display = 'none';
                });
                document.querySelectorAll('.filter-btn .icon').forEach(icon => {
                    icon.textContent = '+';
                });
                
                // Show this dropdown
                dropdown.style.display = 'block';
                icon.textContent = '−';
            } else {
                dropdown.style.display = 'none';
                icon.textContent = '+';
            }
        });
    }
}

// Set up checkbox listeners for a specific filter type
function setupCheckboxListeners(checkboxClass) {
    document.querySelectorAll(`.${checkboxClass}`).forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            filterPrograms();
            updateFilterCounters();
            updateSelectedFiltersDisplay();
        });
    });
}

// Set up clear filter buttons
function setupClearFilterButtons() {
    document.querySelectorAll('.clear-filter').forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.getAttribute('data-filter');
            clearFilter(filterType);
        });
    });
}

// Clear a specific filter type
function clearFilter(filterType) {
    const checkboxClass = `${filterType}-checkbox`;
    document.querySelectorAll(`.${checkboxClass}`).forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // If clearing title search
    if (filterType === 'title') {
        document.getElementById('title-search').value = '';
    }
    
    // Update UI and filter programs
    filterPrograms();
    updateFilterCounters();
    updateSelectedFiltersDisplay();
}

// Update filter counters for all filter types
function updateFilterCounters() {
    updateFilterCounter('interest');
    updateFilterCounter('degree');
    updateFilterCounter('delivery');
    updateFilterCounter('college');
}

// Update counter for a specific filter type
function updateFilterCounter(filterType) {
    const checkboxClass = `${filterType}-checkbox`;
    const countElement = document.getElementById(`${filterType}-count`);
    const selectedCount = document.querySelectorAll(`.${checkboxClass}:checked`).length;
    
    if (selectedCount > 0) {
        countElement.textContent = selectedCount;
        countElement.style.display = 'inline-flex';
    } else {
        countElement.textContent = '';
        countElement.style.display = 'none';
    }
}

// Update the display of selected filter names
function updateSelectedFiltersDisplay() {
    // Get selected values for each filter type
    const selectedInterests = getSelectedValues('interest-checkbox');
    const selectedDegrees = getSelectedValues('degree-checkbox');
    const selectedDeliveryModes = getSelectedValues('delivery-checkbox');
    
    // Update the display for each filter type
    updateSelectedItemsDisplay('selected-interests', selectedInterests, 'interest');
    updateSelectedItemsDisplay('selected-degrees', selectedDegrees, 'degree');
    updateSelectedItemsDisplay('selected-delivery-modes', selectedDeliveryModes, 'delivery');
    
    // Show or hide the selected filters container based on whether any filters are selected
    const selectedFiltersContainer = document.getElementById('selected-filters');
    const hasSelectedFilters = selectedInterests.length > 0 || selectedDegrees.length > 0 || selectedDeliveryModes.length > 0;
    
    selectedFiltersContainer.style.display = hasSelectedFilters ? 'block' : 'none';
}

// Update the display for a specific filter type
function updateSelectedItemsDisplay(containerId, selectedValues, filterType) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    if (selectedValues.length > 0) {
        selectedValues.forEach(value => {
            const tag = document.createElement('span');
            tag.className = `selected-tag selected-tag-${filterType}`;
            tag.textContent = value;
            container.appendChild(tag);
        });
    }
}

// Filter programs based on all active filters
function filterPrograms() {
    // Get all filter values
    const searchTerm = document.getElementById('title-search').value.toLowerCase();
    const selectedInterests = getSelectedValues('interest-checkbox');
    const selectedDegrees = getSelectedValues('degree-checkbox');
    const selectedDeliveryModes = getSelectedValues('delivery-checkbox');
    const selectedColleges = getSelectedValues('college-checkbox');
    
    // Filter the programs
    const filteredPrograms = programsData.filter(program => {
        // Title search filter
        if (searchTerm  && !program.title.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        // Interest filter
		console.log(program.interests + "  " +  selectedInterests);
        if (selectedInterests.length > 0&& !hasIntersection(program.interests, selectedInterests)) {
            return false;
        }
        
        // Degree filter
        if (selectedDegrees.length > 0 && !hasIntersection(program.degrees, selectedDegrees)) {
            return false;
        }
        
        // Delivery mode filter
        if (selectedDeliveryModes.length > 0 && !hasIntersection(program.deliveryModes, selectedDeliveryModes)) {
            return false;
        }
        
        // College filter - partial match for college names
        if (selectedColleges.length > 0) {
            const collegeMatches = selectedColleges.some(selectedCollege => 
                program.college.includes(selectedCollege)
            );
            if (!collegeMatches) {
                return false;
            }
        }
        
        return true;
    });
    
    // Render the filtered programs
    renderPrograms(filteredPrograms);
}

// Get selected values from checkboxes of a specific class
function getSelectedValues(checkboxClass) {
    const selectedValues = [];
    document.querySelectorAll(`.${checkboxClass}:checked`).forEach(checkbox => {
        selectedValues.push(checkbox.value);
    });
    return selectedValues;
}

// Check if two arrays have at least one common element
function hasIntersection(arr1, arr2) {
    return arr1.some(item => arr2.includes(item));
}

// Render programs to the DOM
function renderPrograms(programs) {
    const programsList = document.getElementById('programs-list');
    programsList.innerHTML = '';
    
    if (programs.length === 0) {
        programsList.innerHTML = '<div class="no-results">No programs match your search criteria. Please adjust your filters.</div>';
        return;
    }
    
    programs.forEach(program => {
        const programItem = document.createElement('div');
        programItem.className = 'program-item';
        
        // Create delivery mode badges HTML
        const deliveryBadges = program.deliveryModes.map(mode => {
            const className = `badge bg-success badge-delivery-${mode.toLowerCase().replace(/\s+/g, '-')}`;
            return `<span class="${className}">${mode}</span>`;
        }).join('');
        
        // Create interest badges HTML
        const interestBadges = program.interests.map(interest => {
            return `<span class="badge bg-primary badge-interest">${interest}</span>`;
        }).join('');
        
        // Create degree badges HTML
        const degreeBadges = program.degrees.map(degree => {
            return `<span class="badge bg-warning badge-degree">${degree}</span>`;
        }).join('');
      
        programItem.innerHTML = `
            <h3 class="program-title"><a href="${program.url}" target='_blank'>${program.title}</a></h3>
            <div class="program-college">${program.college}</div>
            <div class="program-description">${program.description}</div>
            <div class="program-badges">
                ${interestBadges}
				${degreeBadges}				
				${deliveryBadges}
            </div>
        `;
        
        programsList.appendChild(programItem);
    });
}