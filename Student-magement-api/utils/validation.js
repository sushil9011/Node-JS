exports.validateStudent = (data) => {
    const { name, email, age } = data;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !age) return "Empty fields should not be allowed"; 
    if (name.length < 3) return "Name: Minimum 3 characters"; 
    if (!emailRegex.test(email)) return "Invalid email format should be rejected"; 
    if (isNaN(age) || age < 18 || age > 60) return "Age: Must be number (18-60)"; 
    
    return null;
};