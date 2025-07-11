 document.querySelectorAll('.calculator-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.calculator-tab').forEach(t => {
                    t.classList.remove('active');
                });
                this.classList.add('active');
                
                document.querySelectorAll('.calculator-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                const targetId = this.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');
            });
        });
        
        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', function() {
            if (document.body.getAttribute('data-theme') === 'dark') {
                document.body.removeAttribute('data-theme');
                this.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                document.body.setAttribute('data-theme', 'dark');
                this.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
        
        // Basic Calculator Functions
        let basicDisplayValue = '0';
        
        function updateBasicDisplay() {
            document.getElementById('basicDisplay').textContent = basicDisplayValue;
        }
        
        function clearBasicCalculator() {
            basicDisplayValue = '0';
            updateBasicDisplay();
        }
        
        function backspaceBasicCalculator() {
            if (basicDisplayValue.length > 1) {
                basicDisplayValue = basicDisplayValue.slice(0, -1);
            } else {
                basicDisplayValue = '0';
            }
            updateBasicDisplay();
        }
        
        function appendToBasicCalculator(value) {
            if (basicDisplayValue === '0' && value !== '.') {
                basicDisplayValue = value;
            } else {
                basicDisplayValue += value;
            }
            updateBasicDisplay();
        }
        
        function calculateBasicResult() {
            try {
                let expression = basicDisplayValue.replace(/%/g, '/100');
                basicDisplayValue = eval(expression).toString();
                updateBasicDisplay();
            } catch (error) {
                basicDisplayValue = 'Error';
                updateBasicDisplay();
                setTimeout(clearBasicCalculator, 1000);
            }
        }
        
        // Scientific Calculator Functions
        let scientificDisplayValue = '0';
        
        function updateScientificDisplay() {
            document.getElementById('scientificDisplay').textContent = scientificDisplayValue;
        }
        
        function clearScientificCalculator() {
            scientificDisplayValue = '0';
            updateScientificDisplay();
        }
        
        function backspaceScientificCalculator() {
            if (scientificDisplayValue.length > 1) {
                scientificDisplayValue = scientificDisplayValue.slice(0, -1);
            } else {
                scientificDisplayValue = '0';
            }
            updateScientificDisplay();
        }
        
        function appendToScientificCalculator(value) {
            if (scientificDisplayValue === '0' && value !== '.') {
                scientificDisplayValue = value;
            } else {
                scientificDisplayValue += value;
            }
            updateScientificDisplay();
        }
        
        function calculateScientificResult() {
            try {
                let expression = scientificDisplayValue.replace(/%/g, '/100');
                expression = expression.replace(/(\d+)(\s*)\^(\s*)(\d+)/g, '$1 ** $4');
                scientificDisplayValue = eval(expression).toString();
                updateScientificDisplay();
            } catch (error) {
                scientificDisplayValue = 'Error';
                updateScientificDisplay();
                setTimeout(clearScientificCalculator, 1000);
            }
        }
        
        // Conversion Calculator
        document.getElementById('conversionType').addEventListener('change', function() {
            document.querySelectorAll('.converter-container').forEach(container => {
                container.style.display = 'none';
            });
            
            const selectedType = this.value;
            if (selectedType === 'length') {
                document.getElementById('lengthConverter').style.display = 'block';
            } else if (selectedType === 'temperature') {
                document.getElementById('temperatureConverter').style.display = 'block';
            } else if (selectedType === 'weight') {
                document.getElementById('weightConverter').style.display = 'block';
            } else if (selectedType === 'currency') {
                document.getElementById('currencyConverter').style.display = 'block';
            } else if (selectedType === 'area') {
                document.getElementById('areaConverter').style.display = 'block';
            } else if (selectedType === 'volume') {
                document.getElementById('volumeConverter').style.display = 'block';
            } else if (selectedType === 'speed') {
                document.getElementById('speedConverter').style.display = 'block';
            }
        });
        
        function convertUnits() {
            const conversionType = document.getElementById('conversionType').value;
            
            if (conversionType === 'length') {
                const fromValue = parseFloat(document.getElementById('lengthValue').value);
                const fromUnit = document.getElementById('lengthFrom').value;
                const toUnit = document.getElementById('lengthTo').value;
                
                const toMeters = {
                    m: 1,
                    km: 1000,
                    cm: 0.01,
                    mm: 0.001,
                    in: 0.0254,
                    ft: 0.3048,
                    yd: 0.9144,
                    mi: 1609.344
                };
                
                const valueInMeters = fromValue * toMeters[fromUnit];
                const result = valueInMeters / toMeters[toUnit];
                
                document.getElementById('lengthResult').value = result.toFixed(6);
            } else if (conversionType === 'temperature') {
                const celsius = parseFloat(document.getElementById('tempValue').value);
                const fromUnit = document.getElementById('tempFrom').value;
                const toUnit = document.getElementById('tempTo').value;
                
                let result;
                if (fromUnit === 'c') {
                    if (toUnit === 'f') {
                        result = (celsius * 9/5) + 32;
                    } else if (toUnit === 'k') {
                        result = celsius + 273.15;
                    }
                } else if (fromUnit === 'f') {
                    if (toUnit === 'c') {
                        result = (celsius - 32) * 5/9;
                    } else if (toUnit === 'k') {
                        result = (celsius - 32) * 5/9 + 273.15;
                    }
                } else if (fromUnit === 'k') {
                    if (toUnit === 'c') {
                        result = celsius - 273.15;
                    } else if (toUnit === 'f') {
                        result = (celsius - 273.15) * 9/5 + 32;
                    }
                }
                
                document.getElementById('tempResult').value = result.toFixed(2);
            } else if (conversionType === 'weight') {
                const fromValue = parseFloat(document.getElementById('weightValue').value);
                const fromUnit = document.getElementById('weightFrom').value;
                const toUnit = document.getElementById('weightTo').value;
                
                const toKg = {
                    kg: 1,
                    g: 0.001,
                    lb: 0.45359237,
                    oz: 0.028349523125,
                    t: 1000
                };
                
                const valueInKg = fromValue * toKg[fromUnit];
                const result = valueInKg / toKg[toUnit];
                
                document.getElementById('weightResult').value = result.toFixed(6);
            } else if (conversionType === 'currency') {
                const fromValue = parseFloat(document.getElementById('currencyValue').value);
                const fromUnit = document.getElementById('currencyFrom').value;
                const toUnit = document.getElementById('currencyTo').value;
                const rates = {
                    usd: { usd: 1, eur: 0.92, gbp: 0.79, jpy: 149.5, cad: 1.35, php: 58.30 },
                    eur: { usd: 1.09, eur: 1, gbp: 0.86, jpy: 162.5, cad: 1.47, php: 63.60 },
                    gbp: { usd: 1.26, eur: 1.16, gbp: 1, jpy: 188.8, cad: 1.71, php: 74.20 },
                    jpy: { usd: 0.0067, eur: 0.0062, gbp: 0.0053, jpy: 1, cad: 0.0090, php: 0.39 },
                    cad: { usd: 0.74, eur: 0.68, gbp: 0.58, jpy: 110.7, cad: 1, php: 43.20 },
                    php: { usd: 0.017, eur: 0.016, gbp: 0.013, jpy: 2.56, cad: 0.023, php: 1 }
                };
                const result = fromValue * rates[fromUnit][toUnit];
                document.getElementById('currencyResult').value = result.toFixed(2);
            } else if (conversionType === 'area') {
                const fromValue = parseFloat(document.getElementById('areaValue').value);
                const fromUnit = document.getElementById('areaFrom').value;
                const toUnit = document.getElementById('areaTo').value;
                
                const toM2 = {
                    m2: 1,
                    km2: 1000000,
                    cm2: 0.0001,
                    ha: 10000,
                    ac: 4046.86,
                    ft2: 0.09290304,
                    mi2: 2589988.11
                };
                
                const valueInM2 = fromValue * toM2[fromUnit];
                const result = valueInM2 / toM2[toUnit];
                
                document.getElementById('areaResult').value = result.toFixed(6);
            } else if (conversionType === 'volume') {
                const fromValue = parseFloat(document.getElementById('volumeValue').value);
                const fromUnit = document.getElementById('volumeFrom').value;
                const toUnit = document.getElementById('volumeTo').value;
                
                const toL = {
                    l: 1,
                    ml: 0.001,
                    gal: 3.785411784,
                    qt: 0.946352946,
                    pt: 0.473176473,
                    cup: 0.24,
                    fl_oz: 0.0295735295625
                };
                
                const valueInL = fromValue * toL[fromUnit];
                const result = valueInL / toL[toUnit];
                
                document.getElementById('volumeResult').value = result.toFixed(6);
            } else if (conversionType === 'speed') {
                const fromValue = parseFloat(document.getElementById('speedValue').value);
                const fromUnit = document.getElementById('speedFrom').value;
                const toUnit = document.getElementById('speedTo').value;
                
                const toMS = {
                    m_s: 1,
                    km_h: 0.2777777778,
                    mph: 0.44704,
                    ft_s: 0.3048,
                    knot: 0.5144444444
                };
                
                const valueInMS = fromValue * toMS[fromUnit];
                const result = valueInMS / toMS[toUnit];
                
                document.getElementById('speedResult').value = result.toFixed(6);
            }
        }
        
        // Finance Calculator
        document.getElementById('financeType').addEventListener('change', function() {
            document.querySelectorAll('.finance-calculator').forEach(calculator => {
                calculator.style.display = 'none';
            });
            
            const selectedType = this.value;
            if (selectedType === 'tip') {
                document.getElementById('tipCalculator').style.display = 'block';
            } else if (selectedType === 'loan') {
                document.getElementById('loanCalculator').style.display = 'block';
            } else if (selectedType === 'mortgage') {
                document.getElementById('mortgageCalculator').style.display = 'block';
            } else if (selectedType === 'investment') {
                document.getElementById('investmentCalculator').style.display = 'block';
            }
        });
        
        function calculateTip() {
            const billAmount = parseFloat(document.getElementById('billAmount').value);
            const tipPercentage = parseFloat(document.getElementById('tipPercentage').value);
            
            const tipAmount = billAmount * (tipPercentage / 100);
            const totalAmount = billAmount + tipAmount;
            
            document.getElementById('tipResult').value = tipAmount.toFixed(2);
            document.getElementById('totalAmount').value = totalAmount.toFixed(2);
        }
        
        function calculateLoan() {
            const loanAmount = parseFloat(document.getElementById('loanAmount').value);
            const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
            const loanTerm = parseInt(document.getElementById('loanTerm').value);
            
            const monthlyRate = interestRate / 12;
            const numPayments = loanTerm * 12;
            
            const monthlyPayment = (monthlyRate * loanAmount) / (1 - Math.pow(1 + monthlyRate, -numPayments));
            
            const totalPayment = monthlyPayment * numPayments;
            const totalInterest = totalPayment - loanAmount;
            
            document.getElementById('monthlyPayment').value = monthlyPayment.toFixed(2);
            document.getElementById('totalPayment').value = totalPayment.toFixed(2);
            document.getElementById('totalInterest').value = totalInterest.toFixed(2);
        }
        
        function calculateMortgage() {
            const homePrice = parseFloat(document.getElementById('homePrice').value);
            const downPayment = parseFloat(document.getElementById('downPayment').value) / 100;
            const mortgageRate = parseFloat(document.getElementById('mortgageRate').value) / 100;
            const mortgageTerm = parseInt(document.getElementById('mortgageTerm').value);
            
            const loanAmount = homePrice * (1 - downPayment);
            
            const monthlyRate = mortgageRate / 12;
            const numPayments = mortgageTerm * 12;
            
            const monthlyPayment = (monthlyRate * loanAmount) / (1 - Math.pow(1 + monthlyRate, -numPayments));
            
            const totalPayment = monthlyPayment * numPayments;
            const totalInterest = totalPayment - loanAmount;
            
            document.getElementById('mortgagePayment').value = monthlyPayment.toFixed(2);
            document.getElementById('mortgageTotal').value = totalPayment.toFixed(2);
            document.getElementById('mortgageInterest').value = totalInterest.toFixed(2);
        }
        
        function calculateInvestment() {
            const initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
            const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value);
            const annualReturn = parseFloat(document.getElementById('annualReturn').value) / 100;
            const investmentYears = parseInt(document.getElementById('investmentYears').value);
            
            const monthlyRate = annualReturn / 12;
            const numMonths = investmentYears * 12;
            
            const futureValue = initialInvestment * Math.pow(1 + monthlyRate, numMonths) + 
                                monthlyContribution * ((Math.pow(1 + monthlyRate, numMonths) - 1) / monthlyRate);
            
            const totalContributions = initialInvestment + (monthlyContribution * numMonths);
            const totalInterest = futureValue - totalContributions;
            
            document.getElementById('futureValue').value = futureValue.toFixed(2);
            document.getElementById('totalContributions').value = totalContributions.toFixed(2);
            document.getElementById('totalInterest').value = totalInterest.toFixed(2);
        }
        
        // Other Tools
        function calculateAge() {
            const birthDate = new Date(document.getElementById('birthDate').value);
            const currentDate = new Date(document.getElementById('currentDate').value);
            
            if (birthDate && currentDate) {
                let age = currentDate.getFullYear() - birthDate.getFullYear();
                
                const monthDiff = currentDate.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
                    age--;
                }
                
                document.getElementById('ageResult').value = age;
            }
        }
        
        function calculatePercentage() {
            const total = parseFloat(document.getElementById('percentageTotal').value);
            const percentage = parseFloat(document.getElementById('percentagePart').value);
            
            const result = (percentage / 100) * total;
            
            document.getElementById('percentageResult').value = result.toFixed(2);
        }
        
        function calculateQuickBMI() {
            const height = parseFloat(document.getElementById('quickHeight').value) / 100;
            const weight = parseFloat(document.getElementById('quickWeight').value);
            
            if (height && weight) {
                const bmi = weight / (height * height);
                let category = '';
                
                if (bmi < 18.5) {
                    category = 'Underweight';
                } else if (bmi >= 18.5 && bmi < 25) {
                    category = 'Normal weight';
                } else if (bmi >= 25 && bmi < 30) {
                    category = 'Overweight';
                } else {
                    category = 'Obese';
                }
                
                document.getElementById('quickBMI').value = `${bmi.toFixed(1)} (${category})`;
            }
        }
        
        function calculateGrade() {
            const score = parseFloat(document.getElementById('testScore').value);
            const maxScore = parseFloat(document.getElementById('maxScore').value);
            
            if (score >= 0 && score <= maxScore) {
                const percentage = (score / maxScore) * 100;
                let grade = '';
                
                if (percentage >= 90) {
                    grade = 'A';
                } else if (percentage >= 80) {
                    grade = 'B';
                } else if (percentage >= 70) {
                    grade = 'C';
                } else if (percentage >= 60) {
                    grade = 'D';
                } else {
                    grade = 'F';
                }
                
                document.getElementById('gradeResult').value = `${percentage.toFixed(1)}% (${grade})`;
            }
        }
        
        // Graph Generator
        let graphChart = null;
        
        function generateGraph() {
            const functionInput = document.getElementById('functionInput').value;
            const xMin = parseFloat(document.getElementById('xMin').value);
            const xMax = parseFloat(document.getElementById('xMax').value);
            
            if (isNaN(xMin) || isNaN(xMax)) {
                alert('Please enter valid X min and X max values');
                return;
            }
            
            try {
                const xValues = [];
                const yValues = [];
                
                for (let x = xMin; x <= xMax; x += 0.1) {
                    xValues.push(x);
                    
                    let y;
                    try {
                        const expression = functionInput.replace(/x/g, x);
                        y = eval(expression);
                    } catch (error) {
                        y = null;
                    }
                    
                    yValues.push(y);
                }
                
                const ctx = document.getElementById('graphCanvas').getContext('2d');
                
                if (graphChart) {
                    graphChart.destroy();
                }
                
                graphChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: xValues,
                        datasets: [{
                            label: functionInput,
                            data: yValues,
                            borderColor: 'rgba(30, 144, 255, 1)',
                            backgroundColor: 'rgba(30, 144, 255, 0.1)',
                            borderWidth: 2,
                            pointRadius: 0,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'X'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Y'
                                }
                            }
                        }
                    }
                });
            } catch (error) {
                alert('Error generating graph: ' + error.message);
            }
        }
        
        // Initialize date inputs with current date XD
        document.addEventListener('DOMContentLoaded', function() {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('currentDate').value = today;
        });