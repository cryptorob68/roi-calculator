document.getElementById('roiForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get input values
    const numTechs = parseInt(document.getElementById('numTechs').value);
    const numBays = parseInt(document.getElementById('numBays').value);
    const hoursOpen = parseInt(document.getElementById('hoursOpen').value);
    const carsPerDay = parseInt(document.getElementById('carsPerDay').value);
    const researchTime = parseInt(document.getElementById('researchTime').value);
    const comebacks = parseFloat(document.getElementById('comebacks').value);
    
    // Constants (can be adjusted based on actual data)
    const monthlyProductCost = 199; // Example monthly cost of AllData
    const laborRate = 100; // dollars per hour
    const averageComebackCost = 250; // dollars per comeback
    const expectedResearchReduction = 0.6; // 60% reduction in research time
    const expectedComebackReduction = 0.7; // 70% reduction in comebacks
    
    // Calculate savings
    const researchSavings = calculateResearchSavings(carsPerDay, researchTime, laborRate, expectedResearchReduction);
    const comebackSavings = calculateComebackSavings(comebacks, averageComebackCost, expectedComebackReduction);
    const monthlySavings = researchSavings + comebackSavings;
    
    const annualRoi = calculateAnnualRoi(monthlySavings, monthlyProductCost);
    const paybackPeriod = calculatePaybackPeriod(monthlyProductCost, monthlySavings);
    
    // Display results
    document.getElementById('monthlySavings').textContent = `$${monthlySavings.toFixed(2)}`;
    document.getElementById('annualRoi').textContent = `${annualRoi.toFixed(1)}%`;
    document.getElementById('paybackPeriod').textContent = `${paybackPeriod.toFixed(1)} months`;
    document.getElementById('researchSavings').textContent = `$${researchSavings.toFixed(2)}`;
    document.getElementById('comebackSavings').textContent = `$${comebackSavings.toFixed(2)}`;
    
    document.getElementById('results').style.display = 'block';
});

function calculateResearchSavings(carsPerDay, researchMinsPerJob, laborRate, reductionFactor) {
    const hoursPerMonth = (researchMinsPerJob / 60) * carsPerDay * 22; // 22 working days
    const potentialSavings = hoursPerMonth * laborRate * reductionFactor;
    return potentialSavings;
}

function calculateComebackSavings(weeklyCombacks, costPerComeback, reductionFactor) {
    const monthlyCombacks = weeklyCombacks * 4.33; // Average weeks per month
    return monthlyCombacks * costPerComeback * reductionFactor;
}

function calculateAnnualRoi(monthlySavings, monthlyProductCost) {
    const annualSavings = monthlySavings * 12;
    const annualCost = monthlyProductCost * 12;
    return ((annualSavings - annualCost) / annualCost) * 100;
}

function calculatePaybackPeriod(monthlyProductCost, monthlySavings) {
    return monthlyProductCost / monthlySavings;
} 