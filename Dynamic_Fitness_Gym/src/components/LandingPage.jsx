import { Header } from "./Header";
import Squares from './Squares';
import { useState } from 'react';

export const LandingPage = () => {
    const [activeTab, setActiveTab] = useState('strength');
    const [showMembershipPlans, setShowMembershipPlans] = useState(false);
    const [validityPeriod, setValidityPeriod] = useState('1month');
    const [showCalorieCalculator, setShowCalorieCalculator] = useState(false);
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [activityLevel, setActivityLevel] = useState('moderate');
    const [goal, setGoal] = useState('maintain');
    const [calories, setCalories] = useState(null);
    
    const workoutPlans = {
        strength: {
            title: "Power & Strength",
            description: "Build muscle and increase strength with our specialized strength training programs.",
            highlights: [
                "5x5 Compound Lift Program",
                "Powerlifting Fundamentals",
                "Strength & Hypertrophy Split"
            ]
        },
        cardio: {
            title: "Cardio & Endurance",
            description: "Improve your cardiovascular health and burn calories with our diverse cardio options.",
            highlights: [
                "HIIT Circuit Training",
                "Endurance Building Program",
                "Fat Burning Cardio Series"
            ]
        },
        flexibility: {
            title: "Mobility & Recovery",
            description: "Enhance flexibility, prevent injuries and improve overall movement quality.",
            highlights: [
                "Dynamic Stretching Routine",
                "Yoga for Athletes",
                "Recovery & Rehabilitation"
            ]
        }
    };

    const membershipPlan = {
        name: "Premium Fitness",
        prices: {
            '1month': "1,199 INR",
            '3month': "2,999 INR",
            '6month': "4,999 INR",
            'yearly': "7,999 INR"
        },
        features: [
            "Full access to gym floor and equipment",
            "Group fitness classes included",
            "Personal trainer consultation",
            "Locker room facilities",
            "Free parking"
        ]
    };

    const validityOptions = [
        { value: '1month', label: '1 Month' },
        { value: '3month', label: '3 Months' },
        { value: '6month', label: '6 Months' },
        { value: 'yearly', label: 'Yearly' }
    ];

    // For demonstration - update this with your actual gym location
    const gymLocation = {
        address: "New Rajjab Ganj, opposite Sundari lawn, Karim Ganj, Lucknow, Uttar Pradesh 226003",
        mapUrl: "https://maps.app.goo.gl/SwDiUx8B9SeHtLE86"
    };

    // Diet plan templates
    const dietPlans = {
        gain: {
            title: "Weight Gain Diet Plan",
            description: "High-calorie, nutrient-dense diet plan to support muscle growth and weight gain.",
            meals: [
                {
                    name: "Breakfast",
                    items: "Oatmeal with whole milk, banana, honey, and 2 tbsp peanut butter. 2 whole eggs."
                },
                {
                    name: "Mid-Morning Snack",
                    items: "Protein shake with whole milk, 1 cup mixed nuts."
                },
                {
                    name: "Lunch",
                    items: "200g chicken breast, 1 cup brown rice, 1 cup vegetables, 1 tbsp olive oil."
                },
                {
                    name: "Afternoon Snack",
                    items: "Greek yogurt with granola and berries."
                },
                {
                    name: "Dinner",
                    items: "200g salmon, sweet potato, leafy greens, avocado."
                },
                {
                    name: "Before Bed",
                    items: "Casein protein shake or cottage cheese with honey."
                }
            ]
        },
        lose: {
            title: "Weight Loss Diet Plan",
            description: "Calorie-controlled, protein-rich diet plan to support fat loss while preserving muscle.",
            meals: [
                {
                    name: "Breakfast",
                    items: "2 egg whites + 1 whole egg, 1/2 cup oatmeal, 1/2 cup berries."
                },
                {
                    name: "Mid-Morning Snack",
                    items: "Apple with 1 tbsp peanut butter or protein shake with water."
                },
                {
                    name: "Lunch",
                    items: "150g grilled chicken breast, large green salad, 1 tsp olive oil dressing."
                },
                {
                    name: "Afternoon Snack",
                    items: "100g Greek yogurt with cinnamon or carrot sticks with hummus."
                },
                {
                    name: "Dinner",
                    items: "150g white fish or tofu, 1/2 cup quinoa, steamed vegetables."
                },
                {
                    name: "Evening (optional)",
                    items: "Herbal tea, small protein shake if hungry."
                }
            ]
        },
        maintain: {
            title: "Weight Maintenance Diet Plan",
            description: "Balanced diet plan to maintain current weight and support overall health and fitness.",
            meals: [
                {
                    name: "Breakfast",
                    items: "2 whole eggs, 1 slice whole grain toast, 1/2 avocado, fruit."
                },
                {
                    name: "Mid-Morning Snack",
                    items: "Handful of nuts or fruit with yogurt."
                },
                {
                    name: "Lunch",
                    items: "150g lean protein (chicken/fish/tofu), 1/2 cup whole grains, vegetables."
                },
                {
                    name: "Afternoon Snack",
                    items: "Protein bar or shake, piece of fruit."
                },
                {
                    name: "Dinner",
                    items: "150g protein source, 1 cup vegetables, small portion of carbs."
                },
                {
                    name: "Evening (optional)",
                    items: "Small serving of Greek yogurt if desired."
                }
            ]
        }
    };

    // Activity level multipliers
    const activityMultipliers = {
        sedentary: 1.2, // Little or no exercise
        light: 1.375, // Light exercise 1-3 days per week
        moderate: 1.55, // Moderate exercise 3-5 days per week
        active: 1.725, // Hard exercise 6-7 days per week
        veryActive: 1.9 // Very hard exercise & physical job or training twice a day
    };

    // Goal multipliers
    const goalMultipliers = {
        lose: 0.8, // 20% calorie deficit
        maintain: 1.0, // Maintenance calories
        gain: 1.15 // 15% calorie surplus
    };

    // Calculate BMR using Mifflin-St Jeor Equation
    const calculateBMR = () => {
        if (!weight || !height || !age) return 0;
        
        const weightKg = parseFloat(weight);
        const heightCm = parseFloat(height);
        const ageYears = parseInt(age);
        
        if (gender === 'male') {
            return (10 * weightKg) + (6.25 * heightCm) - (5 * ageYears) + 5;
        } else {
            return (10 * weightKg) + (6.25 * heightCm) - (5 * ageYears) - 161;
        }
    };

    // Calculate total daily energy expenditure
    const calculateTDEE = () => {
        const bmr = calculateBMR();
        return Math.round(bmr * activityMultipliers[activityLevel] * goalMultipliers[goal]);
    };

    // Handle calculation
    const handleCalculate = () => {
        if (weight && height && age) {
            const calculatedCalories = calculateTDEE();
            setCalories(calculatedCalories);
        } else {
            alert("Please fill in all fields");
        }
    };

    return (
        <div className="relative w-full min-h-screen overflow-hidden text-white">
            {/* Layer 1: Gradient Background */}
            <div className="absolute inset-0 -z-20 bg-gradient-to-br from-black via-[#0d001a] to-black" />
            
            {/* Layer 2: Squares Animation */}
            <div className="absolute inset-0 -z-10 opacity-60">
                <Squares
                    direction="diagonal"
                    speed={0.3}
                    borderColor="rgba(255, 255, 255, 0.07)" 
                    hoverFillColor="rgba(255, 255, 255, 0.15)" 
                    squareSize={60}
                />
            </div>
            
            {/* Header */}
            <Header />
            
            {/* Hero Section */}
            <section className="px-6 pt-24 pb-20 md:px-10 lg:px-20 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* Left Column: Main Hero Content */}
                    <div className="max-w-xl mb-12 lg:mb-0">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                            Transform Your Body, <br />Elevate Your Mind
                        </h1>
                        <p className="text-lg text-gray-300 mb-8">
                            Our premium fitness facility offers cutting-edge equipment, expert coaching, and customized workout plans designed to help you achieve your fitness goals.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button 
                                className="px-8 py-3 rounded-md border border-white/30 hover:bg-white/10 font-semibold transition-all"
                                onClick={() => setShowMembershipPlans(!showMembershipPlans)}
                            >
                                View Membership
                            </button>
                            <button 
                                className="px-8 py-3 rounded-md bg-purple-600 hover:bg-purple-700 font-semibold transition-all"
                                onClick={() => setShowCalorieCalculator(!showCalorieCalculator)}
                            >
                                Calorie Calculator
                            </button>
                        </div>
                    </div>
                    
                    {/* Right Column: Workout Plans */}
                    <div className="backdrop-blur-sm bg-black/30 border border-white/10 rounded-xl p-6 max-w-xl w-full">
                        <h2 className="text-2xl font-bold mb-6">Expert Workout Plans</h2>
                        
                        {/* Tabs */}
                        <div className="flex mb-6 border-b border-white/10">
                            {Object.keys(workoutPlans).map((plan) => (
                                <button 
                                    key={plan}
                                    onClick={() => setActiveTab(plan)}
                                    className={`px-4 py-2 mr-2 transition-all ${
                                        activeTab === plan 
                                            ? 'text-purple-400 border-b-2 border-purple-400' 
                                            : 'text-gray-400 hover:text-gray-200'
                                    }`}
                                >
                                    {plan.charAt(0).toUpperCase() + plan.slice(1)}
                                </button>
                            ))}
                        </div>
                        
                        {/* Active Tab Content */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">{workoutPlans[activeTab].title}</h3>
                            <p className="text-gray-300 mb-4">{workoutPlans[activeTab].description}</p>
                            <ul className="space-y-2">
                                {workoutPlans[activeTab].highlights.map((item, index) => (
                                    <li key={index} className="flex items-center">
                                        <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nutrition Calculator Section */}
            <section className="px-6 py-16 md:px-10 lg:px-20 max-w-7xl mx-auto border-t border-white/10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                        Nutrition & Diet Plans
                    </h2>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                        Proper nutrition is essential for achieving your fitness goals. Use our calorie calculator to estimate your daily caloric needs and explore our diet plans customized for different goals.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Diet Plan Cards */}
                    {Object.keys(dietPlans).map((plan) => (
                        <div key={plan} className="backdrop-blur-sm bg-black/30 border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all">
                            <h3 className="text-xl font-bold mb-3">{dietPlans[plan].title}</h3>
                            <p className="text-gray-300 mb-4 text-sm">{dietPlans[plan].description}</p>
                            
                            <h4 className="text-purple-400 font-medium mb-2">Sample Meal Plan:</h4>
                            <ul className="space-y-3">
                                {dietPlans[plan].meals.slice(0, 3).map((meal, index) => (
                                    <li key={index}>
                                        <span className="font-medium text-white block">{meal.name}</span>
                                        <span className="text-gray-400 text-sm">{meal.items}</span>
                                    </li>
                                ))}
                            </ul>
                            
                            <button 
                                className="w-full mt-6 py-2 border border-purple-500/50 rounded-lg hover:bg-purple-500/20 transition-all text-purple-400"
                                onClick={() => {
                                    setGoal(plan);
                                    setShowCalorieCalculator(true);
                                }}
                            >
                                Calculate Calories
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-12 md:px-10 lg:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        {/* Location & Map Button - UPDATED SECTION */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Find Us</h3>
                            <p className="text-gray-300 mb-6">{gymLocation.address}</p>
                            
                            {/* Map Button - Replaced the map with this button */}
                            <a 
                                href={gymLocation.mapUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-all flex items-center space-x-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <span>View on Google Maps</span>
                            </a>
                        </div>
                        
                        {/* Hours & Contact */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Timing and Contact</h3>
                            <div className="mb-6">
                                <h4 className="font-medium text-purple-400 mb-2">Opening Hours</h4>
                                <ul className="space-y-1 text-gray-300">
                                    <li className="flex justify-between">
                                        <span>Monday - Saturday</span>
                                        <span>6:00 AM - 11:00 PM</span>
                                    </li>
            
                                    <li className="flex justify-between">
                                        <span>Sunday</span>
                                        <span>Close</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="font-medium text-purple-400 mb-2">Contact</h4>
                                <ul className="space-y-3 text-gray-300">
                                    <li className=" items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        Ibad Hashmi :   +91-9792917557
                                        <br></br>
                                        Farhan Sheikh : +91-7071329096
                                    </li>
                        
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-8 border-t border-white/10 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Dynamic Fitness Gym. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Membership Plans Modal - Shows when button is clicked */}
            {showMembershipPlans && (
                <section className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl max-w-5xl w-full max-h-screen overflow-y-auto">
                        <div className="p-6 md:p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                                    Membership Plans
                                </h2>
                                <button 
                                    onClick={() => setShowMembershipPlans(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Validity Period Selection */}
                            <div className="mb-8">
                                <h3 className="text-lg font-medium mb-3">Select Membership Duration:</h3>
                                <div className="flex flex-wrap gap-3">
                                    {validityOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setValidityPeriod(option.value)}
                                            className={`px-4 py-2 rounded-lg transition-all ${
                                                validityPeriod === option.value
                                                    ? 'bg-purple-600 text-white'
                                                    : 'bg-black/40 border border-white/10 hover:bg-black/60'
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Membership Plan Card */}
                                <div className="backdrop-blur-sm p-6 rounded-xl border-2 border-purple-500 bg-black/40">
                                    <h3 className="text-2xl font-bold mb-2">{membershipPlan.name}</h3>
                                    <div className="mb-4">
                                        <span className="text-3xl font-bold">{membershipPlan.prices[validityPeriod]}</span>
                                        <span className="text-gray-400"> / {validityPeriod === 'yearly' ? 'year' : validityPeriod.replace('month', ' month')}</span>
                                    </div>
                                    <ul className="space-y-3">
                                        {membershipPlan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <span className="inline-block w-5 h-5 mt-0.5 mr-2 text-purple-400">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Contact Card */}
                                <div className="backdrop-blur-sm p-6 rounded-xl border border-white/10 bg-black/20">
                                    <div className="flex flex-col h-full justify-center">
                                        <h3 className="text-2xl font-bold mb-6">Join us today and elevate your fitness journey.</h3>
                                        <p className="text-lg mb-8">Contact us to learn more about our membership options and facilities.</p>
                                        
                                        <div className="space-y-4">
                                            <div className="flex items-center">
                                                <span className="inline-block w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mr-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                    </svg>
                                                </span>
                                                <div>
                                                    <div className="text-sm text-gray-400">Ibad Hashmi</div>
                                                    <div className="text-lg">[+91 9792917557]</div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center">
                                                <span className="inline-block w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mr-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                    </svg>
                                                </span>
                                                <div>
                                                    <div className="text-sm text-gray-400">Farhan Sheikh</div>
                                                    <div className="text-lg">[+91 7071329096]</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Calorie Calculator Modal */}
            {showCalorieCalculator && (
                <section className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl max-w-5xl w-full max-h-screen overflow-y-auto">
                        <div className="p-6 md:p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                                    Daily Calorie Calculator
                                </h2>
                                <button 
                                    onClick={() => setShowCalorieCalculator(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Calculator Inputs */}
                                <div className="backdrop-blur-sm p-6 rounded-xl border border-white/10 bg-black/20">
                                    <h3 className="text-xl font-semibold mb-6">Enter Your Details</h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-gray-300 mb-2">Weight (kg)</label>
                                            <input 
                                                type="number" 
                                                value={weight}
                                                onChange={(e) => setWeight(e.target.value)}
                                                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/20 text-white"
                                                placeholder="Enter your weight in kg"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-gray-300 mb-2">Height (cm)</label>
                                            <input 
                                                type="number" 
                                                value={height}
                                                onChange={(e) => setHeight(e.target.value)}
                                                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/20 text-white"
                                                placeholder="Enter your height in cm"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-gray-300 mb-2">Age (years)</label>
                                            <input 
                                                type="number" 
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/20 text-white"
                                                placeholder="Enter your age in years"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-gray-300 mb-2">Gender</label>
                                            <div className="flex space-x-4">
                                                <label className="flex items-center">
                                                    <input 
                                                        type="radio" 
                                                        value="male"
                                                        checked={gender === 'male'}
                                                        onChange={() => setGender('male')}
                                                        className="mr-2"
                                                    />
                                                    Male
                                                </label>
                                                <label className="flex items-center">
                                                    <input 
                                                        type="radio" 
                                                        value="female"
                                                        checked={gender === 'female'}
                                                        onChange={() => setGender('female')}
                                                        className="mr-2"
                                                    />
                                                    Female
                                                </label>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-gray-300 mb-2">Activity Level</label>
                                            <select 
                                                value={activityLevel}
                                                onChange={(e) => setActivityLevel(e.target.value)}
                                                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/20 text-white"
                                            >
                                                <option value="sedentary">Sedentary (little or no exercise)</option>
                                                <option value="light">Light (exercise 1-3 days/week)</option>
                                                <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                                                <option value="active">Active (exercise 6-7 days/week)</option>
                                                <option value="veryActive">Very Active (intense exercise daily)</option>
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-gray-300 mb-2">Your Goal</label>
                                            <select 
                                                value={goal}
                                                onChange={(e) => setGoal(e.target.value)}
                                                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/20 text-white"
                                            >
                                                <option value="lose">Lose Weight</option>
                                                <option value="maintain">Maintain Weight</option>
                                                <option value="gain">Gain Weight</option>
                                            </select>
                                        </div>
                                        
                                        <button 
                                            onClick={handleCalculate}
                                            className="w-full mt-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-all"
                                        >
                                            Calculate
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Results & Diet Plan */}
                                <div className="backdrop-blur-sm p-6 rounded-xl border border-white/10 bg-black/20">
                                    {calories ? (
                                        <div>
                                            <div className="text-center mb-6">
                                                <h3 className="text-xl font-semibold mb-2">Your Daily Calorie Target</h3>
                                                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                                                    {calories} calories
                                                </div>
                                                <p className="text-gray-400 mt-2">Based on your {goal === 'lose' ? 'weight loss' : goal === 'gain' ? 'weight gain' : 'maintenance'} goal</p>
                                            </div>
                                            
                                            <div className="mt-8">
                                                <h3 className="text-xl font-semibold mb-4">Recommended Diet Plan</h3>
                                                <div className="p-4 rounded-lg bg-black/40 border border-purple-500/30">
                                                    <h4 className="font-bold text-lg text-purple-400">{dietPlans[goal].title}</h4>
                                                    <p className="text-sm text-gray-300 mb-4">{dietPlans[goal].description}</p>
                                                    
                                                    <div className="space-y-3">
                                                        {dietPlans[goal].meals.map((meal, idx) => (
                                                            <div key={idx} className="pb-2 border-b border-white/10 last:border-0">
                                                                <span className="font-medium text-white block">{meal.name}</span>
                                                                <span className="text-gray-400 text-sm">{meal.items}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    
                                                    <div className="mt-6 p-3 bg-purple-900/30 rounded-lg border border-purple-500/20">
                                                        <p className="text-sm">
                                                            <span className="font-medium">Pro Tip:</span> Adjust portion sizes to meet your calculated calorie needs. For optimal results, combine this diet plan with our recommended workout programs.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-6 text-center">
                                                <p className="text-sm text-gray-400 mb-4">
                                                    This is a general guideline. Individual needs may vary. Consider consulting with a nutritionist for a personalized plan.
                                                </p>
                                                <button 
                                                    onClick={() => setShowCalorieCalculator(false)} 
                                                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-all"
                                                >
                                                    Got it
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-full flex flex-col justify-center items-center text-center p-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                            <h3 className="text-xl font-semibold mb-2">Calculate Your Calories</h3>
                                            <p className="text-gray-400 mb-6">
                                                Fill in your details on the left to get your personalized calorie target and recommended diet plan.
                                            </p>
                                            
                                            <div className="w-full max-w-sm p-4 rounded-lg bg-black/40 border border-white/10">
                                                <h4 className="font-medium text-purple-400 mb-2">Why Calculate Calories?</h4>
                                                <ul className="text-sm text-left space-y-2">
                                                    <li className="flex items-start">
                                                        <span className="inline-block w-4 h-4 mt-0.5 mr-2 text-purple-400 flex-shrink-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                        <span>Know exactly how much to eat for your specific goal</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="inline-block w-4 h-4 mt-0.5 mr-2 text-purple-400 flex-shrink-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                        <span>Make faster progress towards your fitness goals</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="inline-block w-4 h-4 mt-0.5 mr-2 text-purple-400 flex-shrink-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                        <span>Get a personalized diet plan that works for you</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};