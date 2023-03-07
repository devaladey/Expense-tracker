const btnShow = document.getElementById('btn-show');
const inputDiv = document.querySelector('.create-expense');
const cancelBtn = document.querySelector('.btn__cancel');
const addBtn = document.querySelector('.btn__add');
const allInputs = document.querySelectorAll('.create-expense__input');
const expenseList = document.querySelector('tbody');
const numOfList = document.querySelector('.num-of-items');


btnShow.addEventListener('click', function() {
    // inputDiv.style.display = 'block';
    inputDiv.classList.add('active');
});



cancelBtn.addEventListener('click', function() {
    allInputs.forEach(input => {
        input.value = '';
    });
    // inputDiv.style.display = 'none';
    inputDiv.classList.remove('active');
});

addBtn.addEventListener('click', function() {
    let title = '';
    let amount = 0;
    let date = '';
   
    if(allInputs[0].value.trim() === '' || (allInputs[1].value === '' || allInputs[1].value <= 0 ) || allInputs[2].value === '') {
        return alert('Please fill in all fields!');
    }

    // allInputs[0].value.trim().length < 0

    allInputs.forEach(input => {

        if(input.type === 'text') {
            title = input.value;
        } else if(input.type === 'number') {
            amount = input.value;
        } else if(input.type === 'date') {
            date = input.value;
        }
    });

    // Add expense
    expenseList.innerHTML += newExpense(title, amount, date);

    numOfList.innerHTML = document.querySelectorAll('tbody tr').length;

    allInputs.forEach(input => {
        input.value = '';
    });

    // Close the expense div
    inputDiv.classList.remove('active');

    removeExpenseHandler();
    
});



function newExpense(title, amount, date) {

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    // Akoko is the english form of period

    console.log('Date: ', date);
    const akoko = date.split('-');
    const year = akoko[0];
    const month = akoko[1];
    const day = akoko[2];

    return (`
        <tr class="expense">
            <td class="expense__date">
                <div>
                    <span class="expense__date-day">${day}</span>
                    <span class="expense__date-month">${months[month - 1]}</span>
                    <span class="expense__date-year">${year}</span>
                </div>
            </td>
            <td class="expense__title">${title}</td>
            <td class="expense__amount">$${amount}</td>
            <td class="expense__remove"><button class="remove-btn">Remove</button></td>
        </tr>
    `);
}

function removeExpenseHandler() {
    document.querySelectorAll('tbody tr .remove-btn').forEach((btn, i) => {
        btn.addEventListener('click', function() {
            expenseList.removeChild(document.querySelectorAll('tbody tr')[i]);
            numOfList.innerHTML = document.querySelectorAll('tbody tr').length;
        });
    });
}

