export function getLevelDetails(totalExp, baseExp = 10, growthFactor = 1.5) {
    // Helper function to calculate total XP required for a specific level
    
    const getExpForLevel = (level) => Math.floor(baseExp * Math.pow(level, growthFactor));
  
    // Determine current level
    let level = 1;
    while (totalExp >= getExpForLevel(level)) {
      totalExp -= getExpForLevel(level); 
    // Subtract XP for each completed level
      level++;
    }
  
    // Total XP required for current and next levels

    //const xpForCurrentLevel = getExpForLevel(level );
    
    const xpGap = getExpForLevel(level);
  
    // Current progress within the level
    const currentLevelProgress = totalExp; // Remaining XP after subtracting completed levels
  
    // Progress bar percentage
    const progressPercentage = Math.floor((currentLevelProgress / xpGap) * 100);
  
    return {
      level: level , // Current level
      currentLevelProgress, // XP earned in the current level
      xpGap, // Total XP needed for the next level
      progressPercentage, // Percentage for progress bar
    };
  }
  
  
