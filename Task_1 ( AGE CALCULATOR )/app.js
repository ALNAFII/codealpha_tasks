document.addEventListener('DOMContentLoaded', function() 
{
    const calculateButton = document.getElementById('calculateButton');
    const resultDiv = document.getElementById('result');
    calculateButton.addEventListener('click', function() 
    {
        const day = parseInt(document.getElementById('day').value);
        const month = parseInt(document.getElementById('month').value);
        const year = parseInt(document.getElementById('year').value);
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) 
            {
            const currentDate = new Date();
            const birthDate = new Date(year, month - 1, day);

            let age = currentDate.getFullYear() - birthDate.getFullYear();
            const monthDifference = currentDate.getMonth() - birthDate.getMonth();
            const dayDifference = currentDate.getDate() - birthDate.getDate();
            if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
                age--;
            }
            resultDiv.textContent = `You are ${age} years old.`;
        } else {
            resultDiv.textContent = "Please enter a valid date of birth.";
        }
    });
});
