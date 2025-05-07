const bcrypt = require('bcrypt');

const hashPassword = async (plainPassword) => {
    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(plainPassword, salt);
        console.log('Your hashed password:', hash);
        
        // Test verification
        const isValid = await bcrypt.compare(plainPassword, hash);
        console.log('Password verification test:', isValid ? 'PASSED' : 'FAILED');
    } catch (err) {
        console.error('Error hashing password:', err);
    }
};

// Get password from command line argument
const password = process.argv[2];

if (!password) {
    console.error('Please provide a password as a command line argument');
    process.exit(1);
}

hashPassword(password);