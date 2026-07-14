import { menuArray } from './data.js'

let orderArr = []

function renderMenu(arr = menuArray) {
    return arr.map((item) => {
        return `
        <section class='section'>
            <div class='meal-emoji'>${item.emoji}</div>
            <div class='meal'>
                <h2 class='meal-name'>${item.name}</h2>
                <p class='meal-ingredients'>${item.ingredients.join(', ')}</p>
                <p class='meal-price'>$${item.price}</p>
            </div>
            <div class='plus-icon' data-plus='${item.name}'>+</div>
        </section>`
    }).join('')
}

document.getElementById('main').innerHTML = renderMenu()

function renderOrder() {
    if (orderArr.length === 0) {
        document.getElementById('orderlist').innerHTML = ''
        return
    }
    
    let totalPrice = 0
    orderArr.forEach((item) => {
        totalPrice += item.price
    })
    
    const orderItemsHtml = orderArr.map((item) => {
        return `
        <div class='order-item'>
            <div class='item-remove-container'>
                <h2 class='order-name'>${item.name}</h2>
                <p class='remove-item' data-remove='${item.id}'>remove</p>
            </div>
            <p class='order-price'>$${item.price}</p>
        </div>`
    }).join('')
    
    const orderContainerHtml = `
    <div class='order-container'>
        <h2 class='your-order'>Your order</h2>
        <div class='order-list'>
            ${orderItemsHtml}
        </div>
        <div class='total-price-container'>
            <h2 class='total-price-text'>Total Price:</h2>
            <p class='total-price-number'>$${totalPrice}</p>
        </div>
        <button class='complete-btn' id='complete-order-btn'>Complete order</button>
    </div>`
    
    document.getElementById('orderlist').innerHTML = orderContainerHtml
}

document.addEventListener('click', (e) => {
    if (e.target.dataset.plus) {
        const mealName = e.target.dataset.plus
        const targetMealObject = menuArray.find((meal) => meal.name === mealName)
        orderArr.push({...targetMealObject, id: Date.now() + Math.random()}) 
        renderOrder()
    }
    
    if (e.target.dataset.remove) {
        const targetId = e.target.dataset.remove
        orderArr = orderArr.filter((meal) => String(meal.id) !== String(targetId)) 
        renderOrder() 
    }

    if (e.target.id === 'complete-order-btn') {
        document.getElementById('modal').style.display = 'flex'
    }
    if (e.target.id === 'modal') {
        document.getElementById('modal').style.display = 'none'
    }
})

document.getElementById('payment-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const paymentFormData = new FormData(document.getElementById('payment-form'))
    const name = paymentFormData.get('userName')
    
    document.getElementById('modal').style.display = 'none'
    orderArr = []
    
    document.getElementById('orderlist').innerHTML = `
    <div class="success-message">
        <p>Thanks, ${name}! Your order is on its way!</p>
    </div>`
    
    document.getElementById('payment-form').reset()
})