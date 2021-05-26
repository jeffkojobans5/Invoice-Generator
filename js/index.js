
const table = document.getElementById('table')
const total = document.getElementById('total')
const amount_paid = document.getElementById('amount_paid')


add_item.addEventListener('click', function(event){
	if(event.target.id == 'add_item'){
	let newTD = document.createElement('tr');
	newTD.setAttribute("class", "tr");
	newTD.setAttribute("id", "one");
	
	newTD.innerHTML = `
              <td><textarea placeholder="Description of service or product ..." class="form-control"></textarea></td>
              <td><input type="number" value="1" step="any" autocomplete="off" class="form-control qty" id="qty"></td>
              <td> 
              <div class="input-group" id="input-group">
                <span class="input-group-text currency"> <span class="sign">$</span></span>
                <input type="number" step="any" autocomplete="off" class="form-control currency2" value="0" id="rate">
              </div> 
              </td>
              <td><p class="margin-top-currency-p" ><span class="sign">$</span> <span class="res">0.00</span></p></td>
              <td><i class="fa fa-trash"></i> </td>
            `;
            table.append(newTD);
            }
            getCurrency();
    });

function show_bin (event){
	let eventParent ; 
	let parent = event.target.parentNode 
	if( parent.id == "one"){
		eventParent = event.target.parentNode
	} else if (parent.parentNode.id == "one"){
		eventParent = parent.parentNode
	} else if(parent.parentNode.parentNode.id == "one") {
		eventParent = parent.parentNode.parentNode
	} else if (parent.parentNode.parentNode.parentNode.id == "one") {
		eventParent = parent.parentNode.parentNode.parentNode		
	} else if(event.target.id == "one") {
		eventParent = event.target
	} else {
		return
	}
	eventParent.lastElementChild.style.color = 'gray' ;
}

function hide_bin (event){
	let eventParent ; 
	let parent = event.target.parentNode 
	if( parent.id == "one"){
		eventParent = event.target.parentNode
	} else if (parent.parentNode.id == "one"){
		eventParent = parent.parentNode
	} else if(parent.parentNode.parentNode.id == "one") {
		eventParent = parent.parentNode.parentNode
	} else if (parent.parentNode.parentNode.parentNode.id == "one") {
		eventParent = parent.parentNode.parentNode.parentNode		
	} else if(event.target.id == "one") {
		eventParent = event.target
	} else {
		return
	}
	eventParent.lastElementChild.style.color = 'white' ;
}

function delete_item (event) {
	let parent = event.target.parentNode.parentNode
	if(event.target.className == "fa fa-trash"){
		parent.remove();
		sub_total()
	}
}

function delete_total (event) {
	let parent = event.target.parentNode
	if(event.target.className == "fa fa-trash"){
		let ama = parent.firstElementChild.value
		if(ama == "Tax"){
			add_tax.style.display = 'block';
			parent.style.display = 'none'
			tax_input.value = 0
			total_bill()
		} else if (ama == "Discount"){
			add_discount.style.display = 'block';
			parent.style.display = 'none'	
			discount_input.value = 0
			total_bill()					
		} else if (ama == "Shipping"){
			add_shipping.style.display = 'block';
			parent.style.display = 'none'	
			shipping_input.value = 0
			total_bill()					
		}
	}
}

add_tax.addEventListener('click' , function(){
	let tax = document.getElementsByClassName('date-box flex tax')
	tax[0].style.display = 'flex'
	add_tax.style.display = 'none'
})

add_discount.addEventListener('click' , function(){
	let tax = document.getElementsByClassName('date-box flex discount')
	tax[0].style.display = 'flex'
	add_discount.style.display = 'none'
})

add_shipping.addEventListener('click' , function(){
	let tax = document.getElementsByClassName('date-box flex shipping')
	tax[0].style.display = 'flex'
	add_shipping.style.display = 'none'
})


function multiply_qty_rate (event) {	
	let eventParent;
	if(event.target.id == "qty"){
			eventParent = event.target.parentNode.parentNode;
		} else if(event.target.id == "rate") {
			eventParent = event.target.parentNode.parentNode.parentNode;
		} else {
			return 
		}
		let rate = eventParent.querySelector('#rate')
		let qty = eventParent.querySelector('#qty')
		let results = eventParent.querySelector('.res')
		results.innerHTML = (rate.value * qty.value).toFixed(2)
		sub_total()
		total_bill()					

}

function sub_total () {
	let total_Amount = document.querySelectorAll('.res');
	let hold_Amount  = 0
	for (items of total_Amount){
		hold_Amount +=  Number(items.innerHTML);
		subtotal.innerHTML = hold_Amount.toFixed(2); 
	} 
}


table.addEventListener('mouseover', show_bin, false)
table.addEventListener('mouseout', hide_bin, false)
table.addEventListener('click', delete_item , false)
table.addEventListener('change', multiply_qty_rate , false)
table.addEventListener('keyup', multiply_qty_rate , false)

total.addEventListener('mouseover', show_bin , false)
total.addEventListener('mouseout', hide_bin , false)
total.addEventListener('click', delete_total , false)


let hold = "";
let percent_sign = "%"

// TAX COMPONENT
function tax_value () {
	let value ;
	if(tax_percentage.value == "percentage"){
		value = (tax_input.value / 100) * subtotal.innerHTML;
		tax_per_curr.innerHTML = `<span class="sign2"> ${percent_sign} </span>`
	} else {
		value = Number(tax_input.value)
		tax_per_curr.innerHTML = `<span class="sign2"> ${hold} </span>`
	}
	return value;
}

function discount_value () {
	let value ;
	if(discount_percentage.value == "percentage"){
		value = (discount_input.value / 100) * subtotal.innerHTML
		discount_per_curr.innerHTML = `<span class="sign2"> % </span>`
	} else {
		value = Number(discount_input.value)
		discount_per_curr.innerHTML = `<span class="sign2"> ${hold} </span>`
	}
	return value;
}

function shipping_value () {
	let value = shipping_input.value
	return value;
}


function total_bill() {
	total_bal.innerHTML = (Number(subtotal.innerHTML) + (Number(tax_value()) - Number(discount_value()) + Number(shipping_value()))).toFixed(2)
	balance_due_now()
	tax_value()
	return total_bal.innerHTML;
}

function balance_due_now() {
	balance_due.innerHTML = (total_bal.innerHTML - amount_paid.value).toFixed(2);
}

amount_paid.addEventListener('change' , balance_due_now , false)
amount_paid.addEventListener('keyup' , balance_due_now , false)

tax_input.addEventListener('change', total_bill , false)
tax_input.addEventListener('keyup', total_bill , false)
tax_percentage.addEventListener('change' , total_bill, false)

discount_input.addEventListener('change', total_bill , false)
discount_input.addEventListener('keyup', total_bill , false)
discount_percentage.addEventListener('change' , total_bill, false)

shipping_input.addEventListener('change', total_bill , false)
shipping_input.addEventListener('keyup', total_bill , false)



function getCurrency () {
	fetch('https://gist.githubusercontent.com/Fluidbyte/2973986/raw/8bb35718d0c90fdacb388961c98b8d56abc392c9/Common-Currency.json')
	 .then(response => response.json())
	 .then(data => {
		let sign = document.querySelectorAll('.sign')
		for (items of sign ){
			items.innerHTML = data[select_currency.value]['symbol_native']
		}	 			
		let kojoo = document.getElementsByName('select')
	 		for (child of kojoo){
				child.lastElementChild.innerHTML = `Flat (${data[select_currency.value]['symbol_native']})`
			}
		currency_name.innerHTML = data[select_currency.value]['name']
		hold = data[select_currency.value]['symbol_native']; 
		tax_value()
		discount_value()
	 })
}

getCurrency()

select_currency.addEventListener('change' , getCurrency , false);





